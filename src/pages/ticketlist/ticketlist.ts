import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ShareService } from '../server/server';
import * as _ from 'lodash';
import { Storage } from '@ionic/storage';
import { TicketDetailPage } from '../ticket-detail/ticket-detail';
import { AddEventPage } from '../add-event/add-event';
/**
 * Generated class for the TicketlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticketlist',
  templateUrl: 'ticketlist.html',
  providers: [ShareService],
})
export class TicketlistPage {
  eventsType: any;
  data: any;
  searchbar: any;
  evType: any;
  accountType: any;
  constructor(public toastCtrl: ToastController, public Storage: Storage, private alertCtrl: AlertController, public storage: Storage, public navCtrl: NavController, public share: ShareService, public navParams: NavParams) {
    this.share.getBooking().subscribe(data=>{
      this.Storage.set('BookingTable',data);
    });

    this.Storage.get('loginUser').then((val) => {
      this.accountType = val.AccountType;
    })
    // get unique event type value
    this.Storage.get('EventTicketTable').then(data => {
      this.evType = _.uniqBy(data, 'eventType');
    })
    this.getall();

  }
  navPage(ev) {
    this.navCtrl.push(TicketDetailPage, {
      eventCode: ev
    })

  }
  // filter by event type
  togglePage(evType) {
    this.searchbar = '';
    this.Storage.get('loginUser').then((val) => {
      this.accountType = val.AccountType;
      // if is admin, show all event with 'current' or 'expired' tag.
      if (val.AccountType == 'admin') {
        this.Storage.get('EventTicketTable').then(data => {
          data = _.filter(data, ['eventType', evType])
          var eventlist = [];
          for (var i = 0; i < data.length; i++) {
            if (new Date(data[i].endDate) > new Date()) {
              data[i]['status'] = 'current'
              eventlist.push(data[i]);
            }
            if (new Date(data[i].endDate) < new Date()) {
              data[i]['status'] = 'expired'
              eventlist.push(data[i]);
            }
          }
          this.data = eventlist;
        });
      }
      // if is user, show current and published events
      else if (val.AccountType == 'user') { // if is user, filter away the passed events

        this.Storage.get('EventTicketTable').then(data => {
          data = _.filter(data, ['eventType', evType])
          var eventlist = [];
          for (var i = 0; i < data.length; i++) {
            if (new Date(data[i].endDate) > new Date()) {
              eventlist.push(data[i]);
            }
          }
          this.data = eventlist;
        });
      }
    })
  }

  // get list of the events.
  getall() {
    this.Storage.get('loginUser').then((val) => {
      this.accountType = val.AccountType;

      // if is admin, show all event with 'current' or 'expired' tag.
      if (val.AccountType == 'admin') {
        this.share.activityGetAll().subscribe(data => {
          var eventlist = [];
          for (var i = 0; i < data.length; i++) {
            if (new Date(data[i].endDate) > new Date()) {
              data[i]['status'] = 'current'
              eventlist.push(data[i]);
            }
            if (new Date(data[i].endDate) < new Date()) {
              data[i]['status'] = 'expired'
              eventlist.push(data[i]);
            }
          }
          this.data = eventlist;
        });
      }
      // if is user, show current and published events
      else if (val.AccountType == 'user') {
        this.share.activityGetAll().subscribe(data => {
          var eventlist = [];
          for (var i = 0; i < data.length; i++) {
            if (new Date(data[i].endDate) > new Date()) {
              eventlist.push(data[i]);
            }
          }
          this.data = eventlist;
        });
      }
    })
  }

  // edit the item in add event page
  Edit(item) {
    this.navCtrl.push(AddEventPage, {
      iteminfo: item,
      pagemode: 'edit'
    })

  }

  // search bar
  getItems() {
    // set q to the value of the searchbar
    var q = this.searchbar;

    if (!q) {
      this.getall();
      return;
    }
    this.data = this.data.filter((v) => {
      if (v.eventname && q) {
        if (v.eventname.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

  }
  // delete the events
  presentConfirm(item) {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure to delete the event?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'icon-color',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'YES',
          cssClass: 'icon-color',
          handler: data => {

            //Call you API to remove Items here.
            console.log(item.eventCode);
            this.share.activityDel(item.eventCode).subscribe(data => {
              if (data == null) {
                const toast = this.toastCtrl.create({
                  message: 'Failed to delete event, please try again',
                  duration: 2000
                });
                toast.present();
              } else {
                const toast = this.toastCtrl.create({
                  message: 'Event successfully deleted ',
                  duration: 2000
                });
                toast.present();
              }
            })
            this.Storage.get('BookingTable').then(data => {
              var detetingDate = _.filter(data, ['eventType', item.eventCode]);
              for (var i = 0; i < detetingDate.length; i++) {
                this.share.cancelBooking(detetingDate[i].bookingID);
              }
            });
            this.Storage.get('RatingTable').then(data => {
              var detetingDate = _.filter(data, ['eventType', item.eventCode]);
              for (var i = 0; i < detetingDate.length; i++) {
                this.share.DeleteRating(detetingDate[i].ratingID);
              }
            });
            this.Storage.get('BookingTable').then(data => {
              var detetingDate = _.filter(data, ['eventType', item.eventCode]);
              for (var i = 0; i < detetingDate.length; i++) {
                this.share.DeleteRating(detetingDate[i].ratingID);
              }
            });
            this.share.activityGetAll().subscribe(data => {
              this.Storage.set('EventTicketTable', data);
            });

            this.getall();
          }

        }
      ]
    });
    alert.present();
  }
  addEventPage() {
    this.navCtrl.push(AddEventPage)
  }
  refresh() {
    this.navCtrl.setRoot(TicketlistPage);
  }
}

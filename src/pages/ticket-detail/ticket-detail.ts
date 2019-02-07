import { Component } from '@angular/core';
import { IonicPage, ToastController, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import * as _ from 'lodash';
import { ShareService } from '../server/server';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { TicketlistPage } from '../ticketlist/ticketlist';
import { BooklistPage } from '../booklist/booklist';

/**
 * Generated class for the TicketDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket-detail',
  templateUrl: 'ticket-detail.html',
})
export class TicketDetailPage {
  eventCode: any;
  raw: any;
  data: any;
  data2: any = {};
  response: any;
  bookedDate: any;
  minDate: any;
  maxDate: any;
  quantityLeft: any;
  ticketAvailable: any;
  selectedDate: any;
  recurring: any;
  ballotOption: any;
  existResult: any;
  commentList: any;
  bookingBtn: boolean = true;
  accountType: any;
  userBookingList: any;
  rating: any = 0;
  uid: any;
  eventname: any;
  constructor(public events: Events, public alertController: AlertController, public Storage: Storage, public http: Http, public navCtrl: NavController, public navParams: NavParams, public share: ShareService, public toastCtrl: ToastController) {
    this.getAllDate();
    this.getRating();
    this.Storage.get('loginUser').then((val) => {
      this.uid = val.UserID;
      this.accountType = val.AccountType;
    })

  }
  // Get event infomation selected 
  getAllDate() {
    this.Storage.get('EventTicketTable').then(data => {
      this.eventCode = this.navParams.get('eventCode')
      this.raw = data;
      this.data = _.filter(this.raw, ['eventCode', this.eventCode])
      this.convertToDate(this.data);
    });
    // check if the balloting exist
    this.share.getBallotResult().subscribe(data => {
      this.existResult = data;
    }
    )
  }

  // conversion of date for display purpose
  convertToDate(data) {
    for (var i = 0; i < data.length; i++) {
      data[i].startDate = moment(new Date(data[i].startDate)).format("YYYY-MM-DD");
      data[i].endDate = moment(new Date(data[i].endDate)).format("YYYY-MM-DD");
      this.ticketAvailable = data[i].quantity;
      this.recurring = data[i].recurring;
      this.ballotOption = data[i].ballotOption;
      this.eventname = data[i].eventname;
      // if the endDate has passed
      if (new Date(data[i].endDate) < new Date()) {
        this.bookingBtn = false;
      }
    }
    return data
  }

  // get quantity left when specific date is selected
  getQuantityByDate(selectedDate) {

    // if recurring is yes, then count by specific date
    if (this.recurring == "yes") {
      this.Storage.get('BookingTable').then(data => {
        for (var i = 0; i < data.length; i++) {
          data[i].bookedDate = moment(new Date(data[i].bookedDate)).format("YYYY-MM-DD");
        }
        var record = _.filter(data, ['bookedDate', moment(new Date(selectedDate)).format("YYYY-MM-DD")])
        console.log("record lengths" + record.length)
        this.quantityLeft = this.ticketAvailable - record.length;
      })
    }
    // if ballotOption is yes, check if the ballot has been done, or else display all tickets
    else if (this.ballotOption == "yes") {
      var existResult = _.filter(this.existResult, ['eventCode', this.eventCode])
      this.quantityLeft = this.ticketAvailable - existResult.length;
    }

    // count number of record for selected events
    else {
      this.Storage.get('BookingTable').then(data => {
        var record = _.filter(data, ['eventCode', this.eventCode])
        console.log("no recurring")
        this.quantityLeft = this.ticketAvailable - record.length;
      })
    }

  }
  // get the user infomation who have book the events
  checkBooking() {
    this.Storage.get('EventTicketTable').then(Eventdata => {
      this.Storage.get('BookingTable').then(bookingdata => {
        var eventCode = this.navParams.get('eventCode');
        var data = _.map(bookingdata, function (item) {
          return _.merge(item, _.find(Eventdata, { 'eventCode': parseInt(item.eventCode) }));
        });
        data = _.filter(data, ['eventCode', parseInt(eventCode)]);
        this.userBookingList = data;
        this.navCtrl.push(BooklistPage, {
          userBookingList: this.userBookingList
        })
      })
    })
  }
  // delete comment function
  deletecomment(item) {
    const alert = this.alertController.create({
      message: '<strong>Are you sure to delete comment?</strong>',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'YES',
          handler: () => {
            console.log(item);
            this.share.DeleteRating(item.ratingID).subscribe(data => {
              if (data == null) {
                const toast = this.toastCtrl.create({
                  message: 'Failed to delete comment, please try again',
                  duration: 2000
                });
                toast.present();

              } else {
                const toast = this.toastCtrl.create({
                  message: 'Comment has been successfully deleted',
                  duration: 2000
                });
                this.share.getRating().subscribe(data => {
                  this.Storage.set('RatingTable', data);
                });
                toast.present();
              }
            });
            this.navCtrl.setRoot(TicketlistPage);
          }
        }
      ]
    });
    alert.present();

  }

  getRating() {
    // get rating from rating tables 
    this.share.getRating().subscribe(ratingData => {
      this.share.getAll().subscribe(accountData => {
        var combine = _.map(ratingData, function (item) {
          return _.merge(item, _.find(accountData, { 'uid': item.uid }));
        });
        console.log(combine, this.eventCode);
        var data = _.filter(combine, ['eventCode', this.eventCode.toString()]);
        var ratingScore = 0;
        for (var i = 0; i < data.length; i++) {
          data[i].date = moment(new Date(data[i].date)).format("YYYY-MM-DD");
          ratingScore = ratingScore + parseInt(data[i].rating1);
        }
        ratingScore = Math.round(ratingScore / data.length);
        this.rating = ratingScore;
        console.log(data);
        this.commentList = data;
      })
    });
  }
  // booking of event
  booking(eventCode) {
    
 
    const alert = this.alertController.create({
      message: 'Confirm Booking?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'YES',
          handler: () => {
           // check if there is ticket left
           if (this.quantityLeft == 0) {
            const alert = this.alertController.create({
              message: 'Sorry, there is no ticket left for the selected date',
              buttons: ['Ok']
            })
            alert.present();
            return false;
          }
          console.log(this.selectedDate);
          // check if the date is selected
          if (this.selectedDate == null) {
            const alert = this.alertController.create({
              message: 'Please select a date',
              buttons: ['Ok']
            })
            alert.present();
            return false;
          }
            this.share.activityGetAll().subscribe(data => {
              this.Storage.set('EventTicketTable', data);
            });
            var date = new Date();
            this.Storage.get('loginUser').then((val) => {
              var uid = val.UserID;
              this.share.bookingCreate(eventCode, uid, date, new Date(this.selectedDate)).subscribe(data => {
                if (data == null) {
                  const toast = this.toastCtrl.create({
                    message: 'Failed to book event, please try again',
                    duration: 2000
                  });
                  toast.present();

                } else {
                  if (this.ballotOption == "no") {
                    // when data is created, send the email to their account through sendgrid
                    var email = val.Email;
                    var username = val.Name;
                    var link = 'http://192.168.1.100:8080/Test/api.php';
                    var myData = JSON.stringify({ userEmail: email, eventName: this.eventname, userName: username, newdate: date });
                    this.http.post(link, myData)
                      .subscribe(data => {
                        console.log(data["_body"]);
                        this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
                      }, error => {
                        console.log("Error Sending Email");
                      });
                    var adminemail = 'panwh1024@gmail.com';
                    var adminlink = 'http://192.168.1.100:8080/Test/adminapi.php';
                    var adminmyData = JSON.stringify({ userAddress: adminemail, username: username, eventname: this.eventname, newdate:date});
                    this.http.post(adminlink, adminmyData)
                      .subscribe(data => {
                        console.log(data["_body"]);
                        this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
                      }, error => {
                        console.log("Oooops!");
                      });
                  }
                  const toast = this.toastCtrl.create({
                    message: 'Event has been successfully booked',
                    duration: 3000
                  });
                  toast.present();
                  this.navCtrl.setRoot(TicketlistPage);
                }
              })
            });
          }
        }
      ]
    });

    alert.present();

  }



}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Events } from 'ionic-angular';
import { ShareService } from '../server/server';
import { HomePage } from '../home/home';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';

/**
 * Generated class for the BookedDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booked-detail',
  templateUrl: 'booked-detail.html',
  providers: [ShareService]
})
export class BookedDetailPage {
  data: any;
  eventCode: any;
  uid: any;
  commentList: any;
  accountType: any;
  status:any;
  ballotOption:any;
  constructor(public events: Events, public Storage: Storage, public alertController: AlertController, public toastCtrl: ToastController, public share: ShareService, public navCtrl: NavController, public navParams: NavParams) {
    //get the eventData passed
    var data = this.navParams.get('eventData');

    // convert the date format to readable e.g.yyyymmddThh:mm:ss
    this.data = this.convertToDate(data);

    // get login user accountid and type
    this.Storage.get('loginUser').then((val) => {
      this.uid = val.UserID;
      this.accountType = val.AccountType;
    })
    // change star value when rating change
    events.subscribe('star-rating:changed', (starRating) => {
      this.rating = starRating;
    });
    this.getBallotresult();
  }
  getBallotresult(){
    this.share.getBallotResult().subscribe(ballotData => {
      this.Storage.get('loginUser').then((val) => {
      var data = this.navParams.get('eventData');
      var eventCode = data.eventCode;
      this.ballotOption = data.ballotOption;
      console.log(this.ballotOption);
      var eventResult = _.filter(ballotData, ['eventCode', eventCode.toString()]);
      if(eventResult.length == 0){
        this.status = 'Waiting to be ballot'
      }else{
        var result = _.filter(eventResult, ['uid', val.UserID]);
        if(result.length > 0){
          this.status = 'congrates!'
        }else{
          this.status = 'sorry'
        }
      }
    })
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BookedDetailPage');
  }
  // date conversion 
  convertToDate(data) {
    data.startDate = moment(new Date(data.startDate)).format("YYYY-MM-DD");
    data.endDate = moment(new Date(data.endDate)).format("YYYY-MM-DD");
    data.bookedDate = moment(new Date(data.bookedDate)).format("YYYY-MM-DD");
    this.eventCode = data.eventCode;
    return data
  } 

  // delete booking
  cancelBooking(id) {
    const alert = this.alertController.create({
      message: '<strong>Are you sure you want cancel the comment?</strong>',
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
            this.share.cancelBooking(id).subscribe(data => {
              if (data == null) {
                const toast = this.toastCtrl.create({
                  message: 'Fail to cancel booking',
                  duration: 2000
                });
                toast.present();

              } else {
                const toast = this.toastCtrl.create({
                  message: 'Booking has been cancelled',
                  duration: 2000
                });
                toast.present();
                // get updated booking table
                this.share.getBooking().subscribe(data => {
                  this.Storage.set('BookingTable', data);
                });
                this.navCtrl.setRoot(HomePage);
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

  rating: number;
  strComment: any;
  comment() {
    if(this.strComment==""&& this.rating==0){
      const toast = this.toastCtrl.create({
        message: 'Please enter comment and select rating',
        duration: 2000
      });
      toast.present();
      return false;
    }
    // create new comment
    var date = new Date();
    this.share.CreateRating(this.eventCode, date, date, this.uid, this.strComment, this.rating).subscribe(data => {
      if (data == null) {
        const toast = this.toastCtrl.create({
          message: 'Fail to submit comment',
          duration: 2000
        });
        toast.present();
 
      } else {
        this.strComment = '';
        this.rating = 0;
        const toast = this.toastCtrl.create({
          message: 'Comment has been submitted',
          duration: 2000
        });
        // get updated comments
        this.share.getRating().subscribe(data => {
          this.Storage.set('RatingTable', data);
        });

        toast.present();
      }
    })
  }



}

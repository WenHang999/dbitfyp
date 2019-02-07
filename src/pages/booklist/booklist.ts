import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash'; 
import * as moment from 'moment';
/**
 * Generated class for the BooklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booklist',
  templateUrl: 'booklist.html',
})
export class BooklistPage {
  userBookingList:any;
  constructor(public Storage : Storage,public navCtrl: NavController, public navParams: NavParams) {
    this.getUserList();
  }
  // view user who booked the event selected from book detail page
  getUserList(){
    this.Storage.get('AccountTable').then(accountData=>{

      var userBookingList = this.navParams.get('userBookingList')
      var data = _.map(userBookingList, function(item) {
        return _.merge(item, _.find(accountData, { 'uid' : item.uid }));
      });
      console.log(data);
      for(var i = 0 ; i< data.length;i++){          
        data[i].bookedDate = moment(new Date(data[i].bookedDate)).format("YYYY-MM-DD");
      }
      this.userBookingList = data;
   })
  }
}

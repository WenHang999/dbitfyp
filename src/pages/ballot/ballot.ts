import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareService } from '../server/server';
import * as _ from 'lodash'; 
/**
 * Generated class for the BallotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ballot',
  templateUrl: 'ballot.html',
  providers: [ShareService]
})
export class BallotPage {
  BookingData: any;
  AllEventData: any;
  eventcode: any;
  existResult: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public share: ShareService,) {
    this.share.activityGetAll().subscribe(data1=>{  
      this.share.getBooking().subscribe(data=>{   
        this.BookingData = data;
        this.AllEventData = data1;
       })
    });
    this.share.getBallotResult().subscribe(data=>{
      this.existResult = data;
    }
    )
    
  }
filtering(data,data1){
  for(var i = 0 ; i< data.length;i++){
    var AllEventData= _.filter(data1,['ballotOption', 'yes']) ;
    //console.log(AllEventData);
    var eventcode = AllEventData[i]['eventCode'];
    console.log(eventcode);
    var record = _.filter(data,['eventCode',eventcode ]) 
    console.log(record);
    var recordLen = {'record':record.length}
    console.log(recordLen);
    
  }
  return AllEventData;
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad BallotPage');
  }
ballot(eventCode){
    // check for exist result;
    var existResult = _.filter(this.existResult,['eventCode',eventCode ]) 
    if(existResult.length > 0){
      return false;
    }
    
    var bookingRecord = _.filter(this.BookingData,['eventCode',eventCode ]) 
    var recordLen = bookingRecord.length;
    var eventInfo = _.filter(this.AllEventData,['eventCode',eventCode ]) 
    var ticketQuantity = eventInfo[0].quantity;
    // generate randome number in arr
    var arr = []
    while(arr.length < ticketQuantity){
      var r = Math.floor(Math.random()*recordLen);
      if(arr.indexOf(r) === -1) arr.push(r);
    }

    if(recordLen > ticketQuantity){
      var bookingResult = [];
      for(var i = 0 ; i< arr.length;i++){
        for(var j = 0 ; j< bookingRecord.length;j++){
          if(arr[i]==j){
            bookingResult.push(bookingRecord[j]);
          }        
      }}
      this.CreateBookingResult(bookingResult);

    }else{
      this.CreateBookingResult(bookingRecord);
    }

}

CreateBookingResult(data){
  for(var i = 0 ; i< data.length;i++){
    var status = "approve"
    this.share.CreateBallotResult(data[i].eventCode,data[i].uid,data[i].date,status).subscribe(
      data=>{
        console.log(data);
      });
  }
}

}

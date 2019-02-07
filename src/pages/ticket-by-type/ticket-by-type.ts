import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { ShareService } from '../server/server';
import { Storage } from '@ionic/storage'
import * as _ from 'lodash'; 
import { TicketlistPage } from '../ticketlist/ticketlist';
/**
 * Generated class for the TicketByTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket-by-type',
  templateUrl: 'ticket-by-type.html',
  providers: [ShareService]
})
export class TicketByTypePage {
  data:any;
  eventType:any;
  accountType:any;
  constructor(public Storage:Storage,public share:ShareService,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public modalCtrl: ModalController) {
    this.share.activityGetAll().subscribe(data=>{
      this.data = _.uniqBy(data, 'eventType');
    })
    this.Storage.get('loginUser').then((val) => { 
      this.accountType = val.AccountType;
      })

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdHocTicketsPage');
  }
  navPage(eventType){
    this.navCtrl.push(TicketlistPage,{
       eventsType:eventType
    })
    
  }
  addEventPage() {
    this.navCtrl.push(AddEventPage)
  }
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Arre you SURE!!?',
      message: 'This action cannot be revert',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}

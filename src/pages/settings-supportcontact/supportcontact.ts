import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SupportcontactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@Component({
  selector: 'page-supportcontact',
  templateUrl: 'supportcontact.html',
})
export class SupportcontactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  call() {
    setTimeout(() => {
      let tel = '1234567890';
      window.open(`tel:${tel}`, '_system');
    },100);
  }
}

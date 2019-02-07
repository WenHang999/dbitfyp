import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SupportcontactPage } from "../settings-supportcontact/supportcontact";
import { FaQsPage } from '../settings-fa-qs/fa-qs';
import { SettingsChangepasswordPage } from '../settings-changepassword/settings-changepassword';
/**1
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  navPage(pageName){
    switch (pageName){
      case 'ChangePassword':
      this.navCtrl.push(SettingsChangepasswordPage);
      break; 
      case 'Supportcontact':
      this.navCtrl.push(SupportcontactPage);
      break; 
      case 'FAQs':
      this.navCtrl.push(FaQsPage);
      break; 
    }
  }
}

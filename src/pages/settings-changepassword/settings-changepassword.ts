import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ShareService } from '../server/server';
import { Storage } from '@ionic/storage'
import { SettingsPage } from '../settings/settings';
@IonicPage()
@Component({
  selector: 'page-settings-changepassword',
  templateUrl: 'settings-changepassword.html',
  providers: [ShareService],
})
export class SettingsChangepasswordPage {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  UserID: any;
  dbPassword: string;
  email: string;
  name: string;
  contact: string;
  accountType: string;
  constructor(public Storage: Storage, public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public share: ShareService) {
    this.Storage.get('loginUser').then((val) => {
      this.dbPassword = val.Password;
      this.UserID = val.UserID;
      this.email = val.Email;
      this.name = val.Name;
      this.contact = val.ContactNo;
      this.accountType = val.AccountType;
    })
  }

  ionViewDidLoad() {

  }

  ChangePassword() {
    if (this.oldPassword != this.dbPassword) {
      const alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Please check your current password',
        buttons: ['OK']
      });
      alert.present();

    }
    if (this.newPassword == this.confirmPassword) {
      console.log(this.UserID, this.newPassword)
      this.share.Update(this.UserID, this.email, this.name, this.contact, this.accountType, this.newPassword).subscribe(data => {
        const alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Your password has been successfully updated!',
          buttons: ['OK']
        });
        alert.present();
        this.share.getAll().subscribe(data => {
          this.Storage.set('AccountTable', data);
        });
        this.navCtrl.setRoot(SettingsPage);
      })

    } else {
      const alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Your new password and confirm new password does not match',
        buttons: ['OK']
      });
      alert.present();
    }
  }
}

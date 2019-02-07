import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ShareService } from '../server/server';
import { ToastController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { Events } from 'ionic-angular';
@Component({
  selector: 'page-;ogin',
  templateUrl: 'login.html',
  providers: [ShareService]
})
export class LoginPage {
  userName: string;
  passWord: string;
  currentUser: string;
  data: any;
  rememberMe: boolean;
  rememberMeOption: number;
  constructor(public events: Events, public Storage: Storage, public platform: Platform, public navCtrl: NavController, public share: ShareService, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public navParams: NavParams) {
    this.checkRemember();

    // reset the store infomation
    this.Storage.remove('BallotTable');
    this.Storage.remove('RatingTable');
    this.Storage.remove('BookingTable');
    this.Storage.remove('EventTicketTable');
    this.Storage.remove('AccountTable');
    this.Storage.remove('loginUser');
  }

  // if the remember is tick, get the userinfo value
  checkRemember() {
    this.Storage.get('remember').then((val) => {
      if (val == true) {
        this.Storage.get('Userinfo').then((val2) => {
          this.userName = val2.Email;
          this.passWord = val2.Password;
          this.rememberMe = true;
        })
      } else {
        this.userName = "";
        this.passWord = "";
        this.rememberMe = false;
      }
    })
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Logging In...",
      duration: 1000
    });
    loader.present();
  }

  signin() {

    this.share.login(this.userName, this.passWord).subscribe(data => {
      if (data == null) {
        const toast = this.toastCtrl.create({
          message: 'Please check your email and password',
          duration: 2000
        });
        toast.present();

      } else {
        // when user login, passed accountType and display repective sidebars
        this.events.publish('user:login', data);

        // store use info when remember me is ticked
        if (this.rememberMe == true) {
          this.Storage.set('remember', true);
          this.Storage.set('Userinfo', data);

        } else {
          this.Storage.set('remember', false);
        }

        this.Storage.set('loginUser', data);
        const toast = this.toastCtrl.create({
          message: 'Login Successfully',
          duration: 2000
        });
        toast.present();
        this.navCtrl.setRoot(HomePage);
      }
    })
  }
}

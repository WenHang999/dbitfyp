import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage'
import { HomePage } from '../pages/home/home';

import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { ManageUserPage } from '../pages/manage-user/manage-user';
import { UserFormPage} from '../pages/user-form/user-form'
import { TicketlistPage } from '../pages/ticketlist/ticketlist';

import { Events } from 'ionic-angular';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  admin: any;
  constructor(public events: Events,public Storage : Storage,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public alertCtrl: AlertController) {
    this.initializeApp();
    events.subscribe('user:login', (data) => {
      console.log(data)
      if(data.AccountType == 'admin'){
        this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'Event', component: TicketlistPage },
          { title: 'Setting', component: SettingsPage },
          { title: 'User', component: UserFormPage },
          { title: 'Log Out', component: LoginPage },       
        ];   }
        else{
          this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'Event', component: TicketlistPage },
            { title: 'Setting', component: SettingsPage },
            { title: 'My Profile', component: ManageUserPage },
            { title: 'Log Out', component: LoginPage },       
          ];  
        }
    });
         
  }
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'DO you want to log out?',
      message: 'log out',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ShareService } from '../server/server';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { UserFormPage } from '../user-form/user-form';
import * as _ from 'lodash';
import * as moment from 'moment';
/**
 * Generated class for the ManageUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-user',
  templateUrl: 'manage-user.html',
  providers: [ShareService],
})
export class ManageUserPage {
  items = [];
  id: any;
  email: string;
  name: string;
  password: string;
  contact: string;
  accountType: string;
  pagemode: any;
  eventList: any;
  constructor(public toastCtrl: ToastController, public Storage: Storage, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public share: ShareService) {
    this.pagemode = this.navParams.get('pagemode')
    // show information based on respective pagemode
    if (this.pagemode == 'edit') {
      var val = this.navParams.get('userinfo');
      this.id = val.uid;
      this.email = val.email;
      this.name = val.name;
      this.contact = val.contactNo;
      this.accountType = val.accountType;
      this.password = val.password;
    } else if (this.pagemode == 'add') {
      this.id = "";
      this.name = "";
      this.email = "";
      this.contact = "";
      this.password = "";
      this.accountType = "";
    } else if (this.pagemode == 'adminview') {
      this.Storage.get('EventTicketTable').then(Eventdata => {
        this.Storage.get('BookingTable').then(bookingdata => {
          // display user infomation
          var val = this.navParams.get('userinfo');
          this.id = val.uid;
          this.email = val.email;
          this.name = val.name;
          this.contact = val.contactNo;
          this.accountType = val.accountType;
          this.password = val.password;
          // filter the booking detail
          var data = _.map(bookingdata, function (item) {
            return _.merge(item, _.find(Eventdata, { 'eventCode': item.eventCode }));
          });
          data = _.filter(data, ['uid', val.uid]);
          for (var i = 0; i < data.length; i++) {
            data[i].bookedDate = moment(new Date(data[i].bookedDate)).format("YYYY-MM-DD");
          }
          this.eventList = data;
        })
      })
    } else {
      this.pagemode = 'view';
      this.getuserinfo();
    }
    console.log(this.pagemode);
  }

  // when user view their accounts
  getuserinfo() {
    this.Storage.get('AccountTable').then(data => {
      this.Storage.get('loginUser').then((val) => {
        val = _.filter(data, ['uid', val.UserID])
        this.id = val[0].uid;
        this.email = val[0].email;
        this.name = val[0].name;
        this.contact = val[0].contactNo;
        this.accountType = val[0].accountType;
        this.password = val[0].password;
      })
    })
  }

  // create user
  create() {
    // validation
    if (this.name == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in user name",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };

    if (this.email == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in user email",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };

    if (this.password == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in user password ",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };

    if (this.contact == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in user contact",
        buttons: ['OK']
      });
      alert.present();
      return false;

    };

    if (this.accountType == "") {
      const alert = this.alertCtrl.create({
        message: "Please select user type",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };
    this.share.Create(this.email, this.name, this.contact, this.accountType, this.password).subscribe(data => {
      if (data == null) {
        const toast = this.toastCtrl.create({
          message: 'Failed to create user, please try again',
          duration: 2000
        });
        toast.present();
      } else {
        const toast = this.toastCtrl.create({
          message: 'User has been successfully created',
          duration: 2000
        });

        // get updated accountTable
        this.share.getAll().subscribe(data => {
          this.Storage.set('AccountTable', data);
        });
        toast.present();

        this.navCtrl.setRoot(UserFormPage);
      };
    })
  }

  // update the user
  update() {
    if (this.name == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in name",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };

    if (this.email == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in email",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };

    if (this.password == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in password ",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };

    if (this.contact == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in contact",
        buttons: ['OK']
      });
      alert.present();
      return false;

    };

    if (this.accountType == "") {
      const alert = this.alertCtrl.create({
        message: "Please select user type",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };
    this.share.Update(this.id, this.email, this.name, this.contact, this.accountType, this.password).subscribe(data => {

      const toast = this.toastCtrl.create({
        message: 'Profile hass been successfully updated',
        duration: 2000
      });

      // get updated accountTable
      this.share.getAll().subscribe(data => {
        this.Storage.set('AccountTable', data);
      });
      toast.present();
      this.navCtrl.setRoot(UserFormPage);
    });
  }

}

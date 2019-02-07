import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { ShareService } from '../server/server';
import { ToastController } from 'ionic-angular';
import { ManageUserPage } from '../manage-user/manage-user';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
/**
 * Generated class for the UserFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-form',
  templateUrl: 'user-form.html',
  providers: [ShareService]
})
export class UserFormPage {

  items = [];
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  passWord: any;
  accountType: string;
  searchbar: any;
  constructor(public Storage: Storage, public navCtrl: NavController, public share: ShareService, public toastCtrl: ToastController, private alertCtrl: AlertController, public navParams: NavParams) {
    this.getAll();
  }
  getAll() {
    this.items = [];
    this.share.getAll().subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        this.items.push(data[i]);
      }
    })
  }
  // add/edit/view user in manage user page
  adduser() {
    this.navCtrl.push(ManageUserPage, {
      pagemode: 'add'
    })
  }
  view(item) {
    this.navCtrl.push(ManageUserPage, {
      userinfo: item,
      pagemode: 'adminview'
    })
  }
  Edit(item) {
    this.navCtrl.push(ManageUserPage, {
      userinfo: item,
      pagemode: 'edit'
    })

  }
  // filter
  getItems() {

    // set q to the value of the searchbar
    var q = this.searchbar;

    if (!q) {
      this.getAll();
      return;
    }
    this.items = this.items.filter((v) => {
      if (v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserFormPage');
  }

  //Used for Confirmation message
  presentConfirm(item) {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure to delete the user?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'icon-color',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'YES',
          cssClass: 'icon-color',
          handler: data => {
            console.log('User deleted!');

            //Call you API to remove Items here.
            this.share.Delete(item.uid).subscribe(data => {
              this.getAll();
              this.Storage.get('RatingTable').then(data => {
                var detetingDate = _.filter(data, ['uid', item.uid]);
                for (var i = 0; i < detetingDate.length; i++) {
                  this.share.DeleteRating(detetingDate[i].ratingID);
                }
              });
              this.Storage.get('BookingTable').then(data => {
                var detetingDate = _.filter(data, ['uid', item.uid]);
                for (var i = 0; i < detetingDate.length; i++) {
                  this.share.cancelBooking(detetingDate[i].ratingID);
                }
              });
            })

            const toast = this.toastCtrl.create({
              message: 'User has been successfully deleted',
              duration: 2000
            });
            toast.present();

            this.share.getAll().subscribe(data => {
              this.Storage.set('AccountTable', data);
            });
          }

        }
      ]
    });
    alert.present();
  }
}



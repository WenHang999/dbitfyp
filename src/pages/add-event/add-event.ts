import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { ShareService } from '../server/server';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Http } from '@angular/http';
import * as _ from "lodash";
import { Storage } from '@ionic/storage';
import { TicketlistPage } from '../ticketlist/ticketlist';
declare var cordova: any;


/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
  providers: [ShareService]
})
export class AddEventPage {
  eventCode: any;
  eventName: any;
  eventType: any;
  startDate: any;
  endDate: any;
  quantity: any;
  description: any;
  operatingHours: any;
  location: any;
  publishTime: any;
  ballotOption: any;
  toggleStatus: any;
  eventList: any;
  lastImage: string = null;
  loading: Loading;
  recurring: any;
  data: any = {};
  pagemode: any;
  constructor(
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public share: ShareService,
    private camera: Camera,
    private file: File,
    private filePath: FilePath,
    private transfer: Transfer,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public Storage: Storage,
  ) {
    this.data.username = '';
    this.data.response = '';
    this.http = http;
    this.share.activityGetAll().subscribe(data => {
      this.eventList = _.uniqBy(data, 'eventType')
    })
    // when page is in edit mode
    this.pagemode = this.navParams.get('pagemode')

    if (this.pagemode == 'edit') {
      var val = this.navParams.get('iteminfo');
      console.log(val);
      this.eventCode = val.eventCode;
      this.eventName = val.eventname;
      this.eventType = val.eventType
      this.startDate = val.startDate
      this.endDate = val.endDate
      this.quantity = val.quantity
      this.description = val.description
      this.location = val.location
      this.publishTime = val.publishTime
      if (val.ballotOption == 'yes') {
        this.toggleStatus = true;
      } else {
        this.toggleStatus = false;
      }
      if (val.recurring == 'yes') {
        this.recurring = true;
      } else {
        this.recurring = false;
      }
      this.lastImage = val.imageName
    } else {
      this.pagemode = 'add';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  eventCreate() {
    this.validation();
    // create new events
    this.share.activityCreate(
      this.eventName,
      this.eventType,
      this.startDate, 
      this.endDate,
      this.quantity, 
      this.description,
      this.location,
      this.publishTime,
      this.lastImage,
      this.ballotOption,
      this.recurring).subscribe(data => {
        if (data == null) {
          const toast = this.toastCtrl.create({
            message: 'Event successfully created',
            duration: 2000
          });
          toast.present();

        } else {
          const toast = this.toastCtrl.create({
            message: 'Event successfully created',
            duration: 2000
          });
          toast.present();
        }
      })
    if (this.lastImage != null) {
      this.uploadImage();
    }
    // call upload image function
    // get the updated eventTable from Database 
    this.share.activityGetAll().subscribe(data => {
      this.Storage.set('EventTicketTable', data);
    });
    this.navCtrl.setRoot(TicketlistPage);

  }
  updateEvent() {
    this.validation();
    this.share.updateActivity(this.eventCode,
      this.eventName,
      this.eventType,
      this.startDate, this.endDate,
      this.quantity, this.description,
      this.location,
      this.publishTime,
      this.lastImage,
      this.ballotOption,
      this.recurring).subscribe(data => {
        const toast = this.toastCtrl.create({
          message: 'Event successfully updated ',
          duration: 2000
        });
        toast.present();
        this.navCtrl.setRoot(TicketlistPage);
      })
  }
  public presentActionSheet() {
    // ask for image source, phone library or camera
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Photo Gallery',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  validation() {
    // list of validation
    if (this.eventName == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in the event name",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };

    if (this.eventType == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in the event type",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };

    if (this.startDate == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in the event start date",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };

    if (this.endDate == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in the event end date",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };

    if (this.quantity == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in the ticket quantity",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };

    if (this.description == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in the event description",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };

    // if (this.operatingHours == "") {
    //   const alert = this.alertCtrl.create({
    //     message: "Please fill in the operating hours of the event",
    //     buttons: ['OK']
    //   });
    //   alert.present();
    //   return false;
    // };

    if (this.location == "") {
      const alert = this.alertCtrl.create({
        message: "Please fill in the event location",
        buttons: ['OK']
      });
      alert.present();
      return false;
    };

    if (this.toggleStatus == true) {
      this.ballotOption = 'yes'
    } else {
      this.ballotOption = 'no'
    }

    if (this.recurring == true) {
      this.recurring = 'yes';
    } else {
      this.recurring = 'no'
    }
  }
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      targetWidth: 4800,
      targetHeight: 800,
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = "http://192.168.1.100:8080/imageTest/upload.php";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'name': filename }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
      duration: 3000,
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesfully uploaded.');
      console.log(targetPath)
      console.log(url)
    }, err => {
      this.loading.dismissAll()
      console.log(targetPath)
      console.log(url)
      this.presentToast('Error while uploading file.');
    });
  }


}

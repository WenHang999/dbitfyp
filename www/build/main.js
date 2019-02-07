webpackJsonp([10],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookedDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_server__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the BookedDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BookedDetailPage = /** @class */ (function () {
    function BookedDetailPage(events, Storage, alertController, toastCtrl, share, navCtrl, navParams) {
        var _this = this;
        this.events = events;
        this.Storage = Storage;
        this.alertController = alertController;
        this.toastCtrl = toastCtrl;
        this.share = share;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        //get the eventData passed
        var data = this.navParams.get('eventData');
        // convert the date format to readable e.g.yyyymmddThh:mm:ss
        this.data = this.convertToDate(data);
        // get login user accountid and type
        this.Storage.get('loginUser').then(function (val) {
            _this.uid = val.UserID;
            _this.accountType = val.AccountType;
        });
        // change star value when rating change
        events.subscribe('star-rating:changed', function (starRating) {
            _this.rating = starRating;
        });
        this.getBallotresult();
    }
    BookedDetailPage.prototype.getBallotresult = function () {
        var _this = this;
        this.share.getBallotResult().subscribe(function (ballotData) {
            _this.Storage.get('loginUser').then(function (val) {
                var data = _this.navParams.get('eventData');
                var eventCode = data.eventCode;
                _this.ballotOption = data.ballotOption;
                console.log(_this.ballotOption);
                var eventResult = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](ballotData, ['eventCode', eventCode.toString()]);
                if (eventResult.length == 0) {
                    _this.status = 'Waiting to be ballot';
                }
                else {
                    var result = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](eventResult, ['uid', val.UserID]);
                    if (result.length > 0) {
                        _this.status = 'congrates!';
                    }
                    else {
                        _this.status = 'sorry';
                    }
                }
            });
        });
    };
    BookedDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BookedDetailPage');
    };
    // date conversion 
    BookedDetailPage.prototype.convertToDate = function (data) {
        data.startDate = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date(data.startDate)).format("YYYY-MM-DD");
        data.endDate = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date(data.endDate)).format("YYYY-MM-DD");
        data.bookedDate = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date(data.bookedDate)).format("YYYY-MM-DD");
        this.eventCode = data.eventCode;
        return data;
    };
    // delete booking
    BookedDetailPage.prototype.cancelBooking = function (id) {
        var _this = this;
        var alert = this.alertController.create({
            message: '<strong>Are you sure you want cancel the comment?</strong>',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: function (blah) {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'YES',
                    handler: function () {
                        _this.share.cancelBooking(id).subscribe(function (data) {
                            if (data == null) {
                                var toast = _this.toastCtrl.create({
                                    message: 'Fail to cancel booking',
                                    duration: 2000
                                });
                                toast.present();
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: 'Booking has been cancelled',
                                    duration: 2000
                                });
                                toast.present();
                                // get updated booking table
                                _this.share.getBooking().subscribe(function (data) {
                                    _this.Storage.set('BookingTable', data);
                                });
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    BookedDetailPage.prototype.comment = function () {
        var _this = this;
        if (this.strComment == "" && this.rating == 0) {
            var toast = this.toastCtrl.create({
                message: 'Please enter comment and select rating',
                duration: 2000
            });
            toast.present();
            return false;
        }
        // create new comment
        var date = new Date();
        this.share.CreateRating(this.eventCode, date, date, this.uid, this.strComment, this.rating).subscribe(function (data) {
            if (data == null) {
                var toast = _this.toastCtrl.create({
                    message: 'Fail to submit comment',
                    duration: 2000
                });
                toast.present();
            }
            else {
                _this.strComment = '';
                _this.rating = 0;
                var toast = _this.toastCtrl.create({
                    message: 'Comment has been submitted',
                    duration: 2000
                });
                // get updated comments
                _this.share.getRating().subscribe(function (data) {
                    _this.Storage.set('RatingTable', data);
                });
                toast.present();
            }
        });
    };
    BookedDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-booked-detail',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\booked-detail\booked-detail.html"*/'<!--\n  Generated template for the BookedDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Booked Event Detail</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n    <ion-card-content>\n      <img src="http://172.22.85.131:8080/imageTest/uploads/{{data.imageName}}">\n      <ion-grid>\n        <ion-row>\n          <ion-card-title><b>{{data.eventname}}</b></ion-card-title>\n        </ion-row>\n        <ion-row class="blankspace">\n          <p></p>\n        </ion-row>\n\n        <ion-row><b>Event Type</b> : {{data.eventType}}</ion-row>\n        <ion-row class="blankspace">\n          <p></p>\n        </ion-row>\n        <ion-row><b>Description</b> : {{data.description}}</ion-row>\n        <ion-row><b>Date</b> : {{data.startDate}} to {{data.endDate}}</ion-row>\n        <ion-row><b>Location</b> : {{data.location}}</ion-row>\n        <br>\n        <ion-row *ngIf="ballotOption == \'yes\'" >\n          <ion-col id="status" ><b>Status</b> : {{status}}</ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-item>\n            <ion-col><b>Booked Date</b> : {{data.bookedDate}}</ion-col>\n          </ion-item>\n        </ion-row>\n        <ion-row>\n          <button ion-button block outline (click)="cancelBooking(data.bookingID)">Cancel Booking</button>\n        </ion-row>\n        <br>\n        <br>\n        <ion-row>\n          <ion-col><b>Add Rating & Comment</b></ion-col>\n        </ion-row>\n        <ion-row>\n          <ionic3-star-rating activeIcon="ios-star" defaultIcon="ios-star-outline" activeColor="#488aff" defaultColor="red"\n            readonly="false" [rating]="rating">\n          </ionic3-star-rating>\n        </ion-row>\n        <ion-row>\n          <ion-textarea placeholder="Enter comment" [(ngModel)]="strComment"></ion-textarea>\n        </ion-row>\n        <ion-row>\n          <button ion-button block outline (click)="comment()">Submit Comment</button>\n        </ion-row>\n      </ion-grid>\n\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\booked-detail\booked-detail.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], BookedDetailPage);
    return BookedDetailPage;
}());

//# sourceMappingURL=booked-detail.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooklistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the BooklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BooklistPage = /** @class */ (function () {
    function BooklistPage(Storage, navCtrl, navParams) {
        this.Storage = Storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getUserList();
    }
    // view user who booked the event selected from book detail page
    BooklistPage.prototype.getUserList = function () {
        var _this = this;
        this.Storage.get('AccountTable').then(function (accountData) {
            var userBookingList = _this.navParams.get('userBookingList');
            var data = __WEBPACK_IMPORTED_MODULE_3_lodash__["map"](userBookingList, function (item) {
                return __WEBPACK_IMPORTED_MODULE_3_lodash__["merge"](item, __WEBPACK_IMPORTED_MODULE_3_lodash__["find"](accountData, { 'uid': item.uid }));
            });
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                data[i].bookedDate = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date(data[i].bookedDate)).format("YYYY-MM-DD");
            }
            _this.userBookingList = data;
        });
    };
    BooklistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-booklist',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\booklist\booklist.html"*/'<!--\n  Generated template for the BooklistPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>booklist</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>     \n        <ion-item *ngFor = "let item of userBookingList">\n          <h2>{{item.name}}</h2>\n          <p>{{item.email}}</p>\n          <button ion-button color="light" item-end> {{item.bookedDate}}   </button> \n        </ion-item>\n      </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\booklist\booklist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], BooklistPage);
    return BooklistPage;
}());

//# sourceMappingURL=booklist.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsChangepasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_server__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_settings__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SettingsChangepasswordPage = /** @class */ (function () {
    function SettingsChangepasswordPage(Storage, navCtrl, alertCtrl, navParams, share) {
        var _this = this;
        this.Storage = Storage;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.share = share;
        this.Storage.get('loginUser').then(function (val) {
            _this.dbPassword = val.Password;
            _this.UserID = val.UserID;
            _this.email = val.Email;
            _this.name = val.Name;
            _this.contact = val.ContactNo;
            _this.accountType = val.AccountType;
        });
    }
    SettingsChangepasswordPage.prototype.ionViewDidLoad = function () {
    };
    SettingsChangepasswordPage.prototype.ChangePassword = function () {
        var _this = this;
        if (this.oldPassword != this.dbPassword) {
            var alert_1 = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Please check your current password',
                buttons: ['OK']
            });
            alert_1.present();
        }
        if (this.newPassword == this.confirmPassword) {
            console.log(this.UserID, this.newPassword);
            this.share.Update(this.UserID, this.email, this.name, this.contact, this.accountType, this.newPassword).subscribe(function (data) {
                var alert = _this.alertCtrl.create({
                    title: 'Success',
                    subTitle: 'Your password has been successfully updated!',
                    buttons: ['OK']
                });
                alert.present();
                _this.share.getAll().subscribe(function (data) {
                    _this.Storage.set('AccountTable', data);
                });
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__settings_settings__["a" /* SettingsPage */]);
            });
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Your new password and confirm new password does not match',
                buttons: ['OK']
            });
            alert_2.present();
        }
    };
    SettingsChangepasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-settings-changepassword',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\settings-changepassword\settings-changepassword.html"*/'<!--\n\n  Generated template for the SettingsChangepasswordPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Change Password</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-list>\n\n    <ion-row>\n\n      <ion-col></ion-col>\n\n      <ion-col>\n\n        <ion-item class="changePassword">\n\n          <ion-label floating>Current Password</ion-label>\n\n          <ion-input type="password" [(ngModel)]="oldPassword"></ion-input>\n\n        </ion-item>\n\n      </ion-col>\n\n      <ion-col></ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col></ion-col>\n\n      <ion-col>\n\n        <ion-item class="changePassword">\n\n          <ion-label floating>New Password</ion-label>\n\n          <ion-input type="password" [(ngModel)]="newPassword"></ion-input>\n\n        </ion-item>\n\n      </ion-col>\n\n      <ion-col></ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col></ion-col>\n\n      <ion-col>\n\n        <ion-item class="changePassword">\n\n          <ion-label floating>Confirm New Password</ion-label>\n\n          <ion-input type="password" [(ngModel)]="confirmPassword"></ion-input>\n\n        </ion-item>\n\n      </ion-col>\n\n      <ion-col></ion-col>\n\n    </ion-row>\n\n\n\n  </ion-list>\n\n  <ion-row>\n\n    <ion-col></ion-col>\n\n    <ion-col>\n\n      <button ion-button block (click)="ChangePassword()" id="btnChangePassword">Change Password</button>\n\n    </ion-col>\n\n    <ion-col></ion-col>\n\n  </ion-row>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\settings-changepassword\settings-changepassword.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */]],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */]])
    ], SettingsChangepasswordPage);
    return SettingsChangepasswordPage;
}());

//# sourceMappingURL=settings-changepassword.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaQsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the FaQsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FaQsPage = /** @class */ (function () {
    function FaQsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    FaQsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FaQsPage');
    };
    FaQsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-fa-qs',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\settings-fa-qs\fa-qs.html"*/'<!--\n\n  Generated template for the FaQsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>FAQs</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-card>\n\n    <ion-card-header>\n\n      Does this app work in Android Phone?\n\n    </ion-card-header>\n\n    <ion-card-content>\n\n      We are currently still working on developing this app \n\n      on Android Phone. \n\n    </ion-card-content>\n\n  </ion-card>\n\n  <ion-card>\n\n    <ion-card-header>\n\n      What if I can\'t turn up for the event?\n\n    </ion-card-header>\n\n    <ion-card-content>\n\n      You can proceed to "My Bookings" page and swipe to your left on the event that you are unable to turn up \n\n      for. You will see a delete button and you can delete \n\n      the event from there.\n\n    </ion-card-content>\n\n  </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\settings-fa-qs\fa-qs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], FaQsPage);
    return FaQsPage;
}());

//# sourceMappingURL=fa-qs.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_server__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_transfer__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_path__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ticketlist_ticketlist__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddEventPage = /** @class */ (function () {
    function AddEventPage(http, navCtrl, navParams, share, camera, file, filePath, transfer, actionSheetCtrl, toastCtrl, platform, loadingCtrl, alertCtrl, Storage) {
        var _this = this;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.share = share;
        this.camera = camera;
        this.file = file;
        this.filePath = filePath;
        this.transfer = transfer;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.Storage = Storage;
        this.lastImage = null;
        this.data = {};
        this.data.username = '';
        this.data.response = '';
        this.http = http;
        this.share.activityGetAll().subscribe(function (data) {
            _this.eventList = __WEBPACK_IMPORTED_MODULE_8_lodash__["uniqBy"](data, 'eventType');
        });
        // when page is in edit mode
        this.pagemode = this.navParams.get('pagemode');
        if (this.pagemode == 'edit') {
            var val = this.navParams.get('iteminfo');
            console.log(val);
            this.eventCode = val.eventCode;
            this.eventName = val.eventname;
            this.eventType = val.eventType;
            this.startDate = val.startDate;
            this.endDate = val.endDate;
            this.quantity = val.quantity;
            this.description = val.description;
            this.location = val.location;
            this.publishTime = val.publishTime;
            if (val.ballotOption == 'yes') {
                this.toggleStatus = true;
            }
            else {
                this.toggleStatus = false;
            }
            if (val.recurring == 'yes') {
                this.recurring = true;
            }
            else {
                this.recurring = false;
            }
            this.lastImage = val.imageName;
        }
        else {
            this.pagemode = 'add';
        }
    }
    AddEventPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddEventPage');
    };
    AddEventPage.prototype.eventCreate = function () {
        var _this = this;
        this.validation();
        // create new events
        this.share.activityCreate(this.eventName, this.eventType, this.startDate, this.endDate, this.quantity, this.description, this.location, this.publishTime, this.lastImage, this.ballotOption, this.recurring).subscribe(function (data) {
            if (data == null) {
                var toast = _this.toastCtrl.create({
                    message: 'Event successfully created',
                    duration: 2000
                });
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'Event successfully created',
                    duration: 2000
                });
                toast.present();
            }
        });
        if (this.lastImage != null) {
            this.uploadImage();
        }
        // call upload image function
        // get the updated eventTable from Database 
        this.share.activityGetAll().subscribe(function (data) {
            _this.Storage.set('EventTicketTable', data);
        });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__ticketlist_ticketlist__["a" /* TicketlistPage */]);
    };
    AddEventPage.prototype.updateEvent = function () {
        var _this = this;
        this.validation();
        this.share.updateActivity(this.eventCode, this.eventName, this.eventType, this.startDate, this.endDate, this.quantity, this.description, this.location, this.publishTime, this.lastImage, this.ballotOption, this.recurring).subscribe(function (data) {
            var toast = _this.toastCtrl.create({
                message: 'Event successfully updated ',
                duration: 2000
            });
            toast.present();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__ticketlist_ticketlist__["a" /* TicketlistPage */]);
        });
    };
    AddEventPage.prototype.presentActionSheet = function () {
        var _this = this;
        // ask for image source, phone library or camera
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Photo Gallery',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    AddEventPage.prototype.validation = function () {
        // list of validation
        if (this.eventName == "") {
            var alert_1 = this.alertCtrl.create({
                message: "Please fill in the event name",
                buttons: ['OK']
            });
            alert_1.present();
            return false;
        }
        ;
        if (this.eventType == "") {
            var alert_2 = this.alertCtrl.create({
                message: "Please fill in the event type",
                buttons: ['OK']
            });
            alert_2.present();
            return false;
        }
        ;
        if (this.startDate == "") {
            var alert_3 = this.alertCtrl.create({
                message: "Please fill in the event start date",
                buttons: ['OK']
            });
            alert_3.present();
            return false;
        }
        ;
        if (this.endDate == "") {
            var alert_4 = this.alertCtrl.create({
                message: "Please fill in the event end date",
                buttons: ['OK']
            });
            alert_4.present();
            return false;
        }
        ;
        if (this.quantity == "") {
            var alert_5 = this.alertCtrl.create({
                message: "Please fill in the ticket quantity",
                buttons: ['OK']
            });
            alert_5.present();
            return false;
        }
        ;
        if (this.description == "") {
            var alert_6 = this.alertCtrl.create({
                message: "Please fill in the event description",
                buttons: ['OK']
            });
            alert_6.present();
            return false;
        }
        ;
        // if (this.operatingHours == "") {
        //   const alert = this.alertCtrl.create({
        //     message: "Please fill in the operating hours of the event",
        //     buttons: ['OK']
        //   });
        //   alert.present();
        //   return false;
        // };
        if (this.location == "") {
            var alert_7 = this.alertCtrl.create({
                message: "Please fill in the event location",
                buttons: ['OK']
            });
            alert_7.present();
            return false;
        }
        ;
        if (this.toggleStatus == true) {
            this.ballotOption = 'yes';
        }
        else {
            this.ballotOption = 'no';
        }
        if (this.recurring == true) {
            this.recurring = 'yes';
        }
        else {
            this.recurring = 'no';
        }
    };
    AddEventPage.prototype.takePicture = function (sourceType) {
        var _this = this;
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
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Error while selecting image.');
        });
    };
    // Create a new name for the image
    AddEventPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    AddEventPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    AddEventPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    AddEventPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    AddEventPage.prototype.uploadImage = function () {
        var _this = this;
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
        var fileTransfer = this.transfer.create();
        this.loading = this.loadingCtrl.create({
            content: 'Uploading...',
            duration: 3000,
        });
        this.loading.present();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            _this.loading.dismissAll();
            _this.presentToast('Image succesfully uploaded.');
            console.log(targetPath);
            console.log(url);
        }, function (err) {
            _this.loading.dismissAll();
            console.log(targetPath);
            console.log(url);
            _this.presentToast('Error while uploading file.');
        });
    };
    AddEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-add-event',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\add-event\add-event.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>Add Event</ion-title>\n    </ion-navbar>\n\n</ion-header>\n<ion-content>\n    <ion-list>\n        <ion-item>\n            <ion-label color="primary">Event Name</ion-label>\n            <ion-input [(ngModel)]="eventName"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label color="primary">Event Type</ion-label>\n            <ion-input placeholder="Event Type" [(ngModel)]="eventType"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label color="primary">Start Date</ion-label>\n            <ion-datetime displayFormat="YYYY/MM/DD" [(ngModel)]="startDate"></ion-datetime>\n        </ion-item>\n\n        <ion-item>\n            <ion-label color="primary">End Date</ion-label>\n            <ion-datetime displayFormat="YYYY/MM/DD" [(ngModel)]="endDate"></ion-datetime>\n        </ion-item>\n\n        <ion-item>\n            <ion-label color="primary">Quantity</ion-label>\n            <ion-input type="number" min="1" [(ngModel)]="quantity"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label color="primary">Location</ion-label>\n            <ion-input [(ngModel)]="location" ></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label color="primary">Event Description</ion-label>\n            <ion-textarea [(ngModel)]="description" ></ion-textarea>\n        </ion-item>\n\n        <ion-item>\n            <ion-label color="primary">Publish Time</ion-label>\n            <ion-datetime displayFormat="YYYY/MM/DD" [(ngModel)]="publishTime"></ion-datetime>\n        </ion-item>\n\n        <ion-item>\n            <ion-label color="primary">Ballot Option</ion-label>\n            <ion-toggle checked="false" [(ngModel)]="toggleStatus"></ion-toggle>\n        </ion-item>\n        <ion-item>\n                <ion-label color="primary">Is this event recurring</ion-label>\n                <ion-toggle checked="false" [(ngModel)]="recurring"></ion-toggle>\n        </ion-item>\n\n\n        <ion-buttons>\n            <button ion-button icon-left (click)="presentActionSheet()">\n                <ion-icon name="camera"></ion-icon>Select Image\n            </button>\n            <ion-item *ngIf="lastImage">\n                    <h4>Image selected</h4>\n                  </ion-item>\n        </ion-buttons>\n        <hr>\n        <br>\n        <br>\n        <ion-row *ngIf= "pagemode == \'add\'">\n            <ion-col></ion-col>\n            <ion-col><ion-button ion-button full icon-left (click)="eventCreate()" id="addEvent">Add Event</ion-button></ion-col>\n            <ion-col></ion-col>\n        </ion-row>\n        <ion-row *ngIf= "pagemode == \'edit\'">\n                <ion-col></ion-col>\n                <ion-col><ion-button ion-button full icon-left (click)="updateEvent()" id="addEvent">update Event</ion-button></ion-col>\n                <ion-col></ion-col>\n            </ion-row>\n        \n'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\add-event\add-event.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */]])
    ], AddEventPage);
    return AddEventPage;
}());

//# sourceMappingURL=add-event.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__server_server__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ticketlist_ticketlist__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__booklist_booklist__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the TicketDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TicketDetailPage = /** @class */ (function () {
    function TicketDetailPage(events, alertController, Storage, http, navCtrl, navParams, share, toastCtrl) {
        var _this = this;
        this.events = events;
        this.alertController = alertController;
        this.Storage = Storage;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.share = share;
        this.toastCtrl = toastCtrl;
        this.data2 = {};
        this.bookingBtn = true;
        this.rating = 0;
        this.getAllDate();
        this.getRating();
        this.Storage.get('loginUser').then(function (val) {
            _this.uid = val.UserID;
            _this.accountType = val.AccountType;
        });
    }
    // Get event infomation selected 
    TicketDetailPage.prototype.getAllDate = function () {
        var _this = this;
        this.Storage.get('EventTicketTable').then(function (data) {
            _this.eventCode = _this.navParams.get('eventCode');
            _this.raw = data;
            _this.data = __WEBPACK_IMPORTED_MODULE_2_lodash__["filter"](_this.raw, ['eventCode', _this.eventCode]);
            _this.convertToDate(_this.data);
        });
        // check if the balloting exist
        this.share.getBallotResult().subscribe(function (data) {
            _this.existResult = data;
        });
    };
    // conversion of date for display purpose
    TicketDetailPage.prototype.convertToDate = function (data) {
        for (var i = 0; i < data.length; i++) {
            data[i].startDate = __WEBPACK_IMPORTED_MODULE_6_moment__(new Date(data[i].startDate)).format("YYYY-MM-DD");
            data[i].endDate = __WEBPACK_IMPORTED_MODULE_6_moment__(new Date(data[i].endDate)).format("YYYY-MM-DD");
            this.ticketAvailable = data[i].quantity;
            this.recurring = data[i].recurring;
            this.ballotOption = data[i].ballotOption;
            this.eventname = data[i].eventname;
            // if the endDate has passed
            if (new Date(data[i].endDate) < new Date()) {
                this.bookingBtn = false;
            }
        }
        return data;
    };
    // get quantity left when specific date is selected
    TicketDetailPage.prototype.getQuantityByDate = function (selectedDate) {
        var _this = this;
        // if recurring is yes, then count by specific date
        if (this.recurring == "yes") {
            this.Storage.get('BookingTable').then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].bookedDate = __WEBPACK_IMPORTED_MODULE_6_moment__(new Date(data[i].bookedDate)).format("YYYY-MM-DD");
                }
                var record = __WEBPACK_IMPORTED_MODULE_2_lodash__["filter"](data, ['bookedDate', __WEBPACK_IMPORTED_MODULE_6_moment__(new Date(selectedDate)).format("YYYY-MM-DD")]);
                console.log("record lengths" + record.length);
                _this.quantityLeft = _this.ticketAvailable - record.length;
            });
        }
        else if (this.ballotOption == "yes") {
            var existResult = __WEBPACK_IMPORTED_MODULE_2_lodash__["filter"](this.existResult, ['eventCode', this.eventCode]);
            this.quantityLeft = this.ticketAvailable - existResult.length;
        }
        else {
            this.Storage.get('BookingTable').then(function (data) {
                var record = __WEBPACK_IMPORTED_MODULE_2_lodash__["filter"](data, ['eventCode', _this.eventCode]);
                console.log("no recurring");
                _this.quantityLeft = _this.ticketAvailable - record.length;
            });
        }
    };
    // get the user infomation who have book the events
    TicketDetailPage.prototype.checkBooking = function () {
        var _this = this;
        this.Storage.get('EventTicketTable').then(function (Eventdata) {
            _this.Storage.get('BookingTable').then(function (bookingdata) {
                var eventCode = _this.navParams.get('eventCode');
                var data = __WEBPACK_IMPORTED_MODULE_2_lodash__["map"](bookingdata, function (item) {
                    return __WEBPACK_IMPORTED_MODULE_2_lodash__["merge"](item, __WEBPACK_IMPORTED_MODULE_2_lodash__["find"](Eventdata, { 'eventCode': parseInt(item.eventCode) }));
                });
                data = __WEBPACK_IMPORTED_MODULE_2_lodash__["filter"](data, ['eventCode', parseInt(eventCode)]);
                _this.userBookingList = data;
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__booklist_booklist__["a" /* BooklistPage */], {
                    userBookingList: _this.userBookingList
                });
            });
        });
    };
    // delete comment function
    TicketDetailPage.prototype.deletecomment = function (item) {
        var _this = this;
        var alert = this.alertController.create({
            message: '<strong>Are you sure to delete comment?</strong>',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: function (blah) {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'YES',
                    handler: function () {
                        console.log(item);
                        _this.share.DeleteRating(item.ratingID).subscribe(function (data) {
                            if (data == null) {
                                var toast = _this.toastCtrl.create({
                                    message: 'Failed to delete comment, please try again',
                                    duration: 2000
                                });
                                toast.present();
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: 'Comment has been successfully deleted',
                                    duration: 2000
                                });
                                _this.share.getRating().subscribe(function (data) {
                                    _this.Storage.set('RatingTable', data);
                                });
                                toast.present();
                            }
                        });
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__ticketlist_ticketlist__["a" /* TicketlistPage */]);
                    }
                }
            ]
        });
        alert.present();
    };
    TicketDetailPage.prototype.getRating = function () {
        var _this = this;
        // get rating from rating tables 
        this.share.getRating().subscribe(function (ratingData) {
            _this.share.getAll().subscribe(function (accountData) {
                var combine = __WEBPACK_IMPORTED_MODULE_2_lodash__["map"](ratingData, function (item) {
                    return __WEBPACK_IMPORTED_MODULE_2_lodash__["merge"](item, __WEBPACK_IMPORTED_MODULE_2_lodash__["find"](accountData, { 'uid': item.uid }));
                });
                console.log(combine, _this.eventCode);
                var data = __WEBPACK_IMPORTED_MODULE_2_lodash__["filter"](combine, ['eventCode', _this.eventCode.toString()]);
                var ratingScore = 0;
                for (var i = 0; i < data.length; i++) {
                    data[i].date = __WEBPACK_IMPORTED_MODULE_6_moment__(new Date(data[i].date)).format("YYYY-MM-DD");
                    ratingScore = ratingScore + parseInt(data[i].rating1);
                }
                ratingScore = Math.round(ratingScore / data.length);
                _this.rating = ratingScore;
                console.log(data);
                _this.commentList = data;
            });
        });
    };
    // booking of event
    TicketDetailPage.prototype.booking = function (eventCode) {
        var _this = this;
        var alert = this.alertController.create({
            message: 'Confirm Booking?',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: function (blah) {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'YES',
                    handler: function () {
                        // check if there is ticket left
                        if (_this.quantityLeft == 0) {
                            var alert_1 = _this.alertController.create({
                                message: 'Sorry, there is no ticket left for the selected date',
                                buttons: ['Ok']
                            });
                            alert_1.present();
                            return false;
                        }
                        console.log(_this.selectedDate);
                        // check if the date is selected
                        if (_this.selectedDate == null) {
                            var alert_2 = _this.alertController.create({
                                message: 'Please select a date',
                                buttons: ['Ok']
                            });
                            alert_2.present();
                            return false;
                        }
                        _this.share.activityGetAll().subscribe(function (data) {
                            _this.Storage.set('EventTicketTable', data);
                        });
                        var date = new Date();
                        _this.Storage.get('loginUser').then(function (val) {
                            var uid = val.UserID;
                            _this.share.bookingCreate(eventCode, uid, date, new Date(_this.selectedDate)).subscribe(function (data) {
                                if (data == null) {
                                    var toast = _this.toastCtrl.create({
                                        message: 'Failed to book event, please try again',
                                        duration: 2000
                                    });
                                    toast.present();
                                }
                                else {
                                    if (_this.ballotOption == "no") {
                                        // when data is created, send the email to their account through sendgrid
                                        // var email = val.Email;
                                        var username = val.Name;
                                        // var link = 'http://172.22.85.131:8080/Test/api.php';
                                        // var myData = JSON.stringify({ userAddress: email, eventname: this.eventname, username: username, newdate:date});
                                        // this.http.post(link, myData)
                                        //   .subscribe(data => {
                                        //     console.log(data["_body"]);
                                        //     this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
                                        //   }, error => {
                                        //     console.log("Oooops!");
                                        //   });
                                        var email = val.Email;
                                        var username = val.Name;
                                        var link = 'http://192.168.1.100:8080/Test/api.php';
                                        var myData = JSON.stringify({ userEmail: email, eventName: _this.eventname, userName: username, newdate: date });
                                        _this.http.post(link, myData)
                                            .subscribe(function (data) {
                                            console.log(data["_body"]);
                                            _this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
                                        }, function (error) {
                                            console.log("Error Sending Email");
                                        });
                                        // var adminemail = 'panwh1024@gmail.com';
                                        // var adminlink = 'http://172.22.85.131:8080/Test/adminapi.php';
                                        // var adminmyData = JSON.stringify({ userAddress: adminemail, username: username, eventname: this.eventname, newdate:date});
                                        // this.http.post(adminlink, adminmyData)
                                        //   .subscribe(data => {
                                        //     console.log(data["_body"]);
                                        //     this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
                                        //   }, error => {
                                        //     console.log("Oooops!");
                                        //   });
                                    }
                                    var toast = _this.toastCtrl.create({
                                        message: 'Event has been successfully booked',
                                        duration: 3000
                                    });
                                    toast.present();
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__ticketlist_ticketlist__["a" /* TicketlistPage */]);
                                }
                            });
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    TicketDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-ticket-detail',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\ticket-detail\ticket-detail.html"*/'<!--\n  Generated template for the AdHocTicketsDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Event Detail</ion-title>\n    <ion-buttons end *ngIf="accountType == \'admin\'">\n      <button ion-button (click)="checkBooking()">Booked By</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n    <ion-card-content *ngFor="let data of data">\n      <img src="http://172.22.85.131:8080/imageTest/uploads/{{data.imageName}}">\n      <ion-grid>\n        <ion-row>\n        <ion-card-title><b>{{data.eventname}}</b></ion-card-title>\n        </ion-row>\n        <ion-row class="blankspace">\n          <p></p>\n        </ion-row>\n\n        <ion-row><b>Event Type</b> : {{data.eventType}}</ion-row>\n        <ion-row class="blankspace">\n          <p></p>\n        </ion-row>\n        <ion-row><b>Description</b> : {{data.description}}</ion-row>\n        <ion-row><b>Date</b> : {{data.startDate}} to {{data.endDate}}</ion-row>\n        <!-- <ion-row><b>Time</b> : {{data.operatingHours}}</ion-row> -->\n        <ion-row><b>Location</b> : {{data.location}}</ion-row>\n        <br>\n        <ion-row class="button1">\n          <ion-item>\n            <ion-label color="primary">Start Date</ion-label>\n            <ion-datetime displayFormat="YYYY-MM-DD" min="{{data.startDate}}" max="{{data.endDate}}" (ionChange)="getQuantityByDate(selectedDate)"\n              [(ngModel)]="selectedDate"></ion-datetime>\n          </ion-item>\n          <ion-item>\n            <ion-label color="primary">Quantity Left: </ion-label>\n            <ion-input [(ngModel)]="quantityLeft" disabled></ion-input>\n          </ion-item>\n        </ion-row>\n        <ion-row *ngIf="bookingBtn == true">\n          <button ion-button block outline (click)="booking(data.eventCode)">Book</button>\n        </ion-row>\n        <ion-row *ngIf="bookingBtn == false">\n          <button ion-button block outline>This event has ended</button>\n        </ion-row>\n      </ion-grid>\n\n    </ion-card-content>\n  </ion-card>\n\n  <ion-item *ngIf="accountType == \'user\'">\n      Overall Rating : <ionic3-star-rating activeIcon="ios-star" defaultIcon="ios-star-outline" activeColor="#488aff" defaultColor="red"\n      readonly="true" [rating]="rating">\n      </ionic3-star-rating>\n\n    <ion-card *ngFor="let item of commentList">\n      <ion-card-content>{{item.comment}}</ion-card-content>\n      <ion-item>\n          <span item-start>{{item.name}}</span>\n          <span item-start>{{item.date}}</span>\n          <ion-icon item-end name="trash" (click)="deletecomment(item)" *ngIf="item.uid == uid"></ion-icon>\n        </ion-item>\n    </ion-card>\n  </ion-item>\n\n  <ion-item *ngIf="accountType == \'admin\'">\n      Rating : <ionic3-star-rating activeIcon="ios-star" defaultIcon="ios-star-outline" activeColor="#488aff" defaultColor="red"\n      readonly="true" [rating]="rating">\n      </ionic3-star-rating>\n        <ion-card *ngFor="let item of commentList">\n            <ion-item>{{item.comment}}</ion-item>\n            <ion-item>\n                <span item-start>By:{{item.name}}</span>\n                <span item-start>Date :{{item.date}}</span>\n                <ion-icon item-end name="trash" (click)="deletecomment(item)"></ion-icon>\n              </ion-item>\n          </ion-card>\n  </ion-item>\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\ticket-detail\ticket-detail.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__server_server__["a" /* ShareService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__server_server__["a" /* ShareService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]) === "function" && _h || Object])
    ], TicketDetailPage);
    return TicketDetailPage;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=ticket-detail.js.map

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 129;

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShareService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ShareService = /** @class */ (function () {
    function ShareService(http) {
        this.http = http;
        this.url = "https://fyp620190204125039.azurewebsites.net/api/";
    }
    ShareService.prototype.login = function (user, pass) {
        var _url = this.url + "ApiLogin";
        var _body = { "Email": user, "Password": pass };
        var _header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'Application/json' });
        var _option = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post, headers: _header });
        return this.http.post(_url, _body, _option).map(function (res) { return res.json(); });
    };
    ShareService.prototype.getAll = function () {
        var url = this.url + "accounts";
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    ShareService.prototype.Create = function (Email, Name, ContactNo, AccountType, Password) {
        var url = this.url + "accounts";
        var body = { "email": Email, "name": Name, "contactNo": ContactNo, "password": Password, "accountType": AccountType };
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var option = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post, headers: header });
        return this.http.post(url, body, option).map(function (res) { return res.json(); });
    };
    ShareService.prototype.Update = function (id, Email, Name, ContactNo, AccountType, Password) {
        var url = this.url + "accounts";
        var body = { "uid": id, "email": Email, "name": Name, "contactNo": ContactNo, "password": Password, "accountType": AccountType };
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var option = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Put, headers: header });
        return this.http.put(url + "/" + id, body, option).map(function (res) { return res.json(); });
    };
    ShareService.prototype.Read = function (id) {
        var url = this.url + "accounts";
        return this.http.get(url + "/" + id).map(function (res) { return res.json(); });
    };
    ShareService.prototype.Delete = function (id) {
        var url = this.url + "accounts";
        return this.http.delete(url + "/" + id).map(function (res) { return res.json(); });
    };
    ShareService.prototype.activityCreate = function (eventName, eventTypes, startDate, endDate, quantity, description, location, publishTime, imgName, ballotOption, recurring) {
        console.log(startDate, endDate, description, quantity, eventName, publishTime, eventTypes, location, imgName, ballotOption, recurring);
        var url = this.url + "eventTickets";
        var body = {
            "startDate": startDate,
            "endDate": endDate,
            "description": description,
            "quantity": quantity,
            "eventname": eventName,
            "publishTime": publishTime,
            "eventType": eventTypes,
            "location": location,
            "imageName": imgName,
            "ballotOption": ballotOption,
            "recurring": recurring
        };
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var option = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post, headers: header });
        return this.http.post(url, body, option).map(function (res) { return function (res) { return res.json(); }; });
    };
    ShareService.prototype.updateActivity = function (eventCode, eventName, eventTypes, startDate, endDate, quantity, description, location, publishTime, imgName, ballotOption, recurring) {
        console.log(eventCode, startDate, endDate, description, quantity, eventName, publishTime, eventTypes, location, imgName, ballotOption, recurring);
        var url = this.url + "eventTickets";
        var body = {
            "eventCode": eventCode,
            "startDate": startDate,
            "endDate": endDate,
            "description": description,
            "quantity": quantity,
            "eventname": eventName,
            "publishTime": publishTime,
            "eventType": eventTypes,
            "location": location,
            "imageName": imgName,
            "ballotOption": ballotOption,
            "recurring": recurring
        };
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var option = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Put, headers: header });
        return this.http.put(url + "/" + eventCode, body, option).map(function (res) { return res.json(); });
    };
    ShareService.prototype.activityGetAll = function () {
        var url = this.url + "eventTickets";
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    ShareService.prototype.activityDel = function (id) {
        var url = this.url + "eventTickets";
        return this.http.delete(url + "/" + id).map(function (res) { return res.json(); });
    };
    ShareService.prototype.bookingCreate = function (eventCode, uid, date, bookedDate) {
        var url = this.url + "bookings";
        var body = { "eventCode": eventCode, "uid": uid, "date": date, "bookedDate": bookedDate };
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var option = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post, headers: header });
        return this.http.post(url, body, option).map(function (res) { return res.json(); });
    };
    // Booking table
    ShareService.prototype.getBooking = function () {
        var url = this.url + "bookings";
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    ShareService.prototype.cancelBooking = function (id) {
        var url = this.url + "bookings";
        return this.http.delete(url + "/" + id).map(function (res) { return res.json(); });
    };
    // Ballot Result Table
    ShareService.prototype.CreateBallotResult = function (eventCode, uid, date, status) {
        var url = this.url + "ballotResults";
        var body = { "eventCode": eventCode, "uid": uid, "date": date, "status": status };
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var option = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post, headers: header });
        return this.http.post(url, body, option).map(function (res) { return res.json(); });
    };
    ShareService.prototype.getBallotResult = function () {
        var url = this.url + "ballotResults";
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    //comment table
    ShareService.prototype.CreateRating = function (eventCode, date, time, uid, comment, rating) {
        var url = this.url + "ratings";
        console.log(eventCode, date, time, uid, comment, rating);
        var body = { "eventCode": eventCode, "date": date, "time": time, "uid": uid, "comment": comment, "rating1": rating };
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var option = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post, headers: header });
        return this.http.post(url, body, option).map(function (res) { return res.json(); });
    };
    ShareService.prototype.DeleteRating = function (id) {
        var url = this.url + "ratings";
        return this.http.delete(url + "/" + id).map(function (res) { return res.json(); });
    };
    ShareService.prototype.getRating = function () {
        var url = this.url + "ratings";
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    ShareService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], ShareService);
    return ShareService;
}());

//# sourceMappingURL=server.js.map

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/ballot/ballot.module": [
		442,
		9
	],
	"../pages/booked-detail/booked-detail.module": [
		443,
		8
	],
	"../pages/booklist/booklist.module": [
		444,
		7
	],
	"../pages/manage-user/manage-user.module": [
		445,
		6
	],
	"../pages/settings-changepassword/settings-changepassword.module": [
		446,
		5
	],
	"../pages/settings-fa-qs/fa-qs.module": [
		447,
		4
	],
	"../pages/settings/settings.module": [
		448,
		3
	],
	"../pages/ticket-by-type/ticket-by-type.module": [
		449,
		0
	],
	"../pages/ticket-detail/ticket-detail.module": [
		450,
		2
	],
	"../pages/ticketlist/ticketlist.module": [
		451,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 170;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupportcontactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SupportcontactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SupportcontactPage = /** @class */ (function () {
    function SupportcontactPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SupportcontactPage.prototype.call = function () {
        setTimeout(function () {
            var tel = '1234567890';
            window.open("tel:" + tel, '_system');
        }, 100);
    };
    SupportcontactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-supportcontact',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\settings-supportcontact\supportcontact.html"*/'<!--\n\n  Generated template for the SupportcontactPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Support</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-row>\n\n    <ion-col></ion-col>\n\n    <ion-col><button ion-button (click)="call()" id=\'btnContactSupport\'>Contact Support</button></ion-col>\n\n    <ion-col></ion-col>\n\n  </ion-row>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\settings-supportcontact\supportcontact.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], SupportcontactPage);
    return SupportcontactPage;
}());

//# sourceMappingURL=supportcontact.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_server__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginPage = /** @class */ (function () {
    function LoginPage(events, Storage, platform, navCtrl, share, toastCtrl, loadingCtrl, navParams) {
        this.events = events;
        this.Storage = Storage;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.share = share;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
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
    LoginPage.prototype.checkRemember = function () {
        var _this = this;
        this.Storage.get('remember').then(function (val) {
            if (val == true) {
                _this.Storage.get('Userinfo').then(function (val2) {
                    _this.userName = val2.Email;
                    _this.passWord = val2.Password;
                    _this.rememberMe = true;
                });
            }
            else {
                _this.userName = "";
                _this.passWord = "";
                _this.rememberMe = false;
            }
        });
    };
    LoginPage.prototype.presentLoading = function () {
        var loader = this.loadingCtrl.create({
            content: "Logging In...",
            duration: 1000
        });
        loader.present();
    };
    LoginPage.prototype.signin = function () {
        var _this = this;
        this.share.login(this.userName, this.passWord).subscribe(function (data) {
            if (data == null) {
                var toast = _this.toastCtrl.create({
                    message: 'Please check your email and password',
                    duration: 2000
                });
                toast.present();
            }
            else {
                // when user login, passed accountType and display repective sidebars
                _this.events.publish('user:login', data);
                // store use info when remember me is ticked
                if (_this.rememberMe == true) {
                    _this.Storage.set('remember', true);
                    _this.Storage.set('Userinfo', data);
                }
                else {
                    _this.Storage.set('remember', false);
                }
                _this.Storage.set('loginUser', data);
                var toast = _this.toastCtrl.create({
                    message: 'Login Successfully',
                    duration: 2000
                });
                toast.present();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            }
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-;ogin',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\login\login.html"*/'<ion-content text-center>\n\n  <div class="bg">\n\n    <div class="head" text-center>\n\n      <img src="../../assets/imgs/logo2.jpg" width="200px" height="200px" id="logo">\n\n    </div>\n\n    <div class="inputs">\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col size="8">\n\n            <div>\n\n              <ion-item id=\'loginEmail\'>\n\n                <ion-label floating>Email</ion-label>\n\n                <ion-input type="email" [(ngModel)]="userName"></ion-input>\n\n              </ion-item>\n\n              <ion-item id=\'loginPassword\'>\n\n                <ion-label floating>Password</ion-label>\n\n                <ion-input type="password" [(ngModel)]="passWord"></ion-input>\n\n              </ion-item>\n\n            </div>\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row>\n\n          <ion-col size="8">\n\n            <div>\n\n              <ion-item class="rememberMe">\n\n                <ion-label>Remember Me</ion-label>\n\n                <ion-checkbox [(ngModel)]="rememberMe"></ion-checkbox>\n\n              </ion-item>\n\n            </div>\n\n          </ion-col>\n\n          <ion-col>\n\n            <div>\n\n              <p>Forgot Password?</p>\n\n            </div>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col>\n\n            <div>\n\n              <button ion-button (click)="signin()" (click)="presentLoading()" id="btnLogin"><b>Login</b></button>\n\n            </div>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\login\login.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BallotPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_server__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the BallotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BallotPage = /** @class */ (function () {
    function BallotPage(navCtrl, navParams, share) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.share = share;
        this.share.activityGetAll().subscribe(function (data1) {
            _this.share.getBooking().subscribe(function (data) {
                _this.BookingData = data;
                _this.AllEventData = data1;
            });
        });
        this.share.getBallotResult().subscribe(function (data) {
            _this.existResult = data;
        });
    }
    BallotPage.prototype.filtering = function (data, data1) {
        for (var i = 0; i < data.length; i++) {
            var AllEventData = __WEBPACK_IMPORTED_MODULE_3_lodash__["filter"](data1, ['ballotOption', 'yes']);
            //console.log(AllEventData);
            var eventcode = AllEventData[i]['eventCode'];
            console.log(eventcode);
            var record = __WEBPACK_IMPORTED_MODULE_3_lodash__["filter"](data, ['eventCode', eventcode]);
            console.log(record);
            var recordLen = { 'record': record.length };
            console.log(recordLen);
        }
        return AllEventData;
    };
    BallotPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BallotPage');
    };
    BallotPage.prototype.ballot = function (eventCode) {
        // check for exist result;
        var existResult = __WEBPACK_IMPORTED_MODULE_3_lodash__["filter"](this.existResult, ['eventCode', eventCode]);
        if (existResult.length > 0) {
            return false;
        }
        var bookingRecord = __WEBPACK_IMPORTED_MODULE_3_lodash__["filter"](this.BookingData, ['eventCode', eventCode]);
        var recordLen = bookingRecord.length;
        var eventInfo = __WEBPACK_IMPORTED_MODULE_3_lodash__["filter"](this.AllEventData, ['eventCode', eventCode]);
        var ticketQuantity = eventInfo[0].quantity;
        // generate randome number in arr
        var arr = [];
        while (arr.length < ticketQuantity) {
            var r = Math.floor(Math.random() * recordLen);
            if (arr.indexOf(r) === -1)
                arr.push(r);
        }
        if (recordLen > ticketQuantity) {
            var bookingResult = [];
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < bookingRecord.length; j++) {
                    if (arr[i] == j) {
                        bookingResult.push(bookingRecord[j]);
                    }
                }
            }
            this.CreateBookingResult(bookingResult);
        }
        else {
            this.CreateBookingResult(bookingRecord);
        }
    };
    BallotPage.prototype.CreateBookingResult = function (data) {
        for (var i = 0; i < data.length; i++) {
            var status = "approve";
            this.share.CreateBallotResult(data[i].eventCode, data[i].uid, data[i].date, status).subscribe(function (data) {
                console.log(data);
            });
        }
    };
    BallotPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-ballot',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\ballot\ballot.html"*/'<!--\n  Generated template for the BallotPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title>Ballot</ion-title>\n    </ion-navbar>\n    \n  </ion-header>\n\n\n<ion-content padding>\n  <ion-card *ngFor="let data of AllEventData">\n    <ion-card-content>\n      <ion-grid>\n          <ion-row >\n            <ion-col><ion-card-title> {{data.eventname}}    {{data.quantity}}   {{data.record}}</ion-card-title></ion-col>\n            <ion-col><button ion-button (click)="ballot(data.eventCode)" id="btnBallot">Ballot</button></ion-col>\n          </ion-row>\n        </ion-grid>\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\ballot\ballot.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */]])
    ], BallotPage);
    return BallotPage;
}());

//# sourceMappingURL=ballot.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(368);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_settings_supportcontact_supportcontact__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_settings_changepassword_settings_changepassword__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_settings_fa_qs_fa_qs__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_manage_user_manage_user__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_add_event_add_event__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_booked_detail_booked_detail__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_ballot_ballot__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_ticketlist_ticketlist__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_ticket_detail_ticket_detail__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_user_form_user_form__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_booklist_booklist__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_common_http__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_status_bar__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_splash_screen__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_server_server__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ionic2_calendar__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_camera__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_file__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_file_transfer__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_file_path__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_transfer__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_ionic3_star_rating__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_call_number_ngx__ = __webpack_require__(441);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_add_event_add_event__["a" /* AddEventPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_settings_supportcontact_supportcontact__["a" /* SupportcontactPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_settings_fa_qs_fa_qs__["a" /* FaQsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_settings_changepassword_settings_changepassword__["a" /* SettingsChangepasswordPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_manage_user_manage_user__["a" /* ManageUserPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_booked_detail_booked_detail__["a" /* BookedDetailPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_ballot_ballot__["a" /* BallotPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_ticketlist_ticketlist__["a" /* TicketlistPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_ticket_detail_ticket_detail__["a" /* TicketDetailPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_user_form_user_form__["a" /* UserFormPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_booklist_booklist__["a" /* BooklistPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_23__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_19__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_24_ionic2_calendar__["a" /* NgCalendarModule */],
                __WEBPACK_IMPORTED_MODULE_31_ionic3_star_rating__["a" /* StarRatingModule */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/ballot/ballot.module#BallotPageModule', name: 'BallotPage', segment: 'ballot', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/booked-detail/booked-detail.module#BookedDetailPageModule', name: 'BookedDetailPage', segment: 'booked-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/booklist/booklist.module#BooklistPageModule', name: 'BooklistPage', segment: 'booklist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/manage-user/manage-user.module#ManageUserPageModule', name: 'ManageUserPage', segment: 'manage-user', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings-changepassword/settings-changepassword.module#SettingsChangepasswordPageModule', name: 'SettingsChangepasswordPage', segment: 'settings-changepassword', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings-fa-qs/fa-qs.module#FaQsPageModule', name: 'FaQsPage', segment: 'fa-qs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ticket-by-type/ticket-by-type.module#TicketByTypePageModule', name: 'TicketByTypePage', segment: 'ticket-by-type', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ticket-detail/ticket-detail.module#TicketDetailPageModule', name: 'TicketDetailPage', segment: 'ticket-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ticketlist/ticketlist.module#TicketlistPageModule', name: 'TicketlistPage', segment: 'ticketlist', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_12__pages_add_event_add_event__["a" /* AddEventPage */],
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_settings_supportcontact_supportcontact__["a" /* SupportcontactPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_settings_fa_qs_fa_qs__["a" /* FaQsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_settings_changepassword_settings_changepassword__["a" /* SettingsChangepasswordPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_manage_user_manage_user__["a" /* ManageUserPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_booked_detail_booked_detail__["a" /* BookedDetailPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_ballot_ballot__["a" /* BallotPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_ticketlist_ticketlist__["a" /* TicketlistPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_ticket_detail_ticket_detail__["a" /* TicketDetailPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_user_form_user_form__["a" /* UserFormPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_booklist_booklist__["a" /* BooklistPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_22__pages_server_server__["a" /* ShareService */],
                __WEBPACK_IMPORTED_MODULE_19__angular_common_http__["a" /* HttpClient */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_file_transfer__["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_transfer__["b" /* TransferObject */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_call_number_ngx__["a" /* CallNumber */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] }
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 172,
	"./af.js": 172,
	"./ar": 173,
	"./ar-dz": 174,
	"./ar-dz.js": 174,
	"./ar-kw": 175,
	"./ar-kw.js": 175,
	"./ar-ly": 176,
	"./ar-ly.js": 176,
	"./ar-ma": 177,
	"./ar-ma.js": 177,
	"./ar-sa": 178,
	"./ar-sa.js": 178,
	"./ar-tn": 179,
	"./ar-tn.js": 179,
	"./ar.js": 173,
	"./az": 180,
	"./az.js": 180,
	"./be": 181,
	"./be.js": 181,
	"./bg": 182,
	"./bg.js": 182,
	"./bm": 183,
	"./bm.js": 183,
	"./bn": 184,
	"./bn.js": 184,
	"./bo": 185,
	"./bo.js": 185,
	"./br": 186,
	"./br.js": 186,
	"./bs": 187,
	"./bs.js": 187,
	"./ca": 188,
	"./ca.js": 188,
	"./cs": 189,
	"./cs.js": 189,
	"./cv": 190,
	"./cv.js": 190,
	"./cy": 191,
	"./cy.js": 191,
	"./da": 192,
	"./da.js": 192,
	"./de": 193,
	"./de-at": 194,
	"./de-at.js": 194,
	"./de-ch": 195,
	"./de-ch.js": 195,
	"./de.js": 193,
	"./dv": 196,
	"./dv.js": 196,
	"./el": 197,
	"./el.js": 197,
	"./en-au": 198,
	"./en-au.js": 198,
	"./en-ca": 199,
	"./en-ca.js": 199,
	"./en-gb": 200,
	"./en-gb.js": 200,
	"./en-ie": 201,
	"./en-ie.js": 201,
	"./en-il": 202,
	"./en-il.js": 202,
	"./en-nz": 203,
	"./en-nz.js": 203,
	"./eo": 204,
	"./eo.js": 204,
	"./es": 205,
	"./es-do": 206,
	"./es-do.js": 206,
	"./es-us": 207,
	"./es-us.js": 207,
	"./es.js": 205,
	"./et": 208,
	"./et.js": 208,
	"./eu": 209,
	"./eu.js": 209,
	"./fa": 210,
	"./fa.js": 210,
	"./fi": 211,
	"./fi.js": 211,
	"./fo": 212,
	"./fo.js": 212,
	"./fr": 213,
	"./fr-ca": 214,
	"./fr-ca.js": 214,
	"./fr-ch": 215,
	"./fr-ch.js": 215,
	"./fr.js": 213,
	"./fy": 216,
	"./fy.js": 216,
	"./gd": 217,
	"./gd.js": 217,
	"./gl": 218,
	"./gl.js": 218,
	"./gom-latn": 219,
	"./gom-latn.js": 219,
	"./gu": 220,
	"./gu.js": 220,
	"./he": 221,
	"./he.js": 221,
	"./hi": 222,
	"./hi.js": 222,
	"./hr": 223,
	"./hr.js": 223,
	"./hu": 224,
	"./hu.js": 224,
	"./hy-am": 225,
	"./hy-am.js": 225,
	"./id": 226,
	"./id.js": 226,
	"./is": 227,
	"./is.js": 227,
	"./it": 228,
	"./it.js": 228,
	"./ja": 229,
	"./ja.js": 229,
	"./jv": 230,
	"./jv.js": 230,
	"./ka": 231,
	"./ka.js": 231,
	"./kk": 232,
	"./kk.js": 232,
	"./km": 233,
	"./km.js": 233,
	"./kn": 234,
	"./kn.js": 234,
	"./ko": 235,
	"./ko.js": 235,
	"./ky": 236,
	"./ky.js": 236,
	"./lb": 237,
	"./lb.js": 237,
	"./lo": 238,
	"./lo.js": 238,
	"./lt": 239,
	"./lt.js": 239,
	"./lv": 240,
	"./lv.js": 240,
	"./me": 241,
	"./me.js": 241,
	"./mi": 242,
	"./mi.js": 242,
	"./mk": 243,
	"./mk.js": 243,
	"./ml": 244,
	"./ml.js": 244,
	"./mn": 245,
	"./mn.js": 245,
	"./mr": 246,
	"./mr.js": 246,
	"./ms": 247,
	"./ms-my": 248,
	"./ms-my.js": 248,
	"./ms.js": 247,
	"./mt": 249,
	"./mt.js": 249,
	"./my": 250,
	"./my.js": 250,
	"./nb": 251,
	"./nb.js": 251,
	"./ne": 252,
	"./ne.js": 252,
	"./nl": 253,
	"./nl-be": 254,
	"./nl-be.js": 254,
	"./nl.js": 253,
	"./nn": 255,
	"./nn.js": 255,
	"./pa-in": 256,
	"./pa-in.js": 256,
	"./pl": 257,
	"./pl.js": 257,
	"./pt": 258,
	"./pt-br": 259,
	"./pt-br.js": 259,
	"./pt.js": 258,
	"./ro": 260,
	"./ro.js": 260,
	"./ru": 261,
	"./ru.js": 261,
	"./sd": 262,
	"./sd.js": 262,
	"./se": 263,
	"./se.js": 263,
	"./si": 264,
	"./si.js": 264,
	"./sk": 265,
	"./sk.js": 265,
	"./sl": 266,
	"./sl.js": 266,
	"./sq": 267,
	"./sq.js": 267,
	"./sr": 268,
	"./sr-cyrl": 269,
	"./sr-cyrl.js": 269,
	"./sr.js": 268,
	"./ss": 270,
	"./ss.js": 270,
	"./sv": 271,
	"./sv.js": 271,
	"./sw": 272,
	"./sw.js": 272,
	"./ta": 273,
	"./ta.js": 273,
	"./te": 274,
	"./te.js": 274,
	"./tet": 275,
	"./tet.js": 275,
	"./tg": 276,
	"./tg.js": 276,
	"./th": 277,
	"./th.js": 277,
	"./tl-ph": 278,
	"./tl-ph.js": 278,
	"./tlh": 279,
	"./tlh.js": 279,
	"./tr": 280,
	"./tr.js": 280,
	"./tzl": 281,
	"./tzl.js": 281,
	"./tzm": 282,
	"./tzm-latn": 283,
	"./tzm-latn.js": 283,
	"./tzm.js": 282,
	"./ug-cn": 284,
	"./ug-cn.js": 284,
	"./uk": 285,
	"./uk.js": 285,
	"./ur": 286,
	"./ur.js": 286,
	"./uz": 287,
	"./uz-latn": 288,
	"./uz-latn.js": 288,
	"./uz.js": 287,
	"./vi": 289,
	"./vi.js": 289,
	"./x-pseudo": 290,
	"./x-pseudo.js": 290,
	"./yo": 291,
	"./yo.js": 291,
	"./zh-cn": 292,
	"./zh-cn.js": 292,
	"./zh-hk": 293,
	"./zh-hk.js": 293,
	"./zh-tw": 294,
	"./zh-tw.js": 294
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 394;

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_manage_user_manage_user__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_user_form_user_form__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_ticketlist_ticketlist__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = /** @class */ (function () {
    function MyApp(events, Storage, platform, statusBar, splashScreen, alertCtrl) {
        var _this = this;
        this.events = events;
        this.Storage = Storage;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.alertCtrl = alertCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        events.subscribe('user:login', function (data) {
            console.log(data);
            if (data.AccountType == 'admin') {
                _this.pages = [
                    { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] },
                    { title: 'Event', component: __WEBPACK_IMPORTED_MODULE_10__pages_ticketlist_ticketlist__["a" /* TicketlistPage */] },
                    { title: 'Setting', component: __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */] },
                    { title: 'User', component: __WEBPACK_IMPORTED_MODULE_9__pages_user_form_user_form__["a" /* UserFormPage */] },
                    { title: 'Log Out', component: __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */] },
                ];
            }
            else {
                _this.pages = [
                    { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] },
                    { title: 'Event', component: __WEBPACK_IMPORTED_MODULE_10__pages_ticketlist_ticketlist__["a" /* TicketlistPage */] },
                    { title: 'Setting', component: __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */] },
                    { title: 'My Profile', component: __WEBPACK_IMPORTED_MODULE_8__pages_manage_user_manage_user__["a" /* ManageUserPage */] },
                    { title: 'Log Out', component: __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */] },
                ];
            }
        });
    }
    MyApp.prototype.showConfirm = function () {
        var confirm = this.alertCtrl.create({
            title: 'DO you want to log out?',
            message: 'log out',
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n    <button ion-item *ngFor="let item of user" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 431:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_server__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ticket_detail_ticket_detail__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__add_event_add_event__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the TicketlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TicketlistPage = /** @class */ (function () {
    function TicketlistPage(toastCtrl, Storage, alertCtrl, storage, navCtrl, share, navParams) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.Storage = Storage;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.share = share;
        this.navParams = navParams;
        this.share.getBooking().subscribe(function (data) {
            _this.Storage.set('BookingTable', data);
        });
        this.Storage.get('loginUser').then(function (val) {
            _this.accountType = val.AccountType;
        });
        // get unique event type value
        this.Storage.get('EventTicketTable').then(function (data) {
            _this.evType = __WEBPACK_IMPORTED_MODULE_3_lodash__["uniqBy"](data, 'eventType');
        });
        this.getall();
    }
    TicketlistPage_1 = TicketlistPage;
    TicketlistPage.prototype.navPage = function (ev) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__ticket_detail_ticket_detail__["a" /* TicketDetailPage */], {
            eventCode: ev
        });
    };
    // filter by event type
    TicketlistPage.prototype.togglePage = function (evType) {
        var _this = this;
        this.searchbar = '';
        this.Storage.get('loginUser').then(function (val) {
            _this.accountType = val.AccountType;
            // if is admin, show all event with 'current' or 'expired' tag.
            if (val.AccountType == 'admin') {
                _this.Storage.get('EventTicketTable').then(function (data) {
                    data = __WEBPACK_IMPORTED_MODULE_3_lodash__["filter"](data, ['eventType', evType]);
                    var eventlist = [];
                    for (var i = 0; i < data.length; i++) {
                        if (new Date(data[i].endDate) > new Date()) {
                            data[i]['status'] = 'current';
                            eventlist.push(data[i]);
                        }
                        if (new Date(data[i].endDate) < new Date()) {
                            data[i]['status'] = 'expired';
                            eventlist.push(data[i]);
                        }
                    }
                    _this.data = eventlist;
                });
            }
            else if (val.AccountType == 'user') {
                _this.Storage.get('EventTicketTable').then(function (data) {
                    data = __WEBPACK_IMPORTED_MODULE_3_lodash__["filter"](data, ['eventType', evType]);
                    var eventlist = [];
                    for (var i = 0; i < data.length; i++) {
                        if (new Date(data[i].endDate) > new Date()) {
                            eventlist.push(data[i]);
                        }
                    }
                    _this.data = eventlist;
                });
            }
        });
    };
    // get list of the events.
    TicketlistPage.prototype.getall = function () {
        var _this = this;
        this.Storage.get('loginUser').then(function (val) {
            _this.accountType = val.AccountType;
            // if is admin, show all event with 'current' or 'expired' tag.
            if (val.AccountType == 'admin') {
                _this.share.activityGetAll().subscribe(function (data) {
                    var eventlist = [];
                    for (var i = 0; i < data.length; i++) {
                        if (new Date(data[i].endDate) > new Date()) {
                            data[i]['status'] = 'current';
                            eventlist.push(data[i]);
                        }
                        if (new Date(data[i].endDate) < new Date()) {
                            data[i]['status'] = 'expired';
                            eventlist.push(data[i]);
                        }
                    }
                    _this.data = eventlist;
                });
            }
            else if (val.AccountType == 'user') {
                _this.share.activityGetAll().subscribe(function (data) {
                    var eventlist = [];
                    for (var i = 0; i < data.length; i++) {
                        if (new Date(data[i].endDate) > new Date()) {
                            eventlist.push(data[i]);
                        }
                    }
                    _this.data = eventlist;
                });
            }
        });
    };
    // edit the item in add event page
    TicketlistPage.prototype.Edit = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__add_event_add_event__["a" /* AddEventPage */], {
            iteminfo: item,
            pagemode: 'edit'
        });
    };
    // search bar
    TicketlistPage.prototype.getItems = function () {
        // set q to the value of the searchbar
        var q = this.searchbar;
        if (!q) {
            this.getall();
            return;
        }
        this.data = this.data.filter(function (v) {
            if (v.eventname && q) {
                if (v.eventname.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
    };
    // delete the events
    TicketlistPage.prototype.presentConfirm = function (item) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirmation',
            message: 'Are you sure to delete the event?',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    cssClass: 'icon-color',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'YES',
                    cssClass: 'icon-color',
                    handler: function (data) {
                        //Call you API to remove Items here.
                        console.log(item.eventCode);
                        _this.share.activityDel(item.eventCode).subscribe(function (data) {
                            if (data == null) {
                                var toast = _this.toastCtrl.create({
                                    message: 'Failed to delete event, please try again',
                                    duration: 2000
                                });
                                toast.present();
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: 'Event successfully deleted ',
                                    duration: 2000
                                });
                                toast.present();
                            }
                        });
                        _this.Storage.get('BookingTable').then(function (data) {
                            var detetingDate = __WEBPACK_IMPORTED_MODULE_3_lodash__["filter"](data, ['eventType', item.eventCode]);
                            for (var i = 0; i < detetingDate.length; i++) {
                                _this.share.cancelBooking(detetingDate[i].bookingID);
                            }
                        });
                        _this.Storage.get('RatingTable').then(function (data) {
                            var detetingDate = __WEBPACK_IMPORTED_MODULE_3_lodash__["filter"](data, ['eventType', item.eventCode]);
                            for (var i = 0; i < detetingDate.length; i++) {
                                _this.share.DeleteRating(detetingDate[i].ratingID);
                            }
                        });
                        _this.Storage.get('BookingTable').then(function (data) {
                            var detetingDate = __WEBPACK_IMPORTED_MODULE_3_lodash__["filter"](data, ['eventType', item.eventCode]);
                            for (var i = 0; i < detetingDate.length; i++) {
                                _this.share.DeleteRating(detetingDate[i].ratingID);
                            }
                        });
                        _this.share.activityGetAll().subscribe(function (data) {
                            _this.Storage.set('EventTicketTable', data);
                        });
                        _this.getall();
                    }
                }
            ]
        });
        alert.present();
    };
    TicketlistPage.prototype.addEventPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__add_event_add_event__["a" /* AddEventPage */]);
    };
    TicketlistPage.prototype.refresh = function () {
        this.navCtrl.setRoot(TicketlistPage_1);
    };
    TicketlistPage = TicketlistPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-ticketlist',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\ticketlist\ticketlist.html"*/'<!--\n  Generated template for the AdHocTicketsDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>Events</ion-title>\n    <ion-buttons end>\n        <button ion-button (click)="refresh()"><ion-icon name="refresh"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding *ngIf= "accountType == \'admin\'">\n    <ion-searchbar (ionInput)="getItems()" [(ngModel)]="searchbar"></ion-searchbar>\n    <div padding>\n      <ion-segment>\n        <ion-segment-button value="data.eventType" *ngFor="let data of evType" (click)="togglePage(data.eventType)">\n          {{data.eventType}}\n        </ion-segment-button>\n      </ion-segment>\n    </div>\n    <ion-list *ngFor="let data of data"> \n        <ion-item-sliding >\n        <ion-item  (click)="navPage(data.eventCode)">\n          <ion-row>\n            <ion-col></ion-col>\n            <ion-col><h1>{{data.eventname}}</h1></ion-col>\n            <ion-col></ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col><img src="http://172.22.85.131:8080/imageTest/uploads/{{data.imageName}}"></ion-col>\n          </ion-row>           \n          <button ion-button color="light" item-end>{{data.status}}</button>     \n        </ion-item>\n\n        <ion-item-options side="right">\n            <button ion-button color="primary" (click)="Edit(data)">\n                  <ion-icon name="ios-create"  ></ion-icon>\n                  Edit\n            </button>\n            <button ion-button color="danger" (click)="presentConfirm(data)" >\n              <ion-icon name="ios-trash" ></ion-icon>\n              Delete\n            </button>\n          </ion-item-options>\n \n  </ion-item-sliding>\n  </ion-list>\n  <ion-fab right bottom >\n    <button ion-fab mini (click)="addEventPage()"><ion-icon name="add" ></ion-icon></button>\n  </ion-fab>\n</ion-content>\n  <ion-content padding *ngIf= "accountType == \'user\'">\n    <ion-searchbar (ionInput)="getItems()" [(ngModel)]="searchbar"></ion-searchbar>\n    <div padding>\n      <ion-segment>\n        <ion-segment-button value="data.eventType" *ngFor="let data of evType" (click)="togglePage(data.eventType)">\n          {{data.eventType}}\n        </ion-segment-button>\n      </ion-segment>\n    </div>\n    <ion-list *ngFor="let data of data"> \n        <ion-item >\n        <ion-item  (click)="navPage(data.eventCode)">\n          <ion-row>\n            <ion-col></ion-col>\n            <ion-col><h1>{{data.eventname}}</h1></ion-col>\n            <ion-col></ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col><img src="http://172.22.85.131:8080/imageTest/uploads/{{data.imageName}}"></ion-col>\n          </ion-row>           \n        </ion-item>\n\n  </ion-item>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\ticketlist\ticketlist.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */]],
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]) === "function" && _g || Object])
    ], TicketlistPage);
    return TicketlistPage;
    var TicketlistPage_1, _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=ticketlist.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__server_server__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__booked_detail_booked_detail__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = /** @class */ (function () {
    function HomePage(Storage, share, navCtrl, modalCtrl, alertCtrl) {
        var _this = this;
        this.Storage = Storage;
        this.share = share;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.eventSource = [];
        this.selectedDay = new Date();
        this.isToday = true;
        this.calendar = {
            mode: 'month',
            currentDate: this.selectedDay
        };
        this.markDisabled = function (date) {
            var current = new Date();
            current.setHours(0, 0, 0);
            return date < current;
        };
        this.CollectEventData();
        // get all the table from Database
        this.share.activityGetAll().subscribe(function (data) {
            _this.Storage.set('EventTicketTable', data);
            _this.evType = __WEBPACK_IMPORTED_MODULE_4_lodash__["uniqBy"](data, 'eventType');
        });
        this.share.getBallotResult().subscribe(function (data) {
            _this.Storage.set('BallotTable', data);
        });
        this.share.getRating().subscribe(function (data) {
            _this.Storage.set('RatingTable', data);
        });
        this.share.getBooking().subscribe(function (data) {
            _this.Storage.set('BookingTable', data);
        });
        this.share.getAll().subscribe(function (data) {
            _this.Storage.set('AccountTable', data);
        });
        this.Storage.get('loginUser').then(function (val) {
            _this.accountType = val.AccountType;
        });
    }
    HomePage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    HomePage.prototype.onEventSelected = function (event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__booked_detail_booked_detail__["a" /* BookedDetailPage */], {
            eventData: event.eventData
        });
    };
    HomePage.prototype.today = function () {
        this.calendar.currentDate = new Date();
    };
    HomePage.prototype.onTimeSelected = function (ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    };
    HomePage.prototype.onCurrentDateChanged = function (event) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    };
    HomePage.prototype.onRangeChanged = function (ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    };
    HomePage.prototype.CollectEventData = function () {
        var _this = this;
        this.share.getBooking().subscribe(function (bookingdata) {
            _this.share.activityGetAll().subscribe(function (Eventdata) {
                _this.Storage.get('loginUser').then(function (val) {
                    if (val.AccountType == 'user') {
                        var uid = val.UserID;
                        // select * from bookingTable a, eventicket b where a.eventcode =b.evencode
                        var combine = __WEBPACK_IMPORTED_MODULE_4_lodash__["map"](bookingdata, function (item) {
                            return __WEBPACK_IMPORTED_MODULE_4_lodash__["merge"](item, __WEBPACK_IMPORTED_MODULE_4_lodash__["find"](Eventdata, { 'eventCode': parseInt(item.eventCode) }));
                        });
                        // filter by user id.
                        var merged = __WEBPACK_IMPORTED_MODULE_4_lodash__["filter"](combine, ['uid', uid]);
                        // push each event to eventSouce for display
                        var events = [];
                        for (var i = 0; i < merged.length; i++) {
                            var mydate = __WEBPACK_IMPORTED_MODULE_2_moment__(merged[i]['bookedDate']).add(1, 'days').toDate();
                            if (merged[i]['ballotOption'] == "yes") {
                                events.push({
                                    title: merged[i]['eventname'],
                                    startTime: mydate,
                                    endTime: mydate,
                                    allDay: true,
                                    img: merged[i]['imageName'],
                                    eventData: merged[i]
                                });
                            }
                            else {
                                events.push({
                                    title: merged[i]['eventname'],
                                    startTime: mydate,
                                    endTime: mydate,
                                    allDay: true,
                                    img: merged[i]['imageName'],
                                    eventData: merged[i]
                                });
                            }
                        }
                        console.log(events);
                        _this.eventSource = events;
                    }
                    else {
                        _this.share.getAll().subscribe(function (UserData) {
                            var merged = __WEBPACK_IMPORTED_MODULE_4_lodash__["map"](bookingdata, function (item) {
                                return __WEBPACK_IMPORTED_MODULE_4_lodash__["merge"](item, __WEBPACK_IMPORTED_MODULE_4_lodash__["find"](Eventdata, { 'eventCode': parseInt(item.eventCode) }));
                            });
                            merged = __WEBPACK_IMPORTED_MODULE_4_lodash__["map"](merged, function (item) {
                                return __WEBPACK_IMPORTED_MODULE_4_lodash__["merge"](item, __WEBPACK_IMPORTED_MODULE_4_lodash__["find"](UserData, { 'uid': parseInt(item.uid) }));
                            });
                            console.log(merged);
                            var events = [];
                            for (var i = 0; i < merged.length; i++) {
                                var mydate = __WEBPACK_IMPORTED_MODULE_2_moment__(merged[i]['bookedDate']).add(1, 'days').toDate();
                                if (merged[i]['ballotOption'] == "yes") {
                                    events.push({
                                        title: merged[i]['eventname'],
                                        startTime: mydate,
                                        endTime: mydate,
                                        allDay: true,
                                        img: merged[i]['imageName'],
                                        eventData: merged[i],
                                        userName: merged[i].name
                                    });
                                }
                                else {
                                    events.push({
                                        title: merged[i]['eventname'],
                                        startTime: mydate,
                                        endTime: mydate,
                                        allDay: true,
                                        img: merged[i]['imageName'],
                                        eventData: merged[i],
                                        userName: merged[i].name
                                    });
                                }
                            }
                            _this.eventSource = events;
                        });
                    }
                });
            });
        });
    };
    HomePage.prototype.togglePage = function (evType) {
        var _this = this;
        // if is admin, show all event with 'current' or 'expired' tag. 
        this.share.getBooking().subscribe(function (bookingdata) {
            _this.share.activityGetAll().subscribe(function (Eventdata) {
                _this.share.getAll().subscribe(function (UserData) {
                    var merged = __WEBPACK_IMPORTED_MODULE_4_lodash__["map"](bookingdata, function (item) {
                        return __WEBPACK_IMPORTED_MODULE_4_lodash__["merge"](item, __WEBPACK_IMPORTED_MODULE_4_lodash__["find"](Eventdata, { 'eventCode': parseInt(item.eventCode) }));
                    });
                    merged = __WEBPACK_IMPORTED_MODULE_4_lodash__["map"](merged, function (item) {
                        return __WEBPACK_IMPORTED_MODULE_4_lodash__["merge"](item, __WEBPACK_IMPORTED_MODULE_4_lodash__["find"](UserData, { 'uid': parseInt(item.uid) }));
                    });
                    merged = __WEBPACK_IMPORTED_MODULE_4_lodash__["filter"](merged, ['eventType', evType]);
                    console.log(merged);
                    var events = [];
                    for (var i = 0; i < merged.length; i++) {
                        var mydate = __WEBPACK_IMPORTED_MODULE_2_moment__(merged[i]['bookedDate']).add(1, 'days').toDate();
                        if (merged[i]['ballotOption'] == "yes") {
                            events.push({
                                title: merged[i]['eventname'],
                                startTime: mydate,
                                endTime: mydate,
                                allDay: true,
                                img: merged[i]['imageName'],
                                eventData: merged[i],
                                userName: merged[i].name
                            });
                        }
                        else {
                            events.push({
                                title: merged[i]['eventname'],
                                startTime: mydate,
                                endTime: mydate,
                                allDay: true,
                                img: merged[i]['imageName'],
                                eventData: merged[i],
                                userName: merged[i].name
                            });
                        }
                    }
                    _this.eventSource = events;
                });
            });
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Home</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button [disabled]="isToday" (click)="today()">Today</button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content *ngIf="accountType == \'admin\'">\n\n  <ng-template #template let-showEventDetail="showEventDetail" let-selectedDate="selectedDate" let-noEventsLabel="noEventsLabel">\n\n    <h4 class="selectedEventDate">{{viewTitle}}</h4>\n\n    <h5 class="noEvents" *ngIf="selectedDate.events.length == 0">No Event</h5>\n\n    <ion-list>\n\n      <ion-row>\n\n        <ion-card *ngFor="let event of selectedDate.events">\n\n          <ion-grid>\n\n            <ion-row>\n\n              <ion-col>\n\n                <div>\n\n                  <img src="http://172.22.71.53/Test/uploads/{{event.img}}">\n\n                </div>\n\n              </ion-col>\n\n              <ion-col size="8">\n\n                <div>\n\n                  <h1 id=\'eventTitle\'>{{event.title}}</h1>\n\n                  <br>\n\n                  <br>\n\n                  <p id="bookedBy">Booked By: <b>{{event.userName}}</b></p>\n\n                </div>\n\n              </ion-col>\n\n            </ion-row>\n\n          </ion-grid>\n\n        </ion-card>\n\n      </ion-row>\n\n    </ion-list>\n\n    <!-- display all event when Today is selected -->\n\n    <ion-list *ngIf="isToday == true">\n\n      <h4 id=\'txtAllBookedEvent\'>All Booked Event</h4>\n\n      <ion-segment>\n\n        <ion-segment-button *ngFor="let data of evType" value="data.eventType" (click)="togglePage(data.eventType)">\n\n          {{data.eventType}}\n\n        </ion-segment-button>\n\n      </ion-segment>\n\n      <ion-card *ngFor="let event of eventSource">\n\n        <ion-grid>\n\n          <ion-row>\n\n            <ion-col>\n\n              <div>\n\n                <img src="http://172.22.71.53/Test/uploads/{{event.img}}">\n\n              </div>\n\n            </ion-col>\n\n            <ion-col size="8">\n\n              <div>\n\n                <h1 id=\'eventTitle\'>{{event.title}}</h1>\n\n                <br>\n\n                <br>\n\n                <p id="bookedBy">Booked By: <b>{{event.userName}}</b></p>\n\n              </div>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-list>\n\n  </ng-template>\n\n  <calendar id="cal" [monthviewEventDetailTemplate]="template" [eventSource]="eventSource" [calendarMode]="calendar.mode"\n\n    [currentDate]="calendar.currentDate" (onCurrentDateChanged)="onCurrentDateChanged($event)" (onEventSelected)="onEventSelected($event)"\n\n    (onTitleChanged)="onViewTitleChanged($event)" (onTimeSelected)="onTimeSelected($event)" step="30">\n\n  </calendar>\n\n</ion-content>\n\n<ion-content *ngIf="accountType == \'user\'">\n\n  <ng-template #template let-showEventDetail="showEventDetail" let-selectedDate="selectedDate" let-noEventsLabel="noEventsLabel">\n\n    <h4 class="selectedEventDate">{{viewTitle}}</h4>\n\n    <h5 class="noEvents" *ngIf="selectedDate.events.length == 0">No Event</h5>\n\n    <ion-list>\n\n      <ion-row>\n\n        <ion-card (click)="onEventSelected(event)" *ngFor="let event of selectedDate.events">\n\n          <ion-grid>\n\n            <ion-row>\n\n              <ion-col>\n\n                <div>\n\n                  <img src="http://172.22.71.53/Test/uploads/{{event.img}}">\n\n                </div>\n\n              </ion-col>\n\n              <ion-col size="8">\n\n                <div>\n\n                  <h1 id=\'eventTitle\'>{{event.title}}\n\n                  </h1>\n\n                </div>\n\n              </ion-col>\n\n            </ion-row>\n\n          </ion-grid>\n\n        </ion-card>\n\n      </ion-row>\n\n    </ion-list>\n\n    <!-- display all event when Today is selected -->\n\n    <ion-list *ngIf="isToday == true">\n\n      <h4 id=\'txtAllBookedEvent\'>All Booked Event</h4>\n\n      <ion-card (click)="onEventSelected(event)" *ngFor="let event of eventSource">\n\n        <ion-grid>\n\n          <ion-row>\n\n            <ion-col>\n\n              <div>\n\n                <img src="http://172.22.85.131:8080/imageTest/uploads/{{event.img}}">\n\n              </div>\n\n            </ion-col>\n\n            <ion-col size="8">\n\n              <div>\n\n                <h1 id=\'eventTitle\'>{{event.title}}</h1>\n\n              </div>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-list>\n\n  </ng-template>\n\n\n\n  <calendar [monthviewEventDetailTemplate]="template" [eventSource]="eventSource" [calendarMode]="calendar.mode"\n\n    [currentDate]="calendar.currentDate" (onCurrentDateChanged)="onCurrentDateChanged($event)" (onEventSelected)="onEventSelected($event)"\n\n    (onTitleChanged)="onViewTitleChanged($event)" (onTimeSelected)="onTimeSelected($event)" step="30">\n\n  </calendar>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\home\home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__server_server__["a" /* ShareService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__server_server__["a" /* ShareService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageUserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_server__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_form_user_form__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the ManageUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ManageUserPage = /** @class */ (function () {
    function ManageUserPage(toastCtrl, Storage, alertCtrl, navCtrl, navParams, share) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.Storage = Storage;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.share = share;
        this.items = [];
        this.pagemode = this.navParams.get('pagemode');
        // show information based on respective pagemode
        if (this.pagemode == 'edit') {
            var val = this.navParams.get('userinfo');
            this.id = val.uid;
            this.email = val.email;
            this.name = val.name;
            this.contact = val.contactNo;
            this.accountType = val.accountType;
            this.password = val.password;
        }
        else if (this.pagemode == 'add') {
            this.id = "";
            this.name = "";
            this.email = "";
            this.contact = "";
            this.password = "";
            this.accountType = "";
        }
        else if (this.pagemode == 'adminview') {
            this.Storage.get('EventTicketTable').then(function (Eventdata) {
                _this.Storage.get('BookingTable').then(function (bookingdata) {
                    // display user infomation
                    var val = _this.navParams.get('userinfo');
                    _this.id = val.uid;
                    _this.email = val.email;
                    _this.name = val.name;
                    _this.contact = val.contactNo;
                    _this.accountType = val.accountType;
                    _this.password = val.password;
                    // filter the booking detail
                    var data = __WEBPACK_IMPORTED_MODULE_5_lodash__["map"](bookingdata, function (item) {
                        return __WEBPACK_IMPORTED_MODULE_5_lodash__["merge"](item, __WEBPACK_IMPORTED_MODULE_5_lodash__["find"](Eventdata, { 'eventCode': item.eventCode }));
                    });
                    data = __WEBPACK_IMPORTED_MODULE_5_lodash__["filter"](data, ['uid', val.uid]);
                    for (var i = 0; i < data.length; i++) {
                        data[i].bookedDate = __WEBPACK_IMPORTED_MODULE_6_moment__(new Date(data[i].bookedDate)).format("YYYY-MM-DD");
                    }
                    _this.eventList = data;
                });
            });
        }
        else {
            this.pagemode = 'view';
            this.getuserinfo();
        }
        console.log(this.pagemode);
    }
    // when user view their accounts
    ManageUserPage.prototype.getuserinfo = function () {
        var _this = this;
        this.Storage.get('AccountTable').then(function (data) {
            _this.Storage.get('loginUser').then(function (val) {
                val = __WEBPACK_IMPORTED_MODULE_5_lodash__["filter"](data, ['uid', val.UserID]);
                _this.id = val[0].uid;
                _this.email = val[0].email;
                _this.name = val[0].name;
                _this.contact = val[0].contactNo;
                _this.accountType = val[0].accountType;
                _this.password = val[0].password;
            });
        });
    };
    // create user
    ManageUserPage.prototype.create = function () {
        var _this = this;
        // validation
        if (this.name == "") {
            var alert_1 = this.alertCtrl.create({
                message: "Please fill in user name",
                buttons: ['OK']
            });
            alert_1.present();
            return false;
        }
        ;
        if (this.email == "") {
            var alert_2 = this.alertCtrl.create({
                message: "Please fill in user email",
                buttons: ['OK']
            });
            alert_2.present();
            return false;
        }
        ;
        if (this.password == "") {
            var alert_3 = this.alertCtrl.create({
                message: "Please fill in user password ",
                buttons: ['OK']
            });
            alert_3.present();
            return false;
        }
        ;
        if (this.contact == "") {
            var alert_4 = this.alertCtrl.create({
                message: "Please fill in user contact",
                buttons: ['OK']
            });
            alert_4.present();
            return false;
        }
        ;
        if (this.accountType == "") {
            var alert_5 = this.alertCtrl.create({
                message: "Please select user type",
                buttons: ['OK']
            });
            alert_5.present();
            return false;
        }
        ;
        this.share.Create(this.email, this.name, this.contact, this.accountType, this.password).subscribe(function (data) {
            if (data == null) {
                var toast = _this.toastCtrl.create({
                    message: 'Failed to create user, please try again',
                    duration: 2000
                });
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'User has been successfully created',
                    duration: 2000
                });
                // get updated accountTable
                _this.share.getAll().subscribe(function (data) {
                    _this.Storage.set('AccountTable', data);
                });
                toast.present();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__user_form_user_form__["a" /* UserFormPage */]);
            }
            ;
        });
    };
    // update the user
    ManageUserPage.prototype.update = function () {
        var _this = this;
        if (this.name == "") {
            var alert_6 = this.alertCtrl.create({
                message: "Please fill in name",
                buttons: ['OK']
            });
            alert_6.present();
            return false;
        }
        ;
        if (this.email == "") {
            var alert_7 = this.alertCtrl.create({
                message: "Please fill in email",
                buttons: ['OK']
            });
            alert_7.present();
            return false;
        }
        ;
        if (this.password == "") {
            var alert_8 = this.alertCtrl.create({
                message: "Please fill in password ",
                buttons: ['OK']
            });
            alert_8.present();
            return false;
        }
        ;
        if (this.contact == "") {
            var alert_9 = this.alertCtrl.create({
                message: "Please fill in contact",
                buttons: ['OK']
            });
            alert_9.present();
            return false;
        }
        ;
        if (this.accountType == "") {
            var alert_10 = this.alertCtrl.create({
                message: "Please select user type",
                buttons: ['OK']
            });
            alert_10.present();
            return false;
        }
        ;
        this.share.Update(this.id, this.email, this.name, this.contact, this.accountType, this.password).subscribe(function (data) {
            var toast = _this.toastCtrl.create({
                message: 'Profile hass been successfully updated',
                duration: 2000
            });
            // get updated accountTable
            _this.share.getAll().subscribe(function (data) {
                _this.Storage.set('AccountTable', data);
            });
            toast.present();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__user_form_user_form__["a" /* UserFormPage */]);
        });
    };
    ManageUserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-manage-user',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\manage-user\manage-user.html"*/'\n<ion-header>\n        <ion-navbar>\n          <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n          <ion-title>User Information</ion-title>\n        </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-list *ngIf= "pagemode == \'view\' || pagemode == \'adminview\'">\n    <ion-item>\n      <ion-label fixed><b>Email</b></ion-label>\n  userDate:any;\n  <ion-input type="text" [(ngModel)]="email" disabled></ion-input>\n    </ion-item>  \n    <ion-item>\n      <ion-label fixed><b>Name</b></ion-label>\n  userDate:any;\n  <ion-input type="text" [(ngModel)]="name" disabled></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label fixed><b>Contact</b></ion-label>\n      <ion-input type="number" [(ngModel)]="contact" disabled></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label fixed><b>Password</b></ion-label>\n      <ion-input type="password" [(ngModel)]="password" disabled></ion-input>\n    </ion-item>\n  </ion-list>\n\n  <ion-list *ngIf= "pagemode == \'add\' || pagemode == \'edit\'">\n      <ion-item>\n        <ion-label fixed>Email</ion-label>\n    <ion-input type="text" [(ngModel)]="email" ></ion-input>\n      </ion-item>  \n      <ion-item>\n        <ion-label fixed>Name</ion-label>\n    <ion-input type="text" [(ngModel)]="name" ></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label fixed>Contact</ion-label>\n        <ion-input type="number" [(ngModel)]="contact" ></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label fixed>Account Type</ion-label>\n          <ion-select [(ngModel)]="accountType">\n              <ion-option value="user">user</ion-option>\n              <ion-option value="admin">admin</ion-option>\n            </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label fixed>Password</ion-label>\n        <ion-input type="password" [(ngModel)]="password" ></ion-input>\n      </ion-item>\n    </ion-list>\n    <ion-row>\n      <ion-col></ion-col>\n      <ion-col>\n        <button ion-button block *ngIf="pagemode == \'add\'" (click)="create()" id="btnCreateUser">Create</button>\n      </ion-col>\n      <ion-col></ion-col>\n    </ion-row>\n  \n    <ion-row>\n      <ion-col></ion-col>\n      <ion-col>\n        <button ion-button block *ngIf="pagemode == \'edit\'" (click)="update()" id="btnUpdateUser">Update</button>\n      </ion-col>\n      <ion-col></ion-col>\n    </ion-row>\n      \n\n\n  <ion-list *ngIf= "pagemode == \'adminview\'">\n    <ion-list *ngFor="let data of eventList"> \n      <ion-labe>Booked Event</ion-labe>\n      <ion-item>\n            {{data.eventname}}   \n      <button ion-button color="light" item-end> {{data.bookedDate}}   </button> \n      </ion-item>\n</ion-list>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\manage-user\manage-user.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */]],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */]])
    ], ManageUserPage);
    return ManageUserPage;
}());

//# sourceMappingURL=manage-user.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_supportcontact_supportcontact__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_fa_qs_fa_qs__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_changepassword_settings_changepassword__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**1
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.navPage = function (pageName) {
        switch (pageName) {
            case 'ChangePassword':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__settings_changepassword_settings_changepassword__["a" /* SettingsChangepasswordPage */]);
                break;
            case 'Supportcontact':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__settings_supportcontact_supportcontact__["a" /* SupportcontactPage */]);
                break;
            case 'FAQs':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__settings_fa_qs_fa_qs__["a" /* FaQsPage */]);
                break;
        }
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\settings\settings.html"*/'<!--\n\n  Generated template for the SettingsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-card>\n\n    <ion-card-content>\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col (click)="navPage(\'ChangePassword\')">Change Password</ion-col>\n\n          <ion-col (click)="navPage(\'ChangePassword\')"><ion-icon name="play" class="menuIcon"></ion-icon></ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ion-card-content>\n\n  </ion-card>\n\n  <ion-card>\n\n    <ion-card-content>\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col (click)="navPage(\'Supportcontact\')">Contact Support</ion-col>\n\n          <ion-col (click)="navPage(\'Supportcontact\')"><ion-icon name="play" class="menuIcon"></ion-icon></ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ion-card-content>\n\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\settings\settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_server__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__manage_user_manage_user__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the UserFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserFormPage = /** @class */ (function () {
    function UserFormPage(Storage, navCtrl, share, toastCtrl, alertCtrl, navParams) {
        this.Storage = Storage;
        this.navCtrl = navCtrl;
        this.share = share;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.items = [];
        this.getAll();
    }
    UserFormPage.prototype.getAll = function () {
        var _this = this;
        this.items = [];
        this.share.getAll().subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                _this.items.push(data[i]);
            }
        });
    };
    // add/edit/view user in manage user page
    UserFormPage.prototype.adduser = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__manage_user_manage_user__["a" /* ManageUserPage */], {
            pagemode: 'add'
        });
    };
    UserFormPage.prototype.view = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__manage_user_manage_user__["a" /* ManageUserPage */], {
            userinfo: item,
            pagemode: 'adminview'
        });
    };
    UserFormPage.prototype.Edit = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__manage_user_manage_user__["a" /* ManageUserPage */], {
            userinfo: item,
            pagemode: 'edit'
        });
    };
    // filter
    UserFormPage.prototype.getItems = function () {
        // set q to the value of the searchbar
        var q = this.searchbar;
        if (!q) {
            this.getAll();
            return;
        }
        this.items = this.items.filter(function (v) {
            if (v.name && q) {
                if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
    };
    UserFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserFormPage');
    };
    //Used for Confirmation message
    UserFormPage.prototype.presentConfirm = function (item) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirmation',
            message: 'Are you sure to delete the user?',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    cssClass: 'icon-color',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'YES',
                    cssClass: 'icon-color',
                    handler: function (data) {
                        console.log('User deleted!');
                        //Call you API to remove Items here.
                        _this.share.Delete(item.uid).subscribe(function (data) {
                            _this.getAll();
                            _this.Storage.get('RatingTable').then(function (data) {
                                var detetingDate = __WEBPACK_IMPORTED_MODULE_5_lodash__["filter"](data, ['uid', item.uid]);
                                for (var i = 0; i < detetingDate.length; i++) {
                                    _this.share.DeleteRating(detetingDate[i].ratingID);
                                }
                            });
                            _this.Storage.get('BookingTable').then(function (data) {
                                var detetingDate = __WEBPACK_IMPORTED_MODULE_5_lodash__["filter"](data, ['uid', item.uid]);
                                for (var i = 0; i < detetingDate.length; i++) {
                                    _this.share.cancelBooking(detetingDate[i].ratingID);
                                }
                            });
                        });
                        var toast = _this.toastCtrl.create({
                            message: 'User has been successfully deleted',
                            duration: 2000
                        });
                        toast.present();
                        _this.share.getAll().subscribe(function (data) {
                            _this.Storage.set('AccountTable', data);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    UserFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-user-form',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\user-form\user-form.html"*/'<!--\n  Generated template for the UserFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Users</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-searchbar (ionInput)="getItems()" [(ngModel)]="searchbar"></ion-searchbar>\n  <ion-list>\n\n    <ion-item-sliding *ngFor="let item of items">\n      <ion-item (click)="view(item)">\n        <p><b>UID</b>: {{item.uid}}</p>\n        <p><b>Email</b>: {{item.email}}</p>\n        <p><b>Name</b>: {{item.name}}</p>\n        <p><b>AccountType</b>: {{item.accountType}}</p>\n      </ion-item>\n      <ion-item-options side="right">\n        <button ion-button color="primary" (click)="Edit(item)">\n          <ion-icon name="ios-create"></ion-icon>\n          Edit\n        </button>\n        <button ion-button color="danger" (click)="presentConfirm(item)">\n          <ion-icon name="ios-trash"></ion-icon>\n          Delete\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n  <ion-fab right bottom>\n    <button ion-fab mini (click)="adduser()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\user-form\user-form.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__server_server__["a" /* ShareService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], UserFormPage);
    return UserFormPage;
}());

//# sourceMappingURL=user-form.js.map

/***/ })

},[347]);
//# sourceMappingURL=main.js.map
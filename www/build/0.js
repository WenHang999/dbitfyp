webpackJsonp([0],{

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicketByTypePageModule", function() { return TicketByTypePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ticket_by_type__ = __webpack_require__(452);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TicketByTypePageModule = /** @class */ (function () {
    function TicketByTypePageModule() {
    }
    TicketByTypePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__ticket_by_type__["a" /* TicketByTypePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__ticket_by_type__["a" /* TicketByTypePage */]),
            ],
        })
    ], TicketByTypePageModule);
    return TicketByTypePageModule;
}());

//# sourceMappingURL=ticket-by-type.module.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketByTypePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_event_add_event__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__server_server__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ticketlist_ticketlist__ = __webpack_require__(47);
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
 * Generated class for the TicketByTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TicketByTypePage = /** @class */ (function () {
    function TicketByTypePage(Storage, share, navCtrl, navParams, alertCtrl, modalCtrl) {
        var _this = this;
        this.Storage = Storage;
        this.share = share;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.share.activityGetAll().subscribe(function (data) {
            _this.data = __WEBPACK_IMPORTED_MODULE_5_lodash__["uniqBy"](data, 'eventType');
        });
        this.Storage.get('loginUser').then(function (val) {
            _this.accountType = val.AccountType;
        });
    }
    TicketByTypePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdHocTicketsPage');
    };
    TicketByTypePage.prototype.navPage = function (eventType) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__ticketlist_ticketlist__["a" /* TicketlistPage */], {
            eventsType: eventType
        });
    };
    TicketByTypePage.prototype.addEventPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__add_event_add_event__["a" /* AddEventPage */]);
    };
    TicketByTypePage.prototype.showConfirm = function () {
        var confirm = this.alertCtrl.create({
            title: 'Arre you SURE!!?',
            message: 'This action cannot be revert',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    TicketByTypePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-ticket-by-type',template:/*ion-inline-start:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\ticket-by-type\ticket-by-type.html"*/'\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n  \n</ion-header>\n<ion-content padding>\n\n<ion-list>\n    <ion-item-sliding #item>\n      \n <ion-item   *ngFor="let data of data">\n  <ion-card (click)="navPage(data.eventType)" >\n    <ion-card-content>\n      <ion-card-title>\n          {{data.eventType}}\n        </ion-card-title>\n    </ion-card-content>\n  </ion-card>\n</ion-item >\n\n  <ion-item-options side="left">\n      <button ion-button (click)="favorite(item)">Favorite</button>\n      <button ion-button color="danger" (click)="share(item)">Share</button>\n    </ion-item-options>\n\n    <ion-item-options side="right">\n      <button ion-button danger (click)="showConfirm()">Delete</button>\n    </ion-item-options>\n  </ion-item-sliding>\n</ion-list>\n\n<ion-fab right bottom *ngIf= "accountType == \'admin\'">\n  <button ion-fab mini (click)="addEventPage()"><ion-icon name="add" ></ion-icon></button>\n</ion-fab>\n</ion-content>\n\n\n'/*ion-inline-end:"C:\Users\pan\Documents\GitHub\FYP - Copy\src\pages\ticket-by-type\ticket-by-type.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__server_server__["a" /* ShareService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__server_server__["a" /* ShareService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], TicketByTypePage);
    return TicketByTypePage;
}());

//# sourceMappingURL=ticket-by-type.js.map

/***/ })

});
//# sourceMappingURL=0.js.map
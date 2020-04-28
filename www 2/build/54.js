webpackJsonp([54],{

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingPageModule", function() { return BookingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__booking__ = __webpack_require__(915);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BookingPageModule = (function () {
    function BookingPageModule() {
    }
    BookingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__booking__["a" /* BookingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__booking__["a" /* BookingPage */]),
            ],
        })
    ], BookingPageModule);
    return BookingPageModule;
}());

//# sourceMappingURL=booking.module.js.map

/***/ }),

/***/ 915:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_server_server__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BookingPage = (function () {
    function BookingPage(toastCtrl, loadingCtrl, server, global, navCtrl, navParams) {
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.server = server;
        this.global = global;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.errorMenu = false;
        this.type = 'Pending';
        this.booking_history();
    }
    BookingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BookingPage');
    };
    BookingPage.prototype.add_bookings = function () {
        this.navCtrl.push('AddBookingPage');
    };
    BookingPage.prototype.ionViewWillEnter = function () {
        this.booking_history();
    };
    BookingPage.prototype.doRefresh = function (refresher) {
        this.booking_history();
        refresher.complete();
    };
    BookingPage.prototype.onSegmentChanged = function () {
    };
    BookingPage.prototype.booking_history = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.booking_history();
        response.subscribe(function (data) {
            console.log("Bookings ", data);
            if (data.status == true) {
                _this.bookings = data.data;
                if (_this.bookings.length == 0) {
                    _this.errorMenu = true;
                }
            }
            else {
                _this.errorMenu = true;
            }
            loading.dismiss();
        }, function (error) {
            loading.dismiss();
            _this.global.alertMessage("Failure", "Something went wrong check your internet connection.");
        });
    };
    BookingPage.prototype.cancelBooking = function (booking) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.booking_cancel(booking.id);
        response.subscribe(function (data) {
            if (data.status == true) {
                _this.global.presentToast(data.message);
                _this.booking_history();
            }
            else {
                _this.global.presentToast(data.message);
            }
            loading.dismiss();
        }, function (error) {
            loading.dismiss();
            _this.global.alertMessage("Failure", "Something went wrong check your internet connection.");
        });
    };
    BookingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-booking',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/booking/booking.html"*/'<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>My Bookings</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <ion-segment color=\'primary\' [(ngModel)]="type" (ionChange)="onSegmentChanged()">\n    <ion-segment-button value="Pending">\n      Pending\n    </ion-segment-button>\n    <ion-segment-button value="Cancelled">\n      Cancelled\n    </ion-segment-button>\n    <ion-segment-button value="Completed">\n      Completed\n    </ion-segment-button>\n    <ion-segment-button value="Rejected">\n      Rejected\n    </ion-segment-button>\n    <ion-segment-button value="Accepted">\n      Accepted\n    </ion-segment-button>\n  </ion-segment>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull down to refresh" refreshingSpinner="circles"\n      refreshingText="Refreshing...">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <div *ngIf="errorMenu == true">\n    <p\n      style="padding-top: calc(50% - 11px); padding-right:20px; padding-left:20px; text-align: center; font-size: 22px; color:#a8a3a3;">\n      <ion-icon name="eye-off"></ion-icon>\n    </p>\n    <p no-margin style="padding-right:20px; padding-left:20px; text-align: center; font-size: 14px;">No Bookings</p>\n  </div>\n\n  <div [ngSwitch]="type">\n\n    <div *ngSwitchCase="\'Pending\'">\n      <div *ngFor="let booking of bookings">\n        <ion-card *ngIf="booking.status == \'pending\'">\n          <ion-row>\n            <ion-col col-6>\n              <p>{{booking.service_name}}</p>\n              <p>{{booking.time_slot}}</p>\n            </ion-col>\n\n            <ion-col col-6>\n              <p>{{booking.stylist_name}}</p>\n              <p>{{booking.date}}</p>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="border-top:1px dashed #ccc;padding-top: 7px">\n            <ion-col col-6>\n              <h2>Booking id: {{booking.id}}</h2>\n            </ion-col>\n\n            <ion-col col-6>\n              <h2>{{booking.status}}</h2>\n            </ion-col>\n          </ion-row>\n\n          <ion-row>\n            <button ion-button block round margin-top color="danger" (click)="cancelBooking(booking)">Cancel\n              Booking</button>\n          </ion-row>\n        </ion-card>\n      </div>\n    </div>\n\n    <div *ngSwitchCase="\'Cancelled\'">\n      <div *ngFor="let booking of bookings">\n        <ion-card *ngIf="booking.status == \'cancelled\'">\n          <ion-row>\n            <ion-col col-6>\n              <p>{{booking.service_name}}</p>\n              <p>{{booking.time_slot}}</p>\n            </ion-col>\n\n            <ion-col col-6>\n              <p>{{booking.stylist_name}}</p>\n              <p>{{booking.date}}</p>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="border-top:1px dashed #ccc;padding-top: 7px">\n            <ion-col col-6>\n              <h2>Booking id: {{booking.id}}</h2>\n            </ion-col>\n\n            <ion-col col-6>\n              <h2>{{booking.status}}</h2>\n            </ion-col>\n          </ion-row>\n        </ion-card>\n      </div>\n    </div>\n\n    <div *ngSwitchCase="\'Completed\'">\n      <div *ngFor="let booking of bookings">\n        <ion-card *ngIf="booking.status == \'completed\'">\n          <ion-row>\n            <ion-col col-6>\n              <p>{{booking.service_name}}</p>\n              <p>{{booking.time_slot}}</p>\n            </ion-col>\n\n            <ion-col col-6>\n              <p>{{booking.stylist_name}}</p>\n              <p>{{booking.date}}</p>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="border-top:1px dashed #ccc;padding-top: 7px">\n            <ion-col col-6>\n              <h2>Booking id: {{booking.id}}</h2>\n            </ion-col>\n\n            <ion-col col-6>\n              <h2>{{booking.status}}</h2>\n            </ion-col>\n          </ion-row>\n        </ion-card>\n      </div>\n    </div>\n\n    <div *ngSwitchCase="\'Rejected\'">\n      <div *ngFor="let booking of bookings">\n        <ion-card *ngIf="booking.status == \'rejected\'">\n          <ion-row>\n            <ion-col col-6>\n              <p>{{booking.service_name}}</p>\n              <p>{{booking.time_slot}}</p>\n            </ion-col>\n\n            <ion-col col-6>\n              <p>{{booking.stylist_name}}</p>\n              <p>{{booking.date}}</p>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="border-top:1px dashed #ccc;padding-top: 7px">\n            <ion-col col-6>\n              <h2>Booking id: {{booking.id}}</h2>\n            </ion-col>\n\n            <ion-col col-6>\n              <h2>{{booking.status}}</h2>\n            </ion-col>\n          </ion-row>\n        </ion-card>\n      </div>\n    </div>\n\n    <div *ngSwitchCase="\'Accepted\'">\n      <div *ngFor="let booking of bookings">\n        <ion-card *ngIf="booking.status == \'accepted\'">\n          <ion-row>\n            <ion-col col-6>\n              <p>{{booking.service_name}}</p>\n              <p>{{booking.time_slot}}</p>\n            </ion-col>\n\n            <ion-col col-6>\n              <p>{{booking.stylist_name}}</p>\n              <p>{{booking.date}}</p>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="border-top:1px dashed #ccc;padding-top: 7px">\n            <ion-col col-6>\n              <h2>Booking id: {{booking.id}}</h2>\n            </ion-col>\n\n            <ion-col col-6>\n              <h2>{{booking.status}}</h2>\n            </ion-col>\n          </ion-row>\n\n          <ion-row>\n            <button ion-button block round margin-top color="danger" (click)="cancelBooking(booking)">Cancel\n              Booking</button>\n          </ion-row>\n        </ion-card>\n      </div>\n    </div>\n\n  </div>\n\n  <ion-fab>\n    <button ion-fab color="primary" (click)="add_bookings()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/booking/booking.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], BookingPage);
    return BookingPage;
}());

//# sourceMappingURL=booking.js.map

/***/ })

});
//# sourceMappingURL=54.js.map
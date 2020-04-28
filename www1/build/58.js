webpackJsonp([58],{

/***/ 715:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddBookingPageModule", function() { return AddBookingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_booking__ = __webpack_require__(913);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddBookingPageModule = (function () {
    function AddBookingPageModule() {
    }
    AddBookingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__add_booking__["a" /* AddBookingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__add_booking__["a" /* AddBookingPage */]),
            ],
        })
    ], AddBookingPageModule);
    return AddBookingPageModule;
}());

//# sourceMappingURL=add-booking.module.js.map

/***/ }),

/***/ 913:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddBookingPage; });
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




var AddBookingPage = (function () {
    function AddBookingPage(toastCtrl, loadingCtrl, server, global, navCtrl, navParams) {
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.server = server;
        this.global = global;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.book_time = 'now';
        this.value = this.formatDate();
        this.get_services();
    }
    AddBookingPage.prototype.formatDate = function () {
        var d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    };
    AddBookingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddBookingPage');
    };
    AddBookingPage.prototype.get_services = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.get_services();
        response.subscribe(function (data) {
            if (data.status == true) {
                _this.services = data.services;
            }
            loading.dismiss();
        }, function (error) {
            loading.dismiss();
            _this.global.alertMessage("Failure", "Something went wrong check your internet connection.");
        });
    };
    AddBookingPage.prototype.setService = function () {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: 'Loading...',
        });
        toast.present();
        var response = this.server.get_stylist(this.service);
        response.subscribe(function (data) {
            if (data.status == true) {
                _this.stylist_list = data.stylist;
            }
            toast.dismiss();
        }, function (error) {
            toast.dismiss();
            _this.global.alertMessage("Failure", "Something went wrong check your internet connection.");
        });
    };
    AddBookingPage.prototype.setStylist = function () {
        var _this = this;
        console.log("Time in stylist ", this.schedule_time);
        var toast = this.toastCtrl.create({
            message: 'Loading...',
        });
        toast.present();
        if (this.book_time == 'now') {
            this.schedule_time = 'now';
        }
        var response = this.server.get_slots(this.service, this.stylist, this.schedule_time);
        response.subscribe(function (data) {
            if (data.status == true) {
                _this.timings = data.slots;
            }
            else {
                _this.global.presentToast(data.message);
            }
            toast.dismiss();
        }, function (error) {
            toast.dismiss();
            _this.global.alertMessage("Failure", "Something went wrong check your internet connection.");
        });
    };
    AddBookingPage.prototype.book = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.booking_salon(this.service, this.stylist, this.timing);
        response.subscribe(function (data) {
            _this.global.presentToast(data.message);
            if (data.status == true) {
                _this.navCtrl.pop();
            }
            loading.dismiss();
        }, function (error) {
            loading.dismiss();
            _this.global.alertMessage("Failure", "Something went wrong check your internet connection.");
        });
    };
    AddBookingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-booking',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/add-booking/add-booking.html"*/'<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>Book Now</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <ion-list radio-group [(ngModel)]="book_time">\n    <ion-item>\n      <ion-label>Book Now</ion-label>\n      <ion-radio value="now" checked></ion-radio>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Schedule Booking</ion-label>\n      <ion-radio value="schedule"></ion-radio>\n    </ion-item>\n  </ion-list>\n\n  <ion-item *ngIf="book_time == \'schedule\'">\n    <ion-label>Booking Time</ion-label>\n    <ion-datetime min="{{value}}" displayFormat="YYYY-MM-DD" pickerFormat="YYYY-MM-DD" [(ngModel)]="schedule_time">\n    </ion-datetime>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Services</ion-label>\n    <ion-select [(ngModel)]="service" (ionChange)="setService()">\n      <ion-option *ngFor="let s of services" value={{s.id}}>{{s.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Stylist</ion-label>\n    <ion-select [(ngModel)]="stylist" (ionChange)="setStylist()">\n      <ion-option *ngFor="let s of stylist_list" value={{s.stylist_id}}>{{s.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Timings</ion-label>\n    <ion-select [(ngModel)]="timing">\n      <ion-option *ngFor="let s of timings" value={{s.time_slot}}>{{s.time}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <button ion-button block round margin-top (click)="book()"> Book Now</button>\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/add-booking/add-booking.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], AddBookingPage);
    return AddBookingPage;
}());

//# sourceMappingURL=add-booking.js.map

/***/ })

});
//# sourceMappingURL=58.js.map
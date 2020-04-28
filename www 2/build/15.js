webpackJsonp([15],{

/***/ 746:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReservationCheckingPageModule", function() { return ReservationCheckingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reservation_checking__ = __webpack_require__(944);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ReservationCheckingPageModule = (function () {
    function ReservationCheckingPageModule() {
    }
    ReservationCheckingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__reservation_checking__["a" /* ReservationCheckingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__reservation_checking__["a" /* ReservationCheckingPage */]),
            ],
        })
    ], ReservationCheckingPageModule);
    return ReservationCheckingPageModule;
}());

//# sourceMappingURL=reservation-checking.module.js.map

/***/ }),

/***/ 944:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReservationCheckingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_loading_loading_controller__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__(25);
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
 * Generated class for the ReservationCheckingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReservationCheckingPage = (function () {
    function ReservationCheckingPage(global, server, loadingctrl, alertctrl, navCtrl, navParams) {
        this.global = global;
        this.server = server;
        this.loadingctrl = loadingctrl;
        this.alertctrl = alertctrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.customers = 1;
        this.no_of_people_array = new Array();
        this.notes = '';
        this.ordersEnabled = navParams.get('ordersEnabled');
        this.date = new Date();
        this.datenow = this.date.getDate();
        this.month = this.date.getMonth() + 1;
        console.log(this.date, this.month);
        this.year = this.date.getFullYear();
        this.month = this.month.toString();
        this.day = this.date.getDay();
        this.datenow = this.datenow.toString();
        this.hours = this.date.getHours();
        this.min = this.date.getMinutes();
        console.log(this.hours, this.min);
        if (this.month.length == 1) {
            this.month = "0" + this.month;
        }
        if (this.datenow.length == 1) {
            this.datenow = "0" + this.datenow;
        }
        console.log("month", this.year, this.month, this.datenow);
        this.value = this.year + "-" + this.month + "-" + this.datenow;
        this.value.toString();
        var date = new Date();
        var date1 = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();
        console.log("offset", this.date.getTimezoneOffset);
        this.myDate = date1;
        for (var i = 2; i <= 100; i++) {
            this.no_of_people_array.push(i);
        }
        console.log(this.no_of_people_array);
    }
    ReservationCheckingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReservationCheckingPage');
    };
    ReservationCheckingPage.prototype.checkReservation = function () {
        var _this = this;
        console.log(this.notes, "notes");
        var loading = this.loadingctrl.create({
            content: "loading...",
        });
        loading.present();
        var res = this.server.ReservationChecking(this.customers, this.myDate)
            .subscribe(function (data) {
            loading.dismiss();
            if (data.status == 'true') {
                _this.prompt();
            }
            else {
                var alert_1 = _this.alertctrl.create({
                    title: 'Oops',
                    subTitle: 'Sorry,reservation not available,please try again later.',
                    buttons: ['Okay']
                });
                alert_1.present();
            }
        }, function (error) {
            var alert = _this.alertctrl.create({
                title: 'Error',
                subTitle: 'Server times out, please try again.',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    ReservationCheckingPage.prototype.prompt = function () {
        var _this = this;
        var prompt = this.alertctrl.create({
            title: 'Available',
            message: "Reservation is available. Do you want to confirm your reservation?",
            buttons: [
                {
                    text: 'No',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        console.log('OK clicked');
                        _this.placeReservation();
                    }
                }
            ]
        });
        prompt.present();
    };
    ReservationCheckingPage.prototype.placeReservation = function () {
        var _this = this;
        var loading = this.loadingctrl.create({
            content: "loading...",
        });
        loading.present();
        var res = this.server.AddReservation(this.customers, this.myDate, this.notes)
            .subscribe(function (data) {
            loading.dismiss();
            if (data.status == 'true') {
                console.log("resevration data", data);
                _this.reservation_id = data.reservation_id;
                console.log("local reservation_id", _this.reservation_id);
                var prompt_1 = _this.alertctrl.create({
                    title: 'Congratulations',
                    message: "Your reservation has been sucessfully placed.",
                    buttons: [
                        {
                            text: 'Okay',
                            handler: function (data) {
                                console.log('OK clicked');
                                if (_this.ordersEnabled == 'active') {
                                    _this.AskToOrder();
                                }
                            }
                        }
                    ]
                });
                prompt_1.present();
            }
            else {
                var alert_2 = _this.alertctrl.create({
                    title: 'Oops',
                    subTitle: 'Something went wrong please try again.',
                    buttons: ['Okay']
                });
                alert_2.present();
            }
        }, function (error) {
            var alert = _this.alertctrl.create({
                title: 'Error',
                subTitle: 'Server times out, please try again',
                buttons: ['Okay']
            });
            alert.present();
        });
    };
    ReservationCheckingPage.prototype.AskToOrder = function () {
        var _this = this;
        var prompt = this.alertctrl.create({
            title: 'Place Order',
            message: "Do you want to order as well?",
            buttons: [
                {
                    text: 'No',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        console.log('OK clicked');
                        _this.global.reservation_id = _this.reservation_id;
                        _this.global.type = 'reservation';
                        console.log("reservation_id", _this.global.reservation_id);
                        _this.navCtrl.push('CategoryPage');
                    }
                }
            ]
        });
        setTimeout(function () {
            prompt.present();
        }, 500);
    };
    ReservationCheckingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-reservation-checking',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/reservation-checking/reservation-checking.html"*/'<!--\n  Generated template for the ReservationCheckingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Reservation Request </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n\n  <ion-list style="padding: 10px;margin-bottom: 10px;">\n    <ion-item>\n      <ion-label>Name</ion-label>\n      <ion-input [(ngModel)]="name"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Date Time</ion-label>\n      <ion-datetime displayFormat="MMM DD YYYY h:mm a" placeholder="MMM DD YYYY HH:mm" min="{{value}}" [(ngModel)]="myDate">\n      </ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label> No of people</ion-label>\n      <ion-select placeholer="1,2,3" [(ngModel)]="customers">\n        <ion-option selected="true" value="1">1</ion-option>\n        <ion-option *ngFor="let n of no_of_people_array" value={{n}}>{{n}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label> Notes(if any)</ion-label>\n      <ion-textarea [(ngModel)]="notes">\n\n      </ion-textarea>\n    </ion-item>\n  </ion-list>\n \n    <button ion-button (tap)="checkReservation()" style="    width: 95%;\n    margin-left: 2.5%;\n    position: absolute;\n    bottom: 0;" block> Check Availablity </button>\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/reservation-checking/reservation-checking.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], ReservationCheckingPage);
    return ReservationCheckingPage;
}());

//# sourceMappingURL=reservation-checking.js.map

/***/ })

});
//# sourceMappingURL=15.js.map
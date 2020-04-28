webpackJsonp([37],{

/***/ 732:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsPageModule", function() { return EventsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events__ = __webpack_require__(930);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventsPageModule = (function () {
    function EventsPageModule() {
    }
    EventsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__events__["a" /* EventsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__events__["a" /* EventsPage */]),
            ],
        })
    ], EventsPageModule);
    return EventsPageModule;
}());

//# sourceMappingURL=events.module.js.map

/***/ }),

/***/ 930:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsPage; });
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




var EventsPage = (function () {
    function EventsPage(loadingCtrl, server, global, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.server = server;
        this.global = global;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.errorMenu = false;
    }
    EventsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventsPage');
        this.get_events();
    };
    EventsPage.prototype.get_events = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.get_events();
        response.subscribe(function (data) {
            console.log("events_usman", data);
            _this.events = data.data;
            if (_this.events.length == 0) {
                _this.errorMenu = true;
            }
            else {
                _this.errorMenu = false;
            }
            loading.dismiss();
        }, function (error) {
            _this.global.alertMessage("Failure", "Something went wrong check your internet connection.");
        });
    };
    EventsPage.prototype.open_detail = function (item) {
        this.navCtrl.push('EventDetailPage', { detail: item });
    };
    EventsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-events',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/events/events.html"*/'\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n      <!-- <ion-buttons  start>\n          <button ion-button icon-only  menuToggle>\n            <ion-icon  name="md-menu"></ion-icon>\n          </button>\n        </ion-buttons> -->\n    <ion-title>Events</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <div *ngIf="errorMenu == true">\n        <p style="padding-top: calc(50% - 11px); padding-right:20px; padding-left:20px; text-align: center; font-size: 22px; color:#a8a3a3;"><ion-icon name="eye-off"></ion-icon></p>\n        <p no-margin style="padding-right:20px; padding-left:20px; text-align: center; font-size: 14px;">No Events</p>\n    </div>\n  <div *ngFor="let item of events">\n      <ion-row class="myfontsize">\n          {{item.date}}\n        </ion-row>\n        <ion-card *ngFor="let i of item.events" (click)="open_detail(i)"> \n          <ion-row>\n            <ion-col col-3>\n              <img src={{i.image}}>\n            </ion-col>\n            <ion-col col-9>\n                <div>{{i.time}}</div>\n                <div class="myfontsize">{{i.title}}</div>\n            </ion-col>\n          </ion-row>\n          \n        </ion-card>\n  </div>\n  \n\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/events/events.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], EventsPage);
    return EventsPage;
}());

//# sourceMappingURL=events.js.map

/***/ })

});
//# sourceMappingURL=37.js.map
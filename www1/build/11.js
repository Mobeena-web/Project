webpackJsonp([11],{

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardNotificationPageModule", function() { return RewardNotificationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reward_notification__ = __webpack_require__(946);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RewardNotificationPageModule = (function () {
    function RewardNotificationPageModule() {
    }
    RewardNotificationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__reward_notification__["a" /* RewardNotificationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__reward_notification__["a" /* RewardNotificationPage */]),
            ],
        })
    ], RewardNotificationPageModule);
    return RewardNotificationPageModule;
}());

//# sourceMappingURL=reward-notification.module.js.map

/***/ }),

/***/ 946:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RewardNotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RewardNotificationPage = (function () {
    function RewardNotificationPage(global, viewCtrl, navCtrl, navParams) {
        this.global = global;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    RewardNotificationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RewardNotificationPage');
    };
    RewardNotificationPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    RewardNotificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-reward-notification',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/reward-notification/reward-notification.html"*/'\n<ion-content >\n  <ion-icon name="close" class="close_icon" (click)="dismiss()"></ion-icon>\n  <ion-slides pager *ngIf="global.notifications" style="height:430px"  speed="3000" loop="true" autoplayDisableOnInteraction="false">\n    <ion-slide style="height:100%" *ngFor="let banners of global.notifications" >\n      <img src={{banners?.image}} class="bi">\n      <img src={{banners.logo}} class="icon_img">\n      <div class="main_head">\n          {{banners.title}}\n      </div>\n      <div class="head">\n        {{banners.sub_title}}\n      </div>\n    </ion-slide>\n</ion-slides>\n \n  <button ion-button block outline round  class="ok_btn" (click)="dismiss()">OK</button>\n  \n\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/reward-notification/reward-notification.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], RewardNotificationPage);
    return RewardNotificationPage;
}());

//# sourceMappingURL=reward-notification.js.map

/***/ })

});
//# sourceMappingURL=11.js.map
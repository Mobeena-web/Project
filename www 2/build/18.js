webpackJsonp([18],{

/***/ 742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointRewardsPageModule", function() { return PointRewardsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__point_rewards__ = __webpack_require__(940);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PointRewardsPageModule = (function () {
    function PointRewardsPageModule() {
    }
    PointRewardsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__point_rewards__["a" /* PointRewardsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__point_rewards__["a" /* PointRewardsPage */]),
            ],
        })
    ], PointRewardsPageModule);
    return PointRewardsPageModule;
}());

//# sourceMappingURL=point-rewards.module.js.map

/***/ }),

/***/ 940:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointRewardsPage; });
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




var PointRewardsPage = (function () {
    function PointRewardsPage(navCtrl, navParams, server, globals, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.server = server;
        this.globals = globals;
        this.loadingCtrl = loadingCtrl;
        this.reward_detail = this.navParams.get('reward_data');
    }
    PointRewardsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PointRewardsPage');
    };
    PointRewardsPage.prototype.redeem_reward = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.redeem_point_reward(this.reward_detail.reward_id);
        response.subscribe(function (data) {
            if (data.status == true) {
                _this.globals.presentToast(data.message);
                _this.navCtrl.pop();
            }
            else {
                _this.globals.presentToast(data.message);
            }
            loading.dismiss();
        }, function (error) {
            loading.dismiss();
            _this.globals.presentToast("Server times out, please try again");
        });
    };
    PointRewardsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    PointRewardsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-point-rewards',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/point-rewards/point-rewards.html"*/'\n<ion-content>\n  <ion-icon name="arrow-round-back" (click)="back()" class="back"> </ion-icon>\n  <img src={{reward_detail.image}}>\n  <div padding>\n    <h1>{{reward_detail.name}}</h1>\n    <p>{{reward_detail.description}}</p>\n    <button ion-button block round (click)="redeem_reward()">Redeem</button>\n    <p margin-top>{{reward_detail.points_description}}</p>\n  </div>\n \n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/point-rewards/point-rewards.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], PointRewardsPage);
    return PointRewardsPage;
}());

//# sourceMappingURL=point-rewards.js.map

/***/ })

});
//# sourceMappingURL=18.js.map
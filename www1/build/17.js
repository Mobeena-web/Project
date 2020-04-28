webpackJsonp([17],{

/***/ 744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointsModelPageModule", function() { return PointsModelPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__points_model__ = __webpack_require__(942);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PointsModelPageModule = (function () {
    function PointsModelPageModule() {
    }
    PointsModelPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__points_model__["a" /* PointsModelPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__points_model__["a" /* PointsModelPage */]),
            ],
        })
    ], PointsModelPageModule);
    return PointsModelPageModule;
}());

//# sourceMappingURL=points-model.module.js.map

/***/ }),

/***/ 942:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointsModelPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
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
 * Generated class for the PointsModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PointsModelPage = (function () {
    function PointsModelPage(viewctrl, navCtrl, navParams) {
        this.viewctrl = viewctrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.reward_list = navParams.get('point_reward');
        this.bannerImage = navParams.get('banner');
        console.log(this.reward_list, this.bannerImage);
    }
    PointsModelPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PointsModelPage');
    };
    PointsModelPage.prototype.Close = function () {
        this.viewctrl.dismiss();
    };
    PointsModelPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-points-model',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/points-model/points-model.html"*/'<!--\n  Generated template for the PointsModelPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color="primary">\n    <ion-title>Points Rewards</ion-title>\n    <!--   \n   <ion-buttons end>\n      <button ion-button  (click)="Close()" clear small >Close</button>\n     </ion-buttons> -->\n\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content class="Open-Sans-regular" style="background:#eee">\n  <img style="width:100%" src=\'{{bannerImage}}\'>\n\n  <ion-grid style="border: solid thin #000000; padding:0">\n    <ion-row style="background:#000000;color:white !important">\n      <ion-col class="colStyle">\n        <p style="color:white !important" class="textStyle">Points</p>\n      </ion-col>\n      <ion-col class="colStyle">\n        <p style="color:white !important"  class="textStyle">Rewards</p>\n      </ion-col>\n    </ion-row>\n\n    <ion-row style="border-bottom: solid thin #000000 ;" *ngFor="let reward of reward_list">\n\n      <ion-col class="colStyle">\n        <p class="textStyle">{{reward.points}}</p>\n      </ion-col>\n      <ion-col class="colStyle">\n        <p class="textStyle">{{reward.description}}</p>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/points-model/points-model.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], PointsModelPage);
    return PointsModelPage;
}());

//# sourceMappingURL=points-model.js.map

/***/ })

});
//# sourceMappingURL=17.js.map
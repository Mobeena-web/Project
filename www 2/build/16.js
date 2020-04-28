webpackJsonp([16],{

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PunchDetailPageModule", function() { return PunchDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__punch_detail__ = __webpack_require__(943);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PunchDetailPageModule = (function () {
    function PunchDetailPageModule() {
    }
    PunchDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__punch_detail__["a" /* PunchDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__punch_detail__["a" /* PunchDetailPage */]),
            ],
        })
    ], PunchDetailPageModule);
    return PunchDetailPageModule;
}());

//# sourceMappingURL=punch-detail.module.js.map

/***/ }),

/***/ 943:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PunchDetailPage; });
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
 * Generated class for the PunchDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PunchDetailPage = (function () {
    function PunchDetailPage(viewCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.punched_image = navParams.get('punch_image');
        this.punch_qr = navParams.get('punch_qr');
        this.punched_icon_image = navParams.get('punched_icon_image');
        this.business_username = navParams.get('business_username');
        this.udid = navParams.get('udid');
        this.punch_count = navParams.get('punch_count');
        console.log("udid", this.udid);
        this.punch_limit = navParams.get('punch_limit');
        this.date = navParams.get('Date');
        this.lowestReward = navParams.get('reward');
        this.punch_count = this.punch_count.toString();
        console.log(this.punch_count.length, "le");
    }
    PunchDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PunchDetailPage');
    };
    PunchDetailPage.prototype.createRange = function (number) {
        var items = [];
        for (var i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    };
    PunchDetailPage.prototype.createRange2 = function (total, number) {
        var number1 = total - number;
        var items = [];
        for (var i = 1; i <= number1; i++) {
            items.push(i);
        }
        return items;
    };
    PunchDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    PunchDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-punch-detail',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/punch-detail/punch-detail.html"*/'<!--\n  Generated template for the PunchDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color="primary">\n    <ion-title>{{business_username}}</ion-title>\n\n    <!-- <ion-buttons end>\n       <button ion-button style = "color:white; float:right" (click)="dismiss()" clear small >Close</button>\n      </ion-buttons> -->\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content style="background-color:#eee">\n  <ion-card style="height:90%">\n\n    <img style="padding: 10px; height:100%" src="{{punched_image}}">\n    <!-- <div class = "punch-logo">    \n       <div style="display:inline-block; padding:5px;" *ngFor="let item of createRange(punch_count)" >\n      <img style="height:50px; width: 50px;" src="{{punched_icon_image}}">    \n     </div>       \n      <div style="display:inline-block; padding:5px;" *ngFor="let item of createRange2(punch_limit,punch_count)" >\n      <img style="height:50px;opacity: 0.5; width: 50px; " src="{{punched_icon_image}}">\n     </div>\n     </div> -->\n    <!-- <div style="    position: absolute;  bottom: 12%;  width: 100%; text-align:center;">\n     <img style="    height: 70px; width:70px;  margin-left: 39%;" src="{{punch_qr}}">\n     <ion-label style="margin-top:0;     text-shadow: -1px -1px 0 #f8f8f8, 1px -1px 0 #f8f8f8, -1px 1px 0 #f8f8f8, 1px 1px 0 #f8f8f8;">{{udid}}</ion-label>   \n     </div> -->\n    <!--<div style="top: 5%; position: absolute;width: 100%;"><h1 style="text-align:center;color:rgb(140,133,177); ">{{business_username}} </h1> </div>-->\n    <div style="    position: absolute;\n      top: 18%;\n      width: 100%;">\n      <ion-label *ngIf="punch_count.length == 2" class="Open-Sans-bold" style="font-size: 10rem;margin: 10px;position: absolute;   margin-left: 28%;    text-shadow: -1px -1px 0 #f8f8f8, 1px -1px 0 #f8f8f8, -1px 1px 0 #f8f8f8, 1px 1px 0 #f8f8f8; color:black">{{punch_count}} </ion-label>\n      <p *ngIf="punch_count.length == 2" style="    position: absolute;    top: 84px; font-size: 3rem;  left: 57%; text-shadow: -1px -1px 0 #f8f8f8, 1px -1px 0 #f8f8f8, -1px 1px 0 #f8f8f8, 1px 1px 0 #f8f8f8; color: black;">\n        /{{punch_limit}}</p>\n\n      <ion-label *ngIf="punch_count.length == 3" class="Open-Sans-bold" style="font-size: 10rem;margin: 10px;position: absolute;   margin-left: 15%;    text-shadow: -1px -1px 0 #f8f8f8, 1px -1px 0 #f8f8f8, -1px 1px 0 #f8f8f8, 1px 1px 0 #f8f8f8; color:black">{{punch_count}} </ion-label>\n      <p *ngIf="punch_count.length == 3" style="    position: absolute;    top: 84px; font-size: 3rem;  left: 59%; text-shadow: -1px -1px 0 #f8f8f8, 1px -1px 0 #f8f8f8, -1px 1px 0 #f8f8f8, 1px 1px 0 #f8f8f8; color: black;">\n        /{{punch_limit}}</p>\n\n      <ion-label *ngIf="punch_count.length == 1" class="Open-Sans-bold" style="font-size: 10rem;margin: 10px;position: absolute;      margin-left: 37%;   text-shadow: -1px -1px 0 #f8f8f8, 1px -1px 0 #f8f8f8, -1px 1px 0 #f8f8f8, 1px 1px 0 #f8f8f8; color:black">{{punch_count}} </ion-label>\n      <p *ngIf="punch_count.length == 1 " style="    position: absolute;    top: 84px; font-size: 3rem;      left: 51%; text-shadow: -1px -1px 0 #f8f8f8, 1px -1px 0 #f8f8f8, -1px 1px 0 #f8f8f8, 1px 1px 0 #f8f8f8; color:black">\n        /{{punch_limit}} </p>\n\n    </div>\n    <p style="      font-size: 2rem; top: 37%; margin: 10px; position: absolute;width: 88%;text-align: center; text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black; color:white">\n      {{lowestReward}} </p>\n\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/punch-detail/punch-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], PunchDetailPage);
    return PunchDetailPage;
}());

//# sourceMappingURL=punch-detail.js.map

/***/ })

});
//# sourceMappingURL=16.js.map
webpackJsonp([19],{

/***/ 742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointPunchModelPageModule", function() { return PointPunchModelPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__point_punch_model__ = __webpack_require__(940);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PointPunchModelPageModule = (function () {
    function PointPunchModelPageModule() {
    }
    PointPunchModelPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__point_punch_model__["a" /* PointPunchModelPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__point_punch_model__["a" /* PointPunchModelPage */]),
            ],
        })
    ], PointPunchModelPageModule);
    return PointPunchModelPageModule;
}());

//# sourceMappingURL=point-punch-model.module.js.map

/***/ }),

/***/ 940:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointPunchModelPage; });
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
 * Generated class for the PointPunchModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PointPunchModelPage = (function () {
    function PointPunchModelPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.title = navParams.get('title');
        this.image = navParams.get('image');
        this.name = navParams.get('name');
        this.tagline = navParams.get('tagline');
        this.punch_count = navParams.get('punch_count');
        this.punch_limit = navParams.get('punch_limit');
        this.terms = navParams.get('terms');
    }
    PointPunchModelPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PointPunchModelPage');
    };
    PointPunchModelPage.prototype.remove = function () {
        this.viewCtrl.dismiss();
    };
    PointPunchModelPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-point-punch-model',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/point-punch-model/point-punch-model.html"*/'<!--\n  Generated template for the PointPunchModelPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>{{title}}</ion-title>\n    <ion-buttons end>\n      <button ion-button style="font-size: 3rem;" (tap)="remove()">\n        <ion-icon name="close"> </ion-icon>\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div *ngIf="title == \'Punch Detail\'">\n    <img *ngIf="image" src={{image}}>\n    <h5 text-center>{{name}}</h5>\n    <h5 text-center>{{punch_count}}/{{punch_limit}} Punches</h5>\n    <p text-center><b>{{tagline}}</b></p>\n  </div>\n\n  <div *ngIf="title == \'Point Detail\'">\n    <img *ngIf="image" src={{image}}>\n    <h5 text-center>{{name}}</h5>\n    <p text-center><b>{{tagline}}</b></p>\n  </div>\n  <h2 text-center margin-top>Terms</h2>\n  <p>{{terms}}</p>\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/point-punch-model/point-punch-model.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"]])
    ], PointPunchModelPage);
    return PointPunchModelPage;
}());

//# sourceMappingURL=point-punch-model.js.map

/***/ })

});
//# sourceMappingURL=19.js.map
webpackJsonp([52],{

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusinessListPageModule", function() { return BusinessListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__business_list__ = __webpack_require__(919);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BusinessListPageModule = (function () {
    function BusinessListPageModule() {
    }
    BusinessListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__business_list__["a" /* BusinessListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__business_list__["a" /* BusinessListPage */]),
            ],
        })
    ], BusinessListPageModule);
    return BusinessListPageModule;
}());

//# sourceMappingURL=business-list.module.js.map

/***/ }),

/***/ 919:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(42);
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
 * Generated class for the BusinessListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BusinessListPage = (function () {
    function BusinessListPage(nativeStorage, globals, navCtrl, navParams) {
        this.nativeStorage = nativeStorage;
        this.globals = globals;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    BusinessListPage.prototype.ionViewDidLoad = function () {
        console.log(this.globals.business_list, "ll");
        console.log('ionViewDidLoad BusinessListPage');
    };
    BusinessListPage.prototype.select_business = function (item) {
        var _this = this;
        this.globals.new_id = item.business_id;
        this.globals.business_username = item.username;
        this.globals.special_offer = item.special_offer;
        this.globals.events_enabled = item.events_enabled;
        this.globals.gallery_enabled = item.gallery_enabled;
        this.globals.pickup = item.pickup;
        this.globals.latitude = item.latitude;
        this.globals.longitude = item.longitude;
        this.globals.hours_operation = item.hours_operation;
        this.globals.branch_enabled = item.branch_enabled;
        this.globals.giftcard_enabled = item.giftcard_enabled;
        this.globals.b_logo = item.logo;
        if (this.globals.pickup == '1') {
            this.globals.pickup = true;
        }
        else {
            this.globals.pickup = false;
        }
        if (item.delivery == '1') {
            this.globals.delivery = true;
        }
        else {
            this.globals.delivery = false;
        }
        this.navCtrl.setRoot('BeforeLoginPage');
        this.nativeStorage.clear()
            .then(function (data) {
            _this.nativeStorage.remove('user')
                .then(function (data) {
                _this.globals.Product.length = 0;
                _this.globals.cartflag = false;
                _this.navCtrl.setRoot('BeforeLoginPage');
            }).catch(function (err) { return console.log(); });
        }).catch(function (err) { return console.log(); });
    };
    BusinessListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-business-list',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/business-list/business-list.html"*/'\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>Resturants</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>\n        <ion-item *ngFor="let item of globals.business_list" (click)="select_business(item)">\n          <ion-avatar item-start>\n            <img src={{item.logo}}>\n          </ion-avatar>\n          <h2>{{item.name}}</h2>\n        </ion-item>\n      </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/business-list/business-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], BusinessListPage);
    return BusinessListPage;
}());

//# sourceMappingURL=business-list.js.map

/***/ })

});
//# sourceMappingURL=52.js.map
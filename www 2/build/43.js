webpackJsonp([43],{

/***/ 727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomQrPageModule", function() { return CustomQrPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__custom_qr__ = __webpack_require__(925);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CustomQrPageModule = (function () {
    function CustomQrPageModule() {
    }
    CustomQrPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__custom_qr__["a" /* CustomQrPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__custom_qr__["a" /* CustomQrPage */]),
            ],
        })
    ], CustomQrPageModule);
    return CustomQrPageModule;
}());

//# sourceMappingURL=custom-qr.module.js.map

/***/ }),

/***/ 925:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomQrPage; });
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
 * Generated class for the CustomQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CustomQrPage = (function () {
    function CustomQrPage(viewctrl, navCtrl, navParams) {
        this.viewctrl = viewctrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        var flag = navParams.get('image_flag');
        if (flag == true) {
            this.image = navParams.get('data');
        }
        else {
            this.text = navParams.get('data');
        }
    }
    CustomQrPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomQrPage');
    };
    CustomQrPage.prototype.close = function () {
        this.viewctrl.dismiss();
    };
    CustomQrPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-custom-qr',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/custom-qr/custom-qr.html"*/'<!--\n  Generated template for the CustomQrPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar color="primary">\n      <ion-title>Custom Qr</ion-title>\n      \n   <ion-buttons end>\n      <button ion-button (click)="close()" clear small >Close</button>\n     </ion-buttons>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content style="background:#eee">\n    <img *ngIf="image" style=" height: 100%;" src = "{{image}}" >\n    <ion-card style=" margin-top: 50%;" *ngIf="text">\n    <p style="padding:10px;font-size:1.8rem" >{{text}}</p>\n  \n  </ion-card>\n  \n  \n  \n  </ion-content>\n  '/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/custom-qr/custom-qr.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], CustomQrPage);
    return CustomQrPage;
}());

//# sourceMappingURL=custom-qr.js.map

/***/ })

});
//# sourceMappingURL=43.js.map
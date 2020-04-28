webpackJsonp([27],{

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileVerificationPageModule", function() { return MobileVerificationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mobile_verification__ = __webpack_require__(937);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MobileVerificationPageModule = (function () {
    function MobileVerificationPageModule() {
    }
    MobileVerificationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__mobile_verification__["a" /* MobileVerificationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__mobile_verification__["a" /* MobileVerificationPage */]),
            ],
        })
    ], MobileVerificationPageModule);
    return MobileVerificationPageModule;
}());

//# sourceMappingURL=mobile-verification.module.js.map

/***/ }),

/***/ 937:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MobileVerificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_server_server__ = __webpack_require__(34);
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
 * Generated class for the MobileVerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MobileVerificationPage = (function () {
    function MobileVerificationPage(server, nativeStorage, navCtrl, navParams, loadingCtrl, alertCtrl, formBilder, viewctrl, globals) {
        this.server = server;
        this.nativeStorage = nativeStorage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.formBilder = formBilder;
        this.viewctrl = viewctrl;
        this.globals = globals;
        this.CodeVerificationForm = formBilder.group({
            code: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].minLength(6)])],
        });
    }
    MobileVerificationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MobileVerificationPage');
        this.GetUserNumberFromNativeStorage();
    };
    MobileVerificationPage.prototype.GetUserNumberFromNativeStorage = function () {
        var _this = this;
        this.nativeStorage.getItem('user')
            .then(function (data) {
            _this.userPhone = data.phone;
            console.log("usermobileno", _this.userPhone);
        }).catch(function (err) { return console.log; });
    };
    MobileVerificationPage.prototype.close = function () {
        this.viewctrl.dismiss();
    };
    MobileVerificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-mobile-verification',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/mobile-verification/mobile-verification.html"*/'<!--\n  Generated template for the MobileVerificationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-Bold">\n\n  <ion-navbar color="primary">\n    <ion-title>Mobile Verification</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="close()"> Close </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="Open-Sans-regular" style="background:#eee">\n\n  <ion-card>\n    <p style="    padding: 10px; font-size: 1.8rem;color:black"> A verification code has been sent to your registered mobile number.</p>\n    <ion-input disabled="true" class="phone" [(ngModel)]="userPhone"></ion-input>\n\n\n    <form [formGroup]="CodeVerificationForm">\n\n      <ion-label style=" text-align: center; font-size: 2rem;">Please enter 6 digit the code below</ion-label>\n      <p class="Open-Sans-regular" *ngIf="submitAttempt" style="color: #ea6153; text-align:center; margin-bottom: 10px;">Please enter the 6 digit code.</p>\n      <ion-input class="codeinput" type="submit" type="number" formControlName="code"></ion-input>\n\n    </form>\n\n  </ion-card>\n  <button ion-button block type="submit" class="submit-btn" (click)="Verify(this.CodeVerificationForm.value)">Submit</button>\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/mobile-verification/mobile-verification.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
            __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* GlobalVariable */]])
    ], MobileVerificationPage);
    return MobileVerificationPage;
}());

//# sourceMappingURL=mobile-verification.js.map

/***/ })

});
//# sourceMappingURL=27.js.map
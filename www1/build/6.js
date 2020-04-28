webpackJsonp([6],{

/***/ 753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerificationPageModule", function() { return VerificationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__verification__ = __webpack_require__(951);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VerificationPageModule = (function () {
    function VerificationPageModule() {
    }
    VerificationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__verification__["a" /* VerificationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__verification__["a" /* VerificationPage */]),
            ],
        })
    ], VerificationPageModule);
    return VerificationPageModule;
}());

//# sourceMappingURL=verification.module.js.map

/***/ }),

/***/ 951:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_server_server__ = __webpack_require__(34);
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
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VerificationPage = (function () {
    function VerificationPage(server, globals, alertCtrl, loadingCtrl, viewCtrl, formBilder, navCtrl, navParams) {
        this.server = server;
        this.globals = globals;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.formBilder = formBilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.submitAttempt = false;
        this.type = 'email';
        this.VerficationForm = formBilder.group({
            email: [''],
            // password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
            phone: [],
            code: ['+1']
        });
    }
    VerificationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VerificationPage');
    };
    VerificationPage.prototype.Verify = function (VerifyData) {
        var _this = this;
        var response = this.server.ForgotPassword(VerifyData);
        var loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true,
        });
        loading.present();
        response.subscribe(function (data) {
            _this.response = data;
            console.log(_this.response);
            if (_this.response.status == "true") {
                var alert_1 = _this.alertCtrl.create({
                    title: '',
                    subTitle: _this.response.description,
                    buttons: ['done']
                });
                loading.dismiss();
                alert_1.present();
                _this.viewCtrl.dismiss();
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: _this.response.description,
                    buttons: ['Retry']
                });
                loading.dismiss();
                alert_2.present();
            }
        }, function (error) {
            console.log("Error!");
        });
    };
    VerificationPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    VerificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-verification',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/verification/verification.html"*/'<ion-content style="background-color:#fff" class="Open-Sans-regular">\n\n  <div style="font-family: Open Sans;" class="title1">\n    <img src={{globals.b_logo}} style="    position: relative; left: 26%;  width: 50%;  height: auto;  ">\n  </div>\n\n  <ion-segment [(ngModel)]="type" color="primary" padding margin-top>\n    <ion-segment-button value="email">\n      Login With Email\n    </ion-segment-button>\n    <ion-segment-button value="phone">\n      Login With Phone\n    </ion-segment-button>\n  </ion-segment>\n\n  <div class="login-box">\n    <p style="text-align: center;">Please verify your email address</p>\n    <form [formGroup]="VerficationForm">\n      <div [ngSwitch]="type" style="height: 100%;width: 100%;">\n        <div *ngSwitchCase="\'email\'" style="width: 100%">\n\n          <ion-item class="no-padding">\n            <ion-label floating>Email</ion-label>\n            <ion-input formControlName="email" type="email"></ion-input>\n          </ion-item>\n          <div class="no-border" *ngIf="!VerficationForm.controls.email.valid  &&\n          (VerficationForm.controls.email.dirty || submitAttempt)">\n            <p style="color: #ea6153; font-family: Open Sans; ">Please enter a valid email.</p>\n          </div>\n        </div>\n\n        <div *ngSwitchCase="\'phone\'" style="width: 100%">\n          <ion-col>\n            <ion-row>\n              <ion-col col-3 no-padding>\n                <ion-select formControlName="code" class="code">\n                  <ion-option value="+1" Selected>US +1</ion-option>\n\n                </ion-select>\n              </ion-col>\n              <ion-col col-9 no-padding>\n                <ion-item class="no-padding">\n                  <ion-label floating>Phone</ion-label>\n                  <ion-input type="submit" formControlName="phone" type="number"></ion-input>\n                </ion-item>\n              </ion-col>\n            </ion-row>\n\n\n\n          </ion-col>\n        </div>\n\n      </div>\n\n    </form>\n    <div class="button-col">\n      <button ion-button class="done" (click)="Verify(this.VerficationForm.value)" block>Submit</button>\n      <button ion-button class="cancel" block (click)="dismiss()">Cancel</button>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/verification/verification.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], VerificationPage);
    return VerificationPage;
}());

//# sourceMappingURL=verification.js.map

/***/ })

});
//# sourceMappingURL=6.js.map
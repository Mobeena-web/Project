webpackJsonp([29],{

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileEmailVarificationPageModule", function() { return MobileEmailVarificationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mobile_email_varification__ = __webpack_require__(936);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MobileEmailVarificationPageModule = (function () {
    function MobileEmailVarificationPageModule() {
    }
    MobileEmailVarificationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__mobile_email_varification__["a" /* MobileEmailVarificationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__mobile_email_varification__["a" /* MobileEmailVarificationPage */]),
            ],
        })
    ], MobileEmailVarificationPageModule);
    return MobileEmailVarificationPageModule;
}());

//# sourceMappingURL=mobile-email-varification.module.js.map

/***/ }),

/***/ 936:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MobileEmailVarificationPage; });
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
 * Generated class for the MobileEmailVarificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MobileEmailVarificationPage = (function () {
    function MobileEmailVarificationPage(server, nativeStorage, navCtrl, navParams, loadingCtrl, alertCtrl, formBilder, viewctrl, globals) {
        this.server = server;
        this.nativeStorage = nativeStorage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.formBilder = formBilder;
        this.viewctrl = viewctrl;
        this.globals = globals;
        this.data = {};
        this.data.response = '';
        this.email_verified = this.globals.email_verified;
        this.phone_verified = this.globals.phone_verified;
        console.log("constructor", this.email_verified, this.phone_verified);
    }
    MobileEmailVarificationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MobileEmailVarificationPage');
        this.GetUserNumberAndEmail();
    };
    MobileEmailVarificationPage.prototype.GetUserNumberAndEmail = function () {
        console.log("get user number and email");
        this.userPhone = this.globals.PhoneNo;
        this.email = this.globals.Email;
    };
    MobileEmailVarificationPage.prototype.close = function () {
        this.viewctrl.dismiss();
        this.navCtrl.setRoot('LoginPage');
    };
    MobileEmailVarificationPage.prototype.checkValidation = function () {
        if (this.email_verified == true || this.phone_verified == true) {
            this.Verify();
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: "Alert",
                message: "Enter your valid code ",
                buttons: ["OK"]
            });
            alert_1.present();
        }
    };
    MobileEmailVarificationPage.prototype.Verify = function () {
        var _this = this;
        console.log(this.Phonecode);
        var loading = this.loadingCtrl.create({
            content: "loading..."
        });
        loading.present();
        var response = this.server.SendVerificationCodeToServer(this.Phonecode);
        response.subscribe(function (data) {
            var response = data;
            loading.dismiss();
            console.log(response);
            if (response.status == true) {
                console.log("verify function");
                if (response.phone_verified == true) {
                    if (response.is_phone_verified == true) {
                        _this.register(_this.globals.signupData);
                    }
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: "Error",
                        message: "Enter Your Code",
                        buttons: ["OK"]
                    });
                    alert_2.present();
                }
            }
            else {
                var alert_3 = _this.alertCtrl.create({
                    title: "Error",
                    message: response.message,
                    buttons: ["OK"]
                });
                alert_3.present();
                //this.viewctrl.dismiss(false);
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
        });
    };
    MobileEmailVarificationPage.prototype.register = function (signupData) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true,
        });
        loading.present();
        // this.globals.PhoneNo = signupData.phonecode + signupData.phone  ;
        var response = this.server.SignupData(signupData.firstName, signupData.lastName, signupData.email, signupData.password, this.globals.PhoneNo, signupData.birthday, signupData.aniversary, '');
        response.subscribe(function (data) {
            console.log(data);
            _this.data.response = data;
            if (_this.data.response.status != "error") {
                // this.navCtrl.setRoot('AcceptTermsPage', { imageData: this.data.response.url, discountText: this.data.response.discount_text, Flag: true, discount: this.data.response.discount_value });
                _this.globals.firstName = signupData.firstName;
                _this.globals.lastName = signupData.lastName;
                _this.globals.udid = _this.data.response.udid;
                _this.nativeStorage.setItem('user', {
                    email: signupData.email,
                    udid: _this.data.response.udid,
                    firstName: signupData.firstName,
                    lastName: signupData.lastName,
                    phone: signupData.phone,
                    password: signupData.password,
                    image: _this.data.response.url,
                    ID: _this.data.response.id,
                    date: _this.data.response.date_joined,
                    discountValue: _this.data.response.discount_value,
                    birthday: signupData.birthday,
                    aniversary: signupData.aniversary
                }).then(function () {
                    _this.nativeStorage.setItem('discount', { discountValue: _this.data.response.discount_value })
                        .then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
                    console.log("b discount value", _this.data.response.discount_value);
                    _this.navCtrl.setRoot('AcceptTermsPage', { imageData: _this.data.response.url, discountText: _this.data.response.discount_text, Flag: true, discount: _this.data.response.discount_value });
                    _this.globals.udid = _this.data.response.udid;
                    //  this.server.initializePushToken();
                })
                    .catch(function (err) { console.log(err); });
            }
            else {
                var alert_4 = _this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: _this.data.response.description,
                    buttons: ['Retry']
                });
                loading.dismiss();
                alert_4.present();
                _this.navCtrl.setRoot('LoginPage');
            }
        }, function (error) {
            console.log("Oooops!");
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Server times out, please try again',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    MobileEmailVarificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-mobile-email-varification',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/mobile-email-varification/mobile-email-varification.html"*/'\n\n<ion-content class="content">\n  <div class="overlay"></div>\n  <div class="modal_content">\n      <h4 style="text-align: center">Phone Verification</h4>\n    <div >\n      <!-- <p style="padding-left: 10px; font-size: 1.8rem;color:black"> A verification code has been sent to your registered mobile number.</p> -->\n      <!-- <ion-input class="phone" [(ngModel)]="userPhone"></ion-input> -->\n      <div>\n        <!-- <p style=" text-align: center; font-size: 1.8rem;margin-top: 0;">Please enter the code send to your Phone.</p> -->\n        <ion-item>\n          <ion-label color="primary" stacked>Phone Code</ion-label>\n          <ion-input class="codeinput"   maxlength="6" type="tel" [(ngModel)]="Phonecode"></ion-input>\n        </ion-item>\n        \n      </div>\n    </div>\n    <div >\n      <!-- <p style="padding-left: 10px; font-size: 1.8rem;color:black"> A verification code has been sent to your registered Email.</p> -->\n      <!-- <ion-input style="align-content: center" class="phone" [(ngModel)]="email"></ion-input> -->\n      <!-- <div>\n         <p style=" text-align: center; font-size: 1.8rem; margin-top: 0;">Please enter the code send to your Email. </p> \n        <ion-input class="codeinput" maxlength="6" placeholder="Email Code" type="tel" [(ngModel)]="Emailcode"></ion-input>\n      </div> -->\n    </div>\n\n    <div >\n      <button style="margin-top: 85px;width: 90%;margin-left: 5%;" ion-button block type="submit" (click)="close()">Cancel</button>\n      <button margin-top ion-button block style="width: 90%;margin-left: 5%;" type="submit"  (click)="Verify()">Submit</button>\n\n    </div>\n  </div>\n  \n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/mobile-email-varification/mobile-email-varification.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
            __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* GlobalVariable */]])
    ], MobileEmailVarificationPage);
    return MobileEmailVarificationPage;
}());

//# sourceMappingURL=mobile-email-varification.js.map

/***/ })

});
//# sourceMappingURL=29.js.map
webpackJsonp([56],{

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BeforeLoginPageModule", function() { return BeforeLoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__before_login__ = __webpack_require__(915);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BeforeLoginPageModule = (function () {
    function BeforeLoginPageModule() {
    }
    BeforeLoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__before_login__["a" /* BeforeLoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__before_login__["a" /* BeforeLoginPage */]),
            ],
        })
    ], BeforeLoginPageModule);
    return BeforeLoginPageModule;
}());

//# sourceMappingURL=before-login.module.js.map

/***/ }),

/***/ 915:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BeforeLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro_page3_intro_page3__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BeforeLoginPage = (function () {
    function BeforeLoginPage(nativeStorage, alertCtrl, loadingCtrl, server, global, navCtrl, navParams) {
        this.nativeStorage = nativeStorage;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.server = server;
        this.global = global;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    BeforeLoginPage.prototype.ngOnInit = function () {
        this.welcome_data();
    };
    BeforeLoginPage.prototype.welcome_data = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.welcome_screen();
        response.subscribe(function (data) {
            loading.dismiss();
            _this.global.welcome = data;
        }, function (error) {
            loading.dismiss();
            _this.global.presentToast("Something went wrong check your internet connection.");
        });
    };
    BeforeLoginPage.prototype.login = function () {
        this.navCtrl.push('LoginPage');
    };
    BeforeLoginPage.prototype.register = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__intro_page3_intro_page3__["a" /* IntroPage3Page */]);
    };
    BeforeLoginPage.prototype.guestlogin = function () {
        this.global.guess_login = true;
        if (this.global.branch_enabled == 1) {
            this.navCtrl.push('ResturantListPage');
        }
        else {
            this.navCtrl.push('CategoryPage');
        }
    };
    BeforeLoginPage.prototype.coaslogin = function () {
        if (this.global.branch_enabled == 1) {
            this.navCtrl.push('ResturantListPage');
        }
        else {
            this.navCtrl.push('CategoryPage');
        }
    };
    BeforeLoginPage.prototype.logout_kiosk = function (password) {
        var _this = this;
        if (password) {
            var response = this.server.SendLogindataToServer(this.global.business_username, password);
            var loading_1 = this.loadingCtrl.create({
                content: "Please wait...",
            });
            loading_1.present();
            response.subscribe(function (res) {
                loading_1.dismiss();
                if (res.status == 'true') {
                    _this.nativeStorage.remove('business')
                        .then(function (data) {
                        _this.navCtrl.setRoot('BusinessLoginPage');
                    }).catch(function (err) { return console.log(); });
                }
                else {
                    _this.global.presentToast('Invalid Password.');
                }
            });
        }
        else {
            this.global.presentToast('Something Missing.Please Fill All Required Fields');
        }
    };
    BeforeLoginPage.prototype.presentPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Business Logout',
            inputs: [
                {
                    name: 'password',
                    placeholder: 'Password',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Logout',
                    handler: function (data) {
                        _this.logout_kiosk(data.password);
                    }
                }
            ]
        });
        alert.present();
    };
    BeforeLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-before-login',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/before-login/before-login.html"*/'\n<ion-content  class="background_image1" [ngStyle]="!global.caos_flag && {\'background-image\': \'url(\' + global.welcome?.welcome_screen_image + \')\'}">\n    <div>\n        <button ion-button clear *ngIf="global.caos_flag" class="ki" (click)="presentPrompt()"></button>\n            <!-- <h3 text-center class="welcome">WELCOME TO</h3> -->\n            <img src={{global.b_logo}} class="icon_img">\n        \n    </div>\n    \n        <!-- <iframe *ngIf="global.caos_flag" height="315" src="assets/videos/kiosk.mp4" frameborder="0" style="width: 100%"></iframe> -->\n        <video  *ngIf="global.caos_flag" style="height: 100%" loop autoplay playsinline>\n            <source src="https://onlineordering.mikronexus.com/online-ordering-new/assets/videos/demo.mp4" type="video/mp4"> \n        </video>\n        <div padding>\n   \n        <ion-card text-center class="btn-margin jk">\n                <h3 class="kk">\n                    {{global.welcome?.welcome_screen_title}}\n                </h3>\n                <p class="nn">\n                    {{global.welcome?.welcome_screen_subtitle}}\n                </p>\n                <button  *ngIf="!global.caos_flag" ion-button block round outline class="order-now" (click)="guestlogin()">Order Now </button>\n                <button  *ngIf="global.caos_flag" ion-button block round outline class="order-now" (click)="coaslogin()">Order Now As Guest </button>\n                \n                <ion-row class="mm" *ngIf="!global.caos_flag">\n                    <ion-col col-6 (click)="register()" class="bb">\n                        SIGN UP\n                    </ion-col>\n                    <ion-col col-6 (click)="login()">\n                    LOG IN\n                    </ion-col>\n                </ion-row>\n            </ion-card>\n\n    </div>\n   \n    \n\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/before-login/before-login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_4__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], BeforeLoginPage);
    return BeforeLoginPage;
}());

//# sourceMappingURL=before-login.js.map

/***/ })

});
//# sourceMappingURL=56.js.map
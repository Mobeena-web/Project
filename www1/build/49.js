webpackJsonp([49],{

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuygiftcardsPageModule", function() { return BuygiftcardsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buygiftcards__ = __webpack_require__(922);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BuygiftcardsPageModule = (function () {
    function BuygiftcardsPageModule() {
    }
    BuygiftcardsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__buygiftcards__["a" /* BuygiftcardsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__buygiftcards__["a" /* BuygiftcardsPage */]),
            ],
        })
    ], BuygiftcardsPageModule);
    return BuygiftcardsPageModule;
}());

//# sourceMappingURL=buygiftcards.module.js.map

/***/ }),

/***/ 922:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuygiftcardsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_stripe__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_server_server__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var BuygiftcardsPage = (function () {
    function BuygiftcardsPage(server, nativeStorage, alertCtrl, loadingCtrl, globals, viewCtrl, formBuilder, stripe, http, navCtrl, navParams) {
        this.server = server;
        this.nativeStorage = nativeStorage;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.globals = globals;
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.stripe = stripe;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cardinfo = {
            number: '',
            expMonth: '',
            expYear: '',
            cvc: ''
        };
        this.submitAttempt = false;
        this.action = '';
        this.cash_discount = 0;
        this.PaymentForm = formBuilder.group({
            creditcardno: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].minLength(10), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].maxLength(16), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required])],
            expiryMonth: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required])],
            expiryYear: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required])],
            CVC: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required])],
            cardinfo: [false]
        });
        this.gift_id = this.navParams.get('gift_id');
        this.udid_r = this.navParams.get('udid_r');
        this.design_card = this.navParams.get('design_id');
        this.message = this.navParams.get('message');
        this.amount = this.navParams.get('amount');
        this.action = this.navParams.get('action');
    }
    BuygiftcardsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BuygiftcardsPage');
    };
    BuygiftcardsPage.prototype.pay = function (PaymentData) {
        var _this = this;
        var a = btoa(PaymentData.creditcardno);
        console.log("encode", a);
        console.log("decode", atob(a));
        console.log(PaymentData.creditcardno);
        console.log(this.udid_r);
        if (!this.PaymentForm.valid) {
            this.submitAttempt = true;
            console.log(' Some values were not given or were incorrect, please fill them');
        }
        else {
            console.log("paymentcard", PaymentData.cardinfo);
            if (PaymentData.cardinfo == true) {
                this.nativeStorage.setItem('card', {
                    cardno: btoa(PaymentData.creditcardno),
                    exmonth: btoa(PaymentData.expiryMonth),
                    exyear: btoa(PaymentData.expiryYear),
                    cvc: btoa(PaymentData.CVC),
                    check: btoa(PaymentData.cardinfo)
                }).then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
            }
            this.cardinfo = {
                number: PaymentData.creditcardno,
                expMonth: PaymentData.expiryMonth,
                expYear: PaymentData.expiryYear,
                cvc: PaymentData.CVC
            };
            console.log(this.cardinfo);
            var loading_1 = this.loadingCtrl.create({
                content: "Loading...",
            });
            loading_1.present();
            if (this.globals.authorize_enabled) {
                var response = this.server.buy_gift_cards('', this.gift_id, this.udid_r, this.design_card, this.amount, this.message, this.action, this.cardinfo);
                console.log("response without json", response);
                response.subscribe(function (data) {
                    _this.globals.presentToast(data.message);
                    _this.navCtrl.pop().then(function () { return _this.navCtrl.pop(); });
                    loading_1.dismiss();
                }, function (error) {
                    loading_1.dismiss();
                    _this.globals.presentToast("Payment Failed");
                });
            }
            else {
                if (this.globals.StripId == '') {
                    loading_1.dismiss();
                    var alert_1 = this.alertCtrl.create({
                        title: 'Oops',
                        subTitle: 'Payments not available,please try again',
                        buttons: ['OK']
                    });
                    alert_1.present();
                }
                else {
                    this.stripe.setPublishableKey(this.globals.StripId);
                    this.stripe.createCardToken(this.cardinfo).then(function (Token) {
                        var response = _this.server.buy_gift_cards(Token.id, _this.gift_id, _this.udid_r, _this.design_card, _this.amount, _this.message, _this.action);
                        console.log("response without json", response);
                        response.subscribe(function (data) {
                            _this.globals.presentToast(data.message);
                            _this.navCtrl.pop().then(function () { return _this.navCtrl.pop(); });
                            loading_1.dismiss();
                        }, function (error) {
                            loading_1.dismiss();
                            _this.globals.presentToast("Payment Failed");
                            console.log("Error!");
                            console.log("this is our error", error);
                        });
                    }).catch(function (data) {
                        loading_1.dismiss();
                        _this.globals.presentToast("Invalid Credentials,please try again");
                    });
                }
            }
        }
    };
    BuygiftcardsPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    BuygiftcardsPage.prototype.cash_discount_confirmation = function (payment_data) {
        var _this = this;
        if (this.globals.cash_discount_enabled && !this.cash_discount) {
            var discount_ = ((Number(this.globals.cash_discount_percentage) / 100) * Number(this.amount)).toFixed(2);
            discount_ = (Number(discount_) + Number(this.globals.cash_discount_value));
            var alert_2 = this.alertCtrl.create({
                title: 'Please Note',
                message: ' Your total amount will be $' + (Number(this.amount) + Number(discount_)).toFixed(2) + ' as of convenience charge.',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'OK',
                        handler: function () {
                            _this.cash_discount = discount_;
                            _this.amount = (Number(_this.amount) + Number(discount_)).toFixed(2);
                            _this.pay(payment_data);
                        }
                    }
                ]
            });
            alert_2.present();
        }
        else {
            this.pay(payment_data);
        }
    };
    BuygiftcardsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-buygiftcards',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/buygiftcards/buygiftcards.html"*/'\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>Buy Gift Card</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding style="background:#ccc">\n    <form [formGroup]="PaymentForm" ng-submit="pay(this.PaymentForm.value)">\n        <div >\n        <ion-list style="padding: 10px; padding-bottom:0px;margin-bottom: 3px;">\n          <ion-card class="payment_card background_image1" style="padding-top: 26px;">\n              <ion-item  class="cardno">\n                <ion-input style="color: #fff" placeholder="Card No." class="kll"  formControlName="creditcardno" type="password" maxlength= "16" ></ion-input>\n              </ion-item>\n    \n              <ion-row style="margin-top: 18px">\n                <ion-col col-6 no-padding>\n                  <h3 class="name_heading">Name</h3>\n              <h2 style="margin-left: 22px;color: #fff;padding-top: 17px;" >{{globals.firstName}} {{globals.lastName}}</h2>\n    \n                </ion-col>\n                <ion-col col-3 no-padding>\n                  <h3 class="exp-date">Exp. Date</h3>\n                 \n                      <ion-item style="background: transparent;border:0px" no-padding>\n                          <ion-input style="color: #fff;" placeholder="mm" class="kll" formControlName="expiryMonth" type="number"></ion-input>\n                      </ion-item>\n                </ion-col>\n                <ion-col col-3 no-padding>\n                    <ion-item style="background: transparent;border:0px;margin-top: 19px;" no-padding>\n                        <ion-input style="color: #fff;" placeholder="yyyy" class="kll"  formControlName="expiryYear" type="number"></ion-input>\n                    </ion-item>\n                  \n                      \n                </ion-col>\n              </ion-row>\n    \n          </ion-card>\n          <ion-card class="payment_card background_image2" >\n           <ion-item style="background: transparent;border:0px;margin-top: 40px">\n    \n                  <ion-label  style="color: #000000">CVV</ion-label>\n          \n                  <ion-input  class="klll"  formControlName="CVC" type="number"></ion-input>\n                </ion-item>\n                <img src="assets/imgs/visaa.png" style="width: 80%;">\n            \n          </ion-card>\n         \n        </ion-list>\n    \n        </div>\n    \n           <ion-row style="margin-top: 12% !important;">\n              <ion-col col-6>\n                   <button  ion-button type="submit" color=\'jack\' round  (click)="cash_discount_confirmation(this.PaymentForm.value)" block>Buy Card</button>    \n              </ion-col>\n              <ion-col col-6>\n            <button  ion-button outline (click)="cancel()" round style="color:#c0392b !important;" color=\'danger\' block   block>Cancel</button>\n    \n                </ion-col>\n            </ion-row>\n        \n        <!-- <ion-label style="font-size:2.5rem;font-weight: bold; color:white;m.value)" style="margin-top: 5%;width:95%; margin-left:2.5%;"\n          block>Make Payment </button> -->\n      </form>\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/buygiftcards/buygiftcards.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_5__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_2__ionic_native_stripe__["a" /* Stripe */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], BuygiftcardsPage);
    return BuygiftcardsPage;
}());

//# sourceMappingURL=buygiftcards.js.map

/***/ })

});
//# sourceMappingURL=49.js.map
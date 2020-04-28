webpackJsonp([62],{

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__intro_page3_intro_page3__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginPage = (function () {
    function LoginPage(viewCtrl, server, globals, nativeStorage, modalCtrl, navCtrl, navParams, loadingCtrl, alertCtrl, formBilder) {
        this.viewCtrl = viewCtrl;
        this.server = server;
        this.globals = globals;
        this.nativeStorage = nativeStorage;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.formBilder = formBilder;
        this.submitAttempt = false;
        // ID: any;
        // date: any;
        this.places = [];
        this.login_type = 'email';
        this.pos_customer = false;
        this.code = '+1';
        this.loginForm = formBilder.group({
            email: [''],
            phone: [''],
            code: ['+1'],
            password: ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].required])]
        });
        this.data = {};
        this.data.response = '';
    }
    LoginPage.prototype.createAccount = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__intro_page3_intro_page3__["a" /* IntroPage3Page */], { profile_complete: true });
    };
    LoginPage.prototype.register = function (phone) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__intro_page3_intro_page3__["a" /* IntroPage3Page */], { phone: phone, profile_complete: false });
    };
    LoginPage.prototype.login = function (LoginData) {
        var _this = this;
        if (!this.loginForm.valid) {
            this.submitAttempt = true;
            console.log(' Some values were not given or were incorrect, please fill them');
        }
        else {
            var loading_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loading_1.present();
            var response = this.server.LoginData(LoginData);
            response.subscribe(function (data) {
                loading_1.dismiss();
                _this.data.response = data;
                if (_this.data.response != "invalid") {
                    _this.globals.guess_login = false;
                    _this.globals.udid = _this.data.response.udid;
                    _this.globals.firstName = _this.data.response.firstname;
                    _this.globals.lastName = _this.data.response.lastname;
                    _this.globals.Email = LoginData.email;
                    _this.profile_complete = _this.data.response.profile_complete;
                    if (_this.globals.caos_flag) {
                        _this.viewCtrl.dismiss();
                    }
                    else {
                        console.log("p", _this.profile_complete);
                        if (!_this.profile_complete) {
                            _this.register(LoginData.phone);
                        }
                        else {
                            _this.list();
                            _this.nativeStorage.setItem('user', {
                                email: LoginData.email,
                                udid: _this.data.response.udid,
                                firstName: _this.data.response.firstname,
                                lastName: _this.data.response.lastname,
                                phone: _this.data.response.phone,
                                password: LoginData.password,
                                image: _this.data.response.url,
                                ID: _this.data.response.id,
                                date: _this.data.response.date_joined,
                                phone_verify: _this.data.response.phone_verified,
                                birthday: _this.data.response.birthday,
                                aniversary: _this.data.response.anniversary
                            }).then(function () {
                                _this.SaveMobileNumberFlag(_this.data.response.mobile_verification_amount, _this.data.response.phone_verified);
                                // this.server.initializePushToken();
                                if (_this.globals.caos_flag) {
                                    _this.navCtrl.push('CartPage');
                                }
                                else {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], { imageData: _this.data.response.url, Flag: false });
                                }
                            })
                                .catch(function (err) {
                                console.log("nativesstorage", err);
                                _this.SaveMobileNumberFlag(_this.data.response.mobile_verification_amount, _this.data.response.phone_verified);
                                if (_this.globals.caos_flag) {
                                    _this.navCtrl.push('CartPage');
                                }
                                else {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], { imageData: _this.data.response.url, Flag: false });
                                }
                                // this.server.initializePushToken();
                            });
                        }
                    }
                }
                else {
                    _this.globals.presentToast("Invalid Credentials");
                }
            }, function (error) {
                _this.globals.presentToast("Something went wrong check your internet connection.");
            });
        }
    };
    LoginPage.prototype.verify = function () {
        var verifyModal = this.modalCtrl.create('VerificationPage');
        verifyModal.present();
    };
    LoginPage.prototype.OpenTermsAndPolicy = function () {
        this.navCtrl.push('TermAndPolicyPage');
    };
    LoginPage.prototype.SaveMobileNumberFlag = function (amount, flag) {
        this.globals.MobileDiscount = Number(amount);
        console.log("MobileDisocunt", this.globals.MobileDiscount);
        this.nativeStorage.setItem('MobileFlagSave', {
            MobileFlag: flag,
            MobileDiscount: Number(amount)
        }).then(function () {
            console.log('Stored mobileflag');
        }, function (error) { return console.error('Error storing item', error); });
    };
    LoginPage.prototype.list = function () {
        var _this = this;
        var response = this.server.getRestaurantslist('100000', 'main', "0,0", '0', 'order');
        response.subscribe(function (data) {
            _this.places = data.results;
            var new_id = _this.globals.new_id;
            _this.globals.business_list = _this.places;
            _this.places = _this.places.filter(function (item) {
                return item.business_id === new_id;
            });
            _this.globals.point_check = _this.places[0].points_enabled;
            _this.globals.punch_check = _this.places[0].punches_enabled;
            _this.globals.special_offer = _this.places[0].special_offer;
            _this.globals.events_enabled = _this.places[0].events_enabled;
            _this.globals.gallery_enabled = _this.places[0].gallery_enabled;
            _this.globals.pickup = _this.places[0].pickup;
            _this.globals.latitude = _this.places[0].latitude;
            _this.globals.longitude = _this.places[0].longitude;
            _this.globals.hours_operation = _this.places[0].hours_operation;
            _this.globals.branch_enabled = _this.places[0].branch_enabled;
            _this.globals.giftcard_enabled = _this.places[0].giftcard_enabled;
            _this.globals.b_logo = _this.places[0].logo;
            _this.globals.home_logo = _this.places[0].logo;
            _this.globals.StripId = _this.places[0].stripe_id;
            _this.globals.order_instructions = _this.places[0].instructions_enabled;
            _this.globals.pickup_timing = _this.places[0].pickup_timing;
            _this.globals.delivery_timing = _this.places[0].delivery_timing;
            _this.globals.business_username = _this.places[0].username;
            _this.globals.estimated_time = _this.places[0].delivery_time;
            _this.globals.business_discount_count = parseInt(_this.places[0].business_discount_count);
            _this.globals.username = _this.places[0].username;
            _this.globals.bussinessId = _this.places[0].business_id;
            _this.globals.admin_stripe = _this.places[0].admin_stripe_enabled;
            _this.globals.pickupsetting = _this.places[0].delivery_time;
            _this.globals.tax = _this.places[0].tax;
            _this.globals.deliveryCharges = _this.places[0].delivery_fee;
            _this.globals.pickup_Time = _this.places[0].pickup_time;
            _this.globals.minimun_order = parseInt(_this.places[0].minimum_order);
            _this.globals.availed_discount_count = parseInt(_this.places[0].customer_discount_availed_count);
            _this.globals.paypalId = _this.places[0].paypal_id;
            _this.globals.Timing = _this.places[0].hours_operation;
            _this.globals.specific_delivery_day = _this.places[0].specific_delivery_day;
            _this.globals.review_enabled = _this.places[0].review_enabled;
            _this.globals.delivery_day = _this.places[0].delivery_day;
            _this.globals.authorize_enabled = _this.places[0].authorize_enabled;
            _this.globals.card_enabled = _this.places[0].card_enabled;
            _this.globals.admin_stripe_enabled = _this.places[0].admin_stripe_enabled;
            _this.globals.catering_enabled = _this.places[0].catering_enabled;
            _this.globals.catering_cart_enabled = _this.places[0].catering_cart_enabled;
            _this.globals.giftcard_amount_limit = _this.places[0].giftcard_limit;
            _this.globals.business_type = _this.places[0].business_type;
            _this.globals.orders_enabled = _this.places[0].orders_enabled;
            _this.globals.BusinessDiscount = _this.places[0].discount;
            console.log("pop", _this.globals.BusinessDiscount);
            if (_this.globals.pickup == '1') {
                _this.globals.pickup = true;
            }
            else {
                _this.globals.pickup = false;
            }
            if (_this.places[0].delivery == '1') {
                _this.globals.delivery = true;
            }
            else {
                _this.globals.delivery = false;
            }
            if (_this.places[0].cash_enabled == '1') {
                _this.globals.cash_enabled = true;
            }
            else {
                _this.globals.cash_enabled = false;
            }
            if (_this.globals.pickup == '1') {
                _this.globals.pickup = true;
            }
            else {
                _this.globals.pickup = false;
            }
            if (_this.places[0].delivery == '1') {
                _this.globals.delivery = true;
            }
            else {
                _this.globals.delivery = false;
            }
        }, function (error) {
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    LoginPage.prototype.check_phone_number = function () {
        this.pos_customer = true;
    };
    LoginPage.prototype.cancel_pos = function () {
        this.pos_customer = false;
    };
    LoginPage.prototype.complete_profile = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loading.present();
        var response = this.server.check_user_by_phone(this.code + this.phone);
        response.subscribe(function (data) {
            loading.dismiss();
            _this.globals.presentToast(data.message);
            if (!data.success) {
                _this.pos_customer = false;
            }
            else {
                if (data.data.profile_complete) {
                    _this.pos_customer = false;
                }
                else {
                    //this.register();
                }
            }
        }, function (error) {
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    LoginPage.prototype.doAppleLogin = function () {
        cordova.plugins.SignInWithApple.signin({ requestedScopes: [0, 1] }, function (succ) {
            console.log(succ);
            alert(JSON.stringify(succ));
        }, function (err) {
            console.error(err);
            console.log(JSON.stringify(err));
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/login/login.html"*/'<ion-content style="background-color: #fff;" class="Open-Sans-regular">\n\n  <div style="font-family: Open Sans;" class="title1">\n    <img src={{globals.b_logo}}  class="logo_img">\n  </div>\n  <div>\n    <ion-segment [(ngModel)]="login_type" color="primary" padding>\n      <ion-segment-button value="email">\n        Login With Email\n      </ion-segment-button>\n      <ion-segment-button value="phone">\n        Login With Phone\n      </ion-segment-button>\n    </ion-segment>\n\n    <p class="Open-Sans-regular" style="font-family: Open Sans;" *ngIf="submitAttempt"\n      style="color: #ea6153; text-align:center;">Please fill out all details accurately.</p>\n\n    <div class="login-box">\n      <ion-list>\n        <form class="Open-Sans-regular" [formGroup]="loginForm" ng-submit="login(this.loginForm.value)">\n          <div [ngSwitch]="login_type" style="height: 100%;width: 100%;">\n\n            <ion-row>\n              <div *ngSwitchCase="\'email\'" style="width: 100%">\n                <ion-col>\n                  <ion-item class="no-padding">\n                    <ion-label floating>Email</ion-label>\n                    <ion-input type="submit" formControlName="email" type="email"></ion-input>\n                  </ion-item>\n                  <div class="no-border" *ngIf="!loginForm.controls.email.valid  &&\n                  (loginForm.controls.email.dirty || submitAttempt)">\n                    <p style="color: #ea6153; text-align:center; ">Please enter a valid email.</p>\n                  </div>\n                </ion-col>\n              </div>\n              <div *ngSwitchCase="\'phone\'" style="width: 100%">\n                <ion-col>\n                  <ion-row>\n                    <ion-col col-3 no-padding>\n                      <ion-select formControlName="code" class="code">\n                        <ion-option value="+1" Selected>US +1</ion-option>\n\n                      </ion-select>\n                    </ion-col>\n                    <ion-col col-9 no-padding>\n                      <ion-item class="no-padding">\n                        <ion-label floating>Phone</ion-label>\n                        <ion-input type="submit" formControlName="phone" type="number"></ion-input>\n                      </ion-item>\n                    </ion-col>\n                  </ion-row>\n\n                </ion-col>\n              </div>\n            </ion-row>\n          </div>\n          <ion-row>\n            <ion-col>\n              <ion-item class="no-padding">\n                <ion-label floating>Password</ion-label>\n                <ion-input type="submit" formControlName="password" type="password"></ion-input>\n              </ion-item>\n            </ion-col>\n\n          </ion-row>\n          <div class="no-border" *ngIf="!loginForm.controls.password.valid  &&\n                (loginForm.controls.password.dirty || submitAttempt)">\n            <p style="color: #ea6153; text-align:center;">Your password needs more than 6 characters.</p>\n          </div>\n          <div>\n            <ion-row>\n              <!-- <ion-col col-6>\n                <p style="float: right;color: #aaa" (tap)="check_phone_number()">Already a POS customer?</p>\n\n              </ion-col> -->\n              <ion-col col-12>\n                <p style="float: right;color: #aaa" (tap)="verify()">Forgot Password?</p>\n              </ion-col>\n            </ion-row>\n            <!-- <p style="float: right; padding-right:10px" (click)="OpenTermsAndPolicy()">Terms and policy</p> -->\n          </div>\n          <div class="signup-col">\n            <div class="signup_message">Don\'t have an Account? <span (tap)="createAccount()">Sign Up</span></div>\n            <button ion-button block margin-top color=\'primary\' type="submit" class="login"\n              (tap)="login(this.loginForm.value)" block>Sign In</button>\n\n              <button showWhen="ios" ion-button block margin-top color=\'primary\' type="submit" class="login_"\n              (tap)="doAppleLogin()" block>\n              <ion-icon name="logo-apple"></ion-icon>\n\n              Sign In with Apple\n            </button>\n            <!-- <button ion-button class="signUp" block (click)="createAccount()">Sign up</button> -->\n          </div>\n        </form>\n      </ion-list>\n\n    </div>\n\n  </div>\n\n  <!-- <div *ngIf="pos_customer">\n    <ion-row>\n      <ion-col col-3 no-padding>\n        <ion-select [(ngModel)]="code" class="code">\n          <ion-option value="+1" Selected>US +1</ion-option>\n\n        </ion-select>\n      </ion-col>\n      <ion-col col-9 no-padding>\n        <ion-item class="no-padding">\n          <ion-label floating>Phone</ion-label>\n          <ion-input type="submit" [(ngModel)]="phone" type="number"></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <ion-row padding>\n      <ion-col col-6>\n        <button ion-button outline block round margin-top color=\'danger\' type="submit" class="login"\n          (tap)="cancel_pos()" block>Cancel</button>\n      </ion-col>\n      <ion-col col-6>\n        <button ion-button round block margin-top color=\'primary\' type="submit" class="login"\n          (click)="complete_profile()" block>Procced</button>\n      </ion-col>\n    </ion-row>\n\n\n\n  </div> -->\n\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormBuilder"]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 177:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 177;

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/aboutus/aboutus.module": [
		713,
		60
	],
	"../pages/accept-terms/accept-terms.module": [
		714,
		59
	],
	"../pages/add-booking/add-booking.module": [
		718,
		58
	],
	"../pages/add-review/add-review.module": [
		715,
		57
	],
	"../pages/before-login/before-login.module": [
		716,
		56
	],
	"../pages/birthday-gifts/birthday-gifts.module": [
		757,
		55
	],
	"../pages/booking/booking.module": [
		717,
		54
	],
	"../pages/branches-aboutus/branches-aboutus.module": [
		719,
		53
	],
	"../pages/business-list/business-list.module": [
		720,
		52
	],
	"../pages/business-location/business-location.module": [
		721,
		51
	],
	"../pages/business-login/business-login.module": [
		723,
		50
	],
	"../pages/buygiftcards/buygiftcards.module": [
		722,
		49
	],
	"../pages/cart-detail/cart-detail.module": [
		724,
		48
	],
	"../pages/cart/cart.module": [
		774,
		47
	],
	"../pages/category/category.module": [
		764,
		46
	],
	"../pages/checkout-process/checkout-process.module": [
		768,
		1
	],
	"../pages/congratulation/congratulation.module": [
		725,
		45
	],
	"../pages/contact-us/contact-us.module": [
		726,
		44
	],
	"../pages/custom-qr/custom-qr.module": [
		727,
		43
	],
	"../pages/day-close/day-close.module": [
		728,
		42
	],
	"../pages/deals-list/deals-list.module": [
		729,
		41
	],
	"../pages/deals/deals.module": [
		760,
		40
	],
	"../pages/description/description.module": [
		759,
		39
	],
	"../pages/event-detail/event-detail.module": [
		730,
		38
	],
	"../pages/events/events.module": [
		732,
		37
	],
	"../pages/gallery/gallery.module": [
		731,
		36
	],
	"../pages/giftcard-banner/giftcard-banner.module": [
		733,
		35
	],
	"../pages/giftcard-termsandconditions/giftcard-termsandconditions.module": [
		735,
		34
	],
	"../pages/giftcards/giftcards.module": [
		734,
		33
	],
	"../pages/information/information.module": [
		736,
		32
	],
	"../pages/instruction-modal/instruction-modal.module": [
		737,
		31
	],
	"../pages/intro-page6/intro-page6.module": [
		331
	],
	"../pages/intro-page7/intro-page7.module": [
		333
	],
	"../pages/intro-page8/intro-page8.module": [
		332
	],
	"../pages/item-detail/item-detail.module": [
		765,
		30
	],
	"../pages/login/login.module": [
		758,
		61
	],
	"../pages/main-tabs/main-tabs.module": [
		334
	],
	"../pages/mobile-email-varification/mobile-email-varification.module": [
		738,
		29
	],
	"../pages/mobile-update/mobile-update.module": [
		740,
		28
	],
	"../pages/mobile-verification/mobile-verification.module": [
		739,
		27
	],
	"../pages/modal/modal.module": [
		770,
		26
	],
	"../pages/modal2/modal2.module": [
		766,
		0
	],
	"../pages/my-rewards/my-rewards.module": [
		767,
		25
	],
	"../pages/offer-details/offer-details.module": [
		741,
		24
	],
	"../pages/offers/offers.module": [
		761,
		23
	],
	"../pages/order-listing/order-listing.module": [
		771,
		22
	],
	"../pages/order-placed-detail/order-placed-detail.module": [
		763,
		21
	],
	"../pages/payment/payment.module": [
		773,
		20
	],
	"../pages/point-punch-model/point-punch-model.module": [
		744,
		19
	],
	"../pages/point-rewards/point-rewards.module": [
		742,
		18
	],
	"../pages/points-model/points-model.module": [
		743,
		17
	],
	"../pages/punch-detail/punch-detail.module": [
		745,
		16
	],
	"../pages/reservation-checking/reservation-checking.module": [
		746,
		15
	],
	"../pages/reservation/reservation.module": [
		762,
		14
	],
	"../pages/resturant-list/resturant-list.module": [
		772,
		13
	],
	"../pages/reviews/reviews.module": [
		747,
		12
	],
	"../pages/reward-notification/reward-notification.module": [
		748,
		11
	],
	"../pages/settings/settings.module": [
		769,
		10
	],
	"../pages/taxi/taxi.module": [
		749,
		9
	],
	"../pages/term-and-policy/term-and-policy.module": [
		750,
		8
	],
	"../pages/thankyou/thankyou.module": [
		751,
		7
	],
	"../pages/verification/verification.module": [
		752,
		6
	],
	"../pages/wallet-detail/wallet-detail.module": [
		753,
		5
	],
	"../pages/wallet-list/wallet-list.module": [
		756,
		4
	],
	"../pages/wallet-model/wallet-model.module": [
		754,
		3
	],
	"../pages/wallet/wallet.module": [
		755,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 219;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CONFIG; });
var CONFIG = { business_username: "shaheencafe", business_id: "197", appId: "0", googleProjectId: "0", marketPlace: false };
//# sourceMappingURL=app-config.js.map

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalVariable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config__ = __webpack_require__(220);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GlobalVariable = (function () {
    function GlobalVariable(alertCtrl, toastCtrl) {
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.staging = false;
        //Product: Array<{ productName: string, image: string, Quantity: number,price: number  }> = [];
        this.cartflag = true;
        this.BusinessID = -1;
        this.Product = new Array();
        this.GainDiscount = 0;
        this.BusinessDiscount = 0;
        this.GainDiscountFlag = false;
        this.BusinessDiscountFlag = false;
        this.deliveryCharges = 0;
        this.WallletLock = false;
        this.BirthdayCreditUtlized = false;
        this.MobileDiscount = 0;
        this.TipAdded = false;
        this.deliveryChargesFinishthroughPickup = false;
        this.walletPageFlag = false;
        this.homePageFlag = false;
        this.showbackButton = false;
        this.points_availed = 0;
        this.punchCount = 0;
        this.RewardCount = 0;
        this.BirthCount = 0;
        this.PointCount = 0;
        this.availed_discount_count = 0;
        this.business_discount_count = 0;
        this.TotalbadgeValue = 0;
        this.business_username = __WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* CONFIG */].business_username;
        this.new_id = __WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* CONFIG */].business_id;
        this.marketPlace = __WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* CONFIG */].marketPlace;
        this.model_flag = true;
        this.save_check = false;
        this.app_version = "2.1";
        this.guess_login = false;
        //kiosk flag true if building for kiosk
        this.caos_flag = false;
        this.caos_udid = 'e2c40e9f0a';
        this.inradius = true;
        //
        this.reward_menu_length = 0;
        this.menu_item_arr = [];
        this.admin_stripe_enabled = false;
        this.authorize_enabled = false;
        this.card_enabled = false;
        this.catering_enabled = false;
        this.catering_cart_enabled = false;
        this.giftcard_amount_limit = 0;
        this.retail_items_discount = 0;
        this.order_time = 'now';
        this.cash_discount_enabled = false;
        this.cash_discount_value = 0;
        this.cash_discount_percentage = 0;
        this.BaseUrl = 'https://staging.onlineordering.mikronexus.com/index.php/';
        // this.BaseUrl = 'https://onlineordering.mikronexus.com/online-ordering-new/index.php/';
        // this.BaseUrl = 'http://192.168.100.3/online-ordering-rewamp/index.php/'
    }
    GlobalVariable.prototype.alertMessage = function (title, subTitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    };
    GlobalVariable.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    GlobalVariable.prototype.circle_graph = function (value, id, radius, width, color) {
        var myCircle = Circles.create({
            id: id,
            radius: radius,
            value: value,
            maxValue: 100,
            width: width,
            text: function (value) { return ''; },
            colors: [color, '#333'],
            duration: 400,
            wrpClass: 'circles-wrp',
            textClass: 'circles-text',
            valueStrokeClass: 'circles-valueStroke',
            maxValueStrokeClass: 'circles-maxValueStroke',
            styleWrapper: true,
            styleText: true
        });
    };
    GlobalVariable = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"]])
    ], GlobalVariable);
    return GlobalVariable;
}());

//# sourceMappingURL=global.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MobileVerificationPromptPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__intro_page7_intro_page7__ = __webpack_require__(320);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MobileVerificationPromptPage = (function () {
    function MobileVerificationPromptPage(viewCtrl, alertCtrl, server, modalCtrl, globals, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.server = server;
        this.modalCtrl = modalCtrl;
        this.globals = globals;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.validEmail = true;
        this.checkEmail = this.globals.Email;
        this.checkphone = this.globals.PhoneNo;
        console.log("email", this.checkEmail);
    }
    MobileVerificationPromptPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MobileVerificationPromptPage');
    };
    MobileVerificationPromptPage.prototype.Submit = function () {
        this.DoMobileVerification();
    };
    MobileVerificationPromptPage.prototype.Cancel = function () {
        this.viewCtrl.dismiss();
    };
    MobileVerificationPromptPage.prototype.DoMobileVerification = function () {
        var _this = this;
        // let model = this.modalCtrl.create('MobileVerificationPage');
        // model.present();
        var response = this.server.MobileVerification();
        response.subscribe(function (data) {
            console.log(data);
            var verficationResponse = data;
            console.log(verficationResponse);
            if (verficationResponse.status == true) {
                _this.globals.email_verified = verficationResponse.email_verification;
                _this.globals.phone_verified = verficationResponse.phone_verification;
                console.log("phone flag", _this.globals.phone_verified, "email flag", _this.globals.email_verified);
                //this.viewCtrl.dismiss();
                if (verficationResponse.email_verification == false && verficationResponse.phone_verification == false) {
                    _this.viewCtrl.dismiss();
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__intro_page7_intro_page7__["a" /* IntroPage7Page */]);
                }
                else {
                    var model = _this.modalCtrl.create('MobileEmailVarificationPage');
                    model.present();
                }
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: "Error",
                    message: verficationResponse.message,
                    buttons: ["OK"]
                });
                alert_1.present();
            }
        }, function (error) { console.log(error); });
    };
    MobileVerificationPromptPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-mobile-verification-prompt',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/mobile-verification-prompt/mobile-verification-prompt.html"*/'<!--\n  Generated template for the MobileVerificationPromptPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<ion-content class="content">\n  <div class="overlay">\n\n  </div>\n  <div padding class="modal_content">\n   <div>\n    <h2  style="padding-top: 10% ; text-align: center">Is this your valid email?</h2>\n    <p style="text-align: center;font-size: 16px">{{checkEmail}}</p>\n  </div>\n  <div>\n    <h2  style="padding-top: 10% ; text-align: center">Is this your valid phone?</h2>\n    <p style="text-align: center;font-size: 16px">{{checkphone}}</p>\n  </div>\n  <div  class="signup-col">\n        <button ion-button (click)="Cancel()" class="login"  block>Cancel</button>\n        <button ion-button (click)="Submit()"  class="signUp" block >Submit</button>  \n  </div>\n\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/mobile-verification-prompt/mobile-verification-prompt.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], MobileVerificationPromptPage);
    return MobileVerificationPromptPage;
}());

//# sourceMappingURL=mobile-verification-prompt.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage7Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro_page2_intro_page2__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(25);
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
 * Generated class for the IntroPage7Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var IntroPage7Page = (function () {
    function IntroPage7Page(globals, navCtrl, navParams) {
        this.globals = globals;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.BirthDate = '';
        this.AniversaryDate = '';
        this.firstname = localStorage.getItem('firstname');
        this.lastname = localStorage.getItem('lastname');
        this.password = localStorage.getItem('firstname');
        this.phone = this.globals.PhoneNo;
        this.email = this.globals.Email;
    }
    IntroPage7Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntroPage7Page');
    };
    IntroPage7Page.prototype.next = function () {
        console.log(this.BirthDate, this.AniversaryDate);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__intro_page2_intro_page2__["a" /* IntroPage2Page */], { firstname: this.firstname, lastname: this.lastname, password: this.password, phone: this.phone, email: this.email, birthdate: this.BirthDate, AniversaryDate: this.AniversaryDate });
    };
    IntroPage7Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-intro-page7',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page7/intro-page7.html"*/'<!--\n  Generated template for the IntroPage7Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color=\'primary\'>\n\n    <ion-title> JJCH</ion-title>\n\n\n    <ion-buttons end>\n      <button ion-button *ngIf="BirthDate == \'\'  " style="color:white; float:right" (click)="next()" clear strong>Skip</button>\n      <button ion-button *ngIf="BirthDate!= \'\' || AniversaryDate != \'\' " style="color:white; float:right" (click)="next()" clear\n        strong>Next</button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n<ion-content class="Open-Sans-regular" style="background: url(\'assets/imgs/Intro7.png\');    background-position: center;    background-repeat: no-repeat;background-size: 100% 100%; margin-top:10%">\n  <ion-list no-lines>\n\n    <ion-item>\n      <ion-label>Birthday</ion-label>\n      <ion-datetime displayFormat="MMM/DD/YYYY" placeholder="MMM/DD/YYYY" [(ngModel)]="BirthDate"></ion-datetime>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label>Anniversary Date</ion-label>\n      <ion-datetime displayFormat="MMM/DD/YYYY" placeholder="MMM/DD/YYYY" [(ngModel)]="AniversaryDate"></ion-datetime>\n    </ion-item>\n  </ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page7/intro-page7.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], IntroPage7Page);
    return IntroPage7Page;
}());

//# sourceMappingURL=intro-page7.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro_page4_intro_page4__ = __webpack_require__(322);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the IntroPage2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var IntroPage2Page = (function () {
    function IntroPage2Page(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.firstname = this.navParams.get('firstname');
        this.lastname = this.navParams.get('lastname');
        this.password = this.navParams.get('password');
        this.phone = this.navParams.get('phone');
        this.email = this.navParams.get('email');
        this.Birthday = this.navParams.get('birthdate');
        this.aniversary = this.navParams.get('AniversaryDate');
    }
    IntroPage2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntroPage2Page');
    };
    IntroPage2Page.prototype.next = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__intro_page4_intro_page4__["a" /* IntroPage4Page */], { firstname: this.firstname, lastname: this.lastname, password: this.password, phone: this.phone, email: this.email, birthdate: this.Birthday, aniversary: this.aniversary });
    };
    IntroPage2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-intro-page2',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page2/intro-page2.html"*/'<!--\n  Generated template for the IntroPage2 page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color=\'primary\'>\n\n    <ion-title> JJCH</ion-title>\n\n    <ion-buttons end>\n      <button ion-button style="color:white; float:right" (click)="next()" clear strong>Next</button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content style="background: url(\'assets/imgs/Intro2.png\');    background-position: center;    background-repeat: no-repeat;background-size: 100% 100%;margin-top:10%">\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page2/intro-page2.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], IntroPage2Page);
    return IntroPage2Page;
}());

//# sourceMappingURL=intro-page2.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage4Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro_page6_intro_page6__ = __webpack_require__(323);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the IntroPage4 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var IntroPage4Page = (function () {
    function IntroPage4Page(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.firstname = this.navParams.get('firstname');
        this.lastname = this.navParams.get('lastname');
        this.password = this.navParams.get('password');
        this.phone = this.navParams.get('phone');
        this.email = this.navParams.get('email');
        this.birthdate = this.navParams.get('birthdate');
        this.aniversary = this.navParams.get('aniversary');
    }
    IntroPage4Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntroPage4Page');
    };
    IntroPage4Page.prototype.next = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__intro_page6_intro_page6__["a" /* IntroPage6Page */], { firstname: this.firstname, lastname: this.lastname, password: this.password, phone: this.phone, email: this.email, birthdate: this.birthdate, aniversary: this.aniversary });
    };
    IntroPage4Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-intro-page4',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page4/intro-page4.html"*/'<!--\n  Generated template for the IntroPage4 page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color=\'primary\'>\n\n    <ion-title> JJCH</ion-title>\n\n\n    <ion-buttons end>\n      <button ion-button style="color:white; float:right" (click)="next()" clear strong>Next</button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n<ion-content style="background: url(\'assets/imgs/Intro4.png\');    background-position: center;    background-repeat: no-repeat;background-size: 100% 100%; margin-top:10%">\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page4/intro-page4.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], IntroPage4Page);
    return IntroPage4Page;
}());

//# sourceMappingURL=intro-page4.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage6Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro_page8_intro_page8__ = __webpack_require__(324);
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
 * Generated class for the IntroPage6Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var IntroPage6Page = (function () {
    function IntroPage6Page(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.first_name = this.navParams.get('firstname');
        this.last_name = this.navParams.get('lastname');
        this.phone = this.navParams.get('phone');
        this.password = this.navParams.get('password');
        this.email = this.navParams.get('email');
        this.birthdate = this.navParams.get('birthdate');
        this.aniversary = this.navParams.get('aniversary');
    }
    IntroPage6Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntroPage6Page');
    };
    IntroPage6Page.prototype.next = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__intro_page8_intro_page8__["a" /* IntroPage8Page */], { firstname: this.first_name, lastname: this.last_name, password: this.password, phone: this.phone, email: this.email, birthdate: this.birthdate, aniversary: this.aniversary });
    };
    IntroPage6Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-intro-page6',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page6/intro-page6.html"*/'<!--\n  Generated template for the IntroPage6Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color=\'primary\'>\n\n    <ion-title> JJCH</ion-title>\n\n\n    <ion-buttons end>\n      <button ion-button style="color:white; float:right" (click)="next()" clear strong>Next</button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n<ion-content style="background: url(\'assets/imgs/Intro6.png\');    background-position: center;    background-repeat: no-repeat;background-size: 100% 100%; margin-top:12%">\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page6/intro-page6.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], IntroPage6Page);
    return IntroPage6Page;
}());

//# sourceMappingURL=intro-page6.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage8Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro_page5_intro_page5__ = __webpack_require__(325);
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
 * Generated class for the IntroPage8Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var IntroPage8Page = (function () {
    function IntroPage8Page(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.first_name = this.navParams.get('firstname');
        this.last_name = this.navParams.get('lastname');
        this.phone = this.navParams.get('phone');
        this.password = this.navParams.get('password');
        this.email = this.navParams.get('email');
        this.birthdate = this.navParams.get('birthdate');
        this.aniversary = this.navParams.get('aniversary');
    }
    IntroPage8Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntroPage8Page');
    };
    IntroPage8Page.prototype.next = function () {
        console.log(" i m page 8 ");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__intro_page5_intro_page5__["a" /* IntroPage5Page */], { firstname: this.first_name, lastname: this.last_name, password: this.password, phone: this.phone, email: this.email, birthdate: this.birthdate, aniversary: this.aniversary });
    };
    IntroPage8Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-intro-page8',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page8/intro-page8.html"*/'<!--\n  Generated template for the IntroPage6Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header  class="Open-Sans-bold">\n\n  <ion-navbar color=\'primary\'>\n  \n    <ion-title> JJCH</ion-title>\n\n  \n  <ion-buttons end>\n     <button ion-button style = "color:white; float:right"  (click)="next()" clear strong >Next</button>\n\n    </ion-buttons>\n  \n  </ion-navbar>\n\n</ion-header>\n<ion-content style="background: url(\'assets/imgs/Intro8.png\');    background-position: center;    background-repeat: no-repeat;background-size: 100% 100%; margin-top:10%">\n\n</ion-content>\n   \n  '/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page8/intro-page8.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], IntroPage8Page);
    return IntroPage8Page;
}());

//# sourceMappingURL=intro-page8.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage5Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_component__ = __webpack_require__(326);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/*
Generated class for the IntroPage5 page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
var IntroPage5Page = (function () {
    function IntroPage5Page(app, server, globals, nativeStorage, loadingCtrl, http, alertCtrl, navCtrl, navParams) {
        this.app = app;
        this.server = server;
        this.globals = globals;
        this.nativeStorage = nativeStorage;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = {};
        this.data.response = '';
        this.http = http;
        this.first_name = this.navParams.get('firstname');
        this.last_name = this.navParams.get('lastname');
        this.phone = this.navParams.get('phone');
        this.password = this.navParams.get('password');
        this.email = this.navParams.get('email');
        this.birthdate = this.navParams.get('birthdate');
        this.aniversary = this.navParams.get('aniversary');
    }
    IntroPage5Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntroPage5Page');
    };
    IntroPage5Page.prototype.done = function () {
        var _this = this;
        console.log(this.birthdate, this.aniversary);
        var loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true,
        });
        loading.present();
        var response = this.server.SignupData(this.first_name, this.last_name, this.email, this.password, this.phone, this.birthdate, this.aniversary, '');
        response.subscribe(function (data) {
            _this.data.response = data; //data["_body"];
            console.log(_this.data.response);
            if (_this.data.response.status != "error") {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */], { imageData: _this.image, discountText: _this.data.response.discount_text, Flag: true, discount: _this.data.response.discount_value });
                _this.image = _this.data.response.url;
                console.log(_this.image);
                _this.nativeStorage.setItem('user', {
                    email: _this.email,
                    udid: _this.data.response.udid,
                    firstName: _this.first_name,
                    lastName: _this.last_name,
                    phone: _this.phone,
                    password: _this.password,
                    image: _this.image,
                    ID: _this.data.response.id,
                    date: _this.data.response.date_joined,
                    discountValue: _this.data.response.discount_value,
                    birthday: _this.birthdate,
                    aniversary: _this.aniversary
                }).then(function () {
                    console.log("mobilephone", _this.phone);
                    _this.nativeStorage.setItem('discount', { discountValue: _this.data.response.discount_value })
                        .then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
                    console.log("b discount value", _this.data.response.discount_value);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */], { imageData: _this.image, discountText: _this.data.response.discount_text, Flag: true, discount: _this.data.response.discount_value });
                    _this.globals.udid = _this.data.response.udid;
                    // this.server.initializePushToken();
                })
                    .catch(function (err) { console.log(err); });
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: _this.data.response.description,
                    buttons: ['Retry']
                });
                loading.dismiss();
                alert_1.present();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
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
    IntroPage5Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-intro-page5',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page5/intro-page5.html"*/'<!--\n  Generated template for the IntroPage5 page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color=\'primary\'>\n\n    <ion-title> JJCH</ion-title>\n\n    <ion-buttons end>\n      <button ion-button style="color:white; float:right" (click)="done()" clear strong>Done</button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n<ion-content style="background: url(\'assets/imgs/Intro5.png\');    background-position: center;    background-repeat: no-repeat;background-size: 100% 100%; margin-top:10%">\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page5/intro-page5.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__app_app_component__["a" /* MyApp */], __WEBPACK_IMPORTED_MODULE_7__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_5__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], IntroPage5Page);
    return IntroPage5Page;
}());

//# sourceMappingURL=intro-page5.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_barcode_scanner__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_in_app_browser__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_audio__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_code_push__ = __webpack_require__(329);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// import { OneSignal } from '@ionic-native/onesignal';






var MyApp = (function () {
    function MyApp(codePush, nativeAudio, loadingCtrl, iab, barcodeScanner, alertCtrl, app, server, 
        // private _notification: OneSignal,
        alertctrl, modalCtrl, globals, statusbar, splashscreen, nativeStorage, platform, geolocation) {
        var _this = this;
        this.codePush = codePush;
        this.nativeAudio = nativeAudio;
        this.loadingCtrl = loadingCtrl;
        this.iab = iab;
        this.barcodeScanner = barcodeScanner;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.server = server;
        this.alertctrl = alertctrl;
        this.modalCtrl = modalCtrl;
        this.globals = globals;
        this.statusbar = statusbar;
        this.splashscreen = splashscreen;
        this.nativeStorage = nativeStorage;
        this.platform = platform;
        this.geolocation = geolocation;
        this.tab1Root = 'DealsPage';
        this.tab2Root = 'WalletListPage';
        this.tab3Root = 'MyRewardsPage';
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.appId = '77c7af42-a792-447b-bd4e-4d2f00346462';
        this.googleProjectId = '773485528357';
        platform.ready().then(function () {
            _this.checkCodePush();
            _this.data = {};
            _this.data.response = '';
            _this.LoadSound();
            if (_this.platform.is('core') || _this.platform.is('mobileweb')) {
                _this.list();
            }
            setTimeout(function () { return _this.splashscreen.hide(); }, 400);
            _this.statusbar.hide();
            var env = _this;
            if (_this.globals.caos_flag) {
                _this.nativeStorage.getItem('business')
                    .then(function (data) {
                    // user is previously logged and we have his data
                    // we will let him access the app
                    _this.globals.new_id = data.business_id;
                    _this.globals.business_username = data.business_username;
                    _this.globals.business_password = data.business_password;
                    env.nav.setRoot('BeforeLoginPage');
                    _this.splashscreen.hide();
                }, function (error) {
                    //we don't have the user data so we will ask him to log in
                    env.nav.setRoot('BusinessLoginPage');
                    _this.splashscreen.hide();
                }).catch(function (err) { console.log(err); });
            }
            else {
                _this.nativeStorage.getItem('user')
                    .then(function (data) {
                    // user is previously logged and we have his data
                    // we will let him access the app
                    _this.globals.udid = data.udid;
                    _this.globals.firstName = data.firstName;
                    _this.globals.lastName = data.lastName;
                    _this.globals.Email = data.email;
                    // this.initializePushToken();
                    if (!globals.marketPlace) {
                        _this.list();
                        env.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
                    }
                    else {
                        env.nav.setRoot('ResturantListPage');
                    }
                    _this.globals.showFabFlag = true;
                    _this.splashscreen.hide();
                }, function (error) {
                    if (!globals.marketPlace) {
                        _this.list();
                    }
                    //we don't have the user data so we will ask him to log in
                    env.nav.setRoot('BeforeLoginPage');
                    _this.globals.showFabFlag = false;
                    _this.splashscreen.hide();
                }).catch(function (err) { console.log(err); });
            }
            _this.splashscreen.hide();
        });
    }
    MyApp.prototype.checkCodePush = function () {
        this.codePush.sync({
            updateDialog: {
                appendReleaseDescription: true,
                descriptionPrefix: "\n\nChange log:\n"
            },
            installMode: __WEBPACK_IMPORTED_MODULE_12__ionic_native_code_push__["b" /* InstallMode */].IMMEDIATE,
        }).subscribe(function (data) {
            console.log('CODE PUSH SUCCESSFUL: ' + data);
        }, function (err) {
            console.log('CODE PUSH ERROR: ' + err);
        });
    };
    MyApp.prototype.cartpage = function () {
        //  let cartmodel = this.modalCtrl.create('CartPage');
        // cartmodel.present();
        if (this.globals.Product.length == 0) {
            var alert_1 = this.alertctrl.create({
                title: "Oops",
                message: "Your cart is empty.",
                buttons: ["Okay"]
            });
            alert_1.present();
        }
        else {
            this.nav.push('CartPage');
        }
    };
    // initializePushToken() {
    //   if (this.platform.is('ios')) {
    //     var iosSettings = {};
    //     iosSettings["kOSSettingsKeyAutoPrompt"] = true;
    //     iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;
    //     this._notification.startInit(this.appId).iOSSettings(iosSettings);
    //   } else if (this.platform.is('android')) {
    //     this._notification.startInit(this.appId, this.googleProjectId);
    //   }
    //   this._notification.inFocusDisplaying(this._notification.OSInFocusDisplayOption.None);
    //   this._notification.getIds()
    //     .then((ids) => {
    //       this.server.updateToken(ids.userId).toPromise()
    //         .then((data) => { console.log("server response on token update", data) })
    //     }).then(
    //       () => {
    //         this._notification.setSubscription(true);
    //         //this.listenForNotification();
    //       })
    //     .catch(error => console.error("onesginal error", error));
    //   this._notification.setSubscription(true);
    //   this._notification.endInit();
    // }
    // listenForNotification() {
    //   this._notification.handleNotificationReceived()
    //     .subscribe((msg) => {
    //       console.log("notification recieved", msg);
    //       // if (msg.payload.additionalData.key == 'order') {
    //       //   let modal = this.modalCtrl.create("OrderStatus");
    //       //   modal.present();
    //       // }
    //       // do something when notification is received
    //     });
    //   // this._notification.handleNotificationOpened()
    //   //   .subscribe((msg) => {
    //   //     // do something when a notification is opened
    //   //     console.log("notification opened", msg);
    //   //     // if (msg.notification.payload.additionalData.key == 'order') {
    //   //     //   let modal = this.modalCtrl.create("OrderStatus");
    //   //     //   modal.present();
    //   //     // }
    //   //   });
    //   this._notification.endInit();
    // }
    // openPage(page) {
    //   // Reset the content nav to have just this page
    //   // we wouldn't want the back button to show in this scenario
    //   this.nav.setRoot(page.component);
    // }
    MyApp.prototype.Homepage = function () {
        var view = this.nav.getActive();
        var name = view.component.name.toString();
        if (name != 'MainTabsPage') {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
        }
        //prints out component name as string
    };
    MyApp.prototype.Page = function () {
        var view = this.nav.getActive();
        var name = view.component.name.toString();
        if (name != 'LoginPage') {
            return true;
        }
        else {
            return false;
        }
    };
    MyApp.prototype.AddWallet = function () {
        this.nav.push('WalletPage');
    };
    MyApp.prototype.OpenSettingPage = function () {
        if (this.globals.guess_login) {
            this.presentConfirm();
        }
        else {
            this.nav.push('SettingsPage');
        }
    };
    MyApp.prototype.logout = function () {
        var _this = this;
        this.nativeStorage.remove('user')
            .then(function (data) {
            _this.globals.Product.length = 0;
            _this.globals.cartflag = false;
            _this.app.getRootNav().setRoot('LoginPage');
        }).catch(function (err) { return console.log(); });
    };
    MyApp.prototype.OpenEvents = function () {
        if (this.globals.guess_login) {
            this.presentConfirm();
        }
        else {
            this.nav.push('EventsPage');
        }
    };
    MyApp.prototype.openGiftCard = function () {
        this.nav.push('GiftcardsPage');
    };
    MyApp.prototype.openRewards = function () {
        if (this.globals.guess_login) {
            this.presentConfirm();
        }
        else {
            this.nav.push('MyRewardsPage');
        }
    };
    MyApp.prototype.openReviews = function () {
        if (this.globals.guess_login) {
            this.presentConfirm();
        }
        else {
            this.nav.push('ReviewsPage');
        }
    };
    MyApp.prototype.openOrder = function () {
        if (this.globals.branch_enabled == 1) {
            this.nav.push('ResturantListPage');
        }
        else {
            this.nav.push('CategoryPage');
        }
    };
    MyApp.prototype.openHistory = function () {
        if (this.globals.guess_login) {
            this.presentConfirm();
        }
        else {
            this.nav.push('OrderListingPage');
        }
    };
    MyApp.prototype.aboutus = function () {
        this.nav.push('BranchesAboutusPage');
    };
    MyApp.prototype.scanQR = function () {
        var _this = this;
        //For Testing ->   // this.modal("1","success","Nappolinini pizza","http://34.203.122.153/api/adsonscanapp/assets/images/1500954477.jpg","http://vignette1.wikia.nocookie.net/icarly/images/2/26/Purple-Smiley-Icon-keep-smiling-8214370-200-200.jpg/revision/latest?cb=20110707184639","null");
        this.barcodeScanner.scan().then(function (barcodeData) {
            if (barcodeData.format == "QR_CODE") {
                console.log(_this.globals.udid);
                console.log(barcodeData.text);
                var url = "http";
                var string = barcodeData.text.toString();
                var comma = string.indexOf(',');
                console.log(comma);
                if (comma != -1) {
                    var date = string.substring(0, comma);
                    var dateObj = new Date();
                    var month = dateObj.getUTCMonth() + 1; //months from 1-12
                    var day = dateObj.getUTCDate();
                    var year = dateObj.getUTCFullYear();
                    var currentdate = year + "/" + month + "/" + day;
                    console.log(currentdate);
                    var d = new Date(date);
                    var exp_month = d.getUTCMonth() + 1; //months from 1-12
                    var exp_day = d.getDate();
                    var exp_year = d.getUTCFullYear();
                    var expdate = exp_year + "/" + exp_month + "/" + exp_day;
                    if (new Date(expdate) < new Date(currentdate)) {
                        var qr_prompt = _this.alertCtrl.create({
                            title: "Oops",
                            message: "This QR code has expired",
                            buttons: ["Okay"]
                        });
                        qr_prompt.present();
                    }
                    else {
                        var second_half = string.substring(comma + 1);
                        var second_string = second_half.includes(url);
                        var Image_type_png = second_half.includes('png');
                        var Image_type_jpg = second_half.includes('jpg');
                        if (second_string == true && (Image_type_png == true || Image_type_jpg == true)) {
                            var image = second_half;
                            _this.ShowCustomQModel(image, true);
                        }
                        else if (second_string == true && (Image_type_png == false || Image_type_jpg == false)) {
                            var browser_url = second_half;
                            _this.launch(browser_url);
                        }
                        else {
                            var text = second_half;
                            _this.ShowCustomQModel(text, false);
                        }
                        console.log(date, second_half);
                        console.log(second_string);
                        console.log(image, browser_url, text);
                    }
                    console.log(d, expdate, exp_day);
                }
                else {
                    console.log(barcodeData.text, "barcodedata");
                    var response = _this.server.SendQRcodeToServer(barcodeData.text);
                    console.log(_this.globals.udid);
                    console.log(barcodeData.text);
                    var loading_1 = _this.loadingCtrl.create({
                        content: "Setting up...",
                    });
                    loading_1.present();
                    response.subscribe(function (data) {
                        _this.data.response = data;
                        console.log(_this.data.response);
                        console.log(_this.data.response.status);
                        console.log(_this.data.response.reward);
                        loading_1.dismiss();
                        if (_this.data.response.message == "Business not found") {
                            console.log("if");
                            var alert_2 = _this.alertCtrl.create({
                                title: 'Error',
                                subTitle: 'Wrong QR-code',
                                buttons: ['OK']
                            });
                            alert_2.present();
                        }
                        else {
                            if (_this.data.response.status == 'success') {
                                console.log(barcodeData.text, "barcodedata");
                                _this.modal(_this.data.response.reward, _this.data.response.status, _this.data.response.businessname, _this.data.response.business_logo, _this.data.response.lottery_image, _this.data.response.reward_string, _this.data.response.business_username);
                            }
                            else {
                                console.log(barcodeData.text, "barcodedata");
                                _this.modal(_this.data.response.reward, _this.data.response.status, _this.data.response.businessname, _this.data.response.business_logo, "null", _this.data.response.reward_string, _this.data.response.business_username);
                            }
                        }
                    }, function (error) {
                        console.log("Oooops!");
                        loading_1.dismiss();
                        _this.globals.presentToast("Something went wrong check your internet connection.");
                    });
                }
                // console.log(barcodeData.text);
            }
            else if (barcodeData.cancelled) {
                console.log("User cancelled the action!");
                return false;
            }
            else {
                var alert_3 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'please scan QR code',
                    buttons: ['OK']
                });
                alert_3.present();
            }
            // Success! Barcode data is here
        }, function (err) {
            // An error occurred
            console.log(err);
        });
    };
    MyApp.prototype.LoadSound = function () {
        this.nativeAudio.preloadSimple('spinner', 'assets/sounds/Spinner.mp3')
            .then(function (msg) {
        }, function (error) {
        });
        this.nativeAudio.preloadSimple('failure', 'assets/sounds/failure.mp3')
            .then(function (msg) {
        }, function (error) {
        });
        this.nativeAudio.preloadSimple('success', 'assets/sounds/success.mp3')
            .then(function (msg) {
            console.log(msg);
        }, function (error) {
            console.log(error);
        });
    };
    MyApp.prototype.ShowCustomQModel = function (data, flag) {
        //  let customerQrmodel = this.modalCtrl.create('CustomQrPage',{data:data,image_flag:flag})
        this.nav.push('CustomQrPage', { data: data, image_flag: flag });
    };
    MyApp.prototype.launch = function (url) {
        this.iab.create(url, "_self");
    };
    MyApp.prototype.followUs = function () {
        this.iab.create('https://www.facebook.com/mikronexus/', "_self");
    };
    MyApp.prototype.modal = function (response, response_status, business, logo, image, string, bid) {
        var profileModal = this.modalCtrl.create('CongratulationPage', { reward: response, status: response_status, place: business, Logo: logo, lottery_image: image, RewardString: string, id: bid });
        profileModal.present();
    };
    MyApp.prototype.business_list = function () {
        this.nav.push('BusinessListPage');
    };
    MyApp.prototype.bookingPage = function () {
        this.nav.push('BookingPage');
    };
    MyApp.prototype.list = function () {
        var _this = this;
        var response = this.server.getRestaurantslist('100000', 'main', "0,0", '0', 'order');
        response.subscribe(function (data) {
            _this.places = data.results;
            var new_id = _this.globals.new_id;
            _this.globals.business_list = _this.places;
            _this.places = _this.places.filter(function (item) {
                return item.business_id === new_id;
            });
            _this.globals.point_check = _this.places[0].points_enabled;
            _this.globals.punch_check = _this.places[0].punches_enabled;
            _this.globals.special_offer = _this.places[0].special_offer;
            _this.globals.events_enabled = _this.places[0].events_enabled;
            _this.globals.gallery_enabled = _this.places[0].gallery_enabled;
            _this.globals.pickup = _this.places[0].pickup;
            _this.globals.latitude = _this.places[0].latitude;
            _this.globals.longitude = _this.places[0].longitude;
            _this.globals.hours_operation = _this.places[0].hours_operation;
            _this.globals.branch_enabled = _this.places[0].branch_enabled;
            _this.globals.giftcard_enabled = _this.places[0].giftcard_enabled;
            _this.globals.b_logo = _this.places[0].logo;
            _this.globals.home_logo = _this.places[0].logo;
            _this.globals.StripId = _this.places[0].stripe_id;
            _this.globals.order_instructions = _this.places[0].instructions_enabled;
            _this.globals.pickup_timing = _this.places[0].pickup_timing;
            _this.globals.delivery_timing = _this.places[0].delivery_timing;
            _this.globals.business_username = _this.places[0].username;
            _this.globals.estimated_time = _this.places[0].delivery_time;
            _this.globals.business_discount_count = parseInt(_this.places[0].business_discount_count);
            _this.globals.username = _this.places[0].username;
            _this.globals.bussinessId = _this.places[0].business_id;
            _this.globals.admin_stripe = _this.places[0].admin_stripe_enabled;
            _this.globals.pickupsetting = _this.places[0].delivery_time;
            _this.globals.tax = _this.places[0].tax;
            _this.globals.deliveryCharges = _this.places[0].delivery_fee;
            _this.globals.pickup_Time = _this.places[0].pickup_time;
            _this.globals.minimun_order = parseInt(_this.places[0].minimum_order);
            _this.globals.availed_discount_count = parseInt(_this.places[0].customer_discount_availed_count);
            _this.globals.paypalId = _this.places[0].paypal_id;
            _this.globals.Timing = _this.places[0].hours_operation;
            _this.globals.specific_delivery_day = _this.places[0].specific_delivery_day;
            _this.globals.review_enabled = _this.places[0].review_enabled;
            _this.globals.delivery_day = _this.places[0].delivery_day;
            _this.globals.authorize_enabled = _this.places[0].authorize_enabled;
            _this.globals.card_enabled = _this.places[0].card_enabled;
            _this.globals.admin_stripe_enabled = _this.places[0].admin_stripe_enabled;
            _this.globals.catering_enabled = _this.places[0].catering_enabled;
            _this.globals.catering_cart_enabled = _this.places[0].catering_cart_enabled;
            _this.globals.giftcard_amount_limit = _this.places[0].giftcard_limit;
            _this.globals.business_type = _this.places[0].business_type;
            _this.globals.orders_enabled = _this.places[0].orders_enabled;
            _this.globals.BusinessDiscount = _this.places[0].discount;
            if (_this.globals.pickup == '1') {
                _this.globals.pickup = true;
            }
            else {
                _this.globals.pickup = false;
            }
            if (_this.places[0].delivery == '1') {
                _this.globals.delivery = true;
            }
            else {
                _this.globals.delivery = false;
            }
            if (_this.places[0].cash_enabled == '1') {
                _this.globals.cash_enabled = true;
            }
            else {
                _this.globals.cash_enabled = false;
            }
            if (_this.globals.pickup == '1') {
                _this.globals.pickup = true;
            }
            else {
                _this.globals.pickup = false;
            }
            if (_this.places[0].delivery == '1') {
                _this.globals.delivery = true;
            }
            else {
                _this.globals.delivery = false;
            }
        }, function (error) {
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    MyApp.prototype.show_gallery = function () {
        if (this.globals.guess_login) {
            this.presentConfirm();
        }
        else {
            this.nav.push("GalleryPage");
        }
    };
    MyApp.prototype.openDeals = function () {
        this.nav.push('DealsListPage');
    };
    MyApp.prototype.presentConfirm = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Login',
            message: 'You need to be logged in to use this feature.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'login',
                    handler: function () {
                        _this.nav.setRoot('LoginPage');
                    }
                }
            ]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Nav"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Nav"])
    ], MyApp.prototype, "nav", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], MyApp.prototype, "tabRef", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/app/app.html"*/'<ion-menu [content]="content" swipeEnabled="false">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="back_menu">\n    <ion-list>\n\n        <button  menuClose ion-item (click)="aboutus()">\n            <ion-icon name="information-circle" class="myicon"></ion-icon>About Us\n        </button>\n\n\n        <button menuClose ion-item (click)="openOrder()" *ngIf="globals.business_type == \'ordering\'">\n            <ion-icon name="restaurant" class="myicon"></ion-icon> Order Now\n          </button>\n          <button menuClose ion-item (click)="bookingPage()" *ngIf="globals.business_type == \'salon\'">\n              <ion-icon name="alarm" class="myicon"></ion-icon> Services\n            </button>\n\n          <button  menuClose ion-item (click)="openHistory()" *ngIf="globals.business_type == \'ordering\' || globals.business_type == \'retail\'">\n              <ion-icon name="list" class="myicon"></ion-icon> Order History\n            </button>\n\n            <button menuClose ion-item (click)="openRewards()">\n                <ion-icon name="star" class="myicon" ></ion-icon> My Rewards\n                <ion-badge color="danger" class="rewards_badge" *ngIf="globals.reward_menu_length > 0 " >{{globals.reward_menu_length}}</ion-badge>\n              </button>\n\n\n            <button  menuClose ion-item (click)="show_gallery()" *ngIf="globals.gallery_enabled == 1">\n                <ion-icon name="image" class="myicon"></ion-icon> Gallery\n            </button>\n\n            <button  menuClose ion-item (click)="openReviews()" *ngIf="globals.review_enabled == \'true\'">\n                <ion-icon name="clipboard" class="myicon"></ion-icon> Reviews\n              </button>\n\n\n\n\n      <button  menuClose ion-item (click)="OpenEvents()" *ngIf="globals.events_enabled == 1">\n          <ion-icon name="calendar" class="myicon"></ion-icon>Events\n      </button>\n     \n      <button  menuClose ion-item (click)="openGiftCard()" *ngIf="globals.giftcard_enabled == 1">\n        <ion-icon name="medal" class="myicon"></ion-icon>Gift Cards\n      </button>\n      <button  menuClose ion-item (click)="business_list()" *ngIf="globals.new_id == \'76\'">\n          <ion-icon name="list-box" class="myicon"></ion-icon>Resturants\n        </button>\n       \n          <!-- <button  menuClose ion-item (click)="openDeals()">\n            <ion-icon name="clipboard" class="myicon"></ion-icon> Deals\n          </button> -->\n          <!-- <button  menuClose ion-item (click)="scanQR()" *ngIf="!globals.guess_login">\n            <ion-icon name="camera" class="myicon"></ion-icon> Scan\n          </button> -->\n          \n         \n      <button  menuClose ion-item (click)="OpenSettingPage()">\n          <ion-icon name="settings" class="myicon"></ion-icon>Settings\n      </button>\n      \n      \n      <!-- <a menuClose ion-item href="tel://6316124834">\n        <ion-icon name="information-circle" class="myicon"></ion-icon> Help\n      </a> -->\n       <button menuClose ion-item (click)="logout()">\n          <ion-icon name="log-out" class="myicon"></ion-icon> Logout\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_12__ionic_native_code_push__["a" /* CodePush */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_10__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_7__providers_server_server__["a" /* ServerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_5__global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailValidator; });
var EmailValidator = (function () {
    function EmailValidator() {
    }
    EmailValidator.isValid = function (control) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
        if (re) {
            return null;
        }
        return { "invalidEmail": true };
    };
    return EmailValidator;
}());

//# sourceMappingURL=email.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntroPage6PageModule", function() { return IntroPage6PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro_page6__ = __webpack_require__(323);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IntroPage6PageModule = (function () {
    function IntroPage6PageModule() {
    }
    IntroPage6PageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__intro_page6__["a" /* IntroPage6Page */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__intro_page6__["a" /* IntroPage6Page */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__intro_page6__["a" /* IntroPage6Page */]
            ]
        })
    ], IntroPage6PageModule);
    return IntroPage6PageModule;
}());

//# sourceMappingURL=intro-page6.module.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntroPage8PageModule", function() { return IntroPage8PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro_page8__ = __webpack_require__(324);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IntroPage8PageModule = (function () {
    function IntroPage8PageModule() {
    }
    IntroPage8PageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__intro_page8__["a" /* IntroPage8Page */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__intro_page8__["a" /* IntroPage8Page */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__intro_page8__["a" /* IntroPage8Page */]
            ]
        })
    ], IntroPage8PageModule);
    return IntroPage8PageModule;
}());

//# sourceMappingURL=intro-page8.module.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntroPage7PageModule", function() { return IntroPage7PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro_page7__ = __webpack_require__(320);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IntroPage7PageModule = (function () {
    function IntroPage7PageModule() {
    }
    IntroPage7PageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__intro_page7__["a" /* IntroPage7Page */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__intro_page7__["a" /* IntroPage7Page */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__intro_page7__["a" /* IntroPage7Page */]
            ]
        })
    ], IntroPage7PageModule);
    return IntroPage7PageModule;
}());

//# sourceMappingURL=intro-page7.module.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainTabsPageModule", function() { return MainTabsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_tabs__ = __webpack_require__(692);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MainTabsPageModule = (function () {
    function MainTabsPageModule() {
    }
    MainTabsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__main_tabs__["a" /* MainTabsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__main_tabs__["a" /* MainTabsPage */]),
            ],
        })
    ], MainTabsPageModule);
    return MainTabsPageModule;
}());

//# sourceMappingURL=main-tabs.module.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_config__ = __webpack_require__(220);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// import { OneSignal } from '@ionic-native/onesignal';


var ServerProvider = (function () {
    function ServerProvider(platform, 
        // private _notification: OneSignal,
        global, http) {
        this.platform = platform;
        this.global = global;
        this.http = http;
        this.isBirthdayCount = 0;
        this.reward_count = 0;
        this.punchcount = 0;
        this.appId = __WEBPACK_IMPORTED_MODULE_7__app_config__["a" /* CONFIG */].appId;
        this.googleProjectId = __WEBPACK_IMPORTED_MODULE_7__app_config__["a" /* CONFIG */].googleProjectId;
        console.log('Hello ServerProvider Provider');
        // this.global.udid ='5bda5bbc';
    }
    ServerProvider.prototype.getdeals = function () {
        return this.http.get("http://51.254.56.71/online-ordering/index.php/customer_controller/get_deals").map(function (res) { return res.json(); });
    };
    ServerProvider.prototype.LoginData = function (LoginData) {
        var link = this.global.BaseUrl + 'Customer_controller/login';
        var data = JSON.stringify({ business_id: this.global.new_id, email: LoginData.email, phone: LoginData.code + LoginData.phone, password: LoginData.password });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.SendLogindataToServer = function (username, password) {
        var data = JSON.stringify({ username: username, password: password });
        var link = this.global.BaseUrl + 'Business_controller/app_login';
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.SignupData = function (firstname, lastname, email, password, phone, Birthday, Anniversary, profile_complete) {
        var link = this.global.BaseUrl + 'Customer_controller/signup';
        var data = JSON.stringify({ profile_complete: profile_complete, business_id: this.global.new_id, firstname: firstname, lastname: lastname, email: email, password: password, phone: phone, birthday: Birthday, anniversary: Anniversary });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.LoadBannersOnHomePage = function () {
        var link = this.global.BaseUrl + 'Customer_controller/get_banners';
        var data = JSON.stringify({ udid: this.global.udid, business_id: this.global.new_id, app_version: this.global.app_version });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); });
    };
    ServerProvider.prototype.check_user_by_phone = function (phone) {
        var link = this.global.BaseUrl + 'Customer_controller/search_customer_with_phone';
        var data = JSON.stringify({ business_id: this.global.new_id, phone: phone });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); });
    };
    ServerProvider.prototype.welcome_screen = function () {
        var link = this.global.BaseUrl + 'Customer_controller/get_welcome_screen';
        var data = JSON.stringify({ business_id: this.global.new_id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); });
    };
    ServerProvider.prototype.reward_notification = function () {
        var link = this.global.BaseUrl + 'Customer_controller/get_reward_notifications';
        var data = JSON.stringify({ business_id: this.global.new_id, udid: this.global.udid });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); });
    };
    ServerProvider.prototype.GetPunchcards = function (coordinates) {
        var link = this.global.BaseUrl + 'Customer_controller/get_punchcards';
        var data = JSON.stringify({ udid: this.global.udid, coordinates: coordinates, business_username: this.global.business_username });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.getAddress = function (coordinates, branchId) {
        if (branchId === void 0) { branchId = false; }
        var link = this.global.BaseUrl + 'Customer_controller/get_address_with_coordinates';
        var data = JSON.stringify({ business_id: this.global.bussinessId, coordinates: coordinates });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.get_events = function () {
        var link = this.global.BaseUrl + 'events/get_events';
        console.log(this.global.bussinessId);
        var data = JSON.stringify({ businessId: this.global.new_id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.get_about_us = function (id) {
        var link = this.global.BaseUrl + 'events/get_aboutus';
        var data = JSON.stringify({ business_id: id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.get_services = function () {
        var link = this.global.BaseUrl + 'salon/get_services';
        console.log(this.global.bussinessId);
        var data = JSON.stringify({ business_id: this.global.new_id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.get_stylist = function (service_id) {
        var link = this.global.BaseUrl + 'salon/get_stylist';
        console.log(this.global.bussinessId);
        var data = JSON.stringify({ business_id: this.global.new_id, service_id: service_id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.get_slots = function (service_id, stylist_id, scedule_time) {
        var link = this.global.BaseUrl + 'salon/get_stylist_timing';
        console.log("Time: ", scedule_time);
        var data = JSON.stringify({ business_id: this.global.new_id, service_id: service_id, stylist_id: stylist_id, schedule_time: scedule_time });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.booking_salon = function (service_id, stylist_id, time_slot) {
        var link = this.global.BaseUrl + 'salon/booking';
        console.log(this.global.bussinessId);
        var data = JSON.stringify({ udid: this.global.udid, business_id: this.global.new_id, service_id: service_id, stylist_id: stylist_id, time_slot: time_slot });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.booking_history = function () {
        var link = this.global.BaseUrl + 'salon/booking_history';
        console.log(this.global.bussinessId);
        var data = JSON.stringify({ udid: this.global.udid, business_id: this.global.new_id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.booking_cancel = function (bookingId) {
        var link = this.global.BaseUrl + 'salon/cancel_booking';
        console.log(this.global.bussinessId);
        var data = JSON.stringify({ id: bookingId, business_id: this.global.new_id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.get_offers = function () {
        var link = this.global.BaseUrl + 'events/get_offers';
        var data = JSON.stringify({ business_id: this.global.new_id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.get_business_reward = function () {
        var link = this.global.BaseUrl + 'rewards/get_business_rewards';
        var data = JSON.stringify({ business_id: this.global.new_id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.redeem_point_reward = function (reward_id) {
        var link = this.global.BaseUrl + 'rewards/buy_reward';
        var data = JSON.stringify({ business_id: this.global.new_id, udid: this.global.udid, reward_id: reward_id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.redeem_point_menu_reward = function (reward_id, reward_type) {
        var link = this.global.BaseUrl + 'rewards/get_redeem_points';
        var data = JSON.stringify({ business_id: this.global.new_id, udid: this.global.udid, item_id: reward_id, reward_type: reward_type });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.getPoints = function (coordinates) {
        var link = this.global.BaseUrl + 'Customer_controller/get_points';
        var data = JSON.stringify({ business_username: this.global.business_username, udid: this.global.udid, coordinates: coordinates });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.getPunch = function (coordinates) {
        var link = this.global.BaseUrl + 'Customer_controller/get_punchcards';
        var data = JSON.stringify({ business_username: this.global.business_username, udid: this.global.udid, coordinates: coordinates });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.getUserLotteryRewards = function (coordinates) {
        var link = this.global.BaseUrl + 'Customer_controller/get_rewards';
        var data = JSON.stringify({ udid: this.global.udid, coordinates: coordinates });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.getUserLotteryRewards_new = function () {
        var link = this.global.BaseUrl + 'Customer_controller/get_rewards_new';
        var data = JSON.stringify({ business_id: this.global.new_id, udid: this.global.udid });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.get_all_Rewards_new = function () {
        var link = this.global.BaseUrl + 'rewards/get_customer_rewards';
        var data = JSON.stringify({ business_id: this.global.new_id, udid: this.global.udid });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.SendQRcodeToServer = function (barcodeData) {
        var link = this.global.BaseUrl + 'Customer_controller/scanqr';
        var request = JSON.stringify({ udid: this.global.udid, businessname: barcodeData });
        return this.http.post(link, request)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.getRestaurantslist = function (radius, businesType, coordinates, offset, type) {
        var link = this.global.BaseUrl + 'Customer_controller/getplaces';
        var data;
        if (this.global.marketPlace) {
            data = JSON.stringify({ coordinates: coordinates, business_type: 'marketPlace', radius: radius, offset: offset });
        }
        else {
            data = JSON.stringify({ business_id: this.global.new_id, coordinates: coordinates, radius: radius, business_type: businesType, offset: offset, type: type, udid: this.global.udid });
        }
        return this.http.post(link, data)
            .map(function (res) { return res.json(); });
    };
    ServerProvider.prototype.BusinessInformation = function (placeName) {
        var link = this.global.BaseUrl + 'Customer_controller/getbusinessinfo';
        var data = JSON.stringify({ business_username: placeName });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.getUserProfileData = function () {
        var link = this.global.BaseUrl + "Customer_controller/get_profile_data";
        var data = JSON.stringify({ business_id: this.global.new_id, udid: this.global.udid });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.UpdateUserProfile = function (firstname, user_email, lastname, password, phone, user_birthday, user_aniversary) {
        var link = this.global.BaseUrl + 'Customer_controller/update_profile';
        var data = JSON.stringify({ business_id: this.global.new_id, firstname: firstname, email: user_email, lastname: lastname, password: password, phone: phone, birthday: user_birthday, anniversary: user_aniversary });
        console.log("data", data);
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.ForgotPassword = function (c_data) {
        var link = this.global.BaseUrl + 'Customer_controller/forgot_password';
        if (c_data.phone) {
            var data = JSON.stringify({ business_id: this.global.new_id, phone: c_data.code + c_data.phone });
        }
        else {
            var data = JSON.stringify({ business_id: this.global.new_id, email: c_data.email });
        }
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.get_social = function () {
        var link = this.global.BaseUrl + 'events/get_socials';
        var data = JSON.stringify({ businessId: this.global.new_id, });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.date_convert = function (date) {
        var link = this.global.BaseUrl + '/menu/get_date_convert';
        var data = JSON.stringify({ date: date });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.MobileVerification = function () {
        var link = this.global.BaseUrl + "Customer_controller/send_verification_message";
        var data = JSON.stringify({ business_id: this.global.new_id, email: this.global.Email, phone: this.global.PhoneNo });
        console.log("mobileVerify", data);
        return this.http.post(link, data)
            .do(this.logResponse)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.SendVerificationCodeToServer = function (phoneCode) {
        var link = this.global.BaseUrl + "Customer_controller/check_verification_code";
        var data = JSON.stringify({ business_id: this.global.new_id, email: this.global.Email, phone_code: phoneCode });
        console.log("verifuy", data);
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.LotteryRedeeem = function (StorePoint, special_flag) {
        var link = this.global.BaseUrl + 'business_controller/app_lottery_redeem_orders';
        var data = JSON.stringify({ username: this.global.BusinessID, qr_code: this.global.udid, amount: StorePoint, is_special: special_flag });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.AddUserReview = function (user_email, ReviewData, index1, bussiness) {
        var link = this.global.BaseUrl + 'Customer_controller/review';
        var request = JSON.stringify({ useremail: user_email, title: '', description: ReviewData.description, rating: index1, business: bussiness });
        return this.http.post(link, request)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    //////////  WALLET API'S /////////// 
    ServerProvider.prototype.GetWalletCategories = function () {
        var link = this.global.BaseUrl + "Customer_controller/get_wallet_categories";
        return this.http.get(link)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.SendWalletDataToServer = function (walletdata, category, frontImage, backImage) {
        var link = this.global.BaseUrl + 'Customer_controller/wallet_add';
        var data = JSON.stringify({ udid: this.global.udid, name: walletdata.cardName, expiration: walletdata.expDate, notes: walletdata.notes, category: category, front: frontImage, back: backImage });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.GetUserWalletList = function () {
        var link = this.global.BaseUrl + "Customer_controller/get_wallet";
        var data = JSON.stringify({ udid: this.global.udid });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.DeleteUserWallet = function (WalletId) {
        var link = this.global.BaseUrl + "Customer_controller/wallet_delete";
        var data = JSON.stringify({ wallet_id: WalletId });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    //////  Order API'S ///////
    ServerProvider.prototype.GetUserOrderPlaced = function () {
        if (this.global.business_type == 'retail') {
            var link = (this.global.BaseUrl + 'retail/order_history');
        }
        else {
            var link = (this.global.BaseUrl + 'menu/order_history');
        }
        var orderdata = JSON.stringify({ udid: this.global.udid });
        return this.http.post(link, orderdata)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.ProductItemDetail = function (ItemId) {
        if (this.global.business_type == 'retail') {
            var link = (this.global.BaseUrl + 'retail/item_details');
        }
        else {
            var link = (this.global.BaseUrl + 'menu/item_details');
        }
        var data = JSON.stringify({ item_id: ItemId });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.gallery_list = function () {
        var link = (this.global.BaseUrl + 'events/get_gallery_list');
        var data = JSON.stringify({ business_id: this.global.new_id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.gift_cards = function () {
        var link = (this.global.BaseUrl + 'giftcard/get_business_giftcards');
        var data = JSON.stringify({ business_id: this.global.new_id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.my_gift_cards = function () {
        var link = (this.global.BaseUrl + 'giftcard/get_customer_giftcards');
        var data = JSON.stringify({ business_id: this.global.new_id, udid: this.global.udid });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.my_gift_cards_design = function () {
        var link = (this.global.BaseUrl + 'giftcard/get_giftcard_designs');
        var data = JSON.stringify({ business_id: this.global.new_id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.search_user = function (email) {
        var link = (this.global.BaseUrl + 'giftcard/search_user');
        var data = JSON.stringify({ business_id: this.global.new_id, email: email });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.craete_user = function (email, fname, lname) {
        var link = (this.global.BaseUrl + 'giftcard/create_user');
        var data = JSON.stringify({ business_id: this.global.new_id, email: email, first_name: fname, last_name: lname });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.buy_gift_cards = function (token, id, udid_r, design_id, amount, message, action, cardinfo) {
        var link = (this.global.BaseUrl + 'giftcard/buy_giftcard');
        var data = JSON.stringify({ udid_r: udid_r, business_id: this.global.new_id, udid_s: this.global.udid, token: token, giftcard_id: id, design_id: design_id, amount: amount, message: message, action: action, card_info: cardinfo });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.GetBusinessMenuCategories = function (BusinessId) {
        if (this.global.business_type == 'retail') {
            var link = (this.global.BaseUrl + 'retail/categories');
        }
        else {
            var link = (this.global.BaseUrl + 'menu/categories');
        }
        var data = JSON.stringify({ business_id: BusinessId });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.getpoints_menuitems = function () {
        var link = (this.global.BaseUrl + 'rewards/get_point_rewards');
        var data = JSON.stringify({ business_id: this.global.new_id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.getrewards_menuitems = function () {
        var link = (this.global.BaseUrl + 'rewards/get_reward_list');
        var data = JSON.stringify({ business_id: this.global.new_id, udid: this.global.udid });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.getpunches_menuitems = function () {
        var link = (this.global.BaseUrl + 'rewards/get_punches_rewards');
        var data = JSON.stringify({ business_id: this.global.new_id, udid: this.global.udid });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.OrderStatusThroughPaypal = function (Address, instruction, myDate, cashpay) {
        var link = this.global.BaseUrl + 'menu/place_order_pp';
        var data = JSON.stringify({ udid: this.global.udid, payment_info: Address, order_info: this.global.Product, instruction: instruction, scheduled_time: myDate, total: cashpay, payment_type: "Paypal" });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.OrderConfirmationThroughPaypal = function (orderStatus, orderId) {
        var link = this.global.BaseUrl + 'menu/status_order_pp';
        var data = JSON.stringify({ status: orderStatus, order_id: orderId });
        console.log("oderstatusdata", data);
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.PaymentThroughStripe = function (Address, instruction, amount, order_date, Token, status, cash_discount, cardinfo) {
        if (this.global.business_type == 'retail') {
            var link = (this.global.BaseUrl + 'retail/place_order');
        }
        else {
            var link = (this.global.BaseUrl + 'menu/place_order');
        }
        var orderdata = JSON.stringify({ udid: this.global.udid, payment_info: { cash_discount: cash_discount, address: Address, token: Token, cardInfo: cardinfo, admin_stripe_enabled: this.global.admin_stripe_enabled, authorize_enabled: this.global.authorize_enabled }, order_info: this.global.Product, instruction: instruction, total: amount, scheduled_time: order_date, payment_type: status });
        console.log("stripe", orderdata, order_date);
        return this.http.post(link, orderdata)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.PaymentOnDelivery = function (Address, instruction, amount, order_date, Token, status) {
        if (this.global.business_type == 'retail') {
            var link = (this.global.BaseUrl + 'retail/place_order_cash');
        }
        else {
            var link = (this.global.BaseUrl + 'menu/place_order_cash');
        }
        var orderdata = JSON.stringify({ udid: this.global.udid, payment_info: { address: Address, token: Token }, order_info: this.global.Product, instructions: instruction, total: amount, scheduled_time: order_date, payment_type: status });
        console.log("stripe", orderdata, order_date);
        return this.http.post(link, orderdata)
            .do(this.logResponse)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    //// points system///////
    ServerProvider.prototype.getUserPoints = function (coordinates) {
        var link = this.global.BaseUrl + 'Customer_controller/get_points';
        var data = JSON.stringify({ udid: this.global.udid, coordinates: coordinates, business_username: this.global.business_username });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.MobileVericationCheck = function () {
        var link = this.global.BaseUrl + 'Customer_controller/mobile_verification';
        var data = JSON.stringify({ udid: this.global.udid });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.OrderStatusThroughCashOnDelivery = function (ProcessData, instruction, myDate, cashpay) {
        var link = this.global.BaseUrl + 'menu/place_order_pp';
        var data = JSON.stringify({ udid: this.global.udid, payment_info: ProcessData.Address + "," + ProcessData.city + "," + ProcessData.state + "," + ProcessData.zipcode, order_info: this.global.Product, instruction: instruction, scheduled_time: myDate, total: cashpay, payment_type: "Paypal" });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.LiveSearch = function (ch, coordinates, radius, businesType) {
        var link = this.global.BaseUrl + 'Customer_controller/live_search';
        var data = JSON.stringify({ keyword: ch, coordinates: coordinates, radius: radius, business_type: businesType });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.CheckUserPoints = function () {
        var link = this.global.BaseUrl + 'Customer_controller/check_points';
        var data = JSON.stringify({ udid: this.global.udid, b_id: this.global.new_id });
        console.log("points sending data", data);
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.RedeemUserPoints = function () {
        var link = this.global.BaseUrl + 'Customer_controller/redeem_points';
        var data = JSON.stringify({ udid: this.global.udid, b_id: this.global.bussinessId, amount: this.global.points_availed });
        console.log("redeem points", data);
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.ReservationChecking = function (people, time) {
        var link = this.global.BaseUrl + 'Customer_controller/reservation_status';
        var data = JSON.stringify({ udid: this.global.udid, b_id: this.global.bussinessId, persons: people, time: time });
        console.log(data);
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.AddReservation = function (people, time, notes) {
        var link = this.global.BaseUrl + 'Customer_controller/add_reservation';
        var data = JSON.stringify({ udid: this.global.udid, b_id: this.global.bussinessId, persons: people, time: time, notes: notes });
        console.log(data);
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.getReservations = function () {
        var link = this.global.BaseUrl + 'Customer_controller/get_reservations';
        var data = JSON.stringify({ udid: this.global.udid });
        console.log(data);
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.PaymentThroughPayOnVenue = function (instruction, amount) {
        var link = (this.global.BaseUrl + 'menu/place_order_r');
        var orderdata = JSON.stringify({ udid: this.global.udid, payment_info: '', order_info: this.global.Product, instruction: instruction, total: amount, payment_type: 'Pay_on_venue', reservation_id: this.global.reservation_id });
        console.log(orderdata);
        return this.http.post(link, orderdata)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.PaymentThroughStripeReservation = function (instruction, amount, Token) {
        var link = (this.global.BaseUrl + 'menu/place_order_r');
        var orderdata = JSON.stringify({ udid: this.global.udid, payment_info: { address: '', token: Token }, order_info: this.global.Product, instruction: instruction, total: amount, payment_type: 'Stripe', reservation_id: this.global.reservation_id });
        console.log(orderdata);
        return this.http.post(link, orderdata)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.OrderStatusThroughPaypalReservation = function (instruction, cashpay) {
        var link = this.global.BaseUrl + 'menu/place_order_pp_r';
        var data = JSON.stringify({ udid: this.global.udid, payment_info: '', order_info: this.global.Product, instruction: instruction, total: cashpay, payment_type: "Paypal", reservation_id: this.global.reservation_id });
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.OrderConfirmationThroughPaypalReservation = function (orderStatus, orderId) {
        var link = this.global.BaseUrl + 'menu/status_order_pp_r';
        var data = JSON.stringify({ status: orderStatus, order_id: orderId });
        console.log("oderstatusdata", data);
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.userBusinessAvailedDiscount = function () {
        var link = this.global.BaseUrl + 'Customer_controller/customer_discount';
        var data = JSON.stringify({ udid: this.global.udid, b_id: this.global.bussinessId, discount_count: this.global.availed_discount_count });
        console.log("oderstatusdata", data);
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.updateToken = function (id) {
        var link = this.global.BaseUrl + 'Customer_controller/customer_player_id';
        var data = JSON.stringify({ udid: this.global.udid, player_id: id });
        console.log("update", data);
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ServerProvider.prototype.business_login = function (username, password) {
        var data = JSON.stringify({ username: username, password: password });
        var link = this.global.BaseUrl + 'business_controller/app_login';
        return this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    // initializePushToken() {
    //   console.log("intializing push token");
    //   if (this.platform.is('ios')) {
    //     var iosSettings = {};
    //     iosSettings["kOSSettingsKeyAutoPrompt"] = true;
    //     iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;
    //     this._notification.startInit(this.appId).iOSSettings(iosSettings);
    //   } else if (this.platform.is('android')) {
    //     this._notification.startInit(this.appId, this.googleProjectId);
    //   }
    //   this._notification.inFocusDisplaying(this._notification.OSInFocusDisplayOption.None);
    //   this._notification.getIds()
    //     .then((ids) => {
    //       console.log("ids from one signal", ids);
    //       this.updateToken(ids.userId).toPromise()
    //         .then((data) => { console.log("server response on token update", data) })
    //     }
    //     ).then(
    //       () => {
    //         this._notification.setSubscription(true);
    //         //this.listenForNotification();
    //       })
    //     .catch(error => console.error("onesginal error", error));
    //   this._notification.setSubscription(true);
    //   this._notification.endInit();
    // }
    ServerProvider.prototype.logResponse = function (res) {
        console.log("usmn");
        console.log("server response", res);
        console.log("server response - parsed", res.json());
    };
    ServerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_5__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ServerProvider);
    return ServerProvider;
}());

//# sourceMappingURL=server.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(389);



Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_main_tabs_main_tabs_module__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_pin_dialog__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_barcode_scanner__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_in_app_browser__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_common_http__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_native_audio__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_geolocation__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ionic2_rating__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_call_number__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_email_composer__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_camera__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_crop__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_diagnostic__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_social_sharing__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_stripe__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_intro_page1_intro_page1__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_intro_page2_intro_page2__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_intro_page3_intro_page3__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_intro_page4_intro_page4__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_intro_page5_intro_page5__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_intro_page6_intro_page6_module__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_intro_page7_intro_page7_module__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_intro_page8_intro_page8_module__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_calendar__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_getlocation_getlocation__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_mobile_verification_prompt_mobile_verification_prompt__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_photo_viewer__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_code_push__ = __webpack_require__(329);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



































// import { OneSignal } from '@ionic-native/onesignal';





//import { TextMaskModule } from 'angular2-text-mask';
// import{Modal2Page} from '../pages/modal2/modal2';
//import{ModalPage} from '../pages/modal/modal';
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
                // Modal2Page,
                //MainTabsPage,
                __WEBPACK_IMPORTED_MODULE_27__pages_intro_page1_intro_page1__["a" /* IntroPage1Page */],
                __WEBPACK_IMPORTED_MODULE_28__pages_intro_page2_intro_page2__["a" /* IntroPage2Page */],
                __WEBPACK_IMPORTED_MODULE_29__pages_intro_page3_intro_page3__["a" /* IntroPage3Page */],
                __WEBPACK_IMPORTED_MODULE_30__pages_intro_page4_intro_page4__["a" /* IntroPage4Page */],
                __WEBPACK_IMPORTED_MODULE_31__pages_intro_page5_intro_page5__["a" /* IntroPage5Page */],
                __WEBPACK_IMPORTED_MODULE_37__pages_mobile_verification_prompt_mobile_verification_prompt__["a" /* MobileVerificationPromptPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], { tabsHideOnSubPages: 'false' }, {
                    links: [
                        { loadChildren: '../pages/aboutus/aboutus.module#AboutusPageModule', name: 'AboutusPage', segment: 'aboutus', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/accept-terms/accept-terms.module#AcceptTermsPageModule', name: 'AcceptTermsPage', segment: 'accept-terms', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/add-review/add-review.module#AddReviewPageModule', name: 'AddReviewPage', segment: 'add-review', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/before-login/before-login.module#BeforeLoginPageModule', name: 'BeforeLoginPage', segment: 'before-login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/booking/booking.module#BookingPageModule', name: 'BookingPage', segment: 'booking', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/add-booking/add-booking.module#AddBookingPageModule', name: 'AddBookingPage', segment: 'add-booking', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/branches-aboutus/branches-aboutus.module#BranchesAboutusPageModule', name: 'BranchesAboutusPage', segment: 'branches-aboutus', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/business-list/business-list.module#BusinessListPageModule', name: 'BusinessListPage', segment: 'business-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/business-location/business-location.module#BusinessLocationPageModule', name: 'BusinessLocationPage', segment: 'business-location', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/buygiftcards/buygiftcards.module#BuygiftcardsPageModule', name: 'BuygiftcardsPage', segment: 'buygiftcards', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/business-login/business-login.module#BusinessLoginPageModule', name: 'BusinessLoginPage', segment: 'business-login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cart-detail/cart-detail.module#CartDetailPageModule', name: 'CartDetailPage', segment: 'cart-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/congratulation/congratulation.module#CongratulationPageModule', name: 'CongratulationPage', segment: 'congratulation', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/contact-us/contact-us.module#ContactUsPageModule', name: 'ContactUsPage', segment: 'contact-us', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/custom-qr/custom-qr.module#CustomQrPageModule', name: 'CustomQrPage', segment: 'custom-qr', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/day-close/day-close.module#DayClosePageModule', name: 'DayClosePage', segment: 'day-close', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/deals-list/deals-list.module#DealsListPageModule', name: 'DealsListPage', segment: 'deals-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-detail/event-detail.module#EventDetailPageModule', name: 'EventDetailPage', segment: 'event-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/gallery/gallery.module#GalleryPageModule', name: 'GalleryPage', segment: 'gallery', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/events/events.module#EventsPageModule', name: 'EventsPage', segment: 'events', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/giftcard-banner/giftcard-banner.module#GiftcardBannerPageModule', name: 'GiftcardBannerPage', segment: 'giftcard-banner', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/giftcards/giftcards.module#GiftcardsPageModule', name: 'GiftcardsPage', segment: 'giftcards', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/giftcard-termsandconditions/giftcard-termsandconditions.module#GiftcardTermsandconditionsPageModule', name: 'GiftcardTermsandconditionsPage', segment: 'giftcard-termsandconditions', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/information/information.module#InformationPageModule', name: 'InformationPage', segment: 'information', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/instruction-modal/instruction-modal.module#InstructionModalPageModule', name: 'InstructionModalPage', segment: 'instruction-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/intro-page6/intro-page6.module#IntroPage6PageModule', name: 'IntroPage6Page', segment: 'intro-page6', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/intro-page8/intro-page8.module#IntroPage8PageModule', name: 'IntroPage8Page', segment: 'intro-page8', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/intro-page7/intro-page7.module#IntroPage7PageModule', name: 'IntroPage7Page', segment: 'intro-page7', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mobile-email-varification/mobile-email-varification.module#MobileEmailVarificationPageModule', name: 'MobileEmailVarificationPage', segment: 'mobile-email-varification', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mobile-verification/mobile-verification.module#MobileVerificationPageModule', name: 'MobileVerificationPage', segment: 'mobile-verification', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mobile-update/mobile-update.module#MobileUpdatePageModule', name: 'MobileUpdatePage', segment: 'mobile-update', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/offer-details/offer-details.module#OfferDetailsPageModule', name: 'OfferDetailsPage', segment: 'offer-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/point-rewards/point-rewards.module#PointRewardsPageModule', name: 'PointRewardsPage', segment: 'point-rewards', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/points-model/points-model.module#PointsModelPageModule', name: 'PointsModelPage', segment: 'points-model', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/point-punch-model/point-punch-model.module#PointPunchModelPageModule', name: 'PointPunchModelPage', segment: 'point-punch-model', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/punch-detail/punch-detail.module#PunchDetailPageModule', name: 'PunchDetailPage', segment: 'punch-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reservation-checking/reservation-checking.module#ReservationCheckingPageModule', name: 'ReservationCheckingPage', segment: 'reservation-checking', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reviews/reviews.module#ReviewsPageModule', name: 'ReviewsPage', segment: 'reviews', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reward-notification/reward-notification.module#RewardNotificationPageModule', name: 'RewardNotificationPage', segment: 'reward-notification', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/taxi/taxi.module#TaxiPageModule', name: 'TaxiPage', segment: 'taxi', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/term-and-policy/term-and-policy.module#TermAndPolicyPageModule', name: 'TermAndPolicyPage', segment: 'term-and-policy', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/thankyou/thankyou.module#ThankyouPageModule', name: 'ThankyouPage', segment: 'thankyou', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/verification/verification.module#VerificationPageModule', name: 'VerificationPage', segment: 'verification', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/wallet-detail/wallet-detail.module#WalletDetailPageModule', name: 'WalletDetailPage', segment: 'wallet-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/wallet-model/wallet-model.module#WalletModelPageModule', name: 'WalletModelPage', segment: 'wallet-model', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/wallet/wallet.module#WalletPageModule', name: 'WalletPage', segment: 'wallet', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/wallet-list/wallet-list.module#WalletListPageModule', name: 'WalletListPage', segment: 'wallet-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/birthday-gifts/birthday-gifts.module#BirthdayGiftsPageModule', name: 'BirthdayGiftsPage', segment: 'birthday-gifts', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/description/description.module#DescriptionPageModule', name: 'DescriptionPage', segment: 'description', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/deals/deals.module#DealsPageModule', name: 'DealsPage', segment: 'deals', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/main-tabs/main-tabs.module#MainTabsPageModule', name: 'MainTabsPage', segment: 'main-tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/offers/offers.module#OffersPageModule', name: 'OffersPage', segment: 'offers', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reservation/reservation.module#ReservationPageModule', name: 'ReservationPage', segment: 'reservation', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order-placed-detail/order-placed-detail.module#OrderPlacedDetailPageModule', name: 'OrderPlacedDetailPage', segment: 'order-placed-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/category/category.module#CategoryPageModule', name: 'CategoryPage', segment: 'category', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/item-detail/item-detail.module#ItemDetailPageModule', name: 'ItemDetailPage', segment: 'item-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modal2/modal2.module#Modal2PageModule', name: 'Modal2Page', segment: 'modal2', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/my-rewards/my-rewards.module#MyRewardsPageModule', name: 'MyRewardsPage', segment: 'my-rewards', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/checkout-process/checkout-process.module#CheckoutProcessPageModule', name: 'CheckoutProcessPage', segment: 'checkout-process', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modal/modal.module#ModalPageModule', name: 'ModalPage', segment: 'modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order-listing/order-listing.module#OrderListingPageModule', name: 'OrderListingPage', segment: 'order-listing', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/resturant-list/resturant-list.module#ResturantListPageModule', name: 'ResturantListPage', segment: 'resturant-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/payment/payment.module#PaymentPageModule', name: 'PaymentPage', segment: 'payment', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cart/cart.module#CartPageModule', name: 'CartPage', segment: 'cart', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_16__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_19_ionic2_rating__["a" /* Ionic2RatingModule */],
                __WEBPACK_IMPORTED_MODULE_32__pages_intro_page6_intro_page6_module__["IntroPage6PageModule"],
                __WEBPACK_IMPORTED_MODULE_33__pages_intro_page7_intro_page7_module__["IntroPage7PageModule"],
                __WEBPACK_IMPORTED_MODULE_34__pages_intro_page8_intro_page8_module__["IntroPage8PageModule"],
                //MobileVerificationPromptPage,
                __WEBPACK_IMPORTED_MODULE_9__pages_main_tabs_main_tabs_module__["MainTabsPageModule"],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicApp"]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
                // Modal2Page,
                //MainTabsPage,
                __WEBPACK_IMPORTED_MODULE_27__pages_intro_page1_intro_page1__["a" /* IntroPage1Page */],
                __WEBPACK_IMPORTED_MODULE_28__pages_intro_page2_intro_page2__["a" /* IntroPage2Page */],
                __WEBPACK_IMPORTED_MODULE_29__pages_intro_page3_intro_page3__["a" /* IntroPage3Page */],
                __WEBPACK_IMPORTED_MODULE_30__pages_intro_page4_intro_page4__["a" /* IntroPage4Page */],
                __WEBPACK_IMPORTED_MODULE_31__pages_intro_page5_intro_page5__["a" /* IntroPage5Page */],
                __WEBPACK_IMPORTED_MODULE_37__pages_mobile_verification_prompt_mobile_verification_prompt__["a" /* MobileVerificationPromptPage */]
                //IntroPage6Page,
                // IntroPage7Page,
                // IntroPage8Page,
                //ModalPage
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicErrorHandler"] },
                __WEBPACK_IMPORTED_MODULE_10__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_11__global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_15__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_pin_dialog__["a" /* PinDialog */], __WEBPACK_IMPORTED_MODULE_17__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_18__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_call_number__["a" /* CallNumber */], __WEBPACK_IMPORTED_MODULE_21__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_22__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_23__ionic_native_crop__["a" /* Crop */], __WEBPACK_IMPORTED_MODULE_24__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_25__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_26__ionic_native_stripe__["a" /* Stripe */],
                // OneSignal,
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_calendar__["a" /* Calendar */],
                __WEBPACK_IMPORTED_MODULE_36__providers_getlocation_getlocation__["a" /* GetlocationProvider */], __WEBPACK_IMPORTED_MODULE_38__ionic_native_photo_viewer__["a" /* PhotoViewer */], __WEBPACK_IMPORTED_MODULE_39__ionic_native_code_push__["a" /* CodePush */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_audio__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_diagnostic__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HomePage = (function () {
    function HomePage(geolocation, diagnostic, app, server, globals, nativeAudio, iab, nativeStorage, loadingCtrl, modalCtrl, _nav, _navParams, alertCtrl, platform) {
        this.geolocation = geolocation;
        this.diagnostic = diagnostic;
        this.app = app;
        this.server = server;
        this.globals = globals;
        this.nativeAudio = nativeAudio;
        this.iab = iab;
        this.nativeStorage = nativeStorage;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this._nav = _nav;
        this._navParams = _navParams;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.punchcount = 0;
        this.reward_count = 0;
        this.count = 0;
        this.time = "4000";
        this.punch = [];
        this.punch_limt = [];
        if (!this.globals.guess_login) {
            this.reward_notification();
        }
        this.loadBanner();
        this.cartflag = _navParams.get('CartFlag');
        this.discount_text = _navParams.get('discountText');
        this.GainFlag = _navParams.get('Flag');
        this.discount = _navParams.get('discount');
        this.globals.showFabFlag = true;
        this.barocde_image = _navParams.get('imageData');
        localStorage.removeItem("GetAddress");
        localStorage.removeItem("scheduled_time");
        this.list();
    }
    HomePage.prototype.orderNow = function () {
        if (this.globals.branch_enabled == 1) {
            this._nav.push('ResturantListPage');
        }
        else {
            this._nav.push('CategoryPage');
        }
    };
    HomePage.prototype.gifts = function () {
        this._nav.push('GiftcardsPage');
    };
    HomePage.prototype.rewards = function (type) {
        this._nav.push('MyRewardsPage', { reward_type_home: type });
    };
    HomePage.prototype.reward_notification = function () {
        var _this = this;
        var response = this.server.reward_notification();
        response.subscribe(function (data) {
            if (data.status == true) {
                _this.globals.notifications = data.notifications;
                var mobile_update = _this.modalCtrl.create('RewardNotificationPage');
                mobile_update.present();
            }
        }, function (error) {
            console.log(error, "error notifications");
        });
    };
    HomePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.loadBanner();
        this.getPoints('0,0');
        this.getPunches();
        this.getLocation();
        if (this.globals.Product.length > 0) {
            this.globals.cartflag = true;
        }
        this.globals.HomeFlag = true;
        this.content.resize();
        this.nativeStorage.getItem('user')
            .then(function (data) {
            _this.email = data.email,
                _this.name = data.firstName;
            _this.lastname = data.lastName;
            _this.barocde_image = data.image;
            _this.user_date = data.date;
            _this.user_id = data.ID;
            _this.udid = data.udid;
            _this.mobile_verify = data.phone_verify;
            _this.globals.udid = _this.udid;
            _this.value = _this.pad(_this.user_id, 12);
            _this.slicedValue = _this.value.slice(0, 4) + " " + _this.value.slice(4, 8) + " " + _this.value.slice(8, 12);
            _this.month = _this.user_date.substring(0, 2);
            _this.year = _this.user_date.substring(8);
        }).catch(function (err) { return console.log; });
        setTimeout(function () {
            refresher.complete();
        }, 2000);
    };
    HomePage.prototype.getLocation = function () {
        // this.diagnostic.isLocationEnabled()
        //     .then((state) => {
        var _this = this;
        this.flag = true;
        if (this.globals.delivery == true) {
            this.geolocation.getCurrentPosition().then(function (position) {
                _this.coordinates = position.coords.latitude + "," + position.coords.longitude;
                _this.globals.RewardsPos = _this.coordinates;
                _this.globals.mycoordinates = _this.coordinates;
            }, function (err) {
                var alert = _this.alertCtrl.create({
                    title: 'Location is disabled',
                    subTitle: 'In order to proceed, Please enable your location',
                    buttons: ['OK']
                });
                alert.present();
                console.log(err);
            });
        }
        // if (state) {
        //     this.flag = true;
        //     this.geolocation.getCurrentPosition().then((position) => {
        //         this.coordinates = position.coords.latitude + "," + position.coords.longitude;
        //         this.globals.RewardsPos = this.coordinates;
        //         this.globals.mycoordinates = this.coordinates;
        //     }, (err) => {
        //         console.log(err);
        //     });
        // } else {
        //     let alert = this.alertCtrl.create({
        //         title: 'Location is disabled',
        //         subTitle: 'In order to proceed, Please enable your location',
        //         buttons: ['OK']
        //     });
        //     alert.present();
        // }
        // }).catch(e => {
        //     let alert = this.alertCtrl.create({
        //         title: 'Location is disabled',
        //         subTitle: 'In order to proceed, Please enable your location',
        //         buttons: ['OK']
        //     });
        //     alert.present();
        // });
    };
    HomePage.prototype.offers = function () {
        if (this.globals.branch_enabled == 1) {
            this._nav.push('ResturantListPage', { deals: 1 });
        }
        else {
            this._nav.push("OffersPage");
        }
    };
    HomePage.prototype.ionViewDidLeave = function () {
        this.globals.HomeFlag = false;
        if (this.globals.Product.length > 0) {
            this.globals.cartflag = true;
        }
    };
    HomePage.prototype.getPoints = function (coordinates) {
        var _this = this;
        var response = this.server.getPoints(coordinates);
        response.subscribe(function (data) {
            if (data.status == "error") {
                _this.points = 0;
                _this.globals.points_ = 0;
            }
            else {
                _this.points = data.rewards[0].points;
                _this.globals.points_ = Number(_this.points);
            }
        }, function (error) {
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    HomePage.prototype.getPunches = function () {
        var _this = this;
        var response = this.server.getpunches_menuitems();
        response.subscribe(function (data) {
            if (data.status == true) {
                _this.punch_menu = data.items;
                if (_this.punch_menu.length > 0) {
                    _this.punch_ = Number(_this.punch_menu[0].punch_count);
                    _this.punch_limt_ = Number(_this.punch_menu[0].punch_limit);
                    _this.globals.punch_ = _this.punch_;
                    _this.globals.punch_limit_ = _this.punch_limt_;
                    var percent = (parseInt(_this.punch_) / parseInt(_this.punch_limt_)) * 100;
                    _this.globals.circle_graph(percent, 'homecircle1', 50, 7, '#ccc');
                }
                else {
                    _this.punch_ = 0;
                    _this.punch_limt_ = 0;
                    _this.globals.circle_graph(0, 'homecircle1', 50, 7, '#ccc');
                }
            }
            else {
                _this.punch_ = 0;
                _this.punch_limt_ = 0;
                _this.globals.circle_graph(0, 'homecircle1', 50, 7, '#ccc');
                _this.globals.presentToast(data.message);
            }
        }, function (error) {
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.getLocation();
        this.rewards_items();
        if (this.globals.Product.length > 0) {
            this.globals.cartflag = true;
        }
        this.globals.HomeFlag = true;
        this.content.resize();
        this.nativeStorage.getItem('user')
            .then(function (data) {
            _this.email = data.email,
                _this.name = data.firstName;
            _this.lastname = data.lastName;
            _this.barocde_image = data.image;
            _this.user_date = data.date;
            _this.user_id = data.ID;
            _this.udid = data.udid;
            _this.mobile_verify = data.phone_verify;
            _this.globals.udid = _this.udid;
            _this.value = _this.pad(_this.user_id, 12);
            _this.slicedValue = _this.value.slice(0, 4) + " " + _this.value.slice(4, 8) + " " + _this.value.slice(8, 12);
            _this.month = _this.user_date.substring(0, 2);
            _this.year = _this.user_date.substring(8);
            if (_this.GainFlag) {
                _this.showDiscountMessage();
            }
        }).catch(function (err) { return console.log; });
        this.nativeStorage.getItem('discount')
            .then(function (data) {
            _this.globals.GainDiscount = data.discountValue;
        }).catch(function (err) { return console.log; });
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.globals.showbackButton = false;
        this.getPoints('0,0');
        this.getPunches();
    };
    HomePage.prototype.showDiscountMessage = function () {
        var alert = this.alertCtrl.create({
            title: 'Congratulation',
            subTitle: this.discount_text,
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage.prototype.launch = function (url) {
        if (url) {
            this.iab.create(url, "_self");
        }
    };
    HomePage.prototype.pad = function (str, max) {
        str = str.toString();
        return str.length < max ? this.pad("0" + str, max) : str;
    };
    HomePage.prototype.services = function () {
        this._nav.push('BookingPage');
    };
    HomePage.prototype.loadBanner = function () {
        var _this = this;
        var response = this.server.LoadBannersOnHomePage();
        response.subscribe(function (data) {
            console.log(data);
            _this.banner = data;
            _this.Images = _this.banner.data;
            _this.globals.banner_image = _this.banner.data;
            _this.time = _this.banner.time;
            _this.globals.android_url = _this.banner.android_url;
            _this.globals.ios_url = _this.banner.ios_url;
            _this.globals.update_message = _this.banner.message;
            _this.ring_image = _this.banner.ring_image;
            _this.globals.is_anniversary = _this.banner.is_anniversary;
            _this.globals.is_birthday = _this.banner.is_birthday;
            _this.banner_color = _this.banner.banner_color;
            _this.special_offer_color = _this.banner.special_offer_color;
            _this.my_rewards_color = _this.banner.my_rewards_color;
            _this.gift_cards_color = _this.banner.gift_cards_color;
            _this.order_now_color = _this.banner.order_now_color;
            _this.globals.cash_discount = _this.banner.cash_discount;
            _this.globals.cash_discount_enabled = _this.banner.cash_discount_enabled;
            _this.globals.cash_discount_percentage = _this.banner.cash_discount_percentage;
            _this.globals.cash_discount_value = _this.banner.cash_discount_value;
            //console.log('colors',this.my_rewards_color,this.gift_cards_color, this.special_offer_color,this.order_now_color);
            if (!_this.banner.is_latest_build) {
                var mobile_update = _this.modalCtrl.create('MobileUpdatePage');
                mobile_update.present();
            }
        }, function (error) {
        });
    };
    HomePage.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log('ngAfter View In it');
        setTimeout(function () {
            var date = new Date();
            var day = date.getDay();
            if (_this.globals.hours_operation && _this.globals.hours_operation[day]) {
                var current_day = _this.globals.hours_operation[day];
                _this.today_message = current_day[2];
                console.log('msg..', _this.today_message);
            }
        }, 3000);
    };
    HomePage.prototype.OpenSettingPage = function () {
        this._nav.push('SettingsPage');
    };
    HomePage.prototype.ordersPage = function () {
        // this._nav.parent.tabRef[0].isSelected=false;
        this._nav.push('OrderListingPage');
    };
    HomePage.prototype.cartpage = function () {
        if (this.globals.Product.length == 0) {
            var alert_1 = this.alertCtrl.create({
                title: "Oops",
                message: "Your cart is empty.",
                buttons: ["Okay"]
            });
            alert_1.present();
        }
        else {
            this._nav.push('CartPage');
        }
    };
    HomePage.prototype.taxiPage = function () {
        this._nav.push('TaxiPage');
    };
    HomePage.prototype.bookingPage = function () {
        this._nav.push('BookingPage');
    };
    HomePage.prototype.ReservationPage = function () {
        this._nav.push('ReservationPage');
    };
    HomePage.prototype.birthday_gifts = function () {
        if (this.globals.branch_enabled == 1) {
            this._nav.push('ResturantListPage', { birthdaygift: 2 });
        }
        else {
            this._nav.push('BirthdayGiftsPage');
        }
    };
    HomePage.prototype.rewards_items = function () {
        var _this = this;
        var response = this.server.getrewards_menuitems();
        response.subscribe(function (data) {
            if (data.status == true) {
                if (data.items.length > 0) {
                    _this.globals.reward_menu_length = data.items.length;
                }
            }
        }, function (error) {
        });
    };
    HomePage.prototype.list = function () {
        var _this = this;
        var response = this.server.getRestaurantslist('100000', 'main', "0,0", '0', 'order');
        response.subscribe(function (data) {
            _this.places = data.results;
            var new_id = _this.globals.new_id;
            _this.globals.business_list = _this.places;
            _this.places = _this.places.filter(function (item) {
                return item.business_id === new_id;
            });
            _this.globals.business_discount_count = parseInt(_this.places[0].business_discount_count);
            _this.globals.availed_discount_count = parseInt(_this.places[0].customer_discount_availed_count);
        }, function (error) {
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Slides"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Slides"])
    ], HomePage.prototype, "slides", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"])
    ], HomePage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], HomePage.prototype, "tabRef", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/home/home.html"*/'<ion-header>\n\n\n  <ion-navbar class="home-nav" color="light" align-title="center">\n\n    <ion-title>\n      <img src={{globals.home_logo}} class="header_logo">\n    </ion-title>\n    <!-- <ion-title style="color: #27ae60 !important" *ngIf="globals.title != \'Dusstuk\'"  >{{globals.title}}</ion-title> -->\n    <ion-buttons class="left-btn" start>\n      <button ion-button style="font-size:3rem" menuToggle>\n        <ion-badge color="danger" *ngIf="globals.reward_menu_length > 0 ">{{globals.reward_menu_length}}</ion-badge>\n        <ion-icon name="md-menu"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-buttons end>\n      <button ion-button style="font-size: 3rem;" (tap)="cartpage()">\n        <ion-badge color="danger" *ngIf="globals.Product.length > 0">{{globals.Product.length}}</ion-badge>\n        <ion-icon name="cart"> </ion-icon>\n        <!-- <i class="fa fa-shopping-cart"></i> -->\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content padding class="bak">\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <p class="marquee message" [ngStyle]="{\'background-color\': banner_color}"  *ngIf="today_message"><span>{{today_message}}</span></p>\n\n  <ion-slides pager *ngIf="banner" style="height:184px" autoplay="{{time}}" speed="3000" loop="true"\n    autoplayDisableOnInteraction="false">\n    <ion-slide *ngFor="let banners of Images" style="height:100%">\n      <img style="height: 173px; width:100% !important;border-radius: 7px;object-fit: cover" src="{{banners?.image}}"\n        (tap)="launch(banners?.url)">\n    </ion-slide>\n  </ion-slides>\n\n\n  <ion-row *ngIf="!globals.guess_login">\n\n    <ion-col  class="point_s" (click)="rewards()" *ngIf="this.globals.point_check == \'true\'">\n      <div >\n        <div class="youhave">You Have</div>\n        <div class="points_design" *ngIf="!points">0 <ion-icon class="point-star" name="star"></ion-icon>\n        </div>\n\n        <div class="points_design" *ngIf="points">{{points}} <ion-icon class="point-star" name="star"></ion-icon>\n        </div>\n\n        <div class="pts">Points</div>\n      </div>\n    </ion-col>\n\n\n    <ion-col  text-center (click)="rewards(\'punch\')" *ngIf="this.globals.punch_check == \'true\'">\n      <div >\n        <img src={{ring_image}} class="cup_img">\n        <div class="circle" id="homecircle1"></div>\n\n        <div class="punch_count">{{punch_}}/{{punch_limt_}} Punches</div>\n      </div>\n      <!-- <img class="qrcode1" src="{{barocde_image}}"> -->\n    </ion-col>\n  </ion-row>\n  <!-- <ion-row *ngIf="globals.is_birthday == true || globals.is_anniversary == true">\n    <ion-col col>\n      <div text-center (click)="rewards(\'reward\')" class="sof5">\n        <ion-icon name="md-card"></ion-icon>\n        <div>Birthday gifts</div>\n      </div>\n    </ion-col>\n\n  </ion-row> -->\n  <ion-row>\n    <ion-col col *ngIf="globals.special_offer == \'1\'">\n      <div text-center (click)="offers()" class="sof" [ngStyle]="{\'background-color\': special_offer_color}" >\n        <ion-icon name="heart"></ion-icon>\n        <div>Special Offers</div>\n      </div>\n    </ion-col>\n    <ion-col col *ngIf="globals.business_type == \'ordering\' || globals.business_type == \'retail\'">\n      <div text-center (click)="orderNow()" [ngStyle]="{\'background-color\': order_now_color}"  class="sof1">\n        <ion-icon name="restaurant"></ion-icon>\n        <div>Order Now</div>\n      </div>\n    </ion-col>\n    <ion-col col *ngIf="globals.business_type == \'salon\'">\n      <div text-center (click)="services()" class="sof1" >\n        <ion-icon name="alarm"></ion-icon>\n        <div>Services</div>\n      </div>\n    </ion-col>\n  </ion-row>\n\n  <ion-row>\n    <ion-col col *ngIf="globals.giftcard_enabled == 1">\n      <div text-center (click)="gifts()" [ngStyle]="{\'background-color\': gift_cards_color}" class="sof2">\n        <ion-icon name="medal" [ngStyle]="{\'color\': gift_cards_color}" ></ion-icon>\n        <div>Gift Cards</div>\n      </div>\n    </ion-col>\n    <ion-col col>\n      <div text-center (click)="rewards()" [ngStyle]="{\'background-color\': my_rewards_color}" class="sof3">\n        <ion-icon name="star"></ion-icon>\n        <div>My Rewards</div>\n      </div>\n    </ion-col>\n  </ion-row>\n  <!-- <ion-row>\n    <ion-col col-4>\n\n    </ion-col>\n    <ion-col col-8 class="punch_rating">\n      <ion-row>\n          <ion-col col-3 *ngFor=\'let item of punch\'>\n              <ion-icon name="star" color=\'star\' class="s_icon"></ion-icon>  \n          </ion-col>\n          <ion-col col-3 *ngFor=\'let item of punch_limt;\'>\n              <ion-icon name="ios-star-outline" color=\'star\' class="s_icon"></ion-icon>\n             \n          </ion-col>\n      </ion-row>\n       \n    </ion-col>\n  </ion-row> -->\n  <div>\n    <p text-center class="qr-line">Get this QR scanned at our location and win exciting rewards.</p>\n    <img class="qrcode1" src="{{barocde_image}}">\n    <ion-label style="color:#000;margin-top: 16px;font-size: 16px;font-weight: bold;text-align: center">{{udid}}</ion-label>\n    <!-- <ion-row>\n      <ion-col col-6>\n          <img class="qrcode1" src="{{barocde_image}}">\n          <ion-label class="label4" style="color: #fff;margin-top: 16px;font-size: 14px;font-weight: normal">{{udid}}</ion-label>\n        </ion-col>\n      <ion-col col-6 no-padding>\n             <img src="assets/imgs/icon.png" class="card_icon">\n             <ion-label  style="color: #fff;margin-top: 35px;margin-bottom: 0px">{{name}} {{lastname}}</ion-label>\n             <div  style="color: #fff;font-weight: normal;font-size: 14px;line-height: .9">{{email}}</div>   \n        </ion-col>\n    </ion-row> -->\n    <!-- <ion-label class="label4" style="color: whitesmoke;">Usman Arshad{{name}} {{lastname}}</ion-label>\n    <div class="strip">\n      <div>\n        <ion-label class="label1">2017 hello{{slicedValue}}</ion-label>\n        <ion-label class="label2">Member\n          <br>Since:</ion-label>\n        <ion-label class="label3">44/1994 {{month}}/{{year}}</ion-label>\n\n      </div>\n    </div> -->\n\n    <!-- <div class="content1">\n      <div style=" background: rgba(8, 7, 7, 0.5);    padding-bottom: 0.5px;\n        border-bottom-left-radius: 12px;\n        border-bottom-right-radius: 12px;">\n        <button ion-button small block clear style=" color:whitesmoke;font-weight:bold;width:50%;" (click)="launch(\'http://www.gainmyrewards.com\')">Visit Gain\'s Website</button>\n        <div class="udid">\n          <ion-label style="color: whitesmoke;font-size: 1.4rem;text-align:center;margin:0;">{{udid}}</ion-label>\n        </div>\n      </div>\n    </div> -->\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_5__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainTabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_barcode_scanner__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_audio__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_pin_dialog__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__ = __webpack_require__(65);
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
 * Generated class for the MainTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MainTabsPage = (function () {
    function MainTabsPage(app, server, pinDialog, globals, nativeAudio, barcodeScanner, iab, nativeStorage, loadingCtrl, modalCtrl, _nav, _navParams, alertCtrl) {
        this.app = app;
        this.server = server;
        this.pinDialog = pinDialog;
        this.globals = globals;
        this.nativeAudio = nativeAudio;
        this.barcodeScanner = barcodeScanner;
        this.iab = iab;
        this.nativeStorage = nativeStorage;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this._nav = _nav;
        this._navParams = _navParams;
        this.alertCtrl = alertCtrl;
        // tab1Root: any = 'DealsPage';
        this.tab1Root = 'EventsPage';
        this.tab2Root = 'CategoryPage';
        this.tab3Root = 'MyRewardsPage';
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab5Root = 'ReviewsPage';
        this.data = {};
        this.data.response = '';
    }
    MainTabsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MainTabsPage');
        this.CheckMobileVerfication();
        this.LoadSound();
    };
    MainTabsPage.prototype.ionViewWillEnter = function () {
        if (this._navParams.get('page') == 1) {
            this.tabRef.select(3);
        }
    };
    MainTabsPage.prototype.cartpage = function () {
        if (this.globals.Product.length == 0) {
            var alert_1 = this.alertCtrl.create({
                title: "Oops",
                message: "Your cart is empty.",
                buttons: ["Okay"]
            });
            alert_1.present();
        }
        else {
            this._nav.push('CartPage');
        }
    };
    MainTabsPage.prototype.scanQR = function () {
        var _this = this;
        //For Testing ->   // this.modal("1","success","Nappolinini pizza","http://34.203.122.153/api/adsonscanapp/assets/images/1500954477.jpg","http://vignette1.wikia.nocookie.net/icarly/images/2/26/Purple-Smiley-Icon-keep-smiling-8214370-200-200.jpg/revision/latest?cb=20110707184639","null");
        this.barcodeScanner.scan().then(function (barcodeData) {
            if (barcodeData.format == "QR_CODE") {
                console.log(_this.globals.udid);
                console.log(barcodeData.text);
                var url = "http";
                var string = barcodeData.text.toString();
                var comma = string.indexOf(',');
                console.log(comma);
                if (comma != -1) {
                    var date = string.substring(0, comma);
                    var dateObj = new Date();
                    var month = dateObj.getUTCMonth() + 1; //months from 1-12
                    var day = dateObj.getUTCDate();
                    var year = dateObj.getUTCFullYear();
                    var currentdate = year + "/" + month + "/" + day;
                    console.log(currentdate);
                    var d = new Date(date);
                    var exp_month = d.getUTCMonth() + 1; //months from 1-12
                    var exp_day = d.getDate();
                    var exp_year = d.getUTCFullYear();
                    var expdate = exp_year + "/" + exp_month + "/" + exp_day;
                    if (new Date(expdate) < new Date(currentdate)) {
                        var qr_prompt = _this.alertCtrl.create({
                            title: "Oops",
                            message: "This QR code has expired",
                            buttons: ["Okay"]
                        });
                        qr_prompt.present();
                    }
                    else {
                        var second_half = string.substring(comma + 1);
                        var second_string = second_half.includes(url);
                        var Image_type_png = second_half.includes('png');
                        var Image_type_jpg = second_half.includes('jpg');
                        if (second_string == true && (Image_type_png == true || Image_type_jpg == true)) {
                            var image = second_half;
                            _this.ShowCustomQModel(image, true);
                        }
                        else if (second_string == true && (Image_type_png == false || Image_type_jpg == false)) {
                            var browser_url = second_half;
                            _this.launch(browser_url);
                        }
                        else {
                            var text = second_half;
                            _this.ShowCustomQModel(text, false);
                        }
                        console.log(date, second_half);
                        console.log(second_string);
                        console.log(image, browser_url, text);
                    }
                    console.log(d, expdate, exp_day);
                }
                else {
                    console.log(barcodeData.text, "barcodedata");
                    var response = _this.server.SendQRcodeToServer(barcodeData.text);
                    console.log(_this.globals.udid);
                    console.log(barcodeData.text);
                    var loading_1 = _this.loadingCtrl.create({
                        content: "Setting up...",
                    });
                    loading_1.present();
                    response.subscribe(function (data) {
                        _this.data.response = data;
                        console.log(_this.data.response);
                        console.log(_this.data.response.status);
                        console.log(_this.data.response.reward);
                        loading_1.dismiss();
                        if (_this.data.response.message == "Business not found") {
                            console.log("if");
                            var alert_2 = _this.alertCtrl.create({
                                title: 'Error',
                                subTitle: 'Wrong QR-code',
                                buttons: ['OK']
                            });
                            alert_2.present();
                        }
                        else {
                            if (_this.data.response.status == 'success') {
                                console.log(barcodeData.text, "barcodedata");
                                _this.modal(_this.data.response.reward, _this.data.response.status, _this.data.response.businessname, _this.data.response.business_logo, _this.data.response.lottery_image, _this.data.response.reward_string, _this.data.response.business_username);
                            }
                            else {
                                console.log(barcodeData.text, "barcodedata");
                                _this.modal(_this.data.response.reward, _this.data.response.status, _this.data.response.businessname, _this.data.response.business_logo, "null", _this.data.response.reward_string, _this.data.response.business_username);
                            }
                        }
                    }, function (error) {
                        console.log("Oooops!");
                        loading_1.dismiss();
                        var alert = _this.alertCtrl.create({
                            title: 'Error',
                            subTitle: 'Server times out, please try again',
                            buttons: ['OK']
                        });
                        alert.present();
                    });
                }
                // console.log(barcodeData.text);
            }
            else if (barcodeData.cancelled) {
                console.log("User cancelled the action!");
                return false;
            }
            else {
                var alert_3 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'please scan QR code',
                    buttons: ['OK']
                });
                alert_3.present();
            }
            // Success! Barcode data is here
        }, function (err) {
            // An error occurred
            console.log(err);
        });
    };
    MainTabsPage.prototype.CheckMobileVerfication = function () {
        var _this = this;
        var response = this.server.MobileVericationCheck()
            .subscribe(function (res) {
            var mobileres = res;
            console.log("mobile api ", mobileres);
            _this.SaveMobileNumberFlag(mobileres.phone_verification_amount, mobileres.phone_verified);
        }, function (error) {
            console.log(error);
        });
    };
    MainTabsPage.prototype.SaveMobileNumberFlag = function (amount, flag) {
        console.log(amount, flag);
        this.globals.MobileDiscount = Number(amount);
        console.log("MobileDisocunt", this.globals.MobileDiscount);
        this.nativeStorage.setItem('MobileFlagSave', {
            MobileFlag: flag,
            MobileDiscount: Number(amount)
        }).then(function () {
            console.log('Stored mobileflag');
        }, function (error) { return console.error('Error storing item', error); });
    };
    MainTabsPage.prototype.LoadSound = function () {
        this.nativeAudio.preloadSimple('spinner', 'assets/sounds/Spinner.mp3')
            .then(function (msg) {
            console.log(msg);
        }, function (error) {
            console.log(error);
        });
    };
    MainTabsPage.prototype.ShowCustomQModel = function (data, flag) {
        //  let customerQrmodel = this.modalCtrl.create('CustomQrPage',{data:data,image_flag:flag})
        this._nav.push('CustomQrPage', { data: data, image_flag: flag });
    };
    MainTabsPage.prototype.launch = function (url) {
        console.log("url function");
        console.log(url);
        this.iab.create(url, "_self");
    };
    MainTabsPage.prototype.modal = function (response, response_status, business, logo, image, string, bid) {
        console.log("image", image);
        console.log(bid, 'businesusername');
        var profileModal = this.modalCtrl.create('CongratulationPage', { reward: response, status: response_status, place: business, Logo: logo, lottery_image: image, RewardString: string, id: bid });
        profileModal.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Nav"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Nav"])
    ], MainTabsPage.prototype, "nav", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], MainTabsPage.prototype, "tabRef", void 0);
    MainTabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-main-tabs',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/main-tabs/main-tabs.html"*/'<!--\n  Generated template for the MainTabsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar class="home-nav" color="light" align-title="center">      \n\n        <ion-title style="color: #27ae60 !important" *ngIf="globals.title == \'Dusstuk\'">\n            <img style="width: 100px" src="assets/imgs/logo-green.png" > \n        </ion-title>\n    <ion-title style="color: #27ae60 !important" *ngIf="globals.title != \'Dusstuk\'"  >{{globals.title}}</ion-title>\n    <ion-buttons class="left-btn" start>\n        <button (tap)="OpenSettingPage()" *ngIf="!globals.showbackButton" ion-button style="font-size:3rem"><ion-icon name="contact"></ion-icon></button>\n        <button (tap)="backButton()" *ngIf="globals.showbackButton" ion-button style="font-size:3rem"><ion-icon name="arrow-back"></ion-icon></button>\n    </ion-buttons>\n    <ion-buttons end *ngIf="globals.walletPageFlag">\n         <button ion-button style="color: #27ae60 !important" clear (tap)="AddWallet()"> <ion-icon style="font-weight: bold;font-size:2em" name="add"> </ion-icon> </button>\n    </ion-buttons>\n   \n    <ion-buttons end *ngIf="globals.homePageFlag">\n        <button ion-button  (tap) = "cartpage()" style="font-size:3rem"><ion-icon name="cart" ></ion-icon></button>  \n    </ion-buttons>\n  </ion-navbar>\n     \n</ion-header>   -->\n\n\n<ion-content no-bounce >\n    <ion-tabs color="light" #myTabs>          \n     \n        <ion-tab [root]="tab4Root" tabTitle="Home" tabIcon="home" > </ion-tab>   \n        <!-- <ion-tab (ionSelect)="scanQR()" tabTitle="Order" tabIcon="camera"></ion-tab> -->\n         <!-- <ion-tab [root]="tab1Root" tabTitle="Events" tabIcon="calendar"></ion-tab> -->\n         <!-- <ion-tab [root]="tab3Root" tabTitle="My Rewards" tabIcon="star" [tabBadge] = "globals.TotalbadgeValue > 0 ? globals.TotalbadgeValue : null" tabBadgeStyle="danger" ></ion-tab> -->\n        <ion-tab [root]="tab2Root" tabTitle="Order" tabIcon="restaurant"></ion-tab>\n        <!-- <ion-tab [root]="tab5Root" tabTitle="Reviews" tabIcon="clipboard"></ion-tab> -->\n\n              \n    </ion-tabs> \n\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/main-tabs/main-tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_pin_dialog__["a" /* PinDialog */], __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
    ], MainTabsPage);
    return MainTabsPage;
}());

//# sourceMappingURL=main-tabs.js.map

/***/ }),

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
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


var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-list',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validators_email__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__intro_page3_intro_page3__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_global__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
  Generated class for the IntroPage1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var IntroPage1Page = (function () {
    function IntroPage1Page(globals, modalCtrl, formBilder, navCtrl, navParams) {
        this.globals = globals;
        this.modalCtrl = modalCtrl;
        this.formBilder = formBilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.submitAttempt = false;
        this.loginForm = formBilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__validators_email__["a" /* EmailValidator */].isValid])]
        });
    }
    IntroPage1Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntroPage1Page');
    };
    IntroPage1Page.prototype.next = function (LoginData) {
        if (!this.loginForm.valid) {
            this.submitAttempt = true;
        }
        else {
            console.log(LoginData.email);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__intro_page3_intro_page3__["a" /* IntroPage3Page */], { useremail: LoginData.email });
            this.globals.Email = LoginData.email;
        }
    };
    IntroPage1Page.prototype.back = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    IntroPage1Page.prototype.OpenTermsAndPolicy = function () {
        var termsModal = this.modalCtrl.create('TermsAndPolicyPage');
        termsModal.present();
    };
    IntroPage1Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-intro-page1',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page1/intro-page1.html"*/'<!--\n  Generated template for the IntroPage1 page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color=\'primary\'>\n\n    <ion-title> JJCH</ion-title>\n\n\n    <ion-buttons end>\n      <button ion-button style="color:white; float:right" (click)="next(this.loginForm.value)" clear small>Next</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content style="background: url(\'assets/imgs/Intro1.png\');background-position: center;  background-repeat: no-repeat;background-size: 100% 100%; margin-top:15%">\n\n\n  <div class="email">\n\n    <p class="Open-Sans-regular" style="font-family: Open Sans;" *ngIf="submitAttempt" style="color:white; text-align: center;">Please fill out all details accurately.</p>\n    <form [formGroup]="loginForm" ng-submit="next(this.loginForm.value)" style=" width: 80%;  margin-left: 10%;">\n\n      <ion-list no-lines>\n        <ion-item class="no-padding">\n\n          <ion-input type="submit" class="text-input" formControlName="email" type="email" placeholder="Email"></ion-input>\n        </ion-item>\n        <div class="no-border" *ngIf="!loginForm.controls.email.valid  &&\n        (loginForm.controls.email.dirty || submitAttempt)">\n          <p style="color:white; font-family: Open Sans; text-align: center;">Please enter a valid email.</p>\n        </div>\n        <p (click)="OpenTermsAndPolicy()" style="float:right; padding-right:10px; color:white;">Terms and policy</p>\n      </ion-list>\n\n      <button ion-button type="submit" style="position: absolute;right: 0; top: 10px;" class="button" (click)="next(this.loginForm.value)"\n        clear></button>\n    </form>\n\n  </div>\n\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page1/intro-page1.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], IntroPage1Page);
    return IntroPage1Page;
}());

//# sourceMappingURL=intro-page1.js.map

/***/ }),

/***/ 712:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GetlocationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the GetlocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GetlocationProvider = (function () {
    function GetlocationProvider(http) {
        this.http = http;
        console.log('Hello GetlocationProvider Provider');
    }
    GetlocationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], GetlocationProvider);
    return GetlocationProvider;
}());

//# sourceMappingURL=getlocation.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage3Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mobile_verification_prompt_mobile_verification_prompt__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__validators_email__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_storage__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var IntroPage3Page = (function () {
    function IntroPage3Page(loadingCtrl, nativeStorage, globals, modalCtrl, alertCtrl, server, formBuilder, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.nativeStorage = nativeStorage;
        this.globals = globals;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.server = server;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // email: any;
        this.submitAttempt = false;
        this.data = {};
        this.phone = this.navParams.get('phone');
        this.profile_complete = this.navParams.get('profile_complete');
        this.data.response = '';
        if (!this.profile_complete) {
            this.signupForm = formBuilder.group({
                firstName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
                lastName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
                email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_6__validators_email__["a" /* EmailValidator */].isValid])],
                phone: [this.phone, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
                // nextdigits: ['', Validators.compose([Validators.maxLength(4), Validators.required])],
                password: [''],
                phonecode: ['1', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
            });
        }
        else {
            this.signupForm = formBuilder.group({
                firstName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
                lastName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
                email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_6__validators_email__["a" /* EmailValidator */].isValid])],
                phone: [this.phone, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
                // nextdigits: ['', Validators.compose([Validators.maxLength(4), Validators.required])],
                password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
                phonecode: ['1', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
            });
        }
    }
    // moveFocus(nextElement) {
    //     nextElement.setFocus();
    //   }
    IntroPage3Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntroPage3Page');
    };
    IntroPage3Page.prototype.back = function () {
        this.navCtrl.pop();
    };
    IntroPage3Page.prototype.next = function (signupData) {
        if (!this.signupForm.valid) {
            console.log(' Some values were not given or were incorrect, please fill them');
            this.submitAttempt = true;
        }
        else {
            localStorage.setItem("firstname", signupData.firstName);
            localStorage.setItem("lastname", signupData.lastName);
            localStorage.setItem("password", signupData.password);
            this.globals.PhoneNo = '+' + signupData.phonecode + signupData.phone;
            this.globals.Email = signupData.email;
            console.log("register_data", signupData);
            this.register(signupData);
        }
    };
    IntroPage3Page.prototype.MobileVerificationPrompt = function () {
        var model = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__mobile_verification_prompt_mobile_verification_prompt__["a" /* MobileVerificationPromptPage */]);
        model.present();
    };
    IntroPage3Page.prototype.register = function (signupData) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true,
        });
        loading.present();
        var response = this.server.SignupData(signupData.firstName, signupData.lastName, signupData.email, signupData.password, this.globals.PhoneNo, signupData.birthday, signupData.aniversary, this.profile_complete);
        response.subscribe(function (data) {
            console.log(data);
            _this.data.response = data;
            if (_this.data.response.status != "error") {
                // this.navCtrl.setRoot('AcceptTermsPage', { imageData: this.data.response.url, discountText: this.data.response.discount_text, Flag: true, discount: this.data.response.discount_value });
                _this.globals.firstName = signupData.firstName;
                _this.globals.lastName = signupData.lastName;
                _this.globals.udid = _this.data.response.udid;
                loading.dismiss();
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
                    // console.log("b discount value", this.data.response.discount_value);
                    _this.globals.udid = _this.data.response.udid;
                    //  this.server.initializePushToken();
                    _this.navCtrl.setRoot('AcceptTermsPage', { imageData: _this.data.response.url, discountText: _this.data.response.discount_text, Flag: true, discount: _this.data.response.discount_value });
                })
                    .catch(function (err) { console.log(err); });
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: _this.data.response.description,
                    buttons: ['Retry']
                });
                loading.dismiss();
                alert_1.present();
                _this.navCtrl.setRoot('LoginPage');
            }
        }, function (error) {
            _this.globals.presentToast("Server times out, please try again");
        });
    };
    IntroPage3Page.prototype.DoMobileVerification = function (signupData) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true,
        });
        loading.present();
        var response = this.server.MobileVerification();
        response.subscribe(function (data) {
            console.log(data);
            var verficationResponse = data;
            console.log(verficationResponse);
            loading.dismiss();
            if (verficationResponse.status == true) {
                _this.globals.signupData = signupData;
                _this.navCtrl.push('MobileEmailVarificationPage');
            }
            else {
                // this.register(signupData);
                var alert_2 = _this.alertCtrl.create({
                    title: "Error",
                    message: verficationResponse.message,
                    buttons: ["OK"]
                });
                alert_2.present();
            }
        }, function (error) { console.log(error); });
    };
    IntroPage3Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-intro-page3',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page3/intro-page3.html"*/'\n<ion-content scroll="true" overflow-scroll="true" padding>\n\n  <ion-icon name="arrow-round-back" class="back_icon_" (click)="back()"></ion-icon>\n  <h3 text-center class="p_text pp">SIGN UP</h3>\n  <p text-center class="p_text hh">\n    Skip the line and Order-Online.\n  </p>\n\n\n\n  <div class="signUpBox">\n    <form [formGroup]="signupForm" ng-submit="next(this.signupForm.value)">\n      <ion-list >\n        <ion-item>\n\n          <ion-input type="submit" class="text-input" placeholder="First Name" formControlName="firstName" type="text">\n          </ion-input>\n        </ion-item>\n        <div class="no-border" *ngIf="!signupForm.controls.firstName.valid  && (signupForm.controls.firstName.dirty || submitAttempt)">\n          <p style="text-align: center; ">Please enter a valid name.</p>\n        </div>\n\n        <ion-item>\n\n          <ion-input type="submit" class="text-input" formControlName="lastName" placeholder="Last Name" type="text"></ion-input>\n        </ion-item>\n        <div class="no-border" *ngIf="!signupForm.controls.lastName.valid  && (signupForm.controls.lastName.dirty || submitAttempt)">\n          <p style="text-align: center;">Please enter a valid name.</p>\n        </div>\n        <ion-item class="no-padding">\n\n            <ion-input type="submit" class="text-input" formControlName="email" type="email" placeholder="Email"></ion-input>\n        </ion-item>\n          <div class="no-border" *ngIf="!signupForm.controls.email.valid  &&\n          (signupForm.controls.email.dirty || submitAttempt)">\n            <p style=" text-align: center;">Please enter a valid email.</p>\n          </div>\n\n        <ion-row>\n          <ion-col col-4>\n            <ion-item>\n            <ion-select formControlName="phonecode" class="phonecode">\n              <ion-option data-countryCode="GB" value="44">(+44)</ion-option>\n              <ion-option data-countryCode="US" value="1">(+1)</ion-option>\n            \n                <ion-option data-countryCode="DZ" value="213">(+213)</ion-option>\n                <ion-option data-countryCode="AD" value="376">(+376)</ion-option>\n                <ion-option data-countryCode="AO" value="244">(+244)</ion-option>\n                <ion-option data-countryCode="AI" value="1264">(+1264)</ion-option>\n                <ion-option data-countryCode="AG" value="1268">(+1268)</ion-option>\n                <ion-option data-countryCode="AR" value="54">(+54)</ion-option>\n                <ion-option data-countryCode="AM" value="374">(+374)</ion-option>\n                <ion-option data-countryCode="AW" value="297">(+297)</ion-option>\n                <ion-option data-countryCode="AU" value="61">(+61)</ion-option>\n                <ion-option data-countryCode="AT" value="43">(+43)</ion-option>\n                <ion-option data-countryCode="AZ" value="994">(+994)</ion-option>\n                <ion-option data-countryCode="BS" value="1242"> (+1242)</ion-option>\n                <ion-option data-countryCode="BH" value="973">(+973)</ion-option>\n                <ion-option data-countryCode="BD" value="880">(+880)</ion-option>\n                <ion-option data-countryCode="BB" value="1246">(+1246)</ion-option>\n                <ion-option data-countryCode="BY" value="375">(+375)</ion-option>\n                <ion-option data-countryCode="BE" value="32">(+32)</ion-option>\n                <ion-option data-countryCode="BZ" value="501">(+501)</ion-option>\n                <ion-option data-countryCode="BJ" value="229">(+229)</ion-option>\n                <ion-option data-countryCode="BM" value="1441">(+1441)</ion-option>\n                <ion-option data-countryCode="BT" value="975">(+975)</ion-option>\n                <ion-option data-countryCode="BO" value="591"> (+591)</ion-option>\n                <ion-option data-countryCode="BA" value="387">(+387)</ion-option>\n                <ion-option data-countryCode="BW" value="267"> (+267)</ion-option>\n                <ion-option data-countryCode="BR" value="55">(+55)</ion-option>\n                <ion-option data-countryCode="BN" value="673">(+673)</ion-option>\n                <ion-option data-countryCode="BG" value="359">(+359)</ion-option>\n                <ion-option data-countryCode="BF" value="226"> (+226)</ion-option>\n                <ion-option data-countryCode="BI" value="257">(+257)</ion-option>\n                <ion-option data-countryCode="KH" value="855">(+855)</ion-option>\n                <ion-option data-countryCode="CM" value="237">(+237)</ion-option>\n                <!-- <ion-option data-countryCode="CA" value="1">Canada (+1)</ion-option> -->\n                <ion-option data-countryCode="CV" value="238"> (+238)</ion-option>\n                <ion-option data-countryCode="KY" value="1345"> (+1345)</ion-option>\n                <ion-option data-countryCode="CF" value="236"> (+236)</ion-option>\n                <ion-option data-countryCode="CL" value="56">(+56)</ion-option>\n                <ion-option data-countryCode="CN" value="86"> (+86)</ion-option>\n                <ion-option data-countryCode="CO" value="57"> (+57)</ion-option>\n                <ion-option data-countryCode="KM" value="269">(+269)</ion-option>\n                <ion-option data-countryCode="CG" value="242"> (+242)</ion-option>\n                <ion-option data-countryCode="CK" value="682"> (+682)</ion-option>\n                <ion-option data-countryCode="CR" value="506">(+506)</ion-option>\n                <ion-option data-countryCode="HR" value="385">(+385)</ion-option>\n                <ion-option data-countryCode="CU" value="53">(+53)</ion-option>\n                <ion-option data-countryCode="CY" value="90392"> (+90392)</ion-option>\n                <ion-option data-countryCode="CY" value="357"> (+357)</ion-option>\n                <ion-option data-countryCode="CZ" value="42"> (+42)</ion-option>\n                <ion-option data-countryCode="DK" value="45">(+45)</ion-option>\n                <ion-option data-countryCode="DJ" value="253"> (+253)</ion-option>\n                <ion-option data-countryCode="DM" value="1809"> (+1809)</ion-option>\n                <ion-option data-countryCode="DO" value="1809"> (+1809)</ion-option>\n                <ion-option data-countryCode="EC" value="593"> (+593)</ion-option>\n                <ion-option data-countryCode="EG" value="20"> (+20)</ion-option>\n                <ion-option data-countryCode="SV" value="503">(+503)</ion-option>\n                <ion-option data-countryCode="GQ" value="240"> (+240)</ion-option>\n                <ion-option data-countryCode="ER" value="291">(+291)</ion-option>\n                <ion-option data-countryCode="EE" value="372">(+372)</ion-option>\n                <ion-option data-countryCode="ET" value="251"> (+251)</ion-option>\n                <ion-option data-countryCode="FK" value="500">(+500)</ion-option>\n                <ion-option data-countryCode="FO" value="298"> (+298)</ion-option>\n                <ion-option data-countryCode="FJ" value="679">(+679)</ion-option>\n                <ion-option data-countryCode="FI" value="358"> (+358)</ion-option>\n                <ion-option data-countryCode="FR" value="33">(+33)</ion-option>\n                <ion-option data-countryCode="GF" value="594"> (+594)</ion-option>\n                <ion-option data-countryCode="PF" value="689"> (+689)</ion-option>\n                <ion-option data-countryCode="GA" value="241">(+241)</ion-option>\n                <ion-option data-countryCode="GM" value="220">(+220)</ion-option>\n                <ion-option data-countryCode="GE" value="7880"> (+7880)</ion-option>\n                <ion-option data-countryCode="DE" value="49">(+49)</ion-option>\n                <ion-option data-countryCode="GH" value="233">(+233)</ion-option>\n                <ion-option data-countryCode="GI" value="350">(+350)</ion-option>\n                <ion-option data-countryCode="GR" value="30">(+30)</ion-option>\n                <ion-option data-countryCode="GL" value="299">(+299)</ion-option>\n                <ion-option data-countryCode="GD" value="1473">(+1473)</ion-option>\n                <ion-option data-countryCode="GP" value="590"> (+590)</ion-option>\n                <ion-option data-countryCode="GU" value="671">(+671)</ion-option>\n                <ion-option data-countryCode="GT" value="502">(+502)</ion-option>\n                <ion-option data-countryCode="GN" value="224">(+224)</ion-option>\n                <ion-option data-countryCode="GW" value="245"> (+245)</ion-option>\n                <ion-option data-countryCode="GY" value="592"> (+592)</ion-option>\n                <ion-option data-countryCode="HT" value="509">(+509)</ion-option>\n                <ion-option data-countryCode="HN" value="504">(+504)</ion-option>\n                <ion-option data-countryCode="HK" value="852"> (+852)</ion-option>\n                <ion-option data-countryCode="HU" value="36"> (+36)</ion-option>\n                <ion-option data-countryCode="IS" value="354">(+354)</ion-option>\n                <ion-option data-countryCode="IN" value="91">(+91)</ion-option>\n                <ion-option data-countryCode="ID" value="62">(+62)</ion-option>\n                <ion-option data-countryCode="IR" value="98">(+98)</ion-option>\n                <ion-option data-countryCode="IQ" value="964">(+964)</ion-option>\n                <ion-option data-countryCode="IE" value="353">(+353)</ion-option>\n                <ion-option data-countryCode="IL" value="972">(+972)</ion-option>\n                <ion-option data-countryCode="IT" value="39"> (+39)</ion-option>\n                <ion-option data-countryCode="JM" value="1876"> (+1876)</ion-option>\n                <ion-option data-countryCode="JP" value="81">(+81)</ion-option>\n                <ion-option data-countryCode="JO" value="962">(+962)</ion-option>\n                <ion-option data-countryCode="KZ" value="7">(+7)</ion-option>\n                <ion-option data-countryCode="KE" value="254">(+254)</ion-option>\n                <ion-option data-countryCode="KI" value="686">(+686)</ion-option>\n                <ion-option data-countryCode="KP" value="850"> (+850)</ion-option>\n                <ion-option data-countryCode="KR" value="82">(+82)</ion-option>\n                <ion-option data-countryCode="KW" value="965">(+965)</ion-option>\n                <ion-option data-countryCode="KG" value="996"> (+996)</ion-option>\n                <ion-option data-countryCode="LA" value="856">(+856)</ion-option>\n                <ion-option data-countryCode="LV" value="371">(+371)</ion-option>\n                <ion-option data-countryCode="LB" value="961">(+961)</ion-option>\n                <ion-option data-countryCode="LS" value="266">(+266)</ion-option>\n                <ion-option data-countryCode="LR" value="231">(+231)</ion-option>\n                <ion-option data-countryCode="LY" value="218">(+218)</ion-option>\n                <ion-option data-countryCode="LI" value="417">(+417)</ion-option>\n                <ion-option data-countryCode="LT" value="370">(+370)</ion-option>\n                <ion-option data-countryCode="LU" value="352"> (+352)</ion-option>\n                <ion-option data-countryCode="MO" value="853">(+853)</ion-option>\n                <ion-option data-countryCode="MK" value="389"> (+389)</ion-option>\n                <ion-option data-countryCode="MG" value="261">(+261)</ion-option>\n                <ion-option data-countryCode="MW" value="265">(+265)</ion-option>\n                <ion-option data-countryCode="MY" value="60">(+60)</ion-option>\n                <ion-option data-countryCode="MV" value="960">(+960)</ion-option>\n                <ion-option data-countryCode="ML" value="223">(+223)</ion-option>\n                <ion-option data-countryCode="MT" value="356">(+356)</ion-option>\n                <ion-option data-countryCode="MH" value="692">(+692)</ion-option>\n                <ion-option data-countryCode="MQ" value="596">(+596)</ion-option>\n                <ion-option data-countryCode="MR" value="222">(+222)</ion-option>\n                <ion-option data-countryCode="YT" value="269">(+269)</ion-option>\n                <ion-option data-countryCode="MX" value="52">(+52)</ion-option>\n                <ion-option data-countryCode="FM" value="691">(+691)</ion-option>\n                <ion-option data-countryCode="MD" value="373">(+373)</ion-option>\n                <ion-option data-countryCode="MC" value="377">(+377)</ion-option>\n                <ion-option data-countryCode="MN" value="976"> (+976)</ion-option>\n                <ion-option data-countryCode="MS" value="1664"> (+1664)</ion-option>\n                <ion-option data-countryCode="MA" value="212">(+212)</ion-option>\n                <ion-option data-countryCode="MZ" value="258">(+258)</ion-option>\n                <ion-option data-countryCode="MN" value="95">(+95)</ion-option>\n                <ion-option data-countryCode="NA" value="264">(+264)</ion-option>\n                <ion-option data-countryCode="NR" value="674">(+674)</ion-option>\n                <ion-option data-countryCode="NP" value="977">(+977)</ion-option>\n                <ion-option data-countryCode="NL" value="31"> (+31)</ion-option>\n                <ion-option data-countryCode="NC" value="687"> (+687)</ion-option>\n                <ion-option data-countryCode="NZ" value="64">(+64)</ion-option>\n                <ion-option data-countryCode="NI" value="505">(+505)</ion-option>\n                <ion-option data-countryCode="NE" value="227">(+227)</ion-option>\n                <ion-option data-countryCode="NG" value="234">(+234)</ion-option>\n                <ion-option data-countryCode="NU" value="683">(+683)</ion-option>\n                <ion-option data-countryCode="NF" value="672"> (+672)</ion-option>\n                <ion-option data-countryCode="NP" value="670"> (+670)</ion-option>\n                <ion-option data-countryCode="NO" value="47">(+47)</ion-option>\n                <ion-option data-countryCode="OM" value="968">(+968)</ion-option>\n                <ion-option data-countryCode="PW" value="680">(+680)</ion-option>\n                <ion-option data-countryCode="PA" value="507">(+507)</ion-option>\n                <ion-option data-countryCode="PG" value="675">(+675)</ion-option>\n                <ion-option data-countryCode="PG" value="92">(+92)</ion-option>\n                \n                <ion-option data-countryCode="PY" value="595">(+595)</ion-option>\n                <ion-option data-countryCode="PE" value="51">(+51)</ion-option>\n                <ion-option data-countryCode="PH" value="63">(+63)</ion-option>\n                <ion-option data-countryCode="PL" value="48">(+48)</ion-option>\n                <ion-option data-countryCode="PT" value="351"> (+351)</ion-option>\n                <ion-option data-countryCode="PR" value="1787">(+1787)</ion-option>\n                <ion-option data-countryCode="QA" value="974"> (+974)</ion-option>\n                <ion-option data-countryCode="RE" value="262"> (+262)</ion-option>\n                <ion-option data-countryCode="RO" value="40">(+40)</ion-option>\n                <ion-option data-countryCode="RU" value="7">(+7)</ion-option>\n                <ion-option data-countryCode="RW" value="250">(+250)</ion-option>\n                <ion-option data-countryCode="SM" value="378">(+378)</ion-option>\n                <ion-option data-countryCode="ST" value="239">(+239)</ion-option>\n                <ion-option data-countryCode="SA" value="966">(+966)</ion-option>\n                <ion-option data-countryCode="SN" value="221">(+221)</ion-option>\n                <ion-option data-countryCode="CS" value="381">(+381)</ion-option>\n                <ion-option data-countryCode="SC" value="248">(+248)</ion-option>\n                <ion-option data-countryCode="SL" value="232">(+232)</ion-option>\n                <ion-option data-countryCode="SG" value="65">(+65)</ion-option>\n                <ion-option data-countryCode="SK" value="421">(+421)</ion-option>\n                <ion-option data-countryCode="SI" value="386">(+386)</ion-option>\n                <ion-option data-countryCode="SB" value="677"> (+677)</ion-option>\n                <ion-option data-countryCode="SO" value="252">(+252)</ion-option>\n                <ion-option data-countryCode="ZA" value="27"> (+27)</ion-option>\n                <ion-option data-countryCode="ES" value="34"> (+34)</ion-option>\n                <ion-option data-countryCode="LK" value="94">(+94)</ion-option>\n                <ion-option data-countryCode="SH" value="290">(+290)</ion-option>\n                <ion-option data-countryCode="KN" value="1869">(+1869)</ion-option>\n                <ion-option data-countryCode="SC" value="1758">(+1758)</ion-option>\n                <ion-option data-countryCode="SD" value="249">(+249)</ion-option>\n                <ion-option data-countryCode="SR" value="597"> (+597)</ion-option>\n                <ion-option data-countryCode="SZ" value="268">(+268)</ion-option>\n                <ion-option data-countryCode="SE" value="46">(+46)</ion-option>\n                <ion-option data-countryCode="CH" value="41">(+41)</ion-option>\n                <ion-option data-countryCode="SI" value="963">(+963)</ion-option>\n                <ion-option data-countryCode="TW" value="886">(+886)</ion-option>\n                <ion-option data-countryCode="TJ" value="7">(+7)</ion-option>\n                <ion-option data-countryCode="TH" value="66">(+66)</ion-option>\n                <ion-option data-countryCode="TG" value="228">(+228)</ion-option>\n                <ion-option data-countryCode="TO" value="676">(+676)</ion-option>\n                <ion-option data-countryCode="TT" value="1868">(+1868)</ion-option>\n                <ion-option data-countryCode="TN" value="216">(+216)</ion-option>\n                <ion-option data-countryCode="TR" value="90">(+90)</ion-option>\n                <ion-option data-countryCode="TM" value="7">(+7)</ion-option>\n                <ion-option data-countryCode="TM" value="993"> (+993)</ion-option>\n                <ion-option data-countryCode="TC" value="1649">(+1649)</ion-option>\n                <!-- <ion-option data-countryCode="TV" value="688">Tuvalu (+688)</ion-option>\n                <ion-option data-countryCode="UG" value="256">Uganda (+256)</ion-option>\n                <ion-option data-countryCode="GB" value="44">UK (+44)</ion-option> \n                <ion-option data-countryCode="UA" value="380">Ukraine (+380)</ion-option>\n                <ion-option data-countryCode="AE" value="971">United Arab Emirates (+971)</ion-option>\n                <ion-option data-countryCode="UY" value="598">Uruguay (+598)</ion-option>\n               <ion-option data-countryCode="US" value="1">USA (+1)</ion-option>\n                <ion-option data-countryCode="UZ" value="7">Uzbekistan (+7)</ion-option>\n                <ion-option data-countryCode="VU" value="678">Vanuatu (+678)</ion-option>\n                <ion-option data-countryCode="VA" value="379">Vatican City (+379)</ion-option>\n                <ion-option data-countryCode="VE" value="58">Venezuela (+58)</ion-option>\n                <ion-option data-countryCode="VN" value="84">Vietnam (+84)</ion-option>\n                <ion-option data-countryCode="VG" value="84">Virgin Islands - British (+1284)</ion-option>\n                <ion-option data-countryCode="VI" value="84">Virgin Islands - US (+1340)</ion-option>\n                <ion-option data-countryCode="WF" value="681">Wallis &amp; Futuna (+681)</ion-option>\n                <ion-option data-countryCode="YE" value="969">Yemen (North)(+969)</ion-option>\n                <ion-option data-countryCode="YE" value="967">Yemen (South)(+967)</ion-option>\n                <ion-option data-countryCode="ZM" value="260">Zambia (+260)</ion-option>\n                <ion-option data-countryCode="ZW" value="263">Zimbabwe (+263)</ion-option> -->\n            \n            </ion-select>\n          </ion-item>\n        \n          </ion-col>\n          <ion-col>\n            <ion-item style="padding-left: 23px;">\n\n              <!-- <ion-label style="margin-right:0;"> ({{signupForm.value.phonecode}}) </ion-label> -->\n              <ion-input  class="phone-input" style="display:inline"  maxlength= "10"  type="submit"  formControlName="phone"  placeholder="Phone" type="tel"></ion-input>\n          \n            </ion-item>\n          </ion-col>\n        </ion-row>\n       \n\n        <div class="no-border" *ngIf="!signupForm.controls.phone.valid  && (signupForm.controls.phone.dirty || submitAttempt)">\n          <p style=" text-align: center;">Please enter a valid phone number.</p>\n        </div>\n\n        <ion-item *ngIf="profile_complete">\n\n          <ion-input type="submit" class="text-input" formControlName="password" placeholder="Password" type="password"></ion-input>\n        </ion-item>\n        <ion-item *ngIf="!profile_complete">\n            <ion-input type="submit" class="text-input" formControlName="password" placeholder="Password (Optional)" type="password"></ion-input>\n          </ion-item>\n        <div class="no-border" *ngIf="!signupForm.controls.password.valid  && (signupForm.controls.password.dirty || submitAttempt)">\n          <p style=" text-align: center;">Please enter a valid password.</p>\n        </div>\n\n        <!-- <ion-item>\n            <ion-datetime class="date_" placeholder="Birthday (Optional)" displayFormat="MMM/DD/YYYY" formControlName="birthday" ></ion-datetime>\n          </ion-item>\n      \n      \n          <ion-item>\n            <ion-datetime class="date_" placeholder="Anniversary (Optional)" displayFormat="MMM/DD/YYYY" formControlName="anniversary" ></ion-datetime>\n          </ion-item> -->\n\n      </ion-list>\n      <p text-center class="p_text gg" padding>\n        Earn points for every purchase\n        and get rewarded.\n        </p>\n\n      <button *ngIf="profile_complete" ion-button block  (click)="next(this.signupForm.value)">Register</button>\n      <button *ngIf="!profile_complete" ion-button block  (click)="next(this.signupForm.value)">Update Profile</button>\n\n    </form>\n\n\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/intro-page3/intro-page3.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], IntroPage3Page);
    return IntroPage3Page;
}());

//# sourceMappingURL=intro-page3.js.map

/***/ })

},[384]);
//# sourceMappingURL=main.js.map
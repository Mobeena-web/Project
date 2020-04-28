webpackJsonp([35],{

/***/ 733:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GiftcardBannerPageModule", function() { return GiftcardBannerPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__giftcard_banner__ = __webpack_require__(931);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GiftcardBannerPageModule = (function () {
    function GiftcardBannerPageModule() {
    }
    GiftcardBannerPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__giftcard_banner__["a" /* GiftcardBannerPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__giftcard_banner__["a" /* GiftcardBannerPage */]),
            ],
        })
    ], GiftcardBannerPageModule);
    return GiftcardBannerPageModule;
}());

//# sourceMappingURL=giftcard-banner.module.js.map

/***/ }),

/***/ 931:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GiftcardBannerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_server_server__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GiftcardBannerPage = (function () {
    function GiftcardBannerPage(modalCtrl, alertCtrl, loadingCtrl, server, global, navCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.server = server;
        this.global = global;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.otherselected = false;
        this.card_banner = this.navParams.get('banner');
        this.get_gift_cards();
        this.design_id = this.card_banner.design_id;
    }
    GiftcardBannerPage.prototype.buy = function (id) {
        this.otherselected = false;
        this.card_id = id;
    };
    GiftcardBannerPage.prototype.otherselect = function () {
        this.otherselected = true;
    };
    GiftcardBannerPage.prototype.get_gift_cards = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.gift_cards();
        response.subscribe(function (data) {
            _this.gifts = data.giftcards;
            _this.policy = data.policy;
            loading.dismiss();
        }, function (error) {
            loading.dismiss();
            _this.global.alertMessage("Failure", "Something went wrong check your internet connection.");
        });
    };
    GiftcardBannerPage.prototype.showConfirm = function (id) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Gift Card',
            message: 'Do you want to buy it for yourself or want to share?',
            buttons: [
                {
                    text: 'Buy',
                    handler: function () {
                        _this.navCtrl.push('BuygiftcardsPage', { gift_id: id, udid_r: _this.global.udid, design_id: _this.design_id, amount: _this.amount, message: _this.message });
                    }
                },
                {
                    text: 'Share',
                    handler: function () {
                        _this.share_(id);
                    }
                }
            ]
        });
        confirm.present();
    };
    GiftcardBannerPage.prototype.share_ = function (id) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Share',
            message: "Enter email of you friend",
            inputs: [
                {
                    name: 'email',
                    type: 'text',
                    placeholder: 'Email'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Send',
                    handler: function (data) {
                        _this.search_user(data.email, id);
                    }
                }
            ]
        });
        prompt.present();
    };
    GiftcardBannerPage.prototype.showConfirm_new_user = function (email, id) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'OOPS!',
            message: 'Your friend is not registered member at our place.Please set up your friends profile.',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Continue',
                    handler: function () {
                        _this.showPrompt_craete_user(email, id);
                    }
                }
            ]
        });
        confirm.present();
    };
    GiftcardBannerPage.prototype.search_user = function (email, id) {
        var _this = this;
        if (!this.validateEmail(email)) {
            this.global.presentToast("Invalid Email Format.");
        }
        else {
            var loading_1 = this.loadingCtrl.create({
                content: "Loading...",
            });
            loading_1.present();
            var response = this.server.search_user(email);
            response.subscribe(function (data) {
                if (data.length == 0) {
                    _this.showConfirm_new_user(email, id);
                }
                else {
                    _this.navCtrl.push('BuygiftcardsPage', { gift_id: id, udid_r: data[0].udid, design_id: _this.design_id, amount: _this.amount, message: _this.message });
                }
                loading_1.dismiss();
            }, function (error) {
                loading_1.dismiss();
                _this.global.alertMessage("Failure", "Something went wrong check your internet connection.");
            });
        }
    };
    GiftcardBannerPage.prototype.create_new = function (email, fname, lname, id) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.craete_user(email, fname, lname);
        response.subscribe(function (data) {
            if (data.status == true) {
                _this.navCtrl.push('BuygiftcardsPage', { gift_id: id, udid_r: data.udid, design_id: _this.design_id, amount: _this.amount, message: _this.message });
            }
            else {
                _this.global.alertMessage("Failure", "Error in creating new user.");
            }
            loading.dismiss();
        }, function (error) {
            loading.dismiss();
            _this.global.alertMessage("Failure", "Something went wrong check your internet connection.");
        });
    };
    GiftcardBannerPage.prototype.showPrompt_craete_user = function (email, id) {
        var _this = this;
        var bool = true;
        var prompt = this.alertCtrl.create({
            title: 'Create Account',
            message: "Enter your friend details of email " + email,
            inputs: [
                {
                    name: 'fname',
                    placeholder: 'First Name'
                },
                {
                    name: 'lname',
                    placeholder: 'Last Name'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Create',
                    handler: function (data) {
                        _this.create_new(email, data.fname, data.lname, id);
                    }
                }
            ]
        });
        prompt.present();
    };
    GiftcardBannerPage.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    GiftcardBannerPage.prototype.proceed = function () {
        if (Number(this.amount) > 0 && Number(this.amount) <= this.global.giftcard_amount_limit) {
            if (this.otherselected) {
                this.showConfirm('');
            }
            else {
                this.showConfirm(this.card_id);
            }
        }
        else {
            this.global.presentToast("Enter Amount in Range 1-" + this.global.giftcard_amount_limit);
        }
    };
    GiftcardBannerPage.prototype.termsandconditions = function () {
        var modal = this.modalCtrl.create('GiftcardTermsandconditionsPage', { policy: this.policy });
        modal.present();
    };
    GiftcardBannerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-giftcard-banner',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/giftcard-banner/giftcard-banner.html"*/'\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>Gift Card Designs</ion-title>\n    <ion-buttons end>\n        <button ion-button icon-only color="royal" (click)="proceed()">\n          Proceed\n        </button>\n      </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<img src={{card_banner.image}}>\n\n<ion-item class="margin-top">\n  <ion-label>Amount</ion-label>\n  <ion-select [(ngModel)]="amount">\n     <ion-option value="5">$5</ion-option>\n     <ion-option value="10">$10</ion-option>\n     <ion-option value="15">$15</ion-option>\n     <ion-option value="20">$20</ion-option>\n     <ion-option value="25">$25</ion-option>\n     <ion-option value="30">$30</ion-option>\n     <ion-option value="35">$35</ion-option>\n     <ion-option value="40">$40</ion-option>\n     <ion-option value="45">$45</ion-option>\n     <ion-option value="50">$50</ion-option>\n\n   \n    <ion-option (ionSelect)="otherselect()" >Other</ion-option>\n\n  </ion-select>\n</ion-item>\n\n<ion-item *ngIf="otherselected" margin-top>\n  <ion-label color="primary" floating>Enter Amount</ion-label>\n  <ion-input type="number" [(ngModel)]="amount"></ion-input>\n</ion-item>\n\n<ion-item>\n    <ion-label color="primary" floating>Message</ion-label>\n    <ion-input type="text"  [(ngModel)]="message"></ion-input>\n  </ion-item>\n\n  <p (click)="termsandconditions()" text-center>Terms & Conditions</p>\n\n\n     <button ion-button block class="p_btn" (click)="proceed()">Proceed to Checkout</button>\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/giftcard-banner/giftcard-banner.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], GiftcardBannerPage);
    return GiftcardBannerPage;
}());

//# sourceMappingURL=giftcard-banner.js.map

/***/ })

});
//# sourceMappingURL=35.js.map
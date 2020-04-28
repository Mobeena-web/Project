webpackJsonp([4],{

/***/ 756:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletListPageModule", function() { return WalletListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wallet_list__ = __webpack_require__(954);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WalletListPageModule = (function () {
    function WalletListPageModule() {
    }
    WalletListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__wallet_list__["a" /* WalletListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__wallet_list__["a" /* WalletListPage */]),
            ],
        })
    ], WalletListPageModule);
    return WalletListPageModule;
}());

//# sourceMappingURL=wallet-list.module.js.map

/***/ }),

/***/ 954:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalletListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_pin_dialog__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(49);
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
 * Generated class for the WalletListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WalletListPage = (function () {
    function WalletListPage(pinDialog, app, server, nativeStorage, loadingctrl, modal, alert, global, navCtrl, navParams) {
        this.pinDialog = pinDialog;
        this.app = app;
        this.server = server;
        this.nativeStorage = nativeStorage;
        this.loadingctrl = loadingctrl;
        this.modal = modal;
        this.alert = alert;
        this.global = global;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cancelFlag = false;
        this.getWalletList();
    }
    WalletListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WalletListPage');
    };
    WalletListPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.global.homePageFlag = false;
        // let nav = this.app.getRootNav(); 
        //   nav.setRoot(MainTabsPage, {tabIndex: 0});
        this.cancelFlag = false;
        this.nativeStorage.getItem('walletlock').then(function (data) {
            console.log("walletlock", data);
            _this.global.WallletLock = data.walletCheck;
            console.log("nativewalletlock", data.walletCheck);
            console.log("walletlock", _this.global.WallletLock);
            if (_this.global.WallletLock == true) {
                _this.nativeStorage.getItem('lock').then(function (data) {
                    _this.global.code = atob(data.walletCode);
                    _this.pinDialog.prompt('Enter your PIN', 'Verify PIN', ['Cancel', 'Okay'])
                        .then(function (result) {
                        if (result.buttonIndex == 2) {
                            console.log('User clicked OK, value is: ', result.input1);
                            if (_this.global.code == result.input1) {
                                //this.navCtrl.push('WalletListPage');
                                _this.cancelFlag = false;
                            }
                            else {
                                var alert1 = _this.alert.create({
                                    title: "Oops",
                                    subTitle: "Invalid PIN",
                                    buttons: [
                                        {
                                            text: 'Okay',
                                            role: 'Okay',
                                            handler: function () {
                                                var nav = _this.app.getRootNav();
                                                // nav.setRoot(MainTabsPage, { tabIndex: 0 });
                                                nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
                                            }
                                        },
                                    ],
                                });
                                alert1.present();
                            }
                        }
                        else if (result.buttonIndex == 1) {
                            console.log('User cancelled');
                            // let nav = this.app.getRootNav(); 
                            // nav.setRoot(MainTabsPage, {tabIndex: 0});
                            _this.cancelFlag = true;
                        }
                    });
                }).catch(function (err) { return console.log; });
            }
            else {
            }
        }, function (error) {
            _this.ShowWalletAlert();
        }).catch(function (err) { console.log(err); });
        console.log("walletlock global", this.global.WallletLock);
    };
    WalletListPage.prototype.ShowWalletAlert = function () {
        var _this = this;
        var prompt = this.alert.create({
            title: "Alert",
            message: "Do you wish to lock your wallet?",
            buttons: [
                {
                    text: "Cancel",
                    handler: function (data) {
                        console.log("cancel clicked");
                    }
                },
                {
                    text: "Okay",
                    handler: function (data) {
                        console.log("ok clicked");
                        _this.navCtrl.push('SettingsPage');
                    }
                }
            ]
        });
        prompt.present();
    };
    WalletListPage.prototype.ionViewWillLeave = function () {
        this.global.walletPageFlag = false;
    };
    WalletListPage.prototype.AddWallet = function () {
        this.navCtrl.push('WalletPage');
    };
    WalletListPage.prototype.getWalletList = function () {
        var _this = this;
        var loading = this.loadingctrl.create({
            content: "loading..."
        });
        loading.present();
        var response = this.server.GetUserWalletList();
        response.subscribe(function (data) {
            _this.walletdata = data;
            console.log(_this.walletdata);
            loading.dismiss();
            if (_this.walletdata.success == 'false') {
                _this.NothingInWallet = true;
            }
            else {
                _this.walletList = _this.walletdata;
            }
            console.log(_this.walletList);
        }, function (error) {
            console.log(error);
            loading.dismiss();
        });
    };
    WalletListPage.prototype.WalletModel = function (walletdata) {
        this.navCtrl.push('WalletModelPage', { walletData: walletdata });
    };
    WalletListPage.prototype.doRefresh1 = function (refresher) {
        this.getWalletList();
        this.content.resize();
        refresher.complete();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], WalletListPage.prototype, "tabRef", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"])
    ], WalletListPage.prototype, "content", void 0);
    WalletListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-wallet-list',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/wallet-list/wallet-list.html"*/'<!--\n  Generated template for the WalletListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header class="Open-Sans-Bold">\n\n  <ion-navbar color="primary">\n    <ion-title>Wallet List</ion-title>\n    <ion-buttons end>\n      <button *ngIf="cancelFlag == false" ion-button clear (click)="AddWallet()">\n        <ion-icon style="font-weight: bold;font-size:2em" name="add"> </ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#eee">\n  <ion-refresher (ionRefresh)="doRefresh1($event)">\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull down to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n    </ion-refresher-content>\n  </ion-refresher>\n  <p *ngIf="cancelFlag == true" style="font-weight:bold;text-align:center;margin-top:60%;padding:5px"> Please enter your pin to enable wallet. </p>\n  <div *ngIf="cancelFlag == false">\n    <p *ngIf="NothingInWallet" style="font-weight:bold;text-align:center;margin-top:60%;padding:5px">No item added in the Wallet.You can add new item by clicking the + button. </p>\n\n    <div *ngIf="walletList">\n      <ion-card *ngFor="let wallet of walletList" (click)="WalletModel(wallet)">\n        <ion-row>\n          <ion-col col-5>\n            <img style="    border-radius: 5px;height: 80px;" src="{{wallet.front}}">\n          </ion-col>\n          <ion-col>\n            <p style="font-size:3rem;font-weight:bold;color:#666;padding-left:5px"> {{wallet.name}} </p>\n            <p style="font-size:1.6rem;color:black;padding-left:5px"> {{wallet.category}} </p>\n            <!-- <p style="text-align:right;position: absolute;bottom: 5px;right: 5px;">Exp:{{wallet.expiration}}  </p> -->\n          </ion-col>\n        </ion-row>\n\n        <!-- <img style="border-radius: 10px;" src="{{wallet.front}}">  \n  \n   <img style="border-radius: 10px;" src="img/card_back.png"> \n   <ion-card-content>\n      <ion-card-title>\n    {{wallet.name}}\n        </ion-card-title>\n   </ion-card-content> -->\n      </ion-card>\n    </div>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/wallet-list/wallet-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_pin_dialog__["a" /* PinDialog */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], WalletListPage);
    return WalletListPage;
}());

//# sourceMappingURL=wallet-list.js.map

/***/ })

});
//# sourceMappingURL=4.js.map
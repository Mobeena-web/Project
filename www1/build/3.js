webpackJsonp([3],{

/***/ 754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletModelPageModule", function() { return WalletModelPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wallet_model__ = __webpack_require__(952);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WalletModelPageModule = (function () {
    function WalletModelPageModule() {
    }
    WalletModelPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__wallet_model__["a" /* WalletModelPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__wallet_model__["a" /* WalletModelPage */]),
            ],
        })
    ], WalletModelPageModule);
    return WalletModelPageModule;
}());

//# sourceMappingURL=wallet-model.module.js.map

/***/ }),

/***/ 952:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalletModelPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(90);
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
 * Generated class for the WalletModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WalletModelPage = (function () {
    function WalletModelPage(server, app, alertctrl, http, global, viewctrl, navCtrl, navParams) {
        this.server = server;
        this.app = app;
        this.alertctrl = alertctrl;
        this.http = http;
        this.global = global;
        this.viewctrl = viewctrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.wallet = navParams.get('walletData');
        console.log(this.wallet);
    }
    WalletModelPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WalletModelPage');
    };
    WalletModelPage.prototype.close = function () {
        this.viewctrl.dismiss();
    };
    WalletModelPage.prototype.deleteAlert = function () {
        var _this = this;
        var alert = this.alertctrl.create({
            title: "Alert",
            message: "Are you sure you want to delete this wallet card?",
            buttons: [
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.delete();
                    }
                },
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('cancel clicked.');
                    }
                }
            ]
        });
        alert.present();
    };
    WalletModelPage.prototype.delete = function () {
        var _this = this;
        var link = this.global.BaseUrl + "Customer_controller/wallet_delete";
        var data = JSON.stringify({ wallet_id: this.wallet.wallet_id });
        var response = this.server.DeleteUserWallet(this.wallet.wallet_id);
        response.subscribe(function (data) {
            _this.data = data;
            console.log(_this.data);
            if (_this.data.status == 'true') {
                var alert_1 = _this.alertctrl.create({
                    title: "Alert",
                    message: "Wallet successfully deleted",
                    buttons: [
                        {
                            text: 'OK',
                            handler: function (data) {
                                _this.viewctrl.dismiss();
                                _this.app.getRootNav().push('WalletListPage');
                            }
                        }
                    ]
                });
                alert_1.present();
            }
        }, function (error) { console.log(error); });
    };
    WalletModelPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-wallet-model',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/wallet-model/wallet-model.html"*/'<!--\n  Generated template for the WalletModelPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-Bold">\n\n  <ion-navbar color="primary">\n    <ion-title>{{wallet.name}}</ion-title>\n    <ion-buttons end>\n      <button ion-button style="font-size: 25px;" clear (click)="deleteAlert()">\n        <ion-icon name="trash"> </ion-icon>\n      </button>\n\n    </ion-buttons>\n    <!-- <ion-buttons start>\n            <button ion-button clear (click)="close()"> Close</button>\n    </ion-buttons> -->\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content style="background:#eee">\n  <ion-card style="padding:10px;margin-bottom:25px">\n    <ion-row>\n      <ion-col>\n        <div>\n\n          <ion-label style="  margin-bottom: 0;">\n            <ion-icon color="primary" name="albums"></ion-icon> Category</ion-label>\n          <p style="color: black;font-size: 2.5rem;"> {{wallet.category}}</p>\n        </div>\n        <div *ngIf="wallet.expiration !=  \'\'">\n          <ion-label style="  margin-bottom: 0;">\n            <ion-icon color="primary" name="calendar"></ion-icon> Expiry</ion-label>\n          <p style="font-size:2rem">{{wallet.expiration}} </p>\n        </div>\n        <div *ngIf="wallet.notes != \'\'">\n          <ion-label style="  margin-bottom: 0;">\n            <ion-icon color="primary" name="create"></ion-icon> Notes</ion-label>\n          <p style="font-size:2rem"> {{wallet.notes}} </p>\n        </div>\n      </ion-col>\n      <ion-col col-4>\n        <img style=" width: 150px; height: 100px;" src="{{wallet.category_image}}">\n      </ion-col>\n    </ion-row>\n  </ion-card>\n  <div class="img">\n    <img style="    width: 100%;  height: 210px;  border-radius: 10px;" src="{{wallet.back}}">\n    <!-- <img src="img/card_front.png"> -->\n  </div>\n\n  <div class="img">\n    <!-- <img src="img/card_back.png"> -->\n    <img style="    width: 100%; height: 210px;  border-radius: 10px;" src="{{wallet.front}}">\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/wallet-model/wallet-model.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], WalletModelPage);
    return WalletModelPage;
}());

//# sourceMappingURL=wallet-model.js.map

/***/ })

});
//# sourceMappingURL=3.js.map
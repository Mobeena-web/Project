webpackJsonp([2],{

/***/ 755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletPageModule", function() { return WalletPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wallet__ = __webpack_require__(953);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WalletPageModule = (function () {
    function WalletPageModule() {
    }
    WalletPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__wallet__["a" /* WalletPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__wallet__["a" /* WalletPage */]),
            ],
        })
    ], WalletPageModule);
    return WalletPageModule;
}());

//# sourceMappingURL=wallet.module.js.map

/***/ }),

/***/ 953:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalletPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
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
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WalletPage = (function () {
    function WalletPage(server, modalCtrl, global, loadingctrl, alertctrl, navCtrl, navParams) {
        this.server = server;
        this.modalCtrl = modalCtrl;
        this.global = global;
        this.loadingctrl = loadingctrl;
        this.alertctrl = alertctrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.WalletCategories();
    }
    WalletPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WalletPage');
    };
    WalletPage.prototype.WalletDetail = function (Cname) {
        this.navCtrl.push('WalletDetailPage', { name: Cname });
    };
    WalletPage.prototype.WalletCategories = function () {
        var _this = this;
        var loading = this.loadingctrl.create({
            content: "loading..."
        });
        loading.present();
        var response = this.server.GetWalletCategories();
        response.subscribe(function (data) {
            _this.walletCategoriesList = data;
            loading.dismiss();
            console.log(_this.walletCategoriesList);
        }, function (error) {
            console.log(error);
        });
    };
    WalletPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-wallet',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/wallet/wallet.html"*/'<!--\n  Generated template for the WalletPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-Bold">\n\n  <ion-navbar color="primary">\n    <ion-title>Wallet</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#eee" class="Open-Sans-regular">\n\n  <p style="font-size:3rem;text-align:center;  margin: 10px;    margin-top: 15px; font-weight: bold; color: rgba(0, 0, 0,0.6);">\n  What are\n    <br> you adding?</p>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-6 *ngFor="let list of walletCategoriesList" (click)="WalletDetail(list.name)">\n        <ion-card style=" border-radius: 4px;">\n          <img *ngIf="list.image != \'\'" src="{{list.image}}">\n          <img class="img" *ngIf="list.image == \'\'" src="img/Placeholder.png">\n        </ion-card>\n        <p style=" margin: 0;" class="pclass">{{list.name}} </p>\n      </ion-col>\n\n    </ion-row>\n    <!-- <ion-row>\n    <ion-col>\n      <ion-card>\n        <img src="img/gift-card.png">\n      </ion-card>\n      <p class="pclass">  Loyalty Card </p>\n    </ion-col>\n    <ion-col>\n      <ion-card>\n        <img src="img/gift-card.png">\n      </ion-card>\n      <p class="pclass"> Transportation Card </p>\n    </ion-col>\n  </ion-row>\n  \n  <ion-row>\n    <ion-col>\n      <ion-card>\n        <img src="img/gift-card.png">\n      </ion-card>\n      <p class="pclass"> Hotel </p>\n    </ion-col>\n    <ion-col>\n      <ion-card>\n        <img src="img/gift-card.png">\n      </ion-card>\n      <p class="pclass"> Something Else </p>\n    </ion-col>\n  </ion-row> -->\n\n  </ion-grid>\n  <!-- <div *ngIf="walletCategoriesList">\n  <ion-card *ngFor="let list of walletCategoriesList ">\n  <ion-row>\n  <ion-col >\n    <img style="  height: 80px; border-radius: 4px;" *ngIf="list.image != \'\'" src="{{list.image}}">\n     <img style="  height: 80px;border-radius: 4px;" *ngIf="list.image == \'\'" src="img/Placeholder.png">\n  \n  </ion-col>\n  <ion-col>\n    <p style="font-size:2.5rem;font-weight:bold"> {{list.name}}</p>\n  </ion-col>\n  \n  <ion-col (click)="WalletDetail(list.name)" col-3 style="text-align:center;color:white;background:#000000">\n    <ion-icon name = "add" > </ion-icon>\n  </ion-col>\n  </ion-row>\n  \n  </ion-card>\n  </div> -->\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/wallet/wallet.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], WalletPage);
    return WalletPage;
}());

//# sourceMappingURL=wallet.js.map

/***/ })

});
//# sourceMappingURL=2.js.map
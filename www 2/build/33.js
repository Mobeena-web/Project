webpackJsonp([33],{

/***/ 734:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GiftcardsPageModule", function() { return GiftcardsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__giftcards__ = __webpack_require__(932);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GiftcardsPageModule = (function () {
    function GiftcardsPageModule() {
    }
    GiftcardsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__giftcards__["a" /* GiftcardsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__giftcards__["a" /* GiftcardsPage */]),
            ],
        })
    ], GiftcardsPageModule);
    return GiftcardsPageModule;
}());

//# sourceMappingURL=giftcards.module.js.map

/***/ }),

/***/ 932:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GiftcardsPage; });
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




var GiftcardsPage = (function () {
    function GiftcardsPage(alertCtrl, loadingCtrl, server, global, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.server = server;
        this.global = global;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.giftcard = 'notbuyed';
        this.my_gift_cards();
        this.loadBanner_design();
    }
    GiftcardsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GiftcardsPage');
    };
    GiftcardsPage.prototype.buy = function (banner) {
        this.navCtrl.push('GiftcardBannerPage', { banner: banner });
    };
    GiftcardsPage.prototype.loadBanner_design = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.my_gift_cards_design();
        response.subscribe(function (data) {
            loading.dismiss();
            _this.banner = data;
            console.log("design", data);
        }, function (error) {
            loading.dismiss();
        });
    };
    GiftcardsPage.prototype.my_gift_cards = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.my_gift_cards();
        response.subscribe(function (data) {
            _this.mygifts = data;
            loading.dismiss();
        }, function (error) {
            loading.dismiss();
            _this.global.presentToast("Something went wrong check your internet connection.");
        });
    };
    GiftcardsPage.prototype.refill = function (item) {
        var _this = this;
        var limit = Number(this.global.giftcard_amount_limit - Number(item.amount)).toFixed(2);
        var prompt = this.alertCtrl.create({
            title: 'Refill Amount',
            message: "Enter amount not greater than " + limit + '.',
            inputs: [
                {
                    name: 'amount',
                    placeholder: 'Amount',
                    type: 'number'
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
                    text: 'Refill',
                    handler: function (data) {
                        if (Number(data.amount) + Number(item.amount) <= _this.global.giftcard_amount_limit) {
                            _this.navCtrl.push('BuygiftcardsPage', { gift_id: item.giftcard_id, udid_r: _this.global.udid, design_id: item.giftcard_id, amount: data.amount, message: item.message, action: 'refill' });
                        }
                        else {
                            _this.global.presentToast("Your giftcard amount must not greater than " + _this.global.giftcard_amount_limit);
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    GiftcardsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-giftcards',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/giftcards/giftcards.html"*/'\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>Gift Cards</ion-title>\n  </ion-navbar>\n  <ion-segment [(ngModel)]="giftcard" class="pt">\n    <ion-segment-button value="notbuyed">\n      Gift Cards\n    </ion-segment-button>\n    <ion-segment-button value="buyed">\n      My Gift Cards\n    </ion-segment-button>\n  </ion-segment>\n</ion-header>\n\n\n<ion-content padding >\n  <div [ngSwitch]="giftcard">\n    <ion-list *ngSwitchCase="\'notbuyed\'">\n    <div *ngFor="let b of banner;let i=index">\n        <h5 text-center>{{b?.category_name}}</h5>\n    \n        <ion-slides *ngIf="i != 0 && b.design_list" pager  style="height:auto" autoplay="2000" speed="3000"  slidesPerView="2" autoplayDisableOnInteraction="false">\n         <ion-slide *ngFor="let banners of b.design_list" style="padding: 10px;" (click)="buy(banners)">\n           <img style="border-radius: 7px;object-fit: cover;box-shadow: 2px 5px 15px #bbb;" src="{{banners?.image}}">\n         </ion-slide>\n     </ion-slides>\n     <ion-slides *ngIf="i == 0 && b.design_list" pager  style="height:190px" autoplay="2000" speed="3000"  slidesPerView="1" autoplayDisableOnInteraction="false">\n      <ion-slide *ngFor="let banners of b.design_list" style="height:100%;padding: 10px;" (click)="buy(banners)">\n        <img style="height: 180px; width:100% !important;border-radius: 7px;object-fit: cover;box-shadow: 2px 5px 15px #bbb;" src="{{banners?.image}}">\n      </ion-slide>\n  </ion-slides>\n    </div>\n     \n    \n    </ion-list>\n  \n    <ion-list *ngSwitchCase="\'buyed\'">\n      <ion-row>\n        <ion-col col-6 *ngFor=\'let item of mygifts\'>\n            <ion-card>\n                  <img src={{item.image}} class="g_image">\n                  <ion-row>\n                    <ion-col col-5>\n                        <h3 class="gc">${{item.amount}}</h3>\n                    </ion-col>\n                    <ion-col col-7>\n                      <button ion-button block round (click)="refill(item)">ReFill</button>\n                    </ion-col>\n                  </ion-row>\n                  <!-- <ion-row>\n                    <ion-col>\n                        <p *ngIf="item.message">{{item.message}}</p>\n                    </ion-col>\n                  </ion-row> -->\n              </ion-card>\n        </ion-col>\n      </ion-row>\n        \n    </ion-list>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/giftcards/giftcards.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], GiftcardsPage);
    return GiftcardsPage;
}());

//# sourceMappingURL=giftcards.js.map

/***/ })

});
//# sourceMappingURL=33.js.map
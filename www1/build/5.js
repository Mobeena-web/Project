webpackJsonp([5],{

/***/ 752:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletDetailPageModule", function() { return WalletDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wallet_detail__ = __webpack_require__(950);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WalletDetailPageModule = (function () {
    function WalletDetailPageModule() {
    }
    WalletDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__wallet_detail__["a" /* WalletDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__wallet_detail__["a" /* WalletDetailPage */]),
            ],
        })
    ], WalletDetailPageModule);
    return WalletDetailPageModule;
}());

//# sourceMappingURL=wallet-detail.module.js.map

/***/ }),

/***/ 950:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalletDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_crop__ = __webpack_require__(380);
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








/**
 * Generated class for the WalletDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WalletDetailPage = (function () {
    function WalletDetailPage(server, app, crop, platform, http, alert, loading, global, hhtp, camera, navCtrl, navParams, formbuilder) {
        this.server = server;
        this.app = app;
        this.crop = crop;
        this.platform = platform;
        this.http = http;
        this.alert = alert;
        this.loading = loading;
        this.global = global;
        this.hhtp = hhtp;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formbuilder = formbuilder;
        this.category = this.navParams.get('name');
        console.log(this.category);
        this.WalletForm = formbuilder.group({
            cardName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
            cardNumber: [''],
            expDate: [''],
            notes: [''],
        });
    }
    WalletDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WalletDetailPage');
        if (this.platform.is('ios')) {
            this.EditFlag = false;
        }
        else if (this.platform.is('android')) {
            this.EditFlag = true;
        }
    };
    WalletDetailPage.prototype.WalletSave = function (walletdata) {
        var _this = this;
        if (!this.WalletForm.valid) {
            console.log("fields empty");
            this.submitAttempt = true;
        }
        else {
            if (this.FrontImageFlag && this.BackImageFlag) {
                console.log("request");
                var Loading_1 = this.loading.create({
                    content: "Loading..."
                });
                Loading_1.present();
                var response = this.server.SendWalletDataToServer(walletdata, this.category, this.frontImage, this.backImage);
                response.subscribe(function (data) {
                    var Data = data;
                    console.log(Data);
                    Loading_1.dismiss();
                    if (Data.status == 'true') {
                        var alert1 = _this.alert.create({
                            title: 'Congratulation',
                            subTitle: Data.message,
                            buttons: ['Okay']
                        });
                        _this.app.getRootNav().push('WalletListPage');
                        alert1.present();
                    }
                }, function (error) {
                    console.log(error);
                });
            }
            else {
                var alert_1 = this.alert.create({
                    title: 'Oops',
                    subTitle: 'Please take front back image of the card',
                    buttons: ['Okay']
                });
                alert_1.present();
            }
        }
    };
    WalletDetailPage.prototype.addFrontPicture = function () {
        var _this = this;
        var options = {
            quality: 20,
            targetWidth: 350,
            targetHeight: 300,
            allowEdit: false,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.ALLMEDIA
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.crop.crop(imageData, { quality: 25 })
                .then(function (newImage) {
                console.log('new image path is: ' + newImage);
                var flag = true;
                _this.toDataUrl(newImage, flag);
                // console.log("frontimage",this.frontImage);
            }, function (error) { return console.error('Error cropping image', error); });
            //  console.log("image",this.frontImage);
        }, function (err) {
            console.log(err);
        });
    };
    WalletDetailPage.prototype.toDataUrl = function (url, flag) {
        var xhr = new XMLHttpRequest();
        var loading = this.loading.create({
            content: "Please wait..."
        });
        var env = this;
        xhr.onload = function () {
            loading.present();
            var reader = new FileReader();
            reader.onloadend = function () {
                //  console.log(reader.result,"result");
                if (flag == true) {
                    env.frontImage = reader.result;
                    env.FrontImageFlag = true;
                }
                else {
                    env.backImage = reader.result;
                    env.BackImageFlag = true;
                }
            };
            reader.readAsDataURL(xhr.response);
            loading.dismiss();
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    };
    WalletDetailPage.prototype.addBackPicture = function () {
        var _this = this;
        var options = {
            quality: 20,
            targetWidth: 350,
            targetHeight: 300,
            allowEdit: false,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.ALLMEDIA
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.crop.crop(imageData, { quality: 25 })
                .then(function (newImage) {
                console.log("crop");
                console.log('new image path is: ' + newImage);
                var flag = false;
                _this.toDataUrl(newImage, flag);
                // console.log("backimage",this.backImage);
            }, function (error) { return console.error('Error cropping image', error); });
            //  console.log("image",this.frontImage);
        }, function (err) {
            console.log(err);
        });
    };
    WalletDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-wallet-detail',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/wallet-detail/wallet-detail.html"*/'<!--\n  Generated template for the WalletDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-Bold">\n\n  <ion-navbar color="primary">\n    <ion-title>{{category}}</ion-title>\n    <ion-buttons end>\n     \n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#eee">\n    <ion-scroll style="height: calc(100% - 6rem);" scrollY="true">\n  <ion-grid>\n    <ion-row>\n      <ion-col style="margin:auto; margin:5px ;" (click)="addBackPicture()">\n\n        <div *ngIf="!BackImageFlag" style=" text-align: center;  font-size: 7rem;border: solid #000000;   border-radius: 10px;">\n          <ion-icon color="primary" name="add"> </ion-icon>\n        </div>\n        <p *ngIf="!BackImageFlag" class="pclass"> Back*</p>\n        <img *ngIf="BackImageFlag" style="height: 100px;  border-radius: 10px; border: solid white; width: 170px;" src="{{backImage}}">\n      </ion-col>\n      <ion-col style="margin:auto; margin:5px ;" (click)="addFrontPicture()">\n        <div *ngIf="!FrontImageFlag" style=" text-align: center;  font-size: 7rem;border: solid #000000;  border-radius: 10px;">\n          <ion-icon color="primary" name="add"> </ion-icon>\n        </div>\n        <p *ngIf="!FrontImageFlag" class="pclass"> Front* </p>\n        <img *ngIf="FrontImageFlag" style="height: 100px;  border-radius: 10px;      border: solid white;   width: 170px;" src="{{frontImage}}">\n      </ion-col>\n\n\n    </ion-row>\n  </ion-grid>\n  <p *ngIf="submitAttempt" style="color: #ea6153; text-align:center;">Please enter name and attach front and back images.</p>\n  <ion-list style=" padding: 10px;">\n\n    <form [formGroup]="WalletForm" ng-submit="Wallet(this.loginForm.value)">\n\n      <ion-item>\n        <ion-label floating> Card Name* </ion-label>\n        <ion-input type="text" formControlName="cardName"> </ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating> Card Number </ion-label>\n        <ion-input type="number" formControlName="cardNumber"> </ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating> Expiration Date </ion-label>\n        <ion-input type="text" formControlName="expDate"> </ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating> Notes </ion-label>\n        <ion-input type="text" formControlName="notes"> </ion-input>\n      </ion-item>\n\n    </form>\n  </ion-list>\n</ion-scroll>\n\n  <button ion-button type="submit" block style="width:95%;margin-left:2.5%;    position: absolute;\n  bottom: 0;" (click)="WalletSave(WalletForm.value)"> Save</button>\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/wallet-detail/wallet-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_6__ionic_native_crop__["a" /* Crop */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_5__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]])
    ], WalletDetailPage);
    return WalletDetailPage;
}());

//# sourceMappingURL=wallet-detail.js.map

/***/ })

});
//# sourceMappingURL=5.js.map
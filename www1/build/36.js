webpackJsonp([36],{

/***/ 731:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryPageModule", function() { return GalleryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gallery__ = __webpack_require__(929);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GalleryPageModule = (function () {
    function GalleryPageModule() {
    }
    GalleryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__gallery__["a" /* GalleryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__gallery__["a" /* GalleryPage */]),
            ],
        })
    ], GalleryPageModule);
    return GalleryPageModule;
}());

//# sourceMappingURL=gallery.module.js.map

/***/ }),

/***/ 929:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_photo_viewer__ = __webpack_require__(378);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GalleryPage = (function () {
    function GalleryPage(loadingCtrl, server, global, navCtrl, navParams, photoViewer, platform) {
        this.loadingCtrl = loadingCtrl;
        this.server = server;
        this.global = global;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.photoViewer = photoViewer;
        this.platform = platform;
        this.errorMenu = false;
        this.get_gallery();
    }
    GalleryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GalleryPage');
    };
    GalleryPage.prototype.get_gallery = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.gallery_list();
        response.subscribe(function (data) {
            loading.dismiss();
            console.log("gallery", data);
            _this.images = data.data.blogs;
            if (_this.images.length == 0) {
                _this.errorMenu = true;
            }
            else {
                _this.errorMenu = false;
            }
        }, function (error) {
            _this.global.alertMessage("Failure", "Something went wrong check your internet connection.");
        });
    };
    GalleryPage.prototype.image_show = function (image) {
        if (this.platform.is("ios")) {
            image = decodeURIComponent(image);
        }
        // this.photoViewer.show(url, title, options);
        this.photoViewer.show(image, '', { share: true });
    };
    GalleryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-gallery',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/gallery/gallery.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Gallery</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-slides pager *ngIf="global.banner_image" autoplay="2000" style="height:184px"  speed="3000" loop="true" autoplayDisableOnInteraction="false">\n        <ion-slide *ngFor="let banners of global.banner_image" style="height:100%">\n          <img style="height: 173px; width:100% !important;border-radius: 7px;object-fit: cover" src="{{banners?.image}}">\n        </ion-slide>\n    </ion-slides>\n    <div *ngIf="errorMenu == true">\n        <p style="padding-top: calc(50% - 11px); padding-right:20px; padding-left:20px; text-align: center; font-size: 22px; color:#a8a3a3;"><ion-icon name="eye-off"></ion-icon></p>\n        <p no-margin style="padding-right:20px; padding-left:20px; text-align: center; font-size: 14px;">No Images</p>\n    </div>\n  <ion-row>\n    <ion-col col-4 *ngFor="let item of images" (click)="image_show(item.image)">\n      <img src={{item.image}} class="image_show">\n    </ion-col>\n  </ion-row>\n\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/gallery/gallery.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_4__ionic_native_photo_viewer__["a" /* PhotoViewer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]])
    ], GalleryPage);
    return GalleryPage;
}());

//# sourceMappingURL=gallery.js.map

/***/ })

});
//# sourceMappingURL=36.js.map
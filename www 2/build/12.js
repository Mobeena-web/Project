webpackJsonp([12],{

/***/ 747:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewsPageModule", function() { return ReviewsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reviews__ = __webpack_require__(945);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__ = __webpack_require__(375);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ReviewsPageModule = (function () {
    function ReviewsPageModule() {
    }
    ReviewsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__reviews__["a" /* ReviewsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__reviews__["a" /* ReviewsPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__["a" /* Ionic2RatingModule */]
            ],
        })
    ], ReviewsPageModule);
    return ReviewsPageModule;
}());

//# sourceMappingURL=reviews.module.js.map

/***/ }),

/***/ 945:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewsPage; });
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
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReviewsPage = (function () {
    function ReviewsPage(server, globals, modalCtrl, viewCtrl, alertCtrl, loadingCtrl, navCtrl, navParams) {
        this.server = server;
        this.globals = globals;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.placeName = navParams.get('place');
        console.log(this.placeName);
        this.reviewdata();
    }
    ReviewsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReviewsPage');
    };
    ReviewsPage.prototype.reviewdata = function () {
        var _this = this;
        var response = this.server.BusinessInformation(this.globals.business_username);
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        response.subscribe(function (data) {
            _this.data = data;
            loading.dismiss();
            _this.details = _this.data;
            _this.name = _this.details.info.name;
            _this.reviewData = _this.details.reviews;
            _this.length = _this.reviewData.length;
            console.log(_this.length);
        }, function (error) {
            console.log("Oooops!");
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Server times out,please try again',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    ReviewsPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ReviewsPage.prototype.addReview = function () {
        //   this.viewCtrl.dismiss();
        var modal = this.modalCtrl.create('AddReviewPage', { place: this.globals.business_username });
        modal.present();
        // this.navCtrl.push('AddReviewPage', { place: this.globals.business_username });
    };
    ReviewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-reviews',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/reviews/reviews.html"*/'<!--\n  Generated template for the ReviewsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color="primary">\n    <ion-title>Reviews</ion-title>\n    <!-- <ion-buttons end>\n\n      <button ion-button style="color:white; float:right"  clear small>Review</button>\n    </ion-buttons> -->\n\n    <!-- <ion-buttons start>\n     <button ion-button style = "color:white; float:right" (click)="dismiss()" clear small >Close</button>\n    </ion-buttons> -->\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content style="background:#eee" class="Open-Sans-regular">\n\n  <div *ngIf="length == 0">\n    <p style="padding-top: calc(50% - 11px); padding-right:20px; padding-left:20px; text-align: center; font-size: 22px; color:#a8a3a3;"><ion-icon name="eye-off"></ion-icon></p>\n    <p no-margin style="padding-right:20px; padding-left:20px; text-align: center; font-size: 14px;">No reviews</p>\n  </div>\n\n  <ion-card *ngFor="let review of reviewData" style="padding:5px;border-radius: 0px;border:1px solid #ccc">\n\n    <!--   <ion-avatar style="margin: -55px 16px 8px 0 !important;" item-left>\n          <img src="https://api.adorable.io/avatars/75/{{review.title}}">\n        </ion-avatar> -->\n\n    <h2 style="font-weight:normal;padding-left:10px"> {{review.description}}</h2>\n    <rating [(ngModel)]="review.rating" readOnly="true" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half"\n      starIconName="star" nullable="false" (ngModelChange)="onModelChange($event)"></rating>\n    <p style="padding-left:10px;font-weight: bold">{{review.first_name}} {{review.last_name}}</p>\n\n\n\n\n  </ion-card>\n  <ion-fab (click)="addReview()" class="add_review">\n    <button ion-fab ><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/reviews/reviews.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], ReviewsPage);
    return ReviewsPage;
}());

//# sourceMappingURL=reviews.js.map

/***/ })

});
//# sourceMappingURL=12.js.map
webpackJsonp([57],{

/***/ 715:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddReviewPageModule", function() { return AddReviewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_review__ = __webpack_require__(913);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddReviewPageModule = (function () {
    function AddReviewPageModule() {
    }
    AddReviewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__add_review__["a" /* AddReviewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__add_review__["a" /* AddReviewPage */]),
            ],
        })
    ], AddReviewPageModule);
    return AddReviewPageModule;
}());

//# sourceMappingURL=add-review.module.js.map

/***/ }),

/***/ 913:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_server_server__ = __webpack_require__(34);
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
 * Generated class for the AddReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddReviewPage = (function () {
    function AddReviewPage(server, globals, nativeStorage, formBilder, http, alertCtrl, loadingCtrl, viewCtrl, navCtrl, navParams) {
        this.server = server;
        this.globals = globals;
        this.nativeStorage = nativeStorage;
        this.formBilder = formBilder;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.index1 = 0;
        this.array2 = new Array();
        this.visible = false;
        this.submitAttempt = false;
        this.array = new Array();
        this.ReviewForm = formBilder.group({
            description: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])]
        });
        this.bussiness = navParams.get('place');
        this.data = {};
        this.data.response = '';
        this.http = http;
        this.array.length = 5;
    }
    AddReviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddReviewPage');
    };
    AddReviewPage.prototype.save = function (ReviewData) {
        var _this = this;
        console.log(this.index1);
        if (!this.ReviewForm.valid || this.index1 == '0') {
            this.submitAttempt = true;
            console.log(' Some values were not given,please fill them');
        }
        else {
            this.submitAttempt = false;
            this.nativeStorage.getItem('user')
                .then(function (data) {
                _this.user_email = data.email;
                var response = _this.server.AddUserReview(_this.user_email, ReviewData, _this.index1, _this.bussiness);
                var loading = _this.loadingCtrl.create({
                    content: "Loading...",
                });
                loading.present();
                response
                    .subscribe(function (data) {
                    // console.log(this.data);
                    _this.data.response = data;
                    console.log(_this.data.response);
                    loading.dismiss();
                    _this.viewCtrl.dismiss();
                }, function (error) {
                    console.log("Oooops!");
                    loading.dismiss();
                    var alert = _this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'Please try again',
                        buttons: ['OK']
                    });
                    alert.present();
                });
                // console.log(barcodeData.text);
            }).catch(function (err) { return console.log; });
        }
    };
    AddReviewPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    AddReviewPage.prototype.changeStar = function (index) {
        if (!this.visible) {
            this.index1 = index + 1;
            console.log(this.index1);
            //this.array2.length = index1;
            this.visible = true;
        }
        else {
            this.visible = false;
            this.index1 = index + 1;
            console.log(this.index1);
            //this.array2.length = index1;
            this.visible = true;
        }
    };
    AddReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-review',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/add-review/add-review.html"*/'<!-- <ion-header class="Open-Sans-bold">\n  <ion-navbar color="primary">\n    <ion-title>Submit Review</ion-title>\n\n  </ion-navbar>\n</ion-header> -->\n\n<ion-content style="background:#fff" class="Open-Sans-regular">\n    <div class="overlay"></div>\n  <div class="modal_content"  >\n  <p class="Open-Sans-regular" style="font-family: Open Sans;" *ngIf="submitAttempt" style="color: #ea6153;">Please fill out all details accurately.</p>\n\n  <ion-list no-lines style="   width: 95%; margin-left: 2.5%;">\n    <form [formGroup]="ReviewForm">\n      <ion-item>\n        <ion-row *ngIf="!visible">\n          <ion-col style="text-align:center" *ngFor="let a of array; let i = index">\n            <ion-icon color="star" style="font-size: 5rem;" (tap)="changeStar(i)" name="star-outline"></ion-icon>\n          </ion-col>\n        </ion-row>\n\n\n\n        <ion-row *ngIf="visible">\n          <ion-col style="text-align:center" *ngFor="let a of array; let b = index">\n\n            <ion-icon *ngIf="b <= index1-1" color="star" style="font-size: 5rem;" (click)="changeStar(b)" name="star"></ion-icon>\n            <ion-icon *ngIf="b > index1-1" color="star" style="font-size: 5rem;" (click)="changeStar(b)" name="star-outline"></ion-icon>\n          </ion-col>\n        </ion-row>\n      </ion-item>\n      \n\n      <ion-item style=" padding-bottom: 20px;">\n\n        <!-- <ion-label style="padding-left: 5px;" >Review</ion-label> -->\n        <ion-textarea class="text" formControlName="description" placeholder="Your Review"></ion-textarea>\n      </ion-item>\n      <!-- \n       <ion-item>\n         <ion-range min="0" max="5" pin="true"  formControlName="rating" >\n           <ion-icon color = "star" range-left    name="star"></ion-icon>   \n           <ion-icon color = "star"  range-right  name="star"></ion-icon>\n         </ion-range>\n       </ion-item>-->\n       <ion-row>\n          <ion-col col-6>\n            <button ion-button  block round color="primary"  (click)="save(this.ReviewForm.value)">Submit</button>\n    \n          </ion-col>\n          <ion-col col-6>\n            <button ion-button  block round outline   (click)="close()">Cancel</button>\n    \n          </ion-col>\n        </ion-row>\n\n    </form>\n  </ion-list>\n\n\n    \n  </div>\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/add-review/add-review.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_5__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], AddReviewPage);
    return AddReviewPage;
}());

//# sourceMappingURL=add-review.js.map

/***/ })

});
//# sourceMappingURL=57.js.map
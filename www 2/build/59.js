webpackJsonp([59],{

/***/ 714:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AcceptTermsPageModule", function() { return AcceptTermsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__accept_terms__ = __webpack_require__(912);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AcceptTermsPageModule = (function () {
    function AcceptTermsPageModule() {
    }
    AcceptTermsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__accept_terms__["a" /* AcceptTermsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__accept_terms__["a" /* AcceptTermsPage */]),
            ],
        })
    ], AcceptTermsPageModule);
    return AcceptTermsPageModule;
}());

//# sourceMappingURL=accept-terms.module.js.map

/***/ }),

/***/ 912:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AcceptTermsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AcceptTermsPage = (function () {
    function AcceptTermsPage(iab, globals, navCtrl, navParams) {
        this.iab = iab;
        this.globals = globals;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AcceptTermsPage.prototype.openTerms = function () {
        this.iab.create('http://mikronexus.com/legal/terms.pdf', "_self");
    };
    AcceptTermsPage.prototype.openPolicy = function () {
        this.iab.create('http://mikronexus.com/legal/policy.pdf', "_self");
    };
    AcceptTermsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AcceptTermsPage');
    };
    AcceptTermsPage.prototype.homePage = function () {
        if (this.privacy && this.terms) {
            if (this.globals.caos_flag) {
                // this.globals.caos_flag = false;
                this.navCtrl.push('CategoryPage');
            }
            else {
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
            }
        }
        else {
            this.globals.presentToast("Please accept Privacy Policy and Terms & Conditions");
        }
    };
    AcceptTermsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-accept-terms',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/accept-terms/accept-terms.html"*/'\n<ion-content padding>\n  \n    <div style="font-family: Open Sans;" class="title1">\n      <img src={{globals.b_logo}} style="    position: relative; left: 26%;  width: 50%;  height: auto;  ">\n    </div>\n\n  <h4 text-center class="heading-top">A FEW THINGS HAVE CHANGED</h4>\n\n  <p class="review-text">\n    Review and accept the new <b (click)="openTerms()"> <u>Terms and Conditions</u></b> as well as the new <b (click)="openPolicy()"><u>Privacy Policy</u></b> to continue.\n  </p>\n\n  <ion-item >\n      <ion-label class="label_">Yes, I accept the <b>Privacy Policy</b></ion-label>\n      <ion-checkbox [(ngModel)]="privacy"></ion-checkbox>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label class="label_">Yes, I accept the <b>Terms & Conditions</b></ion-label>\n      <ion-checkbox [(ngModel)]="terms"></ion-checkbox>\n    </ion-item>\n\n    <button ion-button block padding margin-top color=\'primary\' (click)="homePage()">Done</button>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/accept-terms/accept-terms.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], AcceptTermsPage);
    return AcceptTermsPage;
}());

//# sourceMappingURL=accept-terms.js.map

/***/ })

});
//# sourceMappingURL=59.js.map
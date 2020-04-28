webpackJsonp([60],{

/***/ 713:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutusPageModule", function() { return AboutusPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__aboutus__ = __webpack_require__(911);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__ = __webpack_require__(375);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AboutusPageModule = (function () {
    function AboutusPageModule() {
    }
    AboutusPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__aboutus__["a" /* AboutusPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__aboutus__["a" /* AboutusPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__["a" /* Ionic2RatingModule */]
            ],
        })
    ], AboutusPageModule);
    return AboutusPageModule;
}());

//# sourceMappingURL=aboutus.module.js.map

/***/ }),

/***/ 911:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutusPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AboutusPage = (function () {
    function AboutusPage(iab, server, globals, navCtrl, navParams) {
        this.iab = iab;
        this.server = server;
        this.globals = globals;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.name = this.navParams.get('name');
        this.business_id = this.navParams.get('business_id');
        this.hours_operation = this.navParams.get('hours_operation');
        this.username = this.navParams.get('username');
        if (this.hours_operation) {
            this.hours_operation = this.update_time_(this.hours_operation);
        }
        this.reviewdata();
        this.get_aboutus();
    }
    AboutusPage.prototype.get_aboutus = function () {
        var _this = this;
        var response = this.server.get_about_us(this.business_id);
        response.subscribe(function (data) {
            if (data.data) {
                _this.aboutus = data.data.about[0];
            }
        }, function (error) {
            console.log(error);
        });
    };
    AboutusPage.prototype.ionViewWillEnter = function () {
        this.latitude = this.navParams.get('latitude');
        this.longitude = this.navParams.get('longitude');
        this.loadMap();
    };
    AboutusPage.prototype.update_time_ = function (p_hours) {
        var _this = this;
        p_hours.forEach(function (element) {
            if (element[0] != 'opened' && element[0] != 'closed') {
                element[0] = _this.tConvert(element[0]);
            }
            if (element[1] != 'opened' && element[1] != 'closed') {
                element[1] = _this.tConvert(element[1]);
            }
        });
        return p_hours;
    };
    AboutusPage.prototype.tConvert = function (time_) {
        if (time_ == 0) {
            time_ = 12;
        }
        if (time_ > 12) {
            time_ = time_ + '';
            var ti = time_.split('.');
            ti[0] = parseFloat(ti[0]);
            ti[0] = ti[0] - 12;
            if (ti[1] == "5") {
                ti[1] = ':30';
            }
            else if (ti[1] != "5") {
                ti[1] = ':00';
            }
            time_ = ti[0] + ti[1] + 'PM';
        }
        else {
            var ti = '';
            time_ = time_ + '';
            ti = time_.split('.');
            if (ti[1] == "5") {
                ti[1] = ':30';
                time_ = '';
                time_ = ti[0] + ti[1] + 'AM';
            }
            else if (ti[1] == undefined) {
                time_ = '';
                ti[1] = ':00';
                time_ = ti[0] + ti[1] + 'AM';
            }
        }
        time_ = time_ + '';
        var t = time_.split(':');
        return t[0] + ':' + t[1]; // return adjusted time_ or original string
    };
    AboutusPage.prototype.loadMap = function () {
        var myLatLng = new google.maps.LatLng(parseFloat(this.latitude), parseFloat(this.longitude));
        console.log(myLatLng);
        var map = new google.maps.Map(document.getElementById('mapabout'), {
            zoom: 15,
            center: myLatLng
        });
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: ''
        });
    };
    AboutusPage.prototype.reviewdata = function () {
        var _this = this;
        var response = this.server.BusinessInformation(this.username);
        response.subscribe(function (data) {
            _this.reviewData = data.reviews;
            _this.length = _this.reviewData.length;
        }, function (error) {
        });
    };
    AboutusPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-aboutus',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/aboutus/aboutus.html"*/'\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>{{name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n    <img *ngIf="aboutus?.image" src={{aboutus?.image}} class="myimage">\n  <div padding>\n    <h3  [innerHTML]="aboutus?.title">\n    </h3>\n    <h5 [innerHTML]="aboutus?.description"></h5>\n      <ion-row >\n          <ion-col col-4>\n            <div class="fb">Days</div>\n            <div *ngFor="let day of daysInWeek">{{day}}</div>\n            \n          </ion-col>\n            <ion-col col-4 text-center>\n            <div class="fb">Opening Time</div>\n      \n              <div *ngFor="let item of hours_operation">\n                 {{item[0]}}\n              </div>\n             </ion-col>\n              <ion-col col-4 text-center>\n            <div class="fb">Closing Time</div>\n                <div *ngFor="let item of hours_operation">\n                    {{item[1]}}\n                </div>\n              </ion-col>\n      \n          \n        </ion-row>\n        <div #map id="mapabout"></div>\n      <h3 text-center>Reviews</h3>\n        <div *ngIf="length == 0">\n            <p style="margin: 0px;padding-top: 10%; padding-right:20px; padding-left:20px; text-align: center; font-size: 22px; color:#a8a3a3;"><ion-icon name="eye-off"></ion-icon></p>\n            <p no-margin style="padding-right:20px; padding-left:20px; text-align: center; font-size: 14px;">No reviews</p>\n          </div>\n        \n          <ion-card  *ngFor="let review of reviewData" style="padding:5px;border-radius: 0px;border:1px solid #ccc">\n        \n            <!--   <ion-avatar style="margin: -55px 16px 8px 0 !important;" item-left>\n                  <img src="https://api.adorable.io/avatars/75/{{review.title}}">\n                </ion-avatar> -->\n        \n            <h2 style="font-weight:normal;padding-left:10px"> {{review.description}}</h2>\n            <rating [(ngModel)]="review.rating" readOnly="true" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half"\n              starIconName="star" nullable="false" (ngModelChange)="onModelChange($event)"></rating>\n            <p style="padding-left:10px;font-weight: bold">{{review.first_name}} {{review.last_name}}</p>\n        \n          </ion-card>\n      \n  </div>\n \n</ion-content>\n\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/aboutus/aboutus.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], AboutusPage);
    return AboutusPage;
}());

//# sourceMappingURL=aboutus.js.map

/***/ })

});
//# sourceMappingURL=60.js.map
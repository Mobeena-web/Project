webpackJsonp([39],{

/***/ 759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DescriptionPageModule", function() { return DescriptionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__description__ = __webpack_require__(956);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__ = __webpack_require__(375);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DescriptionPageModule = (function () {
    function DescriptionPageModule() {
    }
    DescriptionPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__description__["a" /* DescriptionPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__description__["a" /* DescriptionPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__["a" /* Ionic2RatingModule */]
            ],
        })
    ], DescriptionPageModule);
    return DescriptionPageModule;
}());

//# sourceMappingURL=description.module.js.map

/***/ }),

/***/ 956:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DescriptionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__ = __webpack_require__(65);
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
 * Generated class for the DescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DescriptionPage = (function () {
    function DescriptionPage(server, iab, globals, alertCtrl, emailComposer, callNumber, loadingCtrl, modalCtrl, http, navCtrl, navParams) {
        this.server = server;
        this.iab = iab;
        this.globals = globals;
        this.alertCtrl = alertCtrl;
        this.emailComposer = emailComposer;
        this.callNumber = callNumber;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.array = new Array();
        this.Week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        this.hours = new Array('12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM', '12:00 AM');
        this.placeName = navParams.get('details');
        this.point = navParams.get('location');
        this.text = navParams.get('offerText');
        this.rating = navParams.get('average_rating');
        this.convertTo12hourFormat();
        this.date = new Date();
        this.day = this.date.getDay();
        // this.day = 1;
        this.time = this.date.getHours();
        console.log(this.date.getDay(), this.time);
        this.http = http;
        this.data = {};
        this.data.response = '';
        this.Description();
    }
    DescriptionPage.prototype.Business_location = function () {
        this.navCtrl.push('BusinessLocationPage', { latitude: this.latitude, longitude: this.longitude, name: this.name });
    };
    DescriptionPage.prototype.convertTo12hourFormat = function () {
        var _this = this;
        this.Hours = this.navParams.get('openinghours');
        console.log("openinghours", this.Hours);
        if (this.Hours != null) {
            this.opening_hours = this.Hours.map(function (item) { return Object.assign([], item); });
            console.log("clone", this.opening_hours);
            this.opening_hours.forEach(function (element) {
                if (element[0].includes(".")) {
                    var i = element[0].indexOf(".");
                    var t = element[0].substr(0, i);
                    var k = _this.hours[t];
                    console.log("k", k);
                    element[0] = _this.replaceAt(k, 3, "3");
                }
                else if (element[0] == "closed") {
                    element[0] = "Closed";
                }
                else if (element[0] == "opened") {
                    element[0] = "Opened";
                }
                else {
                    element[0] = _this.hours[element[0]];
                    console.log(element[0]);
                }
                if (element[1].includes(".")) {
                    var i = element[1].indexOf(".");
                    var t = element[1].substr(0, i);
                    var k = _this.hours[t];
                    console.log("k2", k);
                    element[1] = _this.replaceAt(k, 3, "3");
                    console.log(element[1]);
                }
                else if (element[1] == "closed") {
                    element[1] = "Closed";
                }
                else if (element[1] == "opened") {
                    element[1] = "Opened";
                }
                else {
                    element[1] = _this.hours[element[1]];
                    console.log(element[1]);
                }
            });
            console.log(this.Hours, this.opening_hours);
            this.slideflag = true;
        }
    };
    DescriptionPage.prototype.replaceAt = function (string, index, replace) {
        return string.substring(0, index) + replace + string.substring(index + 1);
    };
    DescriptionPage.prototype.Description = function () {
        var _this = this;
        var response = this.server.BusinessInformation(this.placeName);
        var loading = this.loadingCtrl.create({
            content: "loading...",
        });
        loading.present();
        response.subscribe(function (data) {
            _this.data.response = data;
            loading.dismiss();
            _this.details = _this.data.response;
            //     console.log(this.details.info);
            //    console.log(this.details.reviews);
            //   console.log(this.details.info.phone);
            // console.log(this.details.info.name);
            _this.name = _this.details.info.name;
            _this.image = _this.details.info.image;
            _this.phone = _this.details.info.phone;
            _this.email = _this.details.info.email;
            _this.description = _this.details.info.description;
            _this.address = _this.details.info.main_branch_address;
            _this.website = _this.details.info.website;
            _this.reviewData = _this.details.reviews;
            _this.latitude = Number(_this.details.info.latitude);
            _this.longitude = Number(_this.details.info.longitude);
            console.log(_this.latitude, _this.longitude);
            console.log(_this.details.info.latitude, _this.details.info.longitude);
            _this.length = _this.reviewData.length;
            _this.slideChanged();
            console.log("length", _this.length);
        }, function (error) {
            console.log("Oooops!");
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Server times out,please try again',
                buttons: ['Okay']
            });
            alert.present();
        });
    };
    DescriptionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DescriptionPage');
    };
    DescriptionPage.prototype.slideChanged = function () {
        if (this.Hours != null) {
            console.log(this.day);
            this.slides.slideTo(this.day + 2, 1000);
        }
    };
    DescriptionPage.prototype.call = function (number) {
        this.callNumber.callNumber(number, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    DescriptionPage.prototype.addReview = function () {
        var modal = this.modalCtrl.create('AddReviewPage', { place: this.placeName });
        modal.present();
        // this.navCtrl.push('AddReviewPage', { place: this.placeName });
    };
    DescriptionPage.prototype.Email = function (address) {
        this.emailComposer.isAvailable().then(function (available) {
            if (available) {
                //Now we know we can send
            }
        });
        var email = {
            to: address,
            subject: '',
            body: '',
            isHtml: true
        };
        // Send a text message using default options
        this.emailComposer.open(email);
    };
    DescriptionPage.prototype.WebsiteLink = function (link) {
        console.log(link);
        this.iab.create("http://" + link);
        //const browser = this.iab.create('https://ionicframework.com/','_blank');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"])
    ], DescriptionPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Slides"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Slides"])
    ], DescriptionPage.prototype, "slides", void 0);
    DescriptionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-description',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/description/description.html"*/'<!--\n  Generated template for the Description page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n  <ion-navbar color="primary">\n    <ion-title>\n      {{name}}\n    </ion-title>\n\n\n\n\n    <ion-buttons end>\n      <button ion-button style="color:white; float:right" (click)="addReview()" clear small>Review</button>\n    </ion-buttons>\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content style="background-color:#eee" class="Open-Sans-regular">\n\n\n  <ion-card style="padding:5px;">\n\n    <img class="image" src="{{image}}">\n    <div *ngIf="slideflag">\n      <ion-slides style="background: rgba(0, 0, 0, 0.2);" loop slidesPerView="2">\n        <div *ngFor="let hour of opening_hours;let i=index">\n          <ion-slide *ngIf="i== day" style="background:#333;     padding-top: 10px; height: 55px;">\n\n\n            <p style="font-weight:bolder;color:white;padding: 1px;"> {{Week[i]}}</p>\n            <p *ngIf="hour[0] != \'Opened\' && hour[0] != \'Closed\' " style="color:white"> {{hour[0]}} - {{hour[1]}}</p>\n\n            <p *ngIf="hour[0] == \'Closed\' " style="font-size:1.3rem;color:white">Closed</p>\n            <p *ngIf="hour[0] == \'Opened\' " style="font-size:1.3rem;color:white">Open 24 hrs</p>\n\n          </ion-slide>\n          <ion-slide *ngIf="i!= day" style="  height: 55px;  padding-top: 10px;">\n\n            <p style="font-size:1.2rem;font-weight:bolder;color:#333"> {{Week[i]}}</p>\n            <p *ngIf="hour[0] != \'Opened\' && hour[0] != \'Closed\' " style="color:#333"> {{hour[0]}} - {{hour[1]}}</p>\n            <p *ngIf="hour[0] == \'Closed\' " style="color:#333">Closed</p>\n            <p *ngIf="hour[0] == \'Opened\' " style="font-size:1.3rem;color:#333">Open 24 hrs</p>\n\n          </ion-slide>\n        </div>\n      </ion-slides>\n    </div>\n\n    <!-- <ion-row style="    background: rgba(0, 0, 0, 0.3);  width: 300%;">\n \n    <ion-col   style="text-align:center; padding:0;margin:auto; ">\n      \n \n    </ion-col>\n    </ion-row> -->\n\n\n    <div class="strip">\n      <ion-row>\n        <ion-col>\n          <!-- <p style="color:white;font-size:1.8rem;font-weight:bold"> {{name}} </p> -->\n\n\n          <rating [(ngModel)]="rating" readOnly="true" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half" starIconName="star"\n            nullable="false"></rating>\n        </ion-col>\n\n\n\n      </ion-row>\n    </div>\n\n\n    <div class="description">\n      <ion-card-content>\n        <p class="Open-Sans-bold" style=" color: red;    text-align: center;  font-size: 1.6rem;"> {{text}}</p>\n\n        <p style="border-bottom: solid thin ;  padding: 5px; font-size: 1.5rem; color: #343434;"> {{description}}</p>\n        <br>\n        <div *ngIf="point!=\'\'" style="padding-bottom:5px; ">\n\n          <ion-icon name="pin" style=" float:left;  font-size: 2rem; color: #343434;"> </ion-icon>\n          <p style="padding-left:20px;     font-size: 1.8rem;"> {{point}} miles </p>\n        </div>\n        <div *ngIf="phone!= \'\'" (click)="call(phone)" style="   padding-bottom:5px; ">\n          <ion-icon style="float:left; font-size:2rem" name="call"> </ion-icon>\n          <p style="padding-left:20px;     font-size: 1.8rem;color: #009aff; text-decoration: underline;"> {{phone}}</p>\n        </div>\n        <div *ngIf="email!= \'\'" style="padding-bottom:5px" (click)="Email(email)">\n          <ion-icon style=" float:left;      margin-top: 3px;     display: flex;\n     align-items: center;  font-size: 2rem;" name="mail"> </ion-icon>\n          <p style="padding-left:20px;    font-size: 1.8rem; color: #009aff; text-decoration: underline;">{{email}} </p>\n        \n        </div>\n\n\n        <div *ngIf="website!= \'\'" style="padding-bottom:5px; " (click)="WebsiteLink(website)">\n          <ion-icon style="float:left;     margin-top: 4px;    font-size: 2rem; color: #343434;" ios="ios-globe" md="md-globe"> </ion-icon>\n          <p style="padding-left:20px; font-size: 1.8rem;  color: #009aff; text-decoration: underline;">{{website}}</p>\n        </div>\n        <div *ngIf="address!= \'\'" (tap)="Business_location()" style="padding-bottom:5px;">\n          <ion-icon style="float:left;     font-size: 2rem;" name="home"> </ion-icon>\n          <p style="padding-left:20px;    font-size: 1.8rem; color: #009aff; text-decoration: underline;">{{address}} </p>\n        \n        </div>\n\n      </ion-card-content>\n    </div>\n  </ion-card>\n\n\n\n  <div class="reviews">\n\n    <ion-list>\n      <ion-list-header class="Open-Sans-bold" color="primary" style="text-align:center; font-size: 2.6rem !important; padding: 0px !important;\n     margin-top: 5%;">\n        Reviews\n      </ion-list-header>\n      <p *ngIf="length == 0" class="Open-Sans-bold" style=" color:#333;     text-align:center; font-size: 2.0rem !important; ;padding: 10px;\n     margin-top: 5%;">\n        No reviews given yet\n      </p>\n      <ion-card *ngFor="let review of reviewData" style="padding:5px;">\n\n        <!--   <ion-avatar style="margin: -55px 16px 8px 0 !important;" item-left>\n           <img src="https://api.adorable.io/avatars/75/{{review.title}}">\n         </ion-avatar> -->\n\n        <h2>{{review.first_name}} {{review.last_name}}</h2>\n        <rating [(ngModel)]="review.rating" readOnly="true" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half"\n          starIconName="star" nullable="false" (ngModelChange)="onModelChange($event)"></rating>\n        <p>{{review.description}}</p>\n\n\n\n\n      </ion-card>\n\n\n\n\n    </ion-list>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/description/description.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_5__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], DescriptionPage);
    return DescriptionPage;
}());

//# sourceMappingURL=description.js.map

/***/ })

});
//# sourceMappingURL=39.js.map
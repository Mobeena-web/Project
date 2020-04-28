webpackJsonp([38],{

/***/ 730:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDetailPageModule", function() { return EventDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_detail__ = __webpack_require__(928);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventDetailPageModule = (function () {
    function EventDetailPageModule() {
    }
    EventDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_detail__["a" /* EventDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__event_detail__["a" /* EventDetailPage */]),
            ],
        })
    ], EventDetailPageModule);
    return EventDetailPageModule;
}());

//# sourceMappingURL=event-detail.module.js.map

/***/ }),

/***/ 928:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(376);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventDetailPage = (function () {
    function EventDetailPage(socialSharing, navCtrl, navParams) {
        this.socialSharing = socialSharing;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.detail = this.navParams.get('detail');
    }
    EventDetailPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
        console.log('ionViewDidLoad EventDetailPage');
    };
    EventDetailPage.prototype.loadMap = function () {
        var latlng = this.detail.coordinates.split(",");
        var myLatLng = { lat: parseFloat(latlng[0]), lng: parseFloat(latlng[1]) };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: myLatLng
        });
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: ''
        });
    };
    // navigator(){
    //   var latlng = this.detail.coordinates.split(",")
    //   var adress = [];
    //   adress.push(parseFloat(latlng[0]));
    //   adress.push(parseFloat(latlng[1]));
    //   console.log(adress,"address")
    //   let options: LaunchNavigatorOptions = {
    //     // start: 'pakistan',
    //     // app: LaunchNavigator.APP.GOOGLE_MAPS
    //   };
    //   this.launchNavigator.navigate(adress, options)
    //     .then(
    //       success => console.log('Launched navigator'),
    //       error => console.log('Error launching navigator', error)
    //     );
    // }
    EventDetailPage.prototype.share = function (image, title) {
        this.socialSharing.share(title, '', image, '').then(function () {
            // Success!
        }).catch(function () {
            // Error!
        });
    };
    EventDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-detail',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/event-detail/event-detail.html"*/'\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>Event Detail</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only color="royal" (click)="share(detail.image,detail.title)">\n        <ion-icon name="share"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <img src={{detail.image}} class="detail_img">\n\n  <div padding>\n    <h3>{{detail.title}}</h3>\n    <ion-row class="color_time">\n      <ion-col col-1>\n          <ion-icon name="ios-time-outline"></ion-icon>\n      </ion-col>\n      <ion-col col-11>\n        {{detail.date}} at {{detail.time}}\n      </ion-col>\n    </ion-row>\n\n    <div class="color_time linr" [innerHTML]="detail.description">\n     \n    </div>\n\n    <h4>Venue</h4>\n    <div class="color_time">\n      {{detail.address}}\n    </div>\n    <div class="color_time">{{detail.phone}}</div>\n    <div #map id="map"></div>\n    <!-- <button ion-button block round class="btn-margin" color=\'primary\' (click)="navigator()">Show Navigation</button> -->\n\n  </div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/event-detail/event-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], EventDetailPage);
    return EventDetailPage;
}());

//# sourceMappingURL=event-detail.js.map

/***/ })

});
//# sourceMappingURL=38.js.map
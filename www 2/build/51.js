webpackJsonp([51],{

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusinessLocationPageModule", function() { return BusinessLocationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__business_location__ = __webpack_require__(919);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BusinessLocationPageModule = (function () {
    function BusinessLocationPageModule() {
    }
    BusinessLocationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__business_location__["a" /* BusinessLocationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__business_location__["a" /* BusinessLocationPage */]),
            ],
        })
    ], BusinessLocationPageModule);
    return BusinessLocationPageModule;
}());

//# sourceMappingURL=business-location.module.js.map

/***/ }),

/***/ 919:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessLocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BusinessLocationPage = (function () {
    function BusinessLocationPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.latitude = navParams.get('latitude');
        this.longitude = navParams.get('longitude');
        this.business_name = navParams.get('name');
        console.log(this.latitude, this.longitude);
    }
    BusinessLocationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BusinessLocationPage');
        this.loadMap();
    };
    BusinessLocationPage.prototype.loadMap = function () {
        console.log(this.mapElement);
        var latlng = new google.maps.LatLng(this.latitude, this.longitude);
        var mapOptions = {
            center: latlng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        // console.log(position.coords.latitude, position.coords.longitude);
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        //  this.addMarker(position.coords.latitude,position.coords.longitude);
        this.addMarker(this.latitude, this.longitude);
    };
    BusinessLocationPage.prototype.addMarker = function (lat, lng) {
        console.log("hello marker function");
        var latLng = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
        var content = this.business_name;
        this.addInfoWindow(marker, content);
    };
    BusinessLocationPage.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], BusinessLocationPage.prototype, "mapElement", void 0);
    BusinessLocationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-business-location',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/business-location/business-location.html"*/'<!--\n  Generated template for the BusinessLocationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title> Location</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <div #map id="map" style=" width: 100%;\n    height: 100%;">\n </div>\n</ion-content>\n '/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/business-location/business-location.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], BusinessLocationPage);
    return BusinessLocationPage;
}());

//# sourceMappingURL=business-location.js.map

/***/ })

});
//# sourceMappingURL=51.js.map
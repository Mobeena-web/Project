webpackJsonp([40],{

/***/ 759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DealsPageModule", function() { return DealsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__deals__ = __webpack_require__(957);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__ = __webpack_require__(375);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DealsPageModule = (function () {
    function DealsPageModule() {
    }
    DealsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__deals__["a" /* DealsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__deals__["a" /* DealsPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__["a" /* Ionic2RatingModule */]
            ],
        })
    ], DealsPageModule);
    return DealsPageModule;
}());

//# sourceMappingURL=deals.module.js.map

/***/ }),

/***/ 957:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(90);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DealsPage = (function () {
    function DealsPage(toastCtrl, http, diagnostic, app, server, platform, events, globals, geolocation, alertCtrl, modalCtrl, loadingCtrl, _nav, navParams) {
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.diagnostic = diagnostic;
        this.app = app;
        this.server = server;
        this.platform = platform;
        this.events = events;
        this.globals = globals;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this._nav = _nav;
        this.navParams = navParams;
        this.arrayStatus = false;
        this.orderFlag = false;
        this.flag = false;
        this.distance_array = [];
        this.status = false;
        this.pageFlag = false;
        this.searchTerm = '';
        this.number = new Array();
        this.radius = '100000';
        this.offset = 0;
        this.markers_array = [];
        this.getLocation();
        //this.getLocationAddress();
        console.log(this.option);
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormControl"]();
        this.selectOptions = {
            title: 'Distance'
        };
    }
    DealsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad DealsPage');
        // this.option = 'deals';
        this.option = 'places';
        this.searchControl.valueChanges.debounceTime(700).subscribe(function (search) {
            _this.setFilteredItems();
        });
    };
    DealsPage.prototype.dataitems = function () {
        var _this = this;
        this.getdealdetail = this.server.getdeals().subscribe(function (data) {
            _this.dataofitem = data['result'];
            console.log("our data is here", data.result);
        });
    };
    DealsPage.prototype.doInfinite = function () {
        var _this = this;
        console.log('Begin async operation');
        this.offset += 10;
        return new Promise(function (resolve, enable) {
            var response = _this.server.getRestaurantslist(_this.radius, 'branches', _this.coordinates, _this.offset, 'deals');
            response.subscribe(function (data) {
                if (data.status == 'true') {
                    data.results.forEach(function (element) {
                        _this.places.push(element);
                    });
                    resolve();
                    console.log(_this.places);
                    console.log(_this.places.success);
                    if (data.success == 'No data') {
                        _this.arrayStatus = true;
                    }
                    else {
                        _this.arrayStatus = false;
                        _this.places_array = _this.places;
                    }
                    _this.flag = false;
                    _this.content.resize();
                }
                else {
                    // this.presentToast();
                    enable(false);
                }
            }, function (error) {
                console.log("Error!");
                var alert = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Server times out, please try again',
                    buttons: ['Okay']
                });
                alert.present();
                enable(false);
            });
            console.log('Async operation has ended');
        });
    };
    DealsPage.prototype.getLocation = function () {
        // this.diagnostic.isLocationEnabled()
        //     .then((state) => {
        //         console.log(state);
        //         if (state) {
        //             this.status = false;
        var _this = this;
        this.arrayStatus = false;
        this.flag = true;
        if (this.globals.delivery == true) {
            this.geolocation.getCurrentPosition().then(function (position) {
                console.log("geo lat", _this.Geocoder_lat, _this.Geocoder_lng);
                _this.coordinates = position.coords.latitude + "," + position.coords.longitude;
                _this.list();
                console.log("map extract address", _this.coordinates);
            }, function (err) {
                console.log(err);
            });
        }
        // } else {
        //     this.status = true;
        //     let alert = this.alertCtrl.create({
        //         title: 'Location is disabled',
        //         subTitle: 'In order to proceed, please enable your location.',
        //         buttons: ['Okay']
        //     });
        //     alert.present();
        // }
        // }).catch(e => console.error(e));
    };
    DealsPage.prototype.secondapi = function () {
    };
    DealsPage.prototype.list = function () {
        var _this = this;
        console.log("coordinates", this.coordinates);
        // this.arrayStatus = false;
        // this.flag = true;
        // this.geolocation.getCurrentPosition().then((position)=>{
        //  this.coordinates = position.coords.latitude+","+position.coords.longitude
        //  this.lat = position.coords.latitude;
        //  this.long = position.coords.longitude;
        var response = this.server.getRestaurantslist(this.radius, 'branches', this.coordinates, this.offset, 'deals');
        response.subscribe(function (data) {
            console.log("data", data);
            console.log(_this.places);
            //console.log(this.places.success);
            console.log(data.success, data.status);
            if (data.status == 'false') {
                console.log("if check true");
                _this.arrayStatus = true;
            }
            else {
                _this.places = data.results;
                _this.arrayStatus = false;
                _this.places_array = _this.places;
            }
            _this.flag = false;
            _this.content.resize();
        }, function (error) {
            console.log("Error!");
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Server times out, please try again',
                buttons: ['Okay']
            });
            alert.present();
        });
        // },(err)=>{
        //     console.log(err);
        // });
    };
    // presentToast() {
    //     let toast = this.toastCtrl.create({
    //       message: 'Showing all data.',
    //       duration: 3000
    //     });
    //     toast.present();
    //   }
    DealsPage.prototype.SegmentChange = function () {
        if (this.option == 'map' && !this.mapShownFlag) {
            this.loadMap();
            this.getMarkers();
            this.mapShownFlag = true;
        }
    };
    DealsPage.prototype.setFilteredItems = function () {
        // if(this.places !== undefined)
        // {
        //     this.places =    this.places_array.filter((item) => {
        //         return item.keywords.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ;
        //     });
        // }
        // else{
        //     return;
        // }
        //console.log("filtered items",this.places);
        var _this = this;
        if (this.searchTerm.length >= 3) {
            var response = this.server.LiveSearch(this.searchTerm.toLowerCase(), this.coordinates, this.radius, 'branches');
            response.subscribe(function (data) {
                console.log(data);
                if (data.status == 'true') {
                    _this.places = data.results;
                }
                else {
                    return;
                }
            }, function (error) {
                console.log(error);
            });
        }
        if (this.searchTerm == '') {
            this.offset = 0;
            var response = this.server.getRestaurantslist(this.radius, 'branches', this.coordinates, this.offset, 'deals');
            response.subscribe(function (data) {
                _this.places = data.results;
            }, function (error) {
                console.log("Error!");
                var alert = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Server times out, please try again',
                    buttons: ['Okay']
                });
                alert.present();
            });
        }
    };
    DealsPage.prototype.description = function (data, distance, offer, rating, hours) {
        console.log("hours", hours);
        this._nav.push('DescriptionPage', { details: data, location: distance, offerText: offer, average_rating: rating, openinghours: hours });
    };
    DealsPage.prototype.Reviews = function (data) {
        // let modal = this.modalCtrl.create('ReviewsPage', { place: data});
        // modal.present();
        this._nav.push('ReviewsPage', { place: data });
    };
    //     getLocationAddress() {
    //         //this.getLocation();
    //         console.log("check get location address function");
    //         this.geolocation.getCurrentPosition().then((res)=>{
    //             this.Geocoder_lat = res.coords.latitude;
    //             this.Geocoder_lng = res.coords.longitude;
    //             console.log("geocoder lattitude",this.Geocoder_lat, this.Geocoder_lng);
    //         this.nativeGeocoder.reverseGeocode(res.coords.latitude, res.coords.longitude)
    //             .then((result: NativeGeocoderReverseResult) => {
    //                 console.log("testing result$$$",result);
    //                 console.log("testing results with json ",JSON.stringify(result[0] ));
    //                 let str : string   = `The reverseGeocode address is ${result.countryCode} in ${result.postalCode}`;
    //                 console.log("geocoder string",str);
    //                 console.log("@@@!!!!!....???checking adb logcat for location ",result[0].countryName);
    //                 console.log("checking geocoders");
    //                 alert("!!!!!!The address is: \n\n" + str + JSON.stringify(result[0] ) + result[0].countryName) ;
    //             })
    //             .catch((error: any) =>{console.log("geocoder error",error), alert(("data not found")) } );
    //     })
    // }
    DealsPage.prototype.OrderCategory = function (businessId, paypalId, discountvalue, stripeId, hours, min, time, deliveryFee, tax) {
        console.log("id", businessId);
        this.globals.bussinessId = businessId;
        console.log("businessdiscount", this.globals.BusinessDiscount);
        this.globals.estimated_time = time;
        this.globals.StripId = stripeId;
        this.globals.Timing = hours;
        this.globals.deliveryCharges = deliveryFee;
        this.globals.tax = tax;
        console.log("min", min);
        if (min == '') {
            this.globals.minimun_order = 0;
        }
        else {
            this.globals.minimun_order = Number(min);
        }
        console.log("time", this.globals.Timing);
        this._nav.push('CategoryPage', { pageflag: this.pageFlag, BusinessId: businessId, paypal: paypalId, discount: discountvalue });
    };
    DealsPage.prototype.getMarkers = function () {
        var _this = this;
        this.http.get('http://34.203.122.153/api/adsonscanapp/index.php/customer_controller/getplaces')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.addMarkersToMap(data);
            console.log("google map", _this.data);
        });
    };
    DealsPage.prototype.addMarkersToMap = function (markers) {
        console.log(markers);
        for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
            var marker = markers_1[_i];
            var latLng = new google.maps.LatLng(marker.latitude, marker.longitude);
            var mark = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: latLng
            });
            var content = marker.name;
            this.addInfoWindow(mark, content);
            console.log("content", content);
        }
    };
    DealsPage.prototype.loadMap = function () {
        var _this = this;
        console.log("load map element ", this.mapElement);
        if (this.globals.delivery == true) {
            this.geolocation.getCurrentPosition().then(function (position) {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var mapOptions = {
                    center: latlng,
                    zoom: 11,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                _this.Geocoder_lat = position.coords.latitude;
                _this.Geocoder_lng = position.coords.longitude;
                console.log("load map function", position.coords.latitude, position.coords.longitude);
                _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
                //  this.addMarker(position.coords.latitude,position.coords.longitude);
                _this.getMarkers();
                _this.addMarker(position.coords.latitude, position.coords.longitude);
            }, function (err) {
                console.log(err);
            });
        }
    };
    DealsPage.prototype.addMarker = function (lat, lng) {
        console.log("hello marker function");
        var latLng = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
        var content = "<h4>User</h4>";
        this.addInfoWindow(marker, content);
    };
    DealsPage.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    DealsPage.prototype.doRefresh = function (refresher) {
        this.offset = 0;
        this.getLocation();
        this.content.resize();
        refresher.complete();
    };
    DealsPage.prototype.Radiusvalue = function () {
        this.offset = 0;
        this.radius = '100000';
        this.list();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], DealsPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('pleaseConnect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], DealsPage.prototype, "pleaseConnect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"])
    ], DealsPage.prototype, "content", void 0);
    DealsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-deals',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/deals/deals.html"*/'<!--\n  Generated template for the DealsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Deals</ion-title>\n    <ion-buttons *ngIf="option == \'deals\'" end style="    width: 30%;">\n\n      <ion-icon style="color:white;font-size:3rem; float:right;margin-top:2px" name="options"> </ion-icon>\n\n\n      <ion-select style="font-weight: bold;  max-width: unset;width: 76px;   padding-left: 0;\n        padding-right: 5px;  float: right;padding-bottom: 0;\n        color: white;" (ionChange)="Radiusvalue()" [(ngModel)]="radius" [selectOptions]="selectOptions">\n\n        <ion-option value="5">5 miles</ion-option>\n        <ion-option value="10">10 miles</ion-option>\n        <ion-option value="50">50 miles</ion-option>\n        <ion-option value="100">100 miles</ion-option>\n\n        <ion-option value="100000" [selected]="true">All</ion-option>\n\n      </ion-select>\n\n\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n  <ion-segment color="primary" style="padding:5px" [(ngModel)]="option" (ionChange)="SegmentChange()">\n    <ion-segment-button value="places" >\n      Deals\n    </ion-segment-button>\n\n    <ion-segment-button value="deals">\n      Places\n    </ion-segment-button>\n    <ion-segment-button value="map">\n      Map\n    </ion-segment-button>\n  </ion-segment>\n\n\n  <div [ngSwitch]="option">\n    <ion-list *ngSwitchCase="\'places\'">\n \n      <ion-card *ngFor="let items of dataofitem" >\n          <img src="assets/imgs/banner.png"/>\n          <div class="card-title">        \n            <ion-row>\n              <ion-col col-8><h2>{{items.title}}</h2></ion-col>\n              <p>{{items.expiry}}</p>\n            </ion-row>\n            <!-- </ion-item> -->\n            </div>\n           <div class="card-subtitle">\n           <!-- <div style="height: 50%"> -->\n            <ion-card-content style="min-height:0px;">\n              <p style="min-height: 57px">{{items.description}}</p>\n            </ion-card-content> \n            <!-- </div> -->\n            <ion-row>\n                <ion-col>\n                  <button ion-button icon-left clear small>\n                    <ion-icon name="thumbs-up" class="buynow"></ion-icon>\n                    <div class="buynow">12 Remaining</div>\n                  </button>\n                </ion-col>\n                <ion-col>\n                  <button ion-button icon-left clear small>\n                    <ion-icon name="text" class="buynow"></ion-icon>\n                    <div class="buynow">Buy Now</div>\n                  </button>\n                </ion-col>\n              </ion-row>     \n          </div>\n\n           \n        </ion-card>\n        \n\n        <ion-card  >\n          <img src="assets/imgs/banner.png"/>\n          <div class="card-title">        \n            <ion-row>\n              <ion-col col-8><h2>Abdul Mateen</h2></ion-col>\n              <p>10/5/2018</p>\n            </ion-row>\n            <!-- </ion-item> -->\n            </div>\n           <div class="card-subtitle">\n            <ion-card-content>\n              <p> want to get some data but in the new result data like above , thank you in advanced</p>\n            </ion-card-content>  \n            <ion-row>\n                <ion-col>\n                  <button ion-button icon-left clear small>\n                    <ion-icon name="thumbs-up" class="buynow"></ion-icon>\n                    <div class="buynow">12 Remaining</div>\n                  </button>\n                </ion-col>\n                <ion-col>\n                  <button ion-button icon-left clear small>\n                    <ion-icon name="text" class="buynow"></ion-icon>\n                    <div class="buynow">Buy Now</div>\n                  </button>\n                </ion-col>\n              </ion-row>      \n          </div>\n\n           \n        </ion-card>\n\n      \n\n\n               \n    </ion-list></div>\n\n\n  <div [ngClass]="{ \'hide\': option != \'deals\' }">\n    <ion-searchbar *ngIf="!status" [(ngModel)]="searchTerm" (input)="setFilteredItems()" [formControl]="searchControl"></ion-searchbar>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n      <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull down to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n      </ion-refresher-content>\n    </ion-refresher>\n\n\n    <p style="text-align: center; margin-top: 60%;" *ngIf="flag">Fetching data... </p>\n    <p style="text-align: center; margin-top: 60%;" *ngIf="arrayStatus">No place available in this range. </p>\n    <div *ngIf="!arrayStatus && !flag">\n      <ion-card *ngFor="let place of places;let k = index" style="    margin-right: 4px !important;\n              margin-left: 4px !important; width: calc(100% - 8px)!important;">\n        <ion-grid>\n          <ion-row>\n            <ion-col col-3 (tap)="description(place.username,place.distanceValue,place.offer_text,place.average_rating,place.hours_operation)">\n              <ion-thumbnail>\n                <img class="image" src="{{place.logo}}">\n              </ion-thumbnail>\n\n            </ion-col>\n\n            <ion-col col-5 (tap)="description(place.username,place.distanceValue,place.offer_text,place.average_rating,place.hours_operation)">\n              <p class="Open-Sans-bold" class="heading">{{place.name}} </p>\n\n\n              <rating class="rating" [(ngModel)]="place.average_rating" readOnly="true" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half"\n                starIconName="star" nullable="false"></rating>\n\n              <p class="Open-Sans-bold" class="offer-text">{{place.offer_text}} </p>\n\n\n            </ion-col>\n\n            <ion-col style="padding: 0px !important;" col-4>\n              <p class="Open-Sans-regular" color="primary" class="distance" (tap)="description(place.username,place.distanceValue,place.offer_text,place.hours_operation)">\n                <ion-icon name="pin"> </ion-icon> {{place.distanceValue}} mi</p>\n\n              <button color="primary" *ngIf="place.orders_enabled == \'active\'" ion-button small block class="order-btn" (click)="OrderCategory(place.business_id,place.paypal_id,place.discount,place.stripe_id,place.hours_operation,place.minimum_order,place.delivery_time,place.delivery_fee,place.tax)">\n                <ion-icon name="cart"> </ion-icon>\n              </button>\n              <button ion-button small block color="primary" class="review-btn" (click)="Reviews(place.username)">\n                <ion-icon name="list-box"> </ion-icon>\n              </button>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n    </div>\n    <ion-infinite-scroll threshold="2px" (ionInfinite)="$event.waitFor(doInfinite())">\n      <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">\n      </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n\n  </div>\n\n  <div style="width:100%;height:100%" [ngClass]="{ \'hide\': option != \'map\' }">\n    <div #map id="map" style=" width: 100%;\n                      height: 100%;">\n    </div>\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/deals/deals.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], DealsPage);
    return DealsPage;
}());

//# sourceMappingURL=deals.js.map

/***/ })

});
//# sourceMappingURL=40.js.map
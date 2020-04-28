webpackJsonp([14],{

/***/ 762:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReservationPageModule", function() { return ReservationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reservation__ = __webpack_require__(959);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__ = __webpack_require__(375);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ReservationPageModule = (function () {
    function ReservationPageModule() {
    }
    ReservationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__reservation__["a" /* ReservationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__reservation__["a" /* ReservationPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__["a" /* Ionic2RatingModule */]
            ],
        })
    ], ReservationPageModule);
    return ReservationPageModule;
}());

//# sourceMappingURL=reservation.module.js.map

/***/ }),

/***/ 959:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReservationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_diagnostic__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(91);
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
 * Generated class for the ReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReservationPage = (function () {
    function ReservationPage(toastCtrl, diagnostic, server, nativeStorage, events, app, globals, alertCtrl, geolocation, loadingCtrl, navCtrl, navParams) {
        this.toastCtrl = toastCtrl;
        this.diagnostic = diagnostic;
        this.server = server;
        this.nativeStorage = nativeStorage;
        this.events = events;
        this.app = app;
        this.globals = globals;
        this.alertCtrl = alertCtrl;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
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
        this.userChoices = [];
        this.value = 3600;
        this.ordersListFlag = false;
        this.orderPlacedFlag = false;
        this.items = [];
        this.textdisocunt = navParams.get('discount_text');
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["FormControl"]();
        this.radius = navParams.data;
        this.option = 'restaurants';
        // events.subscribe('Radius1', (radius) => {
        //     this.radius = radius;
        // this.list();
        // });
        this.getLocation();
        this.getReservations();
    }
    ReservationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReservationPage');
    };
    ReservationPage.prototype.getLocation = function () {
        var _this = this;
        this.arrayStatus = false;
        this.flag = true;
        if (this.globals.delivery == true) {
            this.geolocation.getCurrentPosition().then(function (position) {
                _this.coordinates = position.coords.latitude + "," + position.coords.longitude;
                _this.list();
            }, function (err) {
                console.log(err);
            });
        }
    };
    ReservationPage.prototype.OrderCategory = function (orders_enabled, businessId, paypalId, discountvalue, stripeId, hours, min, time, deliveryFee, tax, delivery, pickup, admin_stripe) {
        console.log("id", businessId);
        this.globals.bussinessId = businessId;
        console.log(this.globals.bussinessId);
        this.globals.paypalId = paypalId;
        console.log("businessdiscount", this.globals.BusinessDiscount);
        this.globals.estimated_time = time;
        this.globals.StripId = stripeId;
        this.globals.Timing = hours;
        this.globals.tax = tax;
        this.globals.deliveryCharges = deliveryFee;
        this.globals.admin_stripe = admin_stripe;
        console.log(this.globals.admin_stripe);
        console.log(delivery, pickup, this.globals.delivery, this.globals.pickup);
        if (delivery == '0') {
            this.globals.delivery = false;
        }
        else {
            this.globals.delivery = true;
        }
        if (pickup == '0') {
            this.globals.pickup = false;
        }
        else {
            console.log("else");
            this.globals.pickup = true;
        }
        console.log("min", min);
        if (min == '') {
            this.globals.minimun_order = 0;
        }
        else {
            this.globals.minimun_order = Number(min);
        }
        console.log("time", this.globals.Timing);
        console.log(delivery, pickup, this.globals.delivery, this.globals.pickup);
        this.navCtrl.push('ReservationCheckingPage', { ordersEnabled: orders_enabled });
    };
    ReservationPage.prototype.doInfinite = function () {
        var _this = this;
        console.log('Begin async operation');
        this.offset += 10;
        return new Promise(function (resolve, enable) {
            var response = _this.server.getRestaurantslist(_this.radius, 'branches', _this.coordinates, _this.offset, 'reservation');
            response.subscribe(function (data) {
                if (data.status == 'true') {
                    data.results.forEach(function (element) {
                        _this.places.push(element);
                    });
                    resolve();
                    console.log(_this.places);
                    console.log(_this.places.success);
                    if (typeof _this.places.success != 'undefined' && _this.places.success == 'No data') {
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
                    _this.presentToast();
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
    ReservationPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Showing all data.',
            duration: 3000
        });
        toast.present();
    };
    ReservationPage.prototype.setFilteredItems = function () {
        var _this = this;
        // this.dataService.placedata();
        // if(this.places !== undefined)
        // {
        //     this.places = this.places_array.filter((item) => {
        //         return item.keywords.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ;
        //     });
        // }
        // else{
        //     return;
        // }
        console.log(this.searchTerm);
        if (this.searchTerm.length >= 3) {
            var response = this.server.LiveSearch(this.searchTerm.toLowerCase(), this.coordinates, this.radius, 'main');
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
        if (!this.searchTerm) {
            console.log("else", this.searchTerm);
            this.offset = 0;
            var response = this.server.getRestaurantslist(this.radius, 'main', this.coordinates, this.offset.toString(), 'reservation');
            response.subscribe(function (data) {
                _this.places = data.results;
                console.log(_this.places);
            }, function (error) {
                console.log(error);
                _this.flag = false;
                var alert = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Server times out, please try again',
                    buttons: ['OK']
                });
                alert.present();
            });
        }
    };
    ReservationPage.prototype.list = function () {
        //  this.diagnostic.isLocationEnabled()
        //   .then((state) => {
        //  console.log(state);
        //    if (state){
        // this.status = false;
        // console.log("if ",state)
        var _this = this;
        //  this.arrayStatus = false;
        //     this.flag = true;
        // this.geolocation.getCurrentPosition().then((position)=>{
        //     this.coordinates = position.coords.latitude+","+position.coords.longitude
        console.log(this.radius, this.coordinates);
        var response = this.server.getRestaurantslist(this.radius, 'main', this.coordinates, this.offset.toString(), 'reservation');
        response.subscribe(function (data) {
            _this.places = data.results;
            console.log("mobilecheck", _this.mobileFlagcheck);
            console.log(_this.places);
            if (typeof _this.places.success != 'undefined' && _this.places.success == 'No data') {
                console.log("heloo");
                _this.arrayStatus = true;
                _this.flag = false;
            }
            else {
                _this.flag = false;
                _this.arrayStatus = false;
                _this.places_array = _this.places;
            }
        }, function (error) {
            console.log(error);
            _this.flag = false;
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Server times out, please try again',
                buttons: ['OK']
            });
            alert.present();
        });
        // },(err)=>{
        //     console.log(err);
        // });
        // } else {
        //         this.status = true;
        //   let alert = this.alertCtrl.create({
        //     title: 'Location is disabled',
        //     subTitle: 'In order to proceed, Please enable your location',
        //     buttons: ['OK']
        //  });
        //     alert.present();
        //   }
        //  }).catch(e => console.error(e));
    };
    ReservationPage.prototype.Reviews = function (data) {
        // let modal = this.modalCtrl.create('ReviewsPage', { place: data});
        // modal.present();
        this.navCtrl.push('ReviewsPage', { place: data });
    };
    ReservationPage.prototype.getReservations = function () {
        var _this = this;
        var res = this.server.getReservations()
            .subscribe(function (data) {
            console.log(data);
            if (data.status == 'true') {
                _this.reservations = data.reservation;
                console.log(_this.reservations);
            }
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Server times out, please try again',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    ReservationPage.prototype.doRefresh = function (refresher) {
        this.offset = 0;
        this.getLocation();
        this.content.resize();
        refresher.complete();
    };
    ReservationPage.prototype.doRefresh1 = function (refresher) {
        this.offset = 0;
        this.getReservations();
        this.content.resize();
        refresher.complete();
    };
    ReservationPage.prototype.ShowNotes = function (order) {
        if (order.notes != '') {
            var alert_1 = this.alertCtrl.create({
                title: 'Notes',
                subTitle: order.notes,
                buttons: ['Okay']
            });
            alert_1.present();
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'Oops',
                subTitle: 'No Notes given.',
                buttons: ['Okay']
            });
            alert_2.present();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"])
    ], ReservationPage.prototype, "content", void 0);
    ReservationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-reservation',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/reservation/reservation.html"*/'<!--\n  Generated template for the ReservationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Reservation</ion-title>\n    <!-- <ion-buttons *ngIf="option == \'orders\'" end style="    width: 30%;">\n    \n      <ion-icon style="color:white;font-size:3rem; float:right;margin-top:2px" name="options" > </ion-icon> \n    \n    \n        <ion-select style="font-weight: bold;  max-width: unset;width: 76px;   padding-left: 0;\n        padding-right: 5px;  float: right;padding-bottom: 0;\n        color: white;"  (ionChange)="Radiusvalue()" [(ngModel)]="radius" [selectOptions]="selectOptions">\n     \n          <ion-option value="5">5 miles</ion-option>  \n          <ion-option value="10">10 miles</ion-option>\n             <ion-option value="50">50 miles</ion-option>\n          <ion-option value="100">100 miles</ion-option>\n    \n          <ion-option value="100000" [selected] = "true">All</ion-option>\n    \n        </ion-select>  \n        \n    \n     </ion-buttons> -->\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-segment color="primary" style="padding:10px" [(ngModel)]="option">\n    <ion-segment-button value="restaurants">\n      Restaurants\n    </ion-segment-button>\n    <ion-segment-button value="others">\n      Others\n    </ion-segment-button>\n    <ion-segment-button value="my_reservation">\n      My Reservations\n    </ion-segment-button>\n  </ion-segment>\n\n  <div [ngSwitch]="option">\n    <div *ngSwitchCase="\'restaurants\'">\n      <ion-searchbar [(ngModel)]="searchTerm" (input)="setFilteredItems()" [formControl]="searchControl"></ion-searchbar>\n\n      <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull down to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n        </ion-refresher-content>\n      </ion-refresher>\n\n      <p style="text-align: center; margin-top: 60%;" *ngIf="flag == true">Fetching data... </p>\n      <p style="text-align: center; margin-top: 60%;" *ngIf="arrayStatus">No place available in this range... </p>\n      <div *ngIf="!arrayStatus && !flag">\n        <div *ngFor="let place of places">\n          <ion-card *ngIf="place.orders_enabled == \'active\'">\n            <ion-grid>\n              <ion-row>\n                <ion-col col-3 (tap)="OrderCategory(place.orders_enabled,place.business_id,place.paypal_id,place.discount,place.stripe_id,place.hours_operation,place.minimum_order,place.delivery_time,place.delivery_fee,place.tax,place.delivery,place.pickup,place.admin_stripe_enabled)">\n                  <img class="image" src="{{place.logo}}">\n                </ion-col>\n\n                <ion-col col-6 (tap)="OrderCategory(place.orders_enabled,place.business_id,place.paypal_id,place.discount,place.stripe_id,place.hours_operation,place.minimum_order,place.delivery_time,place.delivery_fee,place.tax,place.delivery,place.pickup,place.admin_stripe_enabled)">\n                  <p class="Open-Sans-bold" class="heading">{{place.name}} </p>\n\n                  <rating class="rating" [(ngModel)]="place.average_rating" readOnly="true" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half"\n                    starIconName="star" nullable="false"></rating>\n\n                  <!-- <div> -->\n                    <!-- <div style="display:inline-block;">\n                      <p class="delivery" *ngIf="place.delivery_time != \'\' ">\n                        <ion-icon ios="ios-time-outline" md="md-time"> </ion-icon> Delivery time: {{place.delivery_time}} min </p>\n                    </div>\n                    <div style="display:inline-block;">\n                      <p class="delivery" *ngIf="place.delivery_fee != \'\' ">\n                        <ion-icon ios="ios-bicycle" md="md-bicycle"> </ion-icon> Delivery charges: ${{place.delivery_fee}} </p>\n                    </div>\n                  </div> -->\n                  <p *ngIf="place.discount_text" class="Open-Sans-bold" class="discount-text">{{place.discount_text}}, {{place.discount}}% </p>\n\n\n                </ion-col>\n\n                <ion-col style="padding: 0px !important;" col-3>\n                  <p class="Open-Sans-regular" color="primary" class="distance">\n                    <ion-icon name="pin"> </ion-icon> {{place.distanceValue}} mi </p>\n\n                  <button ion-button small block class="review-btn" (tap)="Reviews(place.username)">\n                    <ion-icon name="list-box"> </ion-icon>\n                  </button>\n                </ion-col>\n              </ion-row>\n\n            </ion-grid>\n\n          </ion-card>\n        </div>\n      </div>\n      <ion-infinite-scroll (ionInfinite)="$event.waitFor(doInfinite())" threshold="2px">\n        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">\n        </ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n\n    </div>\n\n    <div *ngSwitchCase="\'others\'">\n      <ion-searchbar [(ngModel)]="searchTerm" (input)="setFilteredItems()" [formControl]="searchControl"></ion-searchbar>\n\n\n      <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull down to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n        </ion-refresher-content>\n      </ion-refresher>\n\n\n      <p style="text-align: center; margin-top: 60%;" *ngIf="flag == true">Fetching data... </p>\n      <p style="text-align: center; margin-top: 60%;" *ngIf="arrayStatus">No place available in this range... </p>\n      <div *ngIf="!arrayStatus && !flag">\n        <div *ngFor="let place of places">\n          <ion-card *ngIf="place.orders_enabled != \'active\'">\n            <ion-grid>\n              <ion-row>\n                <ion-col col-3 (tap)="OrderCategory(place.orders_enabled,place.business_id,place.paypal_id,place.discount,place.stripe_id,place.hours_operation,place.minimum_order,place.delivery_time,place.delivery_fee,place.tax,place.delivery,place.pickup,place.admin_stripe_enabled)">\n                  <img class="image" src="{{place.logo}}">\n                </ion-col>\n\n                <ion-col col-6 (tap)="OrderCategory(place.orders_enabled,place.business_id,place.paypal_id,place.discount,place.stripe_id,place.hours_operation,place.minimum_order,place.delivery_time,place.delivery_fee,place.tax,place.delivery,place.pickup,place.admin_stripe_enabled)">\n                  <p class="Open-Sans-bold" class="heading">{{place.name}} </p>\n\n                  <rating class="rating" [(ngModel)]="place.average_rating" readOnly="true" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half"\n                    starIconName="star" nullable="false"></rating>\n   \n                  <!-- <div>\n                    <div style="display:inline-block;">\n                      <p class="delivery" *ngIf="place.delivery_time != \'\' ">\n                        <ion-icon ios="ios-time-outline" md="md-time"> </ion-icon> Delivery time: {{place.delivery_time}} min </p>\n                    </div>\n                    <div style="display:inline-block;">\n                      <p class="delivery" *ngIf="place.delivery_fee != \'\' ">\n                        <ion-icon ios="ios-bicycle" md="md-bicycle"> </ion-icon> Delivery charges: ${{place.delivery_fee}} </p>\n                    </div>\n                  </div> -->\n                  <p *ngIf="place.discount_text" class="Open-Sans-bold" class="discount-text">{{place.discount_text}}, {{place.discount}}% </p>\n\n\n                </ion-col>\n\n                <ion-col style="padding: 0px !important;" col-3>\n                  <p class="Open-Sans-regular" color="primary" class="distance">\n                    <ion-icon name="pin"> </ion-icon> {{place.distanceValue}} mi </p>\n\n                  <button ion-button small block class="review-btn" (tap)="Reviews(place.username)">\n                    <ion-icon name="list-box"> </ion-icon>\n                  </button>\n                </ion-col>\n              </ion-row>\n\n            </ion-grid>\n\n          </ion-card>\n        </div>\n      </div>\n      <ion-infinite-scroll (ionInfinite)="$event.waitFor(doInfinite())" threshold="2px">\n        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">\n        </ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n\n\n    </div>\n    <div *ngSwitchCase="\'my_reservation\'">\n        <ion-refresher (ionRefresh)="doRefresh1($event)">\n            <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull down to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n            </ion-refresher-content>\n          </ion-refresher>\n\n      <div *ngFor="let order of reservations; let i =index">\n        <ion-card (click)="ShowNotes(order)">\n          <ion-row>\n            <ion-col *ngIf="order.order_status == \'PENDING\'" col-2 style="    background: #e67e22; color: #fff;  margin: 0;padding-top: 15px;">\n              <p class="index">{{i+1}} </p>\n            </ion-col>\n            <ion-col *ngIf="order.order_status == \'COMPLETED\'" col-2 style="    background: #2ecc71; color: #fff;  margin: 0;padding-top: 15px;">\n              <p class="index">{{i+1}} </p>\n            </ion-col>\n\n            <ion-col col-6>\n\n              <p style="    FONT-SIZE: 1.8rem;\n                 font-weight: bold;\n                margin-left:5px;\n                 margin-top: 0;">{{order.business_name}}</p>\n\n              <p style="  margin-left:5px;  font-size: 1.6rem;"> Scheduled time: {{order.time}}</p>\n              <p style="  margin-left:5px;  font-size: 1.6rem;" > Placed time: {{order.placed_time}}</p>\n            </ion-col>\n\n            <ion-col col-4 style="text-align: center;">\n              <!-- <p class="order-total">  ${{order.total}}</p> -->\n              <p style="font-weight: bold;">People# {{order.persons}}</p>\n              <p class="status">{{order.order_status}}</p>\n\n\n            </ion-col>\n\n\n          </ion-row>\n\n\n        </ion-card>\n      </div>\n\n\n    </div>\n\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/reservation/reservation.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_2__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_5__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], ReservationPage);
    return ReservationPage;
}());

//# sourceMappingURL=reservation.js.map

/***/ })

});
//# sourceMappingURL=14.js.map
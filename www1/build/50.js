webpackJsonp([50],{

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusinessLoginPageModule", function() { return BusinessLoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__business_login__ = __webpack_require__(920);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BusinessLoginPageModule = (function () {
    function BusinessLoginPageModule() {
    }
    BusinessLoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__business_login__["a" /* BusinessLoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__business_login__["a" /* BusinessLoginPage */]),
            ],
        })
    ], BusinessLoginPageModule);
    return BusinessLoginPageModule;
}());

//# sourceMappingURL=business-login.module.js.map

/***/ }),

/***/ 920:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BusinessLoginPage = (function () {
    function BusinessLoginPage(nativeStorage, loadingCtrl, server, globals, navCtrl, navParams) {
        this.nativeStorage = nativeStorage;
        this.loadingCtrl = loadingCtrl;
        this.server = server;
        this.globals = globals;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    BusinessLoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BusinessLoginPage');
    };
    BusinessLoginPage.prototype.login_business = function () {
        var _this = this;
        console.log(this.username);
        console.log(this.password);
        if (this.username && this.password) {
            var loading_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loading_1.present();
            var response = this.server.business_login(this.username, this.password);
            response.subscribe(function (data) {
                loading_1.dismiss();
                console.log(data);
                _this.data = data;
                console.log(_this.data.id);
                if (_this.data.status == 'true') {
                    _this.list();
                    _this.nativeStorage.setItem('business', {
                        business_username: _this.username,
                        business_id: _this.data.id,
                        business_password: _this.password
                    }).then(function () {
                        _this.globals.business_username = _this.username;
                        _this.globals.new_id = _this.data.id;
                        _this.globals.business_password = _this.password;
                        _this.list();
                        _this.navCtrl.setRoot('BeforeLoginPage');
                    })
                        .catch(function (err) {
                        console.log("nativesstorage", err);
                        _this.globals.business_username = _this.username;
                        _this.globals.new_id = _this.data.id;
                        _this.globals.business_password = _this.password;
                        _this.list();
                        _this.navCtrl.setRoot('BeforeLoginPage');
                    });
                }
                else {
                    _this.globals.presentToast("Invalid Email or Password");
                }
            }, function (error) {
                _this.globals.presentToast("Something went wrong check your internet connection.");
            });
        }
        else {
            this.globals.presentToast('Something Missing.Please Fill All Required Fields');
        }
        // if(this.username && this.password){
        //       this.nativeStorage.setItem('business',
        //         {
        //           business_username: this.username,
        //           business_id:this.password
        //         }).then(() => {
        //           this.globals.business_username = this.username;
        //           this.globals.new_id = this.password
        //           this.list();
        //             this.navCtrl.setRoot('BeforeLoginPage')
        //         })
        //         .catch((err) => {
        //           console.log(err)
        //           this.globals.business_username = this.username;
        //           this.globals.new_id = this.password
        //           this.list();
        //             this.navCtrl.setRoot('BeforeLoginPage')
        //         });
        // }
        // else{
        //   this.globals.presentToast('Something Missing.Please Fill All Required Fields')
        // }
    };
    BusinessLoginPage.prototype.list = function () {
        var _this = this;
        var response = this.server.getRestaurantslist('100000', 'main', "0,0", '0', 'order');
        response.subscribe(function (data) {
            _this.places = data.results;
            var new_id = _this.globals.new_id;
            _this.globals.business_list = _this.places;
            _this.places = _this.places.filter(function (item) {
                return item.business_id === new_id;
            });
            _this.globals.point_check = _this.places[0].points_enabled;
            _this.globals.punch_check = _this.places[0].punches_enabled;
            _this.globals.special_offer = _this.places[0].special_offer;
            _this.globals.events_enabled = _this.places[0].events_enabled;
            _this.globals.gallery_enabled = _this.places[0].gallery_enabled;
            _this.globals.pickup = _this.places[0].pickup;
            _this.globals.latitude = _this.places[0].latitude;
            _this.globals.longitude = _this.places[0].longitude;
            _this.globals.hours_operation = _this.places[0].hours_operation;
            _this.globals.branch_enabled = _this.places[0].branch_enabled;
            _this.globals.giftcard_enabled = _this.places[0].giftcard_enabled;
            _this.globals.b_logo = _this.places[0].logo;
            _this.globals.home_logo = _this.places[0].logo;
            _this.globals.StripId = _this.places[0].stripe_id;
            _this.globals.order_instructions = _this.places[0].instructions_enabled;
            _this.globals.pickup_timing = _this.places[0].pickup_timing;
            _this.globals.delivery_timing = _this.places[0].delivery_timing;
            _this.globals.business_username = _this.places[0].username;
            _this.globals.estimated_time = _this.places[0].delivery_time;
            _this.globals.business_discount_count = parseInt(_this.places[0].business_discount_count);
            _this.globals.username = _this.places[0].username;
            _this.globals.bussinessId = _this.places[0].business_id;
            _this.globals.admin_stripe = _this.places[0].admin_stripe_enabled;
            _this.globals.pickupsetting = _this.places[0].delivery_time;
            _this.globals.tax = _this.places[0].tax;
            _this.globals.deliveryCharges = _this.places[0].delivery_fee;
            _this.globals.pickup_Time = _this.places[0].pickup_time;
            _this.globals.minimun_order = parseInt(_this.places[0].minimum_order);
            _this.globals.availed_discount_count = parseInt(_this.places[0].customer_discount_availed_count);
            _this.globals.paypalId = _this.places[0].paypal_id;
            _this.globals.Timing = _this.places[0].hours_operation;
            _this.globals.specific_delivery_day = _this.places[0].specific_delivery_day;
            _this.globals.review_enabled = _this.places[0].review_enabled;
            _this.globals.delivery_day = _this.places[0].delivery_day;
            _this.globals.authorize_enabled = _this.places[0].authorize_enabled;
            _this.globals.card_enabled = _this.places[0].card_enabled;
            _this.globals.admin_stripe_enabled = _this.places[0].admin_stripe_enabled;
            _this.globals.catering_enabled = _this.places[0].catering_enabled;
            _this.globals.catering_cart_enabled = _this.places[0].catering_cart_enabled;
            _this.globals.giftcard_amount_limit = _this.places[0].giftcard_limit;
            _this.globals.business_type = _this.places[0].business_type;
            _this.globals.orders_enabled = _this.places[0].orders_enabled;
            if (_this.globals.pickup == '1') {
                _this.globals.pickup = true;
            }
            else {
                _this.globals.pickup = false;
            }
            if (_this.places[0].delivery == '1') {
                _this.globals.delivery = true;
            }
            else {
                _this.globals.delivery = false;
            }
            if (_this.places[0].cash_enabled == '1') {
                _this.globals.cash_enabled = true;
            }
            else {
                _this.globals.cash_enabled = false;
            }
            if (_this.globals.pickup == '1') {
                _this.globals.pickup = true;
            }
            else {
                _this.globals.pickup = false;
            }
            if (_this.places[0].delivery == '1') {
                _this.globals.delivery = true;
            }
            else {
                _this.globals.delivery = false;
            }
        }, function (error) {
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    BusinessLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-business-login',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/business-login/business-login.html"*/'\n<ion-content padding>\n  <h3 text-center class="mt1">Business Login</h3>\n    <ion-item class="mt">\n        <ion-label color="primary" stacked>Username</ion-label>\n        <ion-input type="email" [(ngModel)]="username"></ion-input>\n      </ion-item>\n  <ion-item>\n    <ion-label color="primary" stacked>Password</ion-label>\n    <ion-input type="text" [(ngModel)]="password"></ion-input>\n  </ion-item>\n\n  <button ion-button block margin-top round   color=\'primary\' (click)="login_business()" block>Save</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/business-login/business-login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], BusinessLoginPage);
    return BusinessLoginPage;
}());

//# sourceMappingURL=business-login.js.map

/***/ })

});
//# sourceMappingURL=50.js.map
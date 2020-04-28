webpackJsonp([22],{

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderListingPageModule", function() { return OrderListingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_listing__ = __webpack_require__(972);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__ = __webpack_require__(375);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var OrderListingPageModule = (function () {
    function OrderListingPageModule() {
    }
    OrderListingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__order_listing__["a" /* OrderListingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__order_listing__["a" /* OrderListingPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__["a" /* Ionic2RatingModule */]
            ],
        })
    ], OrderListingPageModule);
    return OrderListingPageModule;
}());

//# sourceMappingURL=order-listing.module.js.map

/***/ }),

/***/ 972:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderListingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_diagnostic__ = __webpack_require__(161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
/**
 *
 * Generated class for the DealsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
/**
 * Generated class for the OrderListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrderListingPage = (function () {
    function OrderListingPage(toastCtrl, diagnostic, server, nativeStorage, events, app, globals, modalCtrl, alertCtrl, geolocation, loadingCtrl, http, navCtrl, navParams) {
        this.toastCtrl = toastCtrl;
        this.diagnostic = diagnostic;
        this.server = server;
        this.nativeStorage = nativeStorage;
        this.events = events;
        this.app = app;
        this.globals = globals;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
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
        this.errorMenu = false;
        this.date = new Date();
        this.min = this.date.getMinutes();
        this.hours = this.date.getHours();
        this.forToday = this.hours + ":" + this.min;
        this.globals.MinValue = this.forToday;
        //this. getLocationAddress();
        // localStorage.setItem("type","delivery" );
        // console.log("localstorage data ", localStorage.getItem("orderdetail"));
        // this.nativeStorage.setItem('orderdetail',{
        //     type :"delivery"
        // });
        this.pageFlag = navParams.get('Flag');
        this.textdisocunt = navParams.get('discount_text');
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormControl"]();
        this.getUserOrder();
        // events.subscribe('Radius1', (radius) => {
        //     this.radius = radius;s
        // this.list();
        // });
        this.getLocation();
        this.CheckMobileFlag();
        this.selectOptions = {
            title: 'Distance'
        };
    }
    OrderListingPage.prototype.doInfinite = function () {
        var _this = this;
        console.log('Begin async operation');
        this.offset += 10;
        return new Promise(function (resolve, enable) {
            var response = _this.server.getRestaurantslist(_this.radius, 'branches', _this.coordinates, _this.offset, 'order');
            response.subscribe(function (data) {
                if (data.status == 'true') {
                    data.results.forEach(function (element) {
                        _this.places.push(element);
                        console.log("data$$$$$", _this.places);
                        localStorage.setItem("places", _this.places);
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
                        console.log("data$$$$$", _this.places);
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
    OrderListingPage.prototype.ionViewWillEnter = function () {
        this.globals.title = 'Orders';
    };
    OrderListingPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad OrderListingPage');
        this.getCurrentLocation().then(function (resp) {
            _this.reverseGeoCoding(resp.coords.latitude, resp.coords.longitude);
        });
        this.option = 'orders';
        this.searchControl.valueChanges.debounceTime(700).subscribe(function (search) {
            _this.setFilteredItems();
        });
    };
    OrderListingPage.prototype.info = function () {
        // let profileModal = this.modalCtrl.create('InformationPage');
        //  profileModal.present(); 
        this.navCtrl.push('InformationPage');
    };
    OrderListingPage.prototype.ionViewDidLeave = function () {
        console.log('leave');
        if (this.timer != undefined) {
            this.timer.unsubscribe();
        }
    };
    OrderListingPage.prototype.getCurrentLocation = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.globals.delivery == true) {
                _this.geolocation.getCurrentPosition().then(function (resp) {
                    resolve(resp);
                }).catch(function (error) {
                    console.log();
                });
            }
        });
    };
    OrderListingPage.prototype.reverseGeoCoding = function (lat, lng) {
        var _this = this;
        var mycoordinates = lat + "," + lng;
        var response = this.server.getAddress(mycoordinates);
        var myadress = "";
        response.subscribe(function (data) {
            myadress = data.address;
            localStorage.setItem("GetAddress", myadress);
        }, function (error) {
            localStorage.setItem("GetAddress", "");
            _this.globals.alertMessage("Failure", "Something went wrong check your internet connection.");
        });
    };
    OrderListingPage.prototype.list = function () {
        var _this = this;
        //  this.diagnostic.isLocationEnabled()
        //   .then((state) => {
        //    if (state){
        this.status = false;
        this.arrayStatus = false;
        this.flag = true;
        if (this.globals.delivery == true) {
            this.geolocation.getCurrentPosition().then(function (position) {
                //     this.coordinates = position.coords.latitude+","+position.coords.longitude
                var response = _this.server.getRestaurantslist(_this.radius, 'main', _this.coordinates, _this.offset.toString(), 'order');
                response.subscribe(function (data) {
                    _this.places = data.results;
                    // if (this.mobileFlagcheck == 'false') {
                    //     this.MobileVerificationPrompt();
                    // }
                    if (typeof data.success != 'undefined' || data.success == 'No data') {
                        _this.arrayStatus = true;
                        _this.flag = false;
                    }
                    else {
                        _this.flag = false;
                        _this.arrayStatus = false;
                        _this.places_array = _this.places;
                    }
                }, function (error) {
                    _this.flag = false;
                    var alert = _this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'Server times out, please try again',
                        buttons: ['OK']
                    });
                    alert.present();
                });
            }, function (err) {
                console.log(err);
                _this.status = true;
                var alert = _this.alertCtrl.create({
                    title: 'Location is disabled',
                    subTitle: 'In order to proceed, Please enable your location',
                    buttons: ['OK']
                });
                alert.present();
            });
        }
        // } else {
        //   }
        //  }).catch(e => console.error(e));
    };
    OrderListingPage.prototype.OrderCategory = function (pickup_time, delivery_time, businessId, paypalId, discountvalue, stripeId, hours, min, time, deliveryFee, tax, delivery, pickup, admin_stripe, username, availed_discount_count, b_discount_count) {
        this.globals.availed_discount_count = Number(availed_discount_count);
        this.globals.business_discount_count = Number(b_discount_count);
        this.globals.bussinessId = businessId;
        this.globals.username = username;
        this.globals.paypalId = paypalId;
        this.globals.pickup_Time = pickup_time;
        this.globals.estimated_time = time;
        this.globals.pickupsetting = delivery_time;
        this.globals.StripId = stripeId;
        this.globals.Timing = hours;
        this.globals.tax = tax;
        this.globals.deliveryCharges = deliveryFee;
        this.globals.admin_stripe = admin_stripe;
        this.globals.type = 'order';
        this.globals.pickup = pickup;
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
            this.globals.pickup = true;
        }
        if (min == '') {
            this.globals.minimun_order = 0;
        }
        else {
            this.globals.minimun_order = Number(min);
        }
        this.navCtrl.push('CategoryPage', { pageflag: this.pageFlag, BusinessId: businessId, paypal: paypalId, discount: discountvalue });
        // this.navCtrl.push('Modal2Page', { 'pickup' : pickup});
        console.log("username", username, "pickup", pickup);
    };
    OrderListingPage.prototype.setFilteredItems = function () {
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
        var _this = this;
        if (this.searchTerm.length >= 3) {
            var response = this.server.LiveSearch(this.searchTerm.toLowerCase(), this.coordinates, this.radius, 'main');
            response.subscribe(function (data) {
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
            this.offset = 0;
            var response = this.server.getRestaurantslist(this.radius, 'main', this.coordinates, this.offset.toString(), 'order');
            response.subscribe(function (data) {
                _this.places = data.results;
                ;
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
    OrderListingPage.prototype.getLocation = function () {
        var _this = this;
        // this.diagnostic.isLocationEnabled()
        //     .then((state) => {
        // if (state) {
        this.status = false;
        this.arrayStatus = false;
        this.flag = true;
        if (this.globals.delivery == true) {
            this.geolocation.getCurrentPosition().then(function (position) {
                _this.coordinates = position.coords.latitude + "," + position.coords.longitude;
                _this.list();
            }, function (err) {
                console.log(err);
                _this.status = true;
                var alert = _this.alertCtrl.create({
                    title: 'Location is disabled',
                    subTitle: 'In order to proceed, Please enable your location',
                    buttons: ['OK']
                });
                alert.present();
            });
        }
        // } else {
        // }
        // }).catch(e => console.error(e));
    };
    //     getLocationAddress() {
    //         //this.getLocation();
    //         console.log("check get location address function");
    //         this.geolocation.getCurrentPosition().then((res)=>{
    //             this.Geocoder_lat = res.coords.latitude;
    //             this.Geocoder_lng = res.coords.longitude;
    //             console.log("response",res);
    //             console.log("geocoder lattitude",this.Geocoder_lat, this.Geocoder_lng);
    //         this.nativeGeocoder.reverseGeocode(this.Geocoder_lat, this.Geocoder_lng)
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
    OrderListingPage.prototype.cartpage = function () {
        //  let cartmodel = this.modalCtrl.create('CartPage');
        // cartmodel.present();
        if (this.globals.Product.length == 0) {
            var alert_1 = this.alertCtrl.create({
                title: "Oops",
                message: "Your cart is empty.",
                buttons: ["Okay"]
            });
            alert_1.present();
        }
        else {
            this.navCtrl.push('CartPage');
        }
    };
    OrderListingPage.prototype.Reviews = function (data) {
        // let modal = this.modalCtrl.create('ReviewsPage', { place: data});
        // modal.present();
        this.navCtrl.push('ReviewsPage', { place: data });
    };
    OrderListingPage.prototype.doRefresh = function (refresher) {
        this.offset = 0;
        this.getLocation();
        this.content.resize();
        refresher.complete();
    };
    // MobileVerificationPrompt() {
    //     if(this.globals.MobileDiscount != 0){
    //         let prompt = this.alertCtrl.create({
    //             title: 'Alert',
    //             message: "Verify your number and earn $" + this.globals.MobileDiscount + " for one time order.",
    //             buttons: [
    //                 {
    //                     text: 'No Thanks',
    //                     handler: data => {
    //                         console.log('Cancel clicked');
    //                     }
    //                 },
    //                 {
    //                     text: 'Okay',
    //                     handler: data => {
    //                         console.log('OK clicked');
    //                         this.DoMobileVerification();
    //                     }
    //                 }
    //             ]
    //         });
    //         prompt.present();
    //     }
    // }
    // DoMobileVerification() {
    //     // let model = this.modalCtrl.create('MobileVerificationPage');
    //     // model.present();
    //     let response = this.server.MobileVerification();
    //     response.subscribe(data => {
    //         console.log(data);
    //         var verficationResponse = data;
    //         console.log(verficationResponse);
    //         if (verficationResponse.success == 'true') {
    //             let model = this.modalCtrl.create('MobileVerificationPage');
    //             model.present();
    //         }
    //         else {
    //             let alert = this.alertCtrl.create({
    //                 title: "Error",
    //                 message: verficationResponse.message,
    //                 buttons: ["OK"]
    //             });
    //             alert.present();
    //         }
    //     }, error => { console.log(error); });
    // }
    OrderListingPage.prototype.CheckMobileFlag = function () {
        var _this = this;
        this.nativeStorage.getItem('MobileFlagSave').then(function (data) {
            _this.mobileFlagcheck = data.MobileFlag;
            _this.globals.MobileDiscount = data.MobileDiscount;
        }, function (error) {
            _this.mobileFlagcheck = 'false';
        }).catch(function (err) { return console.log(err); });
    };
    OrderListingPage.prototype.getUserOrder = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "loading...",
        });
        loading.present();
        var response = this.server.GetUserOrderPlaced();
        response.subscribe(function (data) {
            _this.data = data;
            if (_this.data.orders.length == 0) {
                _this.errorMenu = true;
            }
            else {
                _this.errorMenu = false;
            }
            if (_this.data.success != true) {
                var alert_2 = _this.alertCtrl.create({
                    title: 'Alert',
                    subTitle: 'No orders placed yet',
                    buttons: ['OK']
                });
                alert_2.present();
            }
            else {
                console.log(_this.data.orders);
                _this.sub = __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__["Observable"].timer(1000, 1000);
                _this.timer = _this.sub.subscribe(function (t) {
                    //  this.subscription = timer
                    t = 1;
                    _this.data.orders.forEach(function (element) {
                        if (element.deliveryTimeLeft > 0) {
                            element.deliveryTimeLeft = element.deliveryTimeLeft - t;
                        }
                    });
                });
            }
            //this.orderdata = this.data.orderData;
            //console.log("orderdata",this.orderdata);
            loading.dismiss();
        });
    };
    OrderListingPage.prototype.SecondsTohhmmss = function (totalSeconds) {
        var hours = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
        var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
        // round seconds
        seconds = Math.round(seconds * 100) / 100;
        var result = (hours < 10 ? "0" + hours : hours);
        result += "-" + (minutes < 10 ? "0" + minutes : minutes);
        result += "-" + (seconds < 10 ? "0" + seconds : seconds);
        var that = this;
        return result;
    };
    OrderListingPage.prototype.detail = function (data, time, instructions, schedule_time, res, tot, o_id, p_type) {
        // let profileModal = this.modalCtrl.create('OrderPlacedDetailPage', {data:data});
        // profileModal.present();
        this.navCtrl.push('OrderPlacedDetailPage', { p_type: p_type, data: data, time: time, instructions: instructions, schedule_time: schedule_time, res: res, tot: tot, o_id: o_id });
    };
    OrderListingPage.prototype.doRefresh1 = function (refresher) {
        // this.timer.unsubscribe();
        this.getUserOrder();
        this.content.resize();
        refresher.complete();
    };
    OrderListingPage.prototype.ReorderVerificationPrompt = function (orderdata) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Alert',
            message: "Are you sure you want to place this order again?",
            buttons: [
                {
                    text: 'No',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        console.log('OK clicked');
                        _this.Categories(orderdata);
                    }
                }
            ]
        });
        prompt.present();
    };
    OrderListingPage.prototype.Categories = function (orderdata) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "loading...",
        });
        loading.present();
        var response = this.server.GetBusinessMenuCategories(orderdata[0].restId);
        response.subscribe(function (data) {
            var res = data;
            loading.dismiss();
            // console.log(this.data.categories);
            _this.category = res.categories;
            orderdata.forEach(function (userdata) {
                _this.category.forEach(function (element) {
                    _this.globals.tax = element.tax;
                    element.items.forEach(function (subelement) {
                        if (userdata.menuItem == subelement.name) {
                            if (userdata.menuExtrasSelected.length == 0) {
                                var total_price = Number(userdata.quantity) * Number(subelement.price);
                                _this.globals.Product.push({ menuId: "1", restId: userdata.restId, uniqueId: userdata.uniqueId, menuItem: subelement.name, image: subelement.image, quantity: userdata.quantity, basePrice: Number(subelement.price), totalPrice: Number(total_price), menuExtrasSelected: [] });
                            }
                            else {
                                _this.total_price_with_extras = Number(userdata.quantity) * Number(subelement.price);
                                _this.getExtras(subelement.id, userdata.menuExtrasSelected);
                                _this.globals.Product.push({ menuId: "1", restId: userdata.restId, uniqueId: userdata.uniqueId, menuItem: subelement.name, image: subelement.image, quantity: userdata.quantity, basePrice: Number(subelement.price), totalPrice: Number(_this.total_price_with_extras), menuExtrasSelected: _this.userChoices });
                            }
                        }
                    });
                });
            });
            // console.log(this.data.restaurant.categories);
            // console.log(this.category);
        }, function (error) {
            console.log(error);
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Server times out, please try again',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    OrderListingPage.prototype.getExtras = function (ItemId, userExtras) {
        var _this = this;
        var response = this.server.ProductItemDetail(ItemId);
        response.subscribe(function (data) {
            userExtras.forEach(function (userextra_element) {
                data.item.extras.forEach(function (data_extra_element) {
                    userextra_element.optionNameSelected.forEach(function (user_option_element) {
                        data_extra_element.options.forEach(function (data_option_element) {
                            if (user_option_element.name == data_option_element.name) {
                                _this.total_price_with_extras += user_option_element.quantity * Number(data_option_element.price);
                                var data = { heading: data_extra_element.heading, optionNameSelected: [{ name: data_option_element.name, price: Number(data_option_element.price), quantity: user_option_element.quantity, total: Number(data_option_element.price) * user_option_element.quantity, isFree: false }] };
                                _this.userChoices.push(data);
                            }
                        });
                    });
                });
            });
        }, function (error) {
            console.log(error);
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Server times out, please try again',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    OrderListingPage.prototype.segmentChanged = function () {
        if (this.option == 'orders_placed' && this.orderPlacedFlag == false) {
            this.getUserOrder();
            this.orderPlacedFlag = true;
        }
        if (this.option == 'orders') {
            this.timer.unsubscribe();
        }
    };
    OrderListingPage.prototype.Radiusvalue = function () {
        this.offset = 0;
        this.list();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], OrderListingPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('pleaseConnect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], OrderListingPage.prototype, "pleaseConnect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"])
    ], OrderListingPage.prototype, "content", void 0);
    OrderListingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-order-listing',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/order-listing/order-listing.html"*/'<!--\n  Generated template for the OrderListingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color="primary">\n    <ion-title>My Orders</ion-title>\n\n    <!-- <ion-buttons end  (click)="info()">\n      <button ion-button style="font-size: 3rem; padding-right: 10px;">\n        <ion-icon ios="ios-information-circle-outline" md="md-information-circle"> </ion-icon>\n      </button>\n\n    </ion-buttons> -->\n    <!-- <ion-buttons *ngIf="option == \'orders\'" end style="    width: 30%;">\n\n      <ion-icon style="color:white;font-size:3rem; float:right;margin-top:2px" name="options"> </ion-icon>\n\n\n      <ion-select style="font-weight: bold;  max-width: unset;width: 76px;   padding-left: 0;\n        padding-right: 5px;  float: right;padding-bottom: 0;\n        color: white;" (ionChange)="Radiusvalue()" [(ngModel)]="radius" [selectOptions]="selectOptions">\n\n        <ion-option value="5">5 miles</ion-option>\n        <ion-option value="10">10 miles</ion-option>\n        <ion-option value="50">50 miles</ion-option>\n        <ion-option value="100">100 miles</ion-option>\n\n        <ion-option value="100000" [selected]="true">All</ion-option>\n\n      </ion-select>\n\n\n    </ion-buttons> -->\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="Open-Sans-regular">\n  <!-- <ion-segment color="primary" style="padding:5px" [(ngModel)]="option" (ionChange)="segmentChanged()">\n    <ion-segment-button value="orders">\n      Orders\n    </ion-segment-button>\n    <ion-segment-button value="orders_placed">\n      Orders Placed\n    </ion-segment-button>\n  </ion-segment> -->\n\n  <div>\n    <!-- <div *ngSwitchCase="\'orders\'">\n      <ion-searchbar [(ngModel)]="searchTerm" (input)="setFilteredItems()" [formControl]="searchControl"></ion-searchbar>\n\n      <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull down to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n        </ion-refresher-content>\n      </ion-refresher>\n\n      <p style="text-align: center; margin-top: 60%;" *ngIf="flag == true">Fetching data... </p>\n      <p style="text-align: center; margin-top: 60%;" *ngIf="arrayStatus">No place available in this range... </p>\n      <div *ngIf="!arrayStatus && !flag">\n        <div *ngFor="let place of places">\n          <ion-card *ngIf="place.orders_enabled == \'active\'">\n            <ion-grid>\n              <ion-row>\n                <ion-col col-3 (tap)="OrderCategory(place.pickup_time,place.delivery_time,place.business_id,place.paypal_id,place.discount,place.stripe_id,place.hours_operation,place.minimum_order,place.delivery_time,place.delivery_fee,place.tax,place.delivery,place.pickup,place.admin_stripe_enabled,place.username,place.customer_discount_availed_count,place.business_discount_count)">\n                  <img class="image" src="{{place.logo}}">\n                </ion-col>\n\n                <ion-col col-6 (tap)="OrderCategory(place.pickup_time,place.delivery_time,place.business_id,place.paypal_id,place.discount,place.stripe_id,place.hours_operation,place.minimum_order,place.delivery_time,place.delivery_fee,place.tax,place.delivery,place.pickup,place.admin_stripe_enabled,place.username,place.customer_discount_availed_count,place.business_discount_count)">\n                  <p class="Open-Sans-bold" class="heading">{{place.name}} </p>\n\n                  <rating class="rating" [(ngModel)]="place.average_rating" readOnly="true" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half"\n                    starIconName="star" nullable="false"></rating>\n\n                  <div>\n                    <div style="display:inline-block;">\n                      <p class="delivery" *ngIf="place.pickup_time != \'\' ">\n                        <ion-icon ios="ios-time-outline" md="md-time"> </ion-icon> Pickup time: {{place.pickup_time}} </p>\n                    </div>\n                    <div style="display:inline-block;">\n                      <p class="delivery" *ngIf="place.delivery_time != \'\' ">\n                        <ion-icon ios="ios-time-outline" md="md-time"> </ion-icon> Delivery time: {{place.delivery_time}} </p>\n                    </div>\n\n                    <div style="display:inline-block;">\n                      <p class="delivery" *ngIf="place.delivery_fee != \'\' ">\n                        <ion-icon ios="ios-bicycle" md="md-bicycle"> </ion-icon> Delivery charges: ${{place.delivery_fee}} </p>\n                    </div>\n                  </div>\n                  <p *ngIf="place.discount_text && place.customer_discount_availed_count < place.business_discount_count" class="Open-Sans-bold"\n                    class="discount-text">{{place.discount_text}}, {{place.discount}}% </p>\n\n\n                </ion-col>\n\n                <ion-col style="padding: 0px !important;" col-3>\n                  <p class="Open-Sans-regular" color="primary" class="distance">\n                    <ion-icon name="pin"> </ion-icon> {{place.distanceValue}} mi </p>\n\n                  <button ion-button small block class="review-btn" (tap)="Reviews(place.username)">\n                    <ion-icon name="list-box"> </ion-icon>\n                  </button>\n                </ion-col>\n              </ion-row>\n\n            </ion-grid>\n\n          </ion-card>\n        </div>\n      </div>\n      <ion-infinite-scroll (ionInfinite)="$event.waitFor(doInfinite())" threshold="2px">\n        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">\n        </ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n\n    </div> -->\n\n    <div>\n      <ion-refresher (ionRefresh)="doRefresh1($event)">\n        <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull down to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n        </ion-refresher-content>\n      </ion-refresher>\n      <div *ngIf="errorMenu == true">\n          <p style="padding-top: calc(50% - 11px); padding-right:20px; padding-left:20px; text-align: center; font-size: 22px; color:#a8a3a3;"><ion-icon name="eye-off"></ion-icon></p>\n          <p no-margin style="padding-right:20px; padding-left:20px; text-align: center; font-size: 14px;">No Orders Found</p>\n      </div>\n\n      <div *ngIf="data">\n\n        <div *ngFor="let order of data.orders; let i =index">\n          <ion-card *ngIf="order.status">\n            <ion-row (click)="detail(order.order_data,order.date_time,order.instructions,order.scheduled_time,order.restaurant_name,order.total,order.o_id,order.payment_type)" [ngStyle]="{ \'border-left\' : (order.status == \'PENDING\') ? \'8px solid #333\' : \'8px solid #2ecc71\' }">\n              <!-- <ion-col (click)="detail(order.order_data,order.date_time,order.instructions,order.scheduled_time,order.restaurant_name,order.total,order.o_id)"\n                *ngIf="order.status == \'PENDING\'" col-1 style="    background: #333; color: #fff;  margin: 0;padding-top: 15px;">\n                <p class="index">{{i+1}} </p>\n              </ion-col>\n              <ion-col *ngIf="order.status == \'ACCEPTED\'" (click)="detail(order.order_data,order.date_time,order.instructions,order.scheduled_time,order.restaurant_name,order.total,order.o_id)"\n                col-1 style="    background: #2ecc71; color: #fff;  margin: 0;padding-top: 15px;">\n                <p class="index">{{i+1}} </p>\n              </ion-col>\n              <ion-col *ngIf="order.status == \'DISPATCHED\'" (click)="detail(order.order_data,order.date_time,order.instructions,order.scheduled_time,order.restaurant_name,order.total,order.o_id)"\n                col-1 style="    background: #34495e; color: #fff;  margin: 0;padding-top: 15px;">\n                <p class="index">{{i+1}} </p>\n              </ion-col> -->\n              <ion-col col-9 style="padding-bottom: 2px;\n              padding-right: 0;">\n\n                <!-- <p (click)="detail(order.order_data,order.date_time,order.instructions,order.scheduled_time,order.restaurant_name,order.total,order.o_id)"\n                  style="font-size:1.7rem;margin-left:5px">\n                  {{order.restaurant_name}} </p> -->\n\n                <p style="margin-bottom:2px" \n                  class="time">\n                  {{order.date_time}} </p>\n\n\n                <!-- <ion-label style="margin-bottom:2px" (click)="detail(order.order_data,order.date_time,order.instructions,order.scheduled_time,order.restaurant_name,order.total,order.o_id)"\n                  *ngIf="order.deliveryTimeLeft > 0 && order.status == \'ACCEPTED\' " class="time">\n                  <ion-icon name="time-outline"> </ion-icon>{{SecondsTohhmmss(order.deliveryTimeLeft) }} </ion-label>\n                <ion-label style="margin-bottom:2px;font-size: 2.6rem;" (click)="detail(order.order_data,order.date_time,order.instructions,order.scheduled_time,order.restaurant_name,order.total,order.o_id)"\n                  *ngIf="order.status == \'PENDING\' " class="time">\n                  <ion-icon name="time-outline" style="font-size: 1em;"> </ion-icon> - -:- -:- - </ion-label>\n                <ion-label style="margin-bottom:2px" (click)="detail(order.order_data,order.date_time,order.instructions,order.scheduled_time,order.restaurant_name,order.total,order.o_id)"\n                  *ngIf="order.status == \'ACCEPTED\' && order.deliveryTimeLeft == 0 " class="time">\n                  <ion-icon name="time-outline"> </ion-icon> - -:- -:- - </ion-label>\n                <ion-label style="margin-bottom:2px" (click)="detail(order.order_data,order.date_time,order.instructions,order.scheduled_time,order.restaurant_name,order.total,order.o_id)"\n                  *ngIf="order.status == \'DISPATCHED\'" class="time">\n                  <ion-icon name="time-outline"> </ion-icon> - -:- -:- -</ion-label> -->\n\n                <p class="order-total"> ${{order.total}}</p>\n\n                <!-- <button ion-button color="primary" (click)="ReorderVerificationPrompt(order.order_data)" style="font-size: 1.3rem;margin-bottom:0;float:right;">\n                      <ion-icon name="repeat"></ion-icon>  </button> -->\n              </ion-col>\n\n              <ion-col col-3 style="text-align: center;" >\n\n                <p *ngIf="order.status != \'DISPATCHED\'" class="status">{{order.status}}</p>\n                <p *ngIf="order.status == \'DISPATCHED\'" class="status">DELIVERED</p>\n                <!-- <p *ngIf="order.status == \'PENDING\'" style="background-color:#e67e22"  class="status">PENDING</p>\n                <p *ngIf="order.status == \'ACCEPTED\'"  style="background-color:#2ecc71" class="status">ACCEPTED</p> -->\n\n              </ion-col>\n\n\n            </ion-row>\n\n\n          </ion-card>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/order-listing/order-listing.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_9__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], OrderListingPage);
    return OrderListingPage;
}());

//# sourceMappingURL=order-listing.js.map

/***/ })

});
//# sourceMappingURL=22.js.map
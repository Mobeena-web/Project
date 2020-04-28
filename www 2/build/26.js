webpackJsonp([26],{

/***/ 770:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalPageModule", function() { return ModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal__ = __webpack_require__(974);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ModalPageModule = (function () {
    function ModalPageModule() {
    }
    ModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__modal__["a" /* ModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__modal__["a" /* ModalPage */]),
            ],
        })
    ], ModalPageModule);
    return ModalPageModule;
}());

//# sourceMappingURL=modal.module.js.map

/***/ }),

/***/ 974:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__);
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
// import {Modal2Page} from '../modal2/modal2';
/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ModalPage = (function () {
    function ModalPage(loadingCtrl, server, geolocation, alertCtrl, navCtrl, formBuilder, navParams, viewCtrl, globals, modalCtrl, nativeStorage, plt) {
        this.loadingCtrl = loadingCtrl;
        this.server = server;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.globals = globals;
        this.modalCtrl = modalCtrl;
        this.nativeStorage = nativeStorage;
        this.plt = plt;
        this.CurrentAdress = true;
        this.month_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.NEW = false;
        this.order_pickup = this.globals.pickup;
        this.order_delivery = this.globals.delivery;
        this.addressElement = null;
        this.segmentValue = localStorage.getItem("segmentvalue");
        this.deliveryTime = this.globals.pickupsetting;
        this.pickup_time = this.globals.pickup_Time;
        this.category_page = this.navParams.get('category_page');
        this.branchId = this.navParams.get('branchId');
        //  this.type = this.globals.OrderType;
        console.log("Pick Up -> ", this.globals.pickupsetting);
        console.log("Segment value -> ", this.segmentValue);
        //this.type = localStorage.getItem("type");
        // this.checktype();
        //console.log("localstorage data for testing ", localStorage.getItem("type"));
        if (!this.globals.address) {
            this.CurrentAdressBox();
        }
        else {
            this.reverseGeoCoding(this.globals.lat, this.globals.long);
        }
        this.ProcessForm = formBuilder.group({
            Address: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required])],
        });
        // this.unregisterBackButtonAction && this.unregisterBackButtonAction(); 
        plt.registerBackButtonAction(function () {
        }, 1);
        this.min_date_value();
    }
    ModalPage.prototype.closetohome = function () {
        // this.viewCtrl.dismiss();
        this.navCtrl.popToRoot();
    };
    ModalPage.prototype.ionViewDidLoad = function () {
        var that = this;
        setTimeout(function () {
            that.loadMaps();
        }, 1000);
    };
    ModalPage.prototype.min_date_value = function () {
        var date = new Date();
        var datenow = date.getDate().toString();
        var month = date.getMonth().toString();
        var year = date.getFullYear().toString();
        if (month.length < 2)
            month = '0' + month;
        if (datenow.length < 2)
            datenow = '0' + datenow;
        this.value = year + "-" + month + "-" + datenow;
        this.value.toString();
        console.log("value", this.value);
        var date1 = new Date((date.getTime()) - date.getTimezoneOffset() * 60000).toISOString();
        if (!this.globals.myDate) {
            this.globals.myDate = date1;
        }
    };
    ModalPage.prototype.loadMaps = function () {
        if (!!google) {
            this.initAutocomplete();
        }
        else {
            this.globals.presentToast('Something went wrong with the Internet Connection. Please check your Internet.');
        }
    };
    ModalPage.prototype.initAutocomplete = function () {
        this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
        this.createAutocomplete(this.addressElement).subscribe(function (location) {
        });
    };
    ModalPage.prototype.createAutocomplete = function (addressEl) {
        var _this = this;
        var autocomplete = new google.maps.places.Autocomplete(addressEl);
        //autocomplete.bindTo('bounds', this.map);
        return new __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"](function (sub) {
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                var address = [
                    (place.address_components[0] && place.address_components[0].long_name || ''),
                    (place.address_components[1] && place.address_components[1].long_name || ''),
                    (place.address_components[2] && place.address_components[2].long_name || ''),
                ].join(' ');
                _this.globals.address = address;
                if (!place.geometry) {
                    sub.error({
                        message: 'Autocomplete returned place with no geometry'
                    });
                }
                else {
                    _this.lat = place.geometry.location.lat();
                    _this.long = place.geometry.location.lng();
                    _this.reverseGeoCoding(_this.lat, _this.long);
                    sub.next(place.geometry.location);
                    //sub.complete();
                }
            });
        });
    };
    ModalPage.prototype.tConvert = function (time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) {
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    };
    ModalPage.prototype.getdata = function () {
        this.time = localStorage.getItem("scheduled_time");
        console.log("time", this.time);
        if (this.time) {
            if (this.globals.specific_delivery_day == 'false') {
                var res = this.time.split("T");
                var res1 = res[1].split(".");
                this.datenow = res[0] + ' ' + this.tConvert(res1[0]);
                this.convertDate = res[0] + ' ' + this.tConvert(res1[0]);
            }
            else {
                var res1 = this.time.split("00");
                this.convertDate = res1[0];
                this.datenow = res1[0];
            }
            // this.date = new Date(this.time );
            // var timeis = new Date(this.time).toLocaleString('en-US', { hour12: true });
        }
        else {
            this.date = new Date(new Date().setHours(new Date().getHours()));
            var timeis = new Date(this.date).toLocaleString('en-US', { hour12: true });
            this.datenow = timeis;
            this.convertDate = timeis;
        }
        //this.date = new Date(local_datetime);
        // let timeis =  new Date(this.time).toJSON().split('T')[0];
        // this.convertDate.toString();
        //   let hourss = this.date.getHours();
        //   let mins = this.date.getMinutes();
        // let dayyy = this.date;
        //   let local_datetime = new Date(this.time).toLocaleString('en-US', { hour12: false });
        //       this.date = new Date(local_datetime );
        // console.log("getting time", localStorage.getItem("scheduled_time"),this.convertDate , "local date", this.date);
        //   this.nativeStorage.getItem('orderdetail').then(data => {
        //     this.time = data.scheduled_time;
        //     this.time = this.time.toJSON().split('.')[0];
        //     this.productName = data.name;
        //     //this.type = data.type;
        // }, error => {
        //     this.time = 'Apr,10,2018'
        // }).catch(err => console.log(err));
        // console.log("checking type",this.type,this.time);
    };
    ModalPage.prototype.onsegmentChanged = function () {
        // this.loadMap(this.lat,this.long)
        this.CurrentAdressBox();
        if (this.type == "delivery") {
            this.globals.OrderType = "delivery";
            // this.segmentValue = "Asap"
            this.globals.delivery == true;
            // localStorage.setItem("type","delivery" )
        }
        else {
            this.globals.OrderType = "pickup";
            // this.segmentValue = "Asap"
            this.globals.pickup == true;
            //localStorage.setItem("type","pickup" );
        }
    };
    // geolocate() {
    //   let options = {
    //     enableHighAccuracy: true
    //   };
    //     this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
    //     this.getcountry(position);
    //   }).catch((err) => {
    //     alert(err);
    //   })
    // }
    // getcountry(pos) {
    //   this.nativeGeocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude).then((res: NativeGeocoderReverseResult) => {
    //     alert("get address" + res.countryName);
    //   })
    // }
    // checktype(){
    //   if(this.type == "delivery"){
    //     localStorage.setItem("type","delivery" );
    //     this.type = "delivery"
    //     console.log("localstorage data delivery", localStorage.getItem("type"));
    //   }
    //   else{
    //     localStorage.setItem("type","pickup" );
    //     this.type = "pickup"
    //     console.log("localstorage data pickup ", localStorage.getItem("type"));
    //   }
    // }
    // getOrderTime(){
    //   this.nativeStorage.getItem('orderdetailtime').then(data => {
    //     this.future_time = data.future_order_time;
    // }, error => {
    //     this.time = 'Apr,10,2018'
    // }).catch(err => console.log(err));
    // }
    ModalPage.prototype.ionViewWillEnter = function () {
        //   this.getCurrentLocation().then((resp) => {
        //   this.reverseGeoCoding(resp.coords.latitude, resp.coords.longitude);
        // });
        //this.getdata();
        if (!this.globals.OrderType) {
            if (this.order_pickup && !this.order_delivery) {
                this.type = "pickup";
                this.globals.OrderType = this.type;
            }
            else if (this.order_delivery) {
                this.type = "delivery";
                this.globals.OrderType = this.type;
            }
        }
        else {
            this.type = this.globals.OrderType;
        }
    };
    ModalPage.prototype.dateChanged = function () {
        console.log("time", this.globals.myDate);
    };
    ModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ModalPage.prototype.process = function (ProcessData) {
        var _this = this;
        if (this.globals.order_time == 'schedule') {
            localStorage.setItem("scheduled_time", this.globals.myDate);
        }
        else {
            localStorage.setItem("scheduled_time", undefined);
        }
        localStorage.setItem("GetAddress", this.globals.address);
        if (this.globals.OrderType == 'delivery') {
            this.checkTimingLater(this.globals.delivery_timing).then(function (resp) {
                _this.dismiss();
            }).catch(function (error) {
            });
        }
        else {
            this.checkTimingLater(this.globals.pickup_timing).then(function (resp) {
                _this.dismiss();
            }).catch(function (error) {
            });
        }
        this.globals.save_check = true;
    };
    ModalPage.prototype.process_cancel = function () {
        if (this.globals.order_time == 'schedule') {
            localStorage.setItem("scheduled_time", this.globals.myDate);
        }
        else {
            localStorage.setItem("scheduled_time", undefined);
        }
        localStorage.setItem("GetAddress", this.globals.address);
        this.dismiss();
    };
    ModalPage.prototype.secondModal = function () {
        var _this = this;
        // this.checktype();
        //this.viewCtrl.dismiss();
        var modal = this.modalCtrl.create('Modal2Page', { category_page: this.category_page });
        modal.onDidDismiss(function (data) {
            console.log("Dismiss called ");
            _this.segmentValue = localStorage.getItem("segmentvalue");
            _this.deliveryTime = _this.globals.pickupsetting;
            _this.pickup_time = _this.globals.pickup_Time;
            _this.getdata();
            console.log("Pick Up -> ", _this.globals.pickupsetting);
            console.log("Segment value -> ", _this.segmentValue);
            if (data == 'CategoryPage') {
                _this.category_page = 1;
                console.log(data, "dta", _this.category_page);
            }
        });
        modal.present();
    };
    ModalPage.prototype.getCurrentLocation = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.globals.delivery == true) {
                _this.geolocation.getCurrentPosition().then(function (resp) {
                    resolve(resp);
                }).catch(function (error) {
                });
            }
        });
    };
    ModalPage.prototype.reverseGeoCoding = function (lat, lng) {
        var _this = this;
        this.globals.lat = lat;
        this.globals.long = lng;
        var mycoordinates = lat + "," + lng;
        var response = this.server.getAddress(mycoordinates, this.branchId);
        var myadress = "";
        response.subscribe(function (data) {
            _this.loadMap(lat, lng);
            myadress = data.address;
            _this.globals.address = myadress;
            _this.globals.inradius = data.in_radius;
            if (data.delivery_meta && data.delivery_meta.id) {
                _this.globals.pickupsetting = data.delivery_meta.delivery_time;
                _this.globals.minimun_order = data.delivery_meta.delivery_minimum_order;
                _this.globals.deliveryCharges = data.delivery_meta.delivery_fee;
            }
            if (data.in_radius == false) {
                _this.globals.alertMessage("Sorry", "We don't deliver in your Area.");
                if (_this.globals.pickup == true) {
                    _this.type = "pickup";
                    _this.globals.OrderType = _this.type;
                }
                else {
                    _this.navCtrl.pop();
                }
            }
            localStorage.setItem("GetAddress", myadress);
        }, function (error) {
            localStorage.setItem("GetAddress", "");
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    ModalPage.prototype.Getscheduletime = function () {
        //commented by jahanzaib
        // this.viewCtrl.dismiss();
        // this.navCtrl.pop();
        var _this = this;
        var modal = this.modalCtrl.create('Modal2Page');
        modal.onDidDismiss(function (data) {
            console.log("Dismiss called schedule time");
            _this.segmentValue = localStorage.getItem("segmentvalue");
            _this.deliveryTime = _this.globals.pickupsetting;
            _this.pickup_time = _this.globals.pickup_Time;
            _this.getdata();
            console.log("Pick Up -> ", _this.globals.pickupsetting);
            console.log("Segment value -> ", _this.segmentValue);
            if (data == 'CategoryPage') {
                _this.category_page = 1;
                console.log(data, "dta", _this.category_page);
            }
        });
        modal.present();
    };
    ModalPage.prototype.loadMap = function (lati, longi) {
        // var latlng = this.coordinates.split(",")
        var myLatLng = new google.maps.LatLng(lati, longi);
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: myLatLng
        });
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
            title: ''
        });
    };
    ModalPage.prototype.CurrentAdressBox = function () {
        var _this = this;
        // this.NEW = true;
        if (this.CurrentAdress == true) {
            this.getCurrentLocation().then(function (resp) {
                _this.reverseGeoCoding(resp.coords.latitude, resp.coords.longitude);
                _this.NEW = false;
                _this.lat = resp.coords.latitude;
                _this.long = resp.coords.longitude;
            }).catch(function (e) {
                _this.reverseGeoCoding(0, 0);
            });
            // this.Address =  localStorage.getItem("GetAddress");
            // this.city = "lahore";
            // this.zipcode = "54000";
            // this.state = "punjab";
            this.NewAddress = false;
        }
        else {
            this.NewAddress = true;
        }
    };
    ModalPage.prototype.NewAddressBox = function () {
        this.NEW = true;
        this.NewAddress = true;
        if (this.NewAddress == true) {
            this.CurrentAdress = true;
            this.removedata();
            this.new_address_prompt();
            //this.CurrentAdress = false;
        }
        else {
            this.CurrentAdress = true;
        }
    };
    ModalPage.prototype.new_address_prompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Your Address',
            inputs: [
                {
                    name: 'street',
                    placeholder: 'Street'
                },
                {
                    name: 'apt',
                    placeholder: 'Apt#',
                },
                {
                    name: 'city',
                    placeholder: 'City',
                },
                {
                    name: 'state',
                    placeholder: 'State',
                },
                {
                    name: 'zip',
                    placeholder: 'Zip',
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Done',
                    handler: function (data) {
                        _this.Address = data.street + ',' + data.apt + ',' + data.city + ' ' + data.state + ',' + data.zip;
                        localStorage.setItem("address", _this.Address);
                    }
                }
            ]
        });
        alert.present();
    };
    ModalPage.prototype.removedata = function () {
        this.Address = "";
        this.city = "";
        this.zipcode = "";
        this.state = "";
    };
    ModalPage.prototype.Updateyourorder = function () {
        if (this.globals.OrderType == 'delivery') {
            this.checkTimingLater(this.globals.delivery_timing);
        }
        else {
            this.checkTimingLater(this.globals.pickup_timing);
        }
        if (this.globals.order_time == 'schedule') {
            localStorage.setItem("scheduled_time", this.globals.myDate);
        }
        else {
            localStorage.setItem("scheduled_time", undefined);
        }
        this.globals.OrderType = "pickup";
        this.viewCtrl.dismiss();
        this.globals.save_check = true;
    };
    //   checkTiming() {
    //     if (this.globals.OrderType = "delivery") {
    //         console.log("checking timing ");
    //         console.log("global timings", this .globals.Timing);
    //         if (this.globals.Timing) {
    //             let local_datetime = new Date().toLocaleString('en-US', { hour12: false });
    //             this.date = new Date(local_datetime);
    //             console.log("",this.date);
    //             this.scheduled_time = localStorage.getItem("scheduled_time");
    //             this.day = this.date.getDay();
    //             this.time = this.date.getHours();
    //             this.min = this.date.getMinutes();
    //             this.time = this.time + "." + this.min;
    //             console.log("day", "hours", this.day, this.time);
    //             let current_day = this.globals.Timing[this.day];
    //             // this.time = this.time.toString();
    //             console.log(this.time,"current day", current_day );
    //             console.log(this.globals.Timing);
    //             if (current_day[0] != 'opened') {
    //                 if (Number(this.time) <= Number(current_day[0]) || Number(this.time) >= Number(current_day[1]) || current_day[0] == 'closed') {
    //                     let alert = this.alertCtrl.create({
    //                         title: 'Sorry',
    //                         subTitle: 'Restaurants currently closed.',
    //                         buttons: ['OK']
    //                     });
    //                     alert.present();
    //                     return false;
    //                 }
    //                 else {
    //                     return true;
    //                 }
    //             }
    //             else {
    //                 return true;
    //             }
    //         }
    //         else {
    //             console.log("else");
    //             return true;
    //         }
    //     }
    //     else {
    //         console.log("bigelse");
    //         console.log("userDate", this.globals.myDate);
    //         var future_date = new Date(this.globals.myDate);
    //         console.log(future_date);
    //         var future_day = future_date.getDay();
    //         this.globals.myDate = this.globals.myDate.toString();
    //         console.log(this.globals.myDate);
    //         this.future_hours = future_date.getHours();
    //         this.future_min = future_date.getMinutes();
    //         this.future_time = this.future_hours + "." + this.future_min;
    //         console.log("future_hours", this.future_hours, this.future_time);
    //         if (this.globals.Timing) {
    //             console.log(future_day);
    //             var current_day = this.globals.Timing[future_day];
    //             console.log(current_day);
    //             console.log(current_day[0], current_day[1], this.future_time);
    //             //  console.log(parseFloat(time) , parseFloat(current_day[0]),parseFloat(current_day[1]))
    //             if (current_day[0] != 'opened') {
    //                 if (Number(this.future_time) <= Number(current_day[0]) || Number(this.future_time) >= Number(current_day[1]) || current_day[0] == 'closed') {
    //                     let alert = this.alertCtrl.create({
    //                         title: 'Sorry',
    //                         subTitle: 'Restaurants closed on the given time and date.',
    //                         buttons: ['OK']
    //                     });
    //                     alert.present();
    //                     return false;
    //                 }
    //                 else {
    //                     return true;
    //                 }
    //             }
    //             else {
    //                 return true;
    //             }
    //         }
    //         else {
    //             console.log("else");
    //             return true;
    //         }
    //         // return true;
    //     }
    // }
    //   initializeBackButtonCustomHandler(): void {
    //     this.unregisterBackButtonAction = this.plt.registerBackButtonAction(function(event){
    //         console.log('Prevent Back Button Page Change');
    //     }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
    // }   
    ModalPage.prototype.checkTimingLater = function (timing) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.globals.order_time == 'schedule') {
                var response;
                if (_this.globals.specific_delivery_day == 'true') {
                    response = _this.server.date_convert(_this.globals.myDate.format('DD-MM-YYYY'));
                }
                else {
                    response = _this.server.date_convert(_this.globals.myDate);
                }
                var loading_1 = _this.loadingCtrl.create({
                    content: "Loading...",
                });
                loading_1.present();
                response.subscribe(function (data) {
                    loading_1.dismiss();
                    if (data.success == true) {
                        _this.day = data.day_id + 1;
                        if (_this.day == 7) {
                            _this.day = 0;
                        }
                        _this.time = data.time;
                        _this.globals.schedule_day_id = data.day_id;
                        _this.globals.schedule_converted_time = data.time;
                        if (_this.globals.specific_delivery_day == 'true') {
                            localStorage.setItem("scheduled_time", _this.globals.myDate.format('DD-MM-YYYY'));
                        }
                        else {
                            localStorage.setItem("scheduled_time", _this.globals.myDate);
                        }
                        var current_day_1 = timing[_this.day];
                        var n = current_day_1[0].indexOf('.');
                        if (n != -1) {
                            var res = current_day_1[0].split(".");
                            current_day_1[0] = res[0] + '.' + '3';
                        }
                        var n1 = current_day_1[1].indexOf('.');
                        if (n1 != -1) {
                            var res = current_day_1[1].split(".");
                            current_day_1[1] = res[0] + '.' + '3';
                        }
                        // this.time = this.time.toString();
                        console.log(_this.day, _this.time, current_day_1);
                        if (current_day_1[0] != 'opened') {
                            if ((Number(current_day_1[0]) <= Number(_this.time) && Number(current_day_1[1]) > Number(_this.time)) || (Number(current_day_1[0]) <= Number(_this.time) && Number(current_day_1[1]) < Number(current_day_1[0]))) {
                                resolve(true);
                            }
                            else if (current_day_1[0] == 'opened' && current_day_1[1] == 'opened') {
                                resolve(true);
                            }
                            else {
                                _this.globals.presentToast('Sorry, we are not serving ' + _this.globals.OrderType + ' at this time.Please reschedule it.');
                                reject(true);
                            }
                        }
                        else {
                            resolve(true);
                        }
                    }
                }, function (error) {
                    _this.globals.presentToast("Something went wrong check your internet connection.");
                });
            }
            else {
                var date = new Date();
                var day = date.getDay();
                var time = date.getHours() + "." + date.getMinutes();
                time = Number(time);
                var current_day = timing[day];
                var n = current_day[0].indexOf('.');
                if (n != -1) {
                    var res = current_day[0].split(".");
                    current_day[0] = res[0] + '.' + '3';
                }
                var n1 = current_day[1].indexOf('.');
                if (n1 != -1) {
                    var res = current_day[1].split(".");
                    current_day[1] = res[0] + '.' + '3';
                }
                if ((Number(current_day[0]) <= time && Number(current_day[1]) > time) || (Number(current_day[0]) <= time && Number(current_day[1]) < Number(current_day[0]))) {
                    resolve(true);
                }
                else if (current_day[0] == 'opened' && current_day[1] == 'opened') {
                    resolve(true);
                }
                else {
                    _this.globals.presentToast('Sorry, we are not serving ' + _this.globals.OrderType + ' at this time.Please reschedule it.');
                    reject(true);
                }
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('searchbar', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], ModalPage.prototype, "searchbar", void 0);
    ModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-modal',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/modal/modal.html"*/'<!--\n  Generated template for the ModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content class="main-view">\n  <!-- <ion-icon name="close" (click)="closetohome()" class="gn"></ion-icon> -->\n  <div class="overlay">\n    <!-- <ion-buttons end> \n    <button ion-button (click)="dismiss()">\n      <span ion-text color="primary" showWhen="ios">Cancel</span>\n      <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n    </button>\n  </ion-buttons> -->\n\n  </div>\n  <div class="modal_content">\n\n    <h2 style="text-align: center;margin-top: 23px;\n    margin-bottom: 23px;"> Your Order Settings</h2>\n    <!-- <div style="padding-top: 0px;"padding>\n      <ion-segment [(ngModel)]="type"   (ionChange)="onsegmentChanged()" *ngIf="globals.delivery && globals.pickup">\n        <ion-segment-button value="delivery"  >\n          Delivery\n        </ion-segment-button>\n        <ion-segment-button value="pickup">\n          PickUp\n        </ion-segment-button>\n      </ion-segment>\n      <ion-segment [(ngModel)]="type"   (ionChange)="onsegmentChanged()" *ngIf="globals.delivery && !globals.pickup">\n        <ion-segment-button value="delivery" >\n          Delivery\n        </ion-segment-button>\n        \n      </ion-segment>\n      <ion-segment [(ngModel)]="type"   (ionChange)="onsegmentChanged()" *ngIf="globals.pickup && !globals.delivery">\n        <ion-segment-button value="pickup">\n          PickUp\n        </ion-segment-button>\n        \n      </ion-segment>\n    </div> -->\n    <ion-item>\n      <ion-label>Order Type</ion-label>\n      <ion-select [(ngModel)]="globals.OrderType">\n        <ion-option *ngIf="globals.delivery" value="delivery">Delivery</ion-option>\n        <ion-option *ngIf="globals.pickup" value="pickup">PickUp</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label style="text-transform: capitalize">{{globals.OrderType}} Type </ion-label>\n      <ion-select [(ngModel)]="globals.order_time">\n        <ion-option  value="now">ASAP </ion-option>\n        <ion-option value="schedule">Schedule</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item *ngIf="globals.order_time == \'now\'">\n      <ion-label style="text-transform: capitalize">{{globals.OrderType}} time </ion-label>\n      <ion-label style="text-align: right" *ngIf="globals.OrderType == \'delivery\'" >Now({{globals.pickupsetting}})</ion-label>\n      <ion-label style="text-align: right" *ngIf="globals.OrderType == \'pickup\'" >Now({{globals.pickup_Time}})</ion-label>\n      \n    </ion-item>\n\n    <ion-item class="time_d" *ngIf="globals.order_time == \'schedule\'">\n        <ion-label>Schedule Time</ion-label>\n        <ion-datetime min="{{value}}"  displayFormat=" MMM DD h:mm a" pickerFormat=" DD h:mm a"    [(ngModel)]="globals.myDate"  (ionChange)="dateChanged()">\n          </ion-datetime>\n    </ion-item>\n\n    <div *ngIf="globals.OrderType == \'delivery\'">\n      <h5 style="text-align: center; margin-top: 20px ; padding-top:0 ; font-size: 18px"><b>Delivery Address</b></h5>\n  \n      <ion-row>\n      \n        <ion-item style="border:7px solid #ccc; height: 20px;padding: 0">\n          <ion-searchbar class="searchbar-input" #searchbar placeholder="Enter Your Address" [(ngModel)]="globals.address"></ion-searchbar>\n        </ion-item>\n\n\n      </ion-row>\n      <ion-row>\n        <div #map id="map"></div>\n      </ion-row>\n    </div>\n\n    <!-- <div [ngSwitch]="type">\n\n      <ion-list *ngSwitchCase="\'delivery\'" no-lines>\n        <div style=" margin-top: 0 ; padding-top: 0%">\n          <ion-item style="margin-top:0px; margin-right: 8px; margin-bottom: 0px; margin-left: 0px">\n            <h5 style="text-align: center ; font-size: 18px;"><b>When would you like your order ?</b></h5>\n\n          </ion-item>\n          <ion-item style=" margin-top:-16px; align-content: center;">\n             <ion-datetime  displayFormat="MM DD YYYY h:mm a" placeholder="MM DD YYYY HH:mm" min="{{value}}" [(ngModel)]="myDate">\n          </ion-datetime> \n            <div class="col-4 center-block block" *ngIf="!segmentValue" (click)="Getscheduletime()">\n              <button ion-button clear class="time_heading">Now </button>\n              <br><span class="mytime" *ngIf="globals.pickupsetting">({{globals.pickupsetting}})</span>\n            </div>\n             <div  class="col-4 center-block "  style="margin-top:0; margin-bottom:0 ; align-content: center ; text-align: center ">\n          <button ion-button clear *ngIf="!segmentValue"  style="font-size: 15px;"  (click)="Getscheduletime()" >Now <span *ngIf="globals.pickupsetting">({{globals.pickupsetting}})</span></button>\n          </div> \n            <div class="col-4 center-block block" *ngIf="segmentValue == \'Asap\'" (click)="secondModal()">\n              <button ion-button clear class="time_heading">Now</button>\n              <br><span class="mytime" *ngIf="globals.pickupsetting">({{globals.pickupsetting}})</span>\n            </div>\n            <div class="col-4 center-block block" *ngIf="segmentValue == \'today\'" (click)="secondModal()">\n              <button ion-button clear class="time_heading">Today</button>\n              <br><span class="mytime" *ngIf="convertDate">({{convertDate}})</span>\n            </div>\n            <div class="col-4 center-block block" *ngIf="segmentValue == \'later\'" (click)="secondModal()">\n              <button ion-button clear class="time_heading">Schedule</button>\n              <br><span class="mytime" *ngIf="datenow">({{datenow}})</span>\n            </div>\n          </ion-item>\n          <ion-item>\n\n          </ion-item>\n          <ion-row radio-group responsive-sm  [(ngModel)]="orderSettings">\n          <ion-col col-1 >\n            <ion-checkbox [(ngModel)]="CurrentAdress"   (ionChange)="CurrentAdressBox()"   disable="true" ></ion-checkbox>\n          </ion-col >\n          <ion-col col-5>\n            <ion-label style="margin:0 0  0 0">Current Address</ion-label>\n\n          </ion-col>\n          <ion-col col-1 >\n            <ion-checkbox   [(ngModel)]="NewAddress"  \n            (ionChange)="NewAddressBox()"    disable="true" > </ion-checkbox>\n          </ion-col>\n          <ion-col col-5 style="padding-right: 9px">\n           \n            <ion-label style="margin:0 0  0 0"     >New Address</ion-label>\n\n          </ion-col>\n\n        </ion-row> \n          <button *ngIf="NEW == false" ion-button (click)="NewAddressBox()" class="mp" item-end>Change Address </button>\n          <button *ngIf="NEW == true" ion-button (click)="CurrentAdressBox()" class="mp" item-end>Current Address\n          </button>\n\n          <ion-row>\n            <form [formGroup]="ProcessForm" ng-submit="process(this.ProcessForm.value)" style="width: 100%">\n              <ion-item no-lines *ngIf="NEW == false">\n               <div *ngIf="NEW != true" > -->\n    <!-- </div> -->\n\n    <!-- <div *ngIf="NEW == true" >\n                <button style="height: 66%;" ion-button (click)="CurrentAdressBox()" item-end>Current Address </button>\n            </div> -->\n    <!-- <ion-icon style="margin-top: 30px; color: #000000;" name="pin" item-end></ion-icon> -->\n    <!-- <ion-textarea style="margin-left: 0px !important;" maxlength="100" type="text" autocomplete="on"\n                  placeholder="Enter Your Address" formControlName="Address" [(ngModel)]="Address"></ion-textarea>\n              </ion-item>\n\n              <ion-item no-lines *ngIf="NEW == true"> -->\n    <!-- <div *ngIf="NEW != true" > -->\n    <!-- <button style="height: 66%;" ion-button (click)="NewAddressBox()" item-end>New Address </button> -->\n    <!-- </div> -->\n\n    <!-- <div *ngIf="NEW == true" > -->\n    <!-- </div> -->\n    <!-- <ion-icon style="margin-top: 30px; color: #000000;" name="pin" item-end></ion-icon> -->\n    <!-- <ion-textarea style="margin-left: 0px !important;" maxlength="100" type="text" autocomplete="on"\n                  placeholder="Enter Your Address" formControlName="Address" [(ngModel)]="Address"></ion-textarea>\n              </ion-item> -->\n\n\n\n    <!-- </ion-item> -->\n    <!-- <ion-item>\n            <ion-input type="text" placeholder="Enter Your City"  formControlName="city"  [(ngModel)]="city" ></ion-input>\n          </ion-item>\n          <ion-item>\n              <ion-input type="text" placeholder="Enter Your State"    formControlName="state"  [(ngModel)]="state"  ></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-input type="text" placeholder="Enter Your Zip code" formControlName="zipcode"   [(ngModel)]="zipcode" ></ion-input>\n              </ion-item> -->\n    <!-- </form>\n          </ion-row>\n          <ion-row>\n            <div #map id="map"></div>\n          </ion-row>\n\n        </div>\n\n\n      </ion-list>\n\n      <ion-list *ngSwitchCase="\'pickup\'" no-lines>\n        <div style=" margin-top: 0 ; padding-top: 0%">\n          <ion-item no-lines>\n            <h5 style="text-align: center ; font-size: 18px;"><b>When would you like your order ?</b></h5>\n            <div *ngIf="!segmentValue" class="col-4 center-block block" (click)="Getscheduletime()">\n              <button ion-button clear class="time_heading">Now </button>\n              <br><span class="mytime" *ngIf="globals.pickup_Time">({{globals.pickup_Time}})</span>\n            </div>\n            <div *ngIf="segmentValue == \'Asap\'" class="col-4 center-block block" (click)="Getscheduletime()">\n              <button ion-button clear class="time_heading">Now </button>\n              <br><span class="mytime" *ngIf="globals.pickup_Time">({{globals.pickup_Time}})</span>\n            </div>\n\n\n            <div class="col-4 center-block block" *ngIf="segmentValue == \'today\'" (click)="Getscheduletime()">\n              <button ion-button clear class="time_heading">Today</button>\n              <br><span class="mytime" *ngIf="convertDate">({{convertDate}})</span>\n            </div>\n            <div class="col-4 center-block block" *ngIf="segmentValue == \'later\'" (click)="Getscheduletime()">\n              <button ion-button clear class="time_heading">Schedule</button>\n              <br><span class="mytime" *ngIf="datenow">({{datenow}})</span>\n            </div>\n          </ion-item>\n        </div>\n      </ion-list>\n\n    </div> -->\n\n\n  </div>\n\n</ion-content>\n\n<ion-footer >\n  <ion-row>\n    <ion-col col-6 no-padding>\n      <ion-buttons>\n          <button ion-button color="danger" block round outline (click)="process_cancel()">Cancel</button>\n\n      </ion-buttons>\n    </ion-col>\n    <ion-col col-6 no-padding>\n      <ion-buttons>\n          <button ion-button block round (click)="process(this.ProcessForm.value)" style="color: #fff;">Save</button>\n      </ion-buttons>\n    </ion-col>\n  </ion-row>\n\n</ion-footer>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/modal/modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_6__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]])
    ], ModalPage);
    return ModalPage;
}());

//# sourceMappingURL=modal.js.map

/***/ })

});
//# sourceMappingURL=26.js.map
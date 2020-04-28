webpackJsonp([23],{

/***/ 761:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OffersPageModule", function() { return OffersPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__offers__ = __webpack_require__(958);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var OffersPageModule = (function () {
    function OffersPageModule() {
    }
    OffersPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__offers__["a" /* OffersPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__offers__["a" /* OffersPage */]),
            ],
        })
    ], OffersPageModule);
    return OffersPageModule;
}());

//# sourceMappingURL=offers.module.js.map

/***/ }),

/***/ 958:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OffersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__ = __webpack_require__(161);
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









var OffersPage = (function () {
    function OffersPage(geolocation, diagnostic, server, alertCtrl, loadingCtrl, nativeStorage, toastCtrl, globals, http, navCtrl, navParams, modalCtrl) {
        this.geolocation = geolocation;
        this.diagnostic = diagnostic;
        this.server = server;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.nativeStorage = nativeStorage;
        this.toastCtrl = toastCtrl;
        this.globals = globals;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.myChoice = new Array();
        this.shownGroup = null;
        this.quantity_value = 1;
        this.errorMenu = false;
        this.presentModal();
        this.cartflag = this.navParams.get('CartFlag');
        this.PageFlag = this.navParams.get('pageflag');
        this.business_id = this.globals.bussinessId;
        // this.currentBusinessDiscount = "10";
        // this.globals.BusinessDiscount = this.currentBusinessDiscount;
        this.getLocation();
        this.myChoice.push('abcd');
        this.myChoice.pop();
        // this.toggleGroup(0);
        if (this.globals.branch_enabled != 1) {
            this.list();
        }
        else {
            this.Categories();
        }
    }
    OffersPage.prototype.checkTiming = function (Timing) {
        if (Timing.length > 0) {
            var date = new Date();
            var day = date.getDay();
            var time = date.getHours() + "." + date.getMinutes();
            var current_day = Timing[day];
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
            time = Number(time);
            console.log(Number(current_day[1]), time);
            if (current_day) {
                if ((Number(current_day[0]) <= time && Number(current_day[1]) > time) || (Number(current_day[0]) <= time && Number(current_day[1]) < Number(current_day[0]))) {
                    return true;
                }
                else if (current_day[0] == 'opened' && current_day[1] == 'opened') {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    };
    OffersPage.prototype.getLocation = function () {
        var _this = this;
        // this.diagnostic.isLocationEnabled()
        //     .then((state) => {
        if (this.globals.delivery == true) {
            this.geolocation.getCurrentPosition().then(function (position) {
                _this.coordinates = position.coords.latitude + "," + position.coords.longitude;
            }, function (err) {
                var alert = _this.alertCtrl.create({
                    title: 'Location is disabled',
                    subTitle: 'In order to proceed, Please enable your location',
                    buttons: ['OK']
                });
                alert.present();
                console.log(err);
            });
        }
        // }).catch(e => {
        // });
    };
    OffersPage.prototype.list = function () {
        var _this = this;
        var response = this.server.getRestaurantslist('100000', 'main', this.coordinates, '0', 'order');
        response.subscribe(function (data) {
            _this.places = data.results;
            var new_id = _this.globals.new_id;
            _this.places = _this.places.filter(function (item) {
                return item.business_id === new_id;
            });
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
            _this.globals.StripId = _this.places[0].stripe_id;
            _this.globals.availed_discount_count = parseInt(_this.places[0].customer_discount_availed_count);
            _this.globals.paypalId = _this.places[0].paypal_id;
            _this.globals.Timing = _this.places[0].hours_operation;
            _this.globals.pickup = _this.places[0].pickup;
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
            _this.Categories();
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
    OffersPage.prototype.historypage = function () {
        this.navCtrl.push("OrderListingPage");
    };
    OffersPage.prototype.presentModal = function () {
        if (this.globals.model_flag) {
            this.globals.model_flag = false;
            this.navCtrl.push("ModalPage");
            // let modal = this.modalCtrl.create('ModalPage');
            // modal.present();
        }
    };
    OffersPage.prototype.presentModal1 = function () {
        var modal = this.modalCtrl.create('ModalPage');
        modal.present();
    };
    OffersPage.prototype.ionViewDidLoad = function () {
        this.globals.showbackButton = true;
    };
    OffersPage.prototype.ionViewDidEnter = function () {
        this.globals.title = this.globals.category_name;
    };
    OffersPage.prototype.Cart = function (object, flag, id, image, freeextras) {
        if (this.globals.BusinessID == '-1' || this.globals.BusinessID == this.business_id) {
            this.globals.BusinessID = this.business_id;
            this.AddtoCart(object, flag, id, image, freeextras);
        }
        else {
            this.showPrompt(object, flag, id, image, freeextras);
        }
    };
    OffersPage.prototype.showPrompt = function (object, flag, id, image, freeextras) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Alert',
            message: "Are you sure you want to switch Restaurant? This will clear your current cart.",
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Okay',
                    handler: function (data) {
                        console.log('Saved clicked');
                        _this.globals.Product.length = 0;
                        _this.globals.BusinessID = _this.business_id;
                        // this.globals.BusinessDiscount = this.currentBusinessDiscount;
                        _this.AddtoCart(object, flag, id, image, freeextras);
                    }
                }
            ]
        });
        prompt.present();
    };
    OffersPage.prototype.toggleGroup = function (group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        }
        else {
            this.shownGroup = group;
        }
    };
    ;
    OffersPage.prototype.isGroupShown = function (group) {
        return this.shownGroup === group;
    };
    ;
    OffersPage.prototype.Categories = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.GetBusinessMenuCategories(this.globals.bussinessId);
        response.subscribe(function (data) {
            _this.data = data;
            loading.dismiss();
            _this.category = _this.data.categories;
            console.log("categories", _this.category);
            _this.name = _this.data.restaurant.name;
            _this.globals.title = _this.name;
            _this.globals.category_name = _this.name;
            _this.data.categories.forEach(function (element) {
                element.items.forEach(function (subelement) {
                    subelement.quantity = 1;
                });
            });
            var that = _this;
            for (var i = 0; i < _this.category.length; i++) {
                _this.category[i].items = _this.category[i].items.filter(function (item) {
                    return that.checkTiming(item.item_timings) == true;
                });
            }
            var checkoffers = _this.category.filter(function (item) {
                return item.dealFlag == 'true';
            });
            console.log(checkoffers, "ff");
            if (checkoffers.length == 0) {
                _this.errorMenu = true;
            }
            else {
                _this.errorMenu = false;
            }
            if (_this.data.categories.length == 0) {
                _this.DataFlag = true;
            }
            // console.log(this.data.restaurant.categories);
            // console.log(this.category);
        }, function (error) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Server times out, please try again',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    OffersPage.prototype.Detail = function (id, image, freeextras) {
        this.navCtrl.push('ItemDetailPage', { type: true, item_id: id, image: image, BusinesId: this.business_id, free_extras: freeextras });
    };
    OffersPage.prototype.OpenSettingPage = function () {
        this.navCtrl.push('SettingsPage');
    };
    OffersPage.prototype.AddtoCart = function (object, flag, id, image, freeextras) {
        var _this = this;
        this.cartObjectQuantity = 1;
        //this.globals.Product.push({menuId:"1",restId:"1",uniqueId:"1",menuItem:Name, image:Image,quantity: 1, basePrice:Price,totalPrice:Price,menuExtrasSelected:this.myChoice});
        this.subtotal = object.price * object.quantity;
        if (this.globals.Product.length > 0) {
            this.globals.cartflag = true;
            this.globals.Product.forEach(function (element) {
                if (!_this.isexist) {
                    if (element.menuItem == object.name) {
                        _this.index = _this.globals.Product.indexOf(element);
                        _this.isexist = true;
                    }
                    else {
                        _this.isexist = false;
                    }
                }
            });
            if (this.isexist) {
                if (flag == true) {
                    object.quantity += 1;
                    this.globals.Product[this.index].quantity = this.cartObjectQuantity + Number(this.globals.Product[this.index].quantity);
                    this.toastPresent('Item is successfully added to cart');
                    // this.navCtrl.push('ItemDetailPage',{  item_id:id,image:image,BusinesId:this.business_id,free_extras:freeextras})
                }
                else {
                    object.quantity = this.removeQuantity(object);
                    if (this.globals.Product[this.index].quantity != 1) {
                        this.globals.Product[this.index].quantity = Number(this.globals.Product[this.index].quantity) - this.cartObjectQuantity;
                        this.toastPresent('Item is successfully removed from the cart');
                    }
                }
                this.globals.Product[this.index].totalPrice = Number(object.price) * this.globals.Product[this.index].quantity;
                this.globals.Product[this.index].totalPrice = parseFloat(this.globals.Product[this.index].totalPrice).toFixed(2);
                this.isexist = false;
            }
            else {
                this.globals.Product.push({ menuId: "1", restId: this.globals.bussinessId, uniqueId: id, menuItem: object.name, image: object.image, quantity: object.quantity, basePrice: Number(object.price), totalPrice: Number(this.subtotal), menuExtrasSelected: this.myChoice });
                this.toastPresent('Item is successfully added to cart');
                // this.navCtrl.push('ItemDetailPage',{  item_id:id,image:image,BusinesId:this.business_id,free_extras:freeextras})
            }
        }
        else {
            if (flag == true) {
                this.globals.Product.push({ menuId: "1", restId: this.globals.bussinessId, uniqueId: id, menuItem: object.name, image: object.image, quantity: object.quantity, basePrice: Number(object.price), totalPrice: this.subtotal, menuExtrasSelected: this.myChoice });
                this.toastPresent('Item is successfully added to cart');
                //  this.navCtrl.push('ItemDetailPage',{  item_id:id,image:image,BusinesId:this.business_id,free_extras:freeextras})
                this.globals.cartflag = true;
            }
        }
        this.Savecart();
    };
    OffersPage.prototype.Savecart = function () {
        this.nativeStorage.setItem('Product', {
            array: this.globals.Product,
            businessDiscount: this.globals.BusinessDiscount,
            BusinessID: this.globals.BusinessID
        })
            .then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
    };
    // RetrieveSaveCart(){
    //     this.nativeStorage.getItem('Product').then(data=>{
    //         this.globals.BusinessID = data.BusinessID;
    //         console.log("retrieve native", data.BusinessID);
    //     }).catch(err => console.log);
    // }
    OffersPage.prototype.addQuantity = function (object) {
        object.quantity += 1;
    };
    OffersPage.prototype.removeQuantity = function (object) {
        if (object.quantity <= 1) {
            object.quantity = 1;
        }
        else {
            object.quantity -= 1;
        }
        return object.quantity;
    };
    OffersPage.prototype.toastPresent = function (Message) {
        var toast = this.toastCtrl.create({
            message: Message,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    };
    OffersPage.prototype.cartpage = function () {
        if (this.globals.Product.length == 0) {
            var alert_1 = this.alertCtrl.create({
                title: "Oops",
                message: "Your cart is empty.",
                buttons: ["Okay"]
            });
            alert_1.present();
        }
        else {
            this.navCtrl.push('CartPage', {}).then(function (response) {
                console.log('Response ' + response);
            }, function (error) {
                console.log('Error: ' + error);
            }).catch(function (exception) {
                console.log('Exception ' + exception);
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Navbar"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Navbar"])
    ], OffersPage.prototype, "navBar", void 0);
    OffersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-offers',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/offers/offers.html"*/'\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Special Offers</ion-title>\n    <ion-buttons end>\n        <button ion-button    (click)="cartpage()">\n            <ion-badge color="danger" *ngIf="globals.Product.length > 0">{{globals.Product.length}}</ion-badge>\n            <ion-icon name="cart" style="font-size: 2.5rem;"> </ion-icon>\n        </button>\n\n    </ion-buttons>\n</ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="background: #eee">\n        <div *ngIf="errorMenu == true">\n            <p style="padding-top: calc(50% - 11px); padding-right:20px; padding-left:20px; text-align: center; font-size: 22px; color:#333;"><ion-icon name="eye-off"></ion-icon></p>\n            <p no-margin style="padding-right:20px; padding-left:20px; text-align: center; font-size: 14px;">No Special Offers</p>\n        </div>\n  <div *ngFor="let d of category; let i=index">\n  \n    <div *ngIf="d.dealFlag == \'true\'" >\n         <ion-card *ngFor="let a of d.items" >\n            <ion-row>\n                <ion-col col-5>\n                    \n                    <img class="itm-img" *ngIf="a.image" src="{{a.image}}">\n                    <img class="itm-img" *ngIf="a.image == \'\' || !a.image" src={{globals.b_logo}}>\n                </ion-col>\n                <ion-col col-7 padding-left>\n                     \n                    <p  style="color:#444;font-size:1.8rem;line-height: .9">{{a.name}} </p>\n                    <p  style="font-size:1.3rem;">{{a.tagline}} </p>\n                 \n                      <p>${{a.quantity * a.price | number : \'1.2-2\'}}</p>\n                  <button ion-button color=\'primary\' class="or-" (click)="Detail(a.id,a.image,a.freeExtras)">Order Now</button>\n                </ion-col>\n               \n            </ion-row>\n        </ion-card>\n    </div>\n</div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/offers/offers.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"]])
    ], OffersPage);
    return OffersPage;
}());

//# sourceMappingURL=offers.js.map

/***/ })

});
//# sourceMappingURL=23.js.map
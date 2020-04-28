webpackJsonp([46],{

/***/ 764:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryPageModule", function() { return CategoryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__category__ = __webpack_require__(961);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CategoryPageModule = (function () {
    function CategoryPageModule() {
    }
    CategoryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__category__["a" /* CategoryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__category__["a" /* CategoryPage */]),
            ],
        })
    ], CategoryPageModule);
    return CategoryPageModule;
}());

//# sourceMappingURL=category.module.js.map

/***/ }),

/***/ 961:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
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









var CategoryPage = (function () {
    function CategoryPage(geolocation, diagnostic, server, alertCtrl, loadingCtrl, nativeStorage, toastCtrl, globals, http, navCtrl, navParams, modalCtrl) {
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
        this.categories_section = 'category';
        if (!this.globals.caos_flag) {
            console.log("Modal call from category");
            if (this.globals.branch_enabled == 1) {
                this.branchId = this.globals.bussinessId;
            }
            this.presentModal(0);
        }
        else {
            this.globals.OrderType = 'pickup';
        }
        this.cartflag = this.navParams.get('CartFlag');
        this.PageFlag = this.navParams.get('pageflag');
        this.business_id = this.globals.bussinessId;
        // this.currentBusinessDiscount = "10";
        // this.globals.BusinessDiscount = this.currentBusinessDiscount;
        if (!this.globals.caos_flag) {
            this.getLocation();
        }
        this.myChoice.push('abcd');
        this.myChoice.pop();
        // this.toggleGroup(0);
        // if(this.globals.branch_enabled != 1){
        //     this.list();      
        // }
        // else{
        this.Categories();
        //}
    }
    CategoryPage.prototype.ionViewWillEnter = function () {
        this.globals.title = this.globals.category_name;
    };
    CategoryPage.prototype.ionViewDidEnter = function () {
        console.log("I'm here in this once");
    };
    CategoryPage.prototype.checkTiming = function (Timing) {
        if (Timing && Timing.length > 0) {
            var scheduled_time_ = localStorage.getItem("scheduled_time");
            var date;
            var time;
            var day;
            if (scheduled_time_) {
                day = this.s_day;
                time = this.s_time;
            }
            else {
                date = new Date();
                day = date.getDay();
                time = date.getHours() + "." + date.getMinutes();
            }
            if (day == 7) {
                day = 0;
            }
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
    CategoryPage.prototype.time_change = function () {
        var _this = this;
        var scheduled_time_ = localStorage.getItem("scheduled_time");
        var response = this.server.date_convert(scheduled_time_);
        response.subscribe(function (data) {
            if (data.success == true) {
                _this.s_day = data.day_id + 1;
                _this.s_time = data.time;
            }
            var that = _this;
            for (var i = 0; i < _this.category.length; i++) {
                _this.category[i].items = _this.category[i].items.filter(function (item) {
                    return that.checkTiming(item.item_timings) == true;
                });
            }
        }, function (error) {
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    CategoryPage.prototype.getLocation = function () {
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
    CategoryPage.prototype.list = function () {
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
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    CategoryPage.prototype.historypage = function () {
        this.navCtrl.push("OrderListingPage");
    };
    CategoryPage.prototype.presentModal = function (type) {
        // this.navCtrl.pop({animate:false}); // added by jahanzaib 21-01-19
        // this.navCtrl.push("ModalPage",{category_page:1},{animate: false});
        var _this = this;
        if (type == 1) {
            var modal = this.modalCtrl.create('ModalPage');
            modal.onDidDismiss(function (data) {
                _this.Categories();
            });
            modal.present();
        }
        else {
            if (this.globals.model_flag) {
                this.globals.model_flag = false;
                var modal = this.modalCtrl.create('ModalPage');
                modal.onDidDismiss(function (data) {
                    _this.Categories();
                });
                modal.present();
            }
        }
    };
    CategoryPage.prototype.ionViewDidLoad = function () {
        this.globals.showbackButton = true;
    };
    CategoryPage.prototype.Cart = function (object, flag, id, image, freeextras) {
        if (this.globals.BusinessID == '-1' || this.globals.BusinessID == this.business_id) {
            this.globals.BusinessID = this.business_id;
            this.AddtoCart(object, flag, id, image, freeextras);
        }
        else {
            this.showPrompt(object, flag, id, image, freeextras);
        }
    };
    CategoryPage.prototype.showPrompt = function (object, flag, id, image, freeextras) {
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
    CategoryPage.prototype.toggleGroup = function (group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        }
        else {
            this.shownGroup = group;
        }
    };
    ;
    CategoryPage.prototype.isGroupShown = function (group) {
        return this.shownGroup === group;
    };
    ;
    CategoryPage.prototype.Categories = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.GetBusinessMenuCategories(this.globals.bussinessId);
        response.subscribe(function (data) {
            console.log("get business categories", data);
            _this.data = data;
            loading.dismiss();
            _this.category = _this.data.categories;
            _this.name = _this.data.restaurant.name;
            _this.globals.title = _this.name;
            _this.globals.category_name = _this.name;
            _this.data.categories.forEach(function (element) {
                element.items.forEach(function (subelement) {
                    subelement.quantity = 1;
                });
            });
            _this.time_change();
            _this.forsearch = _this.category;
            if (_this.data.categories.length == 0) {
                _this.DataFlag = true;
            }
            // console.log(this.data.restaurant.categories);
            // console.log(this.category);
        }, function (error) {
            loading.dismiss();
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    CategoryPage.prototype.Detail = function (id, image, freeextras, type) {
        this.navCtrl.push('ItemDetailPage', { type: type, item_id: id, image: image, BusinesId: this.business_id, free_extras: freeextras });
    };
    CategoryPage.prototype.OpenSettingPage = function () {
        this.navCtrl.push('SettingsPage');
    };
    CategoryPage.prototype.AddtoCart = function (object, flag, id, image, freeextras) {
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
    CategoryPage.prototype.Savecart = function () {
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
    CategoryPage.prototype.addQuantity = function (object) {
        object.quantity += 1;
    };
    CategoryPage.prototype.removeQuantity = function (object) {
        if (object.quantity <= 1) {
            object.quantity = 1;
        }
        else {
            object.quantity -= 1;
        }
        return object.quantity;
    };
    CategoryPage.prototype.toastPresent = function (Message) {
        var toast = this.toastCtrl.create({
            message: Message,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    };
    CategoryPage.prototype.cartpage = function () {
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
    CategoryPage.prototype.click = function (d, event) {
        this.globals.menu_id = d.category_id;
        console.log('category ID', this.globals.menu_id);
    };
    CategoryPage.prototype.searchnew = function () {
        var val = this.keyword;
        if (val) {
            if (val && val.trim() != '') {
                this.category = this.forsearch;
                this.category = this.category.filter(function (item) {
                    return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                });
            }
        }
        else {
            this.category = this.forsearch;
        }
    };
    CategoryPage.prototype.onCancel = function (e) {
        this.category = this.forsearch;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Navbar"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Navbar"])
    ], CategoryPage.prototype, "navBar", void 0);
    CategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-category',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/category/category.html"*/'\n<ion-header class="Open-Sans-bold">\n\n    <ion-navbar color="primary">\n        <ion-title>{{name}}</ion-title>\n       \n        <ion-buttons end>\n            <button ion-button    (click)="cartpage()">\n                <ion-badge color="danger" *ngIf="globals.Product.length > 0">{{globals.Product.length}}</ion-badge>\n                <ion-icon name="cart" style="font-size: 2.5rem;"> </ion-icon>\n            </button>\n\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content class="Open-Sans-regular" >\n        <ion-searchbar [(ngModel)]="keyword" [showCancelButton]="shouldShowCancel"  (ionInput)="searchnew()" name="first"></ion-searchbar>        \n\n    <img src={{globals.b_logo}} class="icon-main">\n   \n    <ion-row>\n         <button *ngIf="!globals.caos_flag" ion-button outline block round clear class="u-d" color="primary" (click)="presentModal(1)">Update Delivery or Pickup</button>\n    </ion-row>\n\n    <div padding>\n        <ion-segment [(ngModel)]="categories_section" *ngIf="globals.catering_enabled">\n                <ion-segment-button value="category">\n                    Regular Items\n                </ion-segment-button>\n                <ion-segment-button value="catering">\n                    Catering Items \n                </ion-segment-button>\n            </ion-segment>\n    </div>\n   \n        <div [ngSwitch]="categories_section">\n            <ion-list *ngSwitchCase="\'category\'">\n                    <ion-card *ngIf="DataFlag" style="text-align:center; padding: 20px; font-size: 2rem; font-weight: bold; color:#000000;margin-top:40%">\n                            Menus coming soon \n                        </ion-card>\n                        <div *ngFor="let d of category; let i=index">\n                            <div style="position: relative;" *ngIf="d.is_anniversary == \'false\' && d.is_birthday == \'false\' && d.items.length > 0 && d.catering_enabled == false"  text-wrap [ngClass]="{active: isGroupShown(i)}">\n                                <img  class="cat-img1" *ngIf="d.dealFlag == \'true\'" src="assets/imgs/promotion.png">\n                               <!-- <img *ngIf="!d.image" class="cat-img" src="assets/imgs/Category-Placeholder.png"-->\n                                <div *ngIf="d.image"  (click)="click(d, $event)" (click)="toggleGroup(i)" [ngStyle]="{\'background-image\': \'url(\'+d.image+\')\'}" class="b_image" >\n                                   <div class="overlay accrodian" [ngClass]="{active_accrodian: !isGroupShown(i)}">\n                                    {{d.name}}\n                                    <ion-icon  item-right [name]="isGroupShown(i) ? \'ios-arrow-down\' : \'ios-arrow-forward\'"></ion-icon>\n                    \n                                   </div>\n                                </div>\n                                <p *ngIf="!d.image" (click)="click(d, $event)" (click)="toggleGroup(i)" [ngStyle]="{\'background-color\': d.color}" class="accrodian" [ngClass]="{active_accrodian: !isGroupShown(i)}">\n                                    {{d.name}}\n                                    <ion-icon  item-right [name]="isGroupShown(i) ? \'ios-arrow-down\' : \'ios-arrow-forward\'"></ion-icon>\n                                </p>\n                        \n                        \n                                <div *ngIf="isGroupShown(i)" >\n                                    <ion-list>\n                                        <ion-card *ngFor="let a of d.items">\n                                       <ion-row *ngIf="a.stock_quantity > 0" (click)="Detail(a.id,a.image,a.freeExtras,true)">\n                                            <ion-col col-3 style="margin: auto;" >\n                                                \n                                                <img class="itm-img" *ngIf="a.image" src="{{a.image}}">\n                                                <img class="itm-img" *ngIf="a.image == \'\' || !a.image" src={{globals.b_logo}}>\n                                            </ion-col>\n                                            <ion-col col-6 style="margin:auto">\n                                                 \n                                                <p  style="color:#444;font-size:1.5rem">{{a.name}} </p>\n                                                <p  style="font-size:1.3rem;    padding-bottom: 10px;">{{a.tagline}} </p>\n                        \n                        \n                                            </ion-col>\n                                            <ion-col col-3 text-right style="color:#444;margin: auto;padding: 0;">\n                                                    <div *ngIf="i==0" class="for-badge">\n                                                            <ion-badge  style="background-color: transparent">  </ion-badge>\n                                                    </div>\n                                                    \n                                                    <span *ngIf="a.quantity * a.price != 0 || a.quantity * a.price != \'0\'">${{a.quantity * a.price | number : \'1.2-2\'}}</span>\n                                            </ion-col>\n                                        </ion-row>\n                    \n                                        <ion-row *ngIf="a.stock_quantity == 0">\n                                                <ion-col col-3 style="margin: auto;" >\n                                                    \n                                                    <img class="itm-img" *ngIf="a.image" src="{{a.image}}">\n                                                    <img class="itm-img" *ngIf="a.image == \'\' || !a.image" src={{globals.b_logo}}>\n                                                </ion-col>\n                                                <ion-col col-6 style="margin:auto">\n                                                     \n                                                    <p  style="color:#444;font-size:1.5rem">{{a.name}} </p>\n                                                    <p  style="font-size:1.3rem;    padding-bottom: 10px;">{{a.tagline}} </p>\n                            \n                            \n                                                </ion-col>\n                                                <ion-col col-3 text-right style="color:#444;margin: auto;padding: 0;">                \n                                                        <span *ngIf="a.quantity * a.price != 0 || a.quantity * a.price != \'0\' || a.price">${{a.quantity * a.price | number : \'1.2-2\'}}</span>\n                                                        <ion-badge  > Sold Out </ion-badge>\n                                                \n                                                </ion-col>\n                                            </ion-row>\n                                    </ion-card>\n                                    </ion-list>\n                                </div>\n                            </div>\n                        </div>\n            </ion-list>\n            \n            <ion-list *ngSwitchCase="\'catering\'">\n                    <ion-card *ngIf="DataFlag" style="text-align:center; padding: 20px; font-size: 2rem; font-weight: bold; color:#000000;margin-top:40%">\n                            Menus coming soon \n                        </ion-card>\n                        <div *ngFor="let d of category; let i=index">\n                            <div style="position: relative;" *ngIf="d.is_anniversary == \'false\' && d.is_birthday == \'false\' && d.items.length > 0 && d.catering_enabled == true"  text-wrap [ngClass]="{active: isGroupShown(i)}">\n                                <img  class="cat-img1" *ngIf="d.dealFlag == \'true\'" src="assets/imgs/promotion.png">\n                               <!-- <img *ngIf="!d.image" class="cat-img" src="assets/imgs/Category-Placeholder.png"-->\n                                <div *ngIf="d.image" (click)="toggleGroup(i)" [ngStyle]="{\'background-image\': \'url(\'+d.image+\')\'}" class="b_image" >\n                                   <div class="overlay accrodian" [ngClass]="{active_accrodian: !isGroupShown(i)}">\n                                    {{d.name}}\n                                    <ion-icon  item-right [name]="isGroupShown(i) ? \'ios-arrow-down\' : \'ios-arrow-forward\'"></ion-icon>\n                    \n                                   </div>\n                                </div>\n                                <p *ngIf="!d.image" (click)="toggleGroup(i)" [ngStyle]="{\'background-color\': d.color}" class="accrodian" [ngClass]="{active_accrodian: !isGroupShown(i)}">\n                                    {{d.name}}\n                                    <ion-icon  item-right [name]="isGroupShown(i) ? \'ios-arrow-down\' : \'ios-arrow-forward\'"></ion-icon>\n                                </p>\n                        \n                        \n                                <div *ngIf="isGroupShown(i)" >\n                                    <ion-list>\n                                        <ion-card *ngFor="let a of d.items">\n                                       <ion-row *ngIf="a.stock_quantity > 0" (click)="Detail(a.id,a.image,a.freeExtras,globals.catering_cart_enabled)">\n                                            <ion-col col-3 style="margin: auto;" >\n                                                \n                                                <img class="itm-img" *ngIf="a.image" src="{{a.image}}">\n                                                <img class="itm-img" *ngIf="a.image == \'\' || !a.image" src={{globals.b_logo}}>\n                                            </ion-col>\n                                            <ion-col col-6 style="margin:auto">\n                                                 \n                                                <p  style="color:#444;font-size:1.5rem">{{a.name}} </p>\n                                                <p  style="font-size:1.3rem;    padding-bottom: 10px;">{{a.tagline}} </p>\n                        \n                        \n                                            </ion-col>\n                                            <ion-col col-3 text-right style="color:#444;margin: auto;padding: 0;">\n                                                    <div *ngIf="i==0" class="for-badge">\n                                                            <ion-badge  style="background-color: transparent">  </ion-badge>\n                                                    </div>\n                                                    \n                                                    <span *ngIf="a.quantity * a.price != 0 || a.quantity * a.price != \'0\'">${{a.quantity * a.price | number : \'1.2-2\'}}</span>\n                                            </ion-col>\n                                        </ion-row>\n                    \n                                        <ion-row *ngIf="a.stock_quantity == 0">\n                                                <ion-col col-3 style="margin: auto;" >\n                                                    \n                                                    <img class="itm-img" *ngIf="a.image" src="{{a.image}}">\n                                                    <img class="itm-img" *ngIf="a.image == \'\' || !a.image" src={{globals.b_logo}}>\n                                                </ion-col>\n                                                <ion-col col-6 style="margin:auto">\n                                                     \n                                                    <p  style="color:#444;font-size:1.5rem">{{a.name}} </p>\n                                                    <p  style="font-size:1.3rem;    padding-bottom: 10px;">{{a.tagline}} </p>\n                            \n                            \n                                                </ion-col>\n                                                <ion-col col-3 text-right style="color:#444;margin: auto;padding: 0;">                \n                                                        <span *ngIf="a.quantity * a.price != 0 || a.quantity * a.price != \'0\'">${{a.quantity * a.price | number : \'1.2-2\'}}</span>\n                                                        <ion-badge  > Sold Out </ion-badge>\n                                                \n                                                </ion-col>\n                                            </ion-row>\n                                    </ion-card>\n                                    </ion-list>\n                                </div>\n                            </div>\n                        </div>\n            </ion-list>\n        </div>\n\n   \n\n</ion-content>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/category/category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"]])
    ], CategoryPage);
    return CategoryPage;
}());

//# sourceMappingURL=category.js.map

/***/ })

});
//# sourceMappingURL=46.js.map
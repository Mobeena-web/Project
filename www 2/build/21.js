webpackJsonp([21],{

/***/ 763:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderPlacedDetailPageModule", function() { return OrderPlacedDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_placed_detail__ = __webpack_require__(960);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var OrderPlacedDetailPageModule = (function () {
    function OrderPlacedDetailPageModule() {
    }
    OrderPlacedDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__order_placed_detail__["a" /* OrderPlacedDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__order_placed_detail__["a" /* OrderPlacedDetailPage */]),
            ],
        })
    ], OrderPlacedDetailPageModule);
    return OrderPlacedDetailPageModule;
}());

//# sourceMappingURL=order-placed-detail.module.js.map

/***/ }),

/***/ 960:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderPlacedDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(25);
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
 * Generated class for the OrderPlacedDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrderPlacedDetailPage = (function () {
    function OrderPlacedDetailPage(globals, alertCtrl, loadingCtrl, server, viewCtrl, navCtrl, navParams) {
        this.globals = globals;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.server = server;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userChoices = [];
        this.orders = navParams.get('data');
        this.time = navParams.get('time');
        this.instructions = navParams.get('instructions');
        console.log(this.instructions);
        this.schedule_time = navParams.get('schedule_time');
        this.res_name = navParams.get('res');
        this.tot = navParams.get('tot');
        this.o_id = navParams.get('o_id');
        this.payment_type = navParams.get('p_type');
        console.log("payment type", this.payment_type);
    }
    OrderPlacedDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderPlacedDetailPage');
    };
    OrderPlacedDetailPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    OrderPlacedDetailPage.prototype.ReorderVerificationPrompt = function (orderdata) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Alert',
            message: "Your reorder will be placed in your cart. Click the cart icon to proceed with your order.",
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
                        console.log('OK clicked', orderdata);
                        orderdata = orderdata.filter(function (item) {
                            return item.reward === false;
                        });
                        _this.globals.Product = orderdata;
                        _this.navCtrl.popToRoot();
                        // this.Categories(orderdata);
                    }
                }
            ]
        });
        prompt.present();
    };
    OrderPlacedDetailPage.prototype.Categories = function (orderdata) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "loading...",
        });
        loading.present();
        console.log(orderdata);
        var response = this.server.GetBusinessMenuCategories(orderdata[0].restId);
        response.subscribe(function (data) {
            var res = data;
            console.log(res);
            loading.dismiss();
            // console.log(this.data.categories);
            _this.category = res.categories;
            console.log("data", _this.category);
            //this.userChoices.length = 0;
            orderdata.forEach(function (userdata) {
                console.log(userdata);
                _this.category.forEach(function (element) {
                    console.log(userdata.menuItem, element, element.tax);
                    _this.globals.tax = element.tax;
                    element.items.forEach(function (subelement) {
                        if (userdata.menuItem == subelement.name) {
                            if (userdata.menuExtrasSelected.length == 0) {
                                console.log(userdata.quantity, userdata.restId);
                                var total_price = Number(userdata.quantity) * Number(subelement.price);
                                console.log(_this.globals.Product);
                                if (userdata.reward == false) {
                                    _this.globals.Product.push({ menuId: "1", restId: userdata.restId, uniqueId: "1", menuItem: subelement.name, image: subelement.image, quantity: userdata.quantity, basePrice: Number(subelement.price), totalPrice: Number(total_price), menuExtrasSelected: [] });
                                }
                                console.log("global product", _this.globals.Product);
                                _this.navCtrl.popToRoot();
                            }
                            else {
                                console.log(userdata.menuExtrasSelected, subelement);
                                console.log("else");
                                _this.total_price_with_extras = Number(userdata.quantity) * Number(subelement.price);
                                console.log("global product", _this.globals.Product);
                                _this.getExtras(subelement.id, userdata.menuExtrasSelected);
                                if (userdata.reward == false) {
                                    _this.globals.Product.push({ menuId: "1", restId: userdata.restId, uniqueId: "1", menuItem: subelement.name, image: subelement.image, quantity: userdata.quantity, basePrice: Number(subelement.price), totalPrice: Number(_this.total_price_with_extras), menuExtrasSelected: _this.userChoices });
                                }
                                console.log("global product", _this.globals.Product);
                                _this.navCtrl.popToRoot();
                            }
                        }
                    });
                });
            });
            //console.log("data1",this.data);
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
    OrderPlacedDetailPage.prototype.getExtras = function (ItemId, userExtras) {
        var _this = this;
        var response = this.server.ProductItemDetail(ItemId);
        response.subscribe(function (data) {
            console.log(data.item.extras);
            console.log(userExtras);
            userExtras.forEach(function (userextra_element) {
                console.log(userextra_element);
                data.item.extras.forEach(function (data_extra_element) {
                    console.log(data.item.extras);
                    console.log(userextra_element.optionNameSelected);
                    userextra_element.optionNameSelected.forEach(function (user_option_element) {
                        data_extra_element.options.forEach(function (data_option_element) {
                            if (user_option_element.name == data_option_element.name) {
                                _this.total_price_with_extras += user_option_element.quantity * Number(data_option_element.price);
                                var data = { heading: data_extra_element.heading, optionNameSelected: [{ name: data_option_element.name, price: Number(data_option_element.price), quantity: user_option_element.quantity, total: Number(data_option_element.price) * user_option_element.quantity, isFree: false }] };
                                console.log(data);
                                _this.userChoices.push(data);
                                console.log(_this.userChoices);
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
    OrderPlacedDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-order-placed-detail',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/order-placed-detail/order-placed-detail.html"*/'<!--\n  Generated template for the OrderPlacedDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color="primary">\n    <ion-title>Detail</ion-title>\n\n    <!-- <ion-buttons start>\n     <button ion-button style = "color:white;" (click)="close()" clear small >Close</button>\n    </ion-buttons> -->\n    <ion-buttons end>\n      <button ion-button style="color:white;" (click)="ReorderVerificationPrompt(orders)" clear small>Reorder</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content  class="Open-Sans-bold">\n\n\n  <ion-grid>\n\n    <ion-row style="\n       margin-bottom: 15px;\n       background:white">\n      <ion-col style="font-size:1.7rem">\n        <div>\n          <p class="order_head">Order# {{o_id}} </p>\n        </div>\n        <p class="tt"> Total: ${{tot}}</p>\n        <p> Placed Time: {{time}} </p>\n        <p> Scheduled Time: {{schedule_time}} </p>\n        <p *ngIf="payment_type">Payment Type:{{payment_type}}</p>\n        \n        <div style="margin-bottom:5px" *ngIf="instructions != null">\n          <ion-label  style="font-weight: bold;font-size: 24px;"> Instructions</ion-label>\n          <p> Type: {{instructions.Type}}</p>\n          <p *ngIf="instructions.GainDiscount > 0">Gain Discount: ${{instructions.GainDiscount}}</p>\n          <p *ngIf="instructions.BusinessDiscount > 0">Business Discount: {{instructions.BusinessDiscount}}%</p>\n          <p *ngIf="instructions.Notes != \'\' ">Notes: {{instructions.Notes}}</p>\n          <p *ngIf="instructions.Points > 0">Points Used: {{instructions.Points}}</p>\n          <p *ngIf="instructions.StoreCredit > 0"> Store Credit: ${{instructions.StoreCredit}}</p>\n          <p *ngIf="instructions.Tip > 0">Tip: ${{instructions.Tip}}</p>\n          <p *ngIf="instructions.tax">Tax: ${{instructions.tax}}</p>\n\n        </div>\n      </ion-col>\n    </ion-row>\n\n    <ion-label style="text-align: center;\n  font-size: 1.7rem;\n  background: #333;\n  margin-bottom: 0;\n  margin-right: 0;\n  color: white;\n  margin-top:0;\n  padding: 15px;">Order Detail</ion-label>\n    <div *ngFor="let order of orders">\n      <ion-row style="background: white; border-bottom: solid thin #eee;margin-bottom: 8px;">\n        <ion-col col-4 style="margin:auto">\n          <img style="border-radius: 4px;   height: 70px;" *ngIf="order.image"  src="{{order.image}}">\n        </ion-col>\n        <ion-col col-5 style="margin:auto">\n          <p style="font-size:2rem;color:black">\n            {{order.menuItem}}\n          </p>\n          <ion-label style="margin-bottom:0;  font-size:2rem ; margin-top: 0;">\n            <ion-icon color="primary" name="basket"></ion-icon> {{order.quantity}} </ion-label>\n\n        </ion-col>\n        <ion-col style="margin:auto;font-size: 2rem;text-align:center">\n          <p> ${{order.totalPrice}} </p>\n        </ion-col>\n\n        <div style="margin-bottom: 5px;background:white;width: 100%;" *ngIf="order.menuExtrasSelected.length > 0">\n          <ion-label style="font-size:2rem;  margin-top:0;  font-size: 2rem; background: #333;  padding: 5px; margin-left:0; margin-right:0;text-align: center;  color: white;">Extras </ion-label>\n          <div style="    padding-left: 10px;" *ngFor="let extra of order.menuExtrasSelected ">\n            <!-- <ion-label>{{extra.heading}} </ion-label>  -->\n            <ion-row *ngFor="let option of extra.optionNameSelected ">\n              <ion-col style="text-align:center">\n                <p> {{option.name}} </p>\n              </ion-col>\n              <ion-col style="text-align:center">\n                <p *ngIf="option.isFree == false">${{option.price}} </p>\n                <ion-label *ngIf="option.isFree == true" style="text-align:right;text-align: center;\n                background: #333;\n                color: white;   \n                padding: 5px;\n                margin-right:0;   \n                ">Free </ion-label>\n              </ion-col>\n            </ion-row>\n          </div>\n        </div>\n\n\n      </ion-row>\n      <!-- <ion-label style="text-align: center;font-size: 1.7rem;background: #333;margin-bottom: 0;margin-right: 0;color: white;margin-top:0;padding: 15px;">Customer Detail</ion-label>\n      <p> Name: {{globals.firstName}}{{globals.lastName}} </p>\n      <p>Phone:{{globals.o_phone}}</p>\n      <p>Email:{{globals.o_email}}</p> -->\n\n      \n\n    </div>\n\n  </ion-grid>\n\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/order-placed-detail/order-placed-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], OrderPlacedDetailPage);
    return OrderPlacedDetailPage;
}());

//# sourceMappingURL=order-placed-detail.js.map

/***/ })

});
//# sourceMappingURL=21.js.map
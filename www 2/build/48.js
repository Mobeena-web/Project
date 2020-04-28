webpackJsonp([48],{

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartDetailPageModule", function() { return CartDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_detail__ = __webpack_require__(922);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CartDetailPageModule = (function () {
    function CartDetailPageModule() {
    }
    CartDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__cart_detail__["a" /* CartDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__cart_detail__["a" /* CartDetailPage */]),
            ],
        })
    ], CartDetailPageModule);
    return CartDetailPageModule;
}());

//# sourceMappingURL=cart-detail.module.js.map

/***/ }),

/***/ 922:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartDetailPage; });
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


/**
 * Generated class for the CartDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CartDetailPage = (function () {
    function CartDetailPage(viewCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.product = this.navParams.get('product');
    }
    CartDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CartDetailPage');
    };
    CartDetailPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    CartDetailPage.prototype.addOptionQuantity = function (object, extras) {
        console.log(object, extras, "object");
        console.log(object.totalPrice, object.quantity, object.basePrice);
        extras.quantity += 1;
        var extras_total = extras.quantity * extras.price;
        console.log(extras_total);
        object.totalPrice = Number(object.basePrice) * Number(object.quantity);
        object.totalPrice += extras_total;
        // object.totalPrice= Number(object.quantity) * Number(object.basePrice);
        // console.log(object.totalPrice);
        // console.log( object.totalPrice,object.quantity,object.basePrice);
    };
    CartDetailPage.prototype.removeOptionQuantity = function (object, extras) {
        console.log(object, extras, "object");
        if (extras.quantity <= 1) {
            extras.quantity = 1;
        }
        else {
            extras.quantity -= 1;
            var extras_total = extras.quantity * extras.price;
            console.log(extras_total);
            object.totalPrice = Number(object.basePrice) * Number(object.quantity);
            object.totalPrice += extras_total;
            // object.totalPrice =Number(object.quantity) * Number(object.basePrice);
            // console.log(object.totalPrice);
            // console.log( object.totalPrice,object.quantity,object.basePrice);
        }
    };
    CartDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-cart-detail',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/cart-detail/cart-detail.html"*/'<!--\n  Generated template for the ItemDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color="primary">\n    <ion-title>{{product.menuItem}}</ion-title>\n    <!-- <ion-buttons end>\n    <button ion-button icon-only (click)="close()">Close</button>\n  </ion-buttons> -->\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="Open-Sans-regular" style="background-color:#eee !important;">\n\n\n    <img *ngIf="product.image"  src="{{product.image}}">\n    <img *ngIf="!product.image || product.image == \'\'"  src={{globals.b_logo}}>\n    <ion-row class="strip">\n      <ion-col style="    margin: auto;">\n        <p style="font-size:2.4rem;color:#444;text-align: center;margin: 0px">\n            ${{product.basePrice}}\n        </p>\n\n      </ion-col>\n      <!-- <ion-col col-4 style="text-align: right;color:#444">\n        <ion-label style="font-size:2.4rem;margin-top: 23px">\n          \n        </ion-label>\n      </ion-col> -->\n    </ion-row>\n\n \n  <ion-card>\n\n\n\n\n    <!--<ion-list radio-group [(ngModel)]="extratoppings" *ngFor = "let toppings of extras">\n\n  <ion-list-header>\n{{toppings.heading}}\n  </ion-list-header>\n\n<ion-item *ngFor = "let options of toppings.options" >\n  <ion-row>\n<ion-col>  \n   \n{{options.name}}\n</ion-col>\n  <ion-col>\n{{options.price}}\n  </ion-col>\n  </ion-row>\n</ion-item>\n\n\n</ion-list>-->\n    <div *ngIf="product.menuExtrasSelected">\n      <ion-label color="primary" style="font-size:2.5rem;padding:10px;padding-left:20px;  margin-top:0;  background: #333; color: white;text-align: center; margin-right: 0;">\n        Extras</ion-label>\n\n      <ion-list no-lines style="padding:10px;" *ngFor="let toppings of product.menuExtrasSelected;let a=index ">\n\n        <p style="text-align: center;color:#444; border-bottom: solid thin #333;">\n          {{toppings.heading}}\n        </p>\n\n        <ion-row *ngFor="let option of toppings.optionNameSelected ">\n          <ion-col col-9 style="display:inline-flex;margin: auto;">\n            <p>{{option.name}} </p>\n          </ion-col>\n          <ion-col col-3>\n            <ion-label *ngIf="option.isFree == false" style="text-align:center">${{option.quantity*option.price}} </ion-label>\n            <ion-label *ngIf="option.isFree == true" style="text-align:right;text-align: center;\n          background: #333;\n          color: white;   \n          padding: 5px;\n          margin-right:0;   \n          ">Free </ion-label>\n          </ion-col>\n          <ion-col>\n\n            <!-- <ion-row *ngIf="option.isFree == false" style="      \n         background: #333;\n         margin: 5px; background: #333">\n\n              <ion-col col-4 style="    margin: auto;  padding: 0;  background: #333;text-align: center;" (tap)="removeOptionQuantity(product,option)">\n                <button ion-button small style="    background-color: #333;text-align: center;  padding: 0; margin: 0;">\n                  <ion-icon style="font-weight:bold" name="remove"> </ion-icon>\n                </button>\n\n              </ion-col>\n\n              <ion-col style="text-align:center; margin:auto; background:#23609c" col-4>\n                <p style=" color:white;font-weight:bold"> {{option.quantity}} </p>\n              </ion-col>\n\n              <ion-col col-4 style="    margin: auto;  padding: 0;   background: #333;text-align: center;" (tap)="addOptionQuantity(product,option)">\n                <button ion-button small style="    background-color: #333;text-align: center;   padding: 0; margin: 0;">\n                  <ion-icon style="font-weight:bold" name="add"> </ion-icon>\n                </button>\n\n              </ion-col>\n            </ion-row> -->\n          </ion-col>\n\n        </ion-row>\n\n\n\n\n\n\n      </ion-list>\n    </div>\n\n\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/cart-detail/cart-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], CartDetailPage);
    return CartDetailPage;
}());

//# sourceMappingURL=cart-detail.js.map

/***/ })

});
//# sourceMappingURL=48.js.map
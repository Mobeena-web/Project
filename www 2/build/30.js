webpackJsonp([30],{

/***/ 765:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemDetailPageModule", function() { return ItemDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item_detail__ = __webpack_require__(962);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ItemDetailPageModule = (function () {
    function ItemDetailPageModule() {
    }
    ItemDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__item_detail__["a" /* ItemDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__item_detail__["a" /* ItemDetailPage */]),
            ],
        })
    ], ItemDetailPageModule);
    return ItemDetailPageModule;
}());

//# sourceMappingURL=item-detail.module.js.map

/***/ }),

/***/ 962:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_photo_viewer__ = __webpack_require__(378);
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
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ItemDetailPage = (function () {
    function ItemDetailPage(photoViewer, server, alertCtrl, loadingCtrl, globals, modalCtrl, navCtrl, navParams, toastCtrl) {
        this.photoViewer = photoViewer;
        this.server = server;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.globals = globals;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.flag = true;
        this.isexist = false;
        //CurrentBusinessDiscount: any;
        this.totalCost = 0;
        this.extratotal = 0;
        this.objectPrice = 0;
        this.quantity = 1;
        this.myChoices = [];
        this.array_index = [];
        this.temp = new Array();
        this.extraChecked = false;
        this.item_price = 0;
        this.reward_item_flag = false;
        this.type = true;
        this.reward_item_flag = navParams.get('reward_flag');
        if (!this.reward_item_flag) {
            this.reward_item_flag = false;
        }
        if (this.reward_item_flag) {
            if (!this.globals.OrderType) {
                this.presentModal1();
            }
        }
        this.reward_id = navParams.get('reward_id');
        this.thumbimage = navParams.get('image');
        // this.name = navParams.get('Name');  
        // this.price = navParams.get('Price');
        this.ItemId = navParams.get('item_id');
        this.Business_id = navParams.get('BusinesId');
        this.type = navParams.get('type');
        // this.globals.BusinessID = this.Business_id;
        this.itemDetails();
    }
    ItemDetailPage.prototype.presentModal1 = function () {
        var modal = this.modalCtrl.create('ModalPage');
        modal.present();
    };
    ItemDetailPage.prototype.presentModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create('InstructionModalPage', { instructions: this.instructions });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.instructions = data;
            console.log("instructions from modal", _this.instructions);
        });
        // this.globals.menu_item_id = this.id;
        // console.log('global id',this.globals.menu_item_id);
    };
    ItemDetailPage.prototype.image_show = function (image) {
        this.photoViewer.show(image, '', { share: true });
    };
    ItemDetailPage.prototype.cartpage = function () {
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
    ItemDetailPage.prototype.addQuantity = function () {
        if (this.quantity < this.stock_quantity) {
            this.quantity += 1;
            var m_price = 0;
            this.myChoices.forEach(function (element) {
                element.optionNameSelected.forEach(function (subelement) {
                    m_price = m_price + subelement.price;
                });
            });
            this.item_price = ((m_price * this.quantity) + (this.price * this.quantity)).toFixed(2);
        }
        else {
            this.globals.presentToast("You have selected max. limit of item.");
        }
    };
    ItemDetailPage.prototype.removeQuantity = function () {
        var m_price = 0;
        if (this.quantity <= 1) {
            this.quantity = 1;
        }
        else {
            this.quantity -= 1;
        }
        this.myChoices.forEach(function (element) {
            element.optionNameSelected.forEach(function (subelement) {
                m_price = m_price + subelement.price;
            });
        });
        this.item_price = ((m_price * this.quantity) + (this.price * this.quantity)).toFixed(2);
    };
    ItemDetailPage.prototype.addOptionQuantity = function (heading, object) {
        object.quantity += 1;
        var value1 = this.myChoices.indexOf([object]);
        this.myChoices.splice(value1, 1);
        var data = { heading: heading, optionNameSelected: [{ name: object.name, price: Number(object.price), quantity: object.quantity, total: Number(object.price) * object.quantity, isFree: false }] };
        this.myChoices.push(data);
    };
    ItemDetailPage.prototype.removeOptionQuantity = function (heading, object) {
        if (object.quantity <= 1) {
            object.quantity = 1;
        }
        else {
            object.quantity -= 1;
            var value1 = this.myChoices.indexOf([object]);
            this.myChoices.splice(value1, 1);
            var data = { heading: heading, optionNameSelected: [{ name: object.name, price: Number(object.price), quantity: object.quantity, total: Number(object.price) * object.quantity, isFree: false }] };
            this.myChoices.push(data);
        }
    };
    ItemDetailPage.prototype.Cart = function () {
        if (this.globals.BusinessID == '-1' || this.globals.BusinessID == this.Business_id) {
            this.globals.BusinessID = this.Business_id;
            this.AddtoCart();
        }
        else {
            this.showPrompt();
        }
    };
    ItemDetailPage.prototype.showPrompt = function () {
        // let prompt = this.alertCtrl.create({
        //   title: 'Warning!',
        //   message: "Are you sure you want to switch Restaurant? This will clear your current cart.",
        //   buttons: [
        //     {
        //       text: 'Cancel',
        //       handler: data => {
        //         console.log('Cancel clicked');
        //       }
        //     },
        //     {
        //       text: 'OKAY',
        //       handler: data => {
        //         this.globals.Product.length = 0;
        //         this.globals.BusinessID = this.Business_id;
        //         this.globals.BusinessDiscount = this.CurrentBusinessDiscount;
        //         this.AddtoCart();
        //       }
        //     }
        //   ]
        // });
        // prompt.present();
        this.globals.Product.length = 0;
        this.globals.BusinessID = this.Business_id;
        //this.globals.BusinessDiscount = this.CurrentBusinessDiscount;
        this.AddtoCart();
    };
    ItemDetailPage.prototype.AddtoCart = function () {
        var _this = this;
        var cartAdditionLoader = this.loadingCtrl.create({
            content: "Adding...",
        });
        console.log(this.globals.Product);
        var areAllCategoryCountsFound = false;
        var totalCategoriesCount = 0;
        var categoryCount = 0;
        if (this.extras) {
            for (var i = 0; i < this.extras.length; i++) {
                if (this.extras[i].min != '' && Number(this.extras[i].min) > 0) {
                    totalCategoriesCount++;
                }
            }
            for (var e = 0; e < this.extras.length; e++) {
                for (var c = 0; c < this.myChoices.length; c++) {
                    if (this.extras[e].heading == this.myChoices[c].heading) {
                        console.log("if");
                        if (this.extras[e].min != '' && Number(this.extras[e].min) > 0 &&
                            this.myChoices[c].optionNameSelected.length >= Number(this.extras[e].min)) {
                            console.log("inner if");
                            categoryCount++;
                            break;
                        }
                    }
                }
            }
        }
        if (categoryCount == totalCategoriesCount) {
            areAllCategoryCountsFound = true;
        }
        if (areAllCategoryCountsFound) {
            var isMenuItemSame_1 = false;
            this.globals.Product.forEach(function (menuItem) {
                if (menuItem.uniqueId == _this.ItemId) {
                    if (_this.instructions == '' && menuItem.instructions == '') {
                        var menuExtraCategoryLength = menuItem.menuExtrasSelected.length;
                        if (menuExtraCategoryLength == _this.myChoices.length) {
                            var isMenuItemExtraCategoriesCount = 0;
                            for (var i = 0; i < menuExtraCategoryLength; i++) {
                                for (var j = 0; j < _this.myChoices.length; j++) {
                                    if (menuItem.menuExtrasSelected[i].heading == _this.myChoices[j].heading) {
                                        // isMenuItemExtraCategoriesCount++;
                                        var currentExtraCategoryOptionsLength = menuItem.menuExtrasSelected[i].optionNameSelected.length;
                                        if (currentExtraCategoryOptionsLength == _this.myChoices[j].optionNameSelected.length) {
                                            var isMenuItemExtraCategoriesItemCount = 0;
                                            for (var k = 0; k < currentExtraCategoryOptionsLength; k++) {
                                                for (var m = 0; m < _this.myChoices[j].optionNameSelected.length; m++) {
                                                    if (menuItem.menuExtrasSelected[i].optionNameSelected[k].name == _this.myChoices[j].optionNameSelected[m].name
                                                        && menuItem.menuExtrasSelected[i].optionNameSelected[k].quantity == _this.myChoices[j].optionNameSelected[m].quantity) {
                                                        isMenuItemExtraCategoriesItemCount++;
                                                        break;
                                                    }
                                                }
                                            }
                                            if (isMenuItemExtraCategoriesItemCount == currentExtraCategoryOptionsLength) {
                                                isMenuItemExtraCategoriesCount++;
                                                break;
                                            }
                                        }
                                        // break;
                                    }
                                }
                            }
                            if (isMenuItemExtraCategoriesCount == menuExtraCategoryLength) {
                                isMenuItemSame_1 = true;
                            }
                        }
                    }
                }
            });
            if (isMenuItemSame_1) {
                for (var i = 0; i < this.globals.Product.length; i++) {
                    if (this.name == this.globals.Product[i].menuItem) {
                        var currentQuantity = this.globals.Product[i].quantity;
                        currentQuantity += this.quantity;
                        var current_total = this.quantity * this.price;
                        this.globals.Product[i].quantity = currentQuantity;
                        this.globals.Product[i].totalPrice += current_total;
                        break;
                    }
                }
                this.navCtrl.pop();
            }
            else {
                this.totalCost = this.quantity * this.price;
                var i = 1;
                for (var _i = 0, _a = this.myChoices; _i < _a.length; _i++) {
                    var sub = _a[_i];
                    for (var _b = 0, _c = sub.optionNameSelected; _b < _c.length; _b++) {
                        var op = _c[_b];
                        if (Number(this.No_of_Free_Extras) >= 1) {
                            if (op.quantity > 1) {
                                var prod_quantity = op.quantity;
                                for (var j = prod_quantity; j > 0; j--) {
                                    if (this.No_of_Free_Extras >= 1) {
                                        prod_quantity = prod_quantity - 1;
                                        this.No_of_Free_Extras--;
                                        this.extratotal = 0;
                                    }
                                    else {
                                        this.extratotal = this.extratotal + op.price;
                                    }
                                }
                                if (prod_quantity == 0) {
                                    op.isFree = true;
                                }
                                // var remain = Number(this.No_of_Free_Extras) - i;
                                // var new_qantity = op.quantity - remain;
                                // this.extratotal = new_qantity*op.price;
                                op.quantity = prod_quantity;
                            }
                            else {
                                this.extratotal = 0;
                                op.isFree = true;
                                this.No_of_Free_Extras--;
                            }
                        }
                        else {
                            this.extratotal += op.quantity * op.price;
                        }
                        i = i++;
                    }
                }
                // this.objectPrice = this.totalCost + this.extratotal;
                this.objectPrice = Number(this.item_price);
                this.objectPrice.toFixed(2);
                // this.instructions = localStorage.getItem("instructions");
                this.globals.itemInstruction = this.instructions;
                if (this.reward_item_flag == true) {
                    var reward_duplicate = false;
                    this.globals.Product.forEach(function (menuItem) {
                        if (menuItem.reward_id == _this.reward_id) {
                            reward_duplicate = true;
                        }
                    });
                    if (!reward_duplicate) {
                        this.globals.Product.push({ menuId: "1", restId: this.globals.bussinessId, uniqueId: this.ItemId, menuItem: this.name, image: this.thumbimage, quantity: this.quantity, itemInstructions: this.instructions, basePrice: this.price, totalPrice: this.objectPrice, menuExtrasSelected: this.myChoices, reward: this.reward_item_flag, reward_id: this.reward_id, tax: this.data.item.tax, tax_enabled: this.data.item.tax_enabled, discount_value: this.data.item.discount_value, discount_type: this.data.item.discount_type });
                        this.globals.presentToast("Reward added in your cart");
                        this.navCtrl.pop();
                    }
                    else {
                        this.globals.presentToast("You have already add this reward in cart.");
                        this.navCtrl.pop();
                    }
                }
                else {
                    this.globals.Product.push({ menuId: "1", restId: this.globals.bussinessId, uniqueId: this.ItemId, menuItem: this.name, image: this.thumbimage, quantity: this.quantity, itemInstructions: this.instructions, basePrice: this.price, totalPrice: this.objectPrice, menuExtrasSelected: this.myChoices, reward: this.reward_item_flag, reward_id: this.reward_id, tax: this.data.item.tax, tax_enabled: this.data.item.tax_enabled, discount_value: this.data.item.discount_value, discount_type: this.data.item.discount_type });
                }
                this.navCtrl.pop();
                localStorage.removeItem("instructions");
                console.log("checking remove local storage ", localStorage.getItem("instructions"));
            }
        }
        else {
            this.globals.presentToast("Please select the required extras.");
        }
    };
    ItemDetailPage.prototype.itemDetails = function () {
        var _this = this;
        //   this.data =   this.server.getCategories();
        //   console.log("array",this.data)
        var loading = this.loadingCtrl.create({
            content: "loading...",
        });
        loading.present();
        var response = this.server.ProductItemDetail(this.ItemId);
        response.subscribe(function (data) {
            _this.data = data;
            _this.id = _this.data.item.id;
            console.log('api response', _this.data.item.id);
            console.log('api response', _this.data.item);
            loading.dismiss();
            _this.bannerimage = _this.data.item.image;
            _this.description = _this.data.item.description;
            _this.name = _this.data.item.name;
            _this.globals.title = _this.name;
            _this.image = _this.data.item.image;
            _this.price = _this.data.item.price;
            _this.item_price = _this.price;
            _this.stock_quantity = _this.data.item.stock_quantity;
            if (_this.reward_item_flag == true) {
                _this.item_price = 0;
            }
            _this.No_of_Free_Extras = Number(_this.data.item.freeExtras);
            if (_this.data.item.extras.length > 0) {
                var noExtras = false;
                _this.extras = _this.data.item.extras;
                if (_this.reward_item_flag == true) {
                    _this.extras.forEach(function (extra_price) {
                        if (Number(extra_price.min) > 0) {
                            extra_price.options.forEach(function (ex) {
                                ex.price = 0;
                            });
                        }
                    });
                }
                _this.extras.forEach(function (element) {
                    if (element.heading == '') {
                        element.options.forEach(function (element1) {
                            if (element1.name == '') {
                                noExtras = true;
                            }
                            else {
                                noExtras = false;
                            }
                        });
                    }
                });
                _this.noExtras = noExtras;
            }
            //  this.checkedItems = new Array(this.extras.options.length);
            console.log(_this.extras, "extras");
            console.log("option", _this.options);
            // console.log(this.data.restaurant.categories);
            // console.log(this.category);
        }, function (error) {
            console.log("Error!");
        });
    };
    ItemDetailPage.prototype.Selectedoption = function (heading, op, a, i, max, event) {
        console.log("3 Params ", heading, op, max);
        // console.log("op", op.IsSelected);
        var checked = false;
        var flag = false;
        if (op.IsSelected) {
            //console.log(parseInt(op.price));
            // var data = { heading: heading, optionNameSelected: [{ name: op.name, price: Number(op.price), quantity: op.quantity, total: Number(op.price) * op.quantity, isFree: false, selected: op.IsSelected }] }
            var same = false;
            for (var m = 0; m < this.myChoices.length; m++) {
                if (this.myChoices[m].heading == heading) {
                    same = true;
                    // var outer = this.array_index[0].outer_index;
                    //console.log(this.myChoices[m].heading);
                    console.log(max);
                    if (max == '') {
                        max = 1000;
                    }
                    if (this.myChoices[m].optionNameSelected.length >= Number(max)) {
                        this.flag = true;
                        console.log("length greater", this.myChoices[m].optionNameSelected.length, max);
                        op.IsSelected = false;
                        event.checked = false;
                        // let alert = this.alertCtrl.create({
                        //   title: "Oops",
                        //   message: "You have added max number of extras",
                        //   buttons: [
                        //     {
                        //       text: 'Okay',
                        //       handler: data => {
                        //         this.flag = false;
                        //         console.log(flag);
                        //       }
                        //     }
                        //   ]
                        // });
                        // alert.present();
                        var toast = this.toastCtrl.create({
                            message: 'Oops !! You have added max number of extras',
                            duration: 2000,
                            position: 'bottom'
                        });
                        this.flag = false;
                        toast.present();
                    }
                    else {
                        this.myChoices[m].optionNameSelected.push({ name: op.name, price: Number(op.price), quantity: 1, total: Number(op.price) * op.quantity, isFree: false, selected: op.IsSelected });
                        this.item_price = (Number(this.item_price) + (Number(op.price) * this.quantity)).toFixed(2);
                        console.log("myprice", this.item_price);
                        this.flag = false;
                        break;
                    }
                }
            }
            if (!same) {
                console.log("not same");
                var data = { heading: heading, optionNameSelected: [{ name: op.name, price: Number(op.price), quantity: op.quantity, total: Number(op.price) * op.quantity, isFree: false, selected: op.IsSelected }] };
                console.log("myprice", this.item_price, op.price, this.quantity);
                this.item_price = (Number(this.item_price) + (Number(op.price) * this.quantity)).toFixed(2);
                this.myChoices.push(data);
                this.flag = false;
            }
            console.log(data);
            console.log("mychoice_array", this.myChoices);
        }
        else {
            // if(!this.extraChecked){
            //   console.log("else");
            //   console.log(this.array_index);
            //   var index_data = {outer_index:a,inner_index:i}
            //   var val = this.array_index.indexOf([index_data]);
            //   this.array_index.splice(val,1);
            console.log(op, "ELSE");
            console.log(this.flag, "flag");
            if (this.flag == false) {
                var value = this.myChoices.findIndex(function (item, i) {
                    return item.heading === heading;
                });
                console.log(value);
                if (this.myChoices[value].optionNameSelected.length > 1) {
                    console.log("IF");
                    console.log(op);
                    this.myChoices[value].optionNameSelected.map(function (checkitem, i, array) {
                        console.log(checkitem, i, array);
                        if (checkitem.name == op.name) {
                            array.splice(i, 1);
                        }
                    });
                    // var optionindex = this.myChoices[value].optionNameSelected.findIndex(function(item, i){
                    //   return item.name === op.name
                    // });
                    // console.log(optionindex,"optionindex");
                    // this.myChoices = this.myChoices[value].optionNameSelected.splice(optionindex,1)
                }
                else {
                    console.log("ELSE", value);
                    //  this.myChoices =  this.myChoices.splice(value,1);
                    this.myChoices.map(function (checkitem, i, array) {
                        console.log(checkitem, i, array);
                        if (checkitem.heading == heading) {
                            array.splice(i, 1);
                        }
                    });
                }
            }
            console.log(this.myChoices);
            console.log("Item $ ", this.item_price);
            console.log("op $ ", op.price);
            console.log("Quantity $ ", this.quantity);
            if (this.flag == true) {
                console.log("No calculate ");
            }
            else {
                this.item_price = (Number(this.item_price) - (Number(op.price) * this.quantity)).toFixed(2);
            }
            // }
            // else{
            // this.extraChecked = false;
            // var value1 = this.myChoices.indexOf([op]);
            // console.log(value1);
            // this.myChoices.splice(0,1);
            // console.log(this.myChoices);
            //}
        }
    };
    ItemDetailPage.prototype.checkTiming = function (timing) {
        if (this.globals.order_time == 'schedule') {
            if (this.globals.specific_delivery_day == 'true') {
                return true;
            }
            var day = this.globals.schedule_day_id + 1;
            if (day == 7) {
                day = 0;
            }
            var time = this.globals.schedule_converted_time;
            var current_day = timing[day];
            console.log("-->", current_day, day, timing, time);
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
                return true;
            }
            else if (current_day[0] == 'opened' && current_day[1] == 'opened') {
                return true;
            }
            else {
                this.globals.presentToast('Sorry, we are not serving ' + this.globals.OrderType + ' at time you schedule!');
                return false;
            }
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
                return true;
            }
            else if (current_day[0] == 'opened' && current_day[1] == 'opened') {
                return true;
            }
            else {
                this.globals.presentToast('Sorry, we are not serving ' + this.globals.OrderType + ' at this time!');
                return false;
            }
        }
    };
    ItemDetailPage.prototype.add_to_cart_timing_check = function () {
        if (this.globals.OrderType == 'delivery') {
            if (this.checkTiming(this.globals.delivery_timing)) {
                this.Cart();
            }
        }
        else {
            if (this.checkTiming(this.globals.pickup_timing)) {
                this.Cart();
            }
        }
    };
    ItemDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-item-detail',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/item-detail/item-detail.html"*/'<!--\n  Generated template for the ItemDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color="primary">\n    <ion-title>Item Details</ion-title>\n\n    <ion-buttons end>\n      <button style="font-size: 3rem;" ion-button (tap)="cartpage()">\n        <ion-badge color="danger" *ngIf="globals.Product.length > 0">{{globals.Product.length}}</ion-badge>\n        <ion-icon name="cart"> </ion-icon>\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="Open-Sans-regular" >\n  <ion-scroll style="height: calc(95% - 3rem); bottom: 10px;" scrollY="true">\n\n\n  <ion-card class="m-t">\n      <div class="head">\n          <ion-row class="strip">\n          <img *ngIf="image" (click)="image_show(image)" style="height: 100px;object-fit: cover;border-radius: 7px" src="{{image}}">\n\n            <ion-col style="padding: 0; margin: auto;">\n              <p style="font-size:2.4rem;padding-left: 5px;color: #fff;">\n                {{name}}\n              </p>\n            </ion-col>\n          </ion-row>\n        </div>\n\n    <ion-card-content style="padding: 0">\n\n      <ion-row >\n        <ion-col >\n          <p class="desp">\n            {{description}}\n          </p>\n        </ion-col>\n      </ion-row>\n      <ion-label style="font-size:3rem; text-align: center;" color="primary"> ${{item_price}} </ion-label>\n\n    </ion-card-content>\n\n    <ion-row style="height: 4.2em;border-bottom: solid thin #ccc; border-top: solid thin #ccc;">\n\n      <ion-col col-12 style="    padding: 0; background: transparent; height: 4.1em;">\n        <ion-row style="    height: inherit;">\n\n          <ion-col col-4 style=" margin: auto;  padding: 0;  height: inherit;  ;text-align: center;">\n            \n            <button [disabled]="reward_item_flag"   small style="background-color:#fff;text-align: center; color: #fff;font-size: 1.3em; margin: 0;padding: 0;margin-top: 0.5em; height: 40px;width: 40px;border-radius: 50%; ">\n              <ion-icon style="font-size:40px;color: #333 ; "  name="ios-remove-circle-outline" (click)="removeQuantity()"> </ion-icon>\n            </button>\n          </ion-col>\n\n          <ion-col style="text-align:center; margin:auto" col-4>\n            <p style="font-size:3.0rem;color: #333 "> {{quantity}} </p>\n          </ion-col>\n\n          <ion-col col-4 style="margin: auto;  padding: 0;  height: inherit;  text-align: center;">\n            <button [disabled]="reward_item_flag"  small style="color: #fff; background-color: #fff;text-align: center; font-size: 1.3em;  padding: 0; margin: 0;margin-top: 0.5em;height: 40px;width: 40px;border-radius: 50%;">\n              <ion-icon style="font-size: 40px;color: #333 ;" name="ios-add-circle-outline" (click)="addQuantity()"> </ion-icon>\n            </button>\n          </ion-col>\n        </ion-row>\n\n      </ion-col>\n\n    </ion-row>\n\n    <!--<ion-list radio-group [(ngModel)]="extratoppings" *ngFor = "let toppings of extras">\n\n  <ion-list-header>\n{{toppings.heading}}\n  </ion-list-header>\n\n<ion-item *ngFor = "let options of toppings.options" >\n  <ion-row>\n<ion-col>  \n   \n{{options.name}}\n</ion-col>\n  <ion-col>\n{{options.price}}\n  </ion-col>\n  </ion-row>\n</ion-item>\n\n\n</ion-list>-->\n    <div *ngIf="extras && !noExtras">\n     \n\n      <ion-list no-lines style="padding:10px;" *ngFor="let toppings of extras;let a=index ">\n\n        \n            <ion-row style="border-bottom: solid thin #ccc;">\n              <ion-col col-9>\n                  <p *ngIf="toppings.heading != \'\'" style="font-size: 1.6rem;padding:7px;color:black; line-height: 0">\n                      {{toppings.heading}}\n                  </p>\n                        <small>{{toppings.sub_heading}}</small>\n              </ion-col>\n              <ion-col col-3 *ngIf="toppings.min" style="margin:auto">\n                  <ion-badge item-end color=\'primary\'>Required</ion-badge>\n              </ion-col>\n            </ion-row>\n            <div *ngFor="let option of toppings.options;let i = index; ">\n              <ion-row *ngIf="option.name != \'\'" >\n                <ion-col col-12 style="display: inline-flex;margin: auto;">\n                  <ion-item>\n                    <ion-label >{{option.name}} <span class="option_">${{option.price}}</span>\n                    </ion-label>\n                    <ion-checkbox  [(ngModel)]="option.IsSelected" (ionChange)="Selectedoption(toppings.heading,option,a,i,toppings.max,$event)"></ion-checkbox>  \n                  </ion-item>\n               <!-- <p style="margin-left: 5px;font-size: 1.4rem;\n          color: black;"> </p> -->\n                </ion-col>\n               \n\n\n              </ion-row>\n\n\n              <!-- <ion-row style="      \n         width: 40%;\n        background: #333 ;\n        margin: 5px; background: #333 " *ngIf="option.IsSelected">\n\n                <ion-col col-4 style="    margin: auto;  padding: 0;  background: #333 ;text-align: center;" (tap)="removeOptionQuantity(toppings.heading,option)">\n                 \n                  <button ion-button small style="background-color: #333 ;text-align: center;  padding: 0; margin: 0">\n                    <ion-icon style="font-weight:bold" name="remove"> </ion-icon>\n                  </button>\n\n                </ion-col>\n\n                <ion-col style="text-align:center; margin:auto; background:#23609c" col-4>\n                  <p style=" color:white;font-weight:bold"> {{option.quantity}} </p>\n                </ion-col>\n\n                <ion-col col-4 style="    margin: auto;  padding: 0;   background: #333 ;text-align: center;" (tap)="addOptionQuantity(toppings.heading,option)">\n                  <button ion-button  small style="    background-color: #333 ;text-align: center;   padding: 0; margin: 0;">\n                    <ion-icon style="font-weight:bold" name="add"> </ion-icon>\n                  </button>\n\n                </ion-col>\n              </ion-row> -->\n            </div>\n           \n      </ion-list>\n    </div>\n   \n    <!-- <div *ngIf="!extras"> \n\n<p style="font-size:2rem;font-weight:bold;text-align:center;padding:10px;color:#333 ;margin-top:20%"> No extras available on this meal</p>\n\n</div> -->\n\n\n  </ion-card>\n  <ion-card>\n  <!-- <div>\n  \n    <ion-item>\n      <ion-label>\n        Instructions\n      </ion-label>\n      <br>\n      <ion-textarea placeholder="Enter a description"  [(ngModel)]="instruction" ></ion-textarea>\n    \n    </ion-item>\n  </div> -->\n  </ion-card>\n\n</ion-scroll>\n\n<!--   \n    <footer  style=" margin-bottom: 0; padding-bottom: 0;text-align: center"></footer>\n     -->\n    <ion-row>\n      <ion-col *ngIf="data?.item.item_instructions" style="padding-right:0px">\n        <button  ion-button outline round (click)="presentModal()" >Add Instructions</button>\n      </ion-col>\n      <ion-col style="padding-left:0px">\n        <button ion-button block round (click)="add_to_cart_timing_check()" *ngIf="type">\n          Add to cart <ion-icon name="cart" style="padding-left: 7px;color: #fff" ></ion-icon></button>\n      </ion-col> \n    </ion-row>\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/item-detail/item-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_photo_viewer__["a" /* PhotoViewer */], __WEBPACK_IMPORTED_MODULE_3__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"]])
    ], ItemDetailPage);
    return ItemDetailPage;
}());

//# sourceMappingURL=item-detail.js.map

/***/ })

});
//# sourceMappingURL=30.js.map
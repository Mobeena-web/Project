webpackJsonp([47],{

/***/ 774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartPageModule", function() { return CartPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart__ = __webpack_require__(978);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CartPageModule = (function () {
    function CartPageModule() {
    }
    CartPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__cart__["a" /* CartPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__cart__["a" /* CartPage */]),
            ],
        })
    ], CartPageModule);
    return CartPageModule;
}());

//# sourceMappingURL=cart.module.js.map

/***/ }),

/***/ 978:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CartPage = (function () {
    function CartPage(toastCtrl, loadingCtrl, server, modalCtrl, alertCtrl, nativeStorage, appCtrl, globals, viewCtrl, navCtrl, navParams) {
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.server = server;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.nativeStorage = nativeStorage;
        this.appCtrl = appCtrl;
        this.globals = globals;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.RewardStoreCreditAvailed = 0;
        this.birthdayStoreCreditavailed = 0;
        this.pointsAvailed = false;
        this.firsattempt = true;
        this.pickup = false;
        this.birthday_amount = 0;
        this.reward_amount = 0;
        this.storecreditExist = false;
        this.extratotal = 0;
        this.Total = 0;
        this.subtotal = 0;
        this.extraSum = new Array();
        this.storeCredit = false;
        this.Tip = 0;
        this.check_rewards = false;
        this.check_points = false;
        this.user_availed_points = false;
        this.check_birthday = false;
        this.instruct = true;
        this.point_show = 0;
        this.per_tip = 0;
        this.tip_cus = 0;
        this.gift_card_amount = 0;
        this.mygifts = [];
        this.gift_array = [];
        this.tip_type = 'percent';
        console.log(globals.BusinessDiscount, globals.availed_discount_count, globals.business_discount_count, "@@@type");
        //  console.log("here is my items of global" ,this.globals.itemInstruction);
        this.Address = localStorage.getItem("GetAddress");
        this.type = this.globals.OrderType;
        console.log("checking order type ", this.type);
        console.log(this.globals.MobileDiscount);
        this.delivery_display = this.financial(this.globals.deliveryCharges);
        this.globals.TipAdded = false;
        //  console.log(this.globals.minimun_order, "minorder");
        //  console.log("delivery,pickup global", this.globals.delivery, this.globals.pickup);
        if (this.type == "delivery") {
            console.log("checking pickup and delivery");
            this.Deliver = true;
            this.pickup = false;
        }
        else {
            this.Deliver = false;
            this.pickup = true;
            // this.Deliver = this.globals.delivery;
            // this.pickup = this.globals.pickup;
        }
        //this.PickupBox();
        console.log("which type ", this.globals.pickup, this.globals.delivery);
        console.log("pickup value checking ", this.pickup);
        this.selectOptions = {
            title: 'Points'
        };
        this.total();
        console.log("global product array", this.globals.Product);
        this.CheckUserReward();
        this.CheckUserPoints();
        this.CheckMobileDiscount();
        this.my_gift_cards();
        console.log(this.globals.business_discount_count, this.globals.availed_discount_count, 'po');
    }
    // ionViewWillEnter(){
    //     this.total();
    // }
    CartPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad CartPage');
        //  console.log("instruction key", this.globals.instruction);
        this.globals.cartflag = false;
        // this.setArray();
        // this.nativeStorage.getItem('Product')
        //   .then (data => {
        // this.globals.Product = data.array;
        //     }).catch(err => console.log);
        this.navBar.backButtonClick = function (e) {
            // todo somethin
            _this.globals.BusinessDiscountFlag = false;
            if (_this.globals.Product.length >= 1) {
                _this.globals.cartflag = true;
                _this.navCtrl.popTo('CategoryPage');
                // this.setArray();
            }
            else {
                _this.globals.cartflag = false;
                // this.setArray();
            }
        };
    };
    CartPage.prototype.financial = function (x) {
        if (x != 0) {
            return Number.parseFloat(x).toFixed(2);
        }
        else {
            return '0.00';
        }
    };
    CartPage.prototype.PointBox = function () {
        // if(this.check_points == true)
        // {
        //     this.CheckUserPoints();    
        // }
        if (!this.check_points && this.availed_points > 0 && this.pointsInput.availed) {
            console.log("reverting points");
            this.Total = Number(this.Total) + this.availed_points;
            this.Total = this.Total.toFixed(2);
            this.pointsInput.availed = false;
            this.points = Number(this.points) + Number(this.pointsInput.points);
            console.log(this.pointsInput);
        }
    };
    CartPage.prototype.RewardBox = function () {
        if (!this.check_rewards && this.RewardStoreCreditAvailed > 0) {
            this.Total = Number(this.Total) + this.RewardStoreCreditAvailed;
            this.Total = this.Total.toFixed(2);
            this.RewardStoreCreditAvailed = 0;
        }
    };
    CartPage.prototype.BirthdayBox = function () {
        if (!this.check_birthday && this.birthdayStoreCreditavailed > 0) {
            this.Total = Number(this.Total) + this.birthdayStoreCreditavailed;
            this.Total = this.Total.toFixed(2);
            this.birthdayStoreCreditavailed = 0;
        }
    };
    CartPage.prototype.CheckUserPoints = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Checking please wait...",
        });
        loading.present();
        var res = this.server.CheckUserPoints()
            .subscribe(function (data) {
            loading.dismiss();
            console.log("POints Data", data);
            if (data.status == 'true') {
                _this.pointExists = true;
                _this.points = Number(data.data.points_count);
                _this.pointsInput = _this.points;
                if (data.business_rewards.length > 0) {
                    _this.point_rewards = data.business_rewards;
                    console.log(_this.point_rewards);
                }
                console.log(_this.pointsInput, _this.point_rewards);
            }
            else {
                // let alert = this.alertCtrl.create({
                //     title: 'Oops',
                //     subTitle: 'Sorry,you do not have points in this business.',
                //     buttons: ['Okay']
                // });
                // alert.present();
                _this.check_points = false;
            }
        }, function (error) {
            console.log(error);
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Server times out, please try again',
                buttons: ['Okay']
            });
            alert.present();
            _this.check_points = false;
        });
    };
    // PickupBox() {
    //     if (this.pickup == false) {
    //         this.Deliver = true;
    //         if(this.globals.deliveryCharges != 0)
    //         {      console.log(this.globals.deliveryChargesFinishthroughPickup)
    //             this.Total = Number(this.Total);
    //             this.Total = Number(this.ProductsTotal)+this.globals.deliveryCharges;
    //             this.Total =  this.Total.toFixed(2);
    //         }
    //         this.total();
    //     }
    //     else {
    //         this.Deliver = false;
    //         this.total();
    //         if(this.globals.deliveryCharges != 0 )
    //         { this.firsattempt = false;
    //             this.Total = Number(this.Total);
    //             this.Total-= Number(this.globals.deliveryCharges);
    //             this.globals.deliveryChargesFinishthroughPickup = true;
    //             this.Total =  this.Total.toFixed(2);
    //         }
    //     }
    // }
    // DeliverBox() {
    //     if (this.Deliver == true) {
    //         this.pickup = false;
    //     }
    //     else {
    //         this.pickup = true;
    //         this.total();
    //     }
    // }
    CartPage.prototype.CheckMobileDiscount = function () {
        var _this = this;
        this.nativeStorage.getItem('MobileFlagSave').then(function (data) {
            _this.globals.MobileDiscount = data.MobileDiscount;
            _this.globals.MobileDiscountFlag = data.MobileFlag;
            console.log("mobile discount", _this.globals.MobileDiscount);
        }, function (error) {
            _this.globals.MobileDiscount = 0;
        }).catch(function (err) { return console.log(err); });
    };
    CartPage.prototype.MaxMin = function () {
        console.log("hello", this.StoreCreditInput);
        this.StoreCreditInput = Number(this.StoreCreditInput);
        if (this.StoreCreditInput > this.reward_amount) {
            var alert_1 = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be more then Store credit',
                buttons: ['Okay']
            });
            alert_1.present();
            this.StoreCreditInput = this.reward_amount;
        }
        else if (this.StoreCreditInput < 0) {
            var alert_2 = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be less then 0',
                buttons: ['Okay']
            });
            alert_2.present();
            this.StoreCreditInput = 0;
        }
        else if (this.StoreCreditInput == null || this.StoreCreditInput == undefined) {
            var alert_3 = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Please enter a value',
                buttons: ['Okay']
            });
            alert_3.present();
            this.StoreCreditInput = this.reward_amount;
        }
    };
    CartPage.prototype.BirthdayMaxMin = function () {
        console.log("hello", this.birthdayStoreCreditInput);
        this.birthdayStoreCreditInput = Number(this.birthdayStoreCreditInput);
        if (this.birthdayStoreCreditInput > this.birthday_amount) {
            var alert_4 = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be more then Store credit',
                buttons: ['Okay']
            });
            alert_4.present();
            this.birthdayStoreCreditInput = this.birthday_amount;
        }
        else if (this.birthdayStoreCreditInput < 0) {
            var alert_5 = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be less then 0',
                buttons: ['Okay']
            });
            alert_5.present();
            this.birthdayStoreCreditInput = 0;
        }
        else if (this.birthdayStoreCreditInput == null || this.birthdayStoreCreditInput == undefined) {
            var alert_6 = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Please enter a value',
                buttons: ['Okay']
            });
            alert_6.present();
            this.birthdayStoreCreditInput = this.birthday_amount;
        }
    };
    // setArray(){
    //     console.log(this.globals.BusinessID);
    //     this.nativeStorage.setItem('Product', {
    //         array: this.globals.Product,
    //         BusinessDiscount: this.globals.BusinessDiscount,
    //         MinimumOrder:this.globals.minimun_order,
    //         DeliveryCharges:this.globals.deliveryCharges,
    //         BusinessID:this.globals.BusinessID
    //     })
    //     .then(
    //     () => console.log('Stored item!'),
    //     error => console.error('Error storing item', error)
    //     );
    // }
    // PointsMaxMin() {
    //     if(this.pointsInput > this.points)
    //     {
    //         let alert = this.alertCtrl.create({
    //             title: 'Alert',
    //             subTitle: 'Value cannot not be more then total user points',
    //             buttons: ['OK']
    //         });
    //         alert.present();
    //         this.pointsInput = this.points;
    //     }
    //     else if(this.pointsInput < 0)
    //     {
    //         let alert = this.alertCtrl.create({
    //             title: 'Alert',
    //             subTitle: 'Value cannot not be less then 0',
    //             buttons: ['OK']
    //         });
    //         alert.present();
    //         this.pointsInput = 0;
    //     }
    //     else if(this.pointsInput == null || this.pointsInput == undefined)
    //     {
    //         let alert = this.alertCtrl.create({
    //             title: 'Alert',
    //             subTitle: 'Please enter a value',
    //             buttons: ['OK']
    //         });
    //         alert.present();
    //         this.pointsInput = this.points;
    //     }
    // }
    CartPage.prototype.CheckReservationPayment = function () {
        var prompt = this.alertCtrl.create({
            title: 'Alert',
            message: "do you want to pay for your reservation order as well?",
            buttons: [
                {
                    text: 'No',
                    handler: function (data) {
                        console.log('Cancel clicked');
                        // this.placeOrderByPayOnVenue() 
                    }
                },
                {
                    text: 'Okay',
                    handler: function (data) {
                        console.log('OK clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    // placeOrderByPayOnVenue(){
    // }
    CartPage.prototype.total = function () {
        var _this = this;
        this.Total = 0;
        // console.log(this.globals.deliveryCharges, "delivery cahrges");
        this.globals.deliveryCharges = Math.round(this.globals.deliveryCharges * 100) / 100;
        console.log(this.globals.deliveryCharges, "delivery cahrges");
        for (var _i = 0, _a = this.globals.Product; _i < _a.length; _i++) {
            var sub = _a[_i];
            this.Total = Number(this.Total);
            sub.totalPrice = Number(sub.totalPrice);
            this.Total += Number(sub.totalPrice);
            this.ProductsTotal = this.Total;
        }
        if (this.globals.BusinessDiscount > 0 && this.globals.availed_discount_count < this.globals.business_discount_count) {
            this.discountTotal = Number(this.ProductsTotal) * this.globals.BusinessDiscount / 100;
            this.discountTotal = Math.round(this.discountTotal * 100) / 100;
            // this.discountTotal.toFixed(2);
            this.Total = this.ProductsTotal - this.discountTotal;
            // this.Total = this.Total.toFixed(2);
            this.globals.BusinessDiscountFlag = true;
        }
        if ((Number(this.Total) < this.globals.minimun_order || Number(this.Total) < 0) && this.Deliver == true) {
            this.TaxCalculate();
            if (Number(this.ProductsTotal) == 0) {
                this.TaxCalculate();
                if (this.RewardStoreCreditAvailed > 0) {
                    this.Total = Number(this.Total) - this.RewardStoreCreditAvailed;
                }
                if (this.birthdayStoreCreditavailed > 0) {
                    this.Total = Number(this.Total) - this.birthdayStoreCreditavailed;
                }
            }
            else {
                this.globals.presentToast('Please add more items in the cart.');
            }
        }
        else {
            this.TaxCalculate();
            if (this.RewardStoreCreditAvailed > 0) {
                this.Total = Number(this.Total) - this.RewardStoreCreditAvailed;
            }
            if (this.birthdayStoreCreditavailed > 0) {
                this.Total = Number(this.Total) - this.birthdayStoreCreditavailed;
            }
        }
        if (this.globals.OrderType == "delivery" && this.globals.deliveryCharges != 0 && this.Deliver == true) {
            this.Total = Number(this.Total);
            this.Total = this.Total + Number(this.globals.deliveryCharges);
            //    this.deliverycharges = Number(this.globals.deliveryCharges);
        }
        if (Number(this.Tip > 0) && this.tip_type == 'manual') {
            this.Total = Number(this.Total) + Number(this.Tip);
        }
        else if (this.tip_type == 'percent') {
            this.percent_tip_(this.percent_tip_vlaue);
        }
        if (this.gift_array.length > 0) {
            this.gift_array.forEach(function (e) {
                console.log(e.amount, 'f');
                _this.Total = Number(_this.Total) - Number(e.amount);
            });
        }
        if (this.Total != 0) {
            this.Total = Number(this.Total).toFixed(2);
        }
    };
    CartPage.prototype.TaxCalculate = function () {
        if (this.globals.business_type == 'retail') {
            var taxcalc = 0;
            this.globals.retail_items_discount = 0;
            var ItemDiscount = 0;
            var ItemDiscountedValue = 0;
            for (var _i = 0, _a = this.globals.Product; _i < _a.length; _i++) {
                var sub = _a[_i];
                ItemDiscount = 0;
                var CalculatedTax = 0;
                sub.discount_type == 'cash' ? ItemDiscount += Number(sub.discount_value) * Number(sub.quantity) : sub.discount_type == 'perc' ? ItemDiscount += Number(sub.discount_value) / 100 * Number(sub.basePrice) * Number(sub.quantity) : console.log('discount neither cash nor percent');
                console.log(ItemDiscount, "pfop");
                ItemDiscountedValue = (Number(sub.basePrice) * Number(sub.quantity)) - Number(ItemDiscount);
                console.log(ItemDiscountedValue, "pop");
                CalculatedTax = Number(sub.tax) / 100 * Number(ItemDiscountedValue);
                taxcalc += CalculatedTax;
                this.globals.retail_items_discount += ItemDiscount;
                sub.CalculatedDiscount = this.financial(ItemDiscount);
                sub.CalculatedTax = this.financial(CalculatedTax);
            }
            this.tax_calc = taxcalc.toFixed(2);
            this.Total = (this.Total + taxcalc) - this.globals.retail_items_discount;
            this.Total = this.Total.toFixed(2);
        }
        else {
            var taxcalc = (Number(this.globals.tax) / 100) * Number(this.Total);
            console.log("tax cal", taxcalc);
            this.tax_calc = taxcalc.toFixed(2);
            this.Total = this.Total + taxcalc;
            this.Total = this.Total.toFixed(2);
        }
        //console.log(this.Total);
    };
    // TipAdd() {
    //     if (this.Tip >= 0) {
    //         this.Total = Number(this.Total);
    //         this.Total += parseFloat(this.Tip);
    //     }
    //     if (this.Tip < 0 || this.Tip == '') {
    //         this.Tip = 0;
    //     }
    // }
    CartPage.prototype.addStoreCreditValue = function () {
        if (this.StoreCreditInput < this.reward_amount) {
            this.StoreCreditInput += 1;
        }
        else {
            var alert_7 = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be more then Store credit',
                buttons: ['OK']
            });
            alert_7.present();
        }
    };
    CartPage.prototype.removeStoreCreditValue = function () {
        if (this.StoreCreditInput > 0) {
            this.StoreCreditInput -= 1;
        }
        else {
            var alert_8 = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be less then 0',
                buttons: ['OK']
            });
            alert_8.present();
        }
    };
    CartPage.prototype.addBirthdayStoreCreditValue = function () {
        if (this.birthdayStoreCreditInput < this.birthday_amount) {
            this.birthdayStoreCreditInput += 1;
        }
        else {
            var alert_9 = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be more then Store credit',
                buttons: ['OK']
            });
            alert_9.present();
        }
    };
    CartPage.prototype.removeBirthdayStoreCreditValue = function () {
        if (this.birthdayStoreCreditInput > 0) {
            this.birthdayStoreCreditInput -= 1;
        }
        else {
            var alert_10 = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be less then 0',
                buttons: ['OK']
            });
            alert_10.present();
        }
    };
    CartPage.prototype.detail = function (id) {
        console.log(id, "id");
        this.navCtrl.push('ItemDetailPage', { type: true, item_id: id, BusinesId: this.globals.BusinessID });
    };
    CartPage.prototype.changeAddress = function () {
        // this.navCtrl.push("ModalPage");
        //  this.total();
        var _this = this;
        var modal = this.modalCtrl.create('ModalPage');
        modal.onDidDismiss(function (data) {
            _this.total();
        });
        modal.present();
    };
    CartPage.prototype.AddmoreItem = function () {
        this.globals.cartflag = true;
        console.log("more item", this.globals.cartflag);
        this.navCtrl.popTo('ItemDetailPage');
    };
    CartPage.prototype.RemoveItem = function (product) {
        console.log(product);
        if (this.globals.Product.length == 1) {
            this.globals.BusinessID = -1;
            this.globals.cartflag = false;
            this.ProductsTotal = Number(this.ProductsTotal) - product.totalPrice;
            this.Total = this.Total + this.ProductsTotal;
            // this.globals.BusinessDiscountFlag = false;
            var index = this.globals.Product.indexOf(product);
            this.globals.Product.splice(index, 1);
            // this.setArray();
            this.globals.retail_items_discount = 0;
            this.navCtrl.popTo('CategoryPage');
        }
        else {
            //  console.log("data",product.basePrice*product.quantity,product.basePrice,product.quantity)
            var index = this.globals.Product.indexOf(product);
            this.globals.Product.splice(index, 1);
            this.total();
            console.log("subtract", this.Total);
            // this.setArray();
        }
    };
    CartPage.prototype.CheckUserReward = function () {
        var _this = this;
        var response = this.server.getUserLotteryRewards(this.globals.RewardsPos);
        response.subscribe(function (data) {
            var user_reward = data;
            console.log("reward", user_reward);
            if (user_reward.status != 'error') {
                console.log(user_reward.rewards);
                user_reward.rewards.forEach(function (element) {
                    console.log(_this.globals.BusinessID, "ll");
                    if (element.businessid == _this.globals.new_id) {
                        console.log("businessexist exist");
                        if (element.reward_string == 'null' && element.is_birthday == 'false') {
                            _this.storecreditExist = true;
                            _this.reward_amount = Number(element.reward);
                            console.log("this", _this.reward_amount);
                            _this.StoreCreditInput = _this.reward_amount;
                            console.log(_this.StoreCreditInput);
                        }
                        else if (element.reward_string == 'null' && element.is_birthday == 'true') {
                            console.log("birthday exist");
                            _this.birthdayCreditExist = true;
                            _this.globals.BirthdayCreditExist = _this.birthdayCreditExist;
                            _this.birthday_amount = Number(element.reward);
                            _this.birthdayStoreCreditInput = _this.birthday_amount;
                            _this.globals.birthdayAmount = _this.birthday_amount;
                        }
                        else {
                            _this.storeCredit = false;
                        }
                    }
                    // else{
                    //    // this.storecreditExist = false;
                    //     console.log("businessexist does not exist");
                    // }
                });
                console.log(_this.storecreditExist, "storecredit exist ");
            }
        }, function (error) { console.log(error); });
    };
    CartPage.prototype.StoreCreditAvail = function () {
        console.log(true);
        var flag = false;
        if (this.storecreditExist == true) {
            if (Number(this.StoreCreditInput) > Number(this.Total)) {
                console.log("if", this.StoreCreditInput);
                var alert_11 = this.alertCtrl.create({
                    title: 'Sorry',
                    subTitle: 'In order to avail your Store credit,please add more items.',
                    buttons: ['OK']
                });
                alert_11.present();
            }
            else {
                console.log("else", this.StoreCreditInput);
                this.ProductsTotal -= this.StoreCreditInput;
                this.reward_amount -= this.StoreCreditInput;
                this.StoreCreditInput = this.reward_amount;
                if (this.Deliver == true) {
                    this.Total = Number(this.ProductsTotal) + this.globals.deliveryCharges;
                }
                else {
                    this.Total = Number(this.ProductsTotal);
                }
                this.Total = this.Total.toFixed(2);
                console.log(this.StoreCreditInput, this.reward_amount);
                if (flag == false) {
                    this.navCtrl.push('PaymentPage', { amount: this.Total, StoreCredit: this.StoreCreditInput, notes: this.notes });
                    flag = true;
                }
            }
        }
        if (this.globals.BirthdayCreditExist == true) {
            if (Number(this.birthday_amount) > Number(this.Total)) {
                var alert_12 = this.alertCtrl.create({
                    title: 'Sorry',
                    subTitle: 'In order to avail your Birthday store credit,please add more items.',
                    buttons: ['OK']
                });
                alert_12.present();
            }
            else {
                this.ProductsTotal -= this.birthday_amount;
                this.ProductsTotal = this.ProductsTotal.toFixed(2);
                if (this.Deliver == true) {
                    this.Total = Number(this.ProductsTotal) + this.globals.deliveryCharges;
                }
                else {
                    this.Total = Number(this.ProductsTotal);
                }
                this.Total = this.Total.toFixed(2);
                this.globals.birthdayAmount = 0;
                this.globals.BirthdayCreditExist = false;
                this.globals.BirthdayCreditUtlized = true;
                if (flag == false) {
                    this.navCtrl.push('PaymentPage', { amount: this.Total, notes: this.notes });
                    flag = true;
                }
            }
        }
        else {
            if (flag == false) {
                this.navCtrl.push('PaymentPage', { amount: this.Total, notes: this.notes });
            }
        }
    };
    CartPage.prototype.presentConfirm = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Login',
            message: 'You need to be logged in to use this feature.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Login',
                    handler: function () {
                        _this.navCtrl.setRoot('LoginPage');
                    }
                }
            ]
        });
        alert.present();
    };
    CartPage.prototype.coas_type = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Login',
            message: 'You Want to Login or Proceed to Checkout',
            buttons: [
                {
                    text: 'Login',
                    handler: function () {
                        var modal = _this.modalCtrl.create('LoginPage');
                        modal.present();
                    }
                },
                {
                    text: 'Proceed to Checkout',
                    handler: function () {
                        _this.navCtrl.push('PaymentPage', { amount: _this.Total, tip: _this.Tip, notes: _this.notes, RewardAvailed: _this.RewardStoreCreditAvailed, BirthdayCreditavailed: _this.birthdayStoreCreditavailed });
                    }
                }
            ]
        });
        alert.present();
    };
    CartPage.prototype.paymentPage = function () {
        if (this.globals.guess_login) {
            this.presentConfirm();
        }
        else {
            var proceedFlag = true;
            var alert12 = this.alertCtrl.create({
                title: 'Please note',
                subTitle: 'Cart value must be equal or greater than $' + this.globals.minimun_order + '. Try adding more items in the cart',
                buttons: ['Okay']
            });
            if (this.ProductsTotal < this.globals.minimun_order && this.Deliver == true && this.globals.OrderType == 'delivery') {
                if (Number(this.ProductsTotal == 0)) {
                    if (this.globals.MobileDiscount > 0 && this.globals.MobileDiscountFlag == true) {
                        var mob = this.globals.MobileDiscount;
                        var subtract_value = Number(this.ProductsTotal) - mob;
                        if (subtract_value >= this.globals.minimun_order) {
                            console.log(this.globals.MobileDiscount, "mobile discount");
                            console.log("mobile discount, product total", this.ProductsTotal, this.globals.MobileDiscount);
                            this.ProductsTotal = Number(this.ProductsTotal) - Number(this.globals.MobileDiscount);
                            console.log("product total after subtraction", this.ProductsTotal);
                            this.ProductsTotal = this.ProductsTotal.toFixed(2);
                            console.log("product total after toFixed", this.ProductsTotal);
                            this.Total = this.ProductsTotal;
                            console.log(this.Total, "total = producttotal");
                        }
                        else {
                            alert12.present();
                            proceedFlag = false;
                        }
                        if (this.Deliver == true) {
                            this.Total = Number(this.ProductsTotal) + Number(this.globals.deliveryCharges);
                        }
                        else {
                            this.Total = Number(this.ProductsTotal);
                        }
                        this.Total = this.Total.toFixed(2);
                        if ((Number(this.ProductsTotal) < this.globals.minimun_order || Number(this.ProductsTotal) < 0) && this.Deliver == true) {
                            alert12.present();
                            this.total();
                            proceedFlag = false;
                        }
                    }
                    if (proceedFlag) {
                        this.Address = localStorage.getItem("GetAddress");
                        console.log(this.Address, "lo");
                        if (this.globals.OrderType == 'delivery' && this.globals.caos_flag == false) {
                            if (this.globals.inradius) {
                                if (this.checkTiming(this.globals.delivery_timing)) {
                                    this.address_();
                                }
                            }
                            else {
                                this.globals.presentToast("Sorry, We dn't deliver in your Area.");
                            }
                        }
                        else {
                            console.log(this.globals.Email, "emaill");
                            if (!this.globals.udid && !this.globals.guess_login) {
                                this.coas_type();
                            }
                            else {
                                if (this.checkTiming(this.globals.pickup_timing)) {
                                    this.navCtrl.push('PaymentPage', { giftcard: this.gift_array, amount: this.Total, tip: this.Tip, notes: this.notes, RewardAvailed: this.RewardStoreCreditAvailed, BirthdayCreditavailed: this.birthdayStoreCreditavailed, tax: this.tax_calc });
                                }
                            }
                        }
                    }
                }
                else {
                    alert12.present();
                    proceedFlag = false;
                }
            }
            else {
                if (this.globals.MobileDiscount > 0 && this.globals.MobileDiscountFlag == true) {
                    var mob = this.globals.MobileDiscount;
                    var subtract_value = Number(this.ProductsTotal) - mob;
                    if (subtract_value >= this.globals.minimun_order) {
                        console.log(this.globals.MobileDiscount, "mobile discount");
                        console.log("mobile discount, product total", this.ProductsTotal, this.globals.MobileDiscount);
                        this.ProductsTotal = Number(this.ProductsTotal) - Number(this.globals.MobileDiscount);
                        console.log("product total after subtraction", this.ProductsTotal);
                        this.ProductsTotal = this.ProductsTotal.toFixed(2);
                        console.log("product total after toFixed", this.ProductsTotal);
                        this.Total = this.ProductsTotal;
                        console.log(this.Total, "total = producttotal");
                    }
                    else {
                        alert12.present();
                        proceedFlag = false;
                    }
                    if (this.Deliver == true) {
                        this.Total = Number(this.ProductsTotal) + Number(this.globals.deliveryCharges);
                    }
                    else {
                        this.Total = Number(this.ProductsTotal);
                    }
                    this.Total = this.Total.toFixed(2);
                    if ((Number(this.ProductsTotal) < this.globals.minimun_order || Number(this.ProductsTotal) < 0) && this.Deliver == true) {
                        alert12.present();
                        this.total();
                        proceedFlag = false;
                    }
                }
                if (proceedFlag) {
                    this.Address = localStorage.getItem("GetAddress");
                    console.log(this.globals.Email, "emaill");
                    if (this.globals.OrderType == 'delivery' && this.globals.caos_flag == false) {
                        if (this.globals.inradius) {
                            if (this.checkTiming(this.globals.delivery_timing)) {
                                this.address_();
                            }
                        }
                        else {
                            this.globals.presentToast("Sorry, We dn't deliver in your Area.");
                        }
                    }
                    else {
                        console.log(this.globals.Email, "emaill");
                        if (!this.globals.udid && !this.globals.guess_login) {
                            this.coas_type();
                        }
                        else {
                            if (this.checkTiming(this.globals.pickup_timing)) {
                                this.navCtrl.push('PaymentPage', { giftcard: this.gift_array, amount: this.Total, tip: this.Tip, notes: this.notes, RewardAvailed: this.RewardStoreCreditAvailed, BirthdayCreditavailed: this.birthdayStoreCreditavailed, tax: this.tax_calc });
                            }
                        }
                    }
                }
            }
        }
    };
    CartPage.prototype.address_ = function () {
        var _this = this;
        console.log('address', this.Address);
        console.log(this.Address == 'undefined', this.Address == '', this.Address == 'null');
        if (!this.Address || this.Address == 'undefined' || this.Address == '' || this.Address == 'null') {
            var alert_13 = this.alertCtrl.create({
                title: 'Please Confirm Your Address',
                message: this.Address,
                buttons: [
                    {
                        text: 'Update Address',
                        handler: function () {
                            _this.changeAddress();
                        }
                    },
                    {
                        text: 'Proceed to Checkout',
                        handler: function () {
                            var toast = _this.toastCtrl.create({
                                message: 'Please enter your delivery address',
                                duration: 3000,
                                position: 'bottom'
                            });
                            toast.present();
                            //this.navCtrl.push('PaymentPage', {giftcard:this.gift_array, amount: this.Total, tip: this.Tip, notes: this.notes, RewardAvailed: this.RewardStoreCreditAvailed, BirthdayCreditavailed: this.birthdayStoreCreditavailed });                       
                        }
                    }
                ]
            });
            alert_13.present();
        }
        else {
            var alert_14 = this.alertCtrl.create({
                title: 'Please Confirm Your Address',
                message: this.Address,
                buttons: [
                    {
                        text: 'Update Address',
                        handler: function () {
                            _this.changeAddress();
                        }
                    },
                    {
                        text: 'Proceed to Checkout',
                        handler: function () {
                            _this.navCtrl.push('PaymentPage', { giftcard: _this.gift_array, amount: _this.Total, tip: _this.Tip, notes: _this.notes, RewardAvailed: _this.RewardStoreCreditAvailed, BirthdayCreditavailed: _this.birthdayStoreCreditavailed, tax: _this.tax_calc });
                        }
                    }
                ]
            });
            alert_14.present();
        }
    };
    // TipChange(){
    //     if(this.Tip > 0)
    //     this.Total = Number(this.Total) + Number(this.Tip);
    //         this.Total = this.Total.toFixed(2);
    // }
    CartPage.prototype.AvailRewards = function () {
        if (this.check_points) {
            this.user_availed_points = false;
            if (this.pointsInput.points != undefined || this.pointsInput.points != null) {
                if (this.pointsInput.points > this.points) {
                    this.AddMoreItemAlert('You do not have sufficient points to redeem this point reward.');
                    this.user_availed_points = false;
                }
                else if (!this.pointsInput.availed) {
                    var tot = Number(this.Total);
                    var sub = tot - Number(this.pointsInput.description);
                    console.log(sub, "sub");
                    if (sub <= 0) {
                        // if (sub < this.globals.minimun_order || sub <= 0) {
                        // this.AddMoreItemAlert(' Points reward cannot be availed.Please add more item in the cart.');
                        this.AddMoreItemAlert('Point cannot be redeemed on rewards');
                        this.user_availed_points = false;
                    }
                    else {
                        this.pointsInput.availed = true;
                        this.points = this.points - this.pointsInput.points;
                        console.log("pointshow77", this.pointsInput.description);
                        this.point_show = this.point_show + Number(this.pointsInput.description);
                        console.log("pointshow", this.point_show);
                        this.Total = sub;
                        this.globals.points_availed = this.pointsInput.points;
                        this.availed_points = Number(this.pointsInput.description);
                        this.Total = this.Total.toFixed(2);
                        // this.pointsInput = null;
                        this.user_availed_points = true;
                    }
                }
            }
        }
        if (this.check_rewards) {
            var tot = Number(this.Total);
            var sub = tot - this.StoreCreditInput;
            if (sub < this.globals.minimun_order || sub <= 0) {
                this.AddMoreItemAlert('Lottery reward credit cannot be availed.Please add more item in the cart.');
            }
            else {
                this.reward_amount -= this.RewardStoreCreditAvailed;
                this.RewardStoreCreditAvailed = Number(this.RewardStoreCreditAvailed) + Number(this.StoreCreditInput);
                console.log(this.RewardStoreCreditAvailed);
                this.Total = sub;
                this.Total = this.Total.toFixed(2);
            }
        }
        if (this.check_birthday) {
            var tot = Number(this.Total);
            var sub = tot - this.birthdayStoreCreditInput;
            if (sub < this.globals.minimun_order || sub <= 0) {
                this.AddMoreItemAlert('Birthday credit cannot be availed.Please add more item in the cart.');
            }
            else {
                this.birthday_amount -= this.birthdayStoreCreditavailed;
                this.Total = sub;
                this.birthdayStoreCreditavailed = Number(this.birthdayStoreCreditavailed) + Number(this.birthdayStoreCreditInput);
                console.log(this.birthdayStoreCreditavailed);
                this.Total = this.Total.toFixed(2);
            }
        }
    };
    CartPage.prototype.AddMoreItemAlert = function (message) {
        var AddMoreItemAlert = this.alertCtrl.create({
            title: 'Oops',
            subTitle: message,
            buttons: ['Okay']
        });
        AddMoreItemAlert.present();
    };
    CartPage.prototype.showExtras = function (extras) {
        console.log(extras);
        // let modal = this.modalCtrl.create('CartDetailPage',{product:extras});
        // modal.present();
        this.navCtrl.push('CartDetailPage', { product: extras });
    };
    CartPage.prototype.addQuantity = function (object) {
        console.log(object);
        object.quantity += 1;
        var extra_total = 0;
        if (object.menuExtrasSelected.length > 0) {
            for (var _i = 0, _a = object.menuExtrasSelected; _i < _a.length; _i++) {
                var m = _a[_i];
                for (var _b = 0, _c = m.optionNameSelected; _b < _c.length; _b++) {
                    var u = _c[_b];
                    if (!u.isFree) {
                        extra_total = u.price * u.quantity;
                    }
                }
            }
        }
        object.totalPrice = (object.quantity * object.basePrice) + extra_total;
        this.total();
    };
    CartPage.prototype.removeQuantity = function (object) {
        console.log(object);
        if (object.quantity <= 1) {
            object.quantity = 1;
        }
        else {
            object.quantity -= 1;
            var extra_total = 0;
            if (object.menuExtrasSelected.length > 0) {
                for (var _i = 0, _a = object.menuExtrasSelected; _i < _a.length; _i++) {
                    var m = _a[_i];
                    for (var _b = 0, _c = m.optionNameSelected; _b < _c.length; _b++) {
                        var u = _c[_b];
                        console.log(u);
                        if (!u.isFree) {
                            extra_total = u.price * u.quantity;
                        }
                    }
                }
            }
            console.log(extra_total);
            object.totalPrice = (object.quantity * object.basePrice) + extra_total;
            this.total();
        }
    };
    CartPage.prototype.closeKeyboard = function () {
        var activeElement = document.activeElement;
        activeElement && activeElement.blur && activeElement.blur();
    };
    CartPage.prototype.percent_tip = function (tip) {
        this.tip_type = 'percent';
        this.percent_tip_vlaue = tip;
        if (tip) {
            this.Total = Number(this.Total) - Number(this.Tip);
            this.per_tip = ((Number(this.ProductsTotal) / 100) * tip).toFixed(2);
            this.Tip = this.per_tip;
            this.Total = (Number(this.Total) + Number(this.per_tip)).toFixed(2);
        }
    };
    CartPage.prototype.percent_tip_ = function (tip) {
        this.tip_type = 'percent';
        this.percent_tip_vlaue = tip;
        if (tip) {
            this.per_tip = ((Number(this.ProductsTotal) / 100) * tip).toFixed(2);
            this.Tip = this.per_tip;
            this.Total = (Number(this.Total) + Number(this.per_tip)).toFixed(2);
        }
    };
    CartPage.prototype.add_gratuity = function () {
        var _this = this;
        this.tip_type = 'manual';
        var alert = this.alertCtrl.create({
            title: 'Add Gratuity',
            inputs: [
                {
                    name: 'tip',
                    placeholder: 'Tip',
                    type: 'number',
                    value: this.Tip
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
                    text: 'OK',
                    handler: function (data) {
                        console.log("Tip here >>> ", data);
                        if (data.tip == '') {
                            _this.Tip = 0;
                            _this.total();
                        }
                        else {
                            _this.Total = _this.Total - Number(_this.Tip);
                            _this.Tip = data.tip;
                            _this.tip_cus = data.tip;
                            _this.Total = (Number(_this.Total) + Number(_this.Tip)).toFixed(2);
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    CartPage.prototype.add_notes = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Add Notes',
            inputs: [
                {
                    name: 'notes',
                    placeholder: 'Notes',
                    value: this.notes
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
                    text: 'OK',
                    handler: function (data) {
                        _this.notes = data.notes;
                    }
                }
            ]
        });
        alert.present();
    };
    CartPage.prototype.add_points = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle(this.points + ' Points');
        this.point_rewards.forEach(function (e) {
            alert.addInput({
                type: 'radio',
                label: '$' + e.description + ' (' + e.points + ' Points)',
                value: e,
                disabled: e.availed
            });
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                var p = _this.point_rewards.filter(function (item) {
                    return item.availed === false;
                });
                if (p.length > 0) {
                    _this.pointsInput = data;
                    _this.check_points = true;
                    _this.AvailRewards();
                }
            }
        });
        alert.present();
    };
    CartPage.prototype.my_gift_cards = function () {
        var _this = this;
        var response = this.server.my_gift_cards();
        response.subscribe(function (data) {
            _this.mygifts = data;
        }, function (error) {
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    CartPage.prototype.gift_alert = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Select Giftcard');
        this.mygifts.forEach(function (e) {
            alert.addInput({
                type: 'radio',
                label: '$' + e.amount,
                value: e,
            });
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                if (data) {
                    if (Number(data.amount) > Number(_this.Total)) {
                        _this.full_reddem_or_partial(data);
                    }
                    else {
                        _this.partial_redeem(data);
                    }
                }
            }
        });
        alert.present();
    };
    CartPage.prototype.full_reddem_or_partial = function (data) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Giftcard',
            message: 'Would you like to use your gift card for entire order?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        _this.partial_redeem(data);
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.full_redeem(data);
                    }
                }
            ]
        });
        alert.present();
    };
    CartPage.prototype.full_redeem = function (data) {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: 'Are you sure you want to place order and pay all with giftcard?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        if (_this.globals.OrderType == 'delivery') {
                            if (_this.ProductsTotal < _this.globals.minimun_order) {
                                _this.globals.presentToast("Please add more items in cart.");
                            }
                            else {
                                if (_this.globals.inradius) {
                                    var giftdata = { giftcard_id: data.giftcard_id, amount: _this.Total };
                                    _this.gift_array.push(giftdata);
                                    _this.navCtrl.push('PaymentPage', { amount: 0, giftcard: _this.gift_array, gift_flag: true, tax: _this.tax_calc });
                                }
                                else {
                                    _this.globals.presentToast("Sorry, We dn't deliver in Your Area");
                                }
                            }
                        }
                        else {
                            var giftdata = { giftcard_id: data.giftcard_id, amount: _this.Total };
                            _this.gift_array.push(giftdata);
                            _this.navCtrl.push('PaymentPage', { amount: 0, giftcard: _this.gift_array, gift_flag: true, tax: _this.tax_calc });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    CartPage.prototype.partial_redeem = function (data_gift) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Enter amount you want to pay from giftcard.',
            inputs: [
                {
                    name: 'amount',
                    placeholder: 'Amount'
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
                    text: 'Pay',
                    handler: function (data) {
                        if (Number(data_gift.amount) < Number(data.amount)) {
                            _this.globals.presentToast("You enter amount greater than your giftcard");
                        }
                        else {
                            if (Number(data.amount) > Number(_this.Total)) {
                                _this.globals.presentToast("Please Enter More items in cart");
                            }
                            else {
                                _this.Total = (Number(_this.Total) - Number(data.amount)).toFixed(2);
                                _this.mygifts.map(function (checkitem, i, array) {
                                    if (checkitem.giftcard_id == data_gift.giftcard_id) {
                                        checkitem.amount = Number(checkitem.amount) - Number(data.amount);
                                    }
                                });
                                var not_in_array = true;
                                _this.gift_array.forEach(function (e) {
                                    if (e.giftcard_id == data_gift.giftcard_id) {
                                        e.amount = Number(e.amount) + Number(data.amount);
                                        not_in_array = false;
                                        console.log("gifts_array", _this.gift_array, _this.mygifts);
                                    }
                                });
                                if (not_in_array) {
                                    var giftdata = { giftcard_id: data_gift.giftcard_id, amount: data.amount };
                                    _this.gift_array.push(giftdata);
                                    console.log("gifts_array", _this.gift_array, _this.mygifts);
                                }
                                _this.gift_card_amount = 0;
                                _this.gift_array.forEach(function (e) {
                                    _this.gift_card_amount = _this.gift_card_amount + Number(e.amount);
                                });
                            }
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    CartPage.prototype.checkTiming = function (timing) {
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
                this.globals.presentToast('Sorry, we are not serving at this time!');
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
                this.globals.presentToast('Sorry, we are not serving at this time!');
                return false;
            }
        }
    };
    CartPage.prototype.add_reward = function () {
        this.globals.BusinessID = '-1';
        this.navCtrl.push('MyRewardsPage', { reward_type_home: 'reward' });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Navbar"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Navbar"])
    ], CartPage.prototype, "navBar", void 0);
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-cart',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/cart/cart.html"*/'<!--\n  Generated template for the CartPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color="primary" class="order-nav">\n    <ion-title>Your Order</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only color="royal" (click)="paymentPage()">\n        Checkout\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content  class="Open-Sans-regular">\n\n  <ion-card *ngFor="let prod of globals.Product; let i = index" class="Open-Sans-regular padd-">\n    <ion-row>\n      <ion-col col-3>\n        <ion-thumbnail item-start>\n\n          <img *ngIf="prod.image != \'\' && prod.image != \'undefined\'  " style="    border-radius: 4px;object-fit: contain" src="{{prod.image}}">\n          <img *ngIf="prod.image == \'\' || prod.image == \'undefined\' " style=" border-radius: 4px;object-fit: contain" src={{globals.b_logo}}>\n        </ion-thumbnail>\n      </ion-col>\n      <ion-col col-7>\n        <p style="font-size:1.7rem;  color:#666;  margin-top: 0;"> {{prod.menuItem}} </p>\n        <p style="font-size:2.0rem;color:#666;"> ${{prod.totalPrice | number : \'1.2-2\'}}</p>\n        <!-- <button *ngIf="prod.menuExtrasSelected.length > 0 " style=" background-color: #ccc;border-radius: 2px;padding:5px;color: #444; font-size: 1.1rem;"\n          (click)="showExtras(prod)"> Extras </button> -->\n          <div *ngFor="let extras of prod.menuExtrasSelected "> \n              <ul style="margin: 0px;color: #555" *ngFor="let op of extras.optionNameSelected ">\n                  <li> {{op.name}}(${{op.price}})</li>\n               </ul>\n           \n             </div> \n       \n\n        <!-- <ion-label style="font-size:2.0rem; margin-top:0">Price <p style="float:right;font-size:2.0rem;color:black"> ${{prod.basePrice}} </p>  </ion-label>  -->\n\n        <!-- (tap)="detail(prod.uniqueId)" -->\n\n        <!-- <div *ngIf = "prod.menuExtrasSelected.length > 0 ">\n    <button ion-button small style="    border-radius: 50%;" > <ion-icon style="font-size:1.3rem" name="information"></ion-icon> </button>\n  <p color = "primary" style=" font-size: 1.8rem; color:black; font-weight:bold"> Extras</p>\n\n<div *ngFor="let extras of prod.menuExtrasSelected "> \n  <ion-row style="border-top: none;" *ngFor="let op of extras.optionNameSelected " >  \n<ion-col>\n<p> name: {{op.name}} </p>\n<p> price: ${{op.price}} </p>\n\n</ion-col>\n  </ion-row>\n \n</div> \n</div>  -->\n        <!-- <p  style="font-size:2rem;color:black;font-weight:bold">Subtotal:   </p> -->\n\n        <!-- <ion-label style="font-size:2.0rem; margin-top:0 ;font-weight:bold">Subtotal: <p style="float:right;font-size:2.0rem;color:black"> ${{prod.totalPrice}}  </p>  </ion-label>  -->\n        <!-- <ion-row style="      \n background: #000000;\n margin: 5px; background: #000000">\n\n          <ion-col col-4 style="    margin: auto;  padding: 0;  background: #000000;text-align: center;" (tap)="removeQuantity(prod)">\n            <button ion-button small style="    background-color: #000000;text-align: center;  padding: 0; margin: 0;">\n              <ion-icon style="font-weight:bold" name="remove"> </ion-icon>\n            </button>\n\n          </ion-col>\n\n          <ion-col style="text-align:center; margin:auto; background:#23609c" col-4>\n            <p style=" color:white;font-weight:bold"> {{prod.quantity}} </p>\n          </ion-col>\n\n          <ion-col col-4 style="    margin: auto;  padding: 0;   background: #000000;text-align: center;" (tap)="addQuantity(prod)">\n            <button ion-button small style="    background-color: #000000;text-align: center;   padding: 0; margin: 0;">\n              <ion-icon style="font-weight:bold" name="add"> </ion-icon>\n            </button>\n\n          </ion-col>\n        </ion-row> -->\n      </ion-col>\n\n      <ion-col col-2 style="text-align:right">\n        <!-- <p style="font-size:2.0rem;color:black;padding-bottom:5px"> ${{prod.basePrice}} </p>  -->\n        <ion-icon name="close" (click)="RemoveItem(prod)"  class="cross_icon"></ion-icon>\n        <ion-label style="font-size:1.3rem; margin-bottom:0; color:#666;margin-top: 22px;">\n            <ion-icon style="color:#666" name="basket"></ion-icon> {{prod.quantity}} </ion-label>\n\n        \n\n        <!-- <button  style="background: transparent"\n          (click)="RemoveItem(prod)">\n          <ion-icon name="trash" color=\'danger\' style="font-size: 1.3rem;"> </ion-icon>\n        </button> -->\n      </ion-col>\n\n    </ion-row>\n     \n    <ion-row style="padding-bottom:2%;" *ngIf= "prod.itemInstructions !=null && prod.itemInstructions !=\'undefined\'"  >\n        <ion-label text-wrap style="margin-top: 0px; margin-bottom: 0px; color: #999;text-align: center"> <span style="font-size: 17px;color: #444">Instructions:</span> {{prod.itemInstructions}}</ion-label>\n         <!-- <p>{{prod.itemInstructions}}</p> -->\n    </ion-row>\n  </ion-card>\n\n<ion-row>\n  <ion-col>\n    <button ion-button class="addmore-btn" block (click)="AddmoreItem()"> Add More  <ion-icon style="padding-left: 7px;" name="ios-add-circle-outline"></ion-icon> </button>\n  </ion-col>\n  <ion-col>\n    <button ion-button class="addmore-btn" [disabled]="globals.reward_menu_length == 0"  block outline (click)="add_reward()"> Add Reward  <ion-icon style="padding-left: 7px;" name="trophy"></ion-icon> </button>\n  </ion-col>\n</ion-row>\n \n\n\n  <!-- <div *ngIf="globals.type != \'reservation\' ">\n    <div *ngIf="globals.pickup == true && globals.delivery == true">\n      <ion-list style="margin-bottom: 10px;margin-top:10px" no-lines>\n        <div style="text-align:center">\n          <div style="display: inline-block; width: 40%;">\n            <ion-item style="border-radius: 20px;">\n              <ion-label>Delivery</ion-label>\n              <ion-checkbox [(ngModel)]="Deliver" (ionChange)="DeliverBox()"></ion-checkbox>\n            </ion-item>\n          </div>\n          <div style="display: inline-block;  width: 10%;  font-size: 2rem; text-align: center;">\n            <ion-label style="margin:0">OR</ion-label>\n          </div>\n          <div style="display: inline-block; width: 40%;">\n            <ion-item style="border-radius: 20px;">\n              <ion-label>Pick up</ion-label>\n              <ion-checkbox [(ngModel)]="pickup" (ionChange)="PickupBox()"></ion-checkbox>\n            </ion-item>\n          </div>\n        </div>\n      </ion-list>\n    </div>\n  </div> -->\n\n  <!-- <div *ngIf="globals.type != \'reservation\' ">\n    <div *ngIf="globals.pickup == true && globals.delivery == false">\n      <ion-list style="margin-bottom: 10px;margin-top:10px" no-lines>\n        <div style="text-align:center;  width: 95%;  margin-left: 1.9%;">\n          <ion-item style="border-radius: 20px;">\n            <ion-label>Pick up</ion-label>\n            <ion-checkbox [(ngModel)]="pickup" disabled="true" (ionChange)="PickupBox()"></ion-checkbox>\n          </ion-item>\n        </div>\n      </ion-list>\n    </div>\n  </div>\n  <div *ngIf="globals.pickup == false && globals.delivery == true">\n    <ion-list style="margin-bottom: 10px;margin-top:10px" no-lines>\n      <div style="text-align:center;  width: 95%;  margin-left: 1.9%;">\n        <ion-item style="border-radius: 20px;">\n          <ion-label>Delivery</ion-label>\n          <ion-checkbox [(ngModel)]="Deliver" disabled="true" (ionChange)="DeliverBox()"></ion-checkbox>\n        </ion-item>\n      </div>\n\n    </ion-list>\n  </div> -->\n\n\n  \n  <button *ngIf="!globals.caos_flag" ion-button type="submit" clear (click)="changeAddress()" style="margin-top:-3%;width:95%; margin-left:1.9%;color:#444"\n  block> <u>Update Delivery or Pickup</u> </button>\n  <!-- <ion-list no-lines style="margin-left: 10px; margin-right: 10px;margin-bottom:10px; width:94%;   display: inline-flex;">\n\n    <ion-item style="width: 120%;">\n      <ion-label>Rewards</ion-label>\n      <ion-checkbox style="margin-right:5px" [disabled]="!storecreditExist" [(ngModel)]="check_rewards" (ionChange)="RewardBox()"></ion-checkbox>\n    </ion-item>\n    <ion-item>\n      <ion-label>Gifts</ion-label>\n      <ion-checkbox style="margin-right:5px" [disabled]="!birthdayCreditExist" [(ngModel)]="check_birthday" (ionChange)="BirthdayBox()"></ion-checkbox>\n    </ion-item>\n  </ion-list> -->\n\n\n\n  <!-- <ion-card *ngIf="check_points" no-lines style="font-weight:bold">\n\n    <ion-row>\n\n      <ion-col col-5 style="margin: auto;">\n\n        <p style="font-size:1.3rem; color:#000000;text-align: center; ">Points </p>\n        <p style="font-size:3rem; color:#000000;text-align: center; ">{{points}} </p>\n      </ion-col>\n\n      <ion-col style="margin:auto">\n        <div *ngIf="point_rewards">\n\n\n          <ion-select placeholder="Points" style="max-width:80%; font-size:1.6rem" [selectOptions]="selectOptions" [(ngModel)]="pointsInput">\n            <div *ngFor="let k of point_rewards">\n              <ion-option [disabled]="k.availed" [value]="k"> ${{k.description}} ({{k.points}} points)</ion-option>\n            </div>\n          </ion-select>\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n  </ion-card> -->\n\n  <!-- Store credit  -->\n\n\n  <!-- <div *ngIf="check_rewards">\n    <ion-card style="font-weight: bold; margin-bottom:5px">\n      <ion-row style=" border: none;height: 65px;">\n        <ion-col col-5 style="margin: auto;">\n\n          <p style="font-size:1.3rem; color:#000000;text-align: center; ">Reward </p>\n          <p style="font-size:3rem; color:#000000;text-align: center; ">{{reward_amount}} </p>\n        </ion-col>\n        <ion-col style="height: inherit; padding:0">\n          <ion-row style=" border: none;height: inherit; background:#000000">\n            <ion-col col-3 style=" padding: 0;text-align: center;margin:auto" (click)="removeStoreCreditValue()">\n              <button ion-button [disabled]="!storeCredit" style="padding: 0; font-size: 2rem">\n                <ion-icon style="    font-size: 5rem; font-weight: bold;" name="remove"> </ion-icon>\n              </button>\n            </ion-col>\n            <ion-col style="text-align:center;padding:0 ;background:#23609c">\n              <ion-input class="point-input" style="font-size:3.5rem; margin: 0;color:white" type="number" [(ngModel)]="StoreCreditInput"\n                (ngModelChange)="MaxMin()"></ion-input>\n            </ion-col>\n            <ion-col col-3 style="padding: 0;text-align: center; margin:auto" (click)="addStoreCreditValue()">\n              <button ion-button [disabled]="!storeCredit" style=" padding: 0; font-size: 2rem">\n                <ion-icon style="font-size: 5rem;font-weight: bold;" name="add"> </ion-icon>\n              </button>\n            </ion-col>\n          </ion-row>\n\n        </ion-col>\n      </ion-row>\n    </ion-card>\n  </div>\n\n   Birthday Store Credit \n\n  <div *ngIf="check_birthday">\n    <ion-card style="font-weight:bold;margin-bottom:5px">\n      <ion-row style=" border: none;height: 65px;">\n        <ion-col col-5 style="margin: auto;">\n\n          <p style="font-size:1.3rem; color:#000000;text-align: center; ">Gift</p>\n          <p style="font-size:3rem; color:#000000;text-align: center; ">{{birthday_amount}} </p>\n        </ion-col>\n        <ion-col style="height: inherit; padding:0">\n          <ion-row style=" border: none;height: inherit; background:#000000">\n            <ion-col col-3 style=" padding: 0;text-align: center;margin:auto" (click)="removeBirthdayStoreCreditValue()">\n              <button ion-button [disabled]="!storeCredit" style="padding: 0; font-size: 2rem">\n                <ion-icon style="    font-size: 5rem; font-weight: bold;" name="remove"> </ion-icon>\n              </button>\n            </ion-col>\n            <ion-col style="text-align:center;padding:0 ;background:#23609c">\n              <ion-input class="point-input" style="font-size:3.5rem; margin: 0;color:white" type="number" [(ngModel)]="birthdayStoreCreditInput"\n                (ngModelChange)="BirthdayMaxMin()"></ion-input>\n            </ion-col>\n            <ion-col col-3 style="padding: 0;text-align: center; margin:auto" (click)="addBirthdayStoreCreditValue()">\n              <button ion-button [disabled]="!storeCredit" style=" padding: 0; font-size: 2rem">\n                <ion-icon style="font-size: 5rem;font-weight: bold;" name="add"> </ion-icon>\n              </button>\n            </ion-col>\n          </ion-row>\n\n        </ion-col>\n      </ion-row>\n    </ion-card>\n  </div>\n  <div style="text-align:center;width:80%;margin-left:10%">\n    <button ion-button full block *ngIf="check_points || check_rewards || check_birthday " (tap)="AvailRewards()">Redeem</button>\n  </div> -->\n\n  <!-- <ion-list *ngSwitchCase="\'tip\'">\n            <ion-list class="tipclass" style="padding:0px;margin-bottom: 10px;">\n                <ion-row>\n                    <ion-col col-1 >\n                        <ion-checkbox style="margin-top: 32px;" [(ngModel)]="tipclick"></ion-checkbox>\n                    </ion-col>\n                    <ion-col col-11 >\n                       <ion-item style="background:transparent">\n                            <ion-label  fixed>\n                              Tip\n                            </ion-label>\n                            <ion-input [(ngModel)]="Tip"  (keyup.enter)="closeKeyboard()" type="number" [disabled]="!tipclick"></ion-input>\n                      </ion-item>\n                    </ion-col>\n                  </ion-row>\n            </ion-list>\n          \n        </ion-list> -->\n      \n        <!-- <ion-list *ngSwitchCase="\'notes\'">\n            <ion-item style="background:transparent">\n                <ion-label style=" margin: 0;" fixed>\n                  Notes\n                </ion-label>\n                <ion-input (keyup.enter)="closeKeyboard()" [(ngModel)]="notes"></ion-input>\n              </ion-item>\n       \n        </ion-list> -->\n       \n            <div class="bill">\n\n                <ion-label style="padding:0px;font-size:1.3rem;margin:0px; color:#444;  ">\n                   <!-- <ion-icon style="    padding-right: 5px;  position: relative; top: 3px;" ios="ios-cash" md="md-cash"> </ion-icon> -->\n                    SubTotal\n                   <p style="float:right;font-size:1.3rem;margin:0px;color:#555;"> ${{ProductsTotal | number : \'1.2-2\'}} </p>\n                 </ion-label>\n             \n             \n             <!-- <discount start here> -->\n                 <ion-label *ngIf="globals.BusinessDiscount > 0 && globals.availed_discount_count < globals.business_discount_count"  style="padding:0px;font-size:1.3rem;margin:0px;color:#444;">\n                   <!-- <ion-icon style="padding-right: 5px;  position: relative; top: 3px;" ios="ios-cut" md="md-cut"> </ion-icon> -->\n                    Business Discount <ion-icon class="animated infinite tada delay-4s fs" name="heart" color="danger"></ion-icon>\n                   <p style="float:right;font-size:1.3rem;margin:0px;color:#444;"> -${{discountTotal}}</p>\n                 </ion-label>\n             \n             <!-- <discount end here> -->\n             \n              <ion-label *ngIf="globals.retail_items_discount > 0"  style="padding:0px;font-size:1.3rem;margin:0px;color:#444;">\n                <!-- <ion-icon style="padding-right: 5px;  position: relative; top: 3px;" ios="ios-cut" md="md-cut"> </ion-icon> -->\n                 Discount <ion-icon class="animated infinite tada delay-4s fs" name="heart" color="danger"></ion-icon>\n                <p style="float:right;font-size:1.3rem;margin:0px;color:#444;"> -${{globals.retail_items_discount}}</p>\n              </ion-label>\n             \n                 <ion-label *ngIf="globals.deliveryCharges != \'\' && globals.OrderType == \'delivery\'" style="padding:0px;font-size:1.3rem;margin:0px;color:#444;">\n                   <!-- <ion-icon style="    padding-right: 5px;  position: relative; top: 3px;" name="bicycle"> </ion-icon>  -->\n                   Convenient Fee\n                   <p style="float:right;font-size:1.3rem;margin:0px;color:#444;">${{delivery_display}}</p>\n                 </ion-label>\n                 <ion-label *ngIf="globals.deliveryCharges == \'\' && globals.OrderType == \'delivery\'" style="padding:0px;font-size:1.3rem;margin:0px;color:#444;">\n                   <!-- <ion-icon style="    padding-right: 5px;  position: relative; top: 3px;" name="bicycle"> </ion-icon> -->\n                   Convenient Fee\n                   <p style="float:right;font-size:1.3rem;margin:0px;color:#444;">$0</p>\n                 </ion-label>\n             \n                 <ion-label *ngIf="globals.tax != \'\'" style="padding:0px;font-size:1.3rem;margin:0px;color:#444;">\n                   <!-- <ion-icon style="padding-right: 5px;  position: relative; top: 3px;" name="copy"> </ion-icon>  -->\n                   Tax\n                   <p style="float:right;font-size:1.3rem;margin:0px;color:#444;"> ${{tax_calc}}</p>\n                 </ion-label>\n             \n                 <!-- <ion-label *ngIf="globals.minimun_order != 0 && pickup == false" style="padding:0px;font-size:1.3rem;margin:0px;color:#444;">\n                    <ion-icon style="    padding-right: 5px;  position: relative; top: 3px;" name="cart"> </ion-icon>  \n                   Minimum Order\n                   <p style="float:right;font-size:1.3rem;margin:0px;color:#444;"> ${{globals.minimun_order}}</p>\n                 </ion-label> -->\n             \n             \n                 <ion-label *ngIf="check_rewards" style="padding:0px;font-size:1.3rem;margin:0px; color:#444;">\n                   <!-- <ion-icon style="    padding-right: 5px;  position: relative; top: 3px;" name="card"> </ion-icon>  -->\n                   Store Credit\n                   <p style="float:right;font-size:1.3rem;margin:0px;color:#444;"> - ${{StoreCreditInput}}</p>\n                 </ion-label>\n             <!-- \n                 <ion-label *ngIf="globals.BusinessDiscount > 0 && globals.availed_discount_count < globals.business_discount_count" style="font-size:1.3rem;margin:0px;color:#000000;margin-left: 8px;     border-bottom: solid thin #ccc;">\n                   <ion-icon style="padding-right: 5px;  position: relative; top: 3px;" ios="ios-cut" md="md-cut"> </ion-icon> Discount\n                   <p style="float:right;font-size:1.3rem;margin:0px;color:#000000">{{globals.BusinessDiscount}}%</p>\n                 </ion-label> -->\n             \n                 <ion-label *ngIf="globals.MobileDiscount > 0 && globals.MobileDiscountFlag == false " style="padding:0px;font-size:1.3rem;margin:0px;color:#444;;">\n                   <!-- <ion-icon style="    padding-right: 5px;  position: relative; top: 3px;" ios="ios-cut" md="md-cut"> </ion-icon> -->\n                    Mobile Discount\n                   <p style="float:right;font-size:1.3rem;margin:0px;color:#444;"> - ${{globals.MobileDiscount}}</p>\n                 </ion-label>\n             \n                 <ion-label *ngIf="check_birthday" style="padding:0px;font-size:1.3rem;margin:0px;color:#444;">\n                   <!-- <ion-icon style="    padding-right: 5px;  position: relative; top: 3px;" ios="ios-cut" md="md-cut"> </ion-icon>  -->\n                   Birthday Discount\n                   <p style="float:right;font-size:1.3rem;margin:0px;color:#444;">- ${{birthdayStoreCreditInput}}</p>\n                 </ion-label>\n                 <ion-label *ngIf="check_points && pointsInput.description " style="padding:0px;font-size:1.3rem;margin:0px;color:#444;">\n                   <!-- <ion-icon style="    padding-right: 5px;  position: relative; top: 3px;" ios="ios-cut" md="md-cut"> </ion-icon> -->\n                    Points Used\n                   <p style="float:right;font-size:1.3rem;margin:0px;color:#444;">- ${{point_show}}</p>\n                 </ion-label>\n                 <ion-label *ngIf="check_points && !pointsInput.description " style="padding:0px;font-size:1.3rem;margin:0px;color:#444;">\n                   Point Used\n                   <p style="float:right;font-size:1.3rem;margin:0px;color:#444;">- $0</p>\n                 </ion-label>\n\n                 <ion-label *ngIf="gift_card_amount > 0" style="padding:0px;font-size:1.3rem;margin:0px; color:#444;">\n                    Gift Card\n                  <p style="float:right;font-size:1.3rem;margin:0px;color:#444;"> - ${{gift_card_amount}}</p>\n                </ion-label>\n\n                 <ion-label *ngIf="globals.GainDiscount > 0" style="padding:0px;font-size:1.3rem;margin:0px; color:#444;">\n                   <!-- <ion-icon style="    padding-right: 5px;  position: relative; top: 3px;" ios="ios-cut" md="md-cut"> </ion-icon> -->\n                     Discount\n                   <p style="float:right;font-size:1.3rem;margin:0px;color:#444;"> - ${{globals.GainDiscount}}</p>\n                 </ion-label>\n             \n                 <ion-label style="padding:0px;padding:0px;font-size:1.3rem;margin:0px;color:#444; ">\n                   <!-- <ion-icon style="padding-right: 5px;  position: relative; top: 3px;" name="copy"> </ion-icon>  -->\n                   Gratuity\n                   <!-- <p style="margin: -28px; margin-left: 26px"></p> -->\n                   <p style="float:right;font-size:1.3rem;margin:0px;color:#444;"> ${{Tip}}</p>\n                 </ion-label>\n                 \n                 <ion-label *ngIf="notes" style="padding:0px;padding:0px;font-size:1.3rem;margin:0px;color:#444; ">\n                  <!-- <ion-icon style="padding-right: 5px;  position: relative; top: 3px;" name="copy"> </ion-icon>  -->\n                  Notes\n                  <!-- <p style="margin: -28px; margin-left: 26px"></p> -->\n                  <p style="float:right;font-size:1.3rem;margin:0px;color:#444;    text-overflow: ellipsis;\n                  white-space: nowrap;\n                  overflow: hidden;\n                  max-width: 100%;"> {{notes}}</p>\n                </ion-label>\n             \n                 \n             \n               </div>\n       \n    <button ion-button block style="width: 80%;margin-left: 10%;color: #fff;border-radius: 7px;margin-top: 50px;" (click)="paymentPage()"> Proceed To Checkout </button>\n     \n</ion-content>\n<ion-footer>\n    <h3 style="margin-left: 4%;">Tip</h3>\n    <ion-row>\n      <ion-col col-4>\n        <button ion-button block (click)="percent_tip(8)"> 8% </button>\n      </ion-col>\n      <ion-col col-4>\n       <button ion-button block (click)="percent_tip(10)"> 10% </button>\n      </ion-col>\n      <ion-col col-4>\n          <button ion-button block (click)="percent_tip(15)"> 15% </button>\n        </ion-col>\n    </ion-row>\n\n    <ion-segment >\n        <ion-segment-button [disabled]="!pointExists" (click)="add_points()">\n          Redeem Points\n        </ion-segment-button>\n        <ion-segment-button  style="padding: 0px" (click)="add_notes()">\n          Add Notes\n        </ion-segment-button>\n        <ion-segment-button style="overflow:unset !important;padding: 0px" (click)="add_gratuity()">\n            Gratuity\n        </ion-segment-button>\n        <ion-segment-button style="overflow:unset !important;padding: 0px" (click)="gift_alert()" *ngIf="mygifts.length > 0">\n          Giftcards\n      </ion-segment-button>\n      </ion-segment>\n    <ion-label style="font-size:25px;margin:0px;padding:0px;padding-top: 10px; color:#444; padding: 16px;">\n        Total\n        <p style="float:right;font-size:25px;margin:0px;color:#555;"> ${{Total}} </p>\n      </ion-label>\n\n</ion-footer>\n\n\n\n\n\n\n<!--//////////old code /////////-->\n\n\n\n\n<!--\n  Generated template for the CartPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!--<ion-header class="Open-Sans-bold"> \n\n  <ion-navbar color = "primary">\n    <ion-title>Cart</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content style="background-color:#eee " class="Open-Sans-regular">\n\n<ion-card>\n  <ion-label color = "primary" style="text-align: center;font-size: 1.3rem;font-weight: bold;"> Your Order </ion-label>\n  \n<ion-row *ngFor = "let prod of globals.Product; ">\n\n  <ion-col col-3>\n     <ion-thumbnail item-start>\n    \n<img style="height:100px;"  src="{{prod.image}}">\n     </ion-thumbnail>\n  </ion-col>\n  <ion-col col-6>\n <ion-label style="font-size:2.0rem"> {{prod.quantity}} * {{prod.menuItem}} </ion-label> \n\n<p style="font-size:1.7rem;color:#42317e"> ${{prod.basePrice}}/product </p> \n\n\n<div *ngIf = "prod.menuExtrasSelected.length > 0 ">\n<p color = "primary" style=" font-size: 1.8rem; color: #42317e;"> Extras</p>\n\n<div *ngFor="let extras of prod.menuExtrasSelected "> \n  <ion-row style="border-top: none;" *ngFor="let op of extras.optionNameSelected " >  \n<ion-col>\n<p> name: {{op.name}} </p>\n<p> price: ${{op.price}} </p>\n\n</ion-col>\n  </ion-row>\n \n</div>\n</div>\n<p  style="font-size:1.7rem;color:#42317e">Sub-Total: ${{prod.totalPrice}}   </p>\n  </ion-col>\n\n  <ion-col col-3 style="margin:auto;">\n<button ion-button small block (click)="RemoveItem(prod,extraSum[i])"> Remove </button>  \n  </ion-col>\n</ion-row>\n<button ion-button small block style="width:50%;margin-left:25%; margin-top:5%;" (click)="AddmoreItem()" > Add more </button>  \n</ion-card>\n\n<ion-card>  \n<ion-label color = "primary" style="font-size:1.3rem ; float:right;font-weight: bold;"> Total: ${{Total}} </ion-label>\n</ion-card>\n\n\n\n<button ion-button full block style="width:80%;margin-left:10%; margin-top:15%;" (click)="paymentPage()"  > Proceed to checkout </button>  \n\n\n</ion-content>-->'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/cart/cart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], CartPage);
    return CartPage;
}());

//# sourceMappingURL=cart.js.map

/***/ })

});
//# sourceMappingURL=47.js.map
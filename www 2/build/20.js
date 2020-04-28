webpackJsonp([20],{

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentPageModule", function() { return PaymentPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__payment__ = __webpack_require__(977);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PaymentPageModule = (function () {
    function PaymentPageModule() {
    }
    PaymentPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__payment__["a" /* PaymentPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__payment__["a" /* PaymentPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__payment__["a" /* PaymentPage */]
            ]
        })
    ], PaymentPageModule);
    return PaymentPageModule;
}());

//# sourceMappingURL=payment.module.js.map

/***/ }),

/***/ 977:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_stripe__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_server_server__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var PaymentPage = (function () {
    function PaymentPage(server, modalCtrl, nativeStorage, alertCtrl, loadingCtrl, globals, viewCtrl, app, formBuilder, stripe, http, navCtrl, navParams) {
        this.server = server;
        this.modalCtrl = modalCtrl;
        this.nativeStorage = nativeStorage;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.globals = globals;
        this.viewCtrl = viewCtrl;
        this.app = app;
        this.formBuilder = formBuilder;
        this.stripe = stripe;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.business_array = new Array();
        this.instruction = '';
        this.reward_amount = 0;
        this.storecreditExist = false;
        // data: any;
        this.cashpay = 0;
        this.paypal = true;
        this.creditcard = false;
        this.pay_on_venue = false;
        this.pickup = false;
        this.Schedule_deliver = false;
        this.Deliver = true;
        this.deliver_now = true;
        this.Tip = 0;
        this.gift_falg = false;
        this.instructions = { "Type": '', "BusinessDiscount": 0, "GainDiscount": 0, "StoreCredit": 0, "Tip": 0, "Points": 0, "Notes": '', "giftcard": '', "tax": 0 };
        this.month_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.cardinfo = {
            number: '',
            expMonth: '',
            expYear: '',
            cvc: ''
        };
        this.submitAttempt = false;
        this.calculated_tax = 0;
        this.cash_discount = 0;
        this.calculated_tax = this.navParams.get('tax');
        this.cashpay = this.navParams.get('amount');
        this.storevalue = this.navParams.get('StoreCredit');
        console.log("time", this.globals.estimated_time);
        this.estTime = this.globals.estimated_time;
        this.Deliver = navParams.get('deliver');
        this.pickup = navParams.get('pickup');
        this.orderType = this.globals.OrderType;
        console.log("deliver", this.Deliver, "pickup", this.pickup);
        console.log(this.globals.paypalId, "paypalId");
        this.RewardCreditAvailed = navParams.get('RewardAvailed');
        this.BirthdayCreditAvailed = navParams.get('BirthdayCreditavailed');
        this.Address = localStorage.getItem("GetAddress");
        console.log("checking address", this.Address);
        if (this.globals.cash_enabled) {
            this.cash_on_delivery = true;
        }
        else {
            this.creditcard = true;
        }
        this.Tip = navParams.get('tip');
        this.ProcessForm = formBuilder.group({
            Address: ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].required])],
        });
        this.Notes = navParams.get('notes');
        this.getAddress();
        this.date = new Date();
        this.datenow = this.date.getDate();
        this.month = this.date.getMonth() + 1;
        console.log(this.date, this.month);
        this.year = this.date.getFullYear();
        this.month = this.month.toString();
        this.day = this.date.getDay();
        this.datenow = this.datenow.toString();
        this.hours = this.date.getHours();
        this.min = this.date.getMinutes();
        console.log(this.hours, this.min);
        if (this.month.length == 1) {
            this.month = "0" + this.month;
        }
        if (this.datenow.length == 1) {
            this.datenow = "0" + this.datenow;
        }
        console.log("month", this.year, this.month, this.datenow);
        this.value = this.year + "-" + this.month + "-" + this.datenow;
        this.value.toString();
        if (this.Schedule_deliver == false && this.pickup == true) {
            var date = new Date();
            var date1 = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();
            console.log("offset", this.date.getTimezoneOffset);
            this.myDate = date1;
            //     console.log(new Date().toLocaleString('en-US', { hour12: false }));
            // var d = new Date().toLocaleString('en-US', { hour12: false });
            // this.myDate = new Date(d).toISOString();
            console.log("date", this.myDate);
        }
        console.log(this.value);
        this.amount = this.navParams.get('amount');
        this.amount = Number(this.amount);
        console.log("tip added ", this.amount);
        //this.Address = this.navParams.get('Address');
        console.log("adress", this.Address);
        this.order_date = localStorage.getItem("scheduled_time");
        console.log("order_date", this.order_date);
        this.PaymentForm = formBuilder.group({
            creditcardno: ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].minLength(15), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].maxLength(16), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].required])],
            expiryMonth: ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].required])],
            expiryYear: ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].required])],
            CVC: ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].required])],
            cardinfo: [false]
        });
        this.StorePoint = navParams.get('StoreAmount');
        this.instruction = navParams.get('instruction');
        console.log("nav param instruction", this.instructions);
        this.RewardCreditAvailed = navParams.get('RewardAvailed');
        this.BirthdayCreditAvailed = navParams.get('BirthdayCreditavailed');
        console.log(this.instruction, "global points", this.globals.points_availed);
        this.getCreditCard();
        this.gift_falg = this.navParams.get('gift_flag');
        this.gift_data = this.navParams.get('giftcard');
        this.process();
        if (this.gift_falg) {
            this.payment_on_delivery();
        }
    }
    PaymentPage.prototype.login_kiosk = function () {
        var modal = this.modalCtrl.create('LoginPage');
        modal.present();
    };
    PaymentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PaymentPage');
    };
    // changeaddress() {
    //     console.log("modal pickupsett",this.globals.pickupsetting);
    //     let modal = this.modalCtrl.create('ModalPage');
    //     modal.present();
    //   }
    // checkTiming() {
    //     if (this.Schedule_deliver == false) {
    //         if (this.globals.Timing) {
    //             let local_datetime = new Date().toLocaleString('en-US', { hour12: false });
    //             this.date = new Date(local_datetime);
    //             console.log("",this.date);
    //             this.day = this.date.getDay();
    //             this.time = this.date.getHours();
    //             this.minutes = this.date.getMinutes();
    //             this.time = this.time + "." + this.minutes;
    //             console.log("day", "hours", this.day, this.time);
    //             var current_day = this.globals.Timing[this.day];
    //             this.time = this.time.toString();
    //             console.log(this.time,"current day", current_day);
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
    //         console.log("userDate", this.myDate);
    //         var future_date = new Date(this.myDate);
    //         console.log(future_date);
    //         var future_day = future_date.getDay();
    //         this.myDate = this.myDate.toString();
    //         console.log(this.myDate);
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
    PaymentPage.prototype.paymentThroughPayOnVenue = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.PaymentThroughPayOnVenue(this.instructions, this.cashpay);
        response.subscribe(function (data) {
            _this.data = data;
            console.log(_this.data);
            loading.dismiss();
            if (_this.data.success) {
                _this.orderStatus = _this.data.success;
                var alert_1 = _this.alertCtrl.create({
                    title: 'Congratulation',
                    subTitle: 'Reservation order has been successfully placed.',
                    buttons: ['Okay']
                });
                alert_1.present();
                _this.navCtrl.popToRoot();
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Please try again',
                    buttons: ['OK']
                });
                alert_2.present();
            }
            // console.log(this.data.categories);
            console.log("data", _this.data);
        }, function (error) {
            console.log("Error!");
        });
    };
    PaymentPage.prototype.process = function () {
        // process(){
        // this.navCtrl.push('PaymentPage');
        this.Instruction();
        // if (this.checkTiming()) {
        // if(this.Schedule_deliver == false && this.pickup == false)
        // {
        //     this.myDate = "current";
        // }
        // if(this.pickup == true)
        // {
        //     this.myDate = 'current,coming in '+this.myDate
        //     console.log(this.myDate);
        // }
        if (this.globals.type == 'reservation' && this.creditcard == true) {
            // this.navCtrl.push('PaymentPage', { amount: Number(this.cashpay), Date:this.order_date, StoreAmount: this.storevalue, instruction: this.instructions });
        }
        if (this.globals.type == 'reservation' && this.pay_on_venue == true) {
            this.paymentThroughPayOnVenue();
        }
        else {
            //console.log(ProcessData, this.ProcessForm.valid, this.myDate);
            console.log("pay on venue ", this.pay_on_venue);
            if (this.orderType == "delivery") {
                this.submitAttempt = true;
                console.log(' Some values were not given or were incorrect, please fill them');
            }
            else {
                // if (ProcessData.addresscheck == true) {
                //     this.nativeStorage.setItem('address',
                //         {
                //             address: ProcessData.Address,
                //             zipcode: ProcessData.zipcode,
                //             city: ProcessData.city,
                //             state: ProcessData.state,
                //             check: ProcessData.addresscheck
                //         }).then(() => console.log('Stored item!'),
                //             error => console.error('Error storing item', error)
                //         );
                // }
                if (this.creditcard == true) {
                    // this.RedeemUserPoints();
                    console.log("cheching addresss", localStorage.getItem("GetAddress"));
                    //this.navCtrl.push('PaymentPage', { Address:this.Address , amount: Number(this.cashpay), Date: localStorage.getItem("scheduled_time"), StoreAmount: this.storevalue, instruction: this.instructions });
                }
                else {
                    // if(this.Schedule_deliver == false)
                    // {
                    //     this.myDate = "current";
                    // }
                    this.OrderStatus(this.Address);
                }
            }
        }
    };
    // }
    PaymentPage.prototype.ConfirmOrder = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        if (this.globals.GainDiscountFlag == true) {
            this.globals.GainDiscount = 0;
            this.setDiscount();
        }
        console.log(this.orderStatus, "orderstatus");
        var response;
        if (this.globals.type == 'reservation') {
            response = this.server.OrderConfirmationThroughPaypalReservation(this.orderStatus, this.orderId);
        }
        else {
            response = this.server.OrderConfirmationThroughPaypal(this.orderStatus, this.orderId);
        }
        response.subscribe(function (data) {
            _this.data = data;
            loading.dismiss();
            console.log(_this.data);
            if (_this.data.success) {
                _this.setArray();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                if (_this.globals.BusinessDiscount > 0 && _this.globals.availed_discount_count < _this.globals.business_discount_count) {
                    _this.userBusinessDiscountUpdate();
                }
                // let alert = this.alertCtrl.create({
                //     title: 'Congratulation',
                //     subTitle: 'Your order has been sucessfully placed.',
                //     buttons: ['Okay']
                // });
                // alert.present();
                _this.thankyou();
            }
            else {
                var alert_3 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Oops,something went wrong.please contact our Business',
                    buttons: ['Okay']
                });
                alert_3.present();
            }
        }, function (error) {
            console.log("Error!");
        });
    };
    PaymentPage.prototype.OrderStatus = function (Address) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response;
        if (this.globals.type == 'reservation') {
            response = this.server.OrderStatusThroughPaypalReservation(this.instructions, this.cashpay);
        }
        else {
            console.log("oder status function ", this.instructions);
            response = this.server.OrderStatusThroughPaypal(this.Address, this.instructions, this.myDate, this.cashpay);
        }
        response.subscribe(function (data) {
            _this.data = data;
            console.log(_this.data);
            loading.dismiss();
            if (_this.data.success) {
                _this.orderStatus = _this.data.success;
                _this.orderId = _this.data.orderId;
                console.log(_this.orderId);
                //this.Paypal(this.data.orderId)
            }
            else {
                var alert_4 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Please try again',
                    buttons: ['OK']
                });
                alert_4.present();
            }
            // console.log(this.data.categories);
            console.log("data", _this.data);
        }, function (error) {
            console.log("Error!");
        });
    };
    // Paypal(id) {
    //     console.log("id", id);
    //     this.globals.OrderId = id;
    //     if (this.globals.paypalId == '') {
    //         let alert = this.alertCtrl.create({
    //             title: 'Oops',
    //             subTitle: 'Payments not available,please try again',
    //             buttons: ['OK']
    //         });
    //         alert.present();
    //     }
    //     else {
    //         this.payPal.init({
    //             PayPalEnvironmentProduction: '',
    //             PayPalEnvironmentSandbox: this.globals.paypalId
    //         }).then(() => {
    //             // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    //             this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
    //                 // Only needed if you get an "Internal Service Error" after PayPal login!
    //                 //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    //             })).then(() => {
    //                 let payment = new PayPalPayment(this.cashpay.toString(), 'USD', 'Order no:' + id.toString(), 'sale');
    //                 this.payPal.renderSinglePaymentUI(payment).then((data) => {
    //                     // Successfully paid
    //                     console.log(data);
    //                     // Example sandbox response
    //                     //
    //                     this.payapalresponse = data;
    //                     console.log(this.payapalresponse);
    //                     console.log(this.payapalresponse.response.state);
    //                     if (this.payapalresponse.response.state == 'approved') {
    //                         this.ConfirmOrder();
    //                         if (this.RewardCreditAvailed > 0) {
    //                             this.RadeemStoreCredit(false);
    //                         }
    //                         if (this.BirthdayCreditAvailed > 0) {
    //                             this.RadeemStoreCredit(true);
    //                         }
    //                         if (this.globals.points_availed > 0) {
    //                             let points = this.RedeemUserPoints();
    //                         }
    //                         //this.FirstimeFlag();
    //                     }
    //                     else {
    //                         let alert = this.alertCtrl.create({
    //                             title: 'Error',
    //                             subTitle: 'Please Try again',
    //                             buttons: ['OK']
    //                         });
    //                         alert.present();
    //                     }
    //                     // {
    //                     //   "client": {
    //                     //     "environment": "sandbox",
    //                     //     "product_name": "PayPal iOS SDK",
    //                     //     "paypal_sdk_version": "2.16.0",
    //                     //     "platform": "iOS"
    //                     //   },
    //                     //   "response_type": "payment",
    //                     //   "response": {
    //                     //     "id": "PAY-1AB23456CD789012EF34GHIJ",
    //                     //     "state": "approved",
    //                     //     "create_time": "2016-10-03T13:33:33Z",
    //                     //     "intent": "sale"
    //                     //   }
    //                     // }
    //                 }, () => {
    //                     // Error or render dialog closed without being successful
    //                 });
    //             }, () => {
    //                 // Error in configuration
    //             });
    //         }, () => {
    //             // Error in initialization, maybe PayPal isn't supported or something else
    //         });
    //     }
    // }
    PaymentPage.prototype.Instruction = function () {
        console.log("bussines disscount flag", this.globals.BusinessDiscountFlag);
        console.log("instruction type checking");
        this.instructions.tax = this.calculated_tax;
        if (this.orderType == 'delivery') {
            this.instructions.Type = 'Delivery';
        }
        if (this.orderType == 'pickup') {
            console.log("pickup hello");
            this.instructions.Type = 'Pickup';
        }
        if (this.globals.BusinessDiscountFlag == true) {
            this.instructions.BusinessDiscount = Number(this.globals.BusinessDiscount);
        }
        if (this.globals.GainDiscountFlag == true) {
            this.instructions.GainDiscount = Number(this.globals.GainDiscount);
        }
        if (this.Tip > 0) {
            this.instructions.Tip = Number(this.Tip);
        }
        if (this.Notes) {
            this.instructions.Notes = this.Notes;
        }
        if (Number(this.RewardCreditAvailed) > 0) {
            this.instructions.StoreCredit = Number(this.RewardCreditAvailed);
        }
        if (Number(this.BirthdayCreditAvailed) > 0) {
            this.instructions.StoreCredit = Number(this.BirthdayCreditAvailed);
        }
        if (this.globals.points_availed > 0) {
            this.instructions.Points = Number(this.globals.points_availed);
        }
        console.log(this.gift_data, "ko");
        if (this.gift_data && this.gift_data.length > 0) {
            this.instructions.giftcard = this.gift_data;
        }
        console.log(this.instructions);
    };
    PaymentPage.prototype.RadeemStoreCredit = function (flag) {
        var response = this.server.LotteryRedeeem(this.StorePoint, flag);
        response.subscribe(function (data) {
            var response = data.json();
            console.log(response);
        }, function (error) { console.log(error); });
    };
    PaymentPage.prototype.payment_type = function (PaymentData) {
        if (!this.globals.udid) {
            this.globals.udid = this.globals.caos_udid;
        }
        console.log("make payment button  instruction key", this.instructions);
        if (this.globals.type == 'reservation') {
            this.pay_reservation(PaymentData);
        }
        else {
            //this.process();
            this.pay(PaymentData);
        }
    };
    PaymentPage.prototype.cash_discount_confirmation = function (type, payment_data) {
        var _this = this;
        if (this.globals.cash_discount_enabled && type != 'cash' && !this.cash_discount) {
            var discount_ = ((Number(this.globals.cash_discount_percentage) / 100) * Number(this.amount)).toFixed(2);
            discount_ = (Number(discount_) + Number(this.globals.cash_discount_value));
            var alert_5 = this.alertCtrl.create({
                title: 'Please Note',
                message: ' Your total amount will be $' + (Number(this.amount) + Number(discount_)).toFixed(2) + ' as of convenience charge.',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'OK',
                        handler: function () {
                            _this.cash_discount = discount_;
                            _this.amount = (Number(_this.amount) + Number(discount_)).toFixed(2);
                            if (type == 'cash') {
                                _this.payment_on_delivery();
                            }
                            else {
                                _this.payment_type(payment_data);
                            }
                        }
                    }
                ]
            });
            alert_5.present();
        }
        else {
            if (type == 'cash') {
                this.payment_on_delivery();
            }
            else {
                this.payment_type(payment_data);
            }
        }
    };
    PaymentPage.prototype.pay_reservation = function (PaymentData) {
        var _this = this;
        var a = btoa(PaymentData.creditcardno);
        console.log("encode", a);
        console.log("decode", atob(a));
        console.log(PaymentData.creditcardno);
        if (!this.PaymentForm.valid) {
            this.submitAttempt = true;
            console.log(' Some values were not given or were incorrect, please fill them');
        }
        else {
            console.log("paymentcard", PaymentData.cardinfo);
            if (PaymentData.cardinfo == true) {
                this.nativeStorage.setItem('card', {
                    cardno: btoa(PaymentData.creditcardno),
                    exmonth: btoa(PaymentData.expiryMonth),
                    exyear: btoa(PaymentData.expiryYear),
                    cvc: btoa(PaymentData.CVC),
                    check: btoa(PaymentData.cardinfo)
                }).then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
            }
            this.cardinfo = {
                number: PaymentData.creditcardno,
                expMonth: PaymentData.expiryMonth,
                expYear: PaymentData.expiryYear,
                cvc: PaymentData.CVC
            };
            console.log(this.cardinfo);
            var loading_1 = this.loadingCtrl.create({
                content: "Loading...",
            });
            loading_1.present();
            if (this.globals.StripId == '') {
                loading_1.dismiss();
                var alert_6 = this.alertCtrl.create({
                    title: 'Oops',
                    subTitle: 'Payments not available,please try again',
                    buttons: ['OK']
                });
                alert_6.present();
            }
            else {
                console.log(this.order_date);
                this.stripe.setPublishableKey(this.globals.StripId);
                this.stripe.createCardToken(this.cardinfo).then(function (Token) {
                    console.log("final-token", Token);
                    console.log("final-token", Token);
                    // var data = 'stripetoken=' + token + '&amount=50';
                    if (_this.globals.GainDiscountFlag == true) {
                        _this.globals.GainDiscount = 0;
                        _this.setDiscount();
                    }
                    var status;
                    if (_this.globals.admin_stripe == 'true') {
                        status = 'Gain';
                    }
                    else {
                        status = 'Stripe';
                    }
                    var response = _this.server.PaymentThroughStripeReservation(_this.instructions, _this.amount, Token);
                    console.log("response without json", response);
                    response.subscribe(function (data) {
                        console.log("data without json", data);
                        _this.data = data;
                        loading_1.dismiss();
                        // console.log(this.data.categories);
                        console.log("data", _this.data);
                        if (_this.data.success) {
                            var alert_7 = _this.alertCtrl.create({
                                title: 'Congratulation',
                                subTitle: _this.data.message,
                                buttons: ['OK']
                            });
                            alert_7.present();
                            // this.thankyou();
                            _this.setArray();
                            if (_this.RewardCreditAvailed > 0) {
                                console.log(" lottery availed");
                                _this.RadeemStoreCredit(false);
                            }
                            if (_this.BirthdayCreditAvailed > 0) {
                                console.log("birthday availed");
                                _this.RadeemStoreCredit(true);
                            }
                            if (_this.globals.points_availed > 0) {
                                console.log("points availed");
                                _this.RedeemUserPoints();
                            }
                            _this.navCtrl.popToRoot();
                        }
                        else {
                            var alert_error = _this.alertCtrl.create({
                                title: 'Error',
                                subTitle: _this.data.message,
                                buttons: ['OK']
                            });
                            alert_error.present();
                        }
                    }, function (error) {
                        console.log("Error!");
                        console.log("this is our error", error);
                    });
                });
            }
        }
    };
    PaymentPage.prototype.pay = function (PaymentData) {
        var _this = this;
        var a = btoa(PaymentData.creditcardno);
        console.log("encode", a);
        console.log("decode", atob(a));
        console.log(PaymentData.creditcardno);
        if (!this.PaymentForm.valid) {
            this.submitAttempt = true;
            this.globals.presentToast(' Some values were not given or were incorrect, please fill them');
        }
        else {
            console.log("paymentcard", PaymentData.cardinfo);
            if (PaymentData.cardinfo == true) {
                this.nativeStorage.setItem('card', {
                    cardno: btoa(PaymentData.creditcardno),
                    exmonth: btoa(PaymentData.expiryMonth),
                    exyear: btoa(PaymentData.expiryYear),
                    cvc: btoa(PaymentData.CVC),
                    check: btoa(PaymentData.cardinfo)
                }).then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
            }
            this.cardinfo = {
                number: PaymentData.creditcardno,
                expMonth: PaymentData.expiryMonth,
                expYear: PaymentData.expiryYear,
                cvc: PaymentData.CVC
            };
            console.log(this.cardinfo);
            var loading_2 = this.loadingCtrl.create({
                content: "Loading...",
            });
            loading_2.present();
            console.log(this.globals.authorize_enabled, this.globals.admin_stripe_enabled, "p");
            if (this.globals.authorize_enabled) {
                if (this.globals.GainDiscountFlag == true) {
                    this.globals.GainDiscount = 0;
                    this.setDiscount();
                }
                var status;
                status = 'Authorize';
                console.log(" pass instrunctions in strip function", this.instructions);
                if (this.globals.OrderType == "pickup") {
                    this.Address = '';
                }
                var response = this.server.PaymentThroughStripe(this.Address, this.instructions, this.amount, this.order_date, '', status, this.cash_discount, this.cardinfo);
                response.subscribe(function (data) {
                    _this.data = data;
                    loading_2.dismiss();
                    // console.log(this.data.categories);
                    console.log("data", _this.data);
                    if (_this.data.success) {
                        //localStorage.removeItem("GetAddress");
                        localStorage.removeItem("scheduled_time");
                        _this.setArray();
                        if (_this.RewardCreditAvailed > 0) {
                            console.log("lottery availed");
                            _this.RadeemStoreCredit(false);
                        }
                        if (_this.BirthdayCreditAvailed > 0) {
                            console.log("birthday availed");
                            _this.RadeemStoreCredit(true);
                        }
                        if (_this.globals.points_availed > 0) {
                            console.log("point availed");
                            _this.RedeemUserPoints();
                        }
                        if (_this.globals.BusinessDiscount > 0 && _this.globals.availed_discount_count < _this.globals.business_discount_count) {
                            _this.userBusinessDiscountUpdate();
                        }
                        _this.thankyou();
                    }
                    else {
                        _this.globals.presentToast(_this.data.message);
                    }
                }, function (error) {
                    console.log("Error!");
                    console.log("this is our error", error);
                });
            }
            else {
                if (this.globals.StripId == '') {
                    loading_2.dismiss();
                    var alert_8 = this.alertCtrl.create({
                        title: 'Oops',
                        subTitle: 'Payments not available,please try again',
                        buttons: ['OK']
                    });
                    alert_8.present();
                }
                else {
                    this.stripe.setPublishableKey(this.globals.StripId);
                    this.stripe.createCardToken(this.cardinfo).then(function (Token) {
                        // var data = 'stripetoken=' + token + '&amount=50';
                        if (_this.globals.GainDiscountFlag == true) {
                            _this.globals.GainDiscount = 0;
                            _this.setDiscount();
                        }
                        var status;
                        status = 'Stripe';
                        console.log(" pass instrunctions in strip function", _this.instructions);
                        if (_this.globals.OrderType == "pickup") {
                            _this.Address = '';
                        }
                        var response = _this.server.PaymentThroughStripe(_this.Address, _this.instructions, _this.amount, _this.order_date, Token, status, _this.cash_discount);
                        console.log("response without json", response);
                        response.subscribe(function (data) {
                            console.log("data without json", data);
                            _this.data = data;
                            loading_2.dismiss();
                            // console.log(this.data.categories);
                            console.log("data", _this.data);
                            if (_this.data.success) {
                                //localStorage.removeItem("GetAddress");
                                localStorage.removeItem("scheduled_time");
                                _this.setArray();
                                if (_this.RewardCreditAvailed > 0) {
                                    console.log("lottery availed");
                                    _this.RadeemStoreCredit(false);
                                }
                                if (_this.BirthdayCreditAvailed > 0) {
                                    console.log("birthday availed");
                                    _this.RadeemStoreCredit(true);
                                }
                                if (_this.globals.points_availed > 0) {
                                    console.log("point availed");
                                    _this.RedeemUserPoints();
                                }
                                if (_this.globals.BusinessDiscount > 0 && _this.globals.availed_discount_count < _this.globals.business_discount_count) {
                                    _this.userBusinessDiscountUpdate();
                                }
                                _this.thankyou();
                                //this.FirstimeFlag();
                            }
                            else {
                                var alert_error = _this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: _this.data.message,
                                    buttons: [
                                        {
                                            text: 'Okay',
                                            handler: function (data) {
                                            }
                                        }
                                    ]
                                });
                                alert_error.present();
                            }
                        }, function (error) {
                            console.log("Error!");
                            console.log("this is our error", error);
                        });
                    }).catch(function (data) {
                        loading_2.dismiss();
                        var alert = _this.alertCtrl.create({
                            title: 'Oops',
                            subTitle: 'Invalid Credentials,please try again',
                            buttons: ['OK']
                        });
                        alert.present();
                    });
                }
            }
        }
    };
    PaymentPage.prototype.DeliveryConfirm = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Payment',
            message: 'Do you want to Pay on Delivey?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function () {
                        _this.payment_on_delivery();
                    }
                }
            ]
        });
        alert.present();
    };
    PaymentPage.prototype.creditBox = function () {
        this.cash_on_delivery = false;
        this.paypal = false;
    };
    PaymentPage.prototype.deliveryBox = function () {
        this.creditcard = false;
        this.paypal = false;
    };
    PaymentPage.prototype.paypalbox = function () {
        this.creditcard = false;
        this.cash_on_delivery = false;
    };
    PaymentPage.prototype.payment_on_delivery = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        if (!this.globals.udid) {
            this.globals.udid = this.globals.caos_udid;
        }
        // var data = 'stripetoken=' + token + '&amount=50';
        if (this.globals.GainDiscountFlag == true) {
            this.globals.GainDiscount = 0;
            this.setDiscount();
        }
        var status = 'cash';
        console.log(" pass instrunctions in strip function", this.instructions);
        if (this.globals.OrderType == "pickup") {
            this.Address = '';
        }
        var response = this.server.PaymentOnDelivery(this.Address, this.instructions, this.amount, this.order_date, '', status);
        response.subscribe(function (data) {
            console.log("data without json", data);
            _this.data = data;
            loading.dismiss();
            if (_this.data.success) {
                //localStorage.removeItem("GetAddress");
                localStorage.removeItem("scheduled_time");
                // let alert = this.alertCtrl.create({
                //     title: 'Congratulation',
                //     subTitle: this.data.message,
                //     buttons: ['OK']
                // });
                // alert.present();
                _this.setArray();
                if (_this.RewardCreditAvailed > 0) {
                    console.log("lottery availed");
                    _this.RadeemStoreCredit(false);
                }
                if (_this.BirthdayCreditAvailed > 0) {
                    console.log("birthday availed");
                    _this.RadeemStoreCredit(true);
                }
                if (_this.globals.points_availed > 0) {
                    console.log("point availed");
                    _this.RedeemUserPoints();
                }
                if (_this.globals.BusinessDiscount > 0 && _this.globals.availed_discount_count < _this.globals.business_discount_count) {
                    _this.userBusinessDiscountUpdate();
                }
                _this.thankyou();
                //this.FirstimeFlag();
            }
            else {
                var alert_error = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: _this.data.message,
                    buttons: [
                        {
                            text: 'Okay',
                            handler: function (data) {
                            }
                        }
                    ]
                });
                alert_error.present();
            }
        }, function (error) {
            console.log("Error!");
            console.log("this is our error", error);
        });
    };
    PaymentPage.prototype.userBusinessDiscountUpdate = function () {
        this.globals.availed_discount_count++;
        var response = this.server.userBusinessAvailedDiscount();
        response.subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    PaymentPage.prototype.FirstimeFlag = function () {
        var _this = this;
        this.nativeStorage.getItem('BusinessFirstimeFlag')
            .then(function (data) {
            _this.business_array = data.array;
            console.log(data.array);
            if (data.array.indexOf(_this.globals.username) == -1) {
                _this.business_array.push(_this.globals.username);
                _this.nativeStorage.setItem('BusinessFirstimeFlag', {
                    array: _this.business_array
                }).then(function () {
                    var modal = _this.modalCtrl.create('AddReviewPage', { place: _this.globals.business_username });
                    modal.present();
                })
                    .catch(function (err) { console.log("nativesstorage", err); });
            }
        }, function (error) {
            //we don't have the user data 
            console.log("no data");
            _this.business_array.push(_this.globals.username);
            _this.nativeStorage.setItem('BusinessFirstimeFlag', {
                array: _this.business_array
            }).then(function () {
                var modal = _this.modalCtrl.create('AddReviewPage', { place: _this.globals.business_username });
                modal.present();
            })
                .catch(function (err) { console.log("nativesstorage", err); });
        }).catch(function (err) { console.log(err); });
    };
    PaymentPage.prototype.RedeemUserPoints = function () {
        var _this = this;
        var res = this.server.RedeemUserPoints()
            .subscribe(function (data) {
            console.log(data);
            if (data.status != 'true') {
                return false;
            }
            else {
                _this.globals.points_availed = 0;
                return true;
            }
        }, function (error) {
            console.log(error);
        });
    };
    PaymentPage.prototype.setDiscount = function () {
        this.nativeStorage.setItem('discount', { discountValue: this.globals.GainDiscount })
            .then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
    };
    PaymentPage.prototype.setArray = function () {
        this.globals.Product.length = 0;
        this.globals.order_time = 'now';
        this.globals.myDate = undefined;
        localStorage.setItem("scheduled_time", undefined);
        this.nativeStorage.setItem('Product', { array: this.globals.Product })
            .then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
    };
    PaymentPage.prototype.Savecreditcard = function () {
        console.log(this.PaymentForm.value.cardinfo);
    };
    PaymentPage.prototype.thankyou = function () {
        // let modal = this.modalCtrl.create('ThankyouPage');
        // modal.present();
        this.globals.bussinessId = this.globals.new_id;
        this.globals.username = this.globals.business_username;
        this.navCtrl.push('ThankyouPage');
    };
    PaymentPage.prototype.getCreditCard = function () {
        var _this = this;
        this.nativeStorage.getItem('card')
            .then(function (data) {
            _this.PaymentForm.get('creditcardno').setValue(atob(data.cardno));
            _this.PaymentForm.get('expiryMonth').setValue(atob(data.exmonth));
            _this.PaymentForm.get('expiryYear').setValue(atob(data.exyear));
            _this.PaymentForm.get('CVC').setValue(atob(data.cvc));
            _this.PaymentForm.get('cardinfo').setValue(atob(data.check));
        }).catch(function (err) { return console.log; });
    };
    PaymentPage.prototype.cancel = function () {
        this.navCtrl.popToRoot();
    };
    PaymentPage.prototype.getAddress = function () {
        // this.nativeStorage.getItem('address')
        //     .then(data => {
        //         this.ProcessForm.get('Address').setValue(data.address);
        //         this.ProcessForm.get('zipcode').setValue(data.zipcode);
        //         this.ProcessForm.get('city').setValue(data.city);
        //         this.ProcessForm.get('state').setValue(data.state);
        //         this.ProcessForm.get('addresscheck').setValue(data.check);
        //     }).catch(err => console.log);
        this.Address;
    };
    PaymentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-payment',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/payment/payment.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Payment</ion-title>\n    <ion-buttons end *ngIf="!this.globals.udid">\n      <button ion-button icon-only color="royal" (click)="login_kiosk()">\n        Login\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="Open-Sans-regular" overflow-scroll=true>\n  <div>\n\n    <ion-list style="padding-top:3px; padding-right:10px; padding-left:10px;  margin-bottom: 0;">\n      <!-- <ion-list-header style="padding-top:3px;color:#333;font-weight:bold">\n          Payment Method\n        </ion-list-header> -->\n     \n      <ion-item style="background: transparent;color: #aaa" *ngIf="globals.card_enabled && amount > 0">\n        <ion-label>Credit card</ion-label>\n        <ion-checkbox [(ngModel)]="creditcard" (click)="creditBox()"></ion-checkbox>\n      </ion-item>\n\n      <ion-item style="background: transparent;color: #aaa"\n        *ngIf="globals.cash_enabled && globals.OrderType == \'delivery\'">\n        <ion-label>Cash on delivery</ion-label>\n        <ion-checkbox [(ngModel)]="cash_on_delivery" (click)="deliveryBox()"></ion-checkbox>\n      </ion-item>\n      <ion-item style="background: transparent;color: #aaa"\n        *ngIf="globals.cash_enabled && globals.OrderType == \'pickup\'">\n        <ion-label>Pay at store</ion-label>\n        <ion-checkbox [(ngModel)]="cash_on_delivery" (click)="deliveryBox()"></ion-checkbox>\n      </ion-item>\n      <p class="kkkj" *ngIf="globals.cash_enabled && globals.OrderType == \'pickup\' && amount > 0">You can pay by cash,\n        debit card or credit card at the store</p>\n\n\n    </ion-list>\n\n    <!-- <p class="Open-Sans-regular" style="font-family: Open Sans;" *ngIf="submitAttempt" style="color: #ea6153; text-align:center;">Please fill out all details accurately.</p> -->\n\n\n    <!-- <ion-list no-lines style="padding: 10px;  margin-bottom: 0 ; padding-left:0;padding-right:0">\n        <div style="text-align:center">\n          <div style="display: inline-block; width: 40%;"> -->\n    <!-- <ion-item  *ngIf="Deliver == false" style="border-radius: 20px;">\n        <ion-label>Now</ion-label>\n       <ion-checkbox  disabled = "true" [(ngModel)]="deliver_now" (ionChange) = "delivernowbox()"   ></ion-checkbox>\n       </ion-item> -->\n    <!-- <div *ngIf="globals.type != \'reservation\'"> -->\n    <!-- <ion-item style="border-radius: 20px;">\n              <ion-label>Now</ion-label>\n              <ion-checkbox [(ngModel)]="deliver_now" (ionChange)="delivernowbox()"></ion-checkbox>\n            </ion-item>\n          </div>\n          <div style="display: inline-block;  width: 10%;  font-size: 2rem; text-align: center;">\n            <ion-label style="margin:0">OR</ion-label>\n          </div>\n          <div style="display: inline-block; width: 40%;">\n            <ion-item style="border-radius: 20px;">\n              <ion-label>Schedule</ion-label>\n              <ion-checkbox [(ngModel)]="Schedule_deliver" (ionChange)="scheduleDeliverbox()"></ion-checkbox>\n    \n            </ion-item> -->\n    <!-- </div> -->\n\n    <!-- <ion-item  *ngIf="Deliver == false"  style="border-radius: 20px;">\n        <ion-label>Schedule</ion-label>\n      <ion-checkbox    disabled = "true"  [(ngModel)]="Schedule_deliver" (ionChange) = "scheduleDeliverbox()" ></ion-checkbox>\n        </ion-item>\n       -->\n    <!-- </div>\n    \n        </div>\n      </ion-list> -->\n\n    <form [formGroup]="PaymentForm" ng-submit="pay(this.PaymentForm.value)">\n      <div *ngIf="!cash_on_delivery && globals.card_enabled && amount > 0">\n        <ion-list style="padding: 10px; padding-bottom:0px;margin-bottom: 3px;">\n          <!-- <p class="Open-Sans-regular" style="font-family: Open Sans;" *ngIf="submitAttempt" style="color: #ea6153; margin-top:0px;margin-bottom:3px;text-align:center;">Please fill out all details accurately.</p> -->\n          <ion-card class="payment_card background_image1" style="padding-top: 26px;">\n            <ion-item class="cardno">\n              <!-- <ion-label floating></ion-label> -->\n              <ion-input style="color: #fff" placeholder="Card No." class="kll" formControlName="creditcardno"\n                type="password" maxlength="16"></ion-input>\n            </ion-item>\n\n            <ion-row style="margin-top: 18px">\n              <ion-col col-6 no-padding>\n                <h3 class="name_heading">Name</h3>\n                <h2 style="margin-left: 22px;color: #fff;padding-top: 17px;">{{globals.firstName}} {{globals.lastName}}\n                </h2>\n\n              </ion-col>\n              <ion-col col-3 no-padding>\n                <h3 class="exp-date">Exp. Date</h3>\n                <!-- <ion-item style="background: transparent">\n                    <ion-label floating>Name </ion-label>\n                    <ion-input placeholder="Name"  type="text"></ion-input>\n                  </ion-item> -->\n                <ion-item style="background: transparent;border:0px" no-padding>\n                  <ion-input style="color: #fff;" placeholder="mm" class="kll" formControlName="expiryMonth"\n                    type="number"></ion-input>\n                </ion-item>\n              </ion-col>\n              <ion-col col-3 no-padding>\n                <ion-item style="background: transparent;border:0px;margin-top: 19px;" no-padding>\n                  <ion-input style="color: #fff;" placeholder="yyyy" class="kll" formControlName="expiryYear"\n                    type="number"></ion-input>\n                </ion-item>\n\n\n              </ion-col>\n            </ion-row>\n\n          </ion-card>\n          <ion-card class="payment_card background_image2">\n            <ion-item style="background: transparent;border:0px;margin-top: 40px">\n\n              <ion-label style="color: #333">CVV</ion-label>\n\n              <ion-input class="klll" formControlName="CVC" type="number"></ion-input>\n            </ion-item>\n            <img src="assets/imgs/visaa.png" style="width: 80%;">\n            <!-- <div style=" float: right;margin-top: -14%;">\n              <img src="assets/imgs/cvv.jpg" style="width: 90px;">\n            </div> -->\n\n          </ion-card>\n\n          <div class="no-border" *ngIf="!PaymentForm.controls.creditcardno.valid">\n            <!-- <p style="color: #ea6153;text-align:center; margin-top:0px;margin-bottom:3px;">Please enter a valid card number.</p> -->\n          </div>\n\n\n          <!-- <ion-item style="background: transparent">\n        <ion-label floating>Expiration Year(xxxx)</ion-label>\n      </ion-item> -->\n\n        </ion-list>\n\n        <ion-list *ngIf="!globals.coas_flag" no-lines\n          style="padding:5px ; margin-top:0px; padding-top: 0px;padding-bottom:0px;margin-bottom:0px;">\n          <ion-item style="background: transparent">\n            <ion-label>Save Credit Card Information</ion-label>\n            <ion-checkbox formControlName="cardinfo" (ionChange)="Savecreditcard()"></ion-checkbox>\n          </ion-item>\n          <!-- <ion-row style="margin-top: 0px; padding-top: 0px; margin-bottom: 0px;\n      padding-bottom:0px;">\n    \n        <ion-col style="margin:auto">\n          <img src="assets/imgs/mastercard.png">\n        </ion-col>\n        <ion-col style="margin:auto">\n    \n          <img src="assets/imgs/discover-card.png">\n    \n        </ion-col>\n        <ion-col style="margin:auto">\n    \n          <img src="assets/imgs/american-express-logo.jpg">\n        </ion-col>\n        <ion-col style="margin:auto">\n          <img src="assets/imgs/visa.png">\n        </ion-col>\n    \n      </ion-row> -->\n          <!--      \n      <button ion-button type="submit" clear (click)="changeaddress()" style="margin-top:2%;width:95%; margin-left:2.5%;"\n      block>Change Address </button> -->\n\n        </ion-list>\n\n\n\n      </div>\n\n\n      <ion-label\n        style="font-size:2.5rem; color:rgb(102, 102, 102);; padding:10px; margin-left: 8px; margin-right: 4px;margin-bottom: 3px;margin-top: 3px;"\n        [ngStyle]="{ \'margin-top\' : (cash_on_delivery == true) ? \'30%\' : \'0%\' }">\n        Total\n        <p style="float:right;font-size:2.5rem;color:rgb(102, 102, 102);margin-top: 0px;"> ${{amount}}</p>\n      </ion-label>\n\n      <ion-row style="margin-bottom: 22% !important;">\n        <ion-col col-6>\n          <button ion-button outline (click)="cancel()" round style="color:#c0392b !important;" color=\'danger\' block\n            block>Cancel</button>\n\n        </ion-col>\n        <ion-col col-6>\n          <button ion-button type="submit" color=\'jack\' round *ngIf="!cash_on_delivery && amount > 0"\n            (click)="cash_discount_confirmation(\'credit\',this.PaymentForm.value)" block>Make Payment</button>\n          <button ion-button type="submit" color=\'jack\' round *ngIf="cash_on_delivery || amount == 0"\n            (click)="cash_discount_confirmation(\'cash\')" block>Submit</button>\n\n        </ion-col>\n\n      </ion-row>\n\n      <!-- <ion-label style="font-size:2.5rem;font-weight: bold; color:white;m.value)" style="margin-top: 5%;width:95%; margin-left:2.5%;"\n      block>Make Payment </button> -->\n    </form>\n\n  </div>\n\n\n</ion-content>\n\n\n<!--<ion-content>\n <ion-label floating>Card Number</ion-label>\n<ion-input [(ngModel)]="cardinfo.number" placeholder="card number"></ion-input>\n <ion-label floating>Expiry Month</ion-label> padding:10px; background:#333; margin-left: 8px;">\n    Total\n      <p style="float:right;font-size:2.5rem;color:white;margin:0"> ${{amount}}</p>\n    </ion-label>\n\n\n    <button ion-button type="submit" (click)="payment_type(this.PaymentFor\n<ion-input [(ngModel)]="cardinfo.expMonth" placeholder="expiry month"></ion-input>\n <ion-label floating>Expiry Year</ion-label>\n<ion-input [(ngModel)]="cardinfo.expYear" placeholder="expiry year"></ion-input>\n <ion-label floating>CVC</ion-label>\n<ion-input [(ngModel)]="cardinfo.cvc" placeholder="cvc"></ion-input>\n<button ion-button (click)="pay()"> Pay Now </button>-->'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/payment/payment.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_6__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_2__ionic_native_stripe__["a" /* Stripe */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], PaymentPage);
    return PaymentPage;
}());

//# sourceMappingURL=payment.js.map

/***/ })

});
//# sourceMappingURL=20.js.map
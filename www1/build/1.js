webpackJsonp([1],{

/***/ 772:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckoutProcessPageModule", function() { return CheckoutProcessPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkout_process__ = __webpack_require__(975);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CheckoutProcessPageModule = (function () {
    function CheckoutProcessPageModule() {
    }
    CheckoutProcessPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__checkout_process__["a" /* CheckoutProcessPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__checkout_process__["a" /* CheckoutProcessPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__checkout_process__["a" /* CheckoutProcessPage */]
            ]
        })
    ], CheckoutProcessPageModule);
    return CheckoutProcessPageModule;
}());

//# sourceMappingURL=checkout-process.module.js.map

/***/ }),

/***/ 975:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutProcessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_paypal__ = __webpack_require__(976);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(49);
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









/**
* Generated class for the CheckoutProcessPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
var CheckoutProcessPage = (function () {
    function CheckoutProcessPage(modalCtrl, server, nativeStorage, alertCtrl, loadingCtrl, http, globals, payPal, formBuilder, navCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.server = server;
        this.nativeStorage = nativeStorage;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.globals = globals;
        this.payPal = payPal;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.business_array = new Array();
        this.reward_amount = 0;
        this.storecreditExist = false;
        this.cashpay = 0;
        this.submitAttempt = false;
        this.paypal = true;
        this.creditcard = false;
        this.pay_on_venue = false;
        this.pickup = false;
        this.Schedule_deliver = false;
        this.Deliver = true;
        this.deliver_now = true;
        this.Tip = 0;
        this.instructions = { "Type": '', "BusinessDiscount": 0, "GainDiscount": 0, "StoreCredit": 0, "Tip": 0, "Points": 0, "Notes": '' };
        this.month_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.cashpay = this.navParams.get('amount');
        this.storevalue = this.navParams.get('StoreCredit');
        console.log("time", this.globals.estimated_time);
        this.estTime = this.globals.estimated_time;
        this.Deliver = navParams.get('deliver');
        this.pickup = navParams.get('pickup');
        console.log("deliver", this.Deliver, "pickup", this.pickup);
        console.log(this.globals.paypalId, "paypalId");
        this.RewardCreditAvailed = navParams.get('RewardAvailed');
        this.BirthdayCreditAvailed = navParams.get('BirthdayCreditavailed');
        if (!this.globals.paypalId) {
            this.creditcard = true;
        }
        if (this.globals.type == 'reservation') {
            this.pay_on_venue = true;
            this.creditcard = false;
            this.paypal = false;
        }
        this.Tip = navParams.get('tip');
        this.ProcessForm = formBuilder.group({
            Address: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
        });
        console.log(this.Tip);
        this.Notes = navParams.get('notes');
        console.log("notes", this.Notes);
        console.log(this.globals.GainDiscount, "gain discount in check out page");
        console.log(this.globals.Timing);
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
            console.log(this.myDate);
        }
        console.log(this.value);
    }
    CheckoutProcessPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CheckoutProcessPage');
        console.log(this.cashpay);
    };
    CheckoutProcessPage.prototype.delivernowbox = function () {
        console.log("delivernow");
        if (this.deliver_now == false) {
            this.Schedule_deliver = true;
        }
        else {
            this.Schedule_deliver = false;
        }
    };
    CheckoutProcessPage.prototype.scheduleDeliverbox = function () {
        if (this.Schedule_deliver == false) {
            this.deliver_now = true;
        }
        else {
            this.deliver_now = false;
        }
    };
    CheckoutProcessPage.prototype.Instruction = function () {
        console.log("bussines disscount flag", this.globals.BusinessDiscountFlag);
        if (this.Deliver == true) {
            this.instructions.Type = 'Delivery';
        }
        if (this.pickup == true) {
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
        console.log(this.instructions);
    };
    CheckoutProcessPage.prototype.checkTiming = function () {
        if (this.Schedule_deliver == false) {
            if (this.globals.Timing) {
                var local_datetime = new Date().toLocaleString('en-US', { hour12: false });
                this.date = new Date(local_datetime);
                console.log("", this.date);
                this.day = this.date.getDay();
                this.time = this.date.getHours();
                this.minutes = this.date.getMinutes();
                this.time = this.time + "." + this.minutes;
                console.log("day", "hours", this.day, this.time);
                var current_day = this.globals.Timing[this.day];
                this.time = this.time.toString();
                console.log(this.time, "current day", current_day);
                console.log(this.globals.Timing);
                if (current_day[0] != 'opened') {
                    if (Number(this.time) <= Number(current_day[0]) || Number(this.time) >= Number(current_day[1]) || current_day[0] == 'closed') {
                        var alert_1 = this.alertCtrl.create({
                            title: 'Sorry',
                            subTitle: 'Restaurants currently closed.',
                            buttons: ['OK']
                        });
                        alert_1.present();
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
            else {
                console.log("else");
                return true;
            }
        }
        else {
            console.log("bigelse");
            console.log("userDate", this.myDate);
            var future_date = new Date(this.myDate);
            console.log(future_date);
            var future_day = future_date.getDay();
            this.myDate = this.myDate.toString();
            console.log(this.myDate);
            this.future_hours = future_date.getHours();
            this.future_min = future_date.getMinutes();
            this.future_time = this.future_hours + "." + this.future_min;
            console.log("future_hours", this.future_hours, this.future_time);
            if (this.globals.Timing) {
                console.log(future_day);
                var current_day = this.globals.Timing[future_day];
                console.log(current_day);
                console.log(current_day[0], current_day[1], this.future_time);
                //  console.log(parseFloat(time) , parseFloat(current_day[0]),parseFloat(current_day[1]))
                if (current_day[0] != 'opened') {
                    if (Number(this.future_time) <= Number(current_day[0]) || Number(this.future_time) >= Number(current_day[1]) || current_day[0] == 'closed') {
                        var alert_2 = this.alertCtrl.create({
                            title: 'Sorry',
                            subTitle: 'Restaurants closed on the given time and date.',
                            buttons: ['OK']
                        });
                        alert_2.present();
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
            else {
                console.log("else");
                return true;
            }
            // return true;
        }
    };
    CheckoutProcessPage.prototype.process = function (ProcessData) {
        // process(){
        // this.navCtrl.push('PaymentPage');
        this.Instruction();
        if (this.checkTiming()) {
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
                this.navCtrl.push('PaymentPage', { amount: Number(this.cashpay), Date: localStorage.getItem("scheduled_time"), StoreAmount: this.storevalue, instruction: this.instructions });
            }
            if (this.globals.type == 'reservation' && this.pay_on_venue == true) {
                this.paymentThroughPayOnVenue();
            }
            else {
                console.log(ProcessData, this.ProcessForm.valid, this.myDate);
                console.log("pay on venue ", this.pay_on_venue);
                if (!this.ProcessForm.valid && !this.pickup) {
                    this.submitAttempt = true;
                    console.log(' Some values were not given or were incorrect, please fill them');
                }
                else {
                    if (ProcessData.addresscheck == true) {
                        this.nativeStorage.setItem('address', {
                            address: ProcessData.Address,
                            zipcode: ProcessData.zipcode,
                            city: ProcessData.city,
                            state: ProcessData.state,
                            check: ProcessData.addresscheck
                        }).then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
                    }
                    if (this.creditcard == true) {
                        // this.RedeemUserPoints();
                        this.navCtrl.push('PaymentPage', { Address: ProcessData.Address, amount: Number(this.cashpay), Date: localStorage.getItem("scheduled_time"), StoreAmount: this.storevalue, instruction: this.instructions });
                    }
                    else {
                        // if(this.Schedule_deliver == false)
                        // {
                        //     this.myDate = "current";
                        // }
                        this.OrderStatus(ProcessData);
                    }
                }
            }
        }
    };
    CheckoutProcessPage.prototype.paymentThroughPayOnVenue = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "loading...",
        });
        loading.present();
        var response = this.server.PaymentThroughPayOnVenue(this.instructions, this.cashpay);
        response.subscribe(function (data) {
            _this.data = data;
            console.log(_this.data);
            loading.dismiss();
            if (_this.data.success) {
                _this.orderStatus = _this.data.success;
                var alert_3 = _this.alertCtrl.create({
                    title: 'Congratulation',
                    subTitle: 'Reservation order has been successfully placed.',
                    buttons: ['Okay']
                });
                alert_3.present();
                _this.navCtrl.popToRoot();
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
    CheckoutProcessPage.prototype.paypalbox = function () {
        console.log("paypal", this.paypal);
        if (this.paypal == true) {
            this.creditcard = false;
            this.pay_on_venue = false;
        }
    };
    CheckoutProcessPage.prototype.creditcardbox = function () {
        console.log("creditcard", this.creditcard);
        if (this.creditcard == true) {
            this.paypal = false;
            this.pay_on_venue = false;
        }
    };
    CheckoutProcessPage.prototype.payonVenueBox = function () {
        if (this.pay_on_venue == true) {
            this.paypal = false;
            this.creditcard = false;
        }
    };
    CheckoutProcessPage.prototype.OrderStatus = function (ProcessData) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "loading...",
        });
        loading.present();
        var response;
        if (this.globals.type == 'reservation') {
            response = this.server.OrderStatusThroughPaypalReservation(this.instructions, this.cashpay);
        }
        else {
            response = this.server.OrderStatusThroughPaypal(ProcessData, this.instructions, this.myDate, this.cashpay);
        }
        response.subscribe(function (data) {
            _this.data = data;
            console.log(_this.data);
            loading.dismiss();
            if (_this.data.success) {
                _this.orderStatus = _this.data.success;
                _this.orderId = _this.data.orderId;
                console.log(_this.orderId);
                _this.Paypal(_this.data.orderId);
            }
            else {
                var alert_5 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Please try again',
                    buttons: ['OK']
                });
                alert_5.present();
            }
            // console.log(this.data.categories);
            console.log("data", _this.data);
        }, function (error) {
            console.log("Error!");
        });
    };
    CheckoutProcessPage.prototype.RadeemStoreCredit = function (flag) {
        var value;
        if (flag == true) {
            value = this.BirthdayCreditAvailed;
        }
        else {
            value = this.RewardCreditAvailed;
        }
        var response = this.server.LotteryRedeeem(value, flag);
        response.subscribe(function (data) {
            var response = data;
            console.log(response);
        }, function (error) { console.log(error); });
    };
    CheckoutProcessPage.prototype.FirstimeFlag = function () {
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
    CheckoutProcessPage.prototype.Paypal = function (id) {
        var _this = this;
        console.log("id", id);
        this.globals.OrderId = id;
        if (this.globals.paypalId == '') {
            var alert_6 = this.alertCtrl.create({
                title: 'Oops',
                subTitle: 'Payments not available,please try again',
                buttons: ['OK']
            });
            alert_6.present();
        }
        else {
            this.payPal.init({
                PayPalEnvironmentProduction: '',
                PayPalEnvironmentSandbox: this.globals.paypalId
            }).then(function () {
                // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
                _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new __WEBPACK_IMPORTED_MODULE_3__ionic_native_paypal__["b" /* PayPalConfiguration */]({})).then(function () {
                    var payment = new __WEBPACK_IMPORTED_MODULE_3__ionic_native_paypal__["c" /* PayPalPayment */](_this.cashpay.toString(), 'USD', 'Order no:' + id.toString(), 'sale');
                    _this.payPal.renderSinglePaymentUI(payment).then(function (data) {
                        // Successfully paid
                        console.log(data);
                        // Example sandbox response
                        //
                        _this.payapalresponse = data;
                        console.log(_this.payapalresponse);
                        console.log(_this.payapalresponse.response.state);
                        if (_this.payapalresponse.response.state == 'approved') {
                            _this.ConfirmOrder();
                            if (_this.RewardCreditAvailed > 0) {
                                _this.RadeemStoreCredit(false);
                            }
                            if (_this.BirthdayCreditAvailed > 0) {
                                _this.RadeemStoreCredit(true);
                            }
                            if (_this.globals.points_availed > 0) {
                                var points = _this.RedeemUserPoints();
                            }
                            _this.FirstimeFlag();
                        }
                        else {
                            var alert_7 = _this.alertCtrl.create({
                                title: 'Error',
                                subTitle: 'Please Try again',
                                buttons: ['OK']
                            });
                            alert_7.present();
                        }
                        // {
                        //   "client": {
                        //     "environment": "sandbox",
                        //     "product_name": "PayPal iOS SDK",
                        //     "paypal_sdk_version": "2.16.0",
                        //     "platform": "iOS"
                        //   },
                        //   "response_type": "payment",
                        //   "response": {
                        //     "id": "PAY-1AB23456CD789012EF34GHIJ",
                        //     "state": "approved",
                        //     "create_time": "2016-10-03T13:33:33Z",
                        //     "intent": "sale"
                        //   }
                        // }
                    }, function () {
                        // Error or render dialog closed without being successful
                    });
                }, function () {
                    // Error in configuration
                });
            }, function () {
                // Error in initialization, maybe PayPal isn't supported or something else
            });
        }
    };
    CheckoutProcessPage.prototype.RedeemUserPoints = function () {
        var _this = this;
        if (this.globals.points_availed > 0) {
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
        }
    };
    CheckoutProcessPage.prototype.ConfirmOrder = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "loading...",
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
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
                if (_this.globals.BusinessDiscount > 0 && _this.globals.availed_discount_count < _this.globals.business_discount_count) {
                    _this.userBusinessDiscountUpdate();
                }
                var alert_8 = _this.alertCtrl.create({
                    title: 'Congratulation',
                    subTitle: 'Your order has been sucessfully placed.',
                    buttons: ['Okay']
                });
                alert_8.present();
            }
            else {
                var alert_9 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Oops,something went wrong.please contact our Business',
                    buttons: ['Okay']
                });
                alert_9.present();
            }
        }, function (error) {
            console.log("Error!");
        });
    };
    CheckoutProcessPage.prototype.userBusinessDiscountUpdate = function () {
        this.globals.availed_discount_count++;
        var response = this.server.userBusinessAvailedDiscount();
        response.subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    CheckoutProcessPage.prototype.setDiscount = function () {
        this.nativeStorage.setItem('discount', { discountValue: this.globals.GainDiscount })
            .then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
    };
    CheckoutProcessPage.prototype.setArray = function () {
        this.globals.Product.length = 0;
        this.nativeStorage.setItem('Product', { array: this.globals.Product })
            .then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
    };
    CheckoutProcessPage.prototype.addressSame = function () {
        console.log("same1", this.ProcessForm.value.sameAddress);
        if (this.ProcessForm.value.sameAddress == true) {
            this.ProcessForm.value.billingAddress = this.ProcessForm.value.Address;
            this.ProcessForm.get('billingAddress').setValue(this.ProcessForm.value.Address);
        }
        else {
            this.ProcessForm.get('billingAddress').setValue(null);
        }
    };
    CheckoutProcessPage.prototype.getAddress = function () {
        var _this = this;
        this.nativeStorage.getItem('address')
            .then(function (data) {
            _this.ProcessForm.get('Address').setValue(data.address);
            _this.ProcessForm.get('zipcode').setValue(data.zipcode);
            _this.ProcessForm.get('city').setValue(data.city);
            _this.ProcessForm.get('state').setValue(data.state);
            _this.ProcessForm.get('addresscheck').setValue(data.check);
        }).catch(function (err) { return console.log; });
    };
    CheckoutProcessPage.prototype.cancel = function () {
        this.globals.Product.length = 0;
        this.navCtrl.popToRoot();
    };
    CheckoutProcessPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-checkout-process',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/checkout-process/checkout-process.html"*/'<!--\n  Generated template for the CheckoutProcessPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color="primary">\n    <ion-title>Checkout</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content style="background-color:#eee" class="Open-Sans-regular">\n  <ion-list style="padding: 10px; margin-bottom: 0;">\n    <ion-list-header style="color:#000000;font-weight:bold">\n      Payment Method\n    </ion-list-header>\n    <div *ngIf="globals.paypalId">\n      <ion-item>\n        <ion-label>Paypal</ion-label>\n        <ion-checkbox [(ngModel)]="paypal" (ionChange)="paypalbox()"></ion-checkbox>\n      </ion-item>\n    </div>\n    <ion-item>\n      <ion-label>Credit card</ion-label>\n      <ion-checkbox [(ngModel)]="creditcard" (ionChange)="creditcardbox()"></ion-checkbox>\n    </ion-item>\n\n    <ion-item *ngIf="globals.type ==\'reservation\'">\n      <ion-label>Pay on Venue</ion-label>\n      <ion-checkbox [(ngModel)]="pay_on_venue" (ionChange)="payonVenueBox()"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n\n  <ion-row>\n\n    <ion-col style="margin:auto">\n      <img src="assets/imgs/mastercard.png">\n    </ion-col>\n    <ion-col style="margin:auto">\n\n      <img src="assets/imgs/discover-card.png">\n\n    </ion-col>\n    <ion-col style="margin:auto">\n\n      <img src="assets/imgs/american-express-logo.jpg">\n    </ion-col>\n    <ion-col style="margin:auto">\n      <img src="assets/imgs/visa.png">\n    </ion-col>\n\n  </ion-row>\n\n\n\n\n  <!-- <p class="Open-Sans-regular" style="font-family: Open Sans;" *ngIf="submitAttempt" style="color: #ea6153; text-align:center;">Please fill out all details accurately.</p> -->\n\n\n  <ion-list no-lines style="padding: 10px;  margin-bottom: 0 ; padding-left:0;padding-right:0">\n    <div style="text-align:center">\n      <div style="display: inline-block; width: 40%;">\n        <!-- <ion-item  *ngIf="Deliver == false" style="border-radius: 20px;">\n    <ion-label>Now</ion-label>\n   <ion-checkbox  disabled = "true" [(ngModel)]="deliver_now" (ionChange) = "delivernowbox()"   ></ion-checkbox>\n   </ion-item> -->\n        <!-- <div *ngIf="globals.type != \'reservation\'"> -->\n        <!-- <ion-item style="border-radius: 20px;">\n          <ion-label>Now</ion-label>\n          <ion-checkbox [(ngModel)]="deliver_now" (ionChange)="delivernowbox()"></ion-checkbox>\n        </ion-item>\n      </div>\n      <div style="display: inline-block;  width: 10%;  font-size: 2rem; text-align: center;">\n        <ion-label style="margin:0">OR</ion-label>\n      </div>\n      <div style="display: inline-block; width: 40%;">\n        <ion-item style="border-radius: 20px;">\n          <ion-label>Schedule</ion-label>\n          <ion-checkbox [(ngModel)]="Schedule_deliver" (ionChange)="scheduleDeliverbox()"></ion-checkbox>\n\n        </ion-item> -->\n        <!-- </div> -->\n\n        <!-- <ion-item  *ngIf="Deliver == false"  style="border-radius: 20px;">\n    <ion-label>Schedule</ion-label>\n  <ion-checkbox    disabled = "true"  [(ngModel)]="Schedule_deliver" (ionChange) = "scheduleDeliverbox()" ></ion-checkbox>\n    </ion-item>\n   -->\n      </div>\n\n    </div>\n  </ion-list>\n\n  <!-- <ion-list style="padding: 10px;margin-bottom: 10px;">\n    <ion-item>\n      <ion-label>Date Time</ion-label>\n      <ion-datetime *ngIf="Schedule_deliver == false && pickup == false" disabled="true" displayFormat="MMM DD YYYY h:mm a" placeholder="MMM DD YYYY HH:mm"\n        min="{{value}}" [(ngModel)]="myDate">\n      </ion-datetime>\n      <ion-datetime *ngIf="Schedule_deliver == false && pickup == true" displayFormat="h:mm a" placeholder=" HH:mm" min="{{value}}"\n        max="{{value}}" [(ngModel)]="myDate">\n      </ion-datetime>\n      <ion-datetime *ngIf="Schedule_deliver == true && pickup == false" displayFormat="MMM DD YYYY h:mm a" placeholder="MMM DD YYYY HH:mm "\n        min="{{value}}" [(ngModel)]="myDate">\n      </ion-datetime>\n      <ion-datetime *ngIf="Schedule_deliver == true && pickup == true" displayFormat="MMM DD YYYY h:mm a" placeholder="MMM DD YYYY HH:mm"\n        min="{{value}}" [(ngModel)]="myDate">\n      </ion-datetime>\n    </ion-item>\n  </ion-list> -->\n\n\n  <!-- <ion-label style="font-size: 2rem; text-align: center; background:#000000; padding: 10px; color: white;  margin-right: 0;"\n    *ngIf="estTime && pickup==false">\n    <ion-icon style="position: relative;    font-size: 1.3em; top: 2px;" name="clock"> </ion-icon> Est. Delivery Time {{globals.estimated_time}} </ion-label>\n  <form [formGroup]="ProcessForm" ng-submit="process(this.ProcessForm.value)">\n\n    <ion-list style="padding: 10px;     margin-bottom: 10px;">\n      <ion-list-header style="color:#000000;font-weight:bold;border-bottom:none">\n        Info\n      </ion-list-header>\n\n      <ion-item>\n        <ion-label floating>Address</ion-label>\n        <ion-input *ngIf="pickup || pay_on_venue" disabled="true" formControlName="Address"></ion-input>\n        <ion-input *ngIf="!pickup && !pay_on_venue" formControlName="Address"></ion-input>\n      </ion-item>\n\n\n      <ion-item>\n        <ion-label floating>City</ion-label>\n        <ion-input *ngIf="pickup || pay_on_venue" disabled="true" formControlName="city"></ion-input>\n        <ion-input *ngIf="!pickup && !pay_on_venue" formControlName="city"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>State</ion-label>\n        <ion-input *ngIf="pickup || pay_on_venue" disabled="true" formControlName="state"></ion-input>\n        <ion-input *ngIf="!pickup && !pay_on_venue" formControlName="state"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Zip Code</ion-label>\n        <ion-input *ngIf="pickup || pay_on_venue" disabled="true" formControlName="zipcode"></ion-input>\n        <ion-input *ngIf="!pickup && !pay_on_venue" type="number" formControlName="zipcode"></ion-input>\n      </ion-item>\n    </ion-list>\n\n\n    <ion-list no-lines style="padding: 10px;    margin-bottom: 0;">\n      <ion-item *ngIf="pickup || pay_on_venue" style="border-radius: 20px;">\n        <ion-label>Save address</ion-label>\n        <ion-checkbox disabled="true" formControlName="addresscheck"></ion-checkbox>\n\n      </ion-item>\n      <ion-item *ngIf="!pickup && !pay_on_venue" style="border-radius: 20px;">\n        <ion-label>Save address</ion-label>\n        <ion-checkbox formControlName="addresscheck"></ion-checkbox>\n\n      </ion-item>\n    </ion-list>\n  </form> -->\n\n  <!-- this.ProcessForm.value -->\n\n  <button ion-button type="submit" (click)="process()" style="width:95%; margin-left:2.5%;" block> Next </button>\n\n  <button ion-button (click)="cancel()" style="width:95%; margin-left:2.5%;" block> Cancel </button>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/checkout-process/checkout-process.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_8__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_paypal__["a" /* PayPal */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], CheckoutProcessPage);
    return CheckoutProcessPage;
}());

//# sourceMappingURL=checkout-process.js.map

/***/ }),

/***/ 976:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PayPal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PayPalPayment; });
/* unused harmony export PayPalItem */
/* unused harmony export PayPalPaymentDetails */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PayPalConfiguration; });
/* unused harmony export PayPalShippingAddress */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(16);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * @name PayPal
 * @description
 * PayPal plugin for Cordova/Ionic Applications
 *
 * @usage
 * ```typescript
 * import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
 *
 * constructor(private payPal: PayPal) { }
 *
 * ...
 *
 *
 * this.payPal.init({
 *   PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
 *   PayPalEnvironmentSandbox: 'YOUR_SANDBOX_CLIENT_ID'
 * }).then(() => {
 *   // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
 *   this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
 *     // Only needed if you get an "Internal Service Error" after PayPal login!
 *     //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
 *   })).then(() => {
 *     let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
 *     this.payPal.renderSinglePaymentUI(payment).then(() => {
 *       // Successfully paid
 *
 *       // Example sandbox response
 *       //
 *       // {
 *       //   "client": {
 *       //     "environment": "sandbox",
 *       //     "product_name": "PayPal iOS SDK",
 *       //     "paypal_sdk_version": "2.16.0",
 *       //     "platform": "iOS"
 *       //   },
 *       //   "response_type": "payment",
 *       //   "response": {
 *       //     "id": "PAY-1AB23456CD789012EF34GHIJ",
 *       //     "state": "approved",
 *       //     "create_time": "2016-10-03T13:33:33Z",
 *       //     "intent": "sale"
 *       //   }
 *       // }
 *     }, () => {
 *       // Error or render dialog closed without being successful
 *     });
 *   }, () => {
 *     // Error in configuration
 *   });
 * }, () => {
 *   // Error in initialization, maybe PayPal isn't supported or something else
 * });
 * ```
 * @interfaces
 * PayPalEnvironment
 * PayPalConfigurationOptions
 * @classes
 * PayPalPayment
 * PayPalItem
 * PayPalPaymentDetails
 * PayPalShippingAddress
 */
var PayPal = (function (_super) {
    __extends(PayPal, _super);
    function PayPal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieve the version of the PayPal iOS SDK library. Useful when contacting support.
     * @returns {Promise<string>}
     */
    /**
       * Retrieve the version of the PayPal iOS SDK library. Useful when contacting support.
       * @returns {Promise<string>}
       */
    PayPal.prototype.version = /**
       * Retrieve the version of the PayPal iOS SDK library. Useful when contacting support.
       * @returns {Promise<string>}
       */
    function () {
        return;
    };
    /**
     * You must preconnect to PayPal to prepare the device for processing payments.
     * This improves the user experience, by making the presentation of the
     * UI faster. The preconnect is valid for a limited time, so
     * the recommended time to preconnect is on page load.
     *
     * @param {PayPalEnvironment} clientIdsForEnvironments: set of client ids for environments
     * @returns {Promise<any>}
     */
    /**
       * You must preconnect to PayPal to prepare the device for processing payments.
       * This improves the user experience, by making the presentation of the
       * UI faster. The preconnect is valid for a limited time, so
       * the recommended time to preconnect is on page load.
       *
       * @param {PayPalEnvironment} clientIdsForEnvironments: set of client ids for environments
       * @returns {Promise<any>}
       */
    PayPal.prototype.init = /**
       * You must preconnect to PayPal to prepare the device for processing payments.
       * This improves the user experience, by making the presentation of the
       * UI faster. The preconnect is valid for a limited time, so
       * the recommended time to preconnect is on page load.
       *
       * @param {PayPalEnvironment} clientIdsForEnvironments: set of client ids for environments
       * @returns {Promise<any>}
       */
    function (clientIdsForEnvironments) {
        return;
    };
    /**
     * You must preconnect to PayPal to prepare the device for processing payments.
     * This improves the user experience, by making the presentation of the UI faster.
     * The preconnect is valid for a limited time, so the recommended time to preconnect is on page load.
     *
     * @param {String} environment: available options are "PayPalEnvironmentNoNetwork", "PayPalEnvironmentProduction" and "PayPalEnvironmentSandbox"
     * @param {PayPalConfiguration} configuration: PayPalConfiguration object, for Future Payments merchantName, merchantPrivacyPolicyURL and merchantUserAgreementURL must be set be set
     * @returns {Promise<any>}
     */
    /**
       * You must preconnect to PayPal to prepare the device for processing payments.
       * This improves the user experience, by making the presentation of the UI faster.
       * The preconnect is valid for a limited time, so the recommended time to preconnect is on page load.
       *
       * @param {String} environment: available options are "PayPalEnvironmentNoNetwork", "PayPalEnvironmentProduction" and "PayPalEnvironmentSandbox"
       * @param {PayPalConfiguration} configuration: PayPalConfiguration object, for Future Payments merchantName, merchantPrivacyPolicyURL and merchantUserAgreementURL must be set be set
       * @returns {Promise<any>}
       */
    PayPal.prototype.prepareToRender = /**
       * You must preconnect to PayPal to prepare the device for processing payments.
       * This improves the user experience, by making the presentation of the UI faster.
       * The preconnect is valid for a limited time, so the recommended time to preconnect is on page load.
       *
       * @param {String} environment: available options are "PayPalEnvironmentNoNetwork", "PayPalEnvironmentProduction" and "PayPalEnvironmentSandbox"
       * @param {PayPalConfiguration} configuration: PayPalConfiguration object, for Future Payments merchantName, merchantPrivacyPolicyURL and merchantUserAgreementURL must be set be set
       * @returns {Promise<any>}
       */
    function (environment, configuration) {
        return;
    };
    /**
     * Start PayPal UI to collect payment from the user.
     * See https://developer.paypal.com/webapps/developer/docs/integration/mobile/ios-integration-guide/
     * for more documentation of the params.
     *
     * @param {PayPalPayment} payment PayPalPayment object
     * @returns {Promise<any>}
     */
    /**
       * Start PayPal UI to collect payment from the user.
       * See https://developer.paypal.com/webapps/developer/docs/integration/mobile/ios-integration-guide/
       * for more documentation of the params.
       *
       * @param {PayPalPayment} payment PayPalPayment object
       * @returns {Promise<any>}
       */
    PayPal.prototype.renderSinglePaymentUI = /**
       * Start PayPal UI to collect payment from the user.
       * See https://developer.paypal.com/webapps/developer/docs/integration/mobile/ios-integration-guide/
       * for more documentation of the params.
       *
       * @param {PayPalPayment} payment PayPalPayment object
       * @returns {Promise<any>}
       */
    function (payment) {
        return;
    };
    /**
     * Once a user has consented to future payments, when the user subsequently initiates a PayPal payment
     * from their device to be completed by your server, PayPal uses a Correlation ID to verify that the
     * payment is originating from a valid, user-consented device+application.
     * This helps reduce fraud and decrease declines.
     * This method MUST be called prior to initiating a pre-consented payment (a "future payment") from a mobile device.
     * Pass the result to your server, to include in the payment request sent to PayPal.
     * Do not otherwise cache or store this value.
     * @returns {Promise<any>}
     */
    /**
       * Once a user has consented to future payments, when the user subsequently initiates a PayPal payment
       * from their device to be completed by your server, PayPal uses a Correlation ID to verify that the
       * payment is originating from a valid, user-consented device+application.
       * This helps reduce fraud and decrease declines.
       * This method MUST be called prior to initiating a pre-consented payment (a "future payment") from a mobile device.
       * Pass the result to your server, to include in the payment request sent to PayPal.
       * Do not otherwise cache or store this value.
       * @returns {Promise<any>}
       */
    PayPal.prototype.clientMetadataID = /**
       * Once a user has consented to future payments, when the user subsequently initiates a PayPal payment
       * from their device to be completed by your server, PayPal uses a Correlation ID to verify that the
       * payment is originating from a valid, user-consented device+application.
       * This helps reduce fraud and decrease declines.
       * This method MUST be called prior to initiating a pre-consented payment (a "future payment") from a mobile device.
       * Pass the result to your server, to include in the payment request sent to PayPal.
       * Do not otherwise cache or store this value.
       * @returns {Promise<any>}
       */
    function () {
        return;
    };
    /**
     * Please Read Docs on Future Payments at https://github.com/paypal/PayPal-iOS-SDK#future-payments
     * @returns {Promise<any>}
     */
    /**
       * Please Read Docs on Future Payments at https://github.com/paypal/PayPal-iOS-SDK#future-payments
       * @returns {Promise<any>}
       */
    PayPal.prototype.renderFuturePaymentUI = /**
       * Please Read Docs on Future Payments at https://github.com/paypal/PayPal-iOS-SDK#future-payments
       * @returns {Promise<any>}
       */
    function () {
        return;
    };
    /**
     * Please Read Docs on Profile Sharing at https://github.com/paypal/PayPal-iOS-SDK#profile-sharing
     *
     * @param {Array<string>} scopes scopes Set of requested scope-values. Accepted scopes are: openid, profile, address, email, phone, futurepayments and paypalattributes
     * See https://developer.paypal.com/docs/integration/direct/identity/attributes/ for more details
     * @returns {Promise<any>}
     */
    /**
       * Please Read Docs on Profile Sharing at https://github.com/paypal/PayPal-iOS-SDK#profile-sharing
       *
       * @param {Array<string>} scopes scopes Set of requested scope-values. Accepted scopes are: openid, profile, address, email, phone, futurepayments and paypalattributes
       * See https://developer.paypal.com/docs/integration/direct/identity/attributes/ for more details
       * @returns {Promise<any>}
       */
    PayPal.prototype.renderProfileSharingUI = /**
       * Please Read Docs on Profile Sharing at https://github.com/paypal/PayPal-iOS-SDK#profile-sharing
       *
       * @param {Array<string>} scopes scopes Set of requested scope-values. Accepted scopes are: openid, profile, address, email, phone, futurepayments and paypalattributes
       * See https://developer.paypal.com/docs/integration/direct/identity/attributes/ for more details
       * @returns {Promise<any>}
       */
    function (scopes) {
        return;
    };
    PayPal.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], PayPal.prototype, "version", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], PayPal.prototype, "init", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, PayPalConfiguration]),
        __metadata("design:returntype", Promise)
    ], PayPal.prototype, "prepareToRender", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [PayPalPayment]),
        __metadata("design:returntype", Promise)
    ], PayPal.prototype, "renderSinglePaymentUI", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], PayPal.prototype, "clientMetadataID", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], PayPal.prototype, "renderFuturePaymentUI", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Promise)
    ], PayPal.prototype, "renderProfileSharingUI", null);
    /**
     * @name PayPal
     * @description
     * PayPal plugin for Cordova/Ionic Applications
     *
     * @usage
     * ```typescript
     * import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
     *
     * constructor(private payPal: PayPal) { }
     *
     * ...
     *
     *
     * this.payPal.init({
     *   PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
     *   PayPalEnvironmentSandbox: 'YOUR_SANDBOX_CLIENT_ID'
     * }).then(() => {
     *   // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
     *   this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
     *     // Only needed if you get an "Internal Service Error" after PayPal login!
     *     //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
     *   })).then(() => {
     *     let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
     *     this.payPal.renderSinglePaymentUI(payment).then(() => {
     *       // Successfully paid
     *
     *       // Example sandbox response
     *       //
     *       // {
     *       //   "client": {
     *       //     "environment": "sandbox",
     *       //     "product_name": "PayPal iOS SDK",
     *       //     "paypal_sdk_version": "2.16.0",
     *       //     "platform": "iOS"
     *       //   },
     *       //   "response_type": "payment",
     *       //   "response": {
     *       //     "id": "PAY-1AB23456CD789012EF34GHIJ",
     *       //     "state": "approved",
     *       //     "create_time": "2016-10-03T13:33:33Z",
     *       //     "intent": "sale"
     *       //   }
     *       // }
     *     }, () => {
     *       // Error or render dialog closed without being successful
     *     });
     *   }, () => {
     *     // Error in configuration
     *   });
     * }, () => {
     *   // Error in initialization, maybe PayPal isn't supported or something else
     * });
     * ```
     * @interfaces
     * PayPalEnvironment
     * PayPalConfigurationOptions
     * @classes
     * PayPalPayment
     * PayPalItem
     * PayPalPaymentDetails
     * PayPalShippingAddress
     */
    PayPal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["g" /* Plugin */])({
            pluginName: 'PayPal',
            plugin: 'com.paypal.cordova.mobilesdk',
            pluginRef: 'PayPalMobile',
            repo: 'https://github.com/paypal/PayPal-Cordova-Plugin',
            platforms: ['Android', 'iOS']
        })
    ], PayPal);
    return PayPal;
}(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* IonicNativePlugin */]));

/**
 * @hidden
 */
var /**
 * @hidden
 */
PayPalPayment = (function () {
    function PayPalPayment(amount, currency, shortDescription, intent, details) {
        /**
           * Optional Build Notation code ("BN code"), obtained from partnerprogram@paypal.com,
           * for your tracking purposes.
           */
        this.bnCode = 'PhoneGap_SP';
        this.amount = amount;
        this.currency = currency;
        this.shortDescription = shortDescription;
        this.intent = intent;
        this.details = details;
    }
    return PayPalPayment;
}());
/**
 * @hidden
 */

/**
 * @hidden
 */
var /**
 * @hidden
 */
PayPalItem = (function () {
    /**
     * The PayPalItem class defines an optional itemization for a payment.
     * @see https://developer.paypal.com/docs/api/#item-object for more details.
     * @param {String} name: Name of the item. 127 characters max
     * @param {Number} quantity: Number of units. 10 characters max.
     * @param {String} price: Unit price for this item 10 characters max.
     * May be negative for "coupon" etc
     * @param {String} currency: ISO standard currency code.
     * @param {String} sku: The stock keeping unit for this item. 50 characters max (optional)
     */
    function PayPalItem(name, quantity, price, currency, sku) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.currency = currency;
        this.sku = sku;
    }
    return PayPalItem;
}());
/**
 * @hidden
 */

/**
 * @hidden
 */
var /**
 * @hidden
 */
PayPalPaymentDetails = (function () {
    /**
     * The PayPalPaymentDetails class defines optional amount details.
     * @param {String} subtotal: Sub-total (amount) of items being paid for. 10 characters max with support for 2 decimal places.
     * @param {String} shipping: Amount charged for shipping. 10 characters max with support for 2 decimal places.
     * @param {String} tax: Amount charged for tax. 10 characters max with support for 2 decimal places.
     */
    function PayPalPaymentDetails(subtotal, shipping, tax) {
        this.subtotal = subtotal;
        this.shipping = shipping;
        this.tax = tax;
    }
    return PayPalPaymentDetails;
}());
/**
 * @hidden
 */

/**
 * @hidden
 */
var /**
 * @hidden
 */
PayPalConfiguration = (function () {
    /**
     * You use a PayPalConfiguration object to configure many aspects of how the SDK behaves.
     * see defaults for options available
     */
    function PayPalConfiguration(options) {
        var defaults = {
            defaultUserEmail: null,
            defaultUserPhoneCountryCode: null,
            defaultUserPhoneNumber: null,
            merchantName: null,
            merchantPrivacyPolicyURL: null,
            merchantUserAgreementURL: null,
            acceptCreditCards: true,
            payPalShippingAddressOption: 0,
            rememberUser: true,
            languageOrLocale: null,
            disableBlurWhenBackgrounding: false,
            presentingInPopover: false,
            forceDefaultsInSandbox: false,
            sandboxUserPassword: null,
            sandboxUserPin: null
        };
        if (options && typeof options === 'object') {
            for (var i in options) {
                if (defaults.hasOwnProperty(i)) {
                    defaults[i] = options[i];
                }
            }
        }
        return defaults;
    }
    return PayPalConfiguration;
}());
/**
 * @hidden
 */

/**
 * @hidden
 */
var /**
 * @hidden
 */
PayPalShippingAddress = (function () {
    /**
     * See the documentation of the individual properties for more detail.
     * @param {String} recipientName: Name of the recipient at this address. 50 characters max.
     * @param {String} line1: Line 1 of the address (e.g., Number, street, etc). 100 characters max.
     * @param {String} line2: Line 2 of the address (e.g., Suite, apt #, etc). 100 characters max. Optional.
     * @param {String} city: City name. 50 characters max.
     * @param {String} state: 2-letter code for US states, and the equivalent for other countries. 100 characters max. Required in certain countries.
     * @param {String} postalCode: ZIP code or equivalent is usually required for countries that have them. 20 characters max. Required in certain countries.
     * @param {String} countryCode: 2-letter country code. 2 characters max.
     */
    function PayPalShippingAddress(recipientName, line1, line2, city, state, postalCode, countryCode) {
        this.recipientName = recipientName;
        this.line1 = line1;
        this.line2 = line2;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.countryCode = countryCode;
    }
    return PayPalShippingAddress;
}());
/**
 * @hidden
 */

//# sourceMappingURL=index.js.map

/***/ })

});
//# sourceMappingURL=1.js.map
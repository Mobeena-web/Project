import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { Http } from '@angular/http';
import { HomePage } from "../home/home";
import { ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from '../../app/global';
import { CategoryPage } from "../category/category";
import { OrderListingPage } from "../order-listing/order-listing";
import { NativeStorage } from "@ionic-native/native-storage";
import { ServerProvider } from "../../providers/server/server";
@IonicPage()
@Component({
    selector: 'page-payment',
    templateUrl: 'payment.html',
})
export class PaymentPage {
    BirthdayCreditAvailed: any;
    RewardCreditAvailed: any;
    business_array: any = new Array();
    deliver: any;
    StorePoint: any;
    order_date: any;
    instruction: string = '';
    Address: any;
    data: any;
    min: any;
    hours: any;
    future_hours: any;
    future_min: any;
    future_time: any;
    minutes: any;
    response: any;
    deliverFlag: boolean;
    estTime: any;
    storevalue: any;
    reward_amount: number = 0;
    storecreditExist: boolean = false;
    time: any;
    day: number;
    value: string;
    year: number;
    month: any;
    datenow: any;
    date: any;
    ProcessData: any;
    orderId: any;
    orderStatus: any;
    payapalresponse: any;
    cashpay: any = 0;
    ProcessForm: FormGroup;
    paypal: boolean = true;
    creditcard: boolean = false;
    pay_on_venue: boolean = false;
    pickup: boolean = false;
    Schedule_deliver: boolean = false;
    mytime: any;
    myDate: any;
    storeCredit: boolean;
    Deliver: boolean = true;
    deliver_now: boolean = true;
    Tip: number = 0;
    Notes: any;
    orderType: any;
    cash_on_delivery: any;
    gift_falg: boolean = false;
    gift_data: any;
    color: any = 'appButtons';
    color2: any = 'appButtons';
    instructions: any = { "Type": '', "BusinessDiscount": 0, "GainDiscount": 0, "StoreCredit": 0, "Tip": 0, "Points": 0, "Notes": '', "giftcard": '', "tax": 0 , "delivery_fee" : 0};
    month_array: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    amount: any;
    cardinfo: any = {
        number: '',
        expMonth: '',
        expYear: '',
        cvc: ''
    }
    submitAttempt: boolean = false;
    PaymentForm: FormGroup;
    calculated_tax = 0;
    cash_discount = 0;
    ccFee: number = 0;
    ccFee_added: boolean = true;

    constructor(public server: ServerProvider, public modalCtrl: ModalController, 
        private nativeStorage: NativeStorage, public alertCtrl: AlertController, 
        public loadingCtrl: LoadingController, public globals: GlobalVariable, 
        public viewCtrl: ViewController, private app: App, public formBuilder: FormBuilder, 
        public stripe: Stripe, public http: Http, public navCtrl: NavController, 
        public navParams: NavParams) {

        this.calculated_tax = this.navParams.get('tax');
        this.ccFee = this.navParams.get('ccFee');
        this.cashpay = this.navParams.get('amount');
        this.storevalue = this.navParams.get('StoreCredit');
        this.estTime = this.globals.estimated_time;
        this.Deliver = navParams.get('deliver');
        this.pickup = navParams.get('pickup');
        this.orderType = this.globals.OrderType;
        this.RewardCreditAvailed = navParams.get('RewardAvailed');
        this.BirthdayCreditAvailed = navParams.get('BirthdayCreditavailed');
        this.Address = localStorage.getItem("GetAddress");

        if (this.globals.card_enabled) {
            this.color = 'primary';
            this.creditcard = true;
        } else {
            this.cash_on_delivery = true;
        }

        this.Tip = navParams.get('tip');
        this.ProcessForm = formBuilder.group({
            Address: ['', Validators.compose([Validators.required])],
        });

        this.Notes = navParams.get('notes');
        this.getAddress();

        this.date = new Date();
        this.datenow = this.date.getDate();
        this.month = this.date.getMonth() + 1;
        this.year = this.date.getFullYear();
        this.month = this.month.toString();
        this.day = this.date.getDay();
        this.datenow = this.datenow.toString();
        this.hours = this.date.getHours();
        this.min = this.date.getMinutes();
        if (this.month.length == 1) {
            this.month = "0" + this.month;
        }

        if (this.datenow.length == 1) {
            this.datenow = "0" + this.datenow;
        }

        this.value = this.year + "-" + this.month + "-" + this.datenow;
        this.value.toString();

        if (this.Schedule_deliver == false && this.pickup == true) {
            var date = new Date()
            var date1 = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();
            this.myDate = date1;
        }

        this.amount = this.navParams.get('amount');
        this.amount = Number(this.amount);
        this.order_date = localStorage.getItem("scheduled_time");
        
        this.PaymentForm = formBuilder.group({
            creditcardno: ['', Validators.compose([Validators.minLength(15), Validators.maxLength(16), Validators.pattern('[0-9]*'), Validators.required])],
            expiryMonth: ['', Validators.compose([Validators.required])],
            expiryYear: ['', Validators.compose([Validators.required])],
            CVC: ['', Validators.compose([Validators.required])],
            cardinfo: [false]
        });

        this.StorePoint = navParams.get('StoreAmount');
        this.instruction = navParams.get('instruction');
        this.RewardCreditAvailed = navParams.get('RewardAvailed');
        this.BirthdayCreditAvailed = navParams.get('BirthdayCreditavailed');

        this.getCreditCard();

        this.gift_falg = this.navParams.get('gift_flag');
        this.gift_data = this.navParams.get('giftcard');
        this.process();

        if (this.gift_falg) {
            this.payment_on_delivery();
        }
    }

    login_kiosk() {
        let modal = this.modalCtrl.create('LoginPage');
        modal.present();
    }

    ionViewDidLoad() {

    }
    
    paymentThroughPayOnVenue() {
        let loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();

        let response = this.server.PaymentThroughPayOnVenue(this.instructions, this.cashpay);
        response.subscribe(data => {
            this.data = data;
            loading.dismiss();
            if (this.data.success) {
                this.orderStatus = this.data.success;
                let alert = this.alertCtrl.create({
                    title: 'Congratulation',
                    subTitle: 'Reservation order has been successfully placed.',
                    buttons: ['Okay']
                });
                alert.present();
                this.navCtrl.popToRoot();
            } else {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Please try again',
                    buttons: ['OK']
                });
                alert.present();
            }
        }, error => {
        });
    }

    process() {
        this.Instruction();

        if (this.globals.type == 'reservation' && this.creditcard == true) {
        }

        if (this.globals.type == 'reservation' && this.pay_on_venue == true) {
            this.paymentThroughPayOnVenue();
        } else {
            if (this.orderType == "delivery") {
                this.submitAttempt = true;
            } else {

                if (this.creditcard == true) {

                } else {
                 
                }
            }
        }
    }
    
    ConfirmOrder() {
        let loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();

        if (this.globals.GainDiscountFlag == true) {
            this.globals.GainDiscount = 0;
            this.setDiscount();
        }

        let response;
        if (this.globals.type == 'reservation') {
            response = this.server.OrderConfirmationThroughPaypalReservation(this.orderStatus, this.orderId);
        } else {
            response = this.server.OrderConfirmationThroughPaypal(this.orderStatus, this.orderId);
        }

        response.subscribe(data => {
            this.data = data;

            loading.dismiss();
            if (this.data.success) {
                this.setArray();
                this.navCtrl.setRoot(HomePage);
                if (this.globals.BusinessDiscount > 0 && this.globals.availed_discount_count < this.globals.business_discount_count) {
                    this.userBusinessDiscountUpdate();
                }
                this.thankyou();
            } else {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Oops,something went wrong.please contact our Business',
                    buttons: ['Okay']
                });
                alert.present();
            }
        }, error => {
        });
    }


    OrderStatus(Address) {
        let loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();

        let response;
        if (this.globals.type == 'reservation') {
            response = this.server.OrderStatusThroughPaypalReservation(this.instructions, this.cashpay);
        } else {
            response = this.server.OrderStatusThroughPaypal(this.Address, this.instructions, this.myDate, this.cashpay);
        }

        response.subscribe(data => {
            this.data = data;
            loading.dismiss();
            if (this.data.success) {
                this.orderStatus = this.data.success;
                this.orderId = this.data.orderId;
            } else {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Please try again',
                    buttons: ['OK']
                });
                alert.present();
            }
        }, error => {

        });
    }

    Instruction() {
// author: zohra
// purpose : add delivery fee
// used in app
// created : old
// last_modified: 2020-12-29 05:00
// status: active old
        this.instructions.tax = this.calculated_tax;
        if (this.orderType == 'delivery') {
            this.instructions.Type = 'Delivery';
        }

        if (this.orderType == 'pickup') {
            this.instructions.Type = 'Pickup';
        }

        if (this.globals.BusinessDiscountFlag == true) {
            this.instructions.BusinessDiscount = Number(this.globals.BusinessDiscount)
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

        if (this.gift_data && this.gift_data.length > 0) {
            this.instructions.giftcard = this.gift_data;
        }
        if (this.globals.delivery_fee > 0) {
            this.instructions.delivery_fee = Number(this.globals.delivery_fee);
        }
    }

    RadeemStoreCredit(flag) {
        let response = this.server.LotteryRedeeem(this.StorePoint, flag);
        response.subscribe(data => {
            var response = data.json();
        }, error => { console.log(error) });
    }

    payment_type(PaymentData) {
        if (!this.globals.udid) {
            this.globals.udid = this.globals.caos_udid;
        }
        
        if (this.globals.type == 'reservation') {
            this.pay_reservation(PaymentData);
        } else {
            this.pay(PaymentData);
        }
    }

    cash_discount_confirmation(type, payment_data) {
        if (type == 'cash') {
            this.payment_on_delivery();
        } else {
            this.payment_type(payment_data)
        }
    }

    pay_reservation(PaymentData: any) {
        var a = btoa(PaymentData.creditcardno)
        if (!this.PaymentForm.valid) {
            this.submitAttempt = true;
        } else {
            if (PaymentData.cardinfo == true) {
                this.nativeStorage.setItem('card',
                    {
                        cardno: btoa(PaymentData.creditcardno),
                        exmonth: btoa(PaymentData.expiryMonth),
                        exyear: btoa(PaymentData.expiryYear),
                        cvc: btoa(PaymentData.CVC),
                        check: btoa(PaymentData.cardinfo)
                    }).then(() => console.log('Stored item!'),
                        error => console.error('Error storing item', error)
                    );
            }

            this.cardinfo = {
                number: PaymentData.creditcardno,
                expMonth: PaymentData.expiryMonth,
                expYear: PaymentData.expiryYear,
                cvc: PaymentData.CVC
            }

            let loading = this.loadingCtrl.create({
                content: "Loading...",
            });
            loading.present();

            if (this.globals.StripId == '') {
                loading.dismiss();

                let alert = this.alertCtrl.create({
                    title: 'Oops',
                    subTitle: 'Payments not available,please try again',
                    buttons: ['OK']
                });
                alert.present();
            } else {
                this.stripe.setPublishableKey(this.globals.StripId);
                this.stripe.createCardToken(this.cardinfo).then((Token) => {
                    if (this.globals.GainDiscountFlag == true) {
                        this.globals.GainDiscount = 0;
                        this.setDiscount();
                    }
                    var status;
                    if (this.globals.admin_stripe == 'true') {
                        status = 'Gain';
                    } else {
                        status = 'Stripe';
                    }

                    let response = this.server.PaymentThroughStripeReservation(this.instructions, this.amount, Token)
                    response.subscribe(data => {
                        this.data = data;
                        loading.dismiss();

                        if (this.data.success) {
                            let alert = this.alertCtrl.create({
                                title: 'Congratulation',
                                subTitle: this.data.message,
                                buttons: ['OK']
                            });
                            alert.present();

                            this.setArray();
                            if (this.RewardCreditAvailed > 0) {
                                this.RadeemStoreCredit(false);
                            }
                            if (this.BirthdayCreditAvailed > 0) {
                                this.RadeemStoreCredit(true);
                            }
                            if (this.globals.points_availed > 0) {
                                this.RedeemUserPoints();
                            }

                            this.navCtrl.popToRoot();
                        } else {
                            let alert_error = this.alertCtrl.create({
                                title: 'Error',
                                subTitle: this.data.message,
                                buttons: ['OK']
                            });

                            alert_error.present();
                        }
                    }, error => {});
                });
            }
        }
    }

    pay(PaymentData: any) {
        var a = btoa(PaymentData.creditcardno)
        if (!this.PaymentForm.valid) {
            this.submitAttempt = true;
            this.globals.presentToast(' Some values were not given or were incorrect, please fill them');
        } else {
            if (PaymentData.cardinfo == true) {
                this.nativeStorage.setItem('card',
                    {
                        cardno: btoa(PaymentData.creditcardno),
                        exmonth: btoa(PaymentData.expiryMonth),
                        exyear: btoa(PaymentData.expiryYear),
                        cvc: btoa(PaymentData.CVC),
                        check: btoa(PaymentData.cardinfo)
                    }).then(() => console.log('Stored item!'),
                        error => console.error('Error storing item', error)
                    );
            }

            this.cardinfo = {
                number: PaymentData.creditcardno,
                expMonth: PaymentData.expiryMonth,
                expYear: PaymentData.expiryYear,
                cvc: PaymentData.CVC
            }

            let loading = this.loadingCtrl.create({
                content: "Loading...",
            });
            loading.present();

            if (this.globals.authorize_enabled) {
                if (this.globals.GainDiscountFlag == true) {
                    this.globals.GainDiscount = 0;
                    this.setDiscount();
                }
                var status;
                status = 'Authorize';

                if (this.globals.OrderType == "pickup") {
                    this.Address = '';
                }

                let response = this.server.PaymentThroughStripe(this.Address, this.instructions, this.amount, this.order_date, '', status, this.ccFee, this.cardinfo)
                response.subscribe(data => {
                    this.data = data;
                    loading.dismiss();
                    if (this.data.success) {
                        localStorage.removeItem("scheduled_time");
                        this.setArray();
                        if (this.RewardCreditAvailed > 0) {
                            this.RadeemStoreCredit(false);
                        }

                        if (this.BirthdayCreditAvailed > 0) {
                            this.RadeemStoreCredit(true);
                        }

                        if (this.globals.points_availed > 0) {
                            this.RedeemUserPoints();
                        }

                        if (this.globals.BusinessDiscount > 0 && this.globals.availed_discount_count < this.globals.business_discount_count) {
                            this.userBusinessDiscountUpdate();
                        }

                        this.thankyou();
                    } else {
                        this.globals.presentToast(this.data.message)
                    }
                }, error => {});
            } else {
                if (this.globals.StripId == '') {
                    loading.dismiss();

                    let alert = this.alertCtrl.create({
                        title: 'Oops',
                        subTitle: 'Payments not available,please try again',
                        buttons: ['OK']
                    });
                    alert.present();
                } else {
                    this.stripe.setPublishableKey(this.globals.StripId);
                    this.stripe.createCardToken(this.cardinfo).then((Token) => {
                        if (this.globals.GainDiscountFlag == true) {
                            this.globals.GainDiscount = 0;
                            this.setDiscount();
                        }
                        var status;
                        status = 'Stripe';

                        if (this.globals.OrderType == "pickup") {
                            this.Address = '';
                        }
                        let response = this.server.PaymentThroughStripe(this.Address, this.instructions, this.amount, this.order_date, Token, status, this.ccFee)
                        response.subscribe(data => {
                            this.data = data;
                            loading.dismiss();
                            if (this.data.success) {
                                localStorage.removeItem("scheduled_time");
                                this.setArray();
                                if (this.RewardCreditAvailed > 0) {
                                    this.RadeemStoreCredit(false);
                                }
                                if (this.BirthdayCreditAvailed > 0) {
                                    this.RadeemStoreCredit(true);
                                }
                                if (this.globals.points_availed > 0) {
                                    this.RedeemUserPoints();
                                }

                                if (this.globals.BusinessDiscount > 0 && this.globals.availed_discount_count < this.globals.business_discount_count) {
                                    this.userBusinessDiscountUpdate();
                                }

                                this.thankyou();
                            } else {
                                let alert_error = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: this.data.message,
                                    buttons: [
                                        {
                                            text: 'Okay',
                                            handler: data => {

                                            }
                                        }
                                    ]
                                });
                                alert_error.present();
                            }
                        }, error => {});
                    }).catch((data) => {
                        loading.dismiss();
                        let alert = this.alertCtrl.create({
                            title: 'Oops',
                            subTitle: 'Invalid Credentials, please try again',
                            buttons: ['OK']
                        });

                        alert.present();
                    });
                }
            }

        }
    }

    DeliveryConfirm() {
        let alert = this.alertCtrl.create({
            title: 'Payment',
            message: 'Do you want to Pay on Delivey?',
            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }, {
                text: 'Ok',
                handler: () => {
                    this.payment_on_delivery();
                }
            }]
        });
        alert.present();
    }

    creditBox() {
        this.color = 'primary';
        this.color2 = 'appButtons';
        this.creditcard = true;
        this.cash_on_delivery = false;
 
        if (!this.ccFee_added) {
            this.amount = Number(this.amount) + Number(this.ccFee);
            this.ccFee_added = true;
            this.amount = this.amount.toFixed(2)
        }
    }

    deliveryBox() {
        this.color2 = 'primary';
        this.color = 'appButtons';
        this.creditcard = false;
        this.cash_on_delivery = true;

        if (this.ccFee_added) {
            this.amount = Number(this.amount) - Number(this.ccFee);
            this.ccFee_added = false;
            this.amount = this.amount.toFixed(2)

        }
    }

    payment_on_delivery() {
        let loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();

        if (!this.globals.udid) {
            this.globals.udid = this.globals.caos_udid;
        }

        if (this.globals.GainDiscountFlag == true) {
            this.globals.GainDiscount = 0;
            this.setDiscount();
        }
        var status = 'cash';

        if (this.globals.OrderType == "pickup") {
            this.Address = '';
        }

        let response = this.server.PaymentOnDelivery(this.Address, this.instructions, this.amount, this.order_date, '', status)
        response.subscribe(data => {
            this.data = data;
            loading.dismiss();

            if (this.data.success) {
                localStorage.removeItem("scheduled_time");

                this.setArray();
                if (this.RewardCreditAvailed > 0) {
                    this.RadeemStoreCredit(false);
                }

                if (this.BirthdayCreditAvailed > 0) {
                    this.RadeemStoreCredit(true);
                }

                if (this.globals.points_availed > 0) {
                    this.RedeemUserPoints();
                }

                if (this.globals.BusinessDiscount > 0 && this.globals.availed_discount_count < this.globals.business_discount_count) {
                    this.userBusinessDiscountUpdate();
                }

                this.thankyou();
            } else {
                let alert_error = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: this.data.message,
                    buttons: [
                        {
                            text: 'Okay',
                            handler: data => {

                            }
                        }
                    ]
                });
                alert_error.present();
            }
        }, error => { });
    }

    userBusinessDiscountUpdate() {
        this.globals.availed_discount_count++;
        let response = this.server.userBusinessAvailedDiscount();
        response.subscribe(data => {

        }, error => {
            console.log(error);
        });
    }

    FirstimeFlag() {
        this.nativeStorage.getItem('BusinessFirstimeFlag').then(data => {
            this.business_array = data.array;
            if (data.array.indexOf(this.globals.username) == -1) {
                this.business_array.push(this.globals.username)
                this.nativeStorage.setItem('BusinessFirstimeFlag', { array: this.business_array }).then(() => {
                    let modal = this.modalCtrl.create('AddReviewPage', { place: this.globals.business_username });
                    modal.present();
                }).catch((err) => { console.log("nativesstorage", err) });
            }
        }, error => {
            this.business_array.push(this.globals.username)
            this.nativeStorage.setItem('BusinessFirstimeFlag', { array: this.business_array }).then(() => {
                let modal = this.modalCtrl.create('AddReviewPage', { place: this.globals.business_username });
                modal.present();
            }).catch((err) => { console.log("nativesstorage", err) });

        }).catch(err => { console.log(err) });
    }

    RedeemUserPoints() {
        let res = this.server.RedeemUserPoints().subscribe(data => {
            if (data.status != 'true') {
                return false;
            } else {
                this.globals.points_availed = 0;
                return true;
            }
        }, error => {
            console.log(error);
        });
    }

    setDiscount() {
        this.nativeStorage.setItem('discount', { discountValue: this.globals.GainDiscount })
            .then(() => console.log('Stored item!'),
                error => console.error('Error storing item', error));
    }

    setArray() {
        this.globals.Product.length = 0;
        this.globals.order_time = 'now';
        this.globals.myDate = undefined;
        localStorage.setItem("scheduled_time", undefined);

        this.nativeStorage.setItem('Product', { array: this.globals.Product }).then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
        );
    }

    Savecreditcard() {
        console.log(this.PaymentForm.value.cardinfo);
    }

    thankyou() {
        this.globals.bussinessId = this.globals.new_id;
        this.globals.username = this.globals.business_username
        this.navCtrl.push('ThankyouPage')
    }

    getCreditCard() {
        this.nativeStorage.getItem('card').then(data => {
            this.PaymentForm.get('creditcardno').setValue(atob(data.cardno));
            this.PaymentForm.get('expiryMonth').setValue(atob(data.exmonth));
            this.PaymentForm.get('expiryYear').setValue(atob(data.exyear));
            this.PaymentForm.get('CVC').setValue(atob(data.cvc));
            this.PaymentForm.get('cardinfo').setValue(atob(data.check));
        }).catch(err => console.log);
    }

    cancel() {
        this.navCtrl.popToRoot();
    }

    getAddress() {
        this.Address;
    }

}

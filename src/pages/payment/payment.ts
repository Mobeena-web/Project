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
    // pickup: any;
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
    ProcessData:any;
    orderId: any;
    orderStatus: any;
    payapalresponse: any;
    // data: any;
    cashpay: any = 0;
    // submitAttempt: boolean = false;
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
    orderType : any ;
    cash_on_delivery:any;
    gift_falg:boolean = false;
    gift_data:any;
    instructions: any = { "Type": '', "BusinessDiscount": 0, "GainDiscount": 0, "StoreCredit": 0, "Tip": 0, "Points": 0, "Notes": '',"giftcard":'' };

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
    constructor(public server: ServerProvider, public modalCtrl: ModalController, private nativeStorage: NativeStorage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public globals: GlobalVariable, public viewCtrl: ViewController, private app: App, public formBuilder: FormBuilder, public stripe: Stripe, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
       
        this.cashpay = this.navParams.get('amount');
        this.storevalue = this.navParams.get('StoreCredit');
        console.log("time", this.globals.estimated_time);
        this.estTime = this.globals.estimated_time;
        this.Deliver = navParams.get('deliver');
        this.pickup = navParams.get('pickup');
        this.orderType = this.globals.OrderType;
        console.log("deliver",this.Deliver, "pickup",this.pickup);
        console.log(this.globals.paypalId, "paypalId");
        this.RewardCreditAvailed = navParams.get('RewardAvailed');
        this.BirthdayCreditAvailed = navParams.get('BirthdayCreditavailed');
        
        this.Address =localStorage.getItem("GetAddress");
        console.log("checking address" , this.Address);
        if (!this.globals.paypalId) {
            this.creditcard = true;
        }
        if (this.globals.type == 'reservation') {
            this.pay_on_venue = true;
            this.creditcard = false;
            this.paypal = false;
        }
        if(this.globals.card_enabled){
            this.creditcard = true;
           
        }
        else{
            this.cash_on_delivery = true;
           
        }


        this.Tip = navParams.get('tip');
        this.ProcessForm = formBuilder.group({
              Address: ['', Validators.compose([Validators.required])],
            // zipcode: ['', Validators.compose([Validators.required])],
            // city: ['', Validators.compose([Validators.required])],
            // state: ['', Validators.compose([Validators.required])],
            // addresscheck: [false]
        })
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
            var date = new Date()
            var date1 = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();

            console.log("offset", this.date.getTimezoneOffset);

            this.myDate = date1;
            //     console.log(new Date().toLocaleString('en-US', { hour12: false }));

            // var d = new Date().toLocaleString('en-US', { hour12: false });
            // this.myDate = new Date(d).toISOString();
            console.log("date",this.myDate);


        }
        console.log(this.value);
      
        this.amount = this.navParams.get('amount');
        this.amount = Number(this.amount) ;
        console.log("tip added ",this.amount);
        //this.Address = this.navParams.get('Address');
        console.log("adress",this.Address);
        this.order_date = localStorage.getItem("scheduled_time");
        console.log("order_date", this.order_date);
        this.PaymentForm = formBuilder.group({
            creditcardno: ['', Validators.compose([Validators.minLength(15), Validators.maxLength(16), Validators.pattern('[0-9]*'), Validators.required])],
            expiryMonth: ['', Validators.compose([Validators.required])],
            expiryYear: ['', Validators.compose([Validators.required])],
            CVC: ['', Validators.compose([Validators.required])],
            cardinfo: [false]
        })

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

        if(this.gift_falg){
            
            this.payment_on_delivery();
        }
        

    }

    login_kiosk(){
        let modal = this.modalCtrl.create('LoginPage');
         modal.present();
    }



    ionViewDidLoad() {
        console.log('ionViewDidLoad PaymentPage');
    }
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
    paymentThroughPayOnVenue() {
        let loading = this.loadingCtrl.create({
            content: "Loading...",

        });
        loading.present();

        let response = this.server.PaymentThroughPayOnVenue(this.instructions, this.cashpay);
        response.subscribe(data => {

            this.data = data;
            console.log(this.data);
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

            }
            else {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Please try again',
                    buttons: ['OK']
                });
                alert.present();


            }
            // console.log(this.data.categories);

            console.log("data", this.data);
        }, error => {
            console.log("Error!");

        });

    }

    process() {
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
        }
    // }
    ConfirmOrder() {

        let loading = this.loadingCtrl.create({
            content: "Loading...",

        });
        loading.present();
        if (this.globals.GainDiscountFlag == true) {
            this.globals.GainDiscount = 0;
            this.setDiscount();
        }

        console.log(this.orderStatus, "orderstatus");
        let response;
        if (this.globals.type == 'reservation') {
            response = this.server.OrderConfirmationThroughPaypalReservation(this.orderStatus, this.orderId);
        }
        else {
            response = this.server.OrderConfirmationThroughPaypal(this.orderStatus, this.orderId);
        }

        response.subscribe(data => {
            this.data = data;

            loading.dismiss();
            console.log(this.data);
            if (this.data.success) {
                this.setArray();
                this.navCtrl.setRoot(HomePage);
                if (this.globals.BusinessDiscount > 0 && this.globals.availed_discount_count < this.globals.business_discount_count) {
                    this.userBusinessDiscountUpdate();
                }

                // let alert = this.alertCtrl.create({
                //     title: 'Congratulation',
                //     subTitle: 'Your order has been sucessfully placed.',
                //     buttons: ['Okay']
                // });
                // alert.present();
                this.thankyou();


            }
            else {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Oops,something went wrong.please contact our Business',
                    buttons: ['Okay']
                });
                alert.present();


            }
        }, error => {
            console.log("Error!");

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

        }
        else {
            console.log("oder status function ", this.instructions);
            response = this.server.OrderStatusThroughPaypal(this.Address, this.instructions, this.myDate, this.cashpay);

        }


        response.subscribe(data => {

            this.data = data;
            console.log(this.data);
            loading.dismiss();
            if (this.data.success) {
                this.orderStatus = this.data.success;
                this.orderId = this.data.orderId;
                console.log(this.orderId);


                //this.Paypal(this.data.orderId)
            }
            else {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Please try again',
                    buttons: ['OK']
                });
                alert.present();


            }
            // console.log(this.data.categories);

            console.log("data", this.data);
        }, error => {
            console.log("Error!");

        });
    }

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

    Instruction() {
        console.log("bussines disscount flag", this.globals.BusinessDiscountFlag)
            console.log("instruction type checking")
        if (this.orderType == 'delivery') {

            this.instructions.Type = 'Delivery';
        }
        if (this.orderType == 'pickup') {
            console.log("pickup hello");

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
        console.log(this.gift_data,"ko")
        if(this.gift_data.length > 0){
            this.instructions.giftcard = this.gift_data;
        }

        console.log(this.instructions);

    }




    RadeemStoreCredit(flag) {


        let response = this.server.LotteryRedeeem(this.StorePoint, flag);

        response.subscribe(data => {

            var response = data.json();
            console.log(response);


        }, error => { console.log(error) });

    }

    payment_type(PaymentData) {
        if(!this.globals.udid){
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
    }

    pay_reservation(PaymentData: any) {

        var a = btoa(PaymentData.creditcardno)
        console.log("encode", a);
        console.log("decode", atob(a));
        console.log(PaymentData.creditcardno);
        if (!this.PaymentForm.valid) {
            this.submitAttempt = true;
            console.log(' Some values were not given or were incorrect, please fill them');
        } else {

            console.log("paymentcard", PaymentData.cardinfo);
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

            console.log(this.cardinfo);
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
            }
            else {
                console.log(this.order_date);



                this.stripe.setPublishableKey(this.globals.StripId);
                this.stripe.createCardToken(this.cardinfo).then((Token) => {
                    console.log("final-token", Token);
                    console.log("final-token", Token);

                    // var data = 'stripetoken=' + token + '&amount=50';
                    if (this.globals.GainDiscountFlag == true) {
                        this.globals.GainDiscount = 0;
                        this.setDiscount();
                    }
                    var status;
                    if (this.globals.admin_stripe == 'true') {
                        status = 'Gain';
                    }
                    else {
                        status = 'Stripe';
                    }

                    let response = this.server.PaymentThroughStripeReservation(this.instructions, this.amount, Token)
                    console.log("response without json", response);
                    response.subscribe(data => {
                        console.log("data without json", data);
                        this.data = data;
                        loading.dismiss();
                        // console.log(this.data.categories);

                        console.log("data", this.data);

                        if (this.data.success) {

                            let alert = this.alertCtrl.create({
                                title: 'Congratulation',
                                subTitle: this.data.message,
                                buttons: ['OK']
                            });
                            alert.present();
                            // this.thankyou();

                            this.setArray();
                            if (this.RewardCreditAvailed > 0) {
                                console.log(" lottery availed");
                                this.RadeemStoreCredit(false);
                            }
                            if (this.BirthdayCreditAvailed > 0) {
                                console.log("birthday availed");
                                this.RadeemStoreCredit(true);
                            }
                            if (this.globals.points_availed > 0) {
                                console.log("points availed");

                                this.RedeemUserPoints();
                            }


                            this.navCtrl.popToRoot();



                        }

                        else {
                            let alert_error = this.alertCtrl.create({
                                title: 'Error',
                                subTitle: this.data.message,
                                buttons: ['OK']
                            });

                            alert_error.present();


                        }

                    }
                        , error => {
                            console.log("Error!");
                            console.log("this is our error", error);

                        });

                })
            }
        }
    }

    pay(PaymentData: any) {

        var a = btoa(PaymentData.creditcardno)
        console.log("encode", a);
        console.log("decode", atob(a));
        console.log(PaymentData.creditcardno);
        if (!this.PaymentForm.valid) {
            this.submitAttempt = true;
            console.log(' Some values were not given or were incorrect, please fill them');
        } else {

            console.log("paymentcard", PaymentData.cardinfo);
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

            console.log(this.cardinfo);
            let loading = this.loadingCtrl.create({
                content: "Loading...",

            });
            loading.present();
            console.log(this.globals.authorize_enabled,this.globals.admin_stripe_enabled,"p")
            if(this.globals.authorize_enabled){
                if (this.globals.GainDiscountFlag == true) {
                    this.globals.GainDiscount = 0;
                    this.setDiscount();
                }
                var status;
                  status = 'Authorize';
                
                console.log(" pass instrunctions in strip function", this.instructions);
                if(this.globals.OrderType == "pickup"){
                    this.Address = '';
                }
                let response = this.server.PaymentThroughStripe(this.Address, this.instructions, this.amount, this.order_date, '', status,this.cardinfo)
                console.log( this.Address, this.instructions, this.amount, this.order_date, '', status,this.cardinfo);
                console.log("response without json", response);
                response.subscribe(data => {
                    console.log("data without json", data);
                    this.data = data;
                    loading.dismiss();
                    // console.log(this.data.categories);

                    console.log("data", this.data);

                    if (this.data.success) {
                        localStorage.removeItem("GetAddress");
                        localStorage.removeItem("scheduled_time");

                        

                        this.setArray();
                        if (this.RewardCreditAvailed > 0) {
                            console.log("lottery availed");

                            this.RadeemStoreCredit(false);
                        }
                        if (this.BirthdayCreditAvailed > 0) {
                            console.log("birthday availed");
                            this.RadeemStoreCredit(true);
                        }
                        if (this.globals.points_availed > 0) {
                            console.log("point availed");

                            this.RedeemUserPoints();
                        }

                        if (this.globals.BusinessDiscount > 0 && this.globals.availed_discount_count < this.globals.business_discount_count) {
                            this.userBusinessDiscountUpdate();
                        }

                        this.thankyou();

                    }

                    else {
                        this.globals.presentToast(this.data.message)
                    }

                }
                    , error => {
                        console.log("Error!");
                        console.log("this is our error", error);

                    });
            }
            else{
                if (this.globals.StripId == '') {
                    loading.dismiss();
    
                    let alert = this.alertCtrl.create({
                        title: 'Oops',
                        subTitle: 'Payments not available,please try again',
                        buttons: ['OK']
                    });
    
                    alert.present();
                }
                else {
                    
    
                    this.stripe.setPublishableKey(this.globals.StripId);
                    this.stripe.createCardToken(this.cardinfo).then((Token) => {
                       // var data = 'stripetoken=' + token + '&amount=50';
                        if (this.globals.GainDiscountFlag == true) {
                            this.globals.GainDiscount = 0;
                            this.setDiscount();
                        }
                        var status;
                        status = 'Stripe';
                        
                        console.log(" pass instrunctions in strip function", this.instructions);
                        if(this.globals.OrderType == "pickup"){
                            this.Address = '';
                        }
                        let response = this.server.PaymentThroughStripe(this.Address, this.instructions, this.amount, this.order_date, Token, status)
                        console.log("response without json", response);
                        response.subscribe(data => {
                            console.log("data without json", data);
                            this.data = data;
                            loading.dismiss();
                            // console.log(this.data.categories);
    
                            console.log("data", this.data);
    
                            if (this.data.success) {
                                localStorage.removeItem("GetAddress");
                                localStorage.removeItem("scheduled_time");
    
                                
    
                                this.setArray();
                                if (this.RewardCreditAvailed > 0) {
                                    console.log("lottery availed");
    
                                    this.RadeemStoreCredit(false);
                                }
                                if (this.BirthdayCreditAvailed > 0) {
                                    console.log("birthday availed");
                                    this.RadeemStoreCredit(true);
                                }
                                if (this.globals.points_availed > 0) {
                                    console.log("point availed");
    
                                    this.RedeemUserPoints();
                                }
    
                                if (this.globals.BusinessDiscount > 0 && this.globals.availed_discount_count < this.globals.business_discount_count) {
                                    this.userBusinessDiscountUpdate();
                                }
    
                                this.thankyou();
    
                                //this.FirstimeFlag();
    
                            }
    
                            else {
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
    
                        }
                            , error => {
                                console.log("Error!");
                                console.log("this is our error", error);
    
                            });
    
                    }).catch((data) => {
                        loading.dismiss();
                        let alert = this.alertCtrl.create({
                            title: 'Oops',
                            subTitle: 'Invalid Credentials,please try again',
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
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Ok',
              handler: () => {
                this.payment_on_delivery();
              }
            }
          ]
        });
        alert.present();
      }

      creditBox(){
          this.cash_on_delivery = false;
          this.paypal = false;
      }
      deliveryBox(){
          this.creditcard = false;
          this.paypal = false;

      }
      paypalbox(){
        this.creditcard = false;
        this.cash_on_delivery = false;


      }

    payment_on_delivery(){
       
            let loading = this.loadingCtrl.create({
                content: "Loading...",

            });
            loading.present();
            if(!this.globals.udid){
                this.globals.udid = this.globals.caos_udid;
            }
               
                    // var data = 'stripetoken=' + token + '&amount=50';
                    if (this.globals.GainDiscountFlag == true) {
                        this.globals.GainDiscount = 0;
                        this.setDiscount();
                    }
                    var status = 'cash';
                    
                    console.log(" pass instrunctions in strip function", this.instructions);
                    if(this.globals.OrderType == "pickup"){
                        this.Address = '';
                    }
                    let response = this.server.PaymentOnDelivery(this.Address, this.instructions, this.amount, this.order_date, '', status)
                    response.subscribe(data => {
                        console.log("data without json", data);
                        this.data = data;
                        loading.dismiss();
         
                       
                        if (this.data.success) {
                            localStorage.removeItem("GetAddress");
                            localStorage.removeItem("scheduled_time");

                            // let alert = this.alertCtrl.create({
                            //     title: 'Congratulation',
                            //     subTitle: this.data.message,
                            //     buttons: ['OK']
                            // });
                            // alert.present();

                            this.setArray();
                            if (this.RewardCreditAvailed > 0) {
                                console.log("lottery availed");

                                this.RadeemStoreCredit(false);
                            }
                            if (this.BirthdayCreditAvailed > 0) {
                                console.log("birthday availed");
                                this.RadeemStoreCredit(true);
                            }
                            if (this.globals.points_availed > 0) {
                                console.log("point availed");

                                this.RedeemUserPoints();
                            }

                            if (this.globals.BusinessDiscount > 0 && this.globals.availed_discount_count < this.globals.business_discount_count) {
                                this.userBusinessDiscountUpdate();
                            }

                            this.thankyou();

                            //this.FirstimeFlag();

                        }

                        else {
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

                    }
                        , error => {
                            console.log("Error!");
                            console.log("this is our error", error);

                        });

    }


    userBusinessDiscountUpdate() {
        this.globals.availed_discount_count++;
        let response = this.server.userBusinessAvailedDiscount();
        response.subscribe(data => {
            console.log(data);

        }, error => {
            console.log(error);
        });

    }
    FirstimeFlag() {
        this.nativeStorage.getItem('BusinessFirstimeFlag')
            .then(data => {
                this.business_array = data.array;
                console.log(data.array);

                if (data.array.indexOf(this.globals.username) == -1) {

                    this.business_array.push(this.globals.username)
                    this.nativeStorage.setItem('BusinessFirstimeFlag',
                        {
                            array: this.business_array

                        }).then(() => {
                            let modal = this.modalCtrl.create('AddReviewPage', { place: this.globals.business_username});
                            modal.present();
                        })
                        .catch((err) => { console.log("nativesstorage", err) });

                }

            }, error => {
                //we don't have the user data 
                console.log("no data");

                this.business_array.push(this.globals.username)
                this.nativeStorage.setItem('BusinessFirstimeFlag',
                    {
                        array: this.business_array

                    }).then(() => {
                        let modal = this.modalCtrl.create('AddReviewPage', { place: this.globals.business_username});
                        modal.present();

                    })
                    .catch((err) => { console.log("nativesstorage", err) });

            }).catch(err => { console.log(err) });
    }

    RedeemUserPoints() {


        let res = this.server.RedeemUserPoints()
            .subscribe(data => {

                console.log(data);

                if (data.status != 'true') {

                    return false;
                }
                else {
                    this.globals.points_availed = 0;
                    return true;
                }


            }, error => {
                console.log(error);

            })
    }




    setDiscount() {
        this.nativeStorage.setItem('discount', { discountValue: this.globals.GainDiscount })
            .then(() => console.log('Stored item!'),
                error => console.error('Error storing item', error));
    }
    setArray() {
        this.globals.Product.length = 0;
        this.nativeStorage.setItem('Product', { array: this.globals.Product })
            .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)


            );
    }

    Savecreditcard() {


        console.log(this.PaymentForm.value.cardinfo);
    }
    thankyou(){
        // let modal = this.modalCtrl.create('ThankyouPage');
        // modal.present();
        this.globals.bussinessId = this.globals.new_id;
         this.globals.username = this.globals.business_username
        this.navCtrl.push('ThankyouPage')
    }




    getCreditCard() {
        this.nativeStorage.getItem('card')
            .then(data => {

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
        // this.nativeStorage.getItem('address')
        //     .then(data => {

        //         this.ProcessForm.get('Address').setValue(data.address);
        //         this.ProcessForm.get('zipcode').setValue(data.zipcode);
        //         this.ProcessForm.get('city').setValue(data.city);
        //         this.ProcessForm.get('state').setValue(data.state);
        //         this.ProcessForm.get('addresscheck').setValue(data.check);

        //     }).catch(err => console.log);
        this.Address;

    }

}

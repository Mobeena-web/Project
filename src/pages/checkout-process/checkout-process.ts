import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController,ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { GlobalVariable } from "../../app/global";
import { Http } from '@angular/http';
import { HomePage } from "../home/home";
import { NativeStorage } from "@ionic-native/native-storage";
import { ServerProvider } from "../../providers/server/server";

/**
* Generated class for the CheckoutProcessPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
    selector: 'page-checkout-process',
    templateUrl: 'checkout-process.html',
})
export class CheckoutProcessPage {
    BirthdayCreditAvailed: any;
    RewardCreditAvailed: any;
    business_array: any = new Array();
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

    orderId: any;
    orderStatus: any;
    payapalresponse: any;
    data: any;
    cashpay: any = 0;
    submitAttempt: boolean = false;
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
    instructions: any = { "Type": '', "BusinessDiscount": 0, "GainDiscount": 0, "StoreCredit": 0, "Tip": 0, "Points": 0, "Notes": '' };

    month_array: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    constructor(public modalCtrl: ModalController,public server: ServerProvider, private nativeStorage: NativeStorage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: Http, public globals: GlobalVariable, private payPal: PayPal, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
        this.cashpay = this.navParams.get('amount');
        this.storevalue = this.navParams.get('StoreCredit');
        console.log("time", this.globals.estimated_time);
        this.estTime = this.globals.estimated_time;
        this.Deliver = navParams.get('deliver');
        this.pickup = navParams.get('pickup');
        console.log("deliver",this.Deliver, "pickup",this.pickup);
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
            console.log(this.myDate);


        }
        console.log(this.value);
    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad CheckoutProcessPage');
        console.log(this.cashpay);

    }

    delivernowbox() {
        console.log("delivernow")
        if (this.deliver_now == false) {
            this.Schedule_deliver = true;
        }
        else {
            this.Schedule_deliver = false;
        }

    }

    scheduleDeliverbox() {

        if (this.Schedule_deliver == false) {
            this.deliver_now = true
        }
        else {
            this.deliver_now = false
        }

    }




    Instruction() {
        console.log("bussines disscount flag", this.globals.BusinessDiscountFlag)

        if (this.Deliver == true) {

            this.instructions.Type = 'Delivery';
        }
        if (this.pickup == true) {
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

        console.log(this.instructions);

    }




    checkTiming() {


        if (this.Schedule_deliver == false) {
            if (this.globals.Timing) {
                let local_datetime = new Date().toLocaleString('en-US', { hour12: false });
                this.date = new Date(local_datetime);
                console.log("",this.date);

                this.day = this.date.getDay();
                this.time = this.date.getHours();
                this.minutes = this.date.getMinutes();
                this.time = this.time + "." + this.minutes;
                console.log("day", "hours", this.day, this.time);
                var current_day = this.globals.Timing[this.day];
                this.time = this.time.toString();
                console.log(this.time,"current day", current_day);
                console.log(this.globals.Timing);
                if (current_day[0] != 'opened') {
                    if (Number(this.time) <= Number(current_day[0]) || Number(this.time) >= Number(current_day[1]) || current_day[0] == 'closed') {
                        let alert = this.alertCtrl.create({
                            title: 'Sorry',
                            subTitle: 'Restaurants currently closed.',
                            buttons: ['OK']
                        });
                        alert.present();
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
                        let alert = this.alertCtrl.create({
                            title: 'Sorry',
                            subTitle: 'Restaurants closed on the given time and date.',
                            buttons: ['OK']
                        });

                        alert.present();
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
    }

    process(ProcessData: any) {
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
                } else {

                    if (ProcessData.addresscheck == true) {
                        this.nativeStorage.setItem('address',
                            {
                                address: ProcessData.Address,
                                zipcode: ProcessData.zipcode,
                                city: ProcessData.city,
                                state: ProcessData.state,
                                check: ProcessData.addresscheck
                            }).then(() => console.log('Stored item!'),
                                error => console.error('Error storing item', error)
                            );
                    }

                    if (this.creditcard == true) {
                        // this.RedeemUserPoints();
                        this.navCtrl.push('PaymentPage', { Address: ProcessData.Address , amount: Number(this.cashpay), Date: localStorage.getItem("scheduled_time"), StoreAmount: this.storevalue, instruction: this.instructions });

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
    }
    paymentThroughPayOnVenue() {
        let loading = this.loadingCtrl.create({
            content: "loading...",

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



    paypalbox() {

        console.log("paypal", this.paypal);

        if (this.paypal == true) {
            this.creditcard = false;
            this.pay_on_venue = false;
        }

    }

    creditcardbox() {
        console.log("creditcard", this.creditcard);

        if (this.creditcard == true) {

            this.paypal = false;
            this.pay_on_venue = false;

        }

    }
    payonVenueBox() {
        if (this.pay_on_venue == true) {
            this.paypal = false;
            this.creditcard = false;
        }

    }

    OrderStatus(ProcessData: any) {

        let loading = this.loadingCtrl.create({
            content: "loading...",

        });
        loading.present();
        let response;
        if (this.globals.type == 'reservation') {
            response = this.server.OrderStatusThroughPaypalReservation(this.instructions, this.cashpay);

        }
        else {
            response = this.server.OrderStatusThroughPaypal(ProcessData, this.instructions, this.myDate, this.cashpay);

        }


        response.subscribe(data => {

            this.data = data;
            console.log(this.data);
            loading.dismiss();
            if (this.data.success) {
                this.orderStatus = this.data.success;
                this.orderId = this.data.orderId;
                console.log(this.orderId);


                this.Paypal(this.data.orderId)
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

    RadeemStoreCredit(flag) {
        var value;
        if (flag == true) {
            value = this.BirthdayCreditAvailed;
        }
        else {
            value = this.RewardCreditAvailed;
        }
        let response = this.server.LotteryRedeeem(value, flag)
        response.subscribe(data => {

            var response = data;
            console.log(response);

        }, error => { console.log(error) });

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


    Paypal(id) {


        console.log("id", id);
        this.globals.OrderId = id;
        if (this.globals.paypalId == '') {
            let alert = this.alertCtrl.create({
                title: 'Oops',
                subTitle: 'Payments not available,please try again',
                buttons: ['OK']
            });
            alert.present();
        }
        else {

            this.payPal.init({
                PayPalEnvironmentProduction: '',
                PayPalEnvironmentSandbox: this.globals.paypalId
            }).then(() => {
                // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
                this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
                    // Only needed if you get an "Internal Service Error" after PayPal login!
                    //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
                })).then(() => {
                    let payment = new PayPalPayment(this.cashpay.toString(), 'USD', 'Order no:' + id.toString(), 'sale');
                    this.payPal.renderSinglePaymentUI(payment).then((data) => {
                        // Successfully paid
                        console.log(data);
                        // Example sandbox response
                        //
                        this.payapalresponse = data;

                        console.log(this.payapalresponse);
                        console.log(this.payapalresponse.response.state);

                        if (this.payapalresponse.response.state == 'approved') {
                            this.ConfirmOrder();
                            if (this.RewardCreditAvailed > 0) {
                                this.RadeemStoreCredit(false);
                            }
                            if (this.BirthdayCreditAvailed > 0) {
                                this.RadeemStoreCredit(true);
                            }
                            if (this.globals.points_availed > 0) {
                                let points = this.RedeemUserPoints();
                            }
                            this.FirstimeFlag();

                        }

                        else {

                            let alert = this.alertCtrl.create({
                                title: 'Error',
                                subTitle: 'Please Try again',
                                buttons: ['OK']
                            });
                            alert.present();

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
                    }, () => {
                        // Error or render dialog closed without being successful
                    });
                }, () => {
                    // Error in configuration
                });
            }, () => {
                // Error in initialization, maybe PayPal isn't supported or something else
            });

        }
    }
    RedeemUserPoints() {
        if (this.globals.points_availed > 0) {

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
    }


    ConfirmOrder() {

        let loading = this.loadingCtrl.create({
            content: "loading...",

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

                let alert = this.alertCtrl.create({
                    title: 'Congratulation',
                    subTitle: 'Your order has been sucessfully placed.',
                    buttons: ['Okay']
                });
                alert.present();


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

    userBusinessDiscountUpdate() {
        this.globals.availed_discount_count++;
        let response = this.server.userBusinessAvailedDiscount();
        response.subscribe(data => {
            console.log(data);

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
        this.nativeStorage.setItem('Product', { array: this.globals.Product })
            .then(


                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)


            );
    }
    addressSame() {

        console.log("same1", this.ProcessForm.value.sameAddress);


        if (this.ProcessForm.value.sameAddress == true) {

            this.ProcessForm.value.billingAddress = this.ProcessForm.value.Address;
            this.ProcessForm.get('billingAddress').setValue(this.ProcessForm.value.Address);


        }
        else {

            this.ProcessForm.get('billingAddress').setValue(null);


        }




    }



    getAddress() {
        this.nativeStorage.getItem('address')
            .then(data => {

                this.ProcessForm.get('Address').setValue(data.address);
                this.ProcessForm.get('zipcode').setValue(data.zipcode);
                this.ProcessForm.get('city').setValue(data.city);
                this.ProcessForm.get('state').setValue(data.state);
                this.ProcessForm.get('addresscheck').setValue(data.check);

            }).catch(err => console.log);

    }

    cancel() {

        this.globals.Product.length = 0;
        this.navCtrl.popToRoot();

    }

}

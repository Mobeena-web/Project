import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ServerProvider } from '../../providers/server/server';
import { GlobalVariable } from '../../app/global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';
import { EmailValidator } from '../../validators/email';
import { MainTabsPage } from '../main-tabs/main-tabs';
import { IntroPage3Page } from '../intro-page3/intro-page3';

declare var FB: any;

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    submitAttempt: boolean = false;
    loginForm: FormGroup;
    data: any;
    // ID: any;
    // date: any;
    places = [];
    constructor(public viewCtrl: ViewController, public server: ServerProvider, public globals: GlobalVariable, private nativeStorage: NativeStorage, public modalCtrl: ModalController, public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public formBilder: FormBuilder
    ) {


        this.loginForm = formBilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        })
        this.data = {};

        this.data.response = '';

    }



    createAccount() {
        this.navCtrl.push(IntroPage3Page);
    }

    register() {
        this.navCtrl.push(IntroPage3Page)
    }


    login(LoginData: any) {

        if (!this.loginForm.valid) {
            this.submitAttempt = true;
            console.log(' Some values were not given or were incorrect, please fill them');
        } else {
            let loading = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loading.present();
            let response = this.server.LoginData(LoginData);
            response.subscribe(data => {
                loading.dismiss();
                this.data.response = data;

                if (this.data.response != "invalid") {
                    this.globals.guess_login = false;
                    this.globals.udid = this.data.response.udid;

                    this.globals.firstName = this.data.response.firstname;
                    this.globals.lastName = this.data.response.lastname;
                    this.globals.Email = LoginData.email;
                    if (this.globals.caos_flag) {

                        this.viewCtrl.dismiss();
                    }
                    else {
                        // this.navCtrl.setRoot(HomePage, { imageData: this.data.response.url, Flag: false });

                        this.nativeStorage.setItem('user',
                            {
                                email: LoginData.email,
                                udid: this.data.response.udid,
                                firstName: this.data.response.firstname,
                                lastName: this.data.response.lastname,
                                phone: this.data.response.phone,
                                password: LoginData.password,
                                image: this.data.response.url,
                                ID: this.data.response.id,
                                date: this.data.response.date_joined,
                                phone_verify: this.data.response.phone_verified,
                                birthday: this.data.response.birthday,
                                aniversary: this.data.response.anniversary

                            }).then(() => {
                                this.list();
                                this.SaveMobileNumberFlag(this.data.response.mobile_verification_amount, this.data.response.phone_verified);
                                this.server.initializePushToken();
                                if (this.globals.caos_flag) {

                                    this.navCtrl.push('CartPage')
                                }
                                else {
                                    this.navCtrl.setRoot(HomePage, { imageData: this.data.response.url, Flag: false });

                                }

                            })
                            .catch((err) => {
                                console.log("nativesstorage", err)

                                this.SaveMobileNumberFlag(this.data.response.mobile_verification_amount, this.data.response.phone_verified);

                                if (this.globals.caos_flag) {

                                    this.navCtrl.push('CartPage')
                                }
                                else {
                                    this.navCtrl.setRoot(HomePage, { imageData: this.data.response.url, Flag: false });

                                }
                                this.server.initializePushToken();
                            });


                    }


                }
                else {

                    this.globals.presentToast("Invalid Email or Password")

                }
            }, error => {

                this.globals.presentToast("Something went wrong check your internet connection.")


            });
        }
    }

    verify() {
        let verifyModal = this.modalCtrl.create('VerificationPage');
        verifyModal.present();
    }
    OpenTermsAndPolicy() {
        this.navCtrl.push('TermAndPolicyPage');
    }


    SaveMobileNumberFlag(amount, flag) {
        this.globals.MobileDiscount = Number(amount);
        console.log("MobileDisocunt", this.globals.MobileDiscount);

        this.nativeStorage.setItem('MobileFlagSave', {
            MobileFlag: flag,
            MobileDiscount: Number(amount)
        }).then(

            () => {
                console.log('Stored mobileflag')

            },
            error => console.error('Error storing item', error)
        );
    }

    list() {
        let response = this.server.getRestaurantslist('100000', 'main', "0,0", '0', 'order');
        response.subscribe(data => {
            this.places = data.results;
            var new_id = this.globals.new_id;
            this.globals.business_list = this.places;
            this.places = this.places.filter(function (item) {
                return item.business_id === new_id;
            });
            this.globals.point_check = this.places[0].points_enabled;
            this.globals.punch_check = this.places[0].punches_enabled;
            this.globals.special_offer = this.places[0].special_offer;
            this.globals.events_enabled = this.places[0].events_enabled;
            this.globals.gallery_enabled = this.places[0].gallery_enabled;
            this.globals.pickup = this.places[0].pickup;
            this.globals.latitude = this.places[0].latitude;
            this.globals.longitude = this.places[0].longitude;
            this.globals.hours_operation = this.places[0].hours_operation;
            this.globals.branch_enabled = this.places[0].branch_enabled;
            this.globals.giftcard_enabled = this.places[0].giftcard_enabled;
            this.globals.b_logo = this.places[0].logo;
            this.globals.home_logo = this.places[0].logo;
            this.globals.StripId = this.places[0].stripe_id;
            this.globals.order_instructions = this.places[0].instructions_enabled;
            this.globals.pickup_timing = this.places[0].pickup_timing;
            this.globals.delivery_timing = this.places[0].delivery_timing;
            this.globals.business_username = this.places[0].username;
            this.globals.estimated_time = this.places[0].delivery_time;
            this.globals.business_discount_count = parseInt(this.places[0].business_discount_count);
            this.globals.username = this.places[0].username;
            this.globals.bussinessId = this.places[0].business_id;
            this.globals.admin_stripe = this.places[0].admin_stripe_enabled;
            this.globals.pickupsetting = this.places[0].delivery_time;
            this.globals.tax = this.places[0].tax;
            this.globals.deliveryCharges = this.places[0].delivery_fee;
            this.globals.pickup_Time = this.places[0].pickup_time;
            this.globals.minimun_order = parseInt(this.places[0].minimum_order);
            this.globals.availed_discount_count = parseInt(this.places[0].customer_discount_availed_count);
            this.globals.paypalId = this.places[0].paypal_id;
            this.globals.Timing = this.places[0].hours_operation;
            this.globals.specific_delivery_day = this.places[0].specific_delivery_day;
            this.globals.review_enabled = this.places[0].review_enabled;
            this.globals.delivery_day = this.places[0].delivery_day;
            this.globals.authorize_enabled = this.places[0].authorize_enabled;
            this.globals.card_enabled = this.places[0].card_enabled;
            this.globals.admin_stripe_enabled = this.places[0].admin_stripe_enabled;
            this.globals.catering_enabled = this.places[0].catering_enabled;
            this.globals.catering_cart_enabled = this.places[0].catering_cart_enabled;
            this.globals.giftcard_amount_limit = this.places[0].giftcard_limit;
            this.globals.business_type = this.places[0].business_type;
            this.globals.orders_enabled = this.places[0].orders_enabled;


            if (this.globals.pickup == '1') {
                this.globals.pickup = true;
            }
            else {
                this.globals.pickup = false;
            }
            if (this.places[0].delivery == '1') {
                this.globals.delivery = true;
            }
            else {
                this.globals.delivery = false;
            }
            if (this.places[0].cash_enabled == '1') {
                this.globals.cash_enabled = true;
            }
            else {
                this.globals.cash_enabled = false;

            }
            if (this.globals.pickup == '1') {
                this.globals.pickup = true;
            }
            else {
                this.globals.pickup = false;
            }
            if (this.places[0].delivery == '1') {
                this.globals.delivery = true;
            }
            else {
                this.globals.delivery = false;
            }


        }, error => {
            this.globals.presentToast("Something went wrong check your internet connection.")


        });

    }



}

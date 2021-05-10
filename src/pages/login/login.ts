import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';
import { GooglePlus } from '@ionic-native/google-plus';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { EmailValidator } from '../../validators/email';

import { HomePage } from '../home/home';
import { ServerProvider } from '../../providers/server/server';
import { GlobalVariable } from '../../app/global';
import { MainTabsPage } from '../main-tabs/main-tabs';
import { IntroPage3Page } from '../intro-page3/intro-page3';

declare var FB: any;
declare var cordova: any;

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    submitAttempt: boolean = false;
    loginForm: FormGroup;
    phoneLoginForm: FormGroup;
    data: any;
    places = [];
    login_type = 'email';
    pos_customer: boolean = false;
    phone: any;
    code = '+1';
    profile_complete: any;

    constructor(public viewCtrl: ViewController, public server: ServerProvider, 
        public globals: GlobalVariable, private nativeStorage: NativeStorage, 
        public modalCtrl: ModalController, public navCtrl: NavController,
        public navParams: NavParams, private googlePlus: GooglePlus,
        public loadingCtrl: LoadingController, 
        // private fb: Facebook,
        public alertCtrl: AlertController, public formBilder: FormBuilder
    ) {
        this.loginForm = formBilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });

        this.phoneLoginForm = formBilder.group({
            phone: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
            code: ['+1'],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
        this.data = {};

        this.data.response = '';
    }

    createAccount() {
        this.navCtrl.push(IntroPage3Page, { profile_complete: true });
    }

    register(phone) {
        this.navCtrl.push(IntroPage3Page, { phone: phone, profile_complete: false })
    }


    login(LoginData: any) {
        if(this.login_type == 'email') {
            if (!this.loginForm.valid) {
                this.submitAttempt = true;
            } else {
                this.loginAPI(LoginData);
            }
        }

        if(this.login_type == 'phone') {
            if (!this.phoneLoginForm.valid) {
                this.submitAttempt = true;
            } else {
                this.loginAPI(LoginData);
            }
        }
    }

    loginAPI(LoginData: any) {
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
                this.profile_complete = this.data.response.profile_complete;

                if (this.globals.caos_flag) {
                    this.viewCtrl.dismiss();
                } else {
                    if (!this.profile_complete) {
                        this.register(LoginData.phone);
                    } else {
                        this.list();
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
                                this.SaveMobileNumberFlag(this.data.response.mobile_verification_amount, this.data.response.phone_verified);
                                if (this.globals.caos_flag) {
                                    this.navCtrl.push('CartPage')
                                } else {
                                    this.navCtrl.setRoot(HomePage, { imageData: this.data.response.url, Flag: false });
                                }
                            })
                            .catch((err) => {
                                this.SaveMobileNumberFlag(this.data.response.mobile_verification_amount, this.data.response.phone_verified);

                                if (this.globals.caos_flag) {
                                    this.navCtrl.push('CartPage')
                                } else {
                                    this.navCtrl.setRoot(HomePage, { imageData: this.data.response.url, Flag: false });
                                }
                            });
                    }
                }
            } else {
                this.globals.presentToast("Invalid Credentials")
            }
        }, error => {
            this.globals.presentToast("Something went wrong check your internet connection.")
        });
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

        this.nativeStorage.setItem('MobileFlagSave', {
            MobileFlag: flag,
            MobileDiscount: Number(amount)
        }).then(() => {
        },error => console.error('Error storing item', error)
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
            this.globals.BusinessDiscount = this.places[0].discount;
            this.globals.ccFeeDisclaimer = this.places[0].ccFeeDisclaimer;

            this.globals.tip_enabled = this.places[0].tip_enabled;
            this.globals.menu_ready = this.places[0].menu_ready;
            this.globals.utensils_enabled = this.places[0].utensils_enabled;

            if (this.globals.pickup == '1') {
                this.globals.pickup = true;
            } else {
                this.globals.pickup = false;
            }

            if (this.places[0].delivery == '1') {
                this.globals.delivery = true;
            } else {
                this.globals.delivery = false;
            }

            if (this.places[0].cash_enabled == '1') {
                this.globals.cash_enabled = true;
            } else {
                this.globals.cash_enabled = false;
            }

            if (this.globals.pickup == '1') {
                this.globals.pickup = true;
            } else {
                this.globals.pickup = false;
            }

            if (this.places[0].delivery == '1') {
                this.globals.delivery = true;
            } else {
                this.globals.delivery = false;
            }
        }, error => {
            this.globals.presentToast("Something went wrong check your internet connection.")
        });
    }

    check_phone_number() {
        this.pos_customer = true;
    }

    cancel_pos() {
        this.pos_customer = false;
    }

    complete_profile() {
        let loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loading.present();
        
        let response = this.server.check_user_by_phone(this.code + this.phone);
        response.subscribe(data => {
            loading.dismiss();
            this.globals.presentToast(data.message);

            if (!data.success) {
                this.pos_customer = false;
            } else {
                if (data.data.profile_complete) {
                    this.pos_customer = false;
                } else {
                    //this.register();
                }
            }
        }, error => {
            this.globals.presentToast("Something went wrong check your internet connection.")
        });
    }

    doAppleLogin() {
        cordova.plugins.SignInWithApple.signin(
            { requestedScopes: [0, 1] },
            function (succ) {
                console.log(succ)
                alert(JSON.stringify(succ))
            },
            function (err) {
                console.error(err)
                console.log(JSON.stringify(err))
            }
        )
    }

    // doGoogleLogin() {
    //     let options = {
    //         'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    //         'webClientId': '859537130755-aoipu1fgmh0mu2ro99ihkjntfbt2ege4.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
    //         'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    //     };

    //     this.googlePlus.login(options).then(res => {
    //         console.log("G+ login Success-> ", res)
    //     })
    //     .catch(err => {
    //         console.error("G+ login Error-> ",  err)
    //     });
    // }

    // doFacebookLogin() {
    //     this.fb.login(['public_profile', 'user_friends', 'email'])
    //         .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
    //         .catch(e => console.log('Error logging into Facebook', e));


    //     this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
    // }

}

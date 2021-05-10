import { Component, ViewChild, enableProdMode } from '@angular/core';
import { Nav, Platform, AlertController, ModalController, Tabs, App, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MainTabsPage } from '../pages/main-tabs/main-tabs';
import { GlobalVariable } from './global';
import { NativeStorage } from '@ionic-native/native-storage';
// import { OneSignal } from '@ionic-native/onesignal';
import { ServerProvider } from '../providers/server/server';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NativeAudio } from "@ionic-native/native-audio";
import { CodePush, InstallMode, SyncStatus } from '@ionic-native/code-push';

// import * as Sentry from "@sentry/angular";
// import { Integrations } from "@sentry/tracing";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    @ViewChild('myTabs') tabRef: Tabs;
    tab1Root: any = 'DealsPage';
    tab2Root: any = 'WalletListPage';
    tab3Root: any = 'MyRewardsPage';
    tab4Root: any = HomePage;

    rootPage: any;
    appId: any = '77c7af42-a792-447b-bd4e-4d2f00346462';
    googleProjectId: any = '773485528357';

    pages: Array<{ title: string, component: any }>;
    data: any;
    places: any;

    constructor(private codePush: CodePush, private nativeAudio: NativeAudio,
        public loadingCtrl: LoadingController, private iab: InAppBrowser,
        private barcodeScanner: BarcodeScanner, public alertCtrl: AlertController,
        public app: App, public server: ServerProvider, private statusbar: StatusBar,
        public alertctrl: AlertController, public modalCtrl: ModalController,
        public globals: GlobalVariable, private splashscreen: SplashScreen,
        private nativeStorage: NativeStorage, public platform: Platform,
        private geolocation: Geolocation) {

        platform.ready().then(() => {


            // Sentry.init({
            //     dsn: "https://examplePublicKey@o0.ingest.sentry.io/0" ,
            //     integrations: [
            //       // Registers and configures the Tracing integration,
            //       // which automatically instruments your application to monitor its
            //       // performance, including custom Angular routing instrumentation
            //       new Integrations.BrowserTracing({
            //         tracingOrigins: ["localhost", "https://yourserver.io/api"],
            //         routingInstrumentation: Sentry.routingInstrumentation,
              
            //       }),
            //     ],
              
            //     // Set tracesSampleRate to 1.0 to capture 100%
            //     // of transactions for performance monitoring.
            //     // We recommend adjusting this value in production
            //     tracesSampleRate: 1.0,
            //   });



            this.checkCodePush();
            this.data = {};
            this.data.response = '';
            this.LoadSound();
            if (this.platform.is('core') || this.platform.is('mobileweb')) {
                this.list();
            }

            setTimeout(() => this.splashscreen.hide(), 400);
            this.statusbar.hide();
            this.doApp_verify();
            let env = this;

            if (this.globals.caos_flag) {
                this.nativeStorage.getItem('business').then(data => {
                    this.globals.new_id = data.business_id;
                    this.globals.business_username = data.business_username;
                    this.globals.business_password = data.business_password;

                    env.nav.setRoot('BeforeLoginPage');
                    this.splashscreen.hide();
                }, error => {
                    env.nav.setRoot('BusinessLoginPage');
                    this.splashscreen.hide();
                }).catch(err => { console.log(err) });
            } else {
                this.nativeStorage.getItem('user').then(data => {
                    this.globals.udid = data.udid;
                    this.globals.firstName = data.firstName;
                    this.globals.lastName = data.lastName;
                    this.globals.Email = data.email;

                    if (!globals.marketPlace) {
                        this.list();
                        env.nav.setRoot(HomePage);
                    } else {
                        env.nav.setRoot('ResturantListPage');
                    }

                    this.globals.showFabFlag = true;
                    this.splashscreen.hide();
                }, error => {

                    if (!globals.marketPlace) {
                        this.list();
                    }

                    env.nav.setRoot('BeforeLoginPage');
                    this.globals.showFabFlag = false;
                    this.splashscreen.hide();
                }).catch(err => { console.log(err) });
            }
            this.splashscreen.hide();
        });
        this.loadBanner();
    }

    loadBanner() {
        let response = this.server.LoadBannersOnHomePage()
        response.subscribe(data => {
            this.globals.banner_color = data.banner_color;
            this.globals.giftCard_color = data.gift_cards_color;
            this.globals.myRewards_color = data.my_rewards_color;
            this.globals.orderNow_color = data.order_now_color;
            this.globals.specialOffer_color = data.special_offer_color;
            this.globals.themeColor = data.theme_color;
            this.globals.appColor = data.theme_color;
        }, error => {
        });
    }

    doApp_verify() {
        let response = this.server.verifyApp_version()
        response.subscribe(data => {
            if (data.success) {

            } else {
                this.splashscreen.hide();
                this.nav.setRoot('ResponseApiPage', { appstore_link: data.appstore_link, playstore_link: data.playstore_link, htmlBody: data.html_body });
            }
        }, error => {
        });
    }

    checkCodePush() {
        this.codePush.sync({
            updateDialog: {
                appendReleaseDescription: true,
                descriptionPrefix: "\n\nChange log:\n"
            },
            installMode: InstallMode.IMMEDIATE,
        }).subscribe(
            (data) => {
            },
            (err) => {
            }
        );
    }

    cartpage() {
        if (this.globals.Product.length == 0) {
            let alert = this.alertctrl.create({
                title: "Oops",
                message: "Your cart is empty.",
                buttons: ["Okay"]

            });
            alert.present();
        } else {
            this.nav.push('CartPage');
        }
    }

    Homepage() {
        let view = this.nav.getActive();
        var name = view.component.name.toString();

        if (name != 'MainTabsPage') {
            this.nav.setRoot(HomePage);
        }
    }

    Page() {
        let view = this.nav.getActive();
        var name = view.component.name.toString();

        if (name != 'LoginPage') {
            return true;
        } else {
            return false;
        }
    }

    AddWallet() {
        this.nav.push('WalletPage');
    }

    OpenSettingPage() {
        if (this.globals.guess_login) {
            this.presentConfirm();
        } else {
            this.nav.push('SettingsPage')
        }
    }
    logout() {
        this.nativeStorage.remove('user').then(data => {
            this.globals.Product.length = 0;
            this.globals.cartflag = false;
            this.globals.guess_login = true;
            this.app.getRootNav().setRoot('LoginPage');
        }).catch(err => console.log());
    }

    OpenEvents() {
        if (this.globals.guess_login) {
            this.presentConfirm();
        } else {
            this.nav.push('EventsPage');
        }
    }

    openGiftCard() {
        this.nav.push('GiftcardsPage');
    }

    openRewards() {
        if (this.globals.guess_login) {
            this.presentConfirm();
        } else {
            if (this.globals.branch_enabled == 1) {
                this.globals.rewardTemp = true;
                this.nav.push('ResturantListPage')
            } else {
                this.nav.push('MyRewardsPage')
            }
        }
    }

    openReviews() {
        if (this.globals.guess_login) {
            this.presentConfirm();
        } else {
            this.nav.push('ReviewsPage')
        }
    }

    openOrder() {
        if (this.globals.branch_enabled == 1) {
            this.nav.push('ResturantListPage')
        } else {
            this.nav.push('CategoryPage')
        }
    }

    openHistory() {
        if (this.globals.guess_login) {
            this.presentConfirm();
        } else {
            this.nav.push('OrderListingPage')
        }
    }

    aboutus() {
        this.nav.push('BranchesAboutusPage');
    }

    public scanQR() {
        //For Testing ->   // this.modal("1","success","Nappolinini pizza","http://34.203.122.153/api/adsonscanapp/assets/images/1500954477.jpg","http://vignette1.wikia.nocookie.net/icarly/images/2/26/Purple-Smiley-Icon-keep-smiling-8214370-200-200.jpg/revision/latest?cb=20110707184639","null");
        this.barcodeScanner.scan().then((barcodeData) => {
            if (barcodeData.format == "QR_CODE") {
                var url = "http";
                var string = barcodeData.text.toString();
                var comma = string.indexOf(',');

                if (comma != -1) {
                    var date = string.substring(0, comma);
                    var dateObj = new Date();
                    var month = dateObj.getUTCMonth() + 1; //months from 1-12
                    var day = dateObj.getUTCDate();
                    var year = dateObj.getUTCFullYear();

                    var currentdate = year + "/" + month + "/" + day;
                    var d = new Date(date);
                    var exp_month = d.getUTCMonth() + 1; //months from 1-12
                    var exp_day = d.getDate();
                    var exp_year = d.getUTCFullYear();
                    var expdate = exp_year + "/" + exp_month + "/" + exp_day;

                    if (new Date(expdate) < new Date(currentdate)) {
                        let qr_prompt = this.alertCtrl.create({
                            title: "Oops",
                            message: "This QR code has expired",
                            buttons: ["Okay"]

                        });
                        qr_prompt.present();
                    } else {
                        var second_half = string.substring(comma + 1);
                        var second_string = second_half.includes(url);
                        var Image_type_png = second_half.includes('png');
                        var Image_type_jpg = second_half.includes('jpg');
                        if (second_string == true && (Image_type_png == true || Image_type_jpg == true)) {
                            var image = second_half;
                            this.ShowCustomQModel(image, true);
                        } else if (second_string == true && (Image_type_png == false || Image_type_jpg == false)) {
                            var browser_url = second_half;
                            this.launch(browser_url);
                        } else {
                            var text = second_half;
                            this.ShowCustomQModel(text, false);
                        }
                    }
                } else {
                    let loading = this.loadingCtrl.create({
                        content: "Setting up...",
                    });
                    loading.present();

                    let response = this.server.SendQRcodeToServer(barcodeData.text)
                    response.subscribe(data => {

                        this.data.response = data;
                        loading.dismiss();

                        if (this.data.response.message == "Business not found") {
                            let alert = this.alertCtrl.create({
                                title: 'Error',
                                subTitle: 'Wrong QR-code',
                                buttons: ['OK']
                            });
                            alert.present();
                        } else {
                            if (this.data.response.status == 'success') {
                                this.modal(this.data.response.reward, this.data.response.status, this.data.response.businessname, this.data.response.business_logo, this.data.response.lottery_image, this.data.response.reward_string, this.data.response.business_username);
                            } else {
                                this.modal(this.data.response.reward, this.data.response.status, this.data.response.businessname, this.data.response.business_logo, "null", this.data.response.reward_string, this.data.response.business_username);
                            }
                        }
                    }, error => {
                        loading.dismiss();
                        this.globals.presentToast("Something went wrong check your internet connection.")
                    });
                }
            } else if (barcodeData.cancelled) {
                return false;
            } else {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'please scan QR code',
                    buttons: ['OK']
                });
                alert.present();
            }
        }, (err) => {
        });
    }

    LoadSound() {
        this.nativeAudio.preloadSimple('spinner', 'assets/sounds/Spinner.mp3').then(function (msg) {

        }, function (error) {
        });

        this.nativeAudio.preloadSimple('failure', 'assets/sounds/failure.mp3').then(function (msg) {

        }, function (error) {
        });

        this.nativeAudio.preloadSimple('success', 'assets/sounds/success.mp3').then(function (msg) {
            
        }, function (error) {
        });
    }

    ShowCustomQModel(data, flag) {
        this.nav.push('CustomQrPage', { data: data, image_flag: flag })
    }

    launch(url) {
        this.iab.create(url, "_self");
    }

    followUs() {
        this.iab.create('https://www.facebook.com/mikronexus/', "_self");
    }

    modal(response, response_status, business, logo, image, string, bid) {
        let profileModal = this.modalCtrl.create('CongratulationPage', { reward: response, status: response_status, place: business, Logo: logo, lottery_image: image, RewardString: string, id: bid });
        profileModal.present();
    }

    business_list() {
        this.nav.push('BusinessListPage')
    }

    bookingPage() {
        this.nav.push('BookingPage');
    }

    list() {
        let response = this.server.getRestaurantslist('100000', 'main', "0,0", '0', 'order');
        response.subscribe(data => {
            
            this.places = data.results;
            var new_id = this.globals.new_id;
            this.globals.business_list = this.places;
            // this.places = this.places.filter(function (item) {
            //     return item.business_id === new_id;
            // });
            console.log('resiults', this.places);
            this.globals.new_id = this.places[0].business_id;
            this.globals.point_check = this.places[0].points_enabled;
            this.globals.punch_check = this.places[0].punches_enabled;
            this.globals.special_offer = this.places[0].special_offer;
            this.globals.events_enabled = this.places[0].events_enabled;
            this.globals.gallery_enabled = this.places[0].gallery_enabled;
            this.globals.pickup = this.places[0].pickup;
            this.globals.latitude = this.places[0].latitude;
            this.globals.longitude = this.places[0].longitude;
            this.globals.menu_ready_msg = this.places[0].menu_ready_message;
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
            this.globals.appointment_enabled = this.places[0].appointment_enabled;
            this.globals.orders_enabled = this.places[0].orders_enabled;
            this.globals.BusinessDiscount = this.places[0].discount;
            this.globals.ccFeeDisclaimer = this.places[0].ccFeeDisclaimer;
            this.globals.tip_enabled = this.places[0].tip_enabled;
            this.globals.menu_ready = this.places[0].menu_ready;
            if (this.places[0].appColor) {
                this.globals.appColor = this.places[0].appColor;
            }else{
                this.globals.appColor = '#000000'
            }

            document.documentElement.style.setProperty('--primary-color', this.globals.appColor);

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

    show_gallery() {
        if (this.globals.guess_login) {
            this.presentConfirm();
        } else {
            this.nav.push("GalleryPage")
        }
    }

    openDeals() {
        this.nav.push('DealsListPage')
    }

    presentConfirm() {
        let alert = this.alertCtrl.create({
            title: 'Login',
            message: 'You need to be logged in to use this feature.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'login',
                    handler: () => {
                        this.nav.setRoot('LoginPage')
                    }
                }
            ]
        });
        alert.present();
    }
}

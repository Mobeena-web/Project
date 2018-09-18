import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, ModalController, App, Nav } from 'ionic-angular';
import { WalletPage } from '../wallet/wallet';
import { MyRewardsPage } from '../my-rewards/my-rewards';
import { HomePage } from '../home/home';
import { ServerProvider } from '../../providers/server/server';
import { GlobalVariable } from "../../app/global";
import { NativeStorage } from "@ionic-native/native-storage";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NativeAudio } from "@ionic-native/native-audio";
import { PinDialog } from "@ionic-native/pin-dialog";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the MainTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-main-tabs',
    templateUrl: 'main-tabs.html',
})
export class MainTabsPage {
    @ViewChild(Nav) nav: Nav;
    @ViewChild('myTabs') tabRef: Tabs;
    data: any;
    // tab1Root: any = 'DealsPage';
    tab1Root: any = 'EventsPage';

    tab2Root: any = 'CategoryPage';
    tab3Root: any = 'MyRewardsPage';
    tab4Root: any = HomePage;
    tab5Root: any = 'ReviewsPage';
   
    constructor(public app: App, public server: ServerProvider, private pinDialog: PinDialog, public globals: GlobalVariable, private nativeAudio: NativeAudio, private barcodeScanner: BarcodeScanner, private iab: InAppBrowser, private nativeStorage: NativeStorage, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public _nav: NavController, public _navParams: NavParams, public alertCtrl: AlertController) {
        this.data = {};
        this.data.response = '';

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MainTabsPage');
    
        this.CheckMobileVerfication();
        this.LoadSound();
    }

    ionViewWillEnter() {
        if(this._navParams.get('page') == 1){
            this.tabRef.select(3);
        }
        console.log("ionView will enter Main TABS");
        this.server.CheckUserPunchCards();
        this.server.CheckUserReward();
        this.server.CheckUserBadgePoints();

       

    }

    cartpage() {
        if (this.globals.Product.length == 0) {
            let alert = this.alertCtrl.create({
                title: "Oops",
                message: "Your cart is empty.",
                buttons: ["Okay"]

            });
            alert.present();
        }
        else {
            this._nav.push('CartPage');
        }
    }

  

    public scanQR() {

     //For Testing ->   // this.modal("1","success","Nappolinini pizza","http://34.203.122.153/api/adsonscanapp/assets/images/1500954477.jpg","http://vignette1.wikia.nocookie.net/icarly/images/2/26/Purple-Smiley-Icon-keep-smiling-8214370-200-200.jpg/revision/latest?cb=20110707184639","null");
        this.barcodeScanner.scan().then((barcodeData) => {
            if (barcodeData.format == "QR_CODE") {
                console.log(this.globals.udid);
                console.log(barcodeData.text);
                var url = "http";
                var string = barcodeData.text.toString();
                var comma = string.indexOf(',');

                console.log(comma);
                if (comma != -1) {

                    var date = string.substring(0, comma);

                    var dateObj = new Date();
                    var month = dateObj.getUTCMonth() + 1; //months from 1-12
                    var day = dateObj.getUTCDate();
                    var year = dateObj.getUTCFullYear();

                    var currentdate = year + "/" + month + "/" + day;
                    console.log(currentdate);
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

                    }
                    else {
                        var second_half = string.substring(comma + 1);
                        var second_string = second_half.includes(url);
                        var Image_type_png = second_half.includes('png');
                        var Image_type_jpg = second_half.includes('jpg');
                        if (second_string == true && (Image_type_png == true || Image_type_jpg == true)) {
                            var image = second_half;
                            this.ShowCustomQModel(image, true);


                        }
                        else if (second_string == true && (Image_type_png == false || Image_type_jpg == false)) {
                            var browser_url = second_half;
                            this.launch(browser_url);
                        }
                        else {
                            var text = second_half;
                            this.ShowCustomQModel(text, false);
                        }
                        console.log(date, second_half);
                        console.log(second_string);
                        console.log(image, browser_url, text);
                    }
                    console.log(d, expdate, exp_day);
                }

                else {
                    console.log(barcodeData.text, "barcodedata");

                    let response = this.server.SendQRcodeToServer(barcodeData.text)

                    console.log(this.globals.udid);
                    console.log(barcodeData.text);
                    let loading = this.loadingCtrl.create({
                        content: "Setting up...",

                    });


                    loading.present();


                    response.subscribe(data => {

                        this.data.response = data;
                        console.log(this.data.response);
                        console.log(this.data.response.status);
                        console.log(this.data.response.reward);
                        loading.dismiss();

                        if (this.data.response.message == "Business not found") {
                            console.log("if");

                            let alert = this.alertCtrl.create({
                                title: 'Error',
                                subTitle: 'Wrong QR-code',
                                buttons: ['OK']
                            });
                            alert.present();
                        }

                        else {
                            if (this.data.response.status == 'success') {
                                console.log(barcodeData.text, "barcodedata");

                                this.modal(this.data.response.reward, this.data.response.status, this.data.response.businessname, this.data.response.business_logo, this.data.response.lottery_image, this.data.response.reward_string, this.data.response.business_username);
                            }
                            else {
                                console.log(barcodeData.text, "barcodedata");
                                this.modal(this.data.response.reward, this.data.response.status, this.data.response.businessname, this.data.response.business_logo, "null", this.data.response.reward_string, this.data.response.business_username);
                            }
                        }

                    }, error => {
                        console.log("Oooops!");
                        loading.dismiss();
                        let alert = this.alertCtrl.create({
                            title: 'Error',
                            subTitle: 'Server times out, please try again',
                            buttons: ['OK']
                        });
                        alert.present();
                    });
                }
                // console.log(barcodeData.text);


            }
            else if (barcodeData.cancelled) {
                console.log("User cancelled the action!");

                return false;
            }
            else {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'please scan QR code',
                    buttons: ['OK']
                });
                alert.present();
            }
            // Success! Barcode data is here
        }, (err) => {
            // An error occurred
            console.log(err);
        });

    }

    CheckMobileVerfication() {

        let response = this.server.MobileVericationCheck()
            .subscribe(res => {
                var mobileres = res;
                console.log("mobile api ", mobileres);
                this.SaveMobileNumberFlag(mobileres.phone_verification_amount, mobileres.phone_verified);
            }, error => {
                console.log(error);
            });
    }
    SaveMobileNumberFlag(amount, flag) {
        console.log(amount, flag);

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

    LoadSound() {

        this.nativeAudio.preloadSimple('spinner', 'assets/sounds/Spinner.mp3')
            .then(function (msg) {
                console.log(msg);

            }, function (error) {
                console.log(error);
            });
    }

    ShowCustomQModel(data, flag) {
        //  let customerQrmodel = this.modalCtrl.create('CustomQrPage',{data:data,image_flag:flag})

        this._nav.push('CustomQrPage', { data: data, image_flag: flag })
    }

    launch(url) {
        console.log("url function");
        console.log(url);
        this.iab.create(url, "_self");

    }

    modal(response, response_status, business, logo, image, string, bid) {

        console.log("image", image);
        console.log(bid, 'businesusername');

        let profileModal = this.modalCtrl.create('CongratulationPage', { reward: response, status: response_status, place: business, Logo: logo, lottery_image: image, RewardString: string, id: bid });
        profileModal.present();


    }


}

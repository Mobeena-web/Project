
import { MainTabsPage } from '../main-tabs/main-tabs';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, AlertController, LoadingController, Navbar, ModalController, App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { GlobalVariable } from '../../app/global';

import { SocialSharing } from '@ionic-native/social-sharing';
import { Http } from "@angular/http";
import { HomePage } from "../home/home";
import { NativeStorage } from "@ionic-native/native-storage";

import { PinDialog } from '@ionic-native/pin-dialog';
import { ServerProvider } from "../../providers/server/server";
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {
    phonenumber: any;
    phonecode: any;
    profiledata: any;
    aniversayexist: boolean = false;
    birthday_exist: boolean = false;
    phone_verify: any;
    code: any;
    user_aniversary: any = '';
    user_birthday: any = '';
    @ViewChild(Navbar) navBar: Navbar;
    url: any;
    user_id: any;
    user_date: any;
    image: any;
    udid: any;
    data: any;

    user_email: any;
    firstname: any;
    lastname: any;
    phone: any;
    password: any;
    lockWallet: boolean = false;
    Unedit:boolean = true;


    constructor(public app: App, public server: ServerProvider, private pinDialog: PinDialog, public globals: GlobalVariable, public modalCtrl: ModalController, private socialSharing: SocialSharing, private nativeStorage: NativeStorage, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: Http, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
        this.data = {};


        this.data.response = '';
    }



    ionViewDidLoad() {
        //   this.navBar.backButtonClick = (e:UIEvent)=>{
        //       // todo something
        //       this.StorWalletLock();
        //       this.navCtrl.pop();   
        //     //   let nav = this.app.getRootNav(); 
        //     //   nav.setRoot(MainTabsPage, {tabIndex: 0});


        //   }   
        console.log('ionViewDidLoad SettingPage');
        if (this.platform.is('ios')) {

            this.url = "https://itunes.apple.com/app/";
        }
        else if (this.platform.is('android')) {
            this.url = "https://play.google.com/store/apps/";

        }


        this.getuserNativeData();



        this.getWalletCheckFlag();
    }
    ionViewWillLeave() {
        console.log("did leave settings");

        this.StorWalletLock();
    }


    getuserNativeData() {
        this.nativeStorage.getItem('user')
            .then(data => {
                this.user_email = data.email;
                this.firstname = data.firstName;
                this.lastname = data.lastName;
                this.phonenumber = data.phone;
                this.password = data.password;

                this.image = data.image;
                this.user_date = data.date;
                this.user_id = data.ID;
                this.user_birthday = data.birthday;
                this.user_aniversary = data.aniversary;
                this.phone_verify = data.phone_verify;

                console.log(this.image, "image", "native", data.image, data.email, data.firstName, data.lastName);
                if (this.phonenumber.charAt(1) == '9') {
                    console.log("9")
                    this.phonecode = this.phonenumber.slice(0, 3);

                }
                else {
                    console.log("1")
                    this.phonecode = this.phonenumber.slice(0, 2);

                }
                console.log(this.phonecode, this.phonenumber);
                this.phone = this.phonenumber.replace(this.phonecode, '');
                this.phone = Number(this.phone);

                console.log(this.phonecode, this.phone);

                console.log("special", this.user_birthday, this.user_aniversary)

                console.log(this.user_birthday);
                if (this.user_aniversary == 'N/A') {
                    this.aniversayexist = false;
                }
                else if (this.user_aniversary.toString().length > 0) {
                    this.aniversayexist = true;
                }

                if (this.user_birthday == 'N/A') {
                    this.birthday_exist = false;
                }
                else if (this.user_birthday.toString().length > 0) {
                    this.birthday_exist = true;
                }

            }).catch(err => console.log);
    }

    StorWalletLock() {
        this.nativeStorage.setItem('walletlock', { walletCheck: this.lockWallet })
            .then(
                () => console.log('Stored wallet lock'),
                error => console.error('Error storing item', error)
            );
    }

    getWalletCheckFlag() {
        this.nativeStorage.getItem('walletlock').then(data => {
            console.log(data);
            this.lockWallet = data.walletCheck;
            this.globals.WallletLock = this.lockWallet;

        }).catch(err => console.log);
    }


    //     ionViewWillLeave(){   
    //         console.log("Looks like I'm about to leave :(");
    //         this.nativeStorage.getItem('user')
    //         .then(data => {
    //             this.user_email = data.email;
    //             this.firstname = data.firstName;
    //             this.lastname = data.lastName;
    //             this.phone = data.phone;
    //             this.password = data.password;
    //             this.udid = data.udid;
    //             this.image = data.image;
    //             this.user_date = data.date;  
    //             this.user_id = data.ID;
    //             this.user_birthday = data.birthday;
    //             this.user_aniversary = data.aniversary;
    //             this.phone_verify = data.phone_verify;

    //         }).catch(err => console.log);

    //   }

    //   ionViewWillEnter(){     
    //     console.log("Enter");
    //     this.nativeStorage.getItem('user')
    //     .then(data => {
    //         this.user_email = data.email;
    //         this.firstname = data.firstName;
    //         this.lastname = data.lastName;
    //         this.phonenumber = data.phone;
    //         this.password = data.password;
    //         this.udid = data.udid;
    //         this.image = data.image;
    //         this.user_date = data.date;  
    //         this.user_id = data.ID;
    //         this.user_birthday = data.birthday;
    //         this.user_aniversary = data.aniversary;
    //         this.phone_verify = data.phone_verify;

    //         console.log(this.image,"image");
    //         if(this.phonenumber.charAt(1) == '9')
    //             {   
    //                 console.log("9")
    //                 this.phonecode = this.phonenumber.slice(0,3);

    //             }
    //             else{  
    //                 console.log("1") 
    //                  this.phonecode = this.phonenumber.slice(0,2);

    //             }
    //             console.log(this.phonecode,this.phonenumber);
    //             this.phone = this.phonenumber.replace(this.phonecode,'');
    //             this.phone = Number(this.phone);

    //         console.log(this.phonecode,this.phone);

    //         console.log("special",this.user_birthday,this.user_aniversary)

    //         console.log(this.user_birthday);
    //         if(this.user_aniversary == 'N/A')
    //         {
    //             this.aniversayexist = false;
    //         }
    //         else if (this.user_aniversary.toString().length > 0)
    //         {
    //             this.aniversayexist =true;
    //         }

    //         if(this.user_birthday == 'N/A')
    //         {
    //             this.birthday_exist = false;
    //         }
    //         else if(this.user_birthday.toString().length > 0)
    //         {
    //             this.birthday_exist = true;
    //         }

    //     }).catch(err => console.log);

    // }

    logout() {

        this.nativeStorage.clear()
            .then(data => {

                this.nativeStorage.remove('user')
                    .then(data => {
                        console.log('data removed');

                        this.app.getRootNav().setRoot('LoginPage');
                    }).catch(err => console.log());




                console.log(data);
                this.globals.Product.length = 0;
                this.lockWallet = false;
                this.globals.cartflag = false;

            }).catch(err => console.log());




    }





    // public presentActionSheet() {

    //     let actionSheet = this.actionSheetCtrl.create({
    //         title: 'Share Jack Jacks Coffee House',
    //         buttons: [
    //             {
    //                 text: 'Via Facebook',
    //                 icon: 'logo-facebook',
    //                 handler: () => {
    //                     this.ShareViaFacebook('Hey this app is great!', null, this.url);
    //                 }
    //             },
    //             {
    //                 text: 'Via Whatsapp',
    //                 icon: 'logo-whatsapp',
    //                 handler: () => {
    //                     this.whatsappShare('Hey this app is great!', null, this.url);
    //                 }
    //             },
    //             {
    //                 text: 'Via SMS',
    //                 icon: 'mail',
    //                 handler: () => {
    //                     this.SMS();
    //                 }
    //             },
    //             {
    //                 text: 'Cancel',
    //                 icon: 'close',
    //                 role: 'cancel'
    //             }
    //         ]
    //     });
    //     actionSheet.present();
    // }


    whatsappShare(message, image, url) {
        this.platform.ready().then(() => {
            this.socialSharing.shareViaWhatsApp(message, image, url)
                .then(() => {
                    console.log("Success");
                }).catch(() => {
                    // Error!
                    //   alert("Failed");
                });
        });
    }
    ShareViaFacebook(message, image, url) {

        this.platform.ready().then(() => {
            this.socialSharing.shareViaFacebook(message, image, url)
                .then(() => {
                    console.log("Success");
                }).catch(() => {
                    // Error!
                    //   alert("Failed");
                });
        });
    }

    // SMS() {
    //     var options = {
    //         replaceLineBreaks: true, // true to replace \n by a new line, false by default
    //         android: {
    //             intent: 'INTENT'  // Opens Default sms app
    //             //intent: '' // Sends sms without opening default sms app
    //         }
    //     }
    //     this.smsVar.send('', this.url, options)
    //         .then(() => {
    //             console.log("success");
    //         }, () => {
    //             //  alert("failed");
    //         });
    // }




    submit() {
        if (this.user_birthday != '') {
            this.birthday_exist = true;
        }
        if (this.user_aniversary != '') {
            this.aniversayexist = true
        }

        let response = this.server.UpdateUserProfile(this.firstname, this.user_email, this.lastname, this.password, this.phonecode + this.phone, this.user_birthday, this.user_aniversary)
        let loading = this.loadingCtrl.create({
            content: "Please wait...",

        });
        loading.present();

        response.subscribe(data => {
            this.data.response = data;
            console.log(this.data.response);
            console.log(this.data.response.success);
            if (this.data.response.success == true) {
                loading.dismiss();
                console.log(this.data.response.updated_data.first_name);
                this.nativeStorage.setItem('user',
                    {

                        firstName: this.data.response.updated_data.first_name,
                        lastName: this.data.response.updated_data.last_name,
                        phone: this.data.response.updated_data.phone,
                        password: this.data.response.updated_data.password,
                        udid: this.data.response.updated_data.udid,
                        image: this.data.response.updated_data.image,
                        ID: this.user_id,
                        date: this.data.response.updated_data.date_joined,
                        email: this.data.response.updated_data.email,
                        birthday: this.data.response.updated_data.birthday,
                        aniversary: this.data.response.updated_data.anniversary,
                        phone_verify: this.phone_verify
                    }).then(() => {
                        console.log(this.image)
                        let alert = this.alertCtrl.create({
                            title: 'Success',
                            subTitle: 'Settings successfully updated.',

                            buttons: ['Okay']
                        });


                        alert.present();
                    })
                    .catch((err) => { console.log(err) });




            }
            else {
                let alert = this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: 'Settings not updated. Please try again.',

                    buttons: ['Okay']
                });
                loading.dismiss();
                alert.present();


            }
        }, error => {
            console.log("Oooops!");
        });






    }

    OpenTermsAndPolicy() {

        this.navCtrl.push('TermAndPolicyPage')
    }
    OpenContactUs() {

        this.navCtrl.push('ContactUsPage');
    }



    walletCheck() {

        console.log(this.lockWallet)
        if (this.lockWallet == true) {
            this.verifytrueCheck()
        }
        else {
            this.confirmCode();
        }
    }
    SaveLockCode() {
        this.nativeStorage.setItem('lock', {
            walletCode: btoa(this.globals.code)
        })
            .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
            );


    }

    confirmCode() {

        this.nativeStorage.getItem('lock').then(data => {

            this.code = atob(data.walletCode);
            this.pinDialog.prompt('Enter your PIN', 'Verify PIN', ['Cancel', 'Okay'])
                .then(
                    (result: any) => {
                        if (result.buttonIndex == 2) {
                            console.log('User clicked OK, value is: ', result.input1);
                            if (this.code == result.input1) {
                                this.lockWallet = false;
                                this.globals.WallletLock = this.lockWallet;

                            }
                            else {
                                this.lockWallet = true;
                                let alert = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: 'Incorrect password.',

                                    buttons: ['Okay']
                                });

                                alert.present();


                            }
                        }
                        else if (result.buttonIndex == 1) {
                            console.log('User cancelled');
                        }
                    }
                );


        }).catch(err => console.log);
    }
    verifytrueCheck() {

        this.pinDialog.prompt('Enter your PIN', 'PIN', ['Submit', 'Cancel'])
            .then(
                (result: any) => {
                    if (result.buttonIndex == 1) {
                        console.log('User clicked submit, value is: ', result.input1);
                        this.code = result.input1;

                        this.pinDialog.prompt('Confirm your PIN', 'Verify PIN', ['Cancel', 'Okay'])
                            .then(
                                (result: any) => {
                                    if (result.buttonIndex == 2) {
                                        console.log('User clicked OK, value is: ', result.input1);
                                        if (this.code == result.input1) {

                                            this.globals.code = this.code;
                                            this.SaveLockCode();
                                            this.lockWallet = true;
                                            this.globals.WallletLock = this.lockWallet;
                                            console.log(this.globals.WallletLock);
                                        }
                                        else {

                                            this.PinCheck();

                                        }
                                    }

                                    else if (result.buttonIndex == 1) {
                                        console.log('User cancelled');
                                        this.lockWallet = false;
                                        this.globals.WallletLock = this.lockWallet;
                                    }
                                }
                            );

                    }

                    else if (result.buttonIndex == 2) {
                        console.log('User cancelled');
                        this.lockWallet = false;
                        this.globals.WallletLock = this.lockWallet;
                    }
                }
            );

        // });      
    }

    PinCheck() {
        this.pinDialog.prompt('PIN does not match', 'Verify PIN', ['Cancel', 'Okay'])
            .then(
                (result: any) => {
                    if (result.buttonIndex == 2) {
                        console.log('User clicked OK, value is: ', result.input1);
                        if (this.code == result.input1) {
                            this.globals.code = this.code;
                            this.SaveLockCode();
                            this.lockWallet = true;
                            this.globals.WallletLock = this.lockWallet;
                        }
                        else {
                            let alert = this.alertCtrl.create({
                                title: 'Error',
                                subTitle: 'Incorrect password.Please try again.',

                                buttons: ['Okay']
                            });

                            alert.present();
                        }
                    }
                    else if (result.buttonIndex == 1) {

                        console.log('User cancelled');
                    }
                    this.lockWallet = false;
                    this.globals.WallletLock = this.lockWallet;
                }
            );
    }

    // verify(){



    //     this.touchId.verifyFingerprint('Scan your fingerprint to unlock').then((res) => {

    //         this.lockWallet = false;
    //         this.globals.WallletLock = this.lockWallet;
    //     }, (err) => {
    //         console.log(err);
    //         this.lockWallet = true;
    //         this.globals.WallletLock = this.lockWallet;
    //     });


    // }

    Edit(){
        this.Unedit = false;
    }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ServerProvider } from '../../providers/server/server';
import { GlobalVariable } from '../../app/global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';
import { EmailValidator } from '../../validators/email';
import { MainTabsPage } from '../main-tabs/main-tabs';
import { IntroPage3Page } from '../intro-page3/intro-page3';

declare var FB:any;

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

    constructor(public server: ServerProvider, public globals: GlobalVariable, private nativeStorage: NativeStorage, public modalCtrl: ModalController, public navCtrl: NavController,
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

    register(){
        this.navCtrl.push(IntroPage3Page)
    }


    login(LoginData: any) {
      
        if (!this.loginForm.valid) {
            this.submitAttempt = true;
            console.log(' Some values were not given or were incorrect, please fill them');
        } else {
            let loading = this.loadingCtrl.create({
                content: "Please wait...",
                dismissOnPageChange: true,
            });
            loading.present();
            let response = this.server.LoginData(LoginData);
            response.subscribe(data => {
                this.data.response = data;
                
                if (this.data.response != "invalid") {
                    this.globals.guess_login = false;
                     this.navCtrl.setRoot(HomePage,{imageData:this.data.response.url,Flag:false});
                    //this.navCtrl.push('AcceptTermsPage');
                    this.globals.udid = this.data.response.udid;
                  
                    this.globals.firstName = this.data.response.firstname;
                    this.globals.lastName = this.data.response.lastname;
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

                            this.globals.udid = this.data.response.udid;
                             this.navCtrl.setRoot(HomePage, { imageData: this.data.response.url, Flag: false });
                            //this.navCtrl.push('AcceptTermsPage')
                            this.server.initializePushToken();
                        })
                        .catch((err) => { console.log("nativesstorage", err) });
                }
                else {
                    console.log(this.data.response);
                    let alert = this.alertCtrl.create({
                        title: 'Failure!',
                        subTitle: 'Invalid Email or Password',
                        buttons: ['Retry']
                    });
                    alert.present();
                    loading.dismiss();
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



}

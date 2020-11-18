import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { ServerProvider } from '../../providers/server/server';
import { GlobalVariable } from '../../app/global';
import { MobileVerificationPromptPage } from '../mobile-verification-prompt/mobile-verification-prompt';
import { EmailValidator } from "../../validators/email";
import { NativeStorage } from "@ionic-native/native-storage";

@Component({
    selector: 'page-intro-page3',
    templateUrl: 'intro-page3.html'
})
export class IntroPage3Page {
    // email: any;
    submitAttempt: boolean = false;
    signupForm: FormGroup;
    masks: any;
    data: any;
    phone: any;
    profile_complete: any;

    constructor(public loadingCtrl: LoadingController, private nativeStorage: NativeStorage, public globals: GlobalVariable, public modalCtrl: ModalController, public alertCtrl: AlertController, public server: ServerProvider, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
        this.data = {};
        this.phone = this.navParams.get('phone');
        this.profile_complete = this.navParams.get('profile_complete');
        this.data.response = '';

        if (!this.profile_complete) {
            this.signupForm = formBuilder.group({
                firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
                lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
                email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
                phone: [this.phone, Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*')])],
                // nextdigits: ['', Validators.compose([Validators.maxLength(4), Validators.required])],
                password: [''],
                phonecode: ['1', Validators.compose([Validators.required])],
                // age : ['', Validators.compose([Validators.maxLength(3),Validators.pattern('[0-9]*')])],
                // gender: ['', Validators.compose([Validators.required])],
            });
        } else {
            this.signupForm = formBuilder.group({
                firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
                lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
                email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
                phone: [this.phone, Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*')])],
                // nextdigits: ['', Validators.compose([Validators.maxLength(4), Validators.required])],
                password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
                phonecode: ['1', Validators.compose([Validators.required])],
                // age : ['', Validators.compose([Validators.maxLength(3),Validators.pattern('[0-9]*')])],
                // gender: ['', Validators.compose([Validators.required])],
            });
        }
    }
    // moveFocus(nextElement) {
    //     nextElement.setFocus();
    //   }

    ionViewDidLoad() {
        console.log('ionViewDidLoad IntroPage3Page');
    }

    back() {
        this.navCtrl.pop();
    }

    next(signupData: any) {
        if (!this.signupForm.valid) {
            console.log(' Some values were not given or were incorrect, please fill them');
            this.submitAttempt = true;
        } else {
            localStorage.setItem("firstname", signupData.firstName);
            localStorage.setItem("lastname", signupData.lastName);
            localStorage.setItem("password", signupData.password);
            this.globals.PhoneNo = '+' + signupData.phonecode + signupData.phone;
            this.globals.Email = signupData.email;
            console.log("register_data", signupData)

            this.register(signupData);
        }
    }

    MobileVerificationPrompt() {
        let model = this.modalCtrl.create(MobileVerificationPromptPage);
        model.present();
    }

    register(signupData) {
        let loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true,
        });
        loading.present();

        let response = this.server.SignupData(signupData.firstName, signupData.lastName, signupData.email, signupData.password, this.globals.PhoneNo, signupData.birthday, signupData.aniversary, this.profile_complete);
        response.subscribe(data => {
            console.log("Register res - ", data);

            this.data.response = data;
            if (this.data.response.status != "error") {
                this.globals.guess_login = false;
                // this.navCtrl.setRoot('AcceptTermsPage', { imageData: this.data.response.url, discountText: this.data.response.discount_text, Flag: true, discount: this.data.response.discount_value });
                this.globals.firstName = signupData.firstName;
                this.globals.lastName = signupData.lastName;
                this.globals.udid = this.data.response.udid;
                loading.dismiss();
                this.nativeStorage.setItem('user', {
                    email: signupData.email,
                    udid: this.data.response.udid,
                    firstName: signupData.firstName,
                    lastName: signupData.lastName,
                    phone: signupData.phone,
                    password: signupData.password,
                    image: this.data.response.url,
                    ID: this.data.response.id,
                    date: this.data.response.date_joined,
                    discountValue: this.data.response.discount_value,
                    birthday: signupData.birthday,
                    aniversary: signupData.aniversary

                }).then(() => {
                    this.nativeStorage.setItem('discount', { discountValue: this.data.response.discount_value })
                        .then(() => console.log('Stored item!'),
                            error => console.error('Error storing item', error)
                        );
                    // console.log("b discount value", this.data.response.discount_value);
                    this.globals.udid = this.data.response.udid;
                    //  this.server.initializePushToken();
                    if (this.globals.caos_flag) {
                        this.navCtrl.push('CartPage')
                    } else {
                        this.navCtrl.setRoot('AcceptTermsPage', { imageData: this.data.response.url, discountText: this.data.response.discount_text, Flag: true, discount: this.data.response.discount_value });
                    }
                }).catch((err) => {
                    console.log(err)
                    if (this.globals.caos_flag) {
                        this.navCtrl.push('CartPage')
                    } else {
                        this.navCtrl.setRoot('AcceptTermsPage', { imageData: this.data.response.url, discountText: this.data.response.discount_text, Flag: true, discount: this.data.response.discount_value });
                    }
                });
            } else {
                let alert = this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: this.data.response.description,
                    buttons: ['Retry']
                });
                loading.dismiss();
                alert.present();

                this.navCtrl.setRoot('LoginPage');
            }
        }, error => {
            this.globals.presentToast("Server times out, please try again")
        });
    }

    DoMobileVerification(signupData) {
        let loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true,
        });
        loading.present();

        let response = this.server.MobileVerification();
        response.subscribe(data => {
            console.log(data);
            var verficationResponse = data;
            console.log(verficationResponse);
            loading.dismiss();
            if (verficationResponse.status == true) {
                this.globals.signupData = signupData;
                this.navCtrl.push('MobileEmailVarificationPage');
            } else {
                // this.register(signupData);

                let alert = this.alertCtrl.create({
                    title: "Error",
                    message: verficationResponse.message,
                    buttons: ["OK"]
                });
                alert.present();
            }

        }, error => { console.log(error); });
    }

}

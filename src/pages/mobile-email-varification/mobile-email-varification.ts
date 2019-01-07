import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from "../../app/global";
import { ServerProvider } from "../../providers/server/server";
import { IntroPage7Page } from "../intro-page7/intro-page7";
import { LoginPage } from '../login/login';

/**
 * Generated class for the MobileEmailVarificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mobile-email-varification',
  templateUrl: 'mobile-email-varification.html',
})
export class MobileEmailVarificationPage {
    submitAttempt: boolean;
    userPhone: any;
    CodeVerificationForm: FormGroup;
    email: any;
    phone_verified: boolean;
    email_verified: boolean;
    Phonecode: any;
    Emailcode: any;
    data: any;
   constructor(public server: ServerProvider, public nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBilder: FormBuilder,
    public viewctrl: ViewController,
    public globals: GlobalVariable) {
        this.data = {};

        this.data.response = '';

        this.email_verified = this.globals.email_verified;
        this.phone_verified = this.globals.phone_verified;
        console.log("constructor",this.email_verified, this.phone_verified);
      
     
   
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MobileEmailVarificationPage');
    this.GetUserNumberAndEmail();
}


GetUserNumberAndEmail() {
console.log("get user number and email");
  this.userPhone = this.globals.PhoneNo;
  this.email = this.globals.Email;
}



close() {
    this.viewctrl.dismiss();
     this.navCtrl.setRoot('LoginPage');
}

checkValidation(){
   
   
    if(this.email_verified == true || this.phone_verified == true ){
        this.Verify();
    }
    else{
        let alert = this.alertCtrl.create({
            title: "Alert",
            message: "Enter your valid code ",
            buttons: ["OK"]
        });

        alert.present();


    }
    


}



Verify() {
    console.log(this.Phonecode);

        let loading = this.loadingCtrl.create({
            content: "loading..."
        });
        loading.present();
        let response = this.server.SendVerificationCodeToServer(this.Phonecode);
        response.subscribe(data => {
            let response = data;
            loading.dismiss();
            console.log(response);
            if (response.status ==  true) {
                console.log("verify function");
                if ( response.phone_verified == true) {
                    if ( response.is_phone_verified == true) {
                        this.register(this.globals.signupData)
                    }
                }
                else
                {
                    let alert = this.alertCtrl.create({
                        title: "Error",
                        message: "Enter Your Code",
                        buttons: ["OK"]
                    });
                    alert.present();

                }
              
            }
            else {
                let alert = this.alertCtrl.create({
                    title: "Error",
                    message: response.message,
                    buttons: ["OK"]
                });
                alert.present();
                //this.viewctrl.dismiss(false);

            }
        }, error => {
            loading.dismiss();
            console.log(error);
        });


    }

    register(signupData) {
        let loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true,
        });
        loading.present();
        // this.globals.PhoneNo = signupData.phonecode + signupData.phone  ;

        let response = this.server.SignupData(signupData.firstName, signupData.lastName, signupData.email, signupData.password, this.globals.PhoneNo, signupData.birthday, signupData.aniversary);

        response.subscribe(data => {
            console.log(data);

            this.data.response = data; 
            if (this.data.response.status != "error") {
                // this.navCtrl.setRoot('AcceptTermsPage', { imageData: this.data.response.url, discountText: this.data.response.discount_text, Flag: true, discount: this.data.response.discount_value });
                this.globals.firstName = signupData.firstName;
                this.globals.lastName = signupData.lastName;
                this.globals.udid = this.data.response.udid;
                this.nativeStorage.setItem('user',
                    {

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
                            .then(
                                () => console.log('Stored item!'),
                                error => console.error('Error storing item', error)
                            );
                        console.log("b discount value", this.data.response.discount_value);
                        this.navCtrl.setRoot('AcceptTermsPage', { imageData: this.data.response.url, discountText: this.data.response.discount_text, Flag: true, discount: this.data.response.discount_value });
                        this.globals.udid = this.data.response.udid;
                         this.server.initializePushToken();
                    })
                    .catch((err) => { console.log(err) });

            }
            else {
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

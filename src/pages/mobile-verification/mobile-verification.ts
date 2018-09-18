import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GlobalVariable } from "../../app/global";
import { ServerProvider } from "../../providers/server/server";
/**
 * Generated class for the MobileVerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-mobile-verification',
    templateUrl: 'mobile-verification.html',
})
export class MobileVerificationPage {
    submitAttempt: boolean;
    userPhone: any;
    CodeVerificationForm: FormGroup;
    constructor(public server: ServerProvider, public nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public formBilder: FormBuilder,
        public viewctrl: ViewController,
        public globals: GlobalVariable) {

        this.CodeVerificationForm = formBilder.group({
            code: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        })

       
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MobileVerificationPage');
        this.GetUserNumberFromNativeStorage();
    }


    GetUserNumberFromNativeStorage() {

        this.nativeStorage.getItem('user')
            .then(data => {
                this.userPhone = data.phone;
                console.log("usermobileno", this.userPhone);

            }).catch(err => console.log);
    }


    close() {
        this.viewctrl.dismiss();
    }



    // Verify(verifyData) {
    //     console.log(verifyData.code);

    //     if (!this.CodeVerificationForm.valid) {
    //         this.submitAttempt = true;
    //     }
    //     else {
    //         this.submitAttempt = false;
    //         let loading = this.loadingCtrl.create({
    //             content: "loading..."
    //         });
    //         loading.present();
    //         let response = this.server.SendVerificationCodeToServer(verifyData);
    //         response.subscribe(data => {
    //             let response = data;
    //             loading.dismiss();
    //             console.log(response);
    //             if (response.success == 'true') {

    //                 let alert = this.alertCtrl.create({
    //                     title: "Congratulation",
    //                     message: "You have been rewarded $" + this.globals.MobileDiscount + " You can utilize it any of your purchase.",
    //                     buttons: ["OK"]
    //                 });

    //                 alert.present();



    //             }
    //             else {
    //                 let alert = this.alertCtrl.create({
    //                     title: "Error",
    //                     message: "Oops, something went wrong please try again.",
    //                     buttons: ["OK"]
    //                 });
    //                 alert.present();
    //                 this.viewctrl.dismiss(false);

    //             }
    //         }, error => {
    //             loading.dismiss();
    //             console.log(error)
    //         });


    //     }

    // }

}

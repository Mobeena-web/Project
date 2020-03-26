import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { GlobalVariable } from "../../app/global";
import { ServerProvider } from "../../providers/server/server";
/**
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-verification',
    templateUrl: 'verification.html',
})
export class VerificationPage {
    response: any;
    data: any;
    submitAttempt: boolean = false;
    VerficationForm: FormGroup;
    type = 'email';
    constructor(public server: ServerProvider, public globals: GlobalVariable, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public viewCtrl: ViewController, public formBilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {

        this.VerficationForm = formBilder.group({
            email: [''],
            // password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
            phone:[],
            code:['+1']
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad VerificationPage');
    }
    Verify(VerifyData: any) {

        let response = this.server.ForgotPassword(VerifyData);
        let loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true,
        });
        loading.present();

        response.subscribe(data => {
            this.response = data;
            console.log(this.response);
            if (this.response.status == "true") {

                let alert = this.alertCtrl.create({
                    title:'',
                    subTitle: this.response.description,

                    buttons: ['done']
                });
                loading.dismiss();
                alert.present();
                this.viewCtrl.dismiss();

            }
            else {

                let alert = this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: this.response.description,

                    buttons: ['Retry']
                });
                loading.dismiss();
                alert.present();
            }



        }, error => {
            console.log("Error!");
        });
    }

    dismiss() {

        this.viewCtrl.dismiss();
    }

}

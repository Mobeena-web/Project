import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from "@angular/http";

import { HomePage } from "../home/home";
import { IntroPage1Page } from "../intro-page1/intro-page1";
import { NativeStorage } from "@ionic-native/native-storage";
import { GlobalVariable } from "../../app/global";
import { LoginPage } from "../login/login";
import { ServerProvider } from "../../providers/server/server";
import { MainTabsPage } from '../main-tabs/main-tabs';
import {MyApp} from '../../app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
/*
Generated class for the IntroPage5 page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
    selector: 'page-intro-page5',
    templateUrl: 'intro-page5.html'
})
export class IntroPage5Page {
    aniversary: any;
    birthdate: any;
    image: any;
    data: any;
    email: any;
    password: any;
    phone: any;
    last_name: any;
    first_name: any;

    constructor(public app:MyApp,public server: ServerProvider, public globals: GlobalVariable, private nativeStorage: NativeStorage, public loadingCtrl: LoadingController, public http: Http, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
        this.data = {};

        this.data.response = '';

        this.http = http;

        this.first_name = this.navParams.get('firstname');
        this.last_name = this.navParams.get('lastname');
        this.phone = this.navParams.get('phone');
        this.password = this.navParams.get('password');
        this.email = this.navParams.get('email');
        this.birthdate = this.navParams.get('birthdate');
        this.aniversary = this.navParams.get('aniversary');



    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad IntroPage5Page');
    }

    done() {
        console.log(this.birthdate, this.aniversary);
        let loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true,
        });
        loading.present();

        let response = this.server.SignupData(this.first_name, this.last_name, this.email, this.password, this.phone, this.birthdate, this.aniversary);

        response.subscribe(data => {
            this.data.response = data; //data["_body"];
            console.log(this.data.response);
            if (this.data.response.status != "error") {
                this.navCtrl.setRoot(HomePage, { imageData: this.image, discountText: this.data.response.discount_text, Flag: true, discount: this.data.response.discount_value });


                this.image = this.data.response.url;
                console.log(this.image);
                this.nativeStorage.setItem('user',
                    {

                        email: this.email,
                        udid: this.data.response.udid,
                        firstName: this.first_name,
                        lastName: this.last_name,
                        phone: this.phone,
                        password: this.password,
                        image: this.image,
                        ID: this.data.response.id,
                        date: this.data.response.date_joined,
                        discountValue: this.data.response.discount_value,
                        birthday: this.birthdate,
                        aniversary: this.aniversary

                    }).then(() => {
                        console.log("mobilephone", this.phone)
                        this.nativeStorage.setItem('discount', { discountValue: this.data.response.discount_value })
                            .then(
                                () => console.log('Stored item!'),
                                error => console.error('Error storing item', error)
                            );
                        console.log("b discount value", this.data.response.discount_value);
                        this.navCtrl.setRoot(HomePage, { imageData: this.image, discountText: this.data.response.discount_text, Flag: true, discount: this.data.response.discount_value });
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

                this.navCtrl.setRoot(LoginPage);

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

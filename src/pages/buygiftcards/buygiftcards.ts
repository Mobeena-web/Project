import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { Http } from '@angular/http';
import { HomePage } from "../home/home";
import { ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from '../../app/global';
import { NativeStorage } from "@ionic-native/native-storage";
import { ServerProvider } from "../../providers/server/server";

@IonicPage()
@Component({
  selector: 'page-buygiftcards',
  templateUrl: 'buygiftcards.html',
})
export class BuygiftcardsPage {
  cardinfo: any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
}
submitAttempt: boolean = false;
PaymentForm: FormGroup;
gift_id:any;
udid_r:any;
design_card:any;
message:any;
amount:any;
  constructor(public server: ServerProvider, private nativeStorage: NativeStorage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public globals: GlobalVariable,public viewCtrl: ViewController, public formBuilder: FormBuilder, public stripe: Stripe, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.PaymentForm = formBuilder.group({
      creditcardno: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(16), Validators.pattern('[0-9]*'), Validators.required])],
      expiryMonth: ['', Validators.compose([Validators.required])],
      expiryYear: ['', Validators.compose([Validators.required])],
      CVC: ['', Validators.compose([Validators.required])],
      cardinfo: [false]
  })
  this.gift_id = this.navParams.get('gift_id');
  this.udid_r = this.navParams.get('udid_r');
  this.design_card = this.navParams.get('design_id');
  this.message = this.navParams.get('message');
  this.amount = this.navParams.get('amount');


  console.log(this.udid_r,"mm",this.gift_id,this.design_card,this.message,this.amount);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuygiftcardsPage');
  }
  pay(PaymentData: any) {

    var a = btoa(PaymentData.creditcardno)
    console.log("encode", a);
    console.log("decode", atob(a));
    console.log(PaymentData.creditcardno);
    console.log(this.udid_r)
    if (!this.PaymentForm.valid) {
        this.submitAttempt = true;
        console.log(' Some values were not given or were incorrect, please fill them');
    } else {

        console.log("paymentcard", PaymentData.cardinfo);
        if (PaymentData.cardinfo == true) {
            this.nativeStorage.setItem('card',
                {
                    cardno: btoa(PaymentData.creditcardno),
                    exmonth: btoa(PaymentData.expiryMonth),
                    exyear: btoa(PaymentData.expiryYear),
                    cvc: btoa(PaymentData.CVC),
                    check: btoa(PaymentData.cardinfo)
                }).then(() => console.log('Stored item!'),
                    error => console.error('Error storing item', error)
                );
        }


        this.cardinfo = {
            number: PaymentData.creditcardno,
            expMonth: PaymentData.expiryMonth,
            expYear: PaymentData.expiryYear,
            cvc: PaymentData.CVC
        }

        console.log(this.cardinfo);
        let loading = this.loadingCtrl.create({
            content: "Loading...",

        });
        loading.present();
        if (this.globals.StripId == '') {
            loading.dismiss();

            let alert = this.alertCtrl.create({
                title: 'Oops',
                subTitle: 'Payments not available,please try again',
                buttons: ['OK']
            });

            alert.present();
        }
        else {
            

            this.stripe.setPublishableKey(this.globals.StripId);
            this.stripe.createCardToken(this.cardinfo).then((Token) => {
               
                let response = this.server.buy_gift_cards( Token.id, this.gift_id,this.udid_r,this.design_card,this.amount,this.message)
                console.log("response without json", response);
                response.subscribe(data => {
                    console.log("data without json", data);
                    let alert = this.alertCtrl.create({
                        title: 'Success',
                        subTitle: data.message,
                        buttons: ['OK']
                    });
        
                    alert.present();
                    this.navCtrl.popAll();
                    loading.dismiss();
                  

                }
                    , error => {
                        console.log("Error!");
                        console.log("this is our error", error);

                    });

            }).catch((data) => {
                loading.dismiss();
                let alert = this.alertCtrl.create({
                    title: 'Oops',
                    subTitle: 'Invalid Credentials,please try again',
                    buttons: ['OK']
                });

                alert.present();

            });
        }
    }
}

}

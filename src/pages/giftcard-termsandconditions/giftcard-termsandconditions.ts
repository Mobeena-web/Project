import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the GiftcardTermsandconditionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-giftcard-termsandconditions',
  templateUrl: 'giftcard-termsandconditions.html',
})
export class GiftcardTermsandconditionsPage {
  policy:any;
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.policy = this.navParams.get('policy')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiftcardTermsandconditionsPage');
  }
  remove(){
    this.viewCtrl.dismiss();
  }

}

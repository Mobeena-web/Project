import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TermAndPolicyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-term-and-policy',
  templateUrl: 'term-and-policy.html',
})
export class TermAndPolicyPage {

  constructor(public viewctrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermAndPolicyPage');
  }
  close(){
    this.viewctrl.dismiss();
  }
}

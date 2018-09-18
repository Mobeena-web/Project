import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntroPage3Page } from '../intro-page3/intro-page3';


@IonicPage()
@Component({
  selector: 'page-before-login',
  templateUrl: 'before-login.html',
})
export class BeforeLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeforeLoginPage');
  }

  login(){
    this.navCtrl.push('LoginPage')
  }
  
  register(){
    this.navCtrl.push(IntroPage3Page)
  }

}

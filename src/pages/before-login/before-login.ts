import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntroPage3Page } from '../intro-page3/intro-page3';
import { HomePage } from '../home/home';
import { GlobalVariable } from '../../app/global';


@IonicPage()
@Component({
  selector: 'page-before-login',
  templateUrl: 'before-login.html',
})
export class BeforeLoginPage {

  constructor( public global: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
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
  guestlogin(){
    this.global.guess_login = true;
    this.navCtrl.push('ResturantListPage');
  }

}

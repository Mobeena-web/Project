import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntroPage5Page } from "../intro-page5/intro-page5";
import { IntroPage8Page } from "../intro-page8/intro-page8";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
/**
 * Generated class for the IntroPage6Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-intro-page6',
  templateUrl: 'intro-page6.html',
})
export class IntroPage6Page {
  aniversary: any;
  birthdate: any;
  email: any;
  password: any;
  phone: any;
  last_name: any;
  first_name: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.first_name = this.navParams.get('firstname');
    this.last_name = this.navParams.get('lastname');
    this.phone = this.navParams.get('phone');
    this.password = this.navParams.get('password');
    this.email = this.navParams.get('email');
    this.birthdate = this.navParams.get('birthdate');
    this.aniversary = this.navParams.get('aniversary');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage6Page');
  }

  next() {

    this.navCtrl.push(IntroPage8Page, { firstname: this.first_name, lastname: this.last_name, password: this.password, phone: this.phone, email: this.email, birthdate: this.birthdate, aniversary: this.aniversary });
  }

}

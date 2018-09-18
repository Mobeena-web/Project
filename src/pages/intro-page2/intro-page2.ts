import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {IntroPage3Page} from "../intro-page3/intro-page3";
import { IntroPage4Page } from "../intro-page4/intro-page4";
/*
  Generated class for the IntroPage2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-intro-page2',
  templateUrl: 'intro-page2.html'
})
export class IntroPage2Page {
  aniversary: any;
  Birthday: any;
  email: any;
  phone: any;
  password: any;
  lastname: any;
  firstname: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

   this.firstname = this.navParams.get('firstname');
   this.lastname =   this.navParams.get('lastname');
      this.password = this.navParams.get('password');
       this.phone = this.navParams.get('phone');
          this.email =  this.navParams.get('email');
          this.Birthday = this.navParams.get('birthdate');
          this.aniversary = this.navParams.get('AniversaryDate');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage2Page');
  }

next(){


this.navCtrl.push(IntroPage4Page,{firstname: this.firstname,lastname:this.lastname, password: this.password, phone: this.phone,email:this.email,birthdate:this.Birthday,aniversary:this.aniversary})
}
}

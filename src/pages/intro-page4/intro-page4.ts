import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {IntroPage5Page} from "../intro-page5/intro-page5";
import { IntroPage6Page } from "../intro-page6/intro-page6";
/*
  Generated class for the IntroPage4 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-intro-page4',
  templateUrl: 'intro-page4.html'
})
export class IntroPage4Page {
  aniversary: any;
  birthdate: any;
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
          this.birthdate = this.navParams.get('birthdate');
          this.aniversary = this.navParams.get('aniversary');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage4Page');
  }
next(){

  this.navCtrl.push(IntroPage6Page,{firstname:this.firstname,lastname:this.lastname,password:this.password,phone:this.phone,email:this.email,birthdate:this.birthdate,aniversary:this.aniversary});
}
}

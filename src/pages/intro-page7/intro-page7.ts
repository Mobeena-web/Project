import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntroPage2Page } from "../intro-page2/intro-page2";
import { GlobalVariable } from '../../app/global';
/**
 * Generated class for the IntroPage7Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-intro-page7',
  templateUrl: 'intro-page7.html',
})
export class IntroPage7Page {
  email: any;
  phone: any;
  password: any;
  lastname: any;
  firstname: any;
  BirthDate: any = '';
  AniversaryDate: any = '';

  constructor( public globals: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');
    this.password = localStorage.getItem('firstname');
    this.phone =  this.globals.PhoneNo;
    this.email =  this.globals.Email;

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage7Page');
  }

  next() {
    console.log(this.BirthDate, this.AniversaryDate);


    this.navCtrl.push(IntroPage2Page, { firstname: this.firstname, lastname: this.lastname, password: this.password, phone: this.phone, email: this.email, birthdate: this.BirthDate, AniversaryDate: this.AniversaryDate })
  }



}

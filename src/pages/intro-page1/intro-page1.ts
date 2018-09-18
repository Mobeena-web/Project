import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmailValidator } from "../../validators/email";
import { IntroPage2Page } from "../intro-page2/intro-page2";
import { LoginPage } from "../login/login";
import { IntroPage3Page } from "../intro-page3/intro-page3";
import { GlobalVariable } from '../../app/global';
/*
  Generated class for the IntroPage1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-intro-page1',
  templateUrl: 'intro-page1.html'
})
export class IntroPage1Page {
  submitAttempt: boolean = false;
  loginForm: FormGroup;
  constructor(public globals: GlobalVariable,public modalCtrl: ModalController, public formBilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {

    this.loginForm = formBilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]

    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage1Page');


  }
  next(LoginData: any) {


    if (!this.loginForm.valid) {
      this.submitAttempt = true;
    }

    else {
      console.log(LoginData.email);
      
      this.navCtrl.push(IntroPage3Page, { useremail: LoginData.email })
      this.globals.Email = LoginData.email;
    }
  }
  back() {

    this.navCtrl.push(LoginPage);
  }
  OpenTermsAndPolicy() {

    let termsModal = this.modalCtrl.create('TermsAndPolicyPage');
    termsModal.present();
  }


}

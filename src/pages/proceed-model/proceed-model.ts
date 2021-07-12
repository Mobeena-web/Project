import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, ModalController, AlertController, ViewController, App, LoadingController, ToastController  } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';

/**
 * Generated class for the ProceedModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proceed-model',
  templateUrl: 'proceed-model.html',
})
export class ProceedModelPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public viewctrl:ViewController, public globals: GlobalVariable, ) {
   
    console.log('item data',globals.Product)
  }
  close(){
    this.viewctrl.dismiss(false);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProceedModelPage');
  }
  paymentPage(){
    this.viewctrl.dismiss(true);
   
      
  }
 
}

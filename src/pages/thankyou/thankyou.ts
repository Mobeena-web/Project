import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';



@IonicPage()
@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class ThankyouPage {

  constructor(public globals: GlobalVariable,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  }

  done(){
    this.navCtrl.popToRoot();
  }

}

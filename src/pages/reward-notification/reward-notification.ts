import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { GlobalVariable } from '../../app/global';



@IonicPage()
@Component({
  selector: 'page-reward-notification',
  templateUrl: 'reward-notification.html',
})
export class RewardNotificationPage {

  constructor(public global: GlobalVariable,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardNotificationPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

}

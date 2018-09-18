import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PointsModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-points-model',
  templateUrl: 'points-model.html',
})
export class PointsModelPage {
  bannerImage: any;
  reward_list:any;
  constructor(public viewctrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.reward_list = navParams.get('point_reward');
    this.bannerImage = navParams.get('banner');

    console.log(this.reward_list,this.bannerImage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointsModelPage');
  }

  Close(){
    this.viewctrl.dismiss();
    
  }

}

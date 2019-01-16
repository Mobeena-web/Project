import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the PointPunchModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-point-punch-model',
  templateUrl: 'point-punch-model.html',
})
export class PointPunchModelPage {
  title: any;
  image: any;
  name: any;
  price: any;
  tagline: any;
  punch_count: any;
  punch_limit: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.title = navParams.get('title');
    this.image = navParams.get('image');
    this.name = navParams.get('name');
    this.tagline = navParams.get('tagline');
    this.punch_count = navParams.get('punch_count');
    this.punch_limit = navParams.get('punch_limit');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointPunchModelPage');
  }

  remove(){
    this.viewCtrl.dismiss();
  }

}

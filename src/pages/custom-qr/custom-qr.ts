import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CustomQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-custom-qr',
  templateUrl: 'custom-qr.html',
})
export class CustomQrPage {
  text: any;
  image: any;

  constructor(public viewctrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {

    var flag = navParams.get('image_flag');
    if(flag == true)
    {
      this.image = navParams.get('data');
    }
    else{
      this.text = navParams.get('data');
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomQrPage');
  }

  close(){
    this.viewctrl.dismiss();
  }

}

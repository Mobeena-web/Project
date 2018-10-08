import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the MobileUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mobile-update',
  templateUrl: 'mobile-update.html',
})
export class MobileUpdatePage {

  constructor(private iab: InAppBrowser,public plt: Platform,public global: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MobileUpdatePage');
  }
  update(){
    if (this.plt.is('ios')) {
      this.iab.create(this.global.ios_url, "_self");
    }
    else{
      this.iab.create(this.global.android_url, "_self");

    }
  }
  close(){
    this.plt.exitApp();
  }

}

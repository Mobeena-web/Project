import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the ResponseApiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-response-api',
  templateUrl: 'response-api.html',
})
export class ResponseApiPage {
  appStore: any;
  playStore: any;
  htmlBody: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
    this.appStore = navParams.get('appstore_link');
    this.playStore = navParams.get('playstore_link');
    this.htmlBody = navParams.get('htmlBody');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResponseApiPage');
  }

  openlink(){
    if(this.appStore != ""){
      this.iab.create(this.appStore, "_self");  
    } 

    if(this.playStore != ""){
      this.iab.create(this.playStore, "_self");
    }
  }
}

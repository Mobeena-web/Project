import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainTabsPage } from '../main-tabs/main-tabs';
import { GlobalVariable } from '../../app/global';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-accept-terms',
  templateUrl: 'accept-terms.html',
})
export class AcceptTermsPage {
  privacy: any;
  terms: any;

  constructor(private iab: InAppBrowser, public globals: GlobalVariable, public navCtrl: NavController, public navParams: NavParams) {
  }

  openTerms() {
    this.iab.create('http://mikronexus.com/legal/terms.pdf', "_self");
  }

  openPolicy() {
    this.iab.create('http://mikronexus.com/legal/policy.pdf', "_self");
  }

  ionViewDidLoad() {

  }

  homePage() {
    if (this.privacy && this.terms) {
      if (this.globals.caos_flag) {
        this.navCtrl.push('CategoryPage')
      } else {
        if (this.globals.branch_enabled == 1) {
          this.navCtrl.push('ResturantListPage')
      } else {
        this.navCtrl.setRoot(HomePage);
      }
      }
    } else {
      this.globals.presentToast("Please accept Privacy Policy and Terms & Conditions")
    }
  }
}

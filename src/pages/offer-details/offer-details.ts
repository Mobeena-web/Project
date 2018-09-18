import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OfferDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer-details',
  templateUrl: 'offer-details.html',
})
export class OfferDetailsPage {
  detail:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.detail = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferDetailsPage');
  }

}

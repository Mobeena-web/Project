import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

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

  constructor(private socialSharing: SocialSharing,public navCtrl: NavController, public navParams: NavParams) {
    this.detail = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferDetailsPage');
  }
  share(image,title){
    this.socialSharing.share(title, '', image, '').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

}

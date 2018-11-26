import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the BusinessListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-list',
  templateUrl: 'business-list.html',
})
export class BusinessListPage {

  constructor(private nativeStorage: NativeStorage,public globals: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.globals.business_list,"ll")
    console.log('ionViewDidLoad BusinessListPage');
  }


  select_business(item){
    this.globals.new_id = item.business_id;
    this.globals.business_username = item.username;
    this.globals.special_offer = item.special_offer;
    this.globals.events_enabled = item.events_enabled;
    this.globals.gallery_enabled = item.gallery_enabled;
    this.globals.pickup = item.pickup;
    this.globals.latitude = item.latitude;
    this.globals.longitude = item.longitude;
    this.globals.hours_operation = item.hours_operation;
    this.globals.branch_enabled = item.branch_enabled;
    this.globals.giftcard_enabled = item.giftcard_enabled;
    this.globals.b_logo = item.logo;

     if (this.globals.pickup == '1') {
         this.globals.pickup = true;
     }
     else {
         this.globals.pickup = false;
     }
     if (item.delivery == '1') {
         this.globals.delivery = true;
     }
     else {
         this.globals.delivery = false;
     }
    this.navCtrl.setRoot('BeforeLoginPage')

    this.nativeStorage.clear()
      .then(data => {
          this.nativeStorage.remove('user')
              .then(data => {
                  this.globals.Product.length = 0;
                  this.globals.cartflag = false;

                  this.navCtrl.setRoot('BeforeLoginPage')
              }).catch(err => console.log());

          

      }).catch(err => console.log());
  }

}

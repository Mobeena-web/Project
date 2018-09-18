import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CartDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart-detail',
  templateUrl: 'cart-detail.html',
})
export class CartDetailPage {
  product: any;


  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get('product')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartDetailPage');
  }

  close() {

    this.viewCtrl.dismiss();
  }

  addOptionQuantity(object, extras) {
    console.log(object, extras, "object");

    console.log(object.totalPrice, object.quantity, object.basePrice);

    extras.quantity += 1;
    let extras_total = extras.quantity * extras.price
    console.log(extras_total);
    object.totalPrice = Number(object.basePrice) * Number(object.quantity);
    object.totalPrice += extras_total;

    // object.totalPrice= Number(object.quantity) * Number(object.basePrice);
    // console.log(object.totalPrice);
    // console.log( object.totalPrice,object.quantity,object.basePrice);
  }

  removeOptionQuantity(object, extras) {
    console.log(object, extras, "object");

    if (extras.quantity <= 1) {
      extras.quantity = 1;
    }
    else {
      extras.quantity -= 1;
      let extras_total = extras.quantity * extras.price
      console.log(extras_total);
      object.totalPrice = Number(object.basePrice) * Number(object.quantity);
      object.totalPrice += extras_total;



      // object.totalPrice =Number(object.quantity) * Number(object.basePrice);
      // console.log(object.totalPrice);
      // console.log( object.totalPrice,object.quantity,object.basePrice);
    }
  }
}  

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, App, ModalController, AlertController } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the UpsellProductModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upsell-product-modal',
  templateUrl: 'upsell-product-modal.html',
})
export class UpsellProductModalPage {
  productList: any = [];
  alredyInCart: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public server: ServerProvider, public global: GlobalVariable,
    public viewCtrl: ViewController, public modalCtrl: ModalController) {

    this.productList = this.navParams.get('upSellItems');

    this.productList.forEach(item => {
      item.disable = false
    });

    console.log("Up sell modal ", this.productList);
    console.log("Global product ", this.global.Product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpsellProductModalPage');
  }

  addToCart(item) {
    this.global.Product.push({
      basePrice: item.price,
      discount_type: "perc",
      discount_value: 0,
      image: item.image,
      itemInstructions: undefined,
      menuExtrasSelected: [],
      menuId: item.id,
      menuItem: item.name,
      menuUpsellItemsSelected: [],
      quantity: 1,
      restId: this.global.bussinessId,
      reward: false,
      reward_id: "",
      tax: 0,
      tax_enabled: "false",
      totalPrice: item.price,
      uniqueId: item.id,
      upsell_calculated: false
    });

    item.disable = true;
  }

  goToback() {
    let data = { 'modal_close': true };
    this.viewCtrl.dismiss(data);
  }

}

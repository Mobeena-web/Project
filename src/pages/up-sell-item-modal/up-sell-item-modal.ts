import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, App, ModalController, AlertController } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the UpSellItemModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-up-sell-item-modal',
  templateUrl: 'up-sell-item-modal.html',
})
export class UpSellItemModalPage {
  productList: any = [];
  alredyInCart: boolean = false;
  itemId: any;
  upsellTotal: any = 0;
  extrasTotal: any = 0;
  total: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public server: ServerProvider, public global: GlobalVariable,
    public viewCtrl: ViewController, public modalCtrl: ModalController) {

    this.productList = this.navParams.get('upSellItems');
    this.itemId = this.navParams.get('itemId');

    this.productList.forEach(item => {
      item.disable = false
    });

    console.log("Up sell modal ", this.global.Product);
    console.log("Up sell modal id ", this.itemId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpSellItemModalPage');
  }

  goToback() {
    this.global.Product.forEach(menuItem => {
      if (menuItem.uniqueId == this.itemId && menuItem.upsell_calculated == false) {
        if (menuItem.menuUpsellItemsSelected.length > 0) {
          for (let i = 0; i < menuItem.menuUpsellItemsSelected.length; i++) {
            this.upsellTotal = this.upsellTotal + Number(menuItem.menuUpsellItemsSelected[i].price);
          }
        }
      }
      menuItem.upsell_calculated = true;
      menuItem.totalPrice = Number(menuItem.totalPrice) + this.upsellTotal;
    });
    console.log("Up sell calc ", this.global.Product);
    this.viewCtrl.dismiss();
  }

  addToCart(item) {
    this.global.Product.forEach(menuItem => {
      if (menuItem.uniqueId == this.itemId && menuItem.upsell_calculated == false) {
        menuItem.menuUpsellItemsSelected.push({
          "currency": "$",
          "instructions": "",
          "reward": false,
          "reward_id": 0,
          "name": item.name,
          "price": item.price,
          "id": item.id,
          "disable": true
        });
      }
    });

    this.productList.forEach(upSellItem => {
      if (upSellItem.id == item.id) {
        item.disable = true
      }
    });
    console.log("After Adding ", this.global.Product)
  }
}

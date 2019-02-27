import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';


@IonicPage()
@Component({
  selector: 'page-giftcards',
  templateUrl: 'giftcards.html',
})
export class GiftcardsPage {
  giftcard:any = 'notbuyed';
  mygifts:any;
  banner:any;
 
  constructor(public alertCtrl:AlertController,public loadingCtrl: LoadingController, public server: ServerProvider, public global: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
 
    this.my_gift_cards();
    this.loadBanner_design()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiftcardsPage');
  }
  buy(banner){
   this.navCtrl.push('GiftcardBannerPage',{banner:banner})
  }
  

  loadBanner_design() {
    let loading = this.loadingCtrl.create({
      content: "Loading...",
  });
  loading.present();
    let response = this.server.my_gift_cards_design();
    response.subscribe(data => {
      loading.dismiss();
      this.banner = data;
        console.log("design",data)
      
    }
    , error => {
      loading.dismiss();

    });
}
 

  

my_gift_cards() {
  let loading = this.loadingCtrl.create({
      content: "Loading...",
  });
  loading.present();

  let response = this.server.my_gift_cards();
  response.subscribe(data => {
      this.mygifts = data;
     
      loading.dismiss();
  
  }, error => {
      loading.dismiss();
      this.global.presentToast("Something went wrong check your internet connection.")

  });
}

refill(item){
  this.navCtrl.push('BuygiftcardsPage',{gift_id:item.giftcard_id,udid_r:this.global.udid,design_id:item.giftcard_id,amount:item.amount,message:item.message});   

}




}

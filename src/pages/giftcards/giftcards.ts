import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';


@IonicPage()
@Component({
  selector: 'page-giftcards',
  templateUrl: 'giftcards.html',
})
export class GiftcardsPage {
  giftcard:any = 'notbuyed';
  gifts:any;
  mygifts:any;
  constructor(public loadingCtrl: LoadingController, public server: ServerProvider, public global: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
    this.get_gift_cards();
    this.my_gift_cards();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiftcardsPage');
  }
  buy(id){
    this.navCtrl.push('BuygiftcardsPage',{gift_id:id});
  }

  get_gift_cards() {
    let loading = this.loadingCtrl.create({
        content: "Loading...",
    });
    loading.present();

    let response = this.server.gift_cards();
    response.subscribe(data => {
        console.log("gift cards",data);
        this.gifts = data;
       
        loading.dismiss();
    
    }, error => {
        loading.dismiss();
        this.global.alertMessage("Failure","Something went wrong check your internet connection.")

    });
}

my_gift_cards() {
  let loading = this.loadingCtrl.create({
      content: "Loading...",
  });
  loading.present();

  let response = this.server.my_gift_cards();
  response.subscribe(data => {
      console.log("gift cards",data);
      this.mygifts = data;
     
      loading.dismiss();
  
  }, error => {
      loading.dismiss();
      this.global.alertMessage("Failure","Something went wrong check your internet connection.")

  });
}

}

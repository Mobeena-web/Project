import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { GlobalVariable } from "../../app/global";
import { ServerProvider } from "../../providers/server/server";


@IonicPage()
@Component({
  selector: 'page-point-rewards',
  templateUrl: 'point-rewards.html',
})
export class PointRewardsPage {
  reward_detail:any;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public server: ServerProvider, public globals: GlobalVariable,public loadingCtrl:LoadingController) {
    this.reward_detail = this.navParams.get('reward_data');
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointRewardsPage');
  }

  redeem_reward() {

    let loading = this.loadingCtrl.create({
        content: "Loading...",

    });
    loading.present();

    let response = this.server.redeem_point_reward(this.reward_detail.reward_id);
    response.subscribe(data => {
       if(data.status == true){
        this.globals.presentToast(data.message);
        this.navCtrl.pop();
       }
       else{
        this.globals.presentToast(data.message)
       }
      
        loading.dismiss();
        
    }, error => {
        loading.dismiss();
        this.globals.presentToast("Server times out, please try again")
       

    });

}

back(){
  this.navCtrl.pop();
}

}

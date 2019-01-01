import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';
import { NativeStorage } from '@ionic-native/native-storage';


@IonicPage()
@Component({
  selector: 'page-business-login',
  templateUrl: 'business-login.html',
})
export class BusinessLoginPage {
  username:any;
  password:any;
  constructor( private nativeStorage: NativeStorage,public loadingCtrl: LoadingController,public server: ServerProvider,public globals: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessLoginPage');
  }

  login_business(){
    if(this.username && this.password){
      let response = this.server.SendLogindataToServer(this.username,this.password);
      let loading = this.loadingCtrl.create({
        content: "Please wait...",

      });
      loading.present();
      response.subscribe(res => {
        loading.dismiss();
       
        if (res.status == 'true') {
          
          this.globals.business_username = res.username;
          this.globals.new_id = res.id
          this.navCtrl.setRoot('BeforeLoginPage')
          this.nativeStorage.setItem('business',
            {
              business_username: res.username,
              business_id:res.id
              
            }).then(() => {
                this.navCtrl.setRoot('BeforeLoginPage')
             
            })
            .catch((err) => { console.log(err) });
        } else {
          this.globals.presentToast('User not exits.')
        }
      });
    }
    else{
      this.globals.presentToast('Something Missing.Please Fill All Required Fields')
    }
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { NativeStorage } from '@ionic-native/native-storage';



@IonicPage()
@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class ThankyouPage {

  constructor(private nativeStorage: NativeStorage,public globals: GlobalVariable,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  }

  done(){
    if(this.globals.caos_flag){
      this.logout();
    }
    else{
      this.navCtrl.popToRoot();

    }
  }

  logout() {
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

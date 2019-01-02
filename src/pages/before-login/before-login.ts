import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController} from 'ionic-angular';
import { IntroPage3Page } from '../intro-page3/intro-page3';
import { HomePage } from '../home/home';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';
import { NativeStorage } from '@ionic-native/native-storage';


@IonicPage()
@Component({
  selector: 'page-before-login',
  templateUrl: 'before-login.html',
})

export class BeforeLoginPage {
  welcome:any;

  constructor(private nativeStorage: NativeStorage,public alertCtrl:AlertController, public loadingCtrl: LoadingController, public server: ServerProvider,public global: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  login(){
    this.navCtrl.push('LoginPage')
  }

  
  register(){
    this.navCtrl.push(IntroPage3Page)
  }
  guestlogin(){
    this.global.guess_login = true;
    if(this.global.branch_enabled == 1){
      this.navCtrl.push('ResturantListPage')
    }
    else{
        this.navCtrl.push('CategoryPage')
    }
  }

  coaslogin(){
    if(this.global.branch_enabled == 1){
      this.navCtrl.push('ResturantListPage')
    }
    else{
        this.navCtrl.push('CategoryPage')
    }
  }

  logout_kiosk(password){
    if(password){
      let response = this.server.SendLogindataToServer(this.global.business_username,password);
      let loading = this.loadingCtrl.create({
        content: "Please wait...",

      });
      loading.present();
      response.subscribe(res => {
        loading.dismiss();
       
        if (res.status == 'true') {
          
            this.nativeStorage.remove('business')
            .then(data => {
              
              this.navCtrl.setRoot('BusinessLoginPage')
            }).catch(err => console.log());
        } else {
          this.global.presentToast('Invalid Password.')
        }
      });
    }
    else{
      this.global.presentToast('Something Missing.Please Fill All Required Fields')
    }
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Business Logout',
      inputs: [
        
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: data => {
           this.logout_kiosk(data.password)
          }
        }
      ]
    });
    alert.present();
  }

  

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { IntroPage3Page } from '../intro-page3/intro-page3';
import { HomePage } from '../home/home';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';


@IonicPage()
@Component({
  selector: 'page-before-login',
  templateUrl: 'before-login.html',
})
export class BeforeLoginPage {
  welcome:any;
  constructor( public loadingCtrl: LoadingController, public server: ServerProvider,public global: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
    this.welcome_data();
    
  }

  welcome_data() {
    let loading = this.loadingCtrl.create({
        content: "Loading...",
    });
    loading.present();

    let response = this.server.welcome_screen();
    response.subscribe(data => {
        loading.dismiss();
        this.welcome = data;
        console.log("welcome data",this.welcome)
    }, error => {
      loading.dismiss();

        this.global.alertMessage("Failure","Something went wrong check your internet connection.")

    });
}

  login(){
    this.navCtrl.push('LoginPage')
  }
  
  register(){
    this.navCtrl.push(IntroPage3Page)
  }
  guestlogin(){
    this.global.guess_login = true;
    this.navCtrl.push('ResturantListPage');
  }

}

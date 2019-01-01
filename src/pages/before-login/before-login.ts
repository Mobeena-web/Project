import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
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

  

}

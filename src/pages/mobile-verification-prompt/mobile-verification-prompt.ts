import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController,ViewController } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';
import { IntroPage7Page } from "../intro-page7/intro-page7";
@Component({
  selector: 'page-mobile-verification-prompt',
  templateUrl: 'mobile-verification-prompt.html',
})
export class MobileVerificationPromptPage {

  checkEmail : any ;
  checkphone : any;
  validEmail : boolean = true;
  validPhone : boolean ;
  constructor(public viewCtrl: ViewController, public alertCtrl: AlertController,public server: ServerProvider,public modalCtrl: ModalController,public globals: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {

    this.checkEmail= this.globals.Email;
    this.checkphone = this.globals.PhoneNo;
    console.log("email",this.checkEmail);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MobileVerificationPromptPage');
  }
  Submit(){
    this.DoMobileVerification();
  }
  Cancel(){
    this.viewCtrl.dismiss();
   

  }
  DoMobileVerification() {
    // let model = this.modalCtrl.create('MobileVerificationPage');
    // model.present();
    let response = this.server.MobileVerification();

    response.subscribe(data => {
        console.log(data);
        var verficationResponse = data;
        console.log(verficationResponse);
        if (verficationResponse.status == true) {
          
          this.globals.email_verified = verficationResponse.email_verification;
          this.globals.phone_verified = verficationResponse.phone_verification;
          console.log("phone flag",this.globals.phone_verified,"email flag",this.globals.email_verified);
          //this.viewCtrl.dismiss();
          if(verficationResponse.email_verification == false && verficationResponse.phone_verification == false){
            this.viewCtrl.dismiss();  
            this.navCtrl.push(IntroPage7Page);
        }
        else{
          let model = this.modalCtrl.create('MobileEmailVarificationPage');
          model.present();
        }
          
        }
        else {
            let alert = this.alertCtrl.create({
                title: "Error",
                message: verficationResponse.message,
                buttons: ["OK"]
            });
            alert.present();
        }

    }, error => { console.log(error); });

}

}

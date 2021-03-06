import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController,ModalController} from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';

@IonicPage()
@Component({
  selector: 'page-giftcard-banner',
  templateUrl: 'giftcard-banner.html',
})
export class GiftcardBannerPage {
banner:any;
card_banner:any;
design_id:any;
gifts:any;
amount:any;
otherselected:boolean = false;
card_id:any;
message:any;
policy:any;
  constructor(public modalCtrl:ModalController,public alertCtrl:AlertController,public loadingCtrl: LoadingController, public server: ServerProvider, public global: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
   this.card_banner =  this.navParams.get('banner');
   this.get_gift_cards();
   this.design_id = this.card_banner.design_id;
  }
  buy(id){
    this.otherselected = false;
    this.card_id = id;

  }
  otherselect(){
    this.otherselected = true;
  }



get_gift_cards() {
  let loading = this.loadingCtrl.create({
      content: "Loading...",
  });
  loading.present();

  let response = this.server.gift_cards();
  response.subscribe(data => {
      this.gifts = data.giftcards;
      this.policy = data.policy;
      loading.dismiss();
  
  }, error => {
      loading.dismiss();
      this.global.alertMessage("Failure","Something went wrong check your internet connection.")

  });
}

showConfirm(id) {
  const confirm = this.alertCtrl.create({
    title: 'Gift Card',
    message: 'Do you want to buy it for yourself or want to share?',
    buttons: [
      {
        text: 'Buy',
        handler: () => {
           this.navCtrl.push('BuygiftcardsPage',{gift_id:id,udid_r:this.global.udid,design_id:this.design_id,amount:this.amount,message:this.message});   
        }
      },
      {
        text: 'Share',
        handler: () => {
          this.share_(id);
        }
      }
    ]
  });
  confirm.present();
}



share_(id){
  const prompt = this.alertCtrl.create({
      title: 'Share',
      message: "Enter email of you friend",
      inputs: [
        {
          name: 'email',
          type:'text',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            this.search_user(data.email,id);
          }
        }
      ]
    });
    prompt.present();
}


showConfirm_new_user(email,id) {
  const confirm = this.alertCtrl.create({
    title: 'OOPS!',
    message: 'Your friend is not registered member at our place.Please set up your friends profile.',
    buttons: [
      {
        text: 'Cancel',
        
        handler: () => {
        }
      },
      {
        text: 'Continue',
        handler: () => {
          this.showPrompt_craete_user(email,id)
        }
      }
    ]
  });
  confirm.present();
}

search_user(email,id){
  if(!this.validateEmail(email)){
    this.global.presentToast("Invalid Email Format.")
  }
  else{
    let loading = this.loadingCtrl.create({
      content: "Loading...",
  });
  loading.present();

  let response = this.server.search_user(email);
  response.subscribe(data => {
      if(data.length == 0){
      this.showConfirm_new_user(email,id)

      }
      else{
          this.navCtrl.push('BuygiftcardsPage',{gift_id:id,udid_r:data[0].udid,design_id:this.design_id,amount:this.amount,message:this.message}); 
      }
      loading.dismiss();
  
  }, error => {
      loading.dismiss();
      this.global.alertMessage("Failure","Something went wrong check your internet connection.")

  });
  }
 
}

create_new(email,fname,lname,id){
  let loading = this.loadingCtrl.create({
    content: "Loading...",
  });
  loading.present();

  let response = this.server.craete_user(email,fname,lname);
  response.subscribe(data => {
     if(data.status == true){
      this.navCtrl.push('BuygiftcardsPage',{gift_id:id,udid_r:data.udid,design_id:this.design_id,amount:this.amount,message:this.message}); 

     }
     else{
      this.global.alertMessage("Failure","Error in creating new user.")

     }
      loading.dismiss();

  }, error => {
      loading.dismiss();
      this.global.alertMessage("Failure","Something went wrong check your internet connection.")

  });
}

showPrompt_craete_user(email,id) {
  var bool = true;
  const prompt = this.alertCtrl.create({
    title: 'Create Account',
    message: "Enter your friend details of email " + email,
    inputs: [
      
      {
        name: 'fname',
        placeholder: 'First Name'
      },
      {
        name: 'lname',
        placeholder: 'Last Name'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Create',
        handler: data => {
          this.create_new(email,data.fname,data.lname,id)
        }
      }
    ]
  });
  prompt.present();
}

validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

proceed(){
  if(Number(this.amount) > 0 && Number(this.amount) <= this.global.giftcard_amount_limit){
    if(this.otherselected){
      this.showConfirm('');
  
    }
    else{
      this.showConfirm(this.card_id);
  
    }
  }
  else{
    this.global.presentToast("Enter Amount in Range 1-" + this.global.giftcard_amount_limit)
  }
 
}

termsandconditions(){
  let modal = this.modalCtrl.create('GiftcardTermsandconditionsPage',{policy:this.policy});
  modal.present();
}

}

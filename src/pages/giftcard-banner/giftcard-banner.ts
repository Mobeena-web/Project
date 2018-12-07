import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
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

  constructor(public alertCtrl:AlertController,public loadingCtrl: LoadingController, public server: ServerProvider, public global: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
   this.card_banner =  this.navParams.get('banner');
   this.get_gift_cards();
   this.design_id = this.card_banner.design_id;
  }
  buy(id){
    this.showConfirm(id)
  }



get_gift_cards() {
  let loading = this.loadingCtrl.create({
      content: "Loading...",
  });
  loading.present();

  let response = this.server.gift_cards();
  response.subscribe(data => {
      this.gifts = data;
     
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
           this.navCtrl.push('BuygiftcardsPage',{gift_id:id,udid_r:this.global.udid,design_id:this.design_id});   
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
    title: 'Failure',
    message: 'User not exists,you want to create new account of your friend.',
    buttons: [
      {
        text: 'Cancel',
        
        handler: () => {
        }
      },
      {
        text: 'Create',
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
          this.navCtrl.push('BuygiftcardsPage',{gift_id:id,udid_r:data[0].udid,design_id:this.design_id}); 
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
      this.navCtrl.push('BuygiftcardsPage',{gift_id:id,udid_r:data.udid,design_id:this.design_id}); 

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

}

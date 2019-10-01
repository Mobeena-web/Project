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
  businessId:any;
  places: any;
  constructor( private nativeStorage: NativeStorage,public loadingCtrl: LoadingController,public server: ServerProvider,public globals: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessLoginPage');
  }

  login_business(){
    if(this.username && this.businessId){
      
          this.nativeStorage.setItem('business',
            {
              business_username: this.username,
              business_id:this.businessId
              
            }).then(() => {

              this.globals.business_username = this.username;
              this.globals.new_id = this.businessId
              this.list();

                this.navCtrl.setRoot('BeforeLoginPage')
             
            })
            .catch((err) => { console.log(err) });
        
    }
    else{
      this.globals.presentToast('Something Missing.Please Fill All Required Fields')
    }
  }

  list() {
    let response = this.server.getRestaurantslist('100000', 'main', "0,0", '0', 'order');
    response.subscribe(data => {
        this.places = data.results;
        var new_id = this.globals.new_id;
        this.globals.business_list = this.places;
        this.places = this.places.filter(function(item) {       
         return item.business_id === new_id;
       });    
       this.globals.point_check = this.places[0].points_enabled;
       this.globals.punch_check = this.places[0].punches_enabled;
       this.globals.special_offer = this.places[0].special_offer;
       this.globals.events_enabled = this.places[0].events_enabled;
       this.globals.gallery_enabled = this.places[0].gallery_enabled;
       this.globals.pickup = this.places[0].pickup;
       this.globals.latitude = this.places[0].latitude;
       this.globals.longitude = this.places[0].longitude;
       this.globals.hours_operation = this.places[0].hours_operation;
       this.globals.branch_enabled = this.places[0].branch_enabled;
       this.globals.giftcard_enabled = this.places[0].giftcard_enabled;
       this.globals.b_logo = this.places[0].logo;
       this.globals.home_logo = this.places[0].logo;

       this.globals.StripId = this.places[0].stripe_id;
       this.globals.order_instructions = this.places[0].instructions_enabled;
       this.globals.pickup_timing = this.places[0].pickup_timing;
       this.globals.delivery_timing = this.places[0].delivery_timing;
       this.globals.business_username = this.places[0].username;
       this.globals.estimated_time = this.places[0].delivery_time;
       this.globals.business_discount_count = parseInt(this.places[0].business_discount_count);
       this.globals.username = this.places[0].username;
       this.globals.bussinessId = this.places[0].business_id;
       this.globals.admin_stripe = this.places[0].admin_stripe_enabled;
       this.globals.pickupsetting = this.places[0].delivery_time;
       this.globals.tax = this.places[0].tax;
       this.globals.deliveryCharges = this.places[0].delivery_fee;
       this.globals.pickup_Time = this.places[0].pickup_time;
       this.globals.minimun_order = parseInt(this.places[0].minimum_order);
       this.globals.availed_discount_count = parseInt(this.places[0].customer_discount_availed_count);
       this.globals.paypalId = this.places[0].paypal_id;
       this.globals.Timing = this.places[0].hours_operation;
       this.globals.specific_delivery_day = this.places[0].specific_delivery_day;
       this.globals.review_enabled = this.places[0].review_enabled;
       this.globals.delivery_day = this.places[0].delivery_day;
       this.globals.authorize_enabled = this.places[0].authorize_enabled;
       this.globals.card_enabled = this.places[0].card_enabled;
       this.globals.admin_stripe_enabled = this.places[0].admin_stripe_enabled;
       this.globals.catering_enabled = this.places[0].catering_enabled;
       this.globals.catering_cart_enabled = this.places[0].catering_cart_enabled;
       this.globals.giftcard_amount_limit = this.places[0].giftcard_limit;
       this.globals.business_type = this.places[0].business_type;
       this.globals.orders_enabled = this.places[0].orders_enabled;

       
         if (this.globals.pickup == '1') {
             this.globals.pickup = true;
         }
         else {
             this.globals.pickup = false;
         }
         if (this.places[0].delivery == '1') {
             this.globals.delivery = true;
         }
         else {
             this.globals.delivery = false;
         }
         if(this.places[0].cash_enabled == '1'){
             this.globals.cash_enabled = true;
         }
         else{
             this.globals.cash_enabled = false;

         }
        if (this.globals.pickup == '1') {
            this.globals.pickup = true;
        }
        else {
            this.globals.pickup = false;
        }
        if (this.places[0].delivery == '1') {
            this.globals.delivery = true;
        }
        else {
            this.globals.delivery = false;
        }
      
     
    }, error => {
        this.globals.presentToast("Something went wrong check your internet connection.")


    });
 
}

}

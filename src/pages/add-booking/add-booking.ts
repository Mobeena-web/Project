import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController,AlertController } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';
import { CalendarComponentOptions } from "ion2-calendar";

@IonicPage()
@Component({
  selector: 'page-add-booking',
  templateUrl: 'add-booking.html',
})
export class AddBookingPage {
  services: any;
  stylist_list: any;
  book_time = 'now';
  service: any;
  value: any;
  stylist: any;
  timing: any;
  schedule_time: any;
  timings: any = [];
  category : any;
  categories : any;
  selectedCategory : any;
  service_id : any;
  serviceTemp : boolean = true;
  stylistTemp : boolean = false;
  timeTemp : boolean = false;
  paymentTemp : boolean = false;
  cardNumber : any;
  cvv : any;
  expiryMonth : any;
  expiryYear : any;
  paymentDetail : any = [];
  tax : any;
  total : any = 0;
  percent_tip_vlaue : any;
  tip_type: any = 'percent';
  tip : any = 0;
  notes : any;
  mygifts : any = [];
  giftCard : any;
  gift_card_amount = 0;
  gift_array : any;
  amountArray : any =[];

  date: string;
  type: 'string';
  optionsCal: CalendarComponentOptions = {
    from: new Date(),
    color: 'primary',
    pickMode: 'single'
  };

  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController,
    public server: ServerProvider, public global: GlobalVariable,
    public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,) {

    this.schedule_time = this.formatDate();
    //this.get_services_categories();
  }

  formatDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  onDateChange($event) {
    this.schedule_time = $event.format('YYYY-MM-DD');
    this.setStylist();
  }

  clear(){
    this.stylist = '';
    this.timing = '';
    this.stylist_list = '';
    this.schedule_time = '';
    this.date = '';
    this.timings = [];
    this.schedule_time = this.formatDate();
    this.stylistTemp = false;
    this.timeTemp = false;
    this.paymentTemp = false;
    this.tax = 0;
    this.total = 0;
    this.tip = 0;
  }
  typeChange() {
    console.log('OnChange', this.book_time);
    this.service = '';
    this.services = '';
    this.serviceTemp = true;
    this.clear(); 
  }
  ngOnInit() {
    this.get_services_categories();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBookingPage');
  }
  categoryClicked(category){
    this.typeChange();
    this.selectedCategory = category.name;
    this.category = category;
    this.get_services();
  }
  onSegmentChanged($event){

  }
  back(){
    if(this.stylistTemp){
      this.stylistTemp = false;
      this.serviceTemp = true;
    }else if(this.timeTemp){
      this.timeTemp = false;
      this.stylistTemp = true;
    }else if(this.paymentTemp){
      this.paymentTemp = false;
      this.timeTemp = true;
    }
  }
  next(){
    if(this.serviceTemp && this.service){
      this.serviceTemp = false;
      this.stylistTemp = true;
    }else if(this.stylistTemp && this.stylist){
      this.stylistTemp = false;
      this.timeTemp = true;
    }else if(this.timeTemp && this.timing && this.date){
      this.timeTemp = false;
      this.paymentTemp = true;
    }
    else{
      this.global.presentToast("please select the item")
    }
  }
  get_services_categories() {
    let loading = this.loadingCtrl.create({
      content: "Loading...",
    });
    loading.present();

    let response = this.server.get_services_categories();
    response.subscribe(data => {
      if (data.status == true) {
        this.categories = data.data;
        this.category = this.categories[0];
        this.selectedCategory = this.category.name;
        this.get_services();
      }
      loading.dismiss();

    }, error => {
      loading.dismiss();
      this.global.alertMessage("Failure", "Something went wrong check your internet connection.")
    });
  }

  get_services() {
    let loading = this.loadingCtrl.create({
      content: "Loading...",
    });
    loading.present();

    let response = this.server.get_services(this.category.id);
    response.subscribe(data => {
      if (data.status == true) {
        this.services = data.services;
        // this.setService();
      }
      loading.dismiss();

    }, error => {
      loading.dismiss();
      this.global.alertMessage("Failure", "Something went wrong check your internet connection.")
    });
  }
  clickService(service){
    this.clear();
    this.service = service;
    this.setService();
    this.serviceTemp = false;
    this.stylistTemp = true;
    this.total = this.service.price;
  }
  setService() {
    let toast = this.toastCtrl.create({
      message: 'Loading...',
    });
    toast.present();

    let response = this.server.get_stylist(this.service.id);
    response.subscribe(data => {
      if (data.status == true) {
        this.stylist_list = data.stylist;
      }
      toast.dismiss();

    }, error => {
      toast.dismiss();
      this.global.alertMessage("Failure", "Something went wrong check your internet connection.")
    });
  }

  clickStylist(stylist){
   this.stylist = stylist;
   this.setStylist();
   this.stylistTemp = false;
   this.timeTemp = true;
  }

  setStylist() {
    console.log("Schedule ", this.schedule_time);
    let toast = this.toastCtrl.create({
      message: 'Loading...',
    });
    toast.present();
    
    let response = this.server.get_slots(this.service.id, this.stylist.stylist_id, this.schedule_time);
    response.subscribe(data => {
      if (data.status == true) {
        this.timings = data.slots;
      } else {
        this.global.presentToast(data.message)
      }
      toast.dismiss();

    }, error => {
      toast.dismiss();
      this.global.alertMessage("Failure", "Something went wrong check your internet connection.")
    });
  }
  taxValue(){
    if(!this.tax){
    var tax = Number(this.global.tax) / 100 * Number(this.service.price);
    this.tax = tax.toFixed(2);
    this.totalValue();
    }
  }
  percent_tip(tip) {
    this.tip_type = 'percent';
    this.percent_tip_vlaue = tip;
    if (tip) {
        this.total = Number(this.total) - Number(this.tip);
        this.total = this.service.price;
        this.tip = ((Number(this.total) / 100) * tip).toFixed(2);
        this.total = (Number(this.total) + Number(this.tip)).toFixed(2);
        this.totalValue();
    }
}
totalValue(){
  //this.total = this.service.price;
  if(this.tax){
  var total = Number(this.tax) + Number(this.total);
  this.total = total.toFixed(2);
  }
}
customTip() {
  this.tip_type = 'manual';

  let alert = this.alertCtrl.create({
      title: 'Add Gratuity',
      inputs: [
          {
              name: 'tip',
              placeholder: 'Tip',
              type: 'number',
              value: this.tip
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
              text: 'OK',
              handler: data => {
                  data.tip = Math.abs(Number(data.tip));
                  console.log("Tip here >>> ", data);
                  if (data.tip == '') {
                      this.tip = 0;
                  }
                  else {
                      this.total = this.total - Number(this.tip);
                      this.total = this.service.price;
                      this.tip = data.tip;
                      this.total = (Number(this.total) + Number(this.tip)).toFixed(2);
                      this.totalValue();
                  }
              }
          }
      ]
  });
  alert.present();
}
my_gift_cards() {
  let response = this.server.my_gift_cards();
  response.subscribe(data => {
      this.mygifts = data;
  }, error => {
      this.global.presentToast("Something went wrong check your internet connection.")

  });
}

gift_alert() {
  let alert = this.alertCtrl.create();
  alert.setTitle('Select Giftcard');

  this.mygifts.forEach(e => {
      alert.addInput({
          type: 'radio',
          label: '$' + e.amount,
          value: e,
      });

  });

  alert.addButton('Cancel');
  alert.addButton({
      text: 'OK',
      handler: data => {
          if (data) {
              // if (Number(data.amount) > Number(this.total)) {
              //     this.full_reddem_or_partial(data);
              // }
              // else {
                  this.giftCard = data.amount;
                  console.log(this.giftCard, data)
                  this.partial_redeem(data)
              // }
          }


      }
  });
  alert.present();
}
// selectGiftCard(data){
//   console.log("gift card run" , data)
//   console.log(this.giftCard)
//  // var data;
//   data = this.giftCard;
//   if (data) {
//     // if (Number(data.amount) > Number(this.total)) {
//     //     this.full_reddem_or_partial(data);
//     // }
//     // else {
//         this.partial_redeem(data)
//     // }
// }
// }

full_reddem_or_partial(data) {
  let alert = this.alertCtrl.create({
      title: 'Giftcard',
      message: 'Would you like to use your gift card for entire order?',
      buttons: [
          {
              text: 'No',

              handler: () => {
                  this.partial_redeem(data)
              }
          },
          {
              text: 'Yes',
              handler: () => {
                  // this.full_redeem(data)
              }
          }
      ]
  });
  alert.present();
}


partial_redeem(data_gift) {
  let alert = this.alertCtrl.create({
      title: 'Enter amount you want to pay from giftcard.',
      inputs: [
          {
              name: 'amount',
              placeholder: 'Amount'
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
              text: 'Pay',
              handler: data => {
                  if (Number(data_gift.amount) < Number(data.amount)) {
                      this.global.presentToast("You enter amount greater than your giftcard")
                  }
                  else {
                      if (Number(data.amount) > Number(this.total)) {
                          this.global.presentToast("Please Enter More items in cart")
                      }
                      else {
                          this.total = (Number(this.total) - Number(data.amount)).toFixed(2);
                          // this.mygifts.map(
                          //     (checkitem, i, array) => {
                          //         if (checkitem.giftcard_id == data_gift.giftcard_id) {
                          //             checkitem.amount = Number(checkitem.amount) - Number(data.amount)
                          //         }
                          //     }
                          // );
                          // var not_in_array = true;
                          // this.gift_array.forEach(e => {
                          //     if (e.giftcard_id == data_gift.giftcard_id) {
                          //         e.amount = Number(e.amount) + Number(data.amount);
                          //         not_in_array = false;
                          //         console.log("gifts_array", this.gift_array, this.mygifts)

                          //     }

                          // });

                          // if (not_in_array) {
                          //     var giftdata = { giftcard_id: data_gift.giftcard_id, amount: data.amount }
                          //     this.gift_array.push(giftdata);
                          //     console.log("gifts_array", this.gift_array, this.mygifts)

                          // }
                          // this.gift_card_amount = 0;
                          // this.gift_array.forEach(e => {
                          //     this.gift_card_amount = this.gift_card_amount + Number(e.amount)

                          // });


                      }
                  }
              }
          }
      ]
  });
  alert.present();
}

  clickTime(time){
    this.taxValue();
    this.timing = time;
    this.timeTemp = false;
    this.my_gift_cards();
    this.paymentTemp = true;
  }

payment(){
  this.paymentDetail.push({
    'card_number':this.cardNumber,
    'card_month': this.expiryMonth,
    'card_year': this.expiryYear,
    'card_cvc' : this.expiryYear,
    'amount' : this.service.price
  });
  console.log(this.paymentDetail)
}

  book() {
     this.amountArray.push({
    'tip':this.tip,
    'giftcard_amount': this.giftCard,
    'tax': this.tax,
    'total_amount' : this.total,
  });
    this.payment();
    var paymentArray = btoa(JSON.stringify(this.paymentDetail));

    if (this.service != '' && this.stylist != '' && this.timing != '') {
      let loading = this.loadingCtrl.create({
        content: "Loading...",
      });
      loading.present();

      let response = this.server.booking_salon(this.service.id, this.stylist.stylist_id, this.timing.time_slot,paymentArray,this.amountArray,this.notes);
      response.subscribe(data => {
        this.global.presentToast(data.message);
        if (data.status == true) {
          this.navCtrl.pop();
        }
        loading.dismiss();

      }, error => {
        loading.dismiss();
        this.global.alertMessage("Failure", "Something went wrong check your internet connection.")
      });
    } else {
      this.global.alertMessage("Failure", "Data is not complete to process.")
    }
  }
}

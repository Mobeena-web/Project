import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';

import { CalendarModule, CalendarComponentOptions } from "ion2-calendar";

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
  serviceTemp : boolean = false;
  stylistTemp : boolean = false;
  cardNumber : any;
  cvv : any;
  expiryMonth : any;
  expiryYear : any;
  paymentDetail : any = [];


  date: string;
  type: 'string';
  optionsCal: CalendarComponentOptions = {
    from: new Date(),
    color: 'primary',
    pickMode: 'single'
  };

  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController,
    public server: ServerProvider, public global: GlobalVariable,
    public navCtrl: NavController, public navParams: NavParams) {

    this.schedule_time = this.formatDate();
    this.get_services_categories();
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
  }

  typeChange() {
    console.log('OnChange', this.book_time);
    this.service = '';
    this.stylist = '';
    this.schedule_time = '';
    this.timings = [];
    this.schedule_time = this.formatDate();
    this.serviceTemp = false;
    this.stylistTemp = false;
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
        this.selectedCategory = this.categories.name;
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
    this.service = service;
    this.serviceTemp = true;
    this.setService();
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
   this.stylistTemp = true;
   this.setStylist();
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
  clickTime(time_slot){
    this.timing = time_slot;
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
    this.payment();
    var paymentArray = btoa(JSON.stringify(this.paymentDetail));

    if (this.service != '' && this.stylist != '' && this.timing != '') {
      let loading = this.loadingCtrl.create({
        content: "Loading...",
      });
      loading.present();

      let response = this.server.booking_salon(this.service.id, this.stylist.stylist_id, this.timing,paymentArray);
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

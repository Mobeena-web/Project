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
    this.get_services();
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBookingPage');
  }

  get_services() {
    let loading = this.loadingCtrl.create({
      content: "Loading...",
    });
    loading.present();

    let response = this.server.get_services();
    response.subscribe(data => {
      if (data.status == true) {
        this.services = data.services;
      }
      loading.dismiss();

    }, error => {
      loading.dismiss();
      this.global.alertMessage("Failure", "Something went wrong check your internet connection.")
    });
  }

  setService() {
    let toast = this.toastCtrl.create({
      message: 'Loading...',
    });
    toast.present();

    let response = this.server.get_stylist(this.service);
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

  setStylist() {
    console.log("Schedule ", this.schedule_time);
    let toast = this.toastCtrl.create({
      message: 'Loading...',
    });
    toast.present();
    
    let response = this.server.get_slots(this.service, this.stylist, this.schedule_time);
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

  book(time_slot) {
    this.timing = time_slot;

    if (this.service != '' && this.stylist != '' && this.timing != '') {
      let loading = this.loadingCtrl.create({
        content: "Loading...",
      });
      loading.present();

      let response = this.server.booking_salon(this.service, this.stylist, this.timing);
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

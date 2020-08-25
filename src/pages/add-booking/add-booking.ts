import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';

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
  timings: any;

  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController, 
    public server: ServerProvider, public global: GlobalVariable, 
    public navCtrl: NavController, public navParams: NavParams) {

    this.value = this.formatDate();
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
    let toast = this.toastCtrl.create({
      message: 'Loading...',
    });
    toast.present();
    if (this.book_time == 'now') {
      this.schedule_time = 'now'
    }
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

  book() {
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
  }
}

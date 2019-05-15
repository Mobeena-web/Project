import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';

import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  bookings:any;
  errorMenu:any = false;
  constructor(private toastCtrl:ToastController,public loadingCtrl: LoadingController, public server: ServerProvider, public global: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
    this.booking_history();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

  add_bookings(){
    this.navCtrl.push('AddBookingPage')
  }

  doRefresh(refresher) {
    this.booking_history();
    refresher.complete();
}

  booking_history() {
    let loading = this.loadingCtrl.create({
        content: "Loading...",
    });
    loading.present();

    let response = this.server.booking_history();
    response.subscribe(data => {
        if(data.status == true){
          this.bookings = data.data;
          if(this.bookings.length == 0){
            this.errorMenu = true;
          }
        }
        else{
          this.errorMenu = true;
        }
        loading.dismiss();
    
    }, error => {
         loading.dismiss();
        this.global.alertMessage("Failure","Something went wrong check your internet connection.")

    });
}
}

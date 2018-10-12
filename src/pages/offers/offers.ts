import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';


@IonicPage()
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {
  errorMenu:any;
  offers:any;

  constructor(public loadingCtrl: LoadingController, public server: ServerProvider, public global: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
    this.get_offers();
  }

  get_offers() {
    let loading = this.loadingCtrl.create({
        content: "Loading...",
    });
    loading.present();

    let response = this.server.get_offers();
    response.subscribe(data => {
        loading.dismiss();
        if(data.data.length == 0){
          this.errorMenu = true;
        }
        else{
          this.errorMenu = false;
        }
        console.log("offers_usman",data);
        this.offers = data.data.offers;
       
    
    }, error => {
        this.global.alertMessage("Failure","Something went wrong check your internet connection.")

    });
}

offerDetail(item){
  this.navCtrl.push("OfferDetailsPage",{item:item})

}

}

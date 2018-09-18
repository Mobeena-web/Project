import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  events:any;
  errorMenu:boolean = false;
  constructor(public loadingCtrl: LoadingController, public server: ServerProvider, public global: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
    this.get_events();
  }

  get_events() {
    let loading = this.loadingCtrl.create({
        content: "Loading...",
    });
    loading.present();

    let response = this.server.get_events();
    response.subscribe(data => {
        console.log("events_usman",data);
        this.events = data.data;
        if(this.events.length == 0){
          this.errorMenu = true;
        }
        else{
          this.errorMenu = false;
        }
        loading.dismiss();
    
    }, error => {
        this.global.alertMessage("Failure","Something went wrong check your internet connection.")

    });
}

open_detail(item){
  this.navCtrl.push('EventDetailPage',{detail:item})
}

}

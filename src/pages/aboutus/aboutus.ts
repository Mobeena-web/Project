import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';
import { InAppBrowser } from '@ionic-native/in-app-browser';
declare var google;



@IonicPage()
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {
  daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  op_hours:any;
  social_links:any;

  constructor(private iab: InAppBrowser,public server: ServerProvider,public globals: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
    this.get_social();
  }

  ionViewWillEnter() {
    this.loadMap();
  }

  launch(url) {
    console.log("url function");
    console.log(url);
    this.iab.create(url, "_self");
  
  }
  

  loadMap() {
    var myLatLng = new google.maps.LatLng(parseFloat(this.globals.latitude), parseFloat(this.globals.longitude));

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: ''
    });

  }

  get_social() {
    let response = this.server.get_social();
    response.subscribe(data => {
     this.social_links = data.data;

    }, error => {
        console.log(error);

    });
 
}
  
   

}

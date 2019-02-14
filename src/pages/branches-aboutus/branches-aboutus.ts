import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { GlobalVariable } from '../../app/global';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { timestamp } from 'rxjs/operator/timestamp';
declare var google;

@IonicPage()
@Component({
  selector: 'page-branches-aboutus',
  templateUrl: 'branches-aboutus.html',
})
export class BranchesAboutusPage {
  places:any;
  social_links:any;
  aboutus:any;
  daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  hours_operation:any;
  phone:any;
  address:any;
  constructor(public loadingCtrl: LoadingController,private iab: InAppBrowser,public navCtrl: NavController, public navParams: NavParams,public globals: GlobalVariable,public server: ServerProvider) {
    this.resturant_list();
    this.get_social();
    this.get_aboutus();
    this.hours_operation = this.update_time_(this.globals.hours_operation);


  }
  ionViewWillEnter() {
    this.loadMap();
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

  update_time_(p_hours){
    p_hours.forEach(element => {
      if(element[0] != 'opened' && element[0] != 'closed'){
        element[0] = this.tConvert(element[0])
      }
      if(element[1] != 'opened' && element[1] != 'closed'){
        element[1] = this.tConvert(element[1])
      }
    });
    return p_hours;
  }

  tConvert (time_) {
    if(time_ == 0){
      time_ = 12;
     }
 
 if(time_ > 12){
   time_ = time_ + '';
     var ti = time_.split('.');
  
     ti[0] = parseFloat(ti[0])
     ti[0] = ti[0] - 12;
    
     if(ti[1] == "5"){
       ti[1] = ':30'
     }
     else if(ti[1] != "5"){
       ti[1] = ':00'
     }
    time_ = ti[0] + ti[1] + 'PM'
 }
 else{
  time_ = time_ + '';

   var ti:any='';
   ti = time_.split('.');
  
  
   if(ti[1] == "5"){
     ti[1] = ':30'
     time_='';

      time_ = ti[0] + ti[1] + 'AM'

   }
   else if(ti[1] == undefined){
    time_='';

     ti[1] = ':00'
     time_ = ti[0] + ti[1] + 'AM'
   }

 }
 time_ = time_ + '';
 var t = time_.split(':');
   return t[0] +':'+t[1]; // return adjusted time_ or original string
 }

 

  resturant_list(){
    let loading = this.loadingCtrl.create({
      content: "please wait...",
    });
    loading.present();
    let response = this.server.getRestaurantslist('100000', 'branches', '0,0', '100', 'order');

    response.subscribe(data => {
        loading.dismiss();
        this.places = data.results;
      
    }, error => {
    });
  }
  branch_about(name,business_id,hours_operation,latitude,longitude,username){
    this.navCtrl.push('AboutusPage',{name:name,business_id:business_id,hours_operation:hours_operation,latitude:latitude,longitude:longitude,username:username})
  }

  get_social() {
    let response = this.server.get_social();
    response.subscribe(data => {
     this.social_links = data.data;
     

    }, error => {
        console.log(error);

    });
 
}

get_aboutus() {
  let response = this.server.get_about_us(this.globals.new_id);
  response.subscribe(data => {
   this.aboutus = data.data.about[0];
    this.phone = data.data.phone;
    this.address = data.data.address;
  }, error => {
      console.log(error);

  });

}

launch(url) {
  console.log("url function");
  console.log(url);
  this.iab.create(url, "_self");

}

}

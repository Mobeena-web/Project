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
  name:any;
  business_id:any;
  hours_operation:any;
  latitude:any;
  longitude:any;
  reviewData:any;
  length:any;
  username:any;
  aboutus:any;

  constructor(private iab: InAppBrowser,public server: ServerProvider,public globals: GlobalVariable,public navCtrl: NavController, public navParams: NavParams) {
    this.name = this.navParams.get('name');
    this.business_id = this.navParams.get('business_id')

    this.hours_operation = this.navParams.get('hours_operation')
    
    this.username = this.navParams.get('username')
    this.hours_operation = this.update_time_(this.hours_operation);
    this.reviewdata();
    this.get_aboutus();
  
  }

  get_aboutus() {
    let response = this.server.get_about_us(this.business_id);
    response.subscribe(data => {
     console.log("ddn",data.data.about[0])
  
     this.aboutus = data.data.about[0];
  
    }, error => {
        console.log(error);
  
    });
  
  }

  ionViewWillEnter() {
    this.latitude = this.navParams.get('latitude')
    this.longitude = this.navParams.get('longitude');
    this.loadMap();
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
 var t = time_.split(':');
   return t[0] +':'+t[1]; // return adjusted time_ or original string
 }
 
  

  loadMap() {
    var myLatLng = new google.maps.LatLng(parseFloat(this.latitude), parseFloat(this.longitude));
    console.log(myLatLng)
    var map = new google.maps.Map(document.getElementById('mapabout'), {
      zoom: 15,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: ''
    });

  }

  reviewdata() {
    let response = this.server.BusinessInformation(this.username);
    
    response.subscribe(data => {
       
        this.reviewData = data.reviews;
        this.length = this.reviewData.length;
        console.log(this.reviewData)

    }, error => {
     
    });
}

  
  
   

}

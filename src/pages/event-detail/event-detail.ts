import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { SocialSharing } from '@ionic-native/social-sharing';
declare var google;



@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  detail:any;

  constructor(private socialSharing: SocialSharing,public navCtrl: NavController, public navParams: NavParams,private launchNavigator: LaunchNavigator) {
    this.detail = this.navParams.get('detail');
  }

  ionViewDidLoad() {
    this.loadMap();
    console.log('ionViewDidLoad EventDetailPage');
  }

  loadMap(){
    var latlng = this.detail.coordinates.split(",")
   
    var myLatLng = {lat: parseFloat(latlng[0]), lng: parseFloat(latlng[1])};

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

  navigator(){
    var latlng = this.detail.coordinates.split(",")
  
    var adress = [];
    adress.push(parseFloat(latlng[0]));
    adress.push(parseFloat(latlng[1]));
    console.log(adress,"address")

    let options: LaunchNavigatorOptions = {
      // start: 'pakistan',
      // app: LaunchNavigator.APP.GOOGLE_MAPS
    };
    
    this.launchNavigator.navigate(adress, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  share(image,title){
    this.socialSharing.share(title, '', image, '').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }


}

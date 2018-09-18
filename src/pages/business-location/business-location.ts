import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BusinessLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
    selector: 'page-business-location',
    templateUrl: 'business-location.html',
})
export class BusinessLocationPage {
    business_name: any;
    longitude: any;
    latitude: any;
    map: any;
    @ViewChild('map') mapElement: ElementRef;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.latitude = navParams.get('latitude');
        this.longitude = navParams.get('longitude');
        this.business_name = navParams.get('name')
        console.log(this.latitude, this.longitude);


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BusinessLocationPage');
        this.loadMap();
    }

    loadMap() {
        console.log(this.mapElement);



        let latlng = new google.maps.LatLng(this.latitude, this.longitude);

        let mapOptions = {
            center: latlng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        // console.log(position.coords.latitude, position.coords.longitude);
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        //  this.addMarker(position.coords.latitude,position.coords.longitude);
        this.addMarker(this.latitude, this.longitude);

    }



    addMarker(lat: number, lng: number) {
        console.log("hello marker function");
        let latLng = new google.maps.LatLng(lat, lng);
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });

        let content = this.business_name;

        this.addInfoWindow(marker, content);

    }
    addInfoWindow(marker, content) {

        let infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });

    }
}

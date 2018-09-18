import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform, Events, AlertController, ModalController, LoadingController, App, ToastController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { GlobalVariable } from '../../app/global';
import { Geolocation } from '@ionic-native/geolocation';
import { FormControl } from '@angular/forms';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Http } from '@angular/http';
/**
 * Generated class for the DealsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
    selector: 'page-deals',
    templateUrl: 'deals.html',
})
export class DealsPage {
    selectOptions: { title: string; };
    coordinates: string;
    lazloading: boolean;
    mapShownFlag: boolean;

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
    @ViewChild(Content) content: Content;
    long: number;
    lat: number;
    arrayStatus: boolean = false;

    places_array: any;
    orderFlag: boolean = false;

    flag: boolean = false;

    Geocoder_lat : number;
    Geocoder_lng : number;

    option: any;
    data: any;
    searchControl: FormControl;
    places: any;
    distance_array: any = [];
    status: boolean = false;
    pageFlag: boolean = false;
    searchTerm: string = '';
    number: any[] = new Array();
    items: any;
    radius: any = '100000';
    offset: any = 0;
    map: any;
    markers_array: any = [];
    getdealdetail :any ;
    dataofitem: any ;

    constructor(public toastCtrl: ToastController, public http: Http, private diagnostic: Diagnostic, private app: App, public server: ServerProvider, public platform: Platform, public events: Events, public globals: GlobalVariable, public geolocation: Geolocation, public alertCtrl: AlertController, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public _nav: NavController, public navParams: NavParams) {
        this.getLocation();
        //this.getLocationAddress();
        console.log(this.option);
        this.searchControl = new FormControl();
        this.selectOptions = {
            title: 'Distance'
        };
        

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DealsPage');

        // this.option = 'deals';
        this.option = 'places';
        this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

            this.setFilteredItems();

        });


    }
    dataitems(){
    this.getdealdetail=this.server.getdeals().subscribe(
        data =>{
            this.dataofitem = data['result'];
          console.log("our data is here",data.result);
        }         
        
    )

    }
    doInfinite(): Promise<any> {
        console.log('Begin async operation');
        this.offset += 10;
        return new Promise((resolve, enable) => {
            let response = this.server.getRestaurantslist(this.radius, 'branches', this.coordinates, this.offset, 'deals');


            response.subscribe(data => {

                if (data.status == 'true') {

                    data.results.forEach(element => {
                        this.places.push(element);
                    });

                    resolve();
                    console.log(this.places);
                    console.log(this.places.success);
                    if (data.success == 'No data') {

                        this.arrayStatus = true;

                    }
                    else {

                        this.arrayStatus = false;
                        this.places_array = this.places;
                    }
                    this.flag = false;
                    this.content.resize();
                }
                else {
                    // this.presentToast();
                    enable(false);

                }



            }, error => {
                console.log("Error!");


                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Server times out, please try again',
                    buttons: ['Okay']
                });
                alert.present();
                enable(false);
            });

            console.log('Async operation has ended');


        })
    }

    getLocation() {
        // this.diagnostic.isLocationEnabled()
        //     .then((state) => {
        //         console.log(state);
        //         if (state) {
        //             this.status = false;

                    this.arrayStatus = false;
                    this.flag = true;
                    this.geolocation.getCurrentPosition().then((position) => {
                       
                        console.log("geo lat",this.Geocoder_lat,this.Geocoder_lng);
                        this.coordinates = position.coords.latitude + "," + position.coords.longitude;
                        this.list();
                        console.log("map extract address",this.coordinates);

                    }, (err) => {
                        console.log(err);

                    });
                   
                // } else {
                //     this.status = true;
                //     let alert = this.alertCtrl.create({
                //         title: 'Location is disabled',
                //         subTitle: 'In order to proceed, please enable your location.',
                //         buttons: ['Okay']
                //     });

                //     alert.present();
                // }
            // }).catch(e => console.error(e));

    }
    secondapi(){
        
       

    }

    list() {
        console.log("coordinates",this.coordinates);

        // this.arrayStatus = false;
        // this.flag = true;
        // this.geolocation.getCurrentPosition().then((position)=>{
        //  this.coordinates = position.coords.latitude+","+position.coords.longitude
        //  this.lat = position.coords.latitude;
        //  this.long = position.coords.longitude;
        
        
        let response = this.server.getRestaurantslist(this.radius, 'branches', this.coordinates, this.offset, 'deals');

        response.subscribe(data => {

            console.log("data", data);

            console.log(this.places);
            //console.log(this.places.success);
            console.log(data.success, data.status);

            if (data.status == 'false') {

                console.log("if check true");
                this.arrayStatus = true;

            }
            else {
                this.places = data.results;

                this.arrayStatus = false;
                this.places_array = this.places;
            }


            this.flag = false;
            this.content.resize();
        }, error => {
            console.log("Error!");


            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Server times out, please try again',
                buttons: ['Okay']
            });
            alert.present();

        });



        // },(err)=>{
        //     console.log(err);

        // });





    }

    // presentToast() {
    //     let toast = this.toastCtrl.create({
    //       message: 'Showing all data.',
    //       duration: 3000
    //     });
    //     toast.present();
    //   }


    SegmentChange() {
        if (this.option == 'map' && !this.mapShownFlag) {
            this.loadMap();
            this.getMarkers();
            this.mapShownFlag = true
        }
    }
    setFilteredItems() {

        // if(this.places !== undefined)
        // {
        //     this.places =    this.places_array.filter((item) => {
        //         return item.keywords.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ;
        //     });
        // }
        // else{
        //     return;
        // }
        //console.log("filtered items",this.places);

        if (this.searchTerm.length >= 3) {
            let response = this.server.LiveSearch(this.searchTerm.toLowerCase(), this.coordinates, this.radius, 'branches');

            response.subscribe(data => {
                console.log(data);

                if (data.status == 'true') {
                    this.places = data.results;
                }
                else {
                    return;
                }
            }, error => {
                console.log(error);

            });

        }
        if (this.searchTerm == '') {
            this.offset = 0;
            let response = this.server.getRestaurantslist(this.radius, 'branches', this.coordinates, this.offset, 'deals');


            response.subscribe(data => {

                this.places = data.results;

            }, error => {
                console.log("Error!");


                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Server times out, please try again',
                    buttons: ['Okay']
                });
                alert.present();

            });
        }
    }


    description(data, distance, offer, rating, hours) {
        console.log("hours", hours);
        this._nav.push('DescriptionPage', { details: data, location: distance, offerText: offer, average_rating: rating, openinghours: hours })
    }

    Reviews(data) {

        // let modal = this.modalCtrl.create('ReviewsPage', { place: data});
        // modal.present();
        this._nav.push('ReviewsPage', { place: data })
    }


    

//     getLocationAddress() {

//         //this.getLocation();
        
        
//         console.log("check get location address function");
//         this.geolocation.getCurrentPosition().then((res)=>{
//             this.Geocoder_lat = res.coords.latitude;
//             this.Geocoder_lng = res.coords.longitude;
//             console.log("geocoder lattitude",this.Geocoder_lat, this.Geocoder_lng);
//         this.nativeGeocoder.reverseGeocode(res.coords.latitude, res.coords.longitude)
//             .then((result: NativeGeocoderReverseResult) => {
//                 console.log("testing result$$$",result);
//                 console.log("testing results with json ",JSON.stringify(result[0] ));
//                 let str : string   = `The reverseGeocode address is ${result.countryCode} in ${result.postalCode}`;
//                 console.log("geocoder string",str);
//                 console.log("@@@!!!!!....???checking adb logcat for location ",result[0].countryName);
//                 console.log("checking geocoders");
//                 alert("!!!!!!The address is: \n\n" + str + JSON.stringify(result[0] ) + result[0].countryName) ;

//             })
//             .catch((error: any) =>{console.log("geocoder error",error), alert(("data not found")) } );
//     })
// }


    OrderCategory(businessId, paypalId, discountvalue, stripeId, hours, min, time, deliveryFee, tax) {
        console.log("id", businessId);
        this.globals.bussinessId = businessId;
        console.log("businessdiscount", this.globals.BusinessDiscount);
        this.globals.estimated_time = time;
        this.globals.StripId = stripeId;
        this.globals.Timing = hours;
        this.globals.deliveryCharges = deliveryFee;
        this.globals.tax = tax;
        console.log("min", min);
        if (min == '') {
            this.globals.minimun_order = 0;
        }
        else {
            this.globals.minimun_order = Number(min);
        }
        console.log("time", this.globals.Timing);


        this._nav.push('CategoryPage', { pageflag: this.pageFlag, BusinessId: businessId, paypal: paypalId, discount: discountvalue });
    }


    getMarkers() {
        this.http.get('http://34.203.122.153/api/adsonscanapp/index.php/customer_controller/getplaces')
            .map((res) => res.json())
            .subscribe(data => {
                this.addMarkersToMap(data);
                console.log("google map",this.data);
            });
           
            
    }


    addMarkersToMap(markers) {
        console.log(markers);
        for (let marker of markers) {

            let latLng = new google.maps.LatLng(marker.latitude, marker.longitude);
            let mark = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: latLng
            });


            let content = marker.name;

            this.addInfoWindow(mark, content);
            console.log("content",content);
        }
    }

    loadMap() {
        console.log("load map element ",this.mapElement);
       
      
        this.geolocation.getCurrentPosition().then((position) => {

            let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            let mapOptions = {
                center: latlng,
                zoom: 11,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            this.Geocoder_lat = position.coords.latitude;
            this.Geocoder_lng = position.coords.longitude;
            console.log("load map function",position.coords.latitude, position.coords.longitude);
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            //  this.addMarker(position.coords.latitude,position.coords.longitude);
            this.getMarkers();
            this.addMarker(position.coords.latitude, position.coords.longitude);
        }, (err) => {
            console.log(err);
        });
       

    }


    addMarker(lat: number, lng: number) {
        console.log("hello marker function");
        let latLng = new google.maps.LatLng(lat, lng);
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
       
        let content = "<h4>User</h4>";

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

    doRefresh(refresher) {
        this.offset = 0;
        this.getLocation();
        this.content.resize();
        refresher.complete();
    }
    Radiusvalue() {
        this.offset = 0;
        this.radius = '100000';
        this.list();
    }

}

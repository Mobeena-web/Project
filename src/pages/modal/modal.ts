import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
//import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Http } from '@angular/http';
import { ModalController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { ServerProvider } from '../../providers/server/server';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocationAccuracy } from '@ionic-native/location-accuracy';


declare var google;

// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

// import {Modal2Page} from '../modal2/modal2';
/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  type: string;
  orderSettings: any;
  time: any;
  productName: any;
  future_time: any;
  CurrentAdress: boolean = true;
  NewAddress: boolean;
  ProcessForm: FormGroup;
  Address: string;
  zipcode: string;
  city: string;
  state: string;
  segmentValue: any;
  min: any;
  hours: any;
  future_hours: any;
  future_min: any;
  day: any;
  scheduled_time: any;
  current_adress: any;
  // year: any;
  // month: any;
  datenow: any;
  current: any;
  myDate: any;
  // value: string;
  // deliver_now: boolean = true;
  public unregisterBackButtonAction: any;
  deliveryTime: any;
  new_time: any;
  //current_Time :any ;
  date: any;
  forToday: any;
  convertDate: any;
  pickup_time: any;
  month_array: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  banner: any;
  Images: any;
  time_: any;
  NEW: any = false;
  lat: any;
  long: any;
  coordinates: any;
  order_pickup = this.globals.pickup;
  order_delivery = this.globals.delivery;
  category_page: any;
  branchId: any;
  radius_value: number;
  value: any;
  time_value: any;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;
  map: any;
  selectedDate :any;
  constructor(public loadingCtrl: LoadingController, public server: ServerProvider, public geolocation: Geolocation, public alertCtrl: AlertController, public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams, public viewCtrl: ViewController, public globals: GlobalVariable, public modalCtrl: ModalController, public nativeStorage: NativeStorage, public plt: Platform,
    private locationAccuracy: LocationAccuracy,
    public androidPermissions : AndroidPermissions,
    ) {

    this.segmentValue = localStorage.getItem("segmentvalue");
    this.deliveryTime = this.globals.pickupsetting;
    this.pickup_time = this.globals.pickup_Time;
    this.category_page = this.navParams.get('category_page')
    this.branchId = this.navParams.get('branchId');
    //  this.type = this.globals.OrderType;
    console.log("Pick Up -> ", this.globals.pickupsetting)
    console.log("Segment value -> ", this.segmentValue)
    console.log("gloabl value -> ", this.globals)


    //this.type = localStorage.getItem("type");
    // this.checktype();
    //console.log("localstorage data for testing ", localStorage.getItem("type"));
    if (!this.globals.address) {
      this.globals.checkGPSPermission();
      this.CurrentAdressBox();
    }
    else {
      console.log("p-1.1")
      this.reverseGeoCoding(this.globals.lat, this.globals.long)
    }

    this.ProcessForm = formBuilder.group({
      Address: ['', Validators.compose([Validators.required])],
      // zipcode: ['', Validators.compose([Validators.required])],
      // city: ['', Validators.compose([Validators.required])],
      // state: ['', Validators.compose([Validators.required])],

    })

    // this.unregisterBackButtonAction && this.unregisterBackButtonAction(); 
    plt.registerBackButtonAction(() => {
    }, 1);
    this.min_date_value();
  }

  closetohome() {
    // this.viewCtrl.dismiss();
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    var that = this;
    setTimeout(function () {
      that.loadMaps();
    }, 2000);
  }

  min_date_value() {
    var date = new Date();

    var datenow = date.getDate().toString();
    var month = (date.getMonth() + 1).toString();
    var year = date.getFullYear().toString();

    if (month.length < 2) month = '0' + month;
    if (datenow.length < 2) datenow = '0' + datenow;
    this.value = year + "-" + month + "-" + datenow;
    this.value.toString();

    console.log("value", this.value)

    var date1 = new Date((date.getTime()) - date.getTimezoneOffset() * 60000).toISOString();
    this.globals.myDate = date1;
    this.selectedDate = date1;
  }


  loadMaps() {
    if (google) {
      this.initAutocomplete();
    } else {
      this.globals.presentToast('Something went wrong with the Internet Connection. Please check your Internet.')
    }
  }

  initAutocomplete(): void {
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
    });
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    //autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();

        var address = [
          (place.address_components[0] && place.address_components[0].long_name || ''),
          (place.address_components[1] && place.address_components[1].long_name || ''),
          (place.address_components[2] && place.address_components[2].long_name || ''),

        ].join(' ');
        this.globals.address = address;
        if (!place.geometry) {
          this.globals.locationSelected = false;
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          this.globals.locationSelected = true;
          this.lat = place.geometry.location.lat();
          this.long = place.geometry.location.lng();
          this.reverseGeoCoding(this.lat, this.long);

          sub.next(place.geometry.location);
          //sub.complete();
        }
      });
    });
  }



  tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  getdata() {
    this.time = localStorage.getItem("scheduled_time");
    console.log("time - get data", this.time)

    if (this.time) {
      if (this.globals.specific_delivery_day == 'false') {
        var res = this.time.split("T");

        var res1 = res[1].split(".")
        this.datenow = res[0] + ' ' + this.tConvert(res1[0]);
        this.convertDate = res[0] + ' ' + this.tConvert(res1[0]);
      }
      else {
        var res1 = this.time.split("00")
        this.convertDate = res1[0];
        this.datenow = res1[0];
      }

      // this.date = new Date(this.time );
      // var timeis = new Date(this.time).toLocaleString('en-US', { hour12: true });
    }
    else {
      this.date = new Date(new Date().setHours(new Date().getHours()));
      var timeis = new Date(this.date).toLocaleString('en-US', { hour12: true });
      this.datenow = timeis;

      this.convertDate = timeis;
    }

    //this.date = new Date(local_datetime);

    // let timeis =  new Date(this.time).toJSON().split('T')[0];
    // this.convertDate.toString();
    //   let hourss = this.date.getHours();
    //   let mins = this.date.getMinutes();
    // let dayyy = this.date;

    //   let local_datetime = new Date(this.time).toLocaleString('en-US', { hour12: false });
    //       this.date = new Date(local_datetime );
    // console.log("getting time", localStorage.getItem("scheduled_time"),this.convertDate , "local date", this.date);
    //   this.nativeStorage.getItem('orderdetail').then(data => {
    //     this.time = data.scheduled_time;
    //     this.time = this.time.toJSON().split('.')[0];
    //     this.productName = data.name;

    //     //this.type = data.type;


    // }, error => {
    //     this.time = 'Apr,10,2018'

    // }).catch(err => console.log(err));
    // console.log("checking type",this.type,this.time);
  }

  onsegmentChanged() {
    // this.loadMap(this.lat,this.long)
    this.globals.checkGPSPermission();
    this.CurrentAdressBox();
    console.log("OrderType",this.globals.OrderType)
    if (this.globals.OrderType == "delivery") {

      this.globals.OrderType = "delivery";
      // this.segmentValue = "Asap"
      this.globals.delivery == true;
      // localStorage.setItem("type","delivery" )
    }
    else {
      this.globals.OrderType = "pickup";
      // this.segmentValue = "Asap"
      this.globals.pickup == true;
      //localStorage.setItem("type","pickup" );

    }

    this.getTiming();

  }
  // geolocate() {
  //   let options = {
  //     enableHighAccuracy: true
  //   };

  //     this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
  //     this.getcountry(position);
  //   }).catch((err) => {
  //     alert(err);
  //   })

  // }

  // getcountry(pos) {
  //   this.nativeGeocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude).then((res: NativeGeocoderReverseResult) => {
  //     alert("get address" + res.countryName);
  //   })
  // }
  // checktype(){

  //   if(this.type == "delivery"){

  //     localStorage.setItem("type","delivery" );
  //     this.type = "delivery"
  //     console.log("localstorage data delivery", localStorage.getItem("type"));
  //   }
  //   else{
  //     localStorage.setItem("type","pickup" );
  //     this.type = "pickup"
  //     console.log("localstorage data pickup ", localStorage.getItem("type"));
  //   }

  // }
  // getOrderTime(){
  //   this.nativeStorage.getItem('orderdetailtime').then(data => {
  //     this.future_time = data.future_order_time;



  // }, error => {
  //     this.time = 'Apr,10,2018'

  // }).catch(err => console.log(err));

  // }
  getTiming(){
    let loading = this.loadingCtrl.create({
      content: "Loading...",
    });
    loading.present();
      let response = this.server.scheduleTime(this.selectedDate, this.globals.OrderType);
      response.subscribe(data => {
        loading.dismiss();
        console.log("scheduleTime",data)
        this.globals.myTime = '';
        if(data.status == true){
          this.time_value = data.slots;
        }else{
          this.time_value = '';
          this.globals.presentToast(data.message)
        }
      }, error => {
        loading.dismiss();
        this.globals.presentToast("Something went wrong check your internet connection.")
      });
  }

  ionViewWillEnter() {
    //   this.getCurrentLocation().then((resp) => {
    //   this.reverseGeoCoding(resp.coords.latitude, resp.coords.longitude);
    // });

    //this.getdata();
    if (!this.globals.OrderType) {

      if (this.order_pickup && !this.order_delivery) {
        this.type = "pickup";
        this.globals.OrderType = this.type;

      }
      else if (this.order_delivery) {
        this.type = "delivery";
        this.globals.OrderType = this.type;
      }
    }
    else {

      this.type = this.globals.OrderType;
    }

    this.getTiming();


  }

  dateChanged() {
    this.getTiming();
    //this.dateTimeString()
  }

  dateTimeString(){
    if(this.globals.myTime){ 
    var date = this.selectedDate.split('T')[0];     
    // var s = this.globals.myDate.split(':')[2]
    // var time = this.globals.myTime.split(' ')[0]
    // var dateString = date+'T'+time+':'+s;
    // console.log(dateString)
    var dateString = date+' '+this.globals.myTime;
    console.log(dateString)
    this.globals.myDate = dateString;
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }



  process(ProcessData: any) {
    if (this.globals.order_time == 'schedule') {
      localStorage.setItem("scheduled_time", this.globals.myDate);
    }
    else {
      localStorage.setItem("scheduled_time", this.globals.order_time);
    }

    localStorage.setItem("GetAddress", this.globals.address);

    if (this.globals.OrderType == 'delivery') {
      

      this.checkTimingLater(this.globals.delivery_timing).then((resp) => {
        if(this.globals.address != '' && this.globals.address != undefined && this.globals.inradius == true){
          console.log("delivery inside", this.globals);
          this.dismiss()
        }
        else{
          this.outsideDeliveryRadius();
        }
        
      }).catch((error) => {
      })
    }
    else {
      this.checkTimingLater(this.globals.pickup_timing).then((resp) => {
        this.dismiss()

      }).catch((error) => {
      })

    }



    this.globals.save_check = true;

  }

  process_cancel() {
    if (this.globals.order_time == 'schedule') {
      // localStorage.setItem("scheduled_time", this.globals.myDate);
      console.log("order not scheduled")
      localStorage.setItem("scheduled_time", undefined);
    }
    else {
      localStorage.setItem("scheduled_time", undefined);
    }

    localStorage.setItem("GetAddress", this.globals.address);


    this.dismiss();
  }

  secondModal() {

    // this.checktype();
    //this.viewCtrl.dismiss();
    let modal = this.modalCtrl.create('Modal2Page', { category_page: this.category_page });
    modal.onDidDismiss(data => {
      console.log("Dismiss called ")
      this.segmentValue = localStorage.getItem("segmentvalue");
      this.deliveryTime = this.globals.pickupsetting;
      this.pickup_time = this.globals.pickup_Time;
      this.getdata();
      console.log("Pick Up -> ", this.globals.pickupsetting)
      console.log("Segment value -> ", this.segmentValue)
      if (data == 'CategoryPage') {
        this.category_page = 1;
        console.log(data, "dta", this.category_page)

      }
    });
    modal.present();

  }

  getCurrentLocation(): Promise<any> {
    return new Promise(resolve => {
      console.log("p-3.1 - get current location")
      if (this.globals.delivery == true) {

        this.geolocation.getCurrentPosition().then((resp) => {
          console.log("p-3.2 - current location", resp)
          resolve(resp);
        }).catch((error) => {
          console.log("location error ")
          this.reverseGeoCoding(this.globals.latitude, this.globals.longitude);
        })
      }
    })
  }


  reverseGeoCoding(lat, lng) {
// author: zohra
// purpose : add delivery fee
// used in app
// created : old
// last_modified: 2020-12-29 05:00
// status: active old
    console.log("p-1.2")
    this.globals.lat = lat;
    this.globals.long = lng;
    var mycoordinates = lat + "," + lng;
    let response = this.server.getAddress(mycoordinates, this.branchId);
    var myadress = "";
    response.subscribe(data => {
      console.log("p-4.1")
      this.loadMap(lat, lng);
      myadress = data.address;
      this.globals.address = myadress;
      this.globals.delivery_fee = data.delivery_meta.delivery_fee;

      this.globals.inradius = data.in_radius;

      if (data.delivery_meta && data.delivery_meta.id) {
        this.globals.pickupsetting = data.delivery_meta.delivery_time;
        this.globals.minimun_order = data.delivery_meta.delivery_minimum_order;
        this.globals.deliveryCharges = data.delivery_meta.delivery_fee;

      }
      if (data.in_radius == false) {

        if (this.globals.pickup == true) {
          this.type = "pickup";
          this.globals.OrderType = this.type;
        }
        else {
          this.outsideDeliveryRadius();
        }

      }
      localStorage.setItem("GetAddress", myadress);

    }, error => {
      localStorage.setItem("GetAddress", "");

      this.globals.presentToast("Something went wrong check your internet connection.")

    });

  }
  outsideDeliveryRadius(){
    this.globals.alertMessage("Sorry", "Your location is out of our delivery radius.");
    
  }

  Getscheduletime() {
    //commented by jahanzaib
    // this.viewCtrl.dismiss();
    // this.navCtrl.pop();

    let modal = this.modalCtrl.create('Modal2Page');
    modal.onDidDismiss(data => {
      console.log("Dismiss called schedule time")
      this.segmentValue = localStorage.getItem("segmentvalue");
      this.deliveryTime = this.globals.pickupsetting;
      this.pickup_time = this.globals.pickup_Time;
      this.getdata();
      console.log("Pick Up -> ", this.globals.pickupsetting)
      console.log("Segment value -> ", this.segmentValue)
      if (data == 'CategoryPage') {
        this.category_page = 1;
        console.log(data, "dta", this.category_page)

      }
    });
    modal.present();
  }
  loadMap(lati, longi) {
    console.log("p-5.1")
    // var latlng = this.coordinates.split(",")
    var myLatLng = new google.maps.LatLng(lati, longi);

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: myLatLng
    });
    console.log("p-5.2 -- ", this.map);

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: ''
    });

  }
  CurrentAdressBox() {
    // this.NEW = true;
    console.log("p-2.1")
    if (this.CurrentAdress == true) {
      
      this.getCurrentLocation().then((resp) => {
        console.log("p-2.2")
        this.loadMap(resp.coords.latitude, resp.coords.longitude);
        this.reverseGeoCoding(resp.coords.latitude, resp.coords.longitude);
        this.NEW = false;
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
      }).catch(e => {
        console.log("Reverse coding")
        this.reverseGeoCoding(0, 0);
      });

      // this.Address =  localStorage.getItem("GetAddress");
      // this.city = "lahore";
      // this.zipcode = "54000";
      // this.state = "punjab";
      this.NewAddress = false;
    } else {
      this.NewAddress = true;
    }
  }

  NewAddressBox() {
    this.NEW = true;
    this.NewAddress = true;
    if (this.NewAddress == true) {
      this.CurrentAdress = true;
      this.removedata();
      this.new_address_prompt();

      //this.CurrentAdress = false;
    }
    else {
      this.CurrentAdress = true;
    }


  }

  new_address_prompt() {
    let alert = this.alertCtrl.create({
      title: 'Your Address',
      inputs: [
        {
          name: 'street',
          placeholder: 'Street'
        },
        {
          name: 'apt',
          placeholder: 'Apt#',
        },
        {
          name: 'city',
          placeholder: 'City',
        },
        {
          name: 'state',
          placeholder: 'State',
        },
        {
          name: 'zip',
          placeholder: 'Zip',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Done',
          handler: data => {
            this.Address = data.street + ',' + data.apt + ',' + data.city + ' ' + data.state + ',' + data.zip;
            localStorage.setItem("address", this.Address);

          }
        }
      ]
    });
    alert.present();
  }


  removedata() {
    this.Address = "";
    this.city = "";
    this.zipcode = "";
    this.state = "";
  }

  Updateyourorder() {

    if (this.globals.OrderType == 'delivery') {
      this.checkTimingLater(this.globals.delivery_timing);
    }
    else {
      this.checkTimingLater(this.globals.pickup_timing);
    }

    if (this.globals.order_time == 'schedule') {
      localStorage.setItem("scheduled_time", this.globals.myDate);
    }
    else {
      localStorage.setItem("scheduled_time", undefined);
    }

    this.globals.OrderType = "pickup"
    this.viewCtrl.dismiss();

    this.globals.save_check = true;

  }
  //   checkTiming() {


  //     if (this.globals.OrderType = "delivery") {
  //         console.log("checking timing ");
  //         console.log("global timings", this .globals.Timing);
  //         if (this.globals.Timing) {
  //             let local_datetime = new Date().toLocaleString('en-US', { hour12: false });
  //             this.date = new Date(local_datetime);
  //             console.log("",this.date);
  //             this.scheduled_time = localStorage.getItem("scheduled_time");
  //             this.day = this.date.getDay();
  //             this.time = this.date.getHours();
  //             this.min = this.date.getMinutes();
  //             this.time = this.time + "." + this.min;
  //             console.log("day", "hours", this.day, this.time);
  //             let current_day = this.globals.Timing[this.day];
  //             // this.time = this.time.toString();
  //             console.log(this.time,"current day", current_day );
  //             console.log(this.globals.Timing);
  //             if (current_day[0] != 'opened') {
  //                 if (Number(this.time) <= Number(current_day[0]) || Number(this.time) >= Number(current_day[1]) || current_day[0] == 'closed') {
  //                     let alert = this.alertCtrl.create({
  //                         title: 'Sorry',
  //                         subTitle: 'Restaurants currently closed.',
  //                         buttons: ['OK']
  //                     });
  //                     alert.present();
  //                     return false;
  //                 }
  //                 else {
  //                     return true;
  //                 }
  //             }
  //             else {
  //                 return true;
  //             }



  //         }
  //         else {
  //             console.log("else");
  //             return true;
  //         }
  //     }
  //     else {
  //         console.log("bigelse");
  //         console.log("userDate", this.globals.myDate);
  //         var future_date = new Date(this.globals.myDate);
  //         console.log(future_date);
  //         var future_day = future_date.getDay();
  //         this.globals.myDate = this.globals.myDate.toString();
  //         console.log(this.globals.myDate);
  //         this.future_hours = future_date.getHours();
  //         this.future_min = future_date.getMinutes();

  //         this.future_time = this.future_hours + "." + this.future_min;

  //         console.log("future_hours", this.future_hours, this.future_time);

  //         if (this.globals.Timing) {
  //             console.log(future_day);

  //             var current_day = this.globals.Timing[future_day];
  //             console.log(current_day);

  //             console.log(current_day[0], current_day[1], this.future_time);
  //             //  console.log(parseFloat(time) , parseFloat(current_day[0]),parseFloat(current_day[1]))
  //             if (current_day[0] != 'opened') {
  //                 if (Number(this.future_time) <= Number(current_day[0]) || Number(this.future_time) >= Number(current_day[1]) || current_day[0] == 'closed') {
  //                     let alert = this.alertCtrl.create({
  //                         title: 'Sorry',
  //                         subTitle: 'Restaurants closed on the given time and date.',
  //                         buttons: ['OK']
  //                     });

  //                     alert.present();
  //                     return false;
  //                 }
  //                 else {
  //                     return true;
  //                 }
  //             }
  //             else {
  //                 return true;
  //             }



  //         }
  //         else {
  //             console.log("else");
  //             return true;
  //         }

  //         // return true;
  //     }
  // }

  //   initializeBackButtonCustomHandler(): void {
  //     this.unregisterBackButtonAction = this.plt.registerBackButtonAction(function(event){
  //         console.log('Prevent Back Button Page Change');
  //     }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  // }   

  checkTimingLater(timing) {
    return new Promise((resolve, reject) => {
      if (this.globals.order_time == 'schedule') {
        if(this.globals.myTime){
        var response: any;

        if (this.globals.specific_delivery_day == 'true') {
          response = this.server.date_convert(this.globals.myDate);

        }
        else {
          response = this.server.date_convert(this.globals.myDate);
        }
        let loading = this.loadingCtrl.create({
          content: "Loading...",
        });
        loading.present();
        response.subscribe(data => {
          loading.dismiss();
          if (data.success == true) {
            this.day = data.day_id + 1;
            if (this.day == 7) {
              this.day = 0;
            }
            this.time = data.time;

            this.globals.schedule_day_id = data.day_id;
            this.globals.schedule_converted_time = data.time;

            if (this.globals.specific_delivery_day == 'true') {
              localStorage.setItem("scheduled_time", this.globals.myDate);
            }
            else {
              localStorage.setItem("scheduled_time", this.globals.myDate);
            }
            let current_day = timing[this.day];
            var n = current_day[0].indexOf('.');
            if (n != -1) {
              var res = current_day[0].split(".");
              current_day[0] = res[0] + '.' + '3'
            }
            var n1 = current_day[1].indexOf('.');
            if (n1 != -1) {
              var res = current_day[1].split(".");
              current_day[1] = res[0] + '.' + '3'
            }
            // this.time = this.time.toString();
            console.log(this.day, this.time, current_day)
            if (current_day[0] != 'opened') {
              if ((Number(current_day[0]) <= Number(this.time) && Number(current_day[1]) > Number(this.time)) || (Number(current_day[0]) <= Number(this.time) && Number(current_day[1]) < Number(current_day[0]))) {
                resolve(true);
              }
              else if (current_day[0] == 'opened' && current_day[1] == 'opened') {
                resolve(true);

              }
              else {
                this.globals.presentToast('Sorry, we are not serving at this time. Please reschedule it.')
                reject(true)
              }
            }
            else {
              resolve(true);
            }
          }

        }, error => {
          this.globals.presentToast("Something went wrong check your internet connection.")

        });
      }else{
        this.globals.presentToast("please select the time")
      }
      }
      else {
        console.log('in pickup part 001');
        var date = new Date();
        var day: any = date.getDay();
        var time: any = date.getHours() + "." + date.getMinutes();
        time = Number(time);

        var current_day = timing[day];

        var n = current_day[0].indexOf('.');

        console.log('in pickup part 002', date, day, time, current_day, n);
        if (n != -1) {
          var res = current_day[0].split(".");
          current_day[0] = res[0] + '.' + '3'
        }
        var n1 = current_day[1].indexOf('.');
        if (n1 != -1) {
          var res = current_day[1].split(".");
          current_day[1] = res[0] + '.' + '3'
        }
        console.log('in pickup part 003', n, n1, current_day, time);
        if ((Number(current_day[0]) <= time && Number(current_day[1]) > time) || (Number(current_day[0]) <= time && Number(current_day[1]) < Number(current_day[0]))) {
          resolve(true)
        }
        else if (current_day[0] == 'opened' && current_day[1] == 'opened') {
          resolve(true)
        }
        else {
          this.globals.presentToast('Sorry, we are not serving at this time. Please reschedule it.')
          reject(true)
        }
      }
    });

  }

}

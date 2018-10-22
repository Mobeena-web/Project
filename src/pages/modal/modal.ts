import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
//import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Http } from '@angular/http';
import { ModalController,AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { ServerProvider } from '../../providers/server/server';
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
  orderSettings :any;
  time :any ;
  productName : any;
  future_time : any;
  CurrentAdress :boolean = true;
  NewAddress :boolean ;
  ProcessForm: FormGroup;
  Address : string;
  zipcode : string;
  city : string;
  state: string;
  segmentValue : any;
  min: any;
   hours: any;
   future_hours : any;
  future_min : any;
  day: any;
  scheduled_time : any ;
  current_adress : any ;
  // year: any;
  // month: any;
    datenow: any;
    current: any;
    myDate: any;
  // value: string;
  // deliver_now: boolean = true;
  public unregisterBackButtonAction: any;
  deliveryTime : any ;
  new_time : any;
  //current_Time :any ;
  date :any;
  forToday:any ;
  convertDate : any ;
  pickup_time:any ;
  month_array: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  banner:any;
  Images:any;
  time_:any;
  NEW: any = false;
  lat:any;
  long:any;
  coordinates: any;
  order_pickup = this.globals.pickup;
  order_delivery = this.globals.delivery;
  constructor(public server: ServerProvider,public geolocation: Geolocation, public alertCtrl: AlertController,public navCtrl: NavController,public formBuilder: FormBuilder, public navParams: NavParams, public viewCtrl: ViewController, public globals: GlobalVariable, public modalCtrl: ModalController, public nativeStorage: NativeStorage,public plt: Platform) {
    console.log("testing11",this.globals.pickup , this.globals.delivery)
  
    console.log("min value ", this.forToday,this.globals.MinValue );
   console.log("places", localStorage.getItem("places"));
   //this.type = this.globals.OrderType;

   console.log("date&&&&&&&S",this.new_time);
 
   console.log(this.globals);
   this.segmentValue = localStorage.getItem("segmentvalue");
   this.deliveryTime =  this.globals.pickupsetting;
   this.pickup_time = this.globals.pickup_Time;
  //  this.type = this.globals.OrderType;
  
   console.log("pickup time in Modal 1 ", this.deliveryTime);
  // this.deliveryTime = this.deliveryTime.split('min');
   console.log("pickup time in Modal 1 ", this.deliveryTime);
   console.log("#####segmemnt value ",localStorage.getItem("segmentvalue"), this.segmentValue);
   
    //this.type = localStorage.getItem("type");
    // this.checktype();
    //console.log("localstorage data for testing ", localStorage.getItem("type"));
    this.CurrentAdressBox();
    this.ProcessForm = formBuilder.group({
        Address: ['', Validators.compose([Validators.required])],
      // zipcode: ['', Validators.compose([Validators.required])],
      // city: ['', Validators.compose([Validators.required])],
      // state: ['', Validators.compose([Validators.required])],
      
  })

    // this.unregisterBackButtonAction && this.unregisterBackButtonAction(); 
   this.getdata();
   plt.registerBackButtonAction(() => {
    console.log("backPressed 1");
  },1);

  }
  closetohome(){
    this.viewCtrl.dismiss();
    //  this.navCtrl.popAll();
  }
  
  getdata(){
    console.log("modal 1 time" , this.nativeStorage.getItem('orderdetail'));
    this.time =  localStorage.getItem("scheduled_time");
   
    this.date = new Date(this.time );
     let timeis = new Date(this.time).toLocaleString('en-US', { hour12: false });
    //             this.date = new Date(local_datetime);
                console.log("local @@@@@@")
      // let timeis =  new Date(this.time).toJSON().split('T')[0];
    // this.convertDate.toString();
    let hourss = this.date.getHours();
    let mins = this.date.getMinutes();
  let dayyy = this.date;
    this.datenow = timeis ;
   
     this.convertDate = this.datenow ;
     console.log("hello am here ", this.datenow, hourss);
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

  onsegmentChanged(){
    // this.loadMap(this.lat,this.long)
    console.log("my")
    this.CurrentAdressBox();
    console.log("printing e value ");
    if(this.type == "delivery"){
   
      this.globals.OrderType = "delivery";
      // this.segmentValue = "Asap"
      this.globals.delivery == true;
      console.log("testing segment changed delivery" ,this.globals.OrderType);
     // localStorage.setItem("type","delivery" )
    }
    else{
      this.globals.OrderType = "pickup";
      // this.segmentValue = "Asap"
      this.globals.pickup == true;
      console.log("testing segment changed pickup" ,this.globals.OrderType);
      //localStorage.setItem("type","pickup" );
      
    }
  
    
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

  ionViewWillEnter() {
      //   this.getCurrentLocation().then((resp) => {
      //   this.reverseGeoCoding(resp.coords.latitude, resp.coords.longitude);
      // });


      if(!this.globals.OrderType){
      console.log("usman",this.globals.OrderType)

        if(this.order_pickup && !this.order_delivery){
          this.type = "pickup";
        }
        else if(this.order_delivery && this.order_pickup){
          this.type = "delivery";
        }
      }
      else{
      console.log("usman1",this.globals.OrderType)

        this.type = this.globals.OrderType;
      }
    
 
    
  }
  
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  
  
  process(ProcessData: any){
    
   console.log("process data",this.Address);
   localStorage.setItem("GetAddress",this.Address);
  //  localStorage.setItem("zipcode",this.zipcode);
  //  localStorage.setItem("city",this.city);
  //  localStorage.setItem("zipcode",this.state);
  console.log("local storage",localStorage.getItem("address"));
    this.nativeStorage.setItem('address',
    {
      address: ProcessData.Address,
     
  }).then(() => console.log('Stored item!'),
      error => console.error('Error storing item', error)
  );
    //this.checkTiming();            
    this.globals.OrderType = 'delivery';
    this.viewCtrl.dismiss();
    this.globals.save_check = true;
  }
  
  secondModal(){
    
   // this.checktype();
    console.log("2nd Modal pickupsett",this.globals.pickupsetting);
    this.viewCtrl.dismiss();
      let modal = this.modalCtrl.create('Modal2Page');
      modal.present();
    
  }  

  getCurrentLocation(): Promise<any> {
    return new Promise(resolve => {
      this.geolocation.getCurrentPosition().then((resp) => {
        resolve(resp);
      }).catch((error) => {
        console.log();
      })
    })
  }

  reverseGeoCoding(lat, lng) {
    console.log("7788", lat , lng);
   
    var mycoordinates = lat + "," + lng;
    let response = this.server.getAddress(mycoordinates);
    var myadress="";
    response.subscribe(data => {
      this.loadMap(lat, lng);
        
        myadress = data.address;
        console.log("myadress",myadress)
        this.Address = myadress;
        localStorage.setItem("GetAddress",myadress);

    }, error => {
        localStorage.setItem("GetAddress","");

        this.globals.alertMessage("Failure","Something went wrong check your internet connection.")

    });

  }

  Getscheduletime(){
    this.viewCtrl.dismiss();
      let modal = this.modalCtrl.create('Modal2Page');
      modal.present();
  }
  loadMap(lati, longi) {
    // var latlng = this.coordinates.split(",")
    console.log("mylat",lati,longi)
    var myLatLng = new google.maps.LatLng(lati, longi);;

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
  CurrentAdressBox(){
    console.log("i m current check");
    // this.NEW = true;
    if (this.CurrentAdress == true ) {
      
      this.getCurrentLocation().then((resp) => {
        this.reverseGeoCoding(resp.coords.latitude, resp.coords.longitude);
        this.NEW = false;
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
      }).catch(e => {
        this.reverseGeoCoding(0, 0);
      });
      
      // this.Address =  localStorage.getItem("GetAddress");
      // this.city = "lahore";
      // this.zipcode = "54000";
      // this.state = "punjab";
      console.log("current Address",this.Address)
      console.log("i m current check 2");
      this.NewAddress = false;
  }
  else {
      this.NewAddress = true;

  }
  }
  NewAddressBox(){
    console.log("i m newaddress check 2");
    this.NEW = true;
    this.NewAddress = true;
    console.log("newaddress: ", this.NEW);
    if(this.NewAddress == true){
      this.CurrentAdress = true;
      console.log("Current address: ", this.CurrentAdress);
      this.removedata();
      localStorage.setItem("address",this.Address);
      console.log("new address",this.Address);
      console.log("i m newaddress check 2");
        //this.CurrentAdress = false;
    }
    else{
      this.CurrentAdress = true;
    }
    

  }
  removedata(){
    this.Address = "";
      this.city = "";
      this.zipcode = "";
      this.state = "";
  }
  Updateyourorder(){
    //this.checkTiming();
    //localStorage.setItem("scheduled_time",this.time);
    // this.nativeStorage.setItem('orderdetail', {
    //   scheduled_time: this.time 
      
    // })
    //   .then(
    //     () => console.log('Stored item!'),
    //     error => console.error('Error storing item', error)
    //   );
    
  // this.navCtrl.setRoot("MainTabsPage",{page:1})
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
//         console.log("userDate", this.myDate);
//         var future_date = new Date(this.myDate);
//         console.log(future_date);
//         var future_day = future_date.getDay();
//         this.myDate = this.myDate.toString();
//         console.log(this.myDate);
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
}

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
import { HomePage } from '../home/home';
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
  category_page:any;
  branchId: any;
  radius_value: number;
  constructor(public server: ServerProvider,public geolocation: Geolocation, public alertCtrl: AlertController,public navCtrl: NavController,public formBuilder: FormBuilder, public navParams: NavParams, public viewCtrl: ViewController, public globals: GlobalVariable, public modalCtrl: ModalController, public nativeStorage: NativeStorage,public plt: Platform) {
  
   this.segmentValue = localStorage.getItem("segmentvalue");
   this.deliveryTime =  this.globals.pickupsetting;
   this.pickup_time = this.globals.pickup_Time;
   this.category_page = this.navParams.get('category_page')
   this.branchId = this.navParams.get('branchId');
  //  this.type = this.globals.OrderType;
  console.log("Pick Up -> ", this.globals.pickupsetting)
  console.log("Segment value -> ", this.segmentValue)
  
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
   plt.registerBackButtonAction(() => {
  },1);

  }
  closetohome(){
    // this.viewCtrl.dismiss();
    this.navCtrl.popToRoot();
  }

   tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }
  
  getdata(){
    this.time =  localStorage.getItem("scheduled_time");
    
    
    if(this.time){
      if(this.globals.specific_delivery_day == 'false'){
        var res = this.time.split("T");

        var res1 = res[1].split(".")
        this.datenow = res[0] + ' '+ this.tConvert(res1[0]);
        this.convertDate = res[0] + ' '+ this.tConvert(res1[0]);
      }
      else{
        var res1 = this.time.split("00")
        this.convertDate = res1[0];
        this.datenow = res1[0];
      }
      
      // this.date = new Date(this.time );
      // var timeis = new Date(this.time).toLocaleString('en-US', { hour12: true });
    }
    else{
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

  onsegmentChanged(){
    // this.loadMap(this.lat,this.long)
    this.CurrentAdressBox();
    if(this.type == "delivery"){
   
      this.globals.OrderType = "delivery";
      // this.segmentValue = "Asap"
      this.globals.delivery == true;
     // localStorage.setItem("type","delivery" )
    }
    else{
      this.globals.OrderType = "pickup";
      // this.segmentValue = "Asap"
      this.globals.pickup == true;
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

      this.getdata();
      if(!this.globals.OrderType){

        if(this.order_pickup && !this.order_delivery){
          this.type = "pickup";
          this.globals.OrderType = this.type;

        }
        else if(this.order_delivery){
          this.type = "delivery";
          this.globals.OrderType = this.type;

        }
      }
      else{

        this.type = this.globals.OrderType;
      }
    
 
    
  }
  
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  
  
  process(ProcessData: any){
    console.log("Pick Up -> ", this.globals.pickupsetting)
  console.log("Segment value -> ", this.segmentValue)
  console.log("Pick Up -> ", this.datenow)
   localStorage.setItem("GetAddress",this.Address);
  //  localStorage.setItem("zipcode",this.zipcode);
  //  localStorage.setItem("city",this.city);
  //  localStorage.setItem("zipcode",this.state);
    this.nativeStorage.setItem('address',
    {
      address: ProcessData.Address,
     
  }).then(() => console.log('Stored item!'),
      error => console.error('Error storing item', error)
  );
    //this.checkTiming();  
    console.log(this.category_page,"p")         
    this.globals.OrderType = 'delivery';
    this.navCtrl.pop({animate:false});
    if(this.category_page == 1){
      this.navCtrl.push("CategoryPage",{},{animate: false});

    }
    // this.viewCtrl.dismiss();
    this.globals.save_check = true;
    console.log("Pick Up -> ", this.globals.pickupsetting)
  console.log("Segment value -> ", this.segmentValue)
  console.log("Pick Up -> ", this.datenow)
  }
  
   secondModal(){
    
   // this.checktype();
    //this.viewCtrl.dismiss();
      let modal = this.modalCtrl.create('Modal2Page' ,{ category_page: this.category_page });
      modal.onDidDismiss(data => {
        console.log("Dismiss called ")
        this.segmentValue = localStorage.getItem("segmentvalue");
        this.deliveryTime =  this.globals.pickupsetting;
        this.pickup_time = this.globals.pickup_Time;
        this.getdata();
        console.log("Pick Up -> ", this.globals.pickupsetting)
        console.log("Segment value -> ", this.segmentValue)
        if(data == 'CategoryPage'){
          this.category_page = 1;
        console.log(data,"dta",this.category_page)

        }
      });
      modal.present();
    
  }  

  getCurrentLocation(): Promise<any> {
    return new Promise(resolve => {
      if(this.globals.delivery == true){
        
      this.geolocation.getCurrentPosition().then((resp) => {
        resolve(resp);
      }).catch((error) => {
      })
    }
    })
  }
  

  reverseGeoCoding(lat, lng) {
   
    var mycoordinates = lat + "," + lng;
    let response = this.server.getAddress(mycoordinates, this.branchId);
    console.log('cordinates..',mycoordinates);
    var myadress="";
    response.subscribe(data => {
      this.loadMap(lat, lng);
        console.log('data',data);
        myadress = data.address;
        this.Address = myadress;
        this.globals.inradius = data.in_radius;
        console.log('data radius....',data.in_radius);
        if(data.in_radius == false) {
          this.globals.alertMessage("Sorry","We don't deliver in your Area.");
          console.log('dont deliver in your area')
         
          if(this.globals.pickup == true){
            this.type = "pickup";
            this.globals.OrderType = this.type;
            console.log("pickup set in order")
            }
            else{
            this.navCtrl.pop();
            }

        }
        localStorage.setItem("GetAddress",myadress);

    }, error => {
        localStorage.setItem("GetAddress","");

        this.globals.presentToast("Something went wrong check your internet connection.")

    });

  }

  Getscheduletime(){
    //commented by jahanzaib
    // this.viewCtrl.dismiss();
   // this.navCtrl.pop();

      let modal = this.modalCtrl.create('Modal2Page');
      modal.onDidDismiss(data => {
        console.log("Dismiss called schedule time")
        this.segmentValue = localStorage.getItem("segmentvalue");
        this.deliveryTime =  this.globals.pickupsetting;
        this.pickup_time = this.globals.pickup_Time;
        this.getdata();
        console.log("Pick Up -> ", this.globals.pickupsetting)
        console.log("Segment value -> ", this.segmentValue)
        if(data == 'CategoryPage'){
          this.category_page = 1;
        console.log(data,"dta",this.category_page)

        }
      });
      modal.present();
  }
  loadMap(lati, longi) {
    // var latlng = this.coordinates.split(",")
    var myLatLng = new google.maps.LatLng(lati, longi);

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
      this.NewAddress = false;
  }
  else {
      this.NewAddress = true;

  }
  }
  NewAddressBox(){
    this.NEW = true;
    this.NewAddress = true;
    if(this.NewAddress == true){
      this.CurrentAdress = true;
      this.removedata();
      this.new_address_prompt();
      
        //this.CurrentAdress = false;
    }
    else{
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
            this.Address = data.street + ','+  data.apt +','+ data.city +' '+ data.state +','+ data.zip;
            localStorage.setItem("address",this.Address);

          }
        }
      ]
    });
    alert.present();
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
  console.log(this.category_page,"pp")
  this.globals.OrderType = "pickup"
  // this.viewCtrl.dismiss();
  this.navCtrl.pop({animate:false});
    if(this.category_page == 1){
      this.navCtrl.push("CategoryPage",{},{animate: false});
    }
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController,LoadingController} from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ModalController,AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Calendar } from '@ionic-native/calendar';
import { ServerProvider } from '../../providers/server/server';

// import {OrderListingPage} from '../order-listing/order-listing';
/**
 * Generated class for the Modal2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal2',
  templateUrl: 'modal2.html',
})
export class Modal2Page {
  settings: string = "Asap";
  min: any;
  hours: any;
  day: any;
  year: any;
  month: any;
  datenow: any;
  date: any;
  myDate: any;
  value: string;
  deliver_now: boolean = true;
  value2: string;
  name:any;
  deliveryTime :any;
  scheduled_time: any;
  type : string ;
  minvalue :any;
  forToday: any;
  future_time: any;
  time : any;
  future_hours : any;
  current :any ;
  current_Time :any ;
  new_time : any ;
  pickup_time :any;
  future_min : any ;
  today_disable:boolean = false;

 // dd :any;
  constructor( public loadingCtrl:LoadingController,public server: ServerProvider,public alertCtrl: AlertController,private calendar: Calendar,public navCtrl: NavController, public navParams: NavParams ,public globals: GlobalVariable, public viewCtrl: ViewController,public modalCtrl: ModalController, public nativeStorage: NativeStorage) {
    this.deliveryTime = this.globals.pickupsetting;
    this.deliveryTime = parseInt(this.deliveryTime);
    this.name =  this.globals.category_name;
    this.pickup_time = this.globals.pickup_Time ;
  
    this.date = new Date();
    this.type = this.globals.OrderType;
    console.log(this.type,"type")
    //this.dd  =  this.dd.toISOString().split('T')[0].split('-').concat( this.dd.toISOString().split('T')[1].split(':') );
    //console.log("dddddddd",this.dd);
    this.datenow = (this.date.getDate());
    this.month = this.date.getMonth() ;
    this.year = this.date.getFullYear();
    this.month = this.month.toString();
    this.day = (this.date.getDay());
    this.datenow = this.datenow.toString();
    this.hours = this.date.getHours();
    this.min = this.date.getMinutes();
   this.forToday = this.globals.MinValue;
    if (this.month.length == 1) {
        this.month = "0" + this.month;
    }
    if (this.datenow.length == 1) {
        this.datenow = "0" + this.datenow;
    }
    this.minvalue =  new Date().toJSON().split('T')[0];
    this.minvalue.toString();
    this.value = this.year + "-" + this.month + "-" + this.datenow;
    if(this.globals.OrderType == 'delivery'){
      var order_later = this.globals.pickupsetting.split(' ')
      if(order_later[1] == 'days'){
        this.today_disable = true;
        this.datenow = Number(this.datenow) + Number(order_later[0])
        this.value = this.year + "-" + this.month + "-" + this.datenow;
  
      }
    }
    else{
      var order_later = this.globals.pickup_Time.split(' ')
      if(order_later[1] == 'days'){
        this.today_disable = true;
        this.datenow = Number(this.datenow) + Number(order_later[0])
        this.value = this.year + "-" + this.month + "-" + this.datenow;
      }
    }
    this.value.toString();
    this.value2 =  (this.month +1)  + "-" + this.datenow;
    this.value2.toString();
    var date = new Date()
    var date1 = new Date((this.date.getTime()) - this.date.getTimezoneOffset() * 60000).toISOString();


    this.myDate = date1;
    
  }
  createCalender(){
    this.calendar.createCalendar('MyCalendar').then(
      
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
  }

  ionViewDidLoad() {
    this.forToday = this.globals.MinValue;
    this.type = this.globals.OrderType;
  }
  goToback(){
    this.viewCtrl.dismiss();
    this.presentModal();
  }
  Asap(){
   
    this.type = this.globals.OrderType;
    localStorage.setItem("segmentvalue",this.settings);
    if (this.type == 'delivery'){
      this.current = new Date();
      this.current_Time = this.current.getTime();
      this.new_time = new Date (this.current_Time + ( this.deliveryTime*60*1000));
      this.globals.DeliveryTime = this.new_time;
      
      localStorage.setItem("scheduled_time","");
      
    console.log("add pickup time",this.new_time);
    // this.nativeStorage.setItem('orderdetail', {
    //   deliveryTime: this.deliveryTime ,
    //   name:  this.name ,
    //   scheduled_time: this.myDate,
       
    // })
    //   .then(
    //     () => console.log('Stored item!'),
    //     error => console.error('Error storing item', error)
    //   );
    }
    else{

      this.current = new Date();
      this.current_Time = this.current.getTime();
      this.new_time = new Date (this.current_Time + (this.pickup_time*60*1000));
      this.globals.savePickupTime = this.new_time;
      
    }
    
    this.viewCtrl.dismiss('CategoryPage');
    this.presentModal();
    //window.location.reload();
    // this.navCtrl.push('ModalPage',{pickup:this.deliveryTime});

    //this.navCtrl.open('')
  }
  presentModal() {
    // let modal = this.modalCtrl.create('ModalPage');
    // modal.present();
    this.navCtrl.push("ModalPage");
  }
  Today(){
    this.type = this.globals.OrderType;
    this.globals.OrderType = this.type;
    localStorage.setItem("segmentvalue",this.settings);
  
   this.checkTiming();
    // this.viewCtrl.dismiss('CategoryPage');
    // this.presentModal();
   
   
    // var future_date = new Date(this.myDate);
    // console.log(future_date);
    // var future_day = future_date.getDay();
    // this.myDate = this.myDate.toString();
    // this.myDate= this.myDate;
   
    // this.nativeStorage.setItem('orderdetail', {
    //   scheduled_time: this.myDate 
      
    // })
    //   .then(
    //     () => console.log('Stored item!'),
    //     error => console.error('Error storing item', error)
    //   );
    //   localStorage.setItem("scheduled_time",this.myDate);

    //this.checkTiming();
  }
  Later(){
   
    this.type = this.globals.OrderType;
    localStorage.setItem("segmentvalue",this.settings);
    console.log("My Date ",this.myDate);
    // var future_date = new Date(this.myDate);
    // console.log(future_date);
    // var future_day = future_date.getDay();
    // this.myDate = this.myDate.toString();
      this.checkTimingLater();
    //   localStorage.setItem("scheduled_time",this.myDate);
    //   console.log("later schedule time",this.myDate);
    // console.log("checking date for later",this.myDate);
   
  
  }
  checkTimingLater(){
    this.type = this.globals.OrderType;
    console.log(this.globals.OrderType,"ordertype")
    // if (this.type == "delivery") {
      
        if (this.globals.Timing) {
          let response = this.server.date_convert(this.myDate);
          let loading = this.loadingCtrl.create({
            content: "Loading...",
          });
          loading.present();
          response.subscribe(data => {
            loading.dismiss();
            if(data.success == true){
               this.day = data.day_id + 1;
               this.time = data.time;
              localStorage.setItem("scheduled_time",  data.date +' ' + data.time.replace(".", ":") );
              let current_day = this.globals.Timing[this.day];
              // this.time = this.time.toString();
              console.log(this.day,this.time,current_day)
              if (current_day[0] != 'opened') {
                if((Number(current_day[0]) <= Number(this.time) && Number(current_day[1]) > Number(this.time)) || (Number(current_day[0]) <= Number(this.time) && Number(current_day[1]) < Number(current_day[0])) ||  (current_day[0] != 'closed')){
                     
                      this.viewCtrl.dismiss('CategoryPage');
                      this.presentModal();
                        return true;
                  }
                  else {
                    this.globals.presentToast('Sorry, we are not serving at this time!')
                 
                    return false;
                  }
              }
              else {
                this.viewCtrl.dismiss('CategoryPage');
                this.presentModal();
                  return true;   
              }
            }
      
          }, error => {
              this.globals.presentToast("Something went wrong check your internet connection.")
      
          });
        
      }
      else {
          return true;
      }
  // }
  // else {
    
  //     var future_date = new Date(this.myDate);
  //     console.log(this.myDate,future_date,"ml")
  //     var future_day = future_date.getDay();
  //     this.myDate = this.myDate.toString();
      
  //     this.future_hours = future_date.getHours();
  //     this.future_min = future_date.getMinutes();
  
  //     this.future_time = this.future_hours + "." + this.future_min;
  
  
  //     if (this.globals.Timing) {
  
  //         var current_day = this.globals.Timing[future_day];
  //         localStorage.setItem("scheduled_time", this.myDate);
  //         //  console.log(parseFloat(time) , parseFloat(current_day[0]),parseFloat(current_day[1]))
  //         if (current_day[0] != 'opened') {
  //             if (Number(this.future_time) <= Number(current_day[0]) || Number(this.future_time) >= Number(current_day[1]) || current_day[0] == 'closed') {
  //                 let alert = this.alertCtrl.create({
  //                     title: 'Sorry',
  //                     subTitle: 'Restaurants closed on the given time and date.',
  //                     buttons: ['OK']
  //                 });
  
  //                 alert.present();
  //                 return false;
  //             }
  //             else {
  //               this.viewCtrl.dismiss('CategoryPage');
  //               this.presentModal();
  //                 return true;
  //             }
  //         }
  //         else {
  //           this.viewCtrl.dismiss('CategoryPage');
  //           this.presentModal();
  //             return true;
  //         }
  
  
  
  //     }
  //     else {
  //         console.log("else ");
  //         return true;
  //     }
  
  //     // return true;
  // }
  
  }
  checkTiming() {
    this.type = this.globals.OrderType;

    // if (this.type == "delivery") {

      
        if (this.globals.Timing) {

       let response = this.server.date_convert(this.myDate);
          let loading = this.loadingCtrl.create({
            content: "Loading...",
          });
          loading.present();
          response.subscribe(data => {
            loading.dismiss();
            if(data.success == true){
               this.day = data.day_id + 1;
               this.time = data.time;
              localStorage.setItem("scheduled_time",  data.date +' ' + data.time.replace(".", ":") );
              let current_day = this.globals.Timing[this.day];
              // this.time = this.time.toString();
              console.log(this.day,this.time,current_day)
              if (current_day[0] != 'opened') {
                if((Number(current_day[0]) <= Number(this.time) && Number(current_day[1]) > Number(this.time)) || (Number(current_day[0]) <= Number(this.time) && Number(current_day[1]) < Number(current_day[0])) ||  (current_day[0] != 'closed')){
                     
                      this.viewCtrl.dismiss('CategoryPage');
                      this.presentModal();
                        return true;
                  }
                  else {
                    this.globals.presentToast('Sorry, we are not serving at this time!')
                 
                    return false;
                  }
              }
              else {
                this.viewCtrl.dismiss('CategoryPage');
                this.presentModal();
                  return true;   
              }
            }
      
          }, error => {
              this.globals.presentToast("Something went wrong check your internet connection.")
      
          });



      }
      else {
          return true;
      }
  // }
  // else {
  //     var future_date = new Date(this.myDate);
  //     var future_day = future_date.getDay();
  //     this.myDate = this.myDate.toString();
  //     this.future_hours = future_date.getHours();
  //     this.future_min = future_date.getMinutes();

  //     this.future_time = this.future_hours + "." + this.future_min;

     
  //     if (this.globals.Timing) {

  //         var current_day = this.globals.Timing[future_day];

  //         localStorage.setItem("scheduled_time", this.myDate);

  //         //  console.log(parseFloat(time) , parseFloat(current_day[0]),parseFloat(current_day[1]))
  //         if (current_day[0] != 'opened') {
  //             if (Number(this.future_time) <= Number(current_day[0]) || Number(this.future_time) >= Number(current_day[1]) || current_day[0] == 'closed') {
  //                 let alert = this.alertCtrl.create({
  //                     title: 'Sorry',
  //                     subTitle: 'Restaurants closed on the given time and date.',
  //                     buttons: ['OK']
  //                 });

  //                 alert.present();
  //                 return false;
  //             }
  //             else {
  //               this.viewCtrl.dismiss('CategoryPage');
  //               this.presentModal();
  //                 return true;
  //             }
  //         }
  //         else {
  //           this.viewCtrl.dismiss('CategoryPage');
  //           this.presentModal();
  //             return true;
  //         }



  //     }
  //     else {
  //         return true;
  //     }

  //     // return true;
  // }
}
}

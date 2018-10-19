import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ModalController,AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Calendar } from '@ionic-native/calendar';
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
 // dd :any;
  constructor( public alertCtrl: AlertController,private calendar: Calendar,public navCtrl: NavController, public navParams: NavParams ,public globals: GlobalVariable, public viewCtrl: ViewController,public modalCtrl: ModalController, public nativeStorage: NativeStorage) {
    this.deliveryTime = this.globals.pickupsetting;
    this.deliveryTime = parseInt(this.deliveryTime);
    this.name =  this.globals.category_name;
    this.pickup_time = this.globals.pickup_Time ;
    console.log("pickup in modal 2 ####", this.pickup_time);
    console.log("last modal pickupsett", this.deliveryTime);
    console.log("global rest name", this.globals.category_name);
    console.log("i m testing modal" , this.nativeStorage.getItem('orderdetail'));
    this.date = new Date();
    this.type = this.globals.OrderType;
    //this.dd  =  this.dd.toISOString().split('T')[0].split('-').concat( this.dd.toISOString().split('T')[1].split(':') );
    //console.log("dddddddd",this.dd);
    this.datenow = (this.date.getDate());
    this.month = this.date.getMonth() ;
    console.log(this.date, "monthhhh",this.month);
    this.year = this.date.getFullYear();
    this.month = this.month.toString();
    this.day = (this.date.getDay());
    this.datenow = this.datenow.toString();
    this.hours = this.date.getHours();
    this.min = this.date.getMinutes();
    console.log(this.hours,"!!!!!minutes", this.min,"day",this.datenow);
   this.forToday = this.globals.MinValue;
   console.log("for today ", this.forToday);
   console.log("for today 2nd ",  this.globals.MinValue);
    if (this.month.length == 1) {
        this.month = "0" + this.month;
    }
    if (this.datenow.length == 1) {
        this.datenow = "0" + this.datenow;
    }
    console.log("year", this.year,"month", this.month, "datenow for testing",this.datenow);
    this.minvalue =  new Date().toJSON().split('T')[0];
    this.minvalue.toString();
    console.log("checking min value ", this.minvalue);
    this.value = this.year + "-" + this.month + "-" + this.datenow;
    this.value.toString();
    console.log("value ",this.value);
    this.value2 =  (this.month +1)  + "-" + this.datenow;
    this.value2.toString();
    console.log("value 2 ",this.value);
    var date = new Date()
    var date1 = new Date((this.date.getTime()) - this.date.getTimezoneOffset() * 60000).toISOString();

    console.log("offset", this.date.getTimezoneOffset);

    this.myDate = date1;
    console.log("my date",this.myDate);
    
  }
  createCalender(){
    this.calendar.createCalendar('MyCalendar').then(
      
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Modal2Page');
    this.forToday = this.globals.MinValue;
    console.log("type in ion did ", this.globals.OrderType);
    this.type = this.globals.OrderType;
  }
  goToback(){
    this.viewCtrl.dismiss();
    this.presentModal();
  }
  Asap(){
   
    this.type = this.globals.OrderType;
    localStorage.setItem("segmentvalue",this.settings);
    console.log("%%%%%Asap",localStorage.setItem("segmentvalue",this.settings));
    if (this.type == 'delivery'){
      this.current = new Date();
      this.current_Time = this.current.getTime();
      this.new_time = new Date (this.current_Time + ( this.deliveryTime*60*1000));
      this.globals.DeliveryTime = this.new_time;
      
      localStorage.setItem("scheduled_time",this.new_time);
      
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
    console.log("modal pickupsett",this.globals.pickupsetting);
    let modal = this.modalCtrl.create('ModalPage');
    modal.present();
    // this.navCtrl.push("ModalPage");
  }
  Today(){
    console.log("type checking Today",this.type);
    this.type = this.globals.OrderType;
    this.globals.OrderType = this.type;
    localStorage.setItem("segmentvalue",this.settings);
    console.log("%%%%%today",localStorage.setItem("segmentvalue",this.settings));
    console.log("type checking Today",this.type);
   
   
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
      console.log("Today schedule time",localStorage.getItem("scheduled_time"));
    console.log("checking date for today" ,this.myDate);
  
    //this.checkTiming();
  }
  Later(){
   
    this.type = this.globals.OrderType;
    console.log("type checking later",this.type);
    localStorage.setItem("segmentvalue",this.settings);
    console.log("%%%%%later",localStorage.setItem("segmentvalue",this.settings));
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
    if (this.type = "delivery") {
        console.log("checking timing ");
        console.log("global timings", this .globals.Timing);
       
        if (this.globals.Timing) {
          let local_datetime = new Date(this.myDate).toLocaleString('en-US', { hour12: true });
          this.date = new Date(local_datetime );
         // var future_day = future_date.getDay();
        //   this.myDate = this.myDate.toSetring();
          console.log("####date",this.date);
          this.day = this.date.getDay(this.date);
          this.time = this.date.getHours();
          this.min = this.date.getMinutes();
          this.time = this.time + "." + this.min;
          console.log("day", "hours", this.day, this.time,"datise",this.myDate, "local_datetime",local_datetime,"+++++",this.date);
          localStorage.setItem("scheduled_time",  this.date );
          let current_day = this.globals.Timing[this.day];
          // this.time = this.time.toString();
          console.log(this.time,"current day", current_day,this.day );
          console.log(this.globals.Timing);
          if (current_day[0] != 'opened') {
              if (Number(this.time) <= Number(current_day[0]) || Number(this.time) >= Number(current_day[1]) || current_day[0] == 'closed') {
                  let alert = this.alertCtrl.create({
                      title: 'Sorry',
                      subTitle: 'Restaurants currently closed.',
                      buttons: ['OK']
                  });
                  alert.present();
               
                  return false;
              }
              else {
                this.viewCtrl.dismiss('CategoryPage');
                this.presentModal();
                  return true;
              }
          }
          else {
            this.viewCtrl.dismiss('CategoryPage');
            this.presentModal();
              return true;   
          }
      }
      else {
          console.log("else");
          return true;
      }
  }
  else {
      console.log("bigelse");
      console.log("userDate", this.myDate);
      var future_date = new Date(this.myDate);
      console.log(future_date);
      var future_day = future_date.getDay();
      this.myDate = this.myDate.toString();
      console.log(this.myDate);
      this.future_hours = future_date.getHours();
      this.future_min = future_date.getMinutes();
  
      this.future_time = this.future_hours + "." + this.future_min;
  
      console.log("future_hours", this.future_hours, this.future_time);
  
      if (this.globals.Timing) {
          console.log(future_day);
  
          var current_day = this.globals.Timing[future_day];
          console.log(current_day);
          localStorage.setItem("scheduled_time", current_day);
          console.log(current_day[0], current_day[1], this.future_time);
          //  console.log(parseFloat(time) , parseFloat(current_day[0]),parseFloat(current_day[1]))
          if (current_day[0] != 'opened') {
              if (Number(this.future_time) <= Number(current_day[0]) || Number(this.future_time) >= Number(current_day[1]) || current_day[0] == 'closed') {
                  let alert = this.alertCtrl.create({
                      title: 'Sorry',
                      subTitle: 'Restaurants closed on the given time and date.',
                      buttons: ['OK']
                  });
  
                  alert.present();
                  return false;
              }
              else {
                this.viewCtrl.dismiss('CategoryPage');
                this.presentModal();
                  return true;
              }
          }
          else {
            this.viewCtrl.dismiss('CategoryPage');
            this.presentModal();
              return true;
          }
  
  
  
      }
      else {
          console.log("else ");
          return true;
      }
  
      // return true;
  }
  
  }
  checkTiming() {
    this.type = this.globals.OrderType;

    if (this.type = "delivery") {
        console.log("checking timing ");
        console.log("global timings", this .globals.Timing);
      
        if (this.globals.Timing) {
          let local_datetime = new Date(this.myDate).toLocaleString('en-US', { hour12: true });
          this.date = new Date(local_datetime );
          console.log("",this.date);
         
          this.day = this.date.getDay();
          this.time = this.date.getHours();
          this.min = this.date.getMinutes();
          this.time = this.time + "." + this.min;
          console.log("day", "hours", this.day, this.time,"local time for today", local_datetime );
          console.log("get only time", )
           localStorage.setItem("scheduled_time", this.date);
          let current_day = this.globals.Timing[this.day];
          // this.time = this.time.toString();
          console.log(this.time,"current day", current_day );
          console.log(this.globals.Timing);
          if (current_day[0] != 'opened') {
              console.log("upper if");
              if (Number(this.time) <= Number(current_day[0]) || Number(this.time) >= Number(current_day[1]) || current_day[0] == 'closed') {
                  let alert = this.alertCtrl.create({
                      title: 'Sorry',
                      subTitle: 'Restaurants currently closed.',
                      buttons: ['OK']
                  });
                  alert.present();

                   return false;
              }
              else {
                console.log("upper else");
                this.viewCtrl.dismiss('CategoryPage');
                this.presentModal();
                  return true;
              }
          }
          else {
              console.log("$$$elseeeee");
              this.viewCtrl.dismiss('CategoryPage');
              this.presentModal();
              return true;
              
          }



      }
      else {
          console.log(" first else");
          return true;
      }
  }
  else {
      console.log("bigelse");
      console.log("userDate", this.myDate);
      var future_date = new Date(this.myDate);
      console.log(future_date);
      var future_day = future_date.getDay();
      this.myDate = this.myDate.toString();
      console.log(this.myDate);
      this.future_hours = future_date.getHours();
      this.future_min = future_date.getMinutes();

      this.future_time = this.future_hours + "." + this.future_min;

      console.log("future_hours", this.future_hours, this.future_time);

      if (this.globals.Timing) {
          console.log(future_day);

          var current_day = this.globals.Timing[future_day];

          localStorage.setItem("scheduled_time", current_day);
          console.log(current_day);

          console.log(current_day[0], current_day[1], this.future_time);
          //  console.log(parseFloat(time) , parseFloat(current_day[0]),parseFloat(current_day[1]))
          if (current_day[0] != 'opened') {
              console.log("upper if");
              if (Number(this.future_time) <= Number(current_day[0]) || Number(this.future_time) >= Number(current_day[1]) || current_day[0] == 'closed') {
                  let alert = this.alertCtrl.create({
                      title: 'Sorry',
                      subTitle: 'Restaurants closed on the given time and date.',
                      buttons: ['OK']
                  });

                  alert.present();
                  return false;
              }
              else {
                  console.log("first  if");
                this.viewCtrl.dismiss('CategoryPage');
                this.presentModal();
                  return true;
              }
          }
          else {
              console.log("uper else");
            this.viewCtrl.dismiss('CategoryPage');
            this.presentModal();
              return true;
          }



      }
      else {
          console.log("second else");
          return true;
      }

      // return true;
  }
}
}

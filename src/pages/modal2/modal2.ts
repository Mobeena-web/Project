import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController,LoadingController} from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { App, ModalController,AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Calendar } from '@ionic-native/calendar';
import { ServerProvider } from '../../providers/server/server';
import { CalendarComponentOptions } from 'ion2-calendar'

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
  optionsRange: CalendarComponentOptions = {
    disableWeeks: [0, 6]

  };
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
  specific_schedule:boolean = false;
  check_flag:boolean = false;
  optionsMulti: CalendarComponentOptions = {
    disableWeeks: this.globals.delivery_day
  };
  category_page:any;
 // dd :any;
  constructor( public loadingCtrl:LoadingController,public server: ServerProvider,public alertCtrl: AlertController,private calendar: Calendar,public navCtrl: NavController, public navParams: NavParams ,public globals: GlobalVariable, public viewCtrl: ViewController,public modalCtrl: ModalController, public appCtrl: App, public nativeStorage: NativeStorage) {
    this.deliveryTime = this.globals.pickupsetting;
    this.deliveryTime = parseInt(this.deliveryTime);
    this.name =  this.globals.category_name;
    this.pickup_time = this.globals.pickup_Time ;
    this.category_page = this.navParams.get('category_page')
  
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
    console.log(this.value,"vf")
    if(this.globals.OrderType == 'delivery'){
      var order_later = this.globals.pickupsetting.split(' ')
      if(order_later[1] == 'days'){
        this.today_disable = true;
        this.datenow = Number(this.datenow) + Number(order_later[0])
        this.value = this.year + "-" + this.month + "-" + this.datenow;
  
      }
    }
    else{
      var order_later = this.globals.pickup_Time.split(' ');
      console.log('hello')
      if(order_later[1] == 'days'){
        this.today_disable = true;
        this.datenow = Number(this.datenow) + Number(order_later[0])

        // var d = new Date();
        // console.log(d.getMonth(),d.getFullYear())
        // var totaldays = this.daysInMonth(d.getMonth(),d.getFullYear())
        // console.log(this.datenow , totaldays,"oo")
        // if(this.datenow > totaldays){
        //   console.log('di',totaldays,this.datenow,order_later[0])
          
        //    this.datenow =  (Number(this.datenow) - totaldays);
        //     this.month = Number(this.month) + 2;

        // }
        
      //  console.log(this.value,'pp')
      //  this.month = this.n(Number(this.month));
      //  this.datenow = this.n(Number(this.datenow));
        this.value = this.year + "-" + this.month + "-" + this.datenow;
       console.log(this.value,'pppp')

      }
    }
    this.value.toString();
    this.value2 =  (this.month +1)  + "-" + this.datenow;
    this.value2.toString();
    var date = new Date()
    var date1 = new Date((this.date.getTime()) - this.date.getTimezoneOffset() * 60000).toISOString();


    this.myDate = date1;
    
  }
   daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}
n(n){
  return n > 9 ? "" + n: "0" + n;
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
    //commented by jahanzaib 21-01-2019    
    // this.viewCtrl.dismiss('CategoryPage');
   
    this.presentModal();
    //window.location.reload();
    // this.navCtrl.push('ModalPage',{pickup:this.deliveryTime});

    //this.navCtrl.open('')
  }
  presentModal() {
    // let modal = this.modalCtrl.create('ModalPage');
    // modal.present();


    //commented by jahanzaib 21-01-19
    // this.navCtrl.push("ModalPage");
    if(this.category_page == 1){
      this.viewCtrl.dismiss('CategoryPage');

    }
    else{
    this.viewCtrl.dismiss();

    }

    this.appCtrl.getRootNav().push("ModalPage");


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
    console.log(this.date,this.myDate,this.datenow)
    // var s_day = this.myDate.getDay()
    // console.log(s_day)
    if(this.globals.specific_delivery_day == 'true'){
      if(this.check_flag == false && this.specific_schedule == true){
        this.checkTimingLater();
      }
      else{
        this.globals.presentToast("Sorry we can't deliver this day.Please select next.")
      }
    }
    else{
      this.checkTimingLater();
    }
    
   
    
  }
  specific_schedule_change(e){
    if(Number(e.format('DD')) < this.datenow && Number(e.format('MM')) == (this.date.getMonth() + 1)){
      this.check_flag = true;
      this.globals.presentToast("Sorry we can't deliver this day.Please select next.")
    }
    else{
      this.check_flag = false;
    }
    this.specific_schedule = true;
  }
  checkTimingLater(){
    this.type = this.globals.OrderType;
    console.log(this.globals.OrderType,"ordertype")
     if (this.type == "delivery") {
      
        if (this.globals.delivery_timing) {
          var response:any;

          if(this.globals.specific_delivery_day == 'true'){
             response = this.server.date_convert(this.myDate.format('DD-MM-YYYY'));
            
           }
           else{
             response = this.server.date_convert(this.myDate);            
           }
          let loading = this.loadingCtrl.create({
            content: "Loading...",
          });
          loading.present();
          response.subscribe(data => {
            loading.dismiss();
            if(data.success == true){
               this.day = data.day_id + 1;
               if(this.day == 7){
                this.day = 0;
               }
               this.time = data.time;

               this.globals.schedule_day_id = data.day_id;
              this.globals.schedule_converted_time = data.time;

               if(this.globals.specific_delivery_day == 'true'){
                localStorage.setItem("scheduled_time",  this.myDate.format('DD-MM-YYYY') );
               }
               else{
                localStorage.setItem("scheduled_time",  this.myDate );
               }
              console.log("setting scheduled time 1", this.myDate);
              let current_day = this.globals.delivery_timing[this.day];
              var n = current_day[0].indexOf('.');
                if(n != -1){
                    var res = current_day[0].split(".");
                    current_day[0] = res[0] + '.' + '3'
                }
                var n1 = current_day[1].indexOf('.');
                if(n1 != -1){
                    var res = current_day[1].split(".");
                    current_day[1] = res[0] + '.' + '3'
                }
              // this.time = this.time.toString();
              console.log(this.day,this.time,current_day)
              if (current_day[0] != 'opened') {
                if((Number(current_day[0]) <= Number(this.time) && Number(current_day[1]) > Number(this.time)) || (Number(current_day[0]) <= Number(this.time) && Number(current_day[1]) < Number(current_day[0]))){
                     
                      this.presentModal();
                        return true;
                  }
                  else if(current_day[0] == 'opened' && current_day[1] == 'opened' ){
                    this.presentModal();
                    return true;
                  }
                  else {
                    this.globals.presentToast('Sorry, we are not serving at this time!')
                 
                    return false;
                  }
              }
              else {
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
  }
  else {
    
    if (this.globals.pickup_timing) {
      var response:any;
      if(this.globals.specific_delivery_day == 'true'){
        response = this.server.date_convert(this.myDate.format('DD-MM-YYYY'));
       
      }
      else{
        response = this.server.date_convert(this.myDate);            
      }
      let loading = this.loadingCtrl.create({
        content: "Loading...",
      });
      loading.present();
      response.subscribe(data => {
        loading.dismiss();
        if(data.success == true){
           this.day = data.day_id + 1;
           if(this.day == 7){
            this.day = 0;
           }
           this.time = data.time;

           this.globals.schedule_day_id = data.day_id;
           this.globals.schedule_converted_time = data.time;

           if(this.globals.specific_delivery_day == 'true'){
            localStorage.setItem("scheduled_time",  this.myDate.format('DD-MM-YYYY') );
           }
           else{
            localStorage.setItem("scheduled_time",  this.myDate );
           }
          console.log("setting scheduled time 2", this.myDate);
          let current_day = this.globals.pickup_timing[this.day];
          var n = current_day[0].indexOf('.');
          if(n != -1){
              var res = current_day[0].split(".");
              current_day[0] = res[0] + '.' + '3'
          }
          var n1 = current_day[1].indexOf('.');
          if(n1 != -1){
              var res = current_day[1].split(".");
              current_day[1] = res[0] + '.' + '3'
          }
          // this.time = this.time.toString();
          console.log(this.day,this.time,current_day)
          //if (current_day[0] != 'opened') {
            if((Number(current_day[0]) <= Number(this.time) && Number(current_day[1]) > Number(this.time)) || (Number(current_day[0]) <= Number(this.time) && Number(current_day[1]) < Number(current_day[0]))){
                 
                  this.presentModal();
                    return true;
              }
              else if(current_day[0] == 'opened' && current_day[1] == 'opened' ){
                this.presentModal();
                return true;
              }
              
              else {
                this.globals.presentToast('Sorry, we are not serving at this time!')
             
                return false;
              }
          // }
          // else {
          //   this.viewCtrl.dismiss('CategoryPage');
          //   this.presentModal();
          //     return true;   
          // }
        }
  
      }, error => {
          this.globals.presentToast("Something went wrong check your internet connection.")
  
      });
    
  }
  else {
      return true;
  }
  
      // return true;
  }
  
  }
  checkTiming() {
    this.type = this.globals.OrderType;

     if (this.type == "delivery") {

      
        if (this.globals.delivery_timing) {

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

               this.globals.schedule_day_id = data.day_id;
              this.globals.schedule_converted_time = data.time;

              localStorage.setItem("scheduled_time",  this.myDate );
              console.log("setting scheduled time 3", this.myDate);
              let current_day = this.globals.delivery_timing[this.day];
              var n = current_day[0].indexOf('.');
                if(n != -1){
                    var res = current_day[0].split(".");
                    current_day[0] = res[0] + '.' + '3'
                }
                var n1 = current_day[1].indexOf('.');
                if(n1 != -1){
                    var res = current_day[1].split(".");
                    current_day[1] = res[0] + '.' + '3'
                }
              // this.time = this.time.toString();
              console.log(this.day,this.time,current_day)
             // if (current_day[0] != 'opened') {
                if((Number(current_day[0]) <= Number(this.time) && Number(current_day[1]) > Number(this.time)) || (Number(current_day[0]) <= Number(this.time) && Number(current_day[1]) < Number(current_day[0]))){
                     
                      this.presentModal();
                        return true;
                  }
                  else if(current_day[0] == 'opened' && current_day[1] == 'opened' ){
                    this.presentModal();
                    return true;
                  }
                  else {
                    this.globals.presentToast('Sorry, we are not serving at this time!')
                 
                    return false;
                  }
              // }
              // else {
              //   this.viewCtrl.dismiss('CategoryPage');
              //   this.presentModal();
              //     return true;   
              // }
            }
      
          }, error => {
              this.globals.presentToast("Something went wrong check your internet connection.")
      
          });



      }
      else {
          return true;
      }
  }
  else {
    if (this.globals.pickup_timing) {

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

              this.globals.schedule_day_id = data.day_id;
              this.globals.schedule_converted_time = data.time;

             localStorage.setItem("scheduled_time",  this.myDate );
             console.log("setting scheduled time 4", this.myDate);
             let current_day = this.globals.pickup_timing[this.day];
             var n = current_day[0].indexOf('.');
              if(n != -1){
                  var res = current_day[0].split(".");
                  current_day[0] = res[0] + '.' + '3'
              }
              var n1 = current_day[1].indexOf('.');
              if(n1 != -1){
                  var res = current_day[1].split(".");
                  current_day[1] = res[0] + '.' + '3'
              }
             // this.time = this.time.toString();
             console.log(this.day,this.time,current_day)
             //if (current_day[0] != 'opened') {
               if((Number(current_day[0]) <= Number(this.time) && Number(current_day[1]) > Number(this.time)) || (Number(current_day[0]) <= Number(this.time) && Number(current_day[1]) < Number(current_day[0]))){
                    
                     this.presentModal();
                       return true;
                 }
                 else if(current_day[0] == 'opened' && current_day[1] == 'opened' ){
                  this.presentModal();
                  return true;
                }
                 else {
                   this.globals.presentToast('Sorry, we are not serving at this time!')
                
                   return false;
                 }
            //  }
            //  else {
            //    this.viewCtrl.dismiss('CategoryPage');
            //    this.presentModal();
            //      return true;   
            //  }
           }
     
         }, error => {
             this.globals.presentToast("Something went wrong check your internet connection.")
     
         });



     }
     else {
         return true;
     }
  }
}
}

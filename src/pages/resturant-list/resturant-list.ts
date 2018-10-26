import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform, Events, AlertController, ModalController, LoadingController, App, ToastController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { GlobalVariable } from '../../app/global';
import { Geolocation } from '@ionic-native/geolocation';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import { Diagnostic } from '@ionic-native/diagnostic';


@IonicPage()
@Component({
  selector: 'page-resturant-list',
  templateUrl: 'resturant-list.html',
})
export class ResturantListPage {

  selectOptions: { title: string; };
  coordinates: string;
  lazloading: any;

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  @ViewChild(Content) content: Content;
  long: number;
  lat: number;
  arrayStatus: boolean = false;

  places_array: any;
  orderFlag: boolean = false;

  flag: boolean = false;

  option: any;
  data: any;
  searchControl: FormControl;
  places: any;
  distance_array: any = [];
  status: boolean = false;
  pageFlag: boolean = false;
  searchTerm: string = '';
  number: any[] = new Array();

  radius: any = '100000';
  offset: any = 0
  map: any;
  markers_array: any = [];
  mobileFlagcheck: any;
  textdisocunt: any;
  total_price_with_extras: number;
  total_price: number;
  userChoices: any = []
  categories: any;
  category: any;
  sub: Observable<number>;
  timer: Subscription;
  //  private subscription: Subscription;

  time: any;
  orderdata: any;
  // data: any;
  tick: number;
  value: any = 3600;
  ordersListFlag: boolean = false;
  orderPlacedFlag: boolean = false;
  items = [];
  date : any;
  min:any;
  hours :any;
  forToday :any ;
  Geocoder_lat : any ;
  Geocoder_lng : any;
  address : any;
  myResp : any;
  GetAddress : any ;
  AdrressString : any ;
  constructor(public toastCtrl: ToastController, private diagnostic: Diagnostic, public server: ServerProvider, public nativeStorage: NativeStorage, public events: Events, private app: App, public globals: GlobalVariable, public modalCtrl: ModalController, public alertCtrl: AlertController, private geolocation: Geolocation, public loadingCtrl: LoadingController, public http: Http, public navCtrl: NavController, public navParams: NavParams) {

      this.date = new Date();
      this.min = this.date.getMinutes();
      this.hours = this.date.getHours();
      this.forToday = this.hours + ":" + this.min;
      this.globals.MinValue = this.forToday;
      console.log("min value ", this.forToday,this.globals.MinValue );
      //this. getLocationAddress();
     // localStorage.setItem("type","delivery" );
     // console.log("localstorage data ", localStorage.getItem("orderdetail"));
      
      // this.nativeStorage.setItem('orderdetail',{
      //     type :"delivery"
      // });
      this.pageFlag = navParams.get('Flag');
      this.textdisocunt = navParams.get('discount_text');
      this.searchControl = new FormControl();

    

      // events.subscribe('Radius1', (radius) => {
      //     this.radius = radius;s
      // this.list();
      // });
      this.getLocation();

      this.CheckMobileFlag();

      this.selectOptions = {
          title: 'Distance'
      };

  }

  doInfinite(): Promise<any> {
      console.log('Begin async operation');
      this.offset += 10;
      return new Promise((resolve, enable) => {
          let response = this.server.getRestaurantslist(this.radius, 'branches', this.coordinates, this.offset, 'order');


          response.subscribe(data => {

              if (data.status == 'true') {

                  data.results.forEach(element => {
                      this.places.push(element);
                     console.log("data$$$$$",this.places);
                     localStorage.setItem("places",this.places);
                  });

                  resolve();
                  console.log(this.places);
                  console.log(this.places.success);
                  if (typeof this.places.success != 'undefined' && this.places.success == 'No data') {

                      this.arrayStatus = true;

                  }
                  else {

                      this.arrayStatus = false;
                      this.places_array = this.places;
                      console.log("data$$$$$",this.places);
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



  ionViewWillEnter() {
      this.globals.title = 'Orders'
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad OrderListingPage');
      this.getCurrentLocation().then((resp) => {
          // this.reverseGeoCoding(resp.coords.latitude, resp.coords.longitude);
        });


      this.option = 'orders';



      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

          this.setFilteredItems();

      });
  }

  info() {
      // let profileModal = this.modalCtrl.create('InformationPage');
      //  profileModal.present(); 
      this.navCtrl.push('InformationPage');
  }

  ionViewDidLeave() {
      console.log('leave');
      if (this.timer != undefined) {
          this.timer.unsubscribe();
      }
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

    // reverseGeoCoding(lat, lng) {
    //   console.log("7788", lat , lng);
    //   this.nativeGeocoder.reverseGeocode(lat, lng)
    //       .then((result: NativeGeocoderReverseResult) => {
    //           // console.log("Native Geocoder",JSON.stringify(result));
             
    //          let address=[
    //            (result[0].subThoroughfare || "") + "  " + (result[0].thoroughfare||""),
    //              result[0].locality
    //            ].join(", ");
             

    //           // this.myResp = JSON.stringify(result);
    //           //let GetAddress = JSON.parse( this.myResp); 
    //           // this.AdrressString = this.GetAddress.thoroughfare ;
    //           // console.log("this is the address", this.GetAddress);
    //            localStorage.setItem("GetAddress",address);
    //           // console.log("rever geocoder data ",localStorage.setItem("GetAddress",this.GetAddress));
              
    //       })
    //       .catch((error: any) => console.log(error));
    // }


  list() {

       this.diagnostic.isLocationEnabled()
        .then((state) => {
       console.log(state);
         if (state){
      this.status = false;
      console.log("if ",state)


       this.arrayStatus = false;
          this.flag = true;
      this.geolocation.getCurrentPosition().then((position)=>{

      //     this.coordinates = position.coords.latitude+","+position.coords.longitude
      console.log(this.radius, this.coordinates);

      let response = this.server.getRestaurantslist(this.radius, 'main', this.coordinates, this.offset.toString(), 'order');

      response.subscribe(data => {
          console.log(data);

          this.places = data.results;
          console.log("mobilecheck", this.mobileFlagcheck)
          // if (this.mobileFlagcheck == 'false') {
          //     this.MobileVerificationPrompt();
          // }
          console.log(this.places);

          if (typeof data.success != 'undefined' || data.success == 'No data') {
              console.log("heloo");
              this.arrayStatus = true;
              this.flag = false;
          }
          else {
              this.flag = false;
              this.arrayStatus = false;
              this.places_array = this.places;
          }



      }, error => {
          console.log(error);

          this.flag = false;
          let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Server times out, please try again',
              buttons: ['OK']
          });
          alert.present();

      });


      },(err)=>{
          console.log(err);

      });



      } else {
              this.status = true;
        let alert = this.alertCtrl.create({
          title: 'Location is disabled',
          subTitle: 'In order to proceed, Please enable your location',
          buttons: ['OK']
       });

          alert.present();
        }
       }).catch(e => console.error(e));



  }

  OrderCategory( pickup_time, delivery_time,businessId, paypalId, discountvalue, stripeId, hours, min, time, deliveryFee, tax, delivery, pickup, admin_stripe, username, availed_discount_count, b_discount_count) {

      this.globals.availed_discount_count = Number(availed_discount_count);
      this.globals.business_discount_count = Number(b_discount_count);
      console.log(this.globals.availed_discount_count, this.globals.business_discount_count);

      console.log("id", businessId);
      this.globals.bussinessId = businessId;
      console.log(this.globals.bussinessId);
      this.globals.username = username;
      console.log("businessdiscount", this.globals.BusinessDiscount);
      this.globals.paypalId = paypalId;
      this.globals.pickup_Time = pickup_time;
      this.globals.estimated_time = time;
      this.globals.pickupsetting = delivery_time;
      this.globals.StripId = stripeId;
      this.globals.Timing = hours;
      this.globals.tax = tax;
      this.globals.deliveryCharges = deliveryFee;
      this.globals.admin_stripe = admin_stripe;
      this.globals.type = 'order';
      this.globals.pickup = pickup;
      // console.log(this.globals.admin_stripe);
      //console.log("delivery local ", delivery);
      console.log("pickup",pickup, "pickup_time",this.globals.pickup_Time);
      console.log("delivery global", this.globals.delivery);
      console.log("pickup@@@@@", this.globals.pickup)
      console.log("pickupsett",this.globals.pickupsetting,"time",this.time,this.globals.pickup_Time);

      if (delivery == '0') {
          this.globals.delivery = false;
      }
      else {
          this.globals.delivery = true;
      }
      if (pickup == '0') {
          this.globals.pickup = false;
      }
      else {
          console.log("else")
          this.globals.pickup = true;
      }
      console.log("min", min);
      if (min == '') {
          this.globals.minimun_order = 0;
      }
      else {
          this.globals.minimun_order = Number(min);
      }
      console.log("time", this.globals.Timing);
      console.log(delivery, pickup, this.globals.delivery, this.globals.pickup);

      this.navCtrl.push('CategoryPage', { pageflag: this.pageFlag, BusinessId: businessId, paypal: paypalId, discount: discountvalue });
      // this.navCtrl.push('Modal2Page', { 'pickup' : pickup});
      console.log("username",username, "pickup",pickup);
      
  }

  setFilteredItems() {
      // this.dataService.placedata();
      // if(this.places !== undefined)
      // {
      //     this.places = this.places_array.filter((item) => {
      //         return item.keywords.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ;
      //     });
      // }
      // else{
      //     return;
      // }
      console.log(this.searchTerm);

      if (this.searchTerm.length >= 3) {
          let response = this.server.LiveSearch(this.searchTerm.toLowerCase(), this.coordinates, this.radius, 'main');

          response.subscribe(data => {
              console.log("data$$$$$$$",data);

              if (data.status == 'true') {
                  this.places = data.results;
                  console.log("data$$$$$$$",this.places );
              }
              else {
                  return;
              }
          }, error => {
              console.log(error);

          });

      }
      if (!this.searchTerm) {
          console.log("else", this.searchTerm);

          this.offset = 0;
          let response = this.server.getRestaurantslist(this.radius, 'main', this.coordinates, this.offset.toString(), 'order');

          response.subscribe(data => {
              this.places = data.results;;
              
              console.log(this.places);
              console.log("testing pickup !!!!!!",this.places.pickup_time);
          }, error => {
              console.log(error);

              this.flag = false;
              let alert = this.alertCtrl.create({
                  title: 'Error',
                  subTitle: 'Server times out, please try again',
                  buttons: ['OK']
              });
              alert.present();

          });
      }

  }

  getLocation() {
      this.diagnostic.isLocationEnabled()
          .then((state) => {
              console.log(state);
              if (state) {
                  this.status = false;
                  console.log("if ", state)
                  this.arrayStatus = false;
                  this.flag = true;
                  this.geolocation.getCurrentPosition().then((position) => {
                      this.coordinates = position.coords.latitude + "," + position.coords.longitude;
                      this.list();

                  }, (err) => {
                      console.log(err);

                  });
              } else {
                  this.status = true;
                  let alert = this.alertCtrl.create({
                      title: 'Location is disabled',
                      subTitle: 'In order to proceed, Please enable your location',
                      buttons: ['OK']
                  });

                  alert.present();
              }
          }).catch(e => console.error(e));

  }
//     getLocationAddress() {

//         //this.getLocation();
      
      
//         console.log("check get location address function");
//         this.geolocation.getCurrentPosition().then((res)=>{
//             this.Geocoder_lat = res.coords.latitude;
//             this.Geocoder_lng = res.coords.longitude;
//             console.log("response",res);
//             console.log("geocoder lattitude",this.Geocoder_lat, this.Geocoder_lng);
//         this.nativeGeocoder.reverseGeocode(this.Geocoder_lat, this.Geocoder_lng)
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

  cartpage() {

      //  let cartmodel = this.modalCtrl.create('CartPage');
      // cartmodel.present();
      if (this.globals.Product.length == 0) {
          let alert = this.alertCtrl.create({
              title: "Oops",
              message: "Your cart is empty.",
              buttons: ["Okay"]

          });
          alert.present();
      }
      else {
          this.navCtrl.push('CartPage');
      }
  }


  Reviews(data) {

      // let modal = this.modalCtrl.create('ReviewsPage', { place: data});
      // modal.present();
      this.navCtrl.push('ReviewsPage', { place: data })
      
  }

  doRefresh(refresher) {
      this.offset = 0;
      this.getLocation();
      this.content.resize();
      refresher.complete();
  }

  // MobileVerificationPrompt() {
  //     if(this.globals.MobileDiscount != 0){
  //         let prompt = this.alertCtrl.create({
  //             title: 'Alert',
  //             message: "Verify your number and earn $" + this.globals.MobileDiscount + " for one time order.",
  //             buttons: [
  //                 {
  //                     text: 'No Thanks',
  //                     handler: data => {
  //                         console.log('Cancel clicked');
  //                     }
  //                 },
  //                 {
  //                     text: 'Okay',
  //                     handler: data => {
  
  //                         console.log('OK clicked');
  //                         this.DoMobileVerification();
  
  //                     }
  //                 }
  //             ]
  //         });
  //         prompt.present();
  //     }

      
  // }

  // DoMobileVerification() {
  //     // let model = this.modalCtrl.create('MobileVerificationPage');
  //     // model.present();
  //     let response = this.server.MobileVerification();

  //     response.subscribe(data => {
  //         console.log(data);
  //         var verficationResponse = data;
  //         console.log(verficationResponse);
  //         if (verficationResponse.success == 'true') {
  //             let model = this.modalCtrl.create('MobileVerificationPage');
  //             model.present();
  //         }
  //         else {
  //             let alert = this.alertCtrl.create({
  //                 title: "Error",
  //                 message: verficationResponse.message,
  //                 buttons: ["OK"]
  //             });
  //             alert.present();
  //         }

  //     }, error => { console.log(error); });

  // }

  CheckMobileFlag() {
      this.nativeStorage.getItem('MobileFlagSave').then(data => {
          this.mobileFlagcheck = data.MobileFlag;
          this.globals.MobileDiscount = data.MobileDiscount;
          console.log(this.globals.MobileDiscount, "mobile disocunt");
      }, error => {
          this.mobileFlagcheck = 'false'

      }).catch(err => console.log(err));
  }




  getUserOrder() {
      let loading = this.loadingCtrl.create({
          content: "loading...",

      });
      loading.present();
      let response = this.server.GetUserOrderPlaced()

      response.subscribe(data => {
          this.data = data;
          console.log(this.data);
          if (this.data.success != true) {

              let alert = this.alertCtrl.create({
                  title: 'Alert',
                  subTitle: 'No orders placed yet',
                  buttons: ['OK']
              });


              alert.present();


          }

          else {
              console.log(this.data.orders);
              this.sub = Observable.timer(1000, 1000);
              this.timer = this.sub.subscribe(t => {

                  //  this.subscription = timer
                  t = 1;
                  this.data.orders.forEach(element => {
                      console.log(t);
                      if (element.deliveryTimeLeft > 0) {
                          element.deliveryTimeLeft = element.deliveryTimeLeft - t;
                      }
                  });
              });
          }


          //this.orderdata = this.data.orderData;
          //console.log("orderdata",this.orderdata);
          loading.dismiss();
      });
  }

  SecondsTohhmmss(totalSeconds) {
      var hours = Math.floor(totalSeconds / 3600);
      var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
      var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

      // round seconds
      seconds = Math.round(seconds * 100) / 100

      var result = (hours < 10 ? "0" + hours : hours);
      result += "-" + (minutes < 10 ? "0" + minutes : minutes);
      result += "-" + (seconds < 10 ? "0" + seconds : seconds);
      var that = this;

      return result;

  }
  detail(data, time, instructions, schedule_time, res, tot, o_id) {
      console.log(res, "res", tot, o_id);
      console.log("instruction checking" ,instructions, "schedule_time",schedule_time);
      // let profileModal = this.modalCtrl.create('OrderPlacedDetailPage', {data:data});
      // profileModal.present();
      this.navCtrl.push('OrderPlacedDetailPage', { data: data, time: time, instructions: instructions, schedule_time: schedule_time, res: res, tot: tot, o_id: o_id });
  }

  doRefresh1(refresher) {
      this.timer.unsubscribe();
      this.getUserOrder();
      this.content.resize();
      refresher.complete();
  }

  ReorderVerificationPrompt(orderdata) {

      let prompt = this.alertCtrl.create({
          title: 'Alert',
          message: "Are you sure you want to place this order again?",
          buttons: [
              {
                  text: 'No',
                  handler: data => {
                      console.log('Cancel clicked');
                  }
              },
              {
                  text: 'Yes',
                  handler: data => {

                      console.log('OK clicked');
                      this.Categories(orderdata);

                  }
              }
          ]
      });
      prompt.present();
  }



  Categories(orderdata) {
      let loading = this.loadingCtrl.create({
          content: "loading...",

      });
      loading.present();
      console.log(orderdata);

      let response = this.server.GetBusinessMenuCategories(orderdata[0].restId);
      response.subscribe(data => {
          var res = data;
          console.log(res);
          loading.dismiss();
          // console.log(this.data.categories);
          this.category = res.categories;
          console.log("data", this.category);
          //this.userChoices.length = 0;
          console.log(orderdata);

          orderdata.forEach(userdata => {

              console.log(userdata);
              this.category.forEach(element => {
                  console.log(userdata.menuItem, element, element.tax);
                  this.globals.tax = element.tax;
                  element.items.forEach(subelement => {

                      if (userdata.menuItem == subelement.name) {
                          if (userdata.menuExtrasSelected.length == 0) {
                              console.log(userdata.quantity, userdata.restId);

                              let total_price = Number(userdata.quantity) * Number(subelement.price);
                              console.log(this.globals.Product);

                              this.globals.Product.push({ menuId: "1", restId: userdata.restId, uniqueId: userdata.uniqueId, menuItem: subelement.name, image: subelement.image, quantity: userdata.quantity, basePrice: Number(subelement.price), totalPrice: Number(total_price), menuExtrasSelected: [] });

                          }
                          else {
                              console.log(userdata.menuExtrasSelected, subelement);
                              console.log("else");

                              this.total_price_with_extras = Number(userdata.quantity) * Number(subelement.price);
                              console.log(this.globals.Product);
                              this.getExtras(subelement.id, userdata.menuExtrasSelected);


                              this.globals.Product.push({ menuId: "1", restId: userdata.restId, uniqueId: userdata.uniqueId, menuItem: subelement.name, image: subelement.image, quantity: userdata.quantity, basePrice: Number(subelement.price), totalPrice: Number(this.total_price_with_extras), menuExtrasSelected: this.userChoices });


                          }
                      }

                  });
              });
          });

          console.log("data1", this.data);

          // console.log(this.data.restaurant.categories);
          // console.log(this.category);
      }
          , error => {
              console.log(error);
              loading.dismiss();
              let alert = this.alertCtrl.create({
                  title: 'Error',
                  subTitle: 'Server times out, please try again',
                  buttons: ['OK']
              });
              alert.present();

          });
  }

  getExtras(ItemId, userExtras) {

      let response = this.server.ProductItemDetail(ItemId);

      response.subscribe(data => {
          console.log(data.item.extras);
          console.log(userExtras);

          userExtras.forEach(userextra_element => {
              console.log(userextra_element);

              data.item.extras.forEach(data_extra_element => {
                  console.log(data.item.extras);
                  console.log(userextra_element.optionNameSelected);

                  userextra_element.optionNameSelected.forEach(user_option_element => {

                      data_extra_element.options.forEach(data_option_element => {
                          if (user_option_element.name == data_option_element.name) {

                              this.total_price_with_extras += user_option_element.quantity * Number(data_option_element.price);
                              var data = { heading: data_extra_element.heading, optionNameSelected: [{ name: data_option_element.name, price: Number(data_option_element.price), quantity: user_option_element.quantity, total: Number(data_option_element.price) * user_option_element.quantity, isFree: false }] }
                              console.log(data);
                              this.userChoices.push(data);
                              console.log(this.userChoices);
                          }
                      });
                  });

              });
          });
      }
          , error => {
              console.log(error);
              let alert = this.alertCtrl.create({
                  title: 'Error',
                  subTitle: 'Server times out, please try again',
                  buttons: ['OK']
              });
              alert.present();
          });

  }


  segmentChanged() {


      if (this.option == 'orders_placed' && this.orderPlacedFlag == false) {
          this.getUserOrder();
          this.orderPlacedFlag = true;
      }
      if (this.option == 'orders') {
          this.timer.unsubscribe();
      }
  }

  Radiusvalue() {
      this.offset = 0;
      this.list();
  }

}

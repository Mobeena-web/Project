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
import { HomePage } from '../home/home';


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
  deals_flag:any;
  birthday_flag:any;
  constructor(public toastCtrl: ToastController, private diagnostic: Diagnostic, public server: ServerProvider, public nativeStorage: NativeStorage, public events: Events, private app: App, public globals: GlobalVariable, public modalCtrl: ModalController, public alertCtrl: AlertController, private geolocation: Geolocation, public loadingCtrl: LoadingController, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
      this.deals_flag = this.navParams.get('deals');
      this.birthday_flag = this.navParams.get('birthdaygift');

      this.date = new Date();
      this.min = this.date.getMinutes();
      this.hours = this.date.getHours();
      this.forToday = this.hours + ":" + this.min;
      this.globals.MinValue = this.forToday;
     
      this.pageFlag = navParams.get('Flag');
      this.textdisocunt = navParams.get('discount_text');
      this.searchControl = new FormControl();

      //this.getLocation();
      this.list();

      this.CheckMobileFlag();

      this.selectOptions = {
          title: 'Distance'
      };

      this.getLocation();

  }
  business_info(){
      this.navCtrl.push('BranchesAboutusPage');
  }
  reviews(name,business_id,hours_operation,latitude,longitude,username){
    this.navCtrl.push('AboutusPage',{name:name,business_id:business_id,hours_operation:hours_operation,latitude:latitude,longitude:longitude,username:username});
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
      if (this.timer != undefined) {
          this.timer.unsubscribe();
      }
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
    console.log("Branches List called", this.coordinates)
      this.status = false;
  
      let loading = this.loadingCtrl.create({
        content: "Loading",

    });
    loading.present();
       this.arrayStatus = false;
          this.flag = true;

      //     this.coordinates = position.coords.latitude+","+position.coords.longitude

      let response = this.server.getRestaurantslist(this.radius, 'branches', this.coordinates, this.offset.toString(), 'order');

      response.subscribe(data => {
            loading.dismiss();
          this.places = data.results;
        
          if (typeof data.success != 'undefined' || data.success == 'No data') {
             this.arrayStatus = true;
              this.flag = false;
          }
          else {
              this.flag = false;
              this.arrayStatus = false;
              this.places_array = this.places;
          }



      }, error => {
        loading.dismiss()
          this.flag = false;
          this.globals.presentToast("Something went wrong check your internet connection.")

      });





  }

  OrderCategory( place) {
    console.log(place,"ppo");
    console.log(this.places);

       this.globals.pickup = place.pickup;
       this.globals.latitude = place.latitude;
       this.globals.longitude = place.longitude;
       this.globals.hours_operation = place.hours_operation;
       this.globals.b_logo = place.logo;
       this.globals.StripId = place.stripe_id;
       this.globals.order_instructions = place.instructions_enabled;
       this.globals.pickup_timing = place.pickup_timing;
       this.globals.delivery_timing = place.delivery_timing;
       //this.globals.business_username = place.username;
       this.globals.estimated_time = place.delivery_time;
       this.globals.business_discount_count = parseInt(place.business_discount_count);
       this.globals.username = place.username;
       this.globals.bussinessId = place.business_id;
       this.globals.admin_stripe = place.admin_stripe_enabled;
       this.globals.pickupsetting = place.delivery_time;
       this.globals.tax = place.tax;
       this.globals.deliveryCharges = place.delivery_fee;
       this.globals.pickup_Time = place.pickup_time;
       this.globals.minimun_order = parseInt(place.minimum_order);
       this.globals.availed_discount_count = parseInt(place.customer_discount_availed_count);
       this.globals.paypalId = place.paypal_id;
       this.globals.Timing = place.hours_operation;
       this.globals.delivery_day = place.delivery_day;
       this.globals.authorize_enabled = place.authorize_enabled;
       this.globals.card_enabled = place.card_enabled;
       this.globals.admin_stripe_enabled = place.admin_stripe_enabled;
       this.globals.catering_enabled = place.catering_enabled;
       this.globals.catering_cart_enabled = place.catering_cart_enabled;
       this.globals.giftcard_amount_limit = place.giftcard_limit;
       this.globals.business_type = place.business_type;
       this.globals.ccFeeDisclaimer = place.ccFeeDisclaimer;

       
         if (this.globals.pickup == '1') {
             this.globals.pickup = true;
         }
         else {
             this.globals.pickup = false;
         }
         if (place.delivery == '1') {
             console.log('place delivery' , place.delivery == '1');
             this.globals.delivery = true;
         }
         else {
             this.globals.delivery = false;
         }
         if(place.cash_enabled == '1'){
             this.globals.cash_enabled = true;
         }
         else{
             this.globals.cash_enabled = false;

         }
        if (this.globals.pickup == '1') {
            this.globals.pickup = true;
        }
        else {
            this.globals.pickup = false;
        }
        if (place.delivery == '1') {
            console.log('place delivery1' , place.delivery == '1');
            this.globals.delivery = true;
        }
        else {
            this.globals.delivery = false;
        }
      
     
    if(this.deals_flag ==1){
        this.navCtrl.push('OffersPage', { pageflag: this.pageFlag, BusinessId: place.business_id, paypal: place.paypalId, discount: place.discountvalue });

    }
    else if(this.birthday_flag == 2){
       
        this.navCtrl.push('BirthdayGiftsPage', { pageflag: this.pageFlag, BusinessId: place.business_id, paypal:place.paypalId, discount: place.discountvalue });

    }
    else{
        if(this.globals.marketPlace || this.globals.branch_enabled == 1){
            console.log('Checking....',this.globals.marketPlace, this.globals.branch_enabled == 1)
            console.log(this.globals.marketPlace && this.globals.branch_enabled == 1);
            this.navCtrl.push('CategoryPage', { pageflag: this.pageFlag, BusinessId: place.business_id, paypal: place.paypalId, discount: place.discountvalue });

        }
        else{
            this.navCtrl.setRoot(HomePage)
        }

    }
     
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

      if (this.searchTerm.length >= 3) {
          let response = this.server.LiveSearch(this.searchTerm.toLowerCase(), this.coordinates, this.radius, 'main');

          response.subscribe(data => {

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
      if (!this.searchTerm) {

          this.offset = 0;
          let response = this.server.getRestaurantslist(this.radius, 'branches', this.coordinates, this.offset.toString(), 'order');

          response.subscribe(data => {
              this.places = data.results;
              
              console.log(this.places);
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
    //   this.diagnostic.isLocationEnabled()
    //       .then((state) => {
            //   if (state) {
                  this.status = false;
                  this.arrayStatus = false;
                  this.flag = true;
                  if(this.globals.delivery == true){
                  this.geolocation.getCurrentPosition().then((position) => {
                      this.coordinates = position.coords.latitude + "," + position.coords.longitude;
                      console.log("get Location branches ", this.coordinates)
                      this.list();

                  }, (err) => {
                      console.log(err);
                      this.status = true;
                      let alert = this.alertCtrl.create({
                          title: 'Location is disabled',
                          subTitle: 'In order to proceed, Please enable your location',
                          buttons: ['OK']
                      });
    
                      alert.present();
                  });
                }
            //   } else {
                
            //   }
        //   }).catch(e => console.error(e));

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
      //this.getLocation();
      this.list();
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
          if (this.data.success != true) {

              let alert = this.alertCtrl.create({
                  title: 'Alert',
                  subTitle: 'No orders placed yet',
                  buttons: ['OK']
              });


              alert.present();


          }

          else {
              this.sub = Observable.timer(1000, 1000);
              this.timer = this.sub.subscribe(t => {

                  //  this.subscription = timer
                  t = 1;
                  this.data.orders.forEach(element => {
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

      let response = this.server.GetBusinessMenuCategories(orderdata[0].restId);
      response.subscribe(data => {
          var res = data;
          loading.dismiss();
          // console.log(this.data.categories);
          this.category = res.categories;
          //this.userChoices.length = 0;

          orderdata.forEach(userdata => {

              this.category.forEach(element => {
                  this.globals.tax = element.tax;
                  element.items.forEach(subelement => {

                      if (userdata.menuItem == subelement.name) {
                          if (userdata.menuExtrasSelected.length == 0) {

                              let total_price = Number(userdata.quantity) * Number(subelement.price);

                              this.globals.Product.push({ menuId: "1", restId: userdata.restId, uniqueId: userdata.uniqueId, menuItem: subelement.name, image: subelement.image, quantity: userdata.quantity, basePrice: Number(subelement.price), totalPrice: Number(total_price), menuExtrasSelected: [] });

                          }
                          else {
                           
                              this.total_price_with_extras = Number(userdata.quantity) * Number(subelement.price);
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
        
          userExtras.forEach(userextra_element => {

              data.item.extras.forEach(data_extra_element => {
                
                  userextra_element.optionNameSelected.forEach(user_option_element => {

                      data_extra_element.options.forEach(data_option_element => {
                          if (user_option_element.name == data_option_element.name) {

                              this.total_price_with_extras += user_option_element.quantity * Number(data_option_element.price);
                              var data = { heading: data_extra_element.heading, optionNameSelected: [{ name: data_option_element.name, price: Number(data_option_element.price), quantity: user_option_element.quantity, total: Number(data_option_element.price) * user_option_element.quantity, isFree: false }] }
                              this.userChoices.push(data);
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

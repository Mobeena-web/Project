import { Injectable } from '@angular/core'
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { CONFIG } from '../../app-config';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
declare var Circles;


@Injectable()
export class GlobalVariable {
  staging: boolean = false;
  //Product: Array<{ productName: string, image: string, Quantity: number,price: number  }> = [];
  cartflag: boolean = true;
  showFabFlag: boolean;
  BusinessID: any = -1;
  udid: any;
  Product: any[] = new Array();
  paypalId: any;
  GainDiscount: any = 0;
  BusinessDiscount: any = 0;
  GainDiscountFlag: boolean = false;
  BusinessDiscountFlag: boolean = false;
  BirthdayDiscount: number;
  BirthdayCreditExist: boolean;
  StripId: any;
  OrderId: any;
  Timing: any;
  birthdayAmount: any;
  BaseUrl: string;
  MenuUrl: string;
  RadeemUrl: string;
  minimun_order: any;
  pickup_Time: any;
  savePickupTime: any;
  deliveryCharges: any = 0;
  HomeFlag: boolean;
  WallletLock: boolean = false;
  BirthdayCreditUtlized: boolean = false;
  MobileDiscount: number = 0;
  MobileDiscountFlag: boolean;
  code: any;
  TipAdded: boolean = false;
  tax;
  deliveryChargesFinishthroughPickup: boolean = false;
  delivery: boolean;
  pickup: any;
  pickupsetting: any;
  admin_stripe: any;
  walletPageFlag: boolean = false;
  homePageFlag: boolean = false;
  title: any;
  showbackButton: boolean = false;
  category_name: any;
  bussinessId: any;
  points_availed: any = 0;
  reservation_id: any;
  type: any;
  OrderType: any;
  username: any;
  punchCount: any = 0;
  RewardCount: any = 0;
  BirthCount: any = 0;
  PointCount: any = 0;
  availed_discount_count: any = 0;
  business_discount_count: any = 0;
  TotalbadgeValue: any = 0;
  MinValue: any;
  DeliveryTime: any;
  estimated_time: any;
  itemInstruction: any;
  RewardsPos: any;
  Email: any;
  PhoneNo: any;
  phone_verified: boolean;
  email_verified: boolean;
  business_username: any = CONFIG.business_username;
  jackemial: any;
  new_id = CONFIG.business_id;
  main_id = CONFIG.business_id;
  // main_id = 76;
  marketPlace = CONFIG.marketPlace;
  company = CONFIG.company;
  env = CONFIG.env;
  model_flag: boolean = true;
  signupData: any;
  percent: any;
  mycoordinates: any;
  save_check: boolean = false;
  points_: any;
  cash_enabled: boolean;
  special_offer: any;
  events_enabled: any;
  firstName: any;
  lastName: any;
  gallery_enabled: any;
  android_url: any;
  ios_url: any;
  update_message: any;
  app_version = "2.1";
  notifications: any;
  guess_login: boolean = false;
  banner_image: any;
  punch_: any;
  punch_limit_: any;
  latitude: any;
  longitude: any;
  hours_operation;
  welcome_data: any;
  branch_enabled: any;
  giftcard_enabled: any;
  business_list: any;
  b_logo: any = '';
  is_birthday: any;
  is_anniversary: any;
  order_instructions: any;

  //kiosk flag true if building for kiosk
  caos_flag: boolean = false;
  caos_udid = 'e2c40e9f0a';

  welcome: any = {
    welcome_screen_title: '',
    welcome_screen_subtitle: '',
    welcome_screen_image: ''
  }
  inradius: boolean = true;
  pickup_timing: any;
  delivery_timing: any;
  locationSelected = false;
  // punch - point variable
  punch_check: any;
  point_check: any;
  //
  reward_menu_length: any = 0;
  specific_delivery_day: any;
  delivery_day: any;
  review_enabled: any;
  menu_id: any;
  menu_item_arr: any = [];

  admin_stripe_enabled: boolean = false;
  authorize_enabled: boolean = false;
  card_enabled: boolean = false;
  catering_enabled = false;
  catering_cart_enabled = false;
  giftcard_amount_limit: any = 0;
  schedule_day_id: any;
  schedule_converted_time: any;
  business_type: any;
  orders_enabled: any;
  retail_items_discount = 0;
  home_logo: any;
  business_password: any;
  order_time: any = 'now';
  address: any;
  lat: any;
  long: any;
  menu_ready_msg: any;
  myDate: any;
  myTime: any;
  cash_discount: any;
  cash_discount_enabled: any = false;
  cash_discount_value: any = 0;
  cash_discount_percentage: any = 0;
  ccFeeDisclaimer: any;
  tip_enabled: any = true;
  utensils_enabled: any = true;
  appColor: any = '#000000';
  appointment_enabled: boolean = false;
  itemDetail: any;

  banner_color: any;
  giftCard_color: any;
  myRewards_color: any;
  orderNow_color: any;
  specialOffer_color: any;
  themeColor: any = '#000000';
  delivery_fee: any;
  rewardTemp: boolean = false;
  menu_ready: any;
  business_phone: any;
  business_address: any;
  business_name: any;
  selected_business_id: any;
  selected_branch_name : any;
  website : any;
  schedule_enabled : any;
  branchUsername : any;
  object :any;
  bookingCheck : boolean = false;

  logs = true;
  locationAlert_title = 'Location is turned off';
  locationAlert_text = 'Please consider enabling the location for this app in order to maximize the user experience. You may still proceed without enabling the location.';

  baseURLS = {
    mknx: {
      production: 'https://mknxapi.com/api/',
      staging: 'https://staging.onlineordering.mikronexus.com/',
      development: 'https://staging.onlineordering.mikronexus.com/'
    },
    halalguide: {
      production: 'https://thehalalguide.net/prod/',
      staging: 'https://thehalalguide.net/stage/',
      development: 'https://thehalalguide.net/stage/'
    }
  }
  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, private locationAccuracy: LocationAccuracy,
    public androidPermissions: AndroidPermissions,) {
    // if ()
    // this.BaseUrl = 'https://staging.onlineordering.mikronexus.com/index.php/';
    // this.BaseUrl = 'https://onlineordering.mikronexus.com/online-ordering-new/index.php/';
    // this.BaseUrl = 'http://192.168.100.3/online-ordering-rewamp/index.php/'



    this.BaseUrl = this.baseURLS[this.company][this.env] + 'index.php/';
    console.log('base url', this.BaseUrl);
  }

  log(param, data) {
    if (this.logs) {
      console.log(param, data)
    }
  }

  alertMessage(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  circle_graph(value, id, radius, width, color) {
    var myCircle = Circles.create({
      id: id,
      radius: radius,
      value: value,
      maxValue: 100,
      width: width,
      text: function (value) { return ''; },
      colors: [color, '$primary;'],
      duration: 400,
      wrpClass: 'circles-wrp',
      textClass: 'circles-text',
      valueStrokeClass: 'circles-valueStroke',
      maxValueStrokeClass: 'circles-maxValueStroke',
      styleWrapper: true,
      styleText: true
    });
  }

  disableBtn(obj,timing?){
    this.object = obj;
    let duration
    if(timing){
        duration = timing;
    }else{
        duration = 5000;
    }
    let that = this;
    let clearKey = setInterval(function () {
      that.object = '';
      console.log("disableBtn",that.object)
      clearInterval(clearKey);
    }, duration);
  }

  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          console.log("check 001");
          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
          console.log("check 002");

          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      }, err => {
        alert(err);
      });
  }


  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        console.log("check 003");

        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(() => {
            console.log("check 004");

            // call method to turn on GPS
            this.askToTurnOnGPS();
          },
            error => {
              console.log("check 005");
              //Show alert if user click on 'No Thanks'
              console.log('requestPermission Error requesting location permissions ' + error)
              // alert('requestPermission Error requesting location permissions ' + error)
            });
      }
    }, err => {
      console.log("error in request GPS Permission", err)
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      (data) => {
        console.log("check 006", data);
        // When GPS Turned ON call method to get Accurate location coordinates
      },
      error =>
        console.log("Error requesting location permissions", error)
      // alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  setupBusiness(business) {
    this.selected_business_id = business.business_id;
    this.point_check = business.points_enabled;
    this.punch_check = business.punches_enabled;
    this.special_offer = business.special_offer;
    this.events_enabled = business.events_enabled;
    this.gallery_enabled = business.gallery_enabled;
    this.pickup = business.pickup;
    this.latitude = business.latitude;
    this.longitude = business.longitude;
    this.menu_ready_msg = business.menu_ready_message;
    this.hours_operation = business.hours_operation;
    this.branch_enabled = business.branch_enabled;
    this.giftcard_enabled = business.giftcard_enabled;
    this.b_logo = business.logo;
    this.home_logo = business.logo;

    this.business_name = business.name;
    this.business_phone = business.phone;
    this.business_address = business.address;
    this.StripId = business.stripe_id;
    this.order_instructions = business.instructions_enabled;
    this.pickup_timing = business.pickup_timing;
    this.delivery_timing = business.delivery_timing;
    this.business_username = business.username;
    this.estimated_time = business.delivery_time;
    this.business_discount_count = parseInt(business.business_discount_count);
    this.username = business.username;
    this.bussinessId = business.business_id;
    this.admin_stripe = business.admin_stripe_enabled;
    this.pickupsetting = business.delivery_time;
    this.tax = business.tax;
    this.deliveryCharges = business.delivery_fee;
    this.pickup_Time = business.pickup_time;
    this.minimun_order = parseInt(business.minimum_order);
    this.availed_discount_count = parseInt(business.customer_discount_availed_count);
    this.paypalId = business.paypal_id;
    this.Timing = business.hours_operation;
    this.specific_delivery_day = business.specific_delivery_day;
    this.review_enabled = business.review_enabled;
    this.delivery_day = business.delivery_day;
    this.authorize_enabled = business.authorize_enabled;
    this.card_enabled = business.card_enabled;
    this.admin_stripe_enabled = business.admin_stripe_enabled;
    this.catering_enabled = business.catering_enabled;
    this.catering_cart_enabled = business.catering_cart_enabled;
    this.giftcard_amount_limit = business.giftcard_limit;
    this.business_type = business.business_type;
    this.appointment_enabled = business.appointment_enabled;
    this.orders_enabled = business.orders_enabled;
    this.BusinessDiscount = business.discount;
    this.ccFeeDisclaimer = business.ccFeeDisclaimer;
    this.tip_enabled = business.tip_enabled;
    this.menu_ready = business.menu_ready;

    if (this.pickup == '1') {
      this.pickup = true;
    } else {
      this.pickup = false;
    }

    if (business.delivery == '1') {
      this.delivery = true;
    } else {
      this.delivery = false;
    }

    if (business.cash_enabled == '1') {
      this.cash_enabled = true;
    } else {
      this.cash_enabled = false;
    }

    if (this.pickup == '1') {
      this.pickup = true;
    } else {
      this.pickup = false;
    }

    if (business.delivery == '1') {
      this.delivery = true;
    } else {
      this.delivery = false;
    }
  }
  clearCart() {

  }


}



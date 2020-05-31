import { Injectable } from '@angular/core'
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { CONFIG } from '../../app-config';
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
    marketPlace = CONFIG.marketPlace;
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
    b_logo: any;
    is_birthday: any;
    is_anniversary: any;
    order_instructions: any;


    //kiosk flag true if building for kiosk
    caos_flag: boolean = false;
    caos_udid = 'e2c40e9f0a';








    welcome: any;
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
    business_password : any;
    order_time:any = 'now';
    address:any;
    lat:any;
    long:any;
    myDate:any;
    cash_discount:any;
    cash_discount_enabled:any = false;
    cash_discount_value:any = 0;
    cash_discount_percentage :any = 0;
    ccFeeDisclaimer:any;
    appColor:any= '#d2a11a';
    constructor(public alertCtrl: AlertController, public toastCtrl: ToastController) {
        // this.BaseUrl = 'https://staging.onlineordering.mikronexus.com/index.php/';
        this.BaseUrl = 'https://onlineordering.mikronexus.com/online-ordering-new/index.php/';
        // this.BaseUrl = 'http://192.168.100.3/online-ordering-rewamp/index.php/'
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

}



import { Injectable } from '@angular/core'
import { AlertController  } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {CONFIG} from '../../app-config';
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
    savePickupTime : any ;
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
    OrderType : any;
    username: any;
    punchCount: any = 0;
    RewardCount: any = 0;
    BirthCount: any = 0;
    PointCount: any = 0;
    availed_discount_count: any = 0;
    business_discount_count: any = 0;
    TotalbadgeValue: any = 0;
    MinValue : any ;
    DeliveryTime : any ;
    estimated_time : any;
    itemInstruction : any ;
    RewardsPos : any ; 
    Email : any;
    PhoneNo: any ;
    phone_verified :boolean;
    email_verified :boolean;
    business_username = CONFIG.business_username;;
    jackemial:any;
    new_id=CONFIG.business_id;
    model_flag :boolean = true;
    signupData:any;
    percent:any;
    mycoordinates:any;
    save_check:boolean = false;
    points_:any;
    cash_enabled:boolean;
    special_offer:any;
    events_enabled:any;
    firstName:any;
    lastName:any;
    gallery_enabled:any;
    android_url:any;
    ios_url:any;
    update_message:any;
    app_version = "2";
    notifications:any;
    guess_login:boolean = false;
    banner_image:any;
    punch_:any;
    punch_limit_:any;
    latitude:any;
    longitude:any;
    hours_operation;
    welcome_data:any;
    branch_enabled:any;
    giftcard_enabled:any;
    business_list:any;
    b_logo:any;
    is_birthday:any;
    is_anniversary:any;
    order_instructions:any;
    caos_flag:boolean = false; 
    constructor(public alertCtrl: AlertController,public toastCtrl: ToastController) {
     this.BaseUrl = 'https://onlineordering.mikronexus.com/online-ordering-new/index.php/';
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

    circle_graph(id,radius,width,color){
       
        var myCircle = Circles.create({
            id:                  id,
            radius:              radius,
            value:               this.percent,
            maxValue:            100,
            width:               width,
            text:                function(value){return '';},
            colors:              [color, '#333'],
            duration:            400,
            wrpClass:            'circles-wrp',
            textClass:           'circles-text',
            valueStrokeClass:    'circles-valueStroke',
            maxValueStrokeClass: 'circles-maxValueStroke',
            styleWrapper:        true,
            styleText:           true
          });
    }
   
}



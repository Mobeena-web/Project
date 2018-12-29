import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, LoadingController, Content, App, ModalController, NavParams, Platform, Tabs } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GlobalVariable } from '../../app/global';
import { NativeAudio } from '@ionic-native/native-audio';
import { NativeStorage } from '@ionic-native/native-storage';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';

declare var Circles;


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    profiledata: any;
    mobile_verify: any;
    walletAlertFlag: boolean;
    homeFlag: boolean;
    punchcount: number = 0;
    reward_count: number = 0;
    count: number = 0;
    discount: any;
    GainFlag: any;
    discount_value: any;
    discount_text: any;
    cartflag: boolean;
    Images: any;
    user_date: any;
    user_id: any;
    month: any;
    year: any;
    slicedValue: string;

    lastname: any;
    name: any;
    value: any;
    time: any = "4000";
    points:any;
    punch=[];
    punch_limt=[];
    places:any;
    ring_image:any;
    @ViewChild(Slides) slides: Slides;
    @ViewChild(Content) content: Content;
    @ViewChild('myTabs') tabRef: Tabs;


    scannedText: any;

    public buttonText: string;
    public loading: boolean;
    private eventId: number;
    public eventTitle: string;
    data: any;
    user_email: any;
    udid: any;
    barocde_image: any;
    banner: any;
    images: any;
    filterbanner: any;
    flag: boolean;
    coordinates:any;
    punch_limt_:any;
    punch_:any;
    email:any;
    today_message:any;
    constructor(private geolocation: Geolocation,private diagnostic: Diagnostic,public app: App, public server: ServerProvider, public globals: GlobalVariable, private nativeAudio: NativeAudio, private iab: InAppBrowser, private nativeStorage: NativeStorage, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public _nav: NavController, public _navParams: NavParams, public alertCtrl: AlertController, public platform: Platform) {
        if(!this.globals.guess_login){
             this.reward_notification();
        }
        this.loadBanner();
        
        this.cartflag = _navParams.get('CartFlag');
        this.discount_text = _navParams.get('discountText');
        this.GainFlag = _navParams.get('Flag');
        this.discount = _navParams.get('discount');
        this.globals.showFabFlag = true;
        this.barocde_image = _navParams.get('imageData');
        localStorage.removeItem("GetAddress");
        localStorage.removeItem("scheduled_time");

    }
   

    orderNow(){
        if(this.globals.branch_enabled == 1){
            this._nav.push('ResturantListPage')
        }
        else{
            this._nav.push('CategoryPage')
        }
    }

    gifts(){
        this._nav.push('GiftcardsPage');
    }
    rewards(){
        this._nav.push('MyRewardsPage')

    }
    reward_notification(){
        let response = this.server.reward_notification();
        response.subscribe(data => {
            if(data.status == true){
                this.globals.notifications = data.notifications;
                let mobile_update = this.modalCtrl.create('RewardNotificationPage');
                 mobile_update.present();
            }
        }, error => {
            console.log(error,"error notifications");

        });
    }

    doRefresh(refresher) {
        this.loadBanner();

        this.getLocation();
        if (this.globals.Product.length > 0) {
            this.globals.cartflag = true;
        }

        this.globals.HomeFlag = true;
        this.content.resize();
        this.nativeStorage.getItem('user')
            .then(data => {
                this.email = data.email,
                this.name = data.firstName;
                this.lastname = data.lastName;
                this.barocde_image = data.image;
                this.user_date = data.date;
                this.user_id = data.ID;
                this.udid = data.udid;
                this.mobile_verify = data.phone_verify;

                this.globals.udid = this.udid;
               
                this.value = this.pad(this.user_id, 12);
                this.slicedValue = this.value.slice(0, 4) + " " + this.value.slice(4, 8) + " " + this.value.slice(8, 12);
              
                this.month = this.user_date.substring(0, 2);
                this.year = this.user_date.substring(8);
              
                if (this.GainFlag) {
                    this.showDiscountMessage();
                }


            }).catch(err => console.log);

        // this.nativeStorage.getItem('Product')
        // .then (data => {
        //     this.globals.Product = data.array;
        //     this.globals.BusinessDiscount = data.BusinessDiscount;
        //     this.globals.minimun_order = data.MinimumOrder;
        //     this.globals.deliveryCharges =  data.DeliveryCharges;


        //     console.log("global array",this.globals.Product,"data",data.BusinessDiscount,data.MinimumOrder,data.DeliveryCharges);

        //     if(this.globals.Product.length > 0)
        //     {
        //         this.globals.cartflag = true;
        //     }
        //     console.log("global flag " , this.globals.cartflag);

        // }).catch(err => console.log);


        this.nativeStorage.getItem('discount')
            .then(data => {
                this.globals.GainDiscount = data.discountValue;



            }).catch(err => console.log);
    
        setTimeout(() => {
          refresher.complete();
        }, 2000);
      }



    getLocation() {
        this.diagnostic.isLocationEnabled()
            .then((state) => {
                if (state) {
                 
                    this.flag = true;
                    this.geolocation.getCurrentPosition().then((position) => {
                        this.coordinates = position.coords.latitude + "," + position.coords.longitude;
                        this.globals.RewardsPos = this.coordinates;
                        this.globals.mycoordinates = this.coordinates;
                        this.getPoints(this.coordinates);
                        this.getPunches(this.coordinates);
                        this.server.CheckUserPunchCards();
                        this.server.CheckUserReward();
                        this.server.CheckUserBadgePoints();
                    }, (err) => {
                        console.log(err);

                    });
                } else {
                    let alert = this.alertCtrl.create({
                        title: 'Location is disabled',
                        subTitle: 'In order to proceed, Please enable your location',
                        buttons: ['OK']
                    });

                    alert.present();
                }
            }).catch(e => {

                this.getPoints("0,0");
                this.getPunches("0,0");
                this.server.CheckUserPunchCards();
                this.server.CheckUserReward();
                this.server.CheckUserBadgePoints();

                let alert = this.alertCtrl.create({
                    title: 'Location is disabled',
                    subTitle: 'In order to proceed, Please enable your location',
                    buttons: ['OK']
                });

                alert.present();
            });

    }

    offers(){
        if(this.globals.branch_enabled == 1){
            this._nav.push('ResturantListPage',{deals:1})
        }
        else{
            this._nav.push("OffersPage");
        }
    }
  


    ionViewDidLeave() {
    
        this.globals.HomeFlag = false;
        if (this.globals.Product.length > 0) {
            this.globals.cartflag = true;
        }
    }

    getPoints(coordinates) {

        // let loading = this.loadingCtrl.create({
        //     content: "Loading...",

        // });
        // loading.present();

        let response = this.server.getPoints(coordinates);
        response.subscribe(data => {
         
            if(data.status == "error"){
                this.points = 0;
                this.globals.points_ = 0;
            }
            else{
                this.points = data.rewards[0].points;
                this.globals.points_ = this.points;
            }
            
            
            // loading.dismiss();
        
        }, error => {
            // loading.dismiss();

            this.globals.alertMessage("Failure","Something went wrong check your internet connection.")

        });
    }

    getPunches(coordinates) {

        let response = this.server.getPunch(coordinates);
        response.subscribe(data => {
            if(data.success == "No data"){
                this.punch_ = 0;
                this.punch_limt_ = 0;
                this.globals.punch_ = 0;
                this.globals.punch_limit_ = 0;
                this.globals.percent = (parseInt(this.punch_) / parseInt(this.punch_limt_))*100;
                this.globals.circle_graph('circles1',50,7,'#ccc');
            }
            else{

                this.punch_ = data.cards[0].punch_count;
                this.punch_limt_ = data.cards[0].punch_limit;
                this.globals.punch_ = this.punch_;
                this.globals.punch_limit_ = this.punch_limt_;
   
                this.globals.percent = (parseInt(this.punch_) / parseInt(this.punch_limt_))*100;
                this.globals.circle_graph('circles1',50,7,'#ccc');
            }
          
             
            
        
        }, error => {
            this.globals.alertMessage("Failure","Something went wrong check your internet connection.")

        });
    }

    ionViewDidLoad() {
        this.getLocation();
           
        if (this.globals.Product.length > 0) {
            this.globals.cartflag = true;
        }

        this.globals.HomeFlag = true;
        this.content.resize();
        this.nativeStorage.getItem('user')
            .then(data => {
                this.email = data.email,
                this.name = data.firstName;
                this.lastname = data.lastName;
                this.barocde_image = data.image;
                this.user_date = data.date;
                this.user_id = data.ID;
                this.udid = data.udid;
                this.mobile_verify = data.phone_verify;

                this.globals.udid = this.udid;
               
                this.value = this.pad(this.user_id, 12);
                this.slicedValue = this.value.slice(0, 4) + " " + this.value.slice(4, 8) + " " + this.value.slice(8, 12);
                this.month = this.user_date.substring(0, 2);
                this.year = this.user_date.substring(8);


                if (this.GainFlag) {
                    this.showDiscountMessage();
                }


            }).catch(err => console.log);

        // this.nativeStorage.getItem('Product')
        // .then (data => {
        //     this.globals.Product = data.array;
        //     this.globals.BusinessDiscount = data.BusinessDiscount;
        //     this.globals.minimun_order = data.MinimumOrder;
        //     this.globals.deliveryCharges =  data.DeliveryCharges;


        //     console.log("global array",this.globals.Product,"data",data.BusinessDiscount,data.MinimumOrder,data.DeliveryCharges);

        //     if(this.globals.Product.length > 0)
        //     {
        //         this.globals.cartflag = true;
        //     }
        //     console.log("global flag " , this.globals.cartflag);

        // }).catch(err => console.log);


        this.nativeStorage.getItem('discount')
            .then(data => {
                this.globals.GainDiscount = data.discountValue;



            }).catch(err => console.log);
        // var that = this;
        // setTimeout(function () {
        //     // that.slides.autoplayDisableOnInteraction = false;
        // }, 6000);

    }
    ionViewWillEnter() {
        this.globals.showbackButton = false;
        this.globals.title = 'Dusstuk';
        // if(this.globals.mycoordinates){
        //     this.getPunches(this.globals.mycoordinates)
        // }


    }


    showDiscountMessage() {
      
        let alert = this.alertCtrl.create({
            title: 'Congratulation',
            subTitle: this.discount_text,
            buttons: ['OK']
        });
        alert.present();
    }

    launch(url) {
        this.iab.create(url, "_self");

    }
    pad(str, max) {
        str = str.toString();
        return str.length < max ? this.pad("0" + str, max) : str;
    }




    loadBanner() {
        
        let response = this.server.LoadBannersOnHomePage()
        response.subscribe(data => {
            console.log(data)

            this.banner = data;
            this.Images = this.banner.data;
            this.globals.banner_image = this.banner.data;
            this.time = this.banner.time;
            this.globals.android_url  = this.banner.android_url;
            this.globals.ios_url = this.banner.ios_url;
            this.globals.update_message = this.banner.message;
            this.ring_image = this.banner.ring_image;
            this.globals.is_anniversary = this.banner.is_anniversary;
            this.globals.is_birthday = this.banner.is_birthday;
           
            this.content.resize();

            if(!this.banner.is_latest_build){
                    let mobile_update = this.modalCtrl.create('MobileUpdatePage');
                    mobile_update.present();
            }
         
        }
            , error => {
            });
    }

    ngAfterViewInit(){
        setTimeout( ()=>{
            var date = new Date();
            var day = date.getDay();
            console.log("gh",this.globals.hours_operation)
            if(this.globals.hours_operation && this.globals.hours_operation[day]){
                
                var current_day = this.globals.hours_operation[day];
                this.today_message = current_day[2];
        }
        }, 3000)
      }



    OpenSettingPage() {
        this._nav.push('SettingsPage')
    }
    ordersPage() {
        // this._nav.parent.tabRef[0].isSelected=false;
        this._nav.push('OrderListingPage')
    }

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
            this._nav.push('CartPage');
        }
    }

    taxiPage() {
        this._nav.push('TaxiPage');
    }

    bookingPage() {
        this._nav.push('BookingPage');
    }

    ReservationPage() {
        this._nav.push('ReservationPage');
    }

    birthday_gifts(){
        if(this.globals.branch_enabled == 1){
            this._nav.push('ResturantListPage',{birthdaygift:2})
        }
        else{
        this._nav.push('BirthdayGiftsPage');
        }
    }
  


}

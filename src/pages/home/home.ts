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
    punch_menu:any;
    encodedData:any;

    banner_color: any;
    gift_cards_color: any;
    my_rewards_color:any;
    order_now_color: any;
    special_offer_color: any;
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
       this.list();
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
    rewards(type){
        this._nav.push('MyRewardsPage',{reward_type_home:type})

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
        this.getPoints('0,0');
        this.getPunches();
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
        let response = this.server.getPoints(coordinates);
        response.subscribe(data => {
            if(data.status == "error"){
                this.points = 0;
                this.globals.points_ = 0;
            }
            else{
                this.points = data.rewards[0].points;
                this.globals.points_ = Number(this.points);
            }
        }, error => {
            this.globals.presentToast("Something went wrong check your internet connection.")

        });
    }


    getPunches() {
        let response = this.server.getpunches_menuitems();
        response.subscribe(data => {
            if(data.status == true){

              this.punch_menu = data.items;
              if(this.punch_menu.length > 0){
                this.punch_ = Number(this.punch_menu[0].punch_count);
                this.punch_limt_ = Number(this.punch_menu[0].punch_limit);
                this.globals.punch_ = this.punch_;
                this.globals.punch_limit_ = this.punch_limt_;
   
                var percent = (parseInt(this.punch_) / parseInt(this.punch_limt_))*100;
                this.globals.circle_graph(percent,'homecircle1',50,7,'#ccc');
             
              }
              else{
                this.punch_ = 0;
                this.punch_limt_ = 0;

                this.globals.circle_graph(0,'homecircle1',50,7,'#ccc');
              }
              
            }
            else{
                this.punch_ = 0;
                this.punch_limt_ = 0;

                this.globals.circle_graph(0,'homecircle1',50,7,'#ccc');
                this.globals.presentToast(data.message)
            }
         
          
        }, error => {
            this.globals.presentToast("Something went wrong check your internet connection.")

        });
    }

    ionViewDidLoad() {
        this.getLocation();
        this.rewards_items();
           
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

            this.nativeStorage.getItem('discount')
                .then(data => {
                    this.globals.GainDiscount = data.discountValue;



                }).catch(err => console.log);
    }


    ionViewWillEnter() {
        this.globals.showbackButton = false;
        this.getPoints('0,0');
        this.getPunches();
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

    services(){
        this._nav.push('BookingPage')
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
            this.banner_color = this.banner.banner_color;
            this.special_offer_color = this.banner.special_offer_color;
            this.my_rewards_color = this.banner.my_rewards_color;
            this.gift_cards_color = this.banner.gift_cards_color;
            this.order_now_color = this.banner.order_now_color;
            //console.log('colors',this.my_rewards_color,this.gift_cards_color, this.special_offer_color,this.order_now_color);


            if(!this.banner.is_latest_build){
                    let mobile_update = this.modalCtrl.create('MobileUpdatePage');
                    mobile_update.present();
            }
         
        }
            , error => {
            });
    }

    ngAfterViewInit(){
        console.log('ngAfter View In it')
        setTimeout( ()=>{
            var date = new Date();
            var day = date.getDay();

            if(this.globals.hours_operation && this.globals.hours_operation[day]){
                
                var current_day = this.globals.hours_operation[day];
                this.today_message = current_day[2];
                console.log('msg..',this.today_message);
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

    rewards_items() {
    
        let response = this.server.getrewards_menuitems();
        response.subscribe(data => {          
            if(data.status == true){
               
                 if (data.items.length > 0) {
                    this.globals.reward_menu_length = data.items.length;
                }
            }
          
        }
        , error => {
        });
    }

    list() {
        let response = this.server.getRestaurantslist('100000', 'main', "0,0", '0', 'order');
        response.subscribe(data => {
            this.places = data.results;
            var new_id = this.globals.new_id;
            this.globals.business_list = this.places;
            this.places = this.places.filter(function(item) {       
             return item.business_id === new_id;
           });    
          this.globals.business_discount_count = parseInt(this.places[0].business_discount_count);
          this.globals.availed_discount_count = parseInt(this.places[0].customer_discount_availed_count);
        
        }, error => {
            this.globals.presentToast("Something went wrong check your internet connection.")
    
    
        });
     
    }

  


}

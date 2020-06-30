import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController, AlertController, ModalController, Item } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";
import { FormControl } from '@angular/forms';
import { GlobalVariable } from "../../app/global";
import { ServerProvider } from "../../providers/server/server";
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the MyRewardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-my-rewards',
    templateUrl: 'my-rewards.html',
})
export class MyRewardsPage {
    pointflag: boolean = false;
    punchflag: boolean = false;
    gain_flag: boolean = false;
    points_lotery: any;
    points_Status: any;
    points_reward: any;
    punch_reward: any;
    punchdata: any;
    punch_array: any;
    option: string;
    searchTerm: any = '';
    reward_array: any;
    rewarddata: any;
    flag: boolean = false;
    lotery: any;
    Status: any;
    gain_segment_flag: boolean = false;
    point_segment_flag: boolean = false;
    punchCard_segment_flag: boolean = false;
    gifts_segment_flag: boolean = false;
    arrayStatus: boolean = false;
    coordinates : any; 

    @ViewChild(Content) content: Content;
    public selected = 0;
    public indicator = null;
    mySlideOptions: any;
    data: any;
    reward: any;
    udid: any;
    img: any;
    status: boolean = true;
    time: any;
    searchControl: FormControl;
    business_reward_data:any;
    business_reward_flag:boolean = false;
    redeem_history:boolean = false;
    rewards_length:any;
    point_menu:any;
    point_menu_flag:boolean = false;
    reward_menu:any;
    reward_menu_flag:boolean = false;
    punch_menu:any;
    punch_menu_flag:boolean = false;
    reward_menu_length:any;
    reward_type_home:any;
    cart_reward_view:boolean = false;
    store_points:any;
    image_broken:any;
    // ngAfterViewInit()
    // {
    //     this.indicator = document.getElementById("indicator");
    //     if (this.platform.is('windows'))
    //     {
    //         this.indicator.style.opacity = '0';
    //     }
    // }

    constructor( public modalCtrl:ModalController,private geolocation: Geolocation,private diagnostic: Diagnostic,public modalctrl: ModalController, public server: ServerProvider, public globals: GlobalVariable, private nativeStorage: NativeStorage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
        this.image_broken = this.globals.b_logo;
        this.data = {};

        this.data.response = '';
        this.udid = this.globals.udid;

        //  this.getReward();

        this.img = navParams.get('qrcode');
        this.searchControl = new FormControl();
        

    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad MyRewardsPage');
        this.getLocation();
        if(this.globals.point_check != 'true' && this.globals.punch_check != 'true'){
            this.option = 'gifts';
            this.rewards_items();

        }
        else if(this.globals.point_check != 'true' && this.globals.punch_check == 'true'){
            this.option = 'punch_cards';
            this.punch_items();

        }
        else{
            this.option = 'points';
        }
        this.reward_type_home = this.navParams.get('reward_type_home');
        if(this.reward_type_home && this.reward_type_home == 'punch'){
            this.option = 'punch_cards';
            this.punch_items();

        }
        else if(this.reward_type_home && this.reward_type_home == 'reward'){
            this.option = 'gifts';
            this.rewards_items();
            this.cart_reward_view = true;
        }
       // this.business_reward();
        // this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

        //     this.setFilteredItems();

        // });
    }

    ionViewWillLeave() {
        console.log('leave RewardPage');
        this.status = false;
        clearTimeout(this.time);
    }

    ionViewWillEnter() {

        console.log('enter RewardPage');
        this.status = true;
        this.point_items();
        this.getPoints();
        //this.rewards_items();
        //this.getReward();
       // this.business_reward();

    }
    store_points_fun(){
        this.globals.presentToast("You can avail this discount by adding items in cart.")
    }
    getLocation() {
        // this.diagnostic.isLocationEnabled()
        //     .then((state) => {
        //         console.log(state);
                // if (state) {
                    this.status = false;
                    // console.log("if ", state)
                    this.arrayStatus = false;
                    this.flag = true;

                    if(this.globals.delivery == true){

                    this.geolocation.getCurrentPosition().then((position) => {
                        this.coordinates = position.coords.latitude + "," + position.coords.longitude;
                        this.globals.RewardsPos = this.coordinates;
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
                // } else {
                    
                // }
            // }).catch(e => console.error(e));

    }

    getReward() {

        let loading = this.loadingCtrl.create({
            content: "Loading...",

        });
        loading.present();

        let response = this.server.get_all_Rewards_new();
        response.subscribe(data => {
            this.lotery = data;
            this.rewards_length = this.lotery.length;
            if(this.lotery.length == 0){
                this.gain_flag = true;
            }
            else{
                this.gain_flag = false;
            }
            this.lotery.forEach(element => {
                if(element.redeemed == 'yes'){
                    this.redeem_history = true;
                }
            });
            loading.dismiss();
            
        }, error => {
            loading.dismiss();
        this.globals.presentToast("Something went wrong check your internet connection.")
           

        });

    }
    // setFilteredItems() {
    //     if (this.option == 'gain') {
    //         if (this.lotery) {
    //             this.lotery = this.reward.filter((item) => {
    //                 return item.businessname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    //             });
    //         }
    //     }
    //     else if (this.option == 'punch_cards') {
    //         console.log("usmanpunch",this.punch_array)
    //         this.punchdata = this.punch_array.filter((item) => {
    //                 return item.business_username.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    //             });
            
          
    //         console.log("filtered items", this.punchdata);
    //     }
    //     else if (this.option == 'points') {
    //         this.points_lotery = this.points_reward.filter((item) => {
    //             return item.businessname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    //         });
    //     }
    // }
    SegmentChange() {
        if (this.option == 'gain' && this.gain_segment_flag == false) {
           // this.getReward();
           
            this.gain_segment_flag = true;
        }
        else if (this.option == 'punch_cards' && this.punchCard_segment_flag == false) {
           this.punch_items();
            //this.punchCard_segment_flag = true;
        }
        else if (this.option == 'points' && this.point_segment_flag == false) {
           // this.getPoints();
           
            this.point_segment_flag = true;
        }
        else if (this.option == 'gifts' && this.gifts_segment_flag == false) {
            //this.gifts_segment_flag = true;
            //this.presentModal1();
            //this.getReward();
            this.rewards_items();

        }


    }

    doRefresh(refresher) {
      
        if (this.option == 'gain') {
            //this.getReward();

        }
        else if (this.option == 'punch_cards') {
            this.punch_items();

        }
        else if (this.option == 'points') {
            this.point_items();

        }
        else if (this.option == 'gifts') {
            this.rewards_items();
        }

        this.content.resize();
        refresher.complete();
    }

    getPunchReward() {

        let loading = this.loadingCtrl.create({
            content: "Loading...",

        });

        let response = this.server.GetPunchcards(this.coordinates);
        loading.present();

        response.subscribe(data => {
           // this.globals.circle_graph(this.globals.percent,'circles1',150,20,'#fff');

            this.data.response = data;
            this.punch_reward = this.data.response;
            console.log("mypunch",data);
            loading.dismiss();
            console.log(this.punch_reward.success);

            if (this.punch_reward.success == "No data") {
                this.punchflag = true;

            }

            else {
                this.punchflag = false;
                this.punchdata = this.punch_reward.cards;

                this.punchdata.forEach(element => {
                    if (element.punch_reward_4 != '') {
                        element.lowestreward = element.punch_reward_4;
                        return;

                    }
                    else if (element.punch_reward_8 != '') {
                        element.lowestreward = element.punch_reward_8;
                        return;
                    }
                    else if (element.punch_reward_10 != '') {
                        element.lowestreward = element.punch_reward_10;
                        return;
                    }
                    else if (element.punch_reward_12 != '') {
                        element.lowestreward = element.punch_reward_12;
                        return;
                    }

                });

                this.punch_array = this.punchdata;
                console.log(this.punchdata);

            }
        }, error => {
            console.log("Oooops!");
            loading.dismiss();
            this.globals.presentToast("Something went wrong check your internet connection.")

        });

    }






    getPoints() {

        let response = this.server.getUserPoints(this.coordinates);
        response.subscribe(data => {
           
            if(data.status == "error"){
                this.globals.points_ = 0;
            }
            else{
                this.globals.points_ = Number(data.rewards[0].points);
                this.store_points = data.rewards[0].available_rewards;
            }
        }, error => {
            this.globals.presentToast("Something went wrong check your internet connection.")


        });
    }

    business_reward() {

        let loading = this.loadingCtrl.create({
            content: "Loading...",

        });
        loading.present();

        let response = this.server.get_business_reward();
        response.subscribe(data => {
            loading.dismiss();
            if(data.length > 0 ){
                this.business_reward_data = data;
            }
            else{
                this.business_reward_flag = true;

            }

        }, error => {
            loading.dismiss();
           this.globals.presentToast("Server time out. please try again.")

        });
    }

    rewardredeem(item){
        this.navCtrl.push('PointRewardsPage',{reward_data:item})
    }

    OpenPointsModel(rewards, banner) {
        if (rewards.length == 0) {
            let alert = this.alertCtrl.create({
                title: 'Oops',
                subTitle: 'No Rewards created by Business.',
                buttons: ['OK']
            });
            alert.present();

        }
        else {
            this.navCtrl.push('PointsModelPage', { point_reward: rewards, banner: banner })
        }
    }

    detailPunch(punched_icon_image, business_username, punch_count, punch_limit, punch_qr, udid, punched_image, date, lowestreward) {
        this.navCtrl.push('PunchDetailPage', { punched_icon_image: punched_icon_image, business_username: business_username, punch_count: punch_count, punch_limit: punch_limit, punch_qr: punch_qr, udid: udid, punch_image: punched_image, Date: date, reward: lowestreward })

    }

    point_items() {
        let loading = this.loadingCtrl.create({
            content: "Loading...",

        });
        loading.present();
        let response = this.server.getpoints_menuitems();
        response.subscribe(data => {          
            loading.dismiss();
            if(data.status == true){
                this.point_menu = data.items;
                console.log("Point menu", this.point_menu);
                this.point_menu.forEach(subelement => {
                     subelement.quantity = 1;
 
                 });
                 if (this.point_menu.length == 0) {
                    this.point_menu_flag = true;
                }
                else{
                    this.point_menu_flag = false;
                }
            }
            else{
                this.point_menu_flag = true;
            }
            
          
        }
            , error => {
                loading.dismiss();
                this.globals.presentToast("Something went wrong check your internet connection.")
            });
    }

    Detail(id, image, freeextras,reward_id) {
        this.navCtrl.push('ItemDetailPage', { type:true,item_id: id, image: image, BusinesId: this.globals.new_id, free_extras: freeextras ,reward_flag:true,reward_id:reward_id})
    }

    redeem_point_menu_item(id,type){
        let loading = this.loadingCtrl.create({
            content: "Loading...",

        });
        loading.present();
        let response = this.server.redeem_point_menu_reward(id,type);
            response.subscribe(data => {          
                loading.dismiss();
                if(data.status == true){
                    this.globals.presentToast(data.message);
                    this.getPoints();
                    this.punch_items();
                }
                else{
                    this.globals.presentToast(data.message)
                }
                
            
            }
            , error => {
                loading.dismiss();
                this.globals.presentToast("Something went wrong check your internet connection.")
            });
    }

    punch_model(rewards){
        let modal = this.modalCtrl.create('PointPunchModelPage', { title: "Punch Detail",terms:rewards.terms,tagline:rewards.punch_description, udid:rewards.id, name:rewards.name, image: rewards.image, punch_count: rewards.punch_count, punch_limit: rewards.punch_limit});
        modal.present();
    }

    point_model(a){
        let modal = this.modalCtrl.create('PointPunchModelPage', { title: "Point Detail",terms:a.terms, image: a.image, name: a.name, tagline: a.points_description});
        modal.present();
    }

    presentModal1() {
       
        let modal = this.modalCtrl.create('ModalPage');
        modal.present();
  }

    rewards_items() {
        let loading = this.loadingCtrl.create({
            content: "Loading...",

        });
        loading.present();
        let response = this.server.getrewards_menuitems();
        response.subscribe(data => {          
            loading.dismiss();
            if(data.status == true){
                this.reward_menu = data.items;
                this.reward_menu_length = this.reward_menu.length;
                this.reward_menu.forEach(subelement => {
                     subelement.quantity = 1;
 
                 });
                 if (this.reward_menu.length == 0) {
                    this.reward_menu_flag = true;
                }
                else{
                    this.reward_menu_flag = false;
                }
            }
            else{
                this.reward_menu_flag = true;
            }
            
          
        }
            , error => {
                loading.dismiss();
                this.globals.presentToast("Something went wrong check your internet connection.")
            });
    }

    punch_items() {
        let loading = this.loadingCtrl.create({
            content: "Loading...",

        });
        loading.present();
        let response = this.server.getpunches_menuitems();
        response.subscribe(data => {       
            //this.globals.circle_graph(this.globals.percent,'circles1',150,20,'#fff');

            loading.dismiss();
            if(data.status == true){

                this.punch_menu = data.items;
                if(this.punch_menu.length == 0){
                    this.punch_menu_flag = true;
                }
                else{
                    this.punch_menu_flag = false;

                }
                console.log("Punches ", this.punch_menu);
                var i=0;
                var percent =0;
                var that  = this;
                setTimeout(function(){ 
                    that.punch_menu.forEach(element => {
                        percent = (Number(element.punch_count) / Number(element.punch_limit))*100;
                       that.globals.circle_graph(percent,'circles'+i,55,8,'#ccc');
   
                       console.log(percent,'circles'+i)
                       i++;
    
                    });
                 }, 1200);
                
            }
           
        }
        , error => {
            loading.dismiss();
            this.globals.presentToast("Something went wrong check your internet connection.")
        });
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
            this.navCtrl.push('CartPage');
        }
    }

    points_buy_Confirm(id,type) {
        let alert = this.alertCtrl.create({
          title: 'Purchase Item',
          message: 'Are you sure.You want to purchase item by points?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Buy',
              handler: () => {
                console.log('Buy clicked');
                this.redeem_point_menu_item(id,type);
              }
            }
          ]
        });
        alert.present();
      }

      changeSource(event, name) { event.target.src = this.globals.b_logo; }

}

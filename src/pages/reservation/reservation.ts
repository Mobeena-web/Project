import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, App, AlertController, LoadingController, Content } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ServerProvider } from '../../providers/server/server';
import { NativeStorage } from '@ionic-native/native-storage';
import { GlobalVariable } from '../../app/global';
import { FormControl } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-reservation',
    templateUrl: 'reservation.html',
})
export class ReservationPage {
    reservations: any;
    @ViewChild(Content) content: Content;
    coordinates: string;
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

    //  private subscription: Subscription;

    time: any;
    orderdata: any;
    // data: any;
    tick: number;
    value: any = 3600;
    ordersListFlag: boolean = false;
    orderPlacedFlag: boolean = false;
    items = [];

    constructor(public toastCtrl: ToastController, private diagnostic: Diagnostic, public server: ServerProvider, public nativeStorage: NativeStorage, public events: Events, private app: App, public globals: GlobalVariable, public alertCtrl: AlertController, private geolocation: Geolocation, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {


        this.textdisocunt = navParams.get('discount_text');
        this.searchControl = new FormControl();
        this.radius = navParams.data;
        this.option = 'restaurants';

        // events.subscribe('Radius1', (radius) => {
        //     this.radius = radius;
        // this.list();
        // });
        this.getLocation();
        this.getReservations();


    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad ReservationPage');
    }


    getLocation() {
        this.arrayStatus = false;
        this.flag = true;
        this.geolocation.getCurrentPosition().then((position) => {
            this.coordinates = position.coords.latitude + "," + position.coords.longitude;
            this.list();

        }, (err) => {
            console.log(err);

        });

    }

    OrderCategory(orders_enabled, businessId, paypalId, discountvalue, stripeId, hours, min, time, deliveryFee, tax, delivery, pickup, admin_stripe) {
        console.log("id", businessId);
        this.globals.bussinessId = businessId;
        console.log(this.globals.bussinessId);
        this.globals.paypalId = paypalId;
        console.log("businessdiscount", this.globals.BusinessDiscount);
        this.globals.estimated_time = time;
        this.globals.StripId = stripeId;
        this.globals.Timing = hours;
        this.globals.tax = tax;
        this.globals.deliveryCharges = deliveryFee;
        this.globals.admin_stripe = admin_stripe;
        console.log(this.globals.admin_stripe);
        console.log(delivery, pickup, this.globals.delivery, this.globals.pickup);
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

        this.navCtrl.push('ReservationCheckingPage', { ordersEnabled: orders_enabled });
    }


    doInfinite(): Promise<any> {
        console.log('Begin async operation');
        this.offset += 10;
        return new Promise((resolve, enable) => {
            let response = this.server.getRestaurantslist(this.radius, 'branches', this.coordinates, this.offset, 'reservation');


            response.subscribe(data => {

                if (data.status == 'true') {

                    data.results.forEach(element => {
                        this.places.push(element);
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
                    }
                    this.flag = false;
                    this.content.resize();
                }
                else {
                    this.presentToast();
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






    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Showing all data.',
            duration: 3000
        });
        toast.present();
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
                console.log(data);

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
            console.log("else", this.searchTerm);

            this.offset = 0;
            let response = this.server.getRestaurantslist(this.radius, 'main', this.coordinates, this.offset.toString(), 'reservation');

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



    list() {

        //  this.diagnostic.isLocationEnabled()
        //   .then((state) => {
        //  console.log(state);
        //    if (state){
        // this.status = false;
        // console.log("if ",state)


        //  this.arrayStatus = false;
        //     this.flag = true;
        // this.geolocation.getCurrentPosition().then((position)=>{

        //     this.coordinates = position.coords.latitude+","+position.coords.longitude
        console.log(this.radius, this.coordinates);

        let response = this.server.getRestaurantslist(this.radius, 'main', this.coordinates, this.offset.toString(), 'reservation');

        response.subscribe(data => {
            this.places = data.results;
            console.log("mobilecheck", this.mobileFlagcheck)

            console.log(this.places);

            if (typeof this.places.success != 'undefined' && this.places.success == 'No data') {
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


        // },(err)=>{
        //     console.log(err);

        // });



        // } else {
        //         this.status = true;
        //   let alert = this.alertCtrl.create({
        //     title: 'Location is disabled',
        //     subTitle: 'In order to proceed, Please enable your location',
        //     buttons: ['OK']
        //  });

        //     alert.present();
        //   }
        //  }).catch(e => console.error(e));


    }
    Reviews(data) {

        // let modal = this.modalCtrl.create('ReviewsPage', { place: data});
        // modal.present();
        this.navCtrl.push('ReviewsPage', { place: data })
    }
    getReservations() {

        let res = this.server.getReservations()
            .subscribe(data => {
                console.log(data);

                if (data.status == 'true') {
                    this.reservations = data.reservation;
                    console.log(this.reservations);

                }

            }, error => {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Server times out, please try again',
                    buttons: ['OK']
                });
                alert.present();
            });

    }

    doRefresh(refresher) {
        this.offset = 0;
        this.getLocation();
        this.content.resize();
        refresher.complete();
    }

    doRefresh1(refresher) {
        this.offset = 0;
        this.getReservations();
        this.content.resize();
        refresher.complete();
    }

    ShowNotes(order){
        if(order.notes != '')
        {
            let alert = this.alertCtrl.create({
                title: 'Notes',
                subTitle: order.notes,
                buttons: ['Okay']
            });
            alert.present();
        }
        else{
            let alert = this.alertCtrl.create({
                title: 'Oops',
                subTitle: 'No Notes given.',
                buttons: ['Okay']
            });
            alert.present();
        }
    }
}

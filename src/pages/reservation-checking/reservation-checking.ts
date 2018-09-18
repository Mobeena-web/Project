import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { GlobalVariable } from '../../app/global';

/**
 * Generated class for the ReservationCheckingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-reservation-checking',
    templateUrl: 'reservation-checking.html',
})
export class ReservationCheckingPage {
    reservation_id: any;
    ordersEnabled: any;
    value: string;
    min: any;
    hours: any;
    day: any;
    year: any;
    month: any;
    datenow: any;
    date: any;
    myDate: any;
    customers: any = 1;
    no_of_people_array: any = new Array();
    notes: any = '';
    constructor(public global: GlobalVariable, public server: ServerProvider, public loadingctrl: LoadingController, public alertctrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
        this.ordersEnabled = navParams.get('ordersEnabled');

        this.date = new Date();
        this.datenow = this.date.getDate();
        this.month = this.date.getMonth() + 1;
        console.log(this.date, this.month);
        this.year = this.date.getFullYear();
        this.month = this.month.toString();
        this.day = this.date.getDay();
        this.datenow = this.datenow.toString();
        this.hours = this.date.getHours();
        this.min = this.date.getMinutes();
        console.log(this.hours, this.min);
        if (this.month.length == 1) {
            this.month = "0" + this.month;
        }
        if (this.datenow.length == 1) {
            this.datenow = "0" + this.datenow;
        }
        console.log("month", this.year, this.month, this.datenow);

        this.value = this.year + "-" + this.month + "-" + this.datenow;
        this.value.toString();

        var date = new Date()
        var date1 = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();

        console.log("offset", this.date.getTimezoneOffset);

        this.myDate = date1;


        for (let i = 2; i <= 100; i++) {
            this.no_of_people_array.push(i);
        }
        console.log(this.no_of_people_array);

    }



    ionViewDidLoad() {
        console.log('ionViewDidLoad ReservationCheckingPage');
    }

    checkReservation() {
        console.log(this.notes, "notes");


        let loading = this.loadingctrl.create({
            content: "loading...",
        });
        loading.present();
        let res = this.server.ReservationChecking(this.customers, this.myDate)
            .subscribe(data => {
                loading.dismiss();
                if (data.status == 'true') {
                    this.prompt();

                }
                else {
                    let alert = this.alertctrl.create({
                        title: 'Oops',
                        subTitle: 'Sorry,reservation not available,please try again later.',
                        buttons: ['Okay']
                    });
                    alert.present();


                }
            }, error => {
                let alert = this.alertctrl.create({
                    title: 'Error',
                    subTitle: 'Server times out, please try again.',
                    buttons: ['OK']
                });
                alert.present();
            })

    }


    prompt() {

        let prompt = this.alertctrl.create({
            title: 'Available',
            message: "Reservation is available. Do you want to confirm your reservation?",
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
                        this.placeReservation();

                    }
                }
            ]
        });
        prompt.present();
    }


    placeReservation() {


        let loading = this.loadingctrl.create({
            content: "loading...",
        });
        loading.present();
        let res = this.server.AddReservation(this.customers, this.myDate, this.notes)
            .subscribe(data => {
                loading.dismiss();
                if (data.status == 'true') {
                    console.log("resevration data", data);
                    this.reservation_id = data.reservation_id;
                    console.log("local reservation_id", this.reservation_id);



                    let prompt = this.alertctrl.create({
                        title: 'Congratulations',
                        message: "Your reservation has been sucessfully placed.",
                        buttons: [
                            {
                                text: 'Okay',
                                handler: data => {

                                    console.log('OK clicked');

                                    if (this.ordersEnabled == 'active') {



                                        this.AskToOrder();
                                    }
                                }
                            }
                        ]
                    });
                    prompt.present();


                }
                else {
                    let alert = this.alertctrl.create({
                        title: 'Oops',
                        subTitle: 'Something went wrong please try again.',
                        buttons: ['Okay']
                    });
                    alert.present();


                }
            }, error => {
                let alert = this.alertctrl.create({
                    title: 'Error',
                    subTitle: 'Server times out, please try again',
                    buttons: ['Okay']
                });
                alert.present();
            })

    }

    AskToOrder() {
        let prompt = this.alertctrl.create({
            title: 'Place Order',
            message: "Do you want to order as well?",
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
                        this.global.reservation_id = this.reservation_id;
                        this.global.type = 'reservation';
                        console.log("reservation_id", this.global.reservation_id);

                        this.navCtrl.push('CategoryPage');

                    }
                }
            ]
        });


        setTimeout(function () {
            prompt.present();
        }, 500);

    }
}





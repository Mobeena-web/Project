
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, Content, Slides } from 'ionic-angular';
import { Http } from '@angular/http';
import { AddReviewPage } from "../add-review/add-review";
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { GlobalVariable } from "../../app/global";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { ServerProvider } from "../../providers/server/server";
/**  
 * Generated class for the DescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-description',
    templateUrl: 'description.html',
})
export class DescriptionPage {
    longitude: any;
    latitude: any;

    Hours: any;
    slideflag: boolean;
    website: any;
    @ViewChild(Content) content: Content;
    @ViewChild(Slides) slides: Slides;
    time: void;
    day: any;
    date: any;
    opening_hours: any[];
    rating: any;
    length: any;
    description: any;
    address: any;
    email: any;
    image: any;


    placeName: any;
    data: any;
    details: any;
    name: any;
    reviewData: any;
    phone: any;
    point: any;
    text: any;
    array: any[] = new Array();
    Week: string[] = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    hours: any[] = new Array(
        '12:00 AM',

        '01:00 AM',

        '02:00 AM',

        '03:00 AM',

        '04:00 AM',

        '05:00 AM',

        '06:00 AM',

        '07:00 AM',

        '08:00 AM',

        '09:00 AM',

        '10:00 AM',

        '11:00 AM',

        '12:00 PM',

        '01:00 PM',

        '02:00 PM',

        '03:00 PM',

        '04:00 PM',

        '05:00 PM',

        '06:00 PM',

        '07:00 PM',

        '08:00 PM',

        '09:00 PM',

        '10:00 PM',

        '11:00 PM',

        '12:00 AM');
    constructor(public server: ServerProvider, private iab: InAppBrowser, public globals: GlobalVariable, public alertCtrl: AlertController, private emailComposer: EmailComposer, private callNumber: CallNumber, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public http: Http, public navCtrl: NavController, public navParams: NavParams) {

        this.placeName = navParams.get('details');
        this.point = navParams.get('location');
        this.text = navParams.get('offerText');
        this.rating = navParams.get('average_rating');


        this.convertTo12hourFormat();

        this.date = new Date();

        this.day = this.date.getDay();
        // this.day = 1;
        this.time = this.date.getHours();
        console.log(this.date.getDay(), this.time);


        this.http = http;
        this.data = {};
        this.data.response = '';
        this.Description();



    }
    Business_location() {
        this.navCtrl.push('BusinessLocationPage', { latitude: this.latitude, longitude: this.longitude, name: this.name });

    }

    convertTo12hourFormat() {
        this.Hours = this.navParams.get('openinghours');
        console.log("openinghours", this.Hours);

        if (this.Hours != null) {
            this.opening_hours = this.Hours.map(item => Object.assign([], item));

            console.log("clone", this.opening_hours);
            this.opening_hours.forEach(element => {
                if (element[0].includes(".")) {
                    var i = element[0].indexOf(".");
                    var t = element[0].substr(0, i);

                    var k = this.hours[t];
                    console.log("k", k);
                    element[0] = this.replaceAt(k, 3, "3")

                }
                else if (element[0] == "closed") {
                    element[0] = "Closed";
                }
                else if (element[0] == "opened") {
                    element[0] = "Opened";
                }
                else {
                    element[0] = this.hours[element[0]]
                    console.log(element[0])
                }
                if (element[1].includes(".")) {

                    var i = element[1].indexOf(".");
                    var t = element[1].substr(0, i);
                    var k = this.hours[t];
                    console.log("k2", k);
                    element[1] = this.replaceAt(k, 3, "3")
                    console.log(element[1]);
                }
                else if (element[1] == "closed") {
                    element[1] = "Closed";
                }
                else if (element[1] == "opened") {
                    element[1] = "Opened";
                }

                else {
                    element[1] = this.hours[element[1]];
                    console.log(element[1]);
                }

            });
            console.log(this.Hours, this.opening_hours);
            this.slideflag = true;
        }
    }
    replaceAt(string, index, replace) {
        return string.substring(0, index) + replace + string.substring(index + 1);
    }


    Description() {

        let response = this.server.BusinessInformation(this.placeName);
        let loading = this.loadingCtrl.create({
            content: "loading...",
        });
        loading.present();

        response.subscribe(data => {
            this.data.response = data;

            loading.dismiss();
            this.details = this.data.response;
            //     console.log(this.details.info);
            //    console.log(this.details.reviews);
            //   console.log(this.details.info.phone);
            // console.log(this.details.info.name);
            this.name = this.details.info.name;
            this.image = this.details.info.image;
            this.phone = this.details.info.phone;
            this.email = this.details.info.email;
            this.description = this.details.info.description;
            this.address = this.details.info.main_branch_address;
            this.website = this.details.info.website;
            this.reviewData = this.details.reviews;
            this.latitude = Number(this.details.info.latitude);
            this.longitude = Number(this.details.info.longitude);

            console.log(this.latitude, this.longitude);
            console.log(this.details.info.latitude, this.details.info.longitude);



            this.length = this.reviewData.length;

            this.slideChanged();
            console.log("length", this.length);

        }, error => {
            console.log("Oooops!");

            loading.dismiss();
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Server times out,please try again',
                buttons: ['Okay']
            });
            alert.present();
        });
    }




    ionViewDidLoad() {
        console.log('ionViewDidLoad DescriptionPage');


    }

    slideChanged() {
        if (this.Hours != null) {
            console.log(this.day);
            this.slides.slideTo(this.day + 2, 1000);
        }
    }
    call(number) {

        this.callNumber.callNumber(number, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }




    addReview() {

          let modal = this.modalCtrl.create('AddReviewPage', { place: this.placeName});
          modal.present();
        // this.navCtrl.push('AddReviewPage', { place: this.placeName });
    }

    Email(address) {

        this.emailComposer.isAvailable().then((available: boolean) => {
            if (available) {
                //Now we know we can send
            }
        });

        let email = {
            to: address,

            subject: '',
            body: '',
            isHtml: true
        };

        // Send a text message using default options
        this.emailComposer.open(email);

    }

    WebsiteLink(link) {

        console.log(link);

        this.iab.create("http://" + link);
        //const browser = this.iab.create('https://ionicframework.com/','_blank');



    }

}

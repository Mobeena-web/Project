import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { GlobalVariable } from '../../app/global';
import { HomePage } from '../home/home';
/**
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-reviews',
    templateUrl: 'reviews.html',
})
export class ReviewsPage {
    name: any;
    length: any;
    placeName: any;
    data: any;
    details: any;
    reviewData: any;

    constructor(public server: ServerProvider, public globals: GlobalVariable, public modalCtrl: ModalController, public viewCtrl: ViewController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
        this.placeName = navParams.get('place');
        this.reviewdata()
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ReviewsPage');
    }

    goToback() {
        this.navCtrl.setRoot(HomePage)
    }

    reviewdata() {
        let response = this.server.BusinessInformation(this.globals.business_username);
        let loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();

        response.subscribe(data => {
            this.data = data;
            loading.dismiss();
            this.details = this.data;
            this.name = this.details.info.name;
            this.reviewData = this.details.reviews;
            this.length = this.reviewData.length
        }, error => {
            loading.dismiss();
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Server times out,please try again',
                buttons: ['OK']
            });
            alert.present();
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    addReview() {
        let modal = this.modalCtrl.create('AddReviewPage', { place: this.globals.business_username });
        modal.onDidDismiss(data => {
            this.navCtrl.pop();
        });
        modal.present();

    }



}

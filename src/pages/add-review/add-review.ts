import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NativeStorage } from "@ionic-native/native-storage";
import { GlobalVariable } from "../../app/global";
import { ServerProvider } from "../../providers/server/server";
import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the AddReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-review',
    templateUrl: 'add-review.html',
})
export class AddReviewPage {
    index1: any = 0;
    array2: any[] = new Array();
    visible: boolean = false;
    data: any;
    user_email: any;
    title: any;
    description: any;
    rating: any;
    bussiness: any;
    submitAttempt: boolean = false;
    ReviewForm: FormGroup;
    array: any[] = new Array();

    constructor(public server: ServerProvider, public globals: GlobalVariable, private nativeStorage: NativeStorage, public formBilder: FormBuilder, public http: Http, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {

        this.ReviewForm = formBilder.group({
            description: ['', Validators.compose([Validators.required])]
        })

        this.bussiness = navParams.get('place');
        this.data = {};
        this.data.response = '';
        this.http = http;
        this.array.length = 5;
    }

    ionViewDidLoad() {
    }

    save(ReviewData: any) {
        if (!this.ReviewForm.valid || this.index1 == '0') {
            this.submitAttempt = true;
        } else {
            this.submitAttempt = false;
            this.nativeStorage.getItem('user').then(data => {
                this.user_email = data.email;

                let loading = this.loadingCtrl.create({
                    content: "Loading...",
                });
                loading.present();

                let response = this.server.AddUserReview(this.user_email, ReviewData, this.index1, this.bussiness)
                response.subscribe(data => {
                    this.data.response = data;

                    loading.dismiss();
                    this.viewCtrl.dismiss();
                }, error => {
                    loading.dismiss();
                    let alert = this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'Please try again',
                        buttons: ['OK']
                    });
                    alert.present();
                });
            }).catch(err => console.log);
        }
    }

    close() {
        this.viewCtrl.dismiss();
    }

    changeStar(index) {
        if (!this.visible) {
            this.index1 = index + 1;
            this.visible = true;
        } else {
            this.visible = false;
            this.index1 = index + 1;
            this.visible = true;
        }
    }
}

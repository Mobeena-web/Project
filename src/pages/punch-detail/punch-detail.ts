import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PunchDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-punch-detail',
    templateUrl: 'punch-detail.html',
})
export class PunchDetailPage {
    lowestReward: any;

    punched_image: any;
    punched_icon_image: any;
    punch_qr: any;
    business_username: any;
    udid: any;
    punch_count: any;
    punch_limit: any;
    date: any;
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        this.punched_image = navParams.get('punch_image');
        this.punch_qr = navParams.get('punch_qr');
        this.punched_icon_image = navParams.get('punched_icon_image');
        this.business_username = navParams.get('business_username');
        this.udid = navParams.get('udid');
        this.punch_count = navParams.get('punch_count');
        console.log("udid", this.udid);
        this.punch_limit = navParams.get('punch_limit');
        this.date = navParams.get('Date');
        this.lowestReward = navParams.get('reward');


        this.punch_count = this.punch_count.toString();

        console.log(this.punch_count.length, "le");
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PunchDetailPage');
    }

    createRange(number) {
        var items: number[] = [];
        for (var i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    }
    createRange2(total, number) {
        let number1 = total - number;
        var items: number[] = [];
        for (var i = 1; i <= number1; i++) {
            items.push(i);
        }
        return items;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

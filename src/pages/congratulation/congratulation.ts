import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, ModalController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { NativeStorage } from '@ionic-native/native-storage';
/**
 * Generated class for the CongratulationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-congratulation',
    templateUrl: 'congratulation.html',
})
export class CongratulationPage {
    bid: any;
    string: any;
    isnumber: boolean;
    lottery: any;
    logo: any;
    reward_length: any;
    public n: number = 1;
    public n1: number = 1;
    public n2: number = 1;
    public value: number = 0;
    public value1: number = 1;
    public value2: number = 0;
    status: boolean = false;
    reward_amount: any;
    reward_status: any;
    reward_place: any;
    reward_char_array: any[];
    business_array: any = new Array();

    constructor(public modalCtrl: ModalController,public nativeStorage: NativeStorage, private nativeAudio: NativeAudio, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
        console.log('hello');
        this.reward_amount = navParams.get('reward');
        this.reward_status = navParams.get('status');
        this.reward_place = navParams.get('place');
        this.logo = navParams.get('Logo');
        this.lottery = navParams.get('lottery_image');
        this.string = navParams.get('RewardString');
        this.bid = navParams.get('id');

        console.log("lotteryimage", this.lottery);
        console.log(this.reward_amount);
        console.log(this.reward_place);

        this.reward_amount = this.reward_amount.toString();
        console.log("length", this.reward_amount.length);
        this.reward_length = this.reward_amount.length;

        if (this.string == 'null') {

            this.isnumber = true;
        }
        else {
            this.isnumber = false;
        }


        console.log("isnumber", this.isnumber)

        this.nativeAudio.play('spinner');


        var that = this;
        setTimeout(function () {
            that.status = true;
            if(that.reward_status == 'lose' || that.reward_status == 'error'){
                that.nativeAudio.play('failure');
            }
            else{
                that.nativeAudio.play('success');
            }
        }, 9000);

        console.log(that.status);

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CongratulationPage');
        console.log(this.reward_amount);


    }

    dismiss() {
        this.viewCtrl.dismiss();
        console.log(this.bid);

        this.nativeStorage.getItem('BusinessFirstimeFlag')
            .then(data => {
                this.business_array = data.array;
                console.log(data.array);

                if (data.array.indexOf(this.bid) == -1) {
                    console.log(this.bid, "bid");

                    this.business_array.push(this.bid)
                    this.nativeStorage.setItem('BusinessFirstimeFlag',
                        {
                            array: this.business_array

                        }).then(() => {
                            let modal = this.modalCtrl.create('AddReviewPage', { place: this.bid});
                             modal.present();
                        })
                        .catch((err) => { console.log("nativesstorage", err) });

                }

            }, error => {
                //we don't have the user data 
                console.log("no data");

                this.business_array.push(this.bid)
                this.nativeStorage.setItem('BusinessFirstimeFlag',
                    {
                        array: this.business_array

                    }).then(() => {
                        // this.navCtrl.push('AddReviewPage', { place: this.bid });
                        let modal = this.modalCtrl.create('AddReviewPage', { place: this.bid});
                        modal.present();

                    })
                    .catch((err) => { console.log("nativesstorage", err) });

            }).catch(err => { console.log(err) });



    }

}

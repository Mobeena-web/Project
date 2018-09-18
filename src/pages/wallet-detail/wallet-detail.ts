import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Platform, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http } from "@angular/http";
import { GlobalVariable } from "../../app/global";
import { Crop } from '@ionic-native/crop';
import { ServerProvider } from "../../providers/server/server";
/**
 * Generated class for the WalletDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-wallet-detail',
    templateUrl: 'wallet-detail.html',
})
export class WalletDetailPage {
    EditFlag: any;
    category: any;
    BackImageFlag: boolean;
    backImage: any;
    FrontImageFlag: boolean;
    frontImage: any;
    submitAttempt: boolean;
    response: any;
    WalletForm: FormGroup;

    constructor(public server: ServerProvider, private app: App, private crop: Crop, public platform: Platform, public http: Http, public alert: AlertController, public loading: LoadingController, public global: GlobalVariable, public hhtp: Http, private camera: Camera, public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder) {
        this.category = this.navParams.get('name');
        console.log(this.category);
        this.WalletForm = formbuilder.group({

            cardName: ['', Validators.compose([Validators.required])],
            cardNumber: [''],
            expDate: [''],
            notes: [''],
        });



    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WalletDetailPage');
        if (this.platform.is('ios')) {

            this.EditFlag = false;
        }
        else if (this.platform.is('android')) {
            this.EditFlag = true;

        }
    }

    WalletSave(walletdata) {

        if (!this.WalletForm.valid) {
            console.log("fields empty")
            this.submitAttempt = true;
        }
        else {

            if (this.FrontImageFlag && this.BackImageFlag) {
                console.log("request");
                let Loading = this.loading.create({
                    content: "Loading..."
                });
                Loading.present();

                let response = this.server.SendWalletDataToServer(walletdata, this.category, this.frontImage, this.backImage);
                response.subscribe(data => {
                    var Data = data;
                    console.log(Data);
                    Loading.dismiss();
                    if (Data.status == 'true') {
                        let alert1 = this.alert.create({
                            title: 'Congratulation',
                            subTitle: Data.message,
                            buttons: ['Okay']
                        });

                        this.app.getRootNav().push('WalletListPage');
                        alert1.present();
                    }

                }, error => {
                    console.log(error);
                });
            }
            else {
                let alert = this.alert.create({
                    title: 'Oops',
                    subTitle: 'Please take front back image of the card',
                    buttons: ['Okay']
                });
                alert.present();
            }
        }
    }

    addFrontPicture() {

        const options: CameraOptions = {
            quality: 20,
            targetWidth: 350,
            targetHeight: 300,
            allowEdit: false,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.ALLMEDIA
        }

        this.camera.getPicture(options).then((imageData) => {

            this.crop.crop(imageData, { quality: 25 })
                .then(

                    newImage => {
                        console.log('new image path is: ' + newImage);
                        var flag = true;
                        this.toDataUrl(newImage, flag)



                        // console.log("frontimage",this.frontImage);

                    },
                    error => console.error('Error cropping image', error)
                );





            //  console.log("image",this.frontImage);
        }, (err) => {
            console.log(err);

        });

    }
    toDataUrl(url, flag) {

        var xhr = new XMLHttpRequest();
        let loading = this.loading.create({
            content: "Please wait..."
        });
        let env = this;

        xhr.onload = function () {
            loading.present();
            var reader = new FileReader();
            reader.onloadend = function () {
                //  console.log(reader.result,"result");
                if (flag == true) {
                    env.frontImage = reader.result;
                    env.FrontImageFlag = true;
                }
                else {
                    env.backImage = reader.result;
                    env.BackImageFlag = true;
                }


            }

            reader.readAsDataURL(xhr.response);
            loading.dismiss();
        };
        xhr.open('GET', url)
        xhr.responseType = 'blob';
        xhr.send();
    }



    addBackPicture() {
        const options: CameraOptions = {
            quality: 20,
            targetWidth: 350,
            targetHeight: 300,
            allowEdit: false,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.ALLMEDIA
        }
        this.camera.getPicture(options).then((imageData) => {

            this.crop.crop(imageData, { quality: 25 })
                .then(
                    newImage => {
                        console.log("crop");
                        console.log('new image path is: ' + newImage);

                        var flag = false
                        this.toDataUrl(newImage, flag);

                        // console.log("backimage",this.backImage);


                    },
                    error => console.error('Error cropping image', error)
                );





            //  console.log("image",this.frontImage);
        }, (err) => {
            console.log(err);

        });
    }
}

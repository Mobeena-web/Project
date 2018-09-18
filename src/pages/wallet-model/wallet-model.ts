import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, App } from 'ionic-angular';
import { GlobalVariable } from "../../app/global";
import { Http } from "@angular/http";
import { HomePage } from "../home/home";
import { ServerProvider } from "../../providers/server/server";

/**
 * Generated class for the WalletModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-wallet-model',
    templateUrl: 'wallet-model.html',
})
export class WalletModelPage {
    data: any;
    wallet: any;


    constructor(public server: ServerProvider, private app: App, public alertctrl: AlertController, public http: Http, public global: GlobalVariable, public viewctrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {

        this.wallet = navParams.get('walletData');
        console.log(this.wallet);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WalletModelPage');
    }

    close() {
        this.viewctrl.dismiss();
    }
    deleteAlert() {
        let alert = this.alertctrl.create({
            title: "Alert",
            message: "Are you sure you want to delete this wallet card?",
            buttons: [
                {
                    text: 'Yes',
                    handler: data => {
                        this.delete();
                    }

                },
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('cancel clicked.');

                    }

                }

            ]
        });
        alert.present();

    }
    delete() {

        var link = this.global.BaseUrl + "Customer_controller/wallet_delete";
        var data = JSON.stringify({ wallet_id: this.wallet.wallet_id });
        let response = this.server.DeleteUserWallet(this.wallet.wallet_id);
        response.subscribe(data => {

            this.data = data;
            console.log(this.data)
            if (this.data.status == 'true') {
                let alert = this.alertctrl.create({
                    title: "Alert",
                    message: "Wallet successfully deleted",
                    buttons: [
                        {
                            text: 'OK',
                            handler: data => {
                                this.viewctrl.dismiss();
                                this.app.getRootNav().push('WalletListPage');
                            }
                        }]
                });

                alert.present();
            }


        }, (error) => { console.log(error) });

    }
}

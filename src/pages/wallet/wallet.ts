import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { GlobalVariable } from '../../app/global';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-wallet',
    templateUrl: 'wallet.html',
})
export class WalletPage {
    walletCategoriesList: any;


    constructor(public server: ServerProvider, public modalCtrl: ModalController, public global: GlobalVariable, public loadingctrl: LoadingController, public alertctrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {



        this.WalletCategories();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WalletPage');
    }

    WalletDetail(Cname) {
        this.navCtrl.push('WalletDetailPage', { name: Cname });
    }


    WalletCategories() {

        let loading = this.loadingctrl.create({
            content: "loading..."
        });
        loading.present();
        let response = this.server.GetWalletCategories();

        response.subscribe(data => {
            this.walletCategoriesList = data;
            loading.dismiss();
            console.log(this.walletCategoriesList);
        }, error => {
            console.log(error)
        });


    }
}

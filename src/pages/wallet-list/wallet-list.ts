import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController, App, Tabs, Content } from 'ionic-angular';
import { ServerProvider } from "../../providers/server/server";
import { NativeStorage } from '@ionic-native/native-storage';
import { GlobalVariable } from '../../app/global';
import { PinDialog } from '@ionic-native/pin-dialog';
import { MainTabsPage } from '../main-tabs/main-tabs';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the WalletListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-wallet-list',
    templateUrl: 'wallet-list.html',
})
export class WalletListPage {
    cancelFlag: boolean = false;
    @ViewChild('myTabs') tabRef: Tabs;
    @ViewChild(Content) content: Content;
    NothingInWallet: boolean;

    lockWallet: any;
    walletFlag: boolean;
    walletdata: any;
    walletList: any;

    constructor(public pinDialog: PinDialog, public app: App, public server: ServerProvider, public nativeStorage: NativeStorage, public loadingctrl: LoadingController, public modal: ModalController, public alert: AlertController, public global: GlobalVariable, public navCtrl: NavController, public navParams: NavParams) {


        this.getWalletList();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WalletListPage');

    }
    ionViewDidEnter() {
        this.global.homePageFlag = false;

        // let nav = this.app.getRootNav(); 
        //   nav.setRoot(MainTabsPage, {tabIndex: 0});
        this.cancelFlag = false;
        this.nativeStorage.getItem('walletlock').then(data => {
            console.log("walletlock", data);
            this.global.WallletLock = data.walletCheck;
            console.log("nativewalletlock", data.walletCheck);
            console.log("walletlock", this.global.WallletLock);
            if (this.global.WallletLock == true) {
                this.nativeStorage.getItem('lock').then(data => {

                    this.global.code = atob(data.walletCode);
                    this.pinDialog.prompt('Enter your PIN', 'Verify PIN', ['Cancel', 'Okay'])
                        .then(
                            (result: any) => {
                                if (result.buttonIndex == 2) {
                                    console.log('User clicked OK, value is: ', result.input1);
                                    if (this.global.code == result.input1) {
                                        //this.navCtrl.push('WalletListPage');
                                        this.cancelFlag = false;
                                    }
                                    else {

                                        let alert1 = this.alert.create({
                                            title: "Oops",
                                            subTitle: "Invalid PIN",
                                            buttons: [
                                                {
                                                    text: 'Okay',
                                                    role: 'Okay',
                                                    handler: () => {

                                                        let nav = this.app.getRootNav();
                                                        // nav.setRoot(MainTabsPage, { tabIndex: 0 });
                                                         nav.setRoot(HomePage);

                                                    }
                                                },
                                            ],

                                        });
                                        alert1.present();

                                    }
                                }


                                else if (result.buttonIndex == 1) {
                                    console.log('User cancelled');
                                    // let nav = this.app.getRootNav(); 
                                    // nav.setRoot(MainTabsPage, {tabIndex: 0});
                                    this.cancelFlag = true;

                                }
                            }
                        );


                }).catch(err => console.log);

            }


            else {

            }


        }, error => {

            this.ShowWalletAlert();
        }).catch(err => { console.log(err) });

        console.log("walletlock global", this.global.WallletLock);
    }




    ShowWalletAlert() {
        let prompt = this.alert.create({
            title: "Alert",
            message: "Do you wish to lock your wallet?",
            buttons: [
                {
                    text: "Cancel",
                    handler: data => {
                        console.log("cancel clicked");
                  

                    }
                },
                {
                    text: "Okay",
                    handler: data => {
                        console.log("ok clicked");
                        this.navCtrl.push('SettingsPage');

                    }
                }]
        });
        prompt.present();
    }
    ionViewWillLeave() {
        this.global.walletPageFlag = false;

    }

    AddWallet() {

        this.navCtrl.push('WalletPage');
    }

    getWalletList() {

        let loading = this.loadingctrl.create({
            content: "loading..."
        });
        loading.present();
        let response = this.server.GetUserWalletList()
        response.subscribe(data => {

            this.walletdata = data;
            console.log(this.walletdata);
            loading.dismiss();
            if (this.walletdata.success == 'false') {
                this.NothingInWallet = true

            }
            else {
                this.walletList = this.walletdata;
            }

            console.log(this.walletList);

        }, error => {
            console.log(error);
            loading.dismiss();

        });
    }

    WalletModel(walletdata) {


        this.navCtrl.push('WalletModelPage', { walletData: walletdata })
    }


    doRefresh1(refresher) {
      
        this.getWalletList();
        this.content.resize();
        refresher.complete();
    }
}

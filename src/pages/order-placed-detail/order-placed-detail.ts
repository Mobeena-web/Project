import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { GlobalVariable } from '../../app/global';

/**
 * Generated class for the OrderPlacedDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-order-placed-detail',
    templateUrl: 'order-placed-detail.html',
})
export class OrderPlacedDetailPage {
    o_id: any;
    tot: any;
    res_name: any;
    orders: any;
    schedule_time: any;
    instructions: any;
    time: any;
    total_price_with_extras: number;
    total_price: number;
    userChoices: any = []
    categories: any;
    category: any;
    object: any;
    payment_type:any;
    constructor(public globals: GlobalVariable, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public server: ServerProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        this.orders = navParams.get('data');
        this.time = navParams.get('time');
        this.instructions = navParams.get('instructions');
        this.schedule_time = navParams.get('schedule_time');
        this.res_name = navParams.get('res');
        this.tot = navParams.get('tot');
        this.o_id = navParams.get('o_id');
        this.payment_type = navParams.get('p_type');
        console.log("payment type",this.payment_type)
    } 
  
    ionViewDidLoad() {
        console.log('ionViewDidLoad OrderPlacedDetailPage');
    }

    close() {
        this.viewCtrl.dismiss();

    }
    ReorderVerificationPrompt(orderdata) {

        let prompt = this.alertCtrl.create({
            title: 'Alert',
            message: "Your reorder will be placed in your cart. Click the cart icon to proceed with your order.",
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Okay',
                    handler: data => {

                        console.log('OK clicked');
                        this.Categories(orderdata);

                    }
                }
            ]
        });
        prompt.present();
    }



    Categories(orderdata) {
        let loading = this.loadingCtrl.create({
            content: "loading...",

        });
        loading.present();
        console.log(orderdata);

        let response = this.server.GetBusinessMenuCategories(orderdata[0].restId);
        response.subscribe(data => {
            var res = data;
            console.log(res);
            loading.dismiss();
            // console.log(this.data.categories);
            this.category = res.categories;
            console.log("data", this.category);
            //this.userChoices.length = 0;
            orderdata.forEach(userdata => {

                console.log(userdata);
                this.category.forEach(element => {
                    console.log(userdata.menuItem, element, element.tax);
                    this.globals.tax = element.tax;
                    element.items.forEach(subelement => {

                        if (userdata.menuItem == subelement.name) {
                            if (userdata.menuExtrasSelected.length == 0) {
                                console.log(userdata.quantity, userdata.restId);

                                let total_price = Number(userdata.quantity) * Number(subelement.price);
                                console.log(this.globals.Product);

                                this.globals.Product.push({ menuId: "1", restId: userdata.restId, uniqueId: "1", menuItem: subelement.name, image: subelement.image, quantity: userdata.quantity, basePrice: Number(subelement.price), totalPrice: Number(total_price), menuExtrasSelected: [] });
                                console.log("global product",this.globals.Product);
                                this.navCtrl.popToRoot();
                            }
                            else {
                                console.log(userdata.menuExtrasSelected, subelement);
                                console.log("else");

                                this.total_price_with_extras = Number(userdata.quantity) * Number(subelement.price);
                                console.log("global product",this.globals.Product);
                                this.getExtras(subelement.id, userdata.menuExtrasSelected);


                                this.globals.Product.push({ menuId: "1", restId: userdata.restId, uniqueId: "1", menuItem: subelement.name, image: subelement.image, quantity: userdata.quantity, basePrice: Number(subelement.price), totalPrice: Number(this.total_price_with_extras), menuExtrasSelected: this.userChoices });

                                console.log("global product",this.globals.Product);
                                this.navCtrl.popToRoot();
                                
                            }
                        }

                    });
                });
            });

            //console.log("data1",this.data);

            // console.log(this.data.restaurant.categories);
            // console.log(this.category);
        }
            , error => {
                console.log(error);
                loading.dismiss();
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Server times out, please try again',
                    buttons: ['OK']
                });
                alert.present();

            });
    }

    getExtras(ItemId, userExtras) {

        let response = this.server.ProductItemDetail(ItemId);

        response.subscribe(data => {
            console.log(data.item.extras);
            console.log(userExtras);

            userExtras.forEach(userextra_element => {
                console.log(userextra_element);

                data.item.extras.forEach(data_extra_element => {
                    console.log(data.item.extras);
                    console.log(userextra_element.optionNameSelected);

                    userextra_element.optionNameSelected.forEach(user_option_element => {

                        data_extra_element.options.forEach(data_option_element => {
                            if (user_option_element.name == data_option_element.name) {

                                this.total_price_with_extras += user_option_element.quantity * Number(data_option_element.price);
                                var data = { heading: data_extra_element.heading, optionNameSelected: [{ name: data_option_element.name, price: Number(data_option_element.price), quantity: user_option_element.quantity, total: Number(data_option_element.price) * user_option_element.quantity, isFree: false }] }
                                console.log(data);
                                this.userChoices.push(data);
                                console.log(this.userChoices);
                            }
                        });
                    });

                });
            });
        }
            , error => {
                console.log(error);
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Server times out, please try again',
                    buttons: ['OK']
                });
                alert.present();
            });

    }


}

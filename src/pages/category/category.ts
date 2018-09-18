import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, ToastController, LoadingController, AlertController } from 'ionic-angular';

import { ServerProvider } from '../../providers/server/server';
import { Http } from '@angular/http';
import { ModalController } from 'ionic-angular';
import { GlobalVariable } from "../../app/global";
import { NativeStorage } from "@ionic-native/native-storage";
import { ItemDetailPage } from "../item-detail/item-detail";
import { merge } from "rxjs/observable/merge";
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';



@IonicPage()
@Component({
    selector: 'page-category',
    templateUrl: 'category.html',
})
export class CategoryPage {
    cartObjectQuantity: number;
    subtotal: number;
    index: any;
    isexist: boolean;
    time: number;
    day: number;
    date: Date;
    type :string;
    currentBusinessDiscount: any;

    DataFlag: boolean;
    paypal: any;
    heading: any;
    price: any;
    NAME: any;
    name: any;
    business_id: any;
    id: any;
    currentId: any;
    PageFlag: void;
    @ViewChild(Navbar) navBar: Navbar;
    cartflag: boolean;
    category: any;

    contacts: any;
    isShowSubMenu: boolean;
    myChoice: any[] = new Array();
    data: any;
    shownGroup = null;
    quantity_value: any = 1;
    coordinates:any;
    places:any;
    constructor(private geolocation: Geolocation,private diagnostic: Diagnostic,public server: ServerProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private nativeStorage: NativeStorage, private toastCtrl: ToastController, public globals: GlobalVariable, public http: Http, public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
        
        this.presentModal();
        
        this.cartflag = this.navParams.get('CartFlag');
        this.PageFlag = this.navParams.get('pageflag');
        this.business_id = this.globals.bussinessId;
        this.currentBusinessDiscount = "10";
        this.globals.BusinessDiscount = this.currentBusinessDiscount;
        this.list();
        this.getLocation();

        this.myChoice.push('abcd');
        this.myChoice.pop();

        // this.toggleGroup(0);
       


    }

    getLocation() {
        console.log("usman1");

        this.diagnostic.isLocationEnabled()
            .then((state) => {
                console.log("usman",state);
               
                    this.geolocation.getCurrentPosition().then((position) => {
                        this.coordinates = position.coords.latitude + "," + position.coords.longitude;
                        this.list();
                       
                    }, (err) => {
                        let alert = this.alertCtrl.create({
                            title: 'Location is disabled',
                            subTitle: 'In order to proceed, Please enable your location',
                            buttons: ['OK']
                        });
    
                        alert.present();
                        console.log(err);

                    });
              
            }).catch(e => console.error(e));

    }

    list() {
       let response = this.server.getRestaurantslist('100000', 'main', this.coordinates, '0', 'order');
       response.subscribe(data => {
           console.log('usmna_resturants',data)
           this.places = data.results;
           var new_id = this.globals.new_id;
           this.places = this.places.filter(function(item) {
            return item.business_id === new_id;
          });
          
          this.globals.business_username = this.places[0].username;
          this.globals.estimated_time = this.places[0].delivery_time;
          this.globals.business_discount_count = parseInt(this.places[0].business_discount_count);
          this.globals.username = this.places[0].username;
          this.globals.bussinessId = this.places[0].business_id;
          this.globals.admin_stripe = this.places[0].admin_stripe_enabled;
          this.globals.pickupsetting = this.places[0].delivery_time;
          this.globals.tax = this.places[0].tax;
          this.globals.deliveryCharges = this.places[0].delivery_fee;
          this.globals.pickup_Time = this.places[0].pickup_time;
          this.globals.minimun_order = parseInt(this.places[0].minimum_order);
          this.globals.StripId = this.places[0].stripe_id;
          this.globals.availed_discount_count = parseInt(this.places[0].customer_discount_availed_count);
          this.globals.paypalId = this.places[0].paypal_id;
          this.globals.Timing = this.places[0].hours_operation;
          this.globals.pickup = this.places[0].pickup;

            if (this.globals.pickup == '0') {
                this.globals.pickup = false;
            }
            else {
                this.globals.pickup = true;
            }
            if (this.places[0].delivery == '0') {
                this.globals.delivery = false;
            }
            else {
                this.globals.delivery = true;
            }
            if(this.places[0].cash_enabled == '0'){
                this.globals.cash_enabled = false;
            }
            else{
                this.globals.cash_enabled = true;
            }

             this.Categories();



       }, error => {
           console.log(error);

           let alert = this.alertCtrl.create({
               title: 'Error',
               subTitle: 'Server times out, please try again',
               buttons: ['OK']
           });
           alert.present();

       });
    
   }
   historypage(){
       this.navCtrl.push("OrderListingPage");
   }


    presentModal() {
        console.log(this.globals.model_flag,"model flag")
        if(this.globals.model_flag){
            this.globals.model_flag = false;
            console.log(this.globals.model_flag,"model flag2")

            // this.navCtrl.push("ModalPage");
            let modal = this.modalCtrl.create('ModalPage');
            modal.present();

        }
        
      }

      presentModal1() {
       
            let modal = this.modalCtrl.create('ModalPage');
            modal.present();

        
      }

    ionViewDidLoad() {
        this.globals.showbackButton = true;
    }

    ionViewDidEnter() {
        this.globals.title = this.globals.category_name;
    }


    Cart(object, flag, id, image, freeextras) {

        console.log("cordova check", this.globals.BusinessID, this.business_id);

        if (this.globals.BusinessID == '-1' || this.globals.BusinessID == this.business_id) {

            this.globals.BusinessID = this.business_id;
            console.log("business", this.business_id, this.globals.BusinessID);

            this.AddtoCart(object, flag, id, image, freeextras);
        }
        else {
            this.showPrompt(object, flag, id, image, freeextras);

        }

    }


    showPrompt(object, flag, id, image, freeextras) {
        let prompt = this.alertCtrl.create({
            title: 'Alert',
            message: "Are you sure you want to switch Restaurant? This will clear your current cart.",

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
                        console.log('Saved clicked');
                        this.globals.Product.length = 0;
                        this.globals.BusinessID = this.business_id;
                        this.globals.BusinessDiscount = this.currentBusinessDiscount;
                        this.AddtoCart(object, flag, id, image, freeextras);

                    }
                }
            ]
        });
        prompt.present();
    }


    toggleGroup(group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        } else {
            this.shownGroup = group;
        }
    };
    isGroupShown(group) {
        return this.shownGroup === group;
    };

    Categories() {
        let loading = this.loadingCtrl.create({
            content: "Loading...",

        });
        loading.present();
        let response = this.server.GetBusinessMenuCategories(this.globals.bussinessId);
        response.subscribe(data => {
            this.data = data;
            console.log(this.data);
            loading.dismiss();
            // console.log(this.data.categories);
            this.category = this.data.categories;
            this.name = this.data.restaurant.name;
            this.globals.title = this.name;
            this.globals.category_name = this.name;
            console.log(this.globals.title, "global title");

            console.log("data", this.data);
            this.data.categories.forEach(element => {

                element.items.forEach(subelement => {

                    subelement.quantity = 1;

                });
            });

            console.log("data1", this.data);
            if (this.data.categories.length == 0) {

                this.DataFlag = true;
            }
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

    Detail(id, image, freeextras) {
        console.log("id", id, freeextras)
        this.navCtrl.push('ItemDetailPage', { item_id: id, image: image, BusinesId: this.business_id, free_extras: freeextras })
    }

    OpenSettingPage() {
        this.navCtrl.push('SettingsPage');
    }


    AddtoCart(object, flag, id, image, freeextras) {
        console.log(object);
        this.cartObjectQuantity = 1;
        //this.globals.Product.push({menuId:"1",restId:"1",uniqueId:"1",menuItem:Name, image:Image,quantity: 1, basePrice:Price,totalPrice:Price,menuExtrasSelected:this.myChoice});
        this.subtotal = object.price * object.quantity;
        if (this.globals.Product.length > 0) {
            console.log("big if");
            this.globals.cartflag = true;
            this.globals.Product.forEach(element => {
                console.log(element.menuItem, object.name);
                if (!this.isexist) {
                    if (element.menuItem == object.name) {
                        this.index = this.globals.Product.indexOf(element);
                        this.isexist = true;
                    }

                    else {

                        this.isexist = false;
                    }
                }

            });
            console.log("exist", this.isexist);

            if (this.isexist) {
                if (flag == true) {
                    object.quantity += 1;
                    this.globals.Product[this.index].quantity = this.cartObjectQuantity + Number(this.globals.Product[this.index].quantity);
                    this.toastPresent('Item is successfully added to cart');
                    // this.navCtrl.push('ItemDetailPage',{  item_id:id,image:image,BusinesId:this.business_id,free_extras:freeextras})

                }

                else {
                    object.quantity = this.removeQuantity(object);
                    if (this.globals.Product[this.index].quantity != 1) {
                        this.globals.Product[this.index].quantity = Number(this.globals.Product[this.index].quantity) - this.cartObjectQuantity;
                        this.toastPresent('Item is successfully removed from the cart')
                    }
                }

                this.globals.Product[this.index].totalPrice = Number(object.price) * this.globals.Product[this.index].quantity;
                this.globals.Product[this.index].totalPrice = parseFloat(this.globals.Product[this.index].totalPrice).toFixed(2);

                this.isexist = false;
            }
            else {
                this.globals.Product.push({ menuId: "1", restId: this.globals.bussinessId, uniqueId: id, menuItem: object.name, image: object.image, quantity: object.quantity, basePrice: Number(object.price), totalPrice: Number(this.subtotal), menuExtrasSelected: this.myChoice });
                this.toastPresent('Item is successfully added to cart');
                // this.navCtrl.push('ItemDetailPage',{  item_id:id,image:image,BusinesId:this.business_id,free_extras:freeextras})

            }

        }
        else {
            console.log("big else");
            if (flag == true) {
                this.globals.Product.push({ menuId: "1", restId: this.globals.bussinessId, uniqueId: id, menuItem: object.name, image: object.image, quantity: object.quantity, basePrice: Number(object.price), totalPrice: this.subtotal, menuExtrasSelected: this.myChoice });
                this.toastPresent('Item is successfully added to cart');
                //  this.navCtrl.push('ItemDetailPage',{  item_id:id,image:image,BusinesId:this.business_id,free_extras:freeextras})

                this.globals.cartflag = true;
            }
        }
        console.log(this.globals.BusinessID);
        this.Savecart();
    }

    Savecart() {
        console.log("save to cart", this.globals.BusinessID)
        this.nativeStorage.setItem('Product', {
            array: this.globals.Product,
            businessDiscount: this.globals.BusinessDiscount,
            BusinessID: this.globals.BusinessID
        })
            .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
            );

    }

    // RetrieveSaveCart(){
    //     this.nativeStorage.getItem('Product').then(data=>{

    //         this.globals.BusinessID = data.BusinessID;
    //         console.log("retrieve native", data.BusinessID);
    //     }).catch(err => console.log);
    // }

    addQuantity(object) {
        console.log(object);

        object.quantity += 1;


    }
    removeQuantity(object) {
        console.log(object);
        if (object.quantity <= 1) {
            object.quantity = 1;
        }
        else {
            object.quantity -= 1;
        }

        return object.quantity;
    }

    toastPresent(Message) {

        let toast = this.toastCtrl.create({
            message: Message,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    }


    cartpage() {

        console.log("cart page checking");
        if (this.globals.Product.length == 0) {
            console.log("cart button if condition");
            let alert = this.alertCtrl.create({
                title: "Oops",
                message: "Your cart is empty.",
                buttons: ["Okay"]

            });
            alert.present();
        }
        else {
            this.navCtrl.push('CartPage', {

              }).then(
                response => {
                  console.log('Response ' + response);
                },
                error => {
                  console.log('Error: ' + error);
                }
              ).catch(exception => {
                console.log('Exception ' + exception);
              });
        }
    }

    


}

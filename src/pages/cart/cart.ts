import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, ModalController, AlertController, ViewController, App, LoadingController, ToastController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { NativeStorage } from '@ionic-native/native-storage';
import { GlobalVariable } from '../../app/global';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@IonicPage()
@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html',
})
export class CartPage {
    RewardStoreCreditAvailed: any = 0;
    birthdayStoreCreditavailed: any = 0;
    birthdayStoreCreditInput: number;
    availed_points: number;
    tax_calc: any;
    selectOptions: { title: string; };
    point_rewards: any;
    pointsAvailed: boolean = false;
    points: any;
    pointExists: boolean;
    mobileDiscountFlag: any;
    deliverycharges: number;
    ProductsTotal: any;
    firsattempt: boolean = true;
    Deliver: boolean;
    pickup: boolean = false;
    birthday_amount: number = 0;
    birthdayCreditExist: any;
    BirthdayDiscount: any;
    pointsInput: any;
    StoreCreditInput: number;
    reward_amount: number = 0;
    storecreditExist: boolean = false;
    discountTotal: number = 0;
    updatedTotal: number;
    @ViewChild(Navbar) navBar: Navbar;
    extratotal: any = 0;
    data: any;
    Total: any = 0;
    subtotal: any = 0;
    image: any;
    price: any;
    Quantity: any;
    productName: any;
    extraSum = new Array();
    storeCredit: boolean = false;
    Tip: any = 0;
    notes: any;
    check_rewards: boolean = false;
    check_points: boolean = false;
    user_availed_points: boolean = false;
    check_birthday: boolean = false;
    type: any;
    instructionsItem: any;
    instruct: Boolean = true;
    Address: any;
    point_show: any = 0;
    per_tip: any = 0;
    tip_cus: any = 0;
    gift_card_amount = 0;
    mygifts = [];
    gift_array = [];
    delivery_display: any;
    tip_type: any = 'percent';
    percent_tip_vlaue: any;
    ccFee:any = 0;
    tax : any;

    utensils_array = [{
        type: 'Yes',
        selected: false 
    },{
        type: 'No',
        selected: true 
    }];
    utensils_note: any = ''; 

    constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public server: ServerProvider, public modalCtrl: ModalController, public alertCtrl: AlertController, private nativeStorage: NativeStorage, public appCtrl: App, public globals: GlobalVariable, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        console.log(globals.BusinessDiscount, globals.availed_discount_count, globals.business_discount_count, "@@@type");
        //  console.log("here is my items of global" ,this.globals.itemInstruction);

        this.Address = localStorage.getItem("GetAddress");
        this.type = this.globals.OrderType;
        console.log("checking order type ", this.type);
        console.log(this.globals.MobileDiscount);
        this.delivery_display = this.financial(this.globals.deliveryCharges)
        this.globals.TipAdded = false;
        console.log("tip",this.globals.tip_enabled);
        //  console.log(this.globals.minimun_order, "minorder");
        //  console.log("delivery,pickup global", this.globals.delivery, this.globals.pickup);

        if (this.type == "delivery") {
            console.log("checking pickup and delivery");
            this.Deliver = true;
            this.pickup = false;

        }
        else {
            this.Deliver = false;
            this.pickup = true;

            // this.Deliver = this.globals.delivery;
            // this.pickup = this.globals.pickup;
        }
        //this.PickupBox();
        console.log("which type ", this.globals.pickup, this.globals.delivery);
        console.log("pickup value checking ", this.pickup);

        this.selectOptions = {
            title: 'Points'
        };

        this.total();
        console.log("global product array", this.globals.Product);
        this.CheckUserReward();
        this.CheckUserPoints();
        this.CheckMobileDiscount();
        this.my_gift_cards();
        this.loadGlobal_upsell();
        console.log(this.globals.business_discount_count, this.globals.availed_discount_count, 'po')
        if(this.globals.tip_enabled == 'force' && this.Tip == 0){
            this.percent_tip(15);
            this.toastTip();    
        }
    }
    // ionViewWillEnter(){
    //     this.total();
    // }



    ionViewDidLoad() {
        console.log('ionViewDidLoad CartPage');
        //  console.log("instruction key", this.globals.instruction);
        this.globals.cartflag = false;
        // this.setArray();




        // this.nativeStorage.getItem('Product')
        //   .then (data => {
        // this.globals.Product = data.array;


        //     }).catch(err => console.log);

        this.navBar.backButtonClick = (e: UIEvent) => {
            // todo somethin
            this.globals.BusinessDiscountFlag = false;
            if (this.globals.Product.length >= 1) {
                this.globals.cartflag = true;
                this.navCtrl.popTo('CategoryPage');
                // this.setArray();

            }
            else {
                this.globals.cartflag = false;
                // this.setArray();
            }
        }
    }

    async loadGlobal_upsell(){
        let response = this.server.global_Upsell();
        response.subscribe(data => {
            console.log("Global upsell -> ", data);
            if(data.success){
                if(data.data.length > 0){
                    let modal = this.modalCtrl.create('UpsellProductModalPage', { place: this.globals.business_username, upSellItems: data.data});
                    modal.onDidDismiss(data => {
                        console.log("Upsell product modal ", data);
                        if(data.modal_close){
                            this.total();
                            this.CheckUserReward();
                            this.CheckUserPoints();
                            this.CheckMobileDiscount();
                            this.my_gift_cards();
                        }
                    });
                    modal.present();
                }
            } else {

            }
        }, error => {
            console.log(error);
        });
    }

    financial(x) {
        if (x != 0) {
            return Number.parseFloat(x).toFixed(2);
        }
        else {
            return '0.00';
        }
    }

    PointBox() {
        // if(this.check_points == true)
        // {
        //     this.CheckUserPoints();    
        // }
        if (!this.check_points && this.availed_points > 0 && this.pointsInput.availed) {
            console.log("reverting points");

            this.Total = Number(this.Total) + this.availed_points;
            this.Total = this.Total.toFixed(2);
            this.pointsInput.availed = false;
            this.points = Number(this.points) + Number(this.pointsInput.points);

            console.log(this.pointsInput);
        }
    }

    RewardBox() {
        if (!this.check_rewards && this.RewardStoreCreditAvailed > 0) {
            this.Total = Number(this.Total) + this.RewardStoreCreditAvailed;
            this.Total = this.Total.toFixed(2);
            this.RewardStoreCreditAvailed = 0;
        }
    }

    BirthdayBox() {
        if (!this.check_birthday && this.birthdayStoreCreditavailed > 0) {
            this.Total = Number(this.Total) + this.birthdayStoreCreditavailed;
            this.Total = this.Total.toFixed(2);
            this.birthdayStoreCreditavailed = 0;
        }
    }

    CheckUserPoints() {
        let loading = this.loadingCtrl.create({
            content: "Checking please wait...",
        });
        loading.present();

        let res = this.server.CheckUserPoints()
            .subscribe(data => {
                loading.dismiss();
                console.log("POints Data", data);

                if (data.status == 'true') {
                    this.pointExists = true;
                    this.points = Number(data.data.points_count);
                    this.pointsInput = this.points;

                    if (data.business_rewards.length > 0) {
                        this.point_rewards = data.business_rewards;
                        console.log(this.point_rewards);
                    }
                    console.log(this.pointsInput, this.point_rewards);
                } else {
                    // let alert = this.alertCtrl.create({
                    //     title: 'Oops',
                    //     subTitle: 'Sorry,you do not have points in this business.',
                    //     buttons: ['Okay']
                    // });
                    // alert.present();
                    this.check_points = false;
                }

            }, error => {
                console.log(error);
                loading.dismiss();
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Server times out, please try again',
                    buttons: ['Okay']
                });
                alert.present();
                this.check_points = false;
            })

    }



    // PickupBox() {
    //     if (this.pickup == false) {
    //         this.Deliver = true;
    //         if(this.globals.deliveryCharges != 0)
    //         {      console.log(this.globals.deliveryChargesFinishthroughPickup)
    //             this.Total = Number(this.Total);
    //             this.Total = Number(this.ProductsTotal)+this.globals.deliveryCharges;
    //             this.Total =  this.Total.toFixed(2);
    //         }
    //         this.total();

    //     }
    //     else {
    //         this.Deliver = false;
    //         this.total();
    //         if(this.globals.deliveryCharges != 0 )
    //         { this.firsattempt = false;

    //             this.Total = Number(this.Total);
    //             this.Total-= Number(this.globals.deliveryCharges);
    //             this.globals.deliveryChargesFinishthroughPickup = true;
    //             this.Total =  this.Total.toFixed(2);

    //         }
    //     }
    // }
    // DeliverBox() {

    //     if (this.Deliver == true) {
    //         this.pickup = false;
    //     }
    //     else {
    //         this.pickup = true;
    //         this.total();


    //     }

    // }


    CheckMobileDiscount() {
        this.nativeStorage.getItem('MobileFlagSave').then(data => {
            this.globals.MobileDiscount = data.MobileDiscount;
            this.globals.MobileDiscountFlag = data.MobileFlag;
            console.log("mobile discount", this.globals.MobileDiscount)

        }, error => {
            this.globals.MobileDiscount = 0;


        }).catch(err => console.log(err));
    }

    MaxMin() {
        console.log("hello", this.StoreCreditInput);
        this.StoreCreditInput = Number(this.StoreCreditInput);
        if (this.StoreCreditInput > this.reward_amount) {
            let alert = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be more then Store credit',
                buttons: ['Okay']
            });
            alert.present();
            this.StoreCreditInput = this.reward_amount;
        }
        else if (this.StoreCreditInput < 0) {
            let alert = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be less then 0',
                buttons: ['Okay']
            });
            alert.present();
            this.StoreCreditInput = 0;

        }
        else if (this.StoreCreditInput == null || this.StoreCreditInput == undefined) {
            let alert = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Please enter a value',
                buttons: ['Okay']
            });
            alert.present();
            this.StoreCreditInput = this.reward_amount;
        }
    }

    BirthdayMaxMin() {
        console.log("hello", this.birthdayStoreCreditInput);
        this.birthdayStoreCreditInput = Number(this.birthdayStoreCreditInput);
        if (this.birthdayStoreCreditInput > this.birthday_amount) {
            let alert = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be more then Store credit',
                buttons: ['Okay']
            });
            alert.present();
            this.birthdayStoreCreditInput = this.birthday_amount;
        } else if (this.birthdayStoreCreditInput < 0) {
            let alert = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be less then 0',
                buttons: ['Okay']
            });
            alert.present();
            this.birthdayStoreCreditInput = 0;

        } else if (this.birthdayStoreCreditInput == null || this.birthdayStoreCreditInput == undefined) {
            let alert = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Please enter a value',
                buttons: ['Okay']
            });
            alert.present();
            this.birthdayStoreCreditInput = this.birthday_amount;
        }
    }



    // setArray(){
    //     console.log(this.globals.BusinessID);

    //     this.nativeStorage.setItem('Product', {
    //         array: this.globals.Product,
    //         BusinessDiscount: this.globals.BusinessDiscount,
    //         MinimumOrder:this.globals.minimun_order,
    //         DeliveryCharges:this.globals.deliveryCharges,
    //         BusinessID:this.globals.BusinessID
    //     })
    //     .then(
    //     () => console.log('Stored item!'),
    //     error => console.error('Error storing item', error)


    //     );
    // }

    // PointsMaxMin() {

    //     if(this.pointsInput > this.points)
    //     {
    //         let alert = this.alertCtrl.create({
    //             title: 'Alert',
    //             subTitle: 'Value cannot not be more then total user points',
    //             buttons: ['OK']
    //         });
    //         alert.present();
    //         this.pointsInput = this.points;
    //     }
    //     else if(this.pointsInput < 0)
    //     {
    //         let alert = this.alertCtrl.create({
    //             title: 'Alert',
    //             subTitle: 'Value cannot not be less then 0',
    //             buttons: ['OK']
    //         });
    //         alert.present();
    //         this.pointsInput = 0;

    //     }
    //     else if(this.pointsInput == null || this.pointsInput == undefined)
    //     {
    //         let alert = this.alertCtrl.create({
    //             title: 'Alert',
    //             subTitle: 'Please enter a value',
    //             buttons: ['OK']
    //         });
    //         alert.present();
    //         this.pointsInput = this.points;

    //     }


    // }

    CheckReservationPayment() {
        let prompt = this.alertCtrl.create({
            title: 'Alert',
            message: "do you want to pay for your reservation order as well?",
            buttons: [
                {
                    text: 'No',
                    handler: data => {
                        console.log('Cancel clicked');
                        // this.placeOrderByPayOnVenue() 
                    }
                },
                {
                    text: 'Okay',
                    handler: data => {
                        console.log('OK clicked');
                    }
                }
            ]
        });
        prompt.present();
    }

    total() {
        this.Total = 0;
        var amount_without_tax = 0; 
        // console.log(this.globals.deliveryCharges, "delivery cahrges");
        this.globals.deliveryCharges = Math.round(this.globals.deliveryCharges * 100) / 100;
        console.log(this.globals.deliveryCharges, "delivery cahrges");
        for (let sub of this.globals.Product) {
            this.Total = Number(this.Total);
            sub.totalPrice = Number(sub.totalPrice);
            this.Total += Number(sub.totalPrice);
            if(sub.tax_enabled == 'false' || sub.tax_enabled == false){
                amount_without_tax += Number(sub.totalPrice);
            }
            this.ProductsTotal = this.Total;
        }

        if(this.globals.cash_discount_enabled && this.globals.card_enabled){
            this.ccFee =  ((Number(this.globals.cash_discount_percentage) / 100) * Number(this.ProductsTotal)).toFixed(2);
            this.ccFee = (Number(this.ccFee) + Number(this.globals.cash_discount_value));
            this.ccFee = this.ccFee.toFixed(2)
            this.Total = this.Total +  Number(this.ccFee); 
        }

        if (this.globals.BusinessDiscount > 0 && this.globals.availed_discount_count < this.globals.business_discount_count) {
            this.discountTotal = Number(this.ProductsTotal) * this.globals.BusinessDiscount / 100;
            this.discountTotal = Math.round(this.discountTotal * 100) / 100;
            // this.discountTotal.toFixed(2);
            this.Total = this.ProductsTotal - this.discountTotal;
            // this.Total = this.Total.toFixed(2);
            this.globals.BusinessDiscountFlag = true;
        }

        if ((Number(this.Total) < this.globals.minimun_order || Number(this.Total) < 0) && this.Deliver == true) {

            this.TaxCalculate(amount_without_tax);
            if (Number(this.ProductsTotal) == 0) {

                this.TaxCalculate(amount_without_tax);
                if (this.RewardStoreCreditAvailed > 0) {
                    this.Total = Number(this.Total) - this.RewardStoreCreditAvailed;
                }
                if (this.birthdayStoreCreditavailed > 0) {
                    this.Total = Number(this.Total) - this.birthdayStoreCreditavailed;
                }
            } else {
                this.globals.presentToast('Please add more items in the cart.')
            }
        } else {
            this.TaxCalculate(amount_without_tax);
            if (this.RewardStoreCreditAvailed > 0) {
                this.Total = Number(this.Total) - this.RewardStoreCreditAvailed;
            }
            if (this.birthdayStoreCreditavailed > 0) {
                this.Total = Number(this.Total) - this.birthdayStoreCreditavailed;
            }
        }

        if (this.globals.OrderType == "delivery" && this.globals.deliveryCharges != 0 && this.Deliver == true) {
            this.Total = Number(this.Total);
            this.Total = this.Total + Number(this.globals.deliveryCharges);
            //    this.deliverycharges = Number(this.globals.deliveryCharges);
        }

        if (Number(this.Tip > 0) && this.tip_type == 'manual') {
            this.Total = Number(this.Total) + Number(this.Tip);
        }
        else if (this.tip_type == 'percent') {
            this.percent_tip_(this.percent_tip_vlaue);
        }

        if (this.gift_array.length > 0) {
            this.gift_array.forEach(e => {
                this.Total = Number(this.Total) - Number(e.amount)

            });
        }

        if (this.Total != 0) {
            this.Total = Number(this.Total).toFixed(2);
        }
    }

    TaxCalculate(amount_without_tax) {

        if (this.globals.business_type == 'retail' || this.globals.business_type == 'salon') {
            var taxcalc = 0;
            this.globals.retail_items_discount = 0;
            var ItemDiscount = 0;
            var ItemDiscountedValue = 0;
            for (let sub of this.globals.Product) {
                ItemDiscount = 0;
                let CalculatedTax = 0;
                sub.discount_type == 'cash' ? ItemDiscount += Number(sub.discount_value) * Number(sub.quantity) : sub.discount_type == 'perc' ? ItemDiscount += Number(sub.discount_value) / 100 * Number(sub.basePrice) * Number(sub.quantity) : console.log('discount neither cash nor percent');

                ItemDiscountedValue = (Number(sub.basePrice) * Number(sub.quantity)) - Number(ItemDiscount);
                CalculatedTax = Number(sub.tax) / 100 * Number(ItemDiscountedValue);
                taxcalc += CalculatedTax;
                this.globals.retail_items_discount += ItemDiscount;
                sub.CalculatedDiscount = this.financial(ItemDiscount);
                sub.CalculatedTax = this.financial(CalculatedTax);
            }
            this.tax_calc = taxcalc.toFixed(2);

            this.Total = (this.Total + taxcalc) - this.globals.retail_items_discount;
            this.Total = this.Total.toFixed(2);

        }
        else {
            var tax_amount = Number(this.ProductsTotal) - (Number(amount_without_tax) + Number(this.discountTotal));

            var taxcalc = (Number(this.globals.tax) / 100) * tax_amount;
            console.log("amount_without_tax",this.discountTotal,this.ProductsTotal,taxcalc,tax_amount,amount_without_tax,this.Total)
            this.tax = Number(taxcalc.toFixed(3));
            this.tax_calc = this.tax.toFixed(2);
        
            this.Total = this.Total + taxcalc;

            this.Total = this.Total.toFixed(2);
        }



        //console.log(this.Total);

    }

    // TipAdd() {
    //     if (this.Tip >= 0) {
    //         this.Total = Number(this.Total);
    //         this.Total += parseFloat(this.Tip);
    //     }
    //     if (this.Tip < 0 || this.Tip == '') {
    //         this.Tip = 0;
    //     }

    // }




    addStoreCreditValue() {


        if (this.StoreCreditInput < this.reward_amount) {

            this.StoreCreditInput += 1;
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be more then Store credit',
                buttons: ['OK']
            });
            alert.present();
        }


    }

    removeStoreCreditValue() {

        if (this.StoreCreditInput > 0) {

            this.StoreCreditInput -= 1;
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be less then 0',
                buttons: ['OK']
            });
            alert.present();
        }

    }

    addBirthdayStoreCreditValue() {

        if (this.birthdayStoreCreditInput < this.birthday_amount) {

            this.birthdayStoreCreditInput += 1;
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be more then Store credit',
                buttons: ['OK']
            });
            alert.present();
        }

    }

    removeBirthdayStoreCreditValue() {

        if (this.birthdayStoreCreditInput > 0) {

            this.birthdayStoreCreditInput -= 1;
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Value cannot not be less then 0',
                buttons: ['OK']
            });
            alert.present();
        }

    }



    detail(id) {
        console.log(id, "id");
        this.navCtrl.push('ItemDetailPage', { type: true, item_id: id, BusinesId: this.globals.BusinessID })
    }

    changeAddress() {
        // this.navCtrl.push("ModalPage");
        //  this.total();

        let modal = this.modalCtrl.create('ModalPage');
        modal.onDidDismiss(data => {
            this.total();
        });
        modal.present();
    }

    AddmoreItem() {
        this.globals.cartflag = true;
        console.log("more item", this.globals.cartflag);
        this.navCtrl.popTo('ItemDetailPage');
    }

    RemoveItem(product) {
        console.log(product);

        if (this.globals.Product.length == 1) {
            this.globals.BusinessID = -1;
            this.globals.cartflag = false;
            this.ProductsTotal = Number(this.ProductsTotal) - product.totalPrice;
            this.Total = this.Total + this.ProductsTotal
            // this.globals.BusinessDiscountFlag = false;

            var index = this.globals.Product.indexOf(product);
            this.globals.Product.splice(index, 1);
            // this.setArray();
            this.globals.retail_items_discount = 0;
            this.navCtrl.popTo('CategoryPage');
        }
        else {
            //  console.log("data",product.basePrice*product.quantity,product.basePrice,product.quantity)
            var index = this.globals.Product.indexOf(product);
            this.globals.Product.splice(index, 1);
            this.total();

            console.log("subtract", this.Total);


            // this.setArray();
        }

    }

    CheckUserReward() {
        let response = this.server.getUserLotteryRewards(this.globals.RewardsPos);

        response.subscribe(data => {
            var user_reward = data;

            console.log("reward", user_reward);
            if (user_reward.status != 'error') {
                console.log(user_reward.rewards);
                user_reward.rewards.forEach(element => {
                    console.log(this.globals.BusinessID, "ll")
                    if (element.businessid == this.globals.new_id) {
                        console.log("businessexist exist");

                        if (element.reward_string == 'null' && element.is_birthday == 'false') {
                            this.storecreditExist = true;
                            this.reward_amount = Number(element.reward);
                            console.log("this", this.reward_amount);
                            this.StoreCreditInput = this.reward_amount;
                            console.log(this.StoreCreditInput);
                        }
                        else if (element.reward_string == 'null' && element.is_birthday == 'true') {
                            console.log("birthday exist");
                            this.birthdayCreditExist = true;
                            this.globals.BirthdayCreditExist = this.birthdayCreditExist;

                            this.birthday_amount = Number(element.reward);
                            this.birthdayStoreCreditInput = this.birthday_amount;
                            this.globals.birthdayAmount = this.birthday_amount;
                        }
                        else {
                            this.storeCredit = false;
                        }
                    }
                    // else{
                    //    // this.storecreditExist = false;
                    //     console.log("businessexist does not exist");
                    // }


                });
                console.log(this.storecreditExist, "storecredit exist ");


            }
        }, error => { console.log(error) });

    }

    StoreCreditAvail() {
        console.log(true);
        let flag = false;
        if (this.storecreditExist == true) {
            if (Number(this.StoreCreditInput) > Number(this.Total)) {
                console.log("if", this.StoreCreditInput);
                let alert = this.alertCtrl.create({
                    title: 'Sorry',
                    subTitle: 'In order to avail your Store credit,please add more items.',
                    buttons: ['OK']
                });
                alert.present();
            }
            else {
                console.log("else", this.StoreCreditInput);
                this.ProductsTotal -= this.StoreCreditInput;
                this.reward_amount -= this.StoreCreditInput;
                this.StoreCreditInput = this.reward_amount;
                if (this.Deliver == true) {
                    this.Total = Number(this.ProductsTotal) + this.globals.deliveryCharges;
                }
                else {
                    this.Total = Number(this.ProductsTotal);
                }
                this.Total = this.Total.toFixed(2);

                console.log(this.StoreCreditInput, this.reward_amount);
                if (flag == false) {
                    this.navCtrl.push('PaymentPage', {ccFee:this.ccFee, amount: this.Total, StoreCredit: this.StoreCreditInput, notes: this.notes + ' ' + this.utensils_note });
                    flag = true;
                }
            }
        }
        if (this.globals.BirthdayCreditExist == true) {
            if (Number(this.birthday_amount) > Number(this.Total)) {
                let alert = this.alertCtrl.create({
                    title: 'Sorry',
                    subTitle: 'In order to avail your Birthday store credit,please add more items.',
                    buttons: ['OK']
                });
                alert.present();

            }
            else {
                this.ProductsTotal -= this.birthday_amount;
                this.ProductsTotal = this.ProductsTotal.toFixed(2);
                if (this.Deliver == true) {
                    this.Total = Number(this.ProductsTotal) + this.globals.deliveryCharges;
                }
                else {
                    this.Total = Number(this.ProductsTotal);
                }
                this.Total = this.Total.toFixed(2);
                this.globals.birthdayAmount = 0;
                this.globals.BirthdayCreditExist = false;
                this.globals.BirthdayCreditUtlized = true;
                if (flag == false) {
                    this.navCtrl.push('PaymentPage', {ccFee:this.ccFee, amount: this.Total, notes: this.notes + ' ' + this.utensils_note });
                    flag = true;
                }

            }
        }

        else {
            if (flag == false) {
                this.navCtrl.push('PaymentPage', {ccFee:this.ccFee, amount: this.Total, notes: this.notes + ' ' + this.utensils_note });

            }
        }
    }
    presentConfirm() {
        let alert = this.alertCtrl.create({
            title: 'Login',
            message: 'You need to be logged in to use this feature.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Login',
                    handler: () => {
                        this.navCtrl.setRoot('LoginPage')
                    }
                }
            ]
        });
        alert.present();
    }

    coas_type() {
        let alert = this.alertCtrl.create({
            title: 'Login',
            message: 'You Want to Login or Proceed to Checkout',
            buttons: [
                {
                    text: 'Login',
                    handler: () => {
                        let modal = this.modalCtrl.create('LoginPage');
                        modal.present();
                    }
                },
                {
                    text: 'Proceed to Checkout',
                    handler: () => {

                        this.navCtrl.push('PaymentPage', {ccFee:this.ccFee, amount: this.Total, tip: this.Tip, notes: this.notes + ' ' + this.utensils_note, RewardAvailed: this.RewardStoreCreditAvailed, BirthdayCreditavailed: this.birthdayStoreCreditavailed });

                    }
                }

            ]
        });
        alert.present();
    }

    paymentPage() {
        if (this.globals.guess_login) {
            this.presentConfirm();
        } else {
            let proceedFlag = true;
            let alert12 = this.alertCtrl.create({
                title: 'Please note',
                subTitle: 'Cart value must be equal or greater than $' + this.globals.minimun_order + '. Try adding more items in the cart',
                buttons: ['Okay']
            });

            if(this.globals.tip_enabled == 'force' && this.Tip == 0){
               this.toastTip();
                // this.add_gratuity();
            } else {
                if (this.ProductsTotal < this.globals.minimun_order && this.Deliver == true && this.globals.OrderType == 'delivery') {
                    if (Number(this.ProductsTotal == 0)) {
                        if (this.globals.MobileDiscount > 0 && this.globals.MobileDiscountFlag == true) {
                            let mob = this.globals.MobileDiscount;
                            let subtract_value = Number(this.ProductsTotal) - mob;
                            if (subtract_value >= this.globals.minimun_order) {
                                console.log(this.globals.MobileDiscount, "mobile discount");
    
                                console.log("mobile discount, product total", this.ProductsTotal, this.globals.MobileDiscount);
    
                                this.ProductsTotal = Number(this.ProductsTotal) - Number(this.globals.MobileDiscount);
                                console.log("product total after subtraction", this.ProductsTotal);
    
                                this.ProductsTotal = this.ProductsTotal.toFixed(2);
                                console.log("product total after toFixed", this.ProductsTotal);
                                this.Total = this.ProductsTotal;
                                console.log(this.Total, "total = producttotal");
                            }
                            else {
                                alert12.present();
                                proceedFlag = false;
                            }
    
                            if (this.Deliver == true) {
    
                                this.Total = Number(this.ProductsTotal) + Number(this.globals.deliveryCharges);
    
                            }
                            else {
                                this.Total = Number(this.ProductsTotal);
                            }
                            this.Total = this.Total.toFixed(2);
    
                            if ((Number(this.ProductsTotal) < this.globals.minimun_order || Number(this.ProductsTotal) < 0) && this.Deliver == true) {
                                alert12.present();
                                this.total();
                                proceedFlag = false;
                            }
    
    
                        }
    
    
                        if (proceedFlag) {
                            this.Address = localStorage.getItem("GetAddress");
                            console.log(this.Address, "lo")
                            if (this.globals.OrderType == 'delivery' && this.globals.caos_flag == false) {
                                if (this.globals.inradius) {
                                    if (this.checkTiming(this.globals.delivery_timing)) {
                                        this.address_();
                                    }
    
                                }
                                else {
                                    this.globals.presentToast("Sorry, We dn't deliver in your Area.")
    
                                }
    
    
                            }
                            else {
                                console.log(this.globals.Email, "emaill")
                                if (!this.globals.udid && !this.globals.guess_login) {
                                    this.coas_type();
                                }
                                else {
                                    if (this.checkTiming(this.globals.pickup_timing)) {
                                        this.navCtrl.push('PaymentPage', { ccFee:this.ccFee,giftcard: this.gift_array, amount: this.Total, tip: this.Tip, notes: this.notes + ' ' + this.utensils_note, RewardAvailed: this.RewardStoreCreditAvailed, BirthdayCreditavailed: this.birthdayStoreCreditavailed, tax: this.tax_calc });
    
                                    }
    
                                }
    
                            }
    
    
                        }
                    }
                    else {
                        alert12.present();
                        proceedFlag = false;
                    }
    
                }
    
                else {
    
                    if (this.globals.MobileDiscount > 0 && this.globals.MobileDiscountFlag == true) {
                        let mob = this.globals.MobileDiscount;
                        let subtract_value = Number(this.ProductsTotal) - mob;
                        if (subtract_value >= this.globals.minimun_order) {
                            console.log(this.globals.MobileDiscount, "mobile discount");
    
                            console.log("mobile discount, product total", this.ProductsTotal, this.globals.MobileDiscount);
    
                            this.ProductsTotal = Number(this.ProductsTotal) - Number(this.globals.MobileDiscount);
                            console.log("product total after subtraction", this.ProductsTotal);
    
                            this.ProductsTotal = this.ProductsTotal.toFixed(2);
                            console.log("product total after toFixed", this.ProductsTotal);
                            this.Total = this.ProductsTotal;
                            console.log(this.Total, "total = producttotal");
                        }
                        else {
                            alert12.present();
                            proceedFlag = false;
                        }
    
                        if (this.Deliver == true) {
    
                            this.Total = Number(this.ProductsTotal) + Number(this.globals.deliveryCharges);
    
                        }
                        else {
                            this.Total = Number(this.ProductsTotal);
                        }
                        this.Total = this.Total.toFixed(2);
    
                        if ((Number(this.ProductsTotal) < this.globals.minimun_order || Number(this.ProductsTotal) < 0) && this.Deliver == true) {
                            alert12.present();
                            this.total();
                            proceedFlag = false;
                        }
    
    
                    }
    
    
    
    
                    if (proceedFlag) {
                        this.Address = localStorage.getItem("GetAddress");
                        console.log(this.globals.Email, "emaill")
    
                        if (this.globals.OrderType == 'delivery' && this.globals.caos_flag == false) {
                            if (this.globals.inradius) {
                                if (this.checkTiming(this.globals.delivery_timing)) {
                                    this.address_();
                                }
    
                            }
                            else {
                                this.globals.presentToast("Sorry, We dn't deliver in your Area.")
    
                            }
    
    
                        }
                        else {
                            console.log(this.globals.Email, "emaill")
                            if (!this.globals.udid && !this.globals.guess_login) {
                                this.coas_type();
                            }
                            else {
                                if (this.checkTiming(this.globals.pickup_timing)) {
                                    this.navCtrl.push('PaymentPage', {ccFee:this.ccFee, giftcard: this.gift_array, amount: this.Total, tip: this.Tip, notes: this.notes + ' ' + this.utensils_note, RewardAvailed: this.RewardStoreCreditAvailed, BirthdayCreditavailed: this.birthdayStoreCreditavailed, tax: this.tax_calc });
    
                                }
    
                            }
    
                        }
    
    
                    }
                }
            }
        }


    }

    address_() {
        console.log('address', this.Address);
        console.log(this.Address == 'undefined', this.Address == '', this.Address == 'null');
        if (!this.Address || this.Address == 'undefined' || this.Address == '' || this.Address == 'null') {
            let alert = this.alertCtrl.create({
                title: 'Please Confirm Your Address',
                message: this.Address,
                buttons: [
                    {
                        text: 'Update Address',
                        handler: () => {
                            this.changeAddress();
                        }
                    },
                    {
                        text: 'Proceed to Checkout',
                        handler: () => {
                            let toast = this.toastCtrl.create({
                                message: 'Please enter your delivery address',
                                duration: 3000,
                                position: 'bottom'
                            });
                            toast.present();
                            //this.navCtrl.push('PaymentPage', {giftcard:this.gift_array, amount: this.Total, tip: this.Tip, notes: this.notes, RewardAvailed: this.RewardStoreCreditAvailed, BirthdayCreditavailed: this.birthdayStoreCreditavailed });                       

                        }
                    }
                ]
            });
            alert.present();

        } else {
            let alert = this.alertCtrl.create({
                title: 'Please Confirm Your Address',
                message: this.Address,
                buttons: [
                    {
                        text: 'Update Address',
                        handler: () => {
                            this.changeAddress();
                        }
                    },
                    {
                        text: 'Proceed to Checkout',
                        handler: () => {
                            this.navCtrl.push('PaymentPage', {ccFee:this.ccFee, giftcard: this.gift_array, amount: this.Total, tip: this.Tip, notes: this.notes + ' ' + this.utensils_note, RewardAvailed: this.RewardStoreCreditAvailed, BirthdayCreditavailed: this.birthdayStoreCreditavailed, tax: this.tax_calc });

                        }
                    }
                ]
            });
            alert.present();
        }
    }

    // TipChange(){
    //     if(this.Tip > 0)
    //     this.Total = Number(this.Total) + Number(this.Tip);
    //         this.Total = this.Total.toFixed(2);
    // }

    AvailRewards() {
        if (this.check_points) {

            this.user_availed_points = false;
            if (this.pointsInput.points != undefined || this.pointsInput.points != null) {

                if (this.pointsInput.points > this.points) {

                    this.AddMoreItemAlert('You do not have sufficient points to redeem this point reward.')
                    this.user_availed_points = false;

                }

                else if (!this.pointsInput.availed) {

                    let tot = Number(this.Total);
                    let sub = tot - Number(this.pointsInput.description);
                    console.log(sub, "sub");


                    if (sub <= 0) {

                        // if (sub < this.globals.minimun_order || sub <= 0) {

                        // this.AddMoreItemAlert(' Points reward cannot be availed.Please add more item in the cart.');
                        this.AddMoreItemAlert('Point cannot be redeemed on rewards');

                        this.user_availed_points = false;
                    }
                    else {
                        this.pointsInput.availed = true;
                        this.points = this.points - this.pointsInput.points;
                        console.log("pointshow77", this.pointsInput.description)

                        this.point_show = this.point_show + Number(this.pointsInput.description);
                        console.log("pointshow", this.point_show)
                        this.Total = sub;
                        this.globals.points_availed = this.pointsInput.points;
                        this.availed_points = Number(this.pointsInput.description);
                        this.Total = this.Total.toFixed(2);
                        // this.pointsInput = null;

                        this.user_availed_points = true;
                    }
                }
            }
        }

        if (this.check_rewards) {
            let tot = Number(this.Total);
            let sub = tot - this.StoreCreditInput;

            if (sub < this.globals.minimun_order || sub <= 0) {

                this.AddMoreItemAlert('Lottery reward credit cannot be availed.Please add more item in the cart.');

            }
            else {
                this.reward_amount -= this.RewardStoreCreditAvailed;
                this.RewardStoreCreditAvailed = Number(this.RewardStoreCreditAvailed) + Number(this.StoreCreditInput);
                console.log(this.RewardStoreCreditAvailed);
                this.Total = sub;
                this.Total = this.Total.toFixed(2)

            }

        }

        if (this.check_birthday) {
            let tot = Number(this.Total);
            let sub = tot - this.birthdayStoreCreditInput;

            if (sub < this.globals.minimun_order || sub <= 0) {

                this.AddMoreItemAlert('Birthday credit cannot be availed.Please add more item in the cart.');

            }
            else {
                this.birthday_amount -= this.birthdayStoreCreditavailed;
                this.Total = sub;
                this.birthdayStoreCreditavailed = Number(this.birthdayStoreCreditavailed) + Number(this.birthdayStoreCreditInput);
                console.log(this.birthdayStoreCreditavailed);
                this.Total = this.Total.toFixed(2)
            }
        }

    }

    AddMoreItemAlert(message) {
        let AddMoreItemAlert = this.alertCtrl.create({
            title: 'Oops',
            subTitle: message,
            buttons: ['Okay']
        });
        AddMoreItemAlert.present();
    }


    showExtras(extras) {
        console.log(extras);

        // let modal = this.modalCtrl.create('CartDetailPage',{product:extras});
        // modal.present();
        this.navCtrl.push('CartDetailPage', { product: extras })
    }

    addQuantity(object) {
        console.log(object);

        object.quantity += 1;

        let extra_total = 0
        if (object.menuExtrasSelected.length > 0) {
            for (let m of object.menuExtrasSelected) {
                for (let u of m.optionNameSelected) {
                    if (!u.isFree) {
                        extra_total = u.price * u.quantity;
                    }
                }
            }
        }
        object.totalPrice = (object.quantity * object.basePrice) + extra_total;
        this.total();

    }
    removeQuantity(object) {
        console.log(object);
        if (object.quantity <= 1) {
            object.quantity = 1;
        }
        else {
            object.quantity -= 1;

            let extra_total = 0
            if (object.menuExtrasSelected.length > 0) {
                for (let m of object.menuExtrasSelected) {
                    for (let u of m.optionNameSelected) {
                        console.log(u);

                        if (!u.isFree) {
                            extra_total = u.price * u.quantity;
                        }
                    }
                }
            }
            console.log(extra_total);

            object.totalPrice = (object.quantity * object.basePrice) + extra_total;
            this.total();
        }


    }


    closeKeyboard() {

        let activeElement = <HTMLElement>document.activeElement;
        activeElement && activeElement.blur && activeElement.blur();
    }

    percent_tip(tip) {
        this.tip_type = 'percent';
        this.percent_tip_vlaue = tip;
        if (tip) {
            this.Total = Number(this.Total) - Number(this.Tip);

            this.per_tip = ((Number(this.ProductsTotal) / 100) * tip).toFixed(2);
            this.Tip = this.per_tip;
            this.Total = (Number(this.Total) + Number(this.per_tip)).toFixed(2);
        }


    }

    percent_tip_(tip) {
        this.tip_type = 'percent';
        this.percent_tip_vlaue = tip;
        if (tip) {
            this.per_tip = ((Number(this.ProductsTotal) / 100) * tip).toFixed(2);
            this.Tip = this.per_tip;
            this.Total = (Number(this.Total) + Number(this.per_tip)).toFixed(2);
        }


    }


    add_gratuity() {
        this.tip_type = 'manual';

        let alert = this.alertCtrl.create({
            title: 'Add Gratuity',
            inputs: [
                {
                    name: 'tip',
                    placeholder: 'Tip',
                    type: 'number',
                    value: this.Tip
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: data => {
                        data.tip = Math.abs(Number(data.tip));
                        console.log("Tip here >>> ", data);
                        if (data.tip == '') {
                            this.Tip = 0;
                            this.total();
                        }
                        else {
                            this.Total = this.Total - Number(this.Tip);
                            this.Tip = data.tip;
                            this.tip_cus = data.tip;
                            this.Total = (Number(this.Total) + Number(this.Tip)).toFixed(2);
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    showCCFeeMessage(){
        this.globals.presentToast(this.globals.ccFeeDisclaimer)
    }

    add_notes() {
        let alert = this.alertCtrl.create({
            title: 'Add Notes',
            inputs: [
                {
                    name: 'notes',
                    placeholder: 'Notes',
                    value: this.notes
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: data => {
                        this.notes = data.notes;
                    }
                }
            ]
        });
        alert.present();
    }

    utensils_alert(){
        let alert = this.alertCtrl.create();
        alert.setTitle('Add utensils?');
        this.utensils_array.forEach(e => {
            alert.addInput({
                type: 'radio',
                label: e.type,
                value: e.type,
                checked: e.selected
            });
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                if(data == 'Yes'){
                    this.utensils_array.forEach(e => {
                        if(e.type == 'Yes'){
                            e.selected = true;
                            this.utensils_note = "Add Utensils: Yes"; 
                        } 

                        if(e.type == 'No'){
                            e.selected = false;
                        }
                    });
                } else {
                    this.utensils_array.forEach(e => {
                        if(e.type == 'Yes'){
                            e.selected = false;
                            this.utensils_note = '';
                        } 

                        if(e.type == 'No'){
                            e.selected = true;
                        }
                    });
                }
            }
        });
        alert.present();
    }

    add_points() {
        let alert = this.alertCtrl.create();
        alert.setTitle(this.points + ' Points');

        this.point_rewards.forEach(e => {
            alert.addInput({
                type: 'radio',
                label: '$' + e.description + ' (' + e.points + ' Points)',
                value: e,
                disabled: e.availed
            });
        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                var p = this.point_rewards.filter(function (item) {
                    return item.availed === false;
                });

                if (p.length > 0) {
                    this.pointsInput = data;
                    this.check_points = true;
                    this.AvailRewards();
                }

            }
        });
        alert.present();
    }

    my_gift_cards() {

        let response = this.server.my_gift_cards();
        response.subscribe(data => {
            this.mygifts = data;


        }, error => {
            this.globals.presentToast("Something went wrong check your internet connection.")

        });
    }

    gift_alert() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Select Giftcard');

        this.mygifts.forEach(e => {
            alert.addInput({
                type: 'radio',
                label: '$' + e.amount,
                value: e,
            });

        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                if (data) {
                    if (Number(data.amount) > Number(this.Total)) {
                        this.full_reddem_or_partial(data);
                    }
                    else {
                        this.partial_redeem(data)
                    }
                }


            }
        });
        alert.present();
    }

    full_reddem_or_partial(data) {
        let alert = this.alertCtrl.create({
            title: 'Giftcard',
            message: 'Would you like to use your gift card for entire order?',
            buttons: [
                {
                    text: 'No',

                    handler: () => {
                        this.partial_redeem(data)
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.full_redeem(data)
                    }
                }
            ]
        });
        alert.present();
    }

    full_redeem(data) {
        let alert = this.alertCtrl.create({

            message: 'Are you sure you want to place order and pay all with giftcard?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        if (this.globals.OrderType == 'delivery') {
                            if (this.ProductsTotal < this.globals.minimun_order) {
                                this.globals.presentToast("Please add more items in cart.")
                            }
                            else {
                                if (this.globals.inradius) {
                                    var giftdata = { giftcard_id: data.giftcard_id, amount: this.Total }
                                    this.gift_array.push(giftdata)
                                    this.navCtrl.push('PaymentPage', {ccFee:this.ccFee, amount: 0, giftcard: this.gift_array, gift_flag: true, tax: this.tax_calc })
                                }
                                else {
                                    this.globals.presentToast("Sorry, We dn't deliver in Your Area")
                                }
                            }

                        }
                        else {
                            var giftdata = { giftcard_id: data.giftcard_id, amount: this.Total }
                            this.gift_array.push(giftdata)
                            this.navCtrl.push('PaymentPage', {ccFee:this.ccFee, amount: 0, giftcard: this.gift_array, gift_flag: true, tax: this.tax_calc })
                        }


                    }
                }
            ]
        });
        alert.present();
    }

    partial_redeem(data_gift) {
        let alert = this.alertCtrl.create({
            title: 'Enter amount you want to pay from giftcard.',
            inputs: [
                {
                    name: 'amount',
                    placeholder: 'Amount'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Pay',
                    handler: data => {
                        if (Number(data_gift.amount) < Number(data.amount)) {
                            this.globals.presentToast("You enter amount greater than your giftcard")
                        }
                        else {
                            if (Number(data.amount) > Number(this.Total)) {
                                this.globals.presentToast("Please Enter More items in cart")
                            }
                            else {
                                this.Total = (Number(this.Total) - Number(data.amount)).toFixed(2);
                                this.mygifts.map(
                                    (checkitem, i, array) => {
                                        if (checkitem.giftcard_id == data_gift.giftcard_id) {
                                            checkitem.amount = Number(checkitem.amount) - Number(data.amount)
                                        }
                                    }
                                );
                                var not_in_array = true;
                                this.gift_array.forEach(e => {
                                    if (e.giftcard_id == data_gift.giftcard_id) {
                                        e.amount = Number(e.amount) + Number(data.amount);
                                        not_in_array = false;
                                        console.log("gifts_array", this.gift_array, this.mygifts)

                                    }

                                });

                                if (not_in_array) {
                                    var giftdata = { giftcard_id: data_gift.giftcard_id, amount: data.amount }
                                    this.gift_array.push(giftdata);
                                    console.log("gifts_array", this.gift_array, this.mygifts)

                                }
                                this.gift_card_amount = 0;
                                this.gift_array.forEach(e => {
                                    this.gift_card_amount = this.gift_card_amount + Number(e.amount)

                                });


                            }
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    checkTiming(timing) {
        if (this.globals.order_time == 'schedule') {
            if (this.globals.specific_delivery_day == 'true') {
                return true;
            }

            var day = this.globals.schedule_day_id + 1;
            if (day == 7) {
                day = 0;
            }

            var time = this.globals.schedule_converted_time;
            var current_day = timing[day];

            var n = current_day[0].indexOf('.');
            if (n != -1) {
                var res = current_day[0].split(".");
                current_day[0] = res[0] + '.' + '3'
            }
            var n1 = current_day[1].indexOf('.');
            if (n1 != -1) {
                var res = current_day[1].split(".");
                current_day[1] = res[0] + '.' + '3'
            }
            if ((Number(current_day[0]) <= time && Number(current_day[1]) > time) || (Number(current_day[0]) <= time && Number(current_day[1]) < Number(current_day[0]))) {

                return true;

            }
            else if (current_day[0] == 'opened' && current_day[1] == 'opened') {

                return true;

            }
            else {
                this.globals.presentToast('Sorry, we are not serving at this time!')

                return false;
            }


        }
        else {

            var date = new Date();
            var day: any = date.getDay();
            var time: any = date.getHours() + "." + date.getMinutes();
            time = Number(time);

            var current_day = timing[day];

            var n = current_day[0].indexOf('.');
            if (n != -1) {
                var res = current_day[0].split(".");
                current_day[0] = res[0] + '.' + '3'
            }
            var n1 = current_day[1].indexOf('.');
            if (n1 != -1) {
                var res = current_day[1].split(".");
                current_day[1] = res[0] + '.' + '3'
            }

            if ((Number(current_day[0]) <= time && Number(current_day[1]) > time) || (Number(current_day[0]) <= time && Number(current_day[1]) < Number(current_day[0]))) {
                return true;
            }
            else if (current_day[0] == 'opened' && current_day[1] == 'opened') {
                return true;
            }
            else {
                this.globals.presentToast('Sorry, we are not serving at this time!')

                return false;
            }
        }

    }

    add_reward() {
        this.globals.BusinessID = '-1';
        this.navCtrl.push('MyRewardsPage', { reward_type_home: 'reward' })
    }

    toastTip(){
        let toast = this.toastCtrl.create({
            message: 'Our staff works on gratuity (tips). Thanks',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }



}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { CategoryPage } from "../category/category";
import { ServerProvider } from "../../providers/server/server";
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {
  flag: boolean = true;
  noExtras: boolean;
  buttonDisabled: boolean;
  No_of_Free_Extras: any;
  thumbimage: any;
  index: number;
  isexist: boolean = false;
  date: Date;
  time: any;
  day: any;
  CurrentBusinessDiscount: any;
  totalCost: any = 0;
  extratotal: any = 0;
  objectPrice: any = 0;

  myList: any;
  //options: any;

  checkstatus: boolean;
  extras: any;
  Business_id: any;
  description: any;
  bannerimage: any;
  data: any;
  ItemId: any;
  tagline: any;
  price: any;
  name: any;
  image: any;
  quantity: number = 1;
  myChoices: any = [];
  array_index: any = [];
  checked: boolean;
  options: any[]
  op: any[];
  temp: any[] = new Array();
  checkedItems: boolean[];
  extraChecked: boolean = false;
  instructions : any;
  item_price:any = 0;
  constructor(private photoViewer: PhotoViewer,public server: ServerProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public globals: GlobalVariable, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {

    this.thumbimage = navParams.get('image');
  
    // this.name = navParams.get('Name');  
    // this.price = navParams.get('Price');
    
   
    this.ItemId = navParams.get('item_id');
    this.Business_id = navParams.get('BusinesId');


    // this.globals.BusinessID = this.Business_id;
    this.itemDetails();
  }

  ionViewDidLoad() {

  }
  presentModal() {
    let modal = this.modalCtrl.create('InstructionModalPage');
    modal.present();
  }

  image_show(image){
    this.photoViewer.show(image, '', {share: true});
  }

  cartpage() {

    //  let cartmodel = this.modalCtrl.create('CartPage');
    // cartmodel.present();
    if (this.globals.Product.length == 0) {
      let alert = this.alertCtrl.create({
        title: "Oops",
        message: "Your cart is empty.",
        buttons: ["Okay"]

      });
      alert.present();
    }
    else {
      this.navCtrl.push('CartPage');
     
    }
  }



  checkTiming() {
    this.date = new Date();
    this.day = this.date.getDay();
    this.time = this.date.getHours()+ "." + this.date.getMinutes();
    this.time = Number(this.time);

    var current_day = this.globals.Timing[this.day];
    console.log(current_day,"cd")
    if((Number(current_day[0]) <= this.time && Number(current_day[1]) > this.time) || (Number(current_day[0]) <= this.time && Number(current_day[1]) < Number(current_day[0])) || (current_day[1] == 'opened' && current_day[1] == 'opened')){
    // if (this.time < current_day[0] || this.time >= current_day[1]) {
      return true;
      
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Sorry',
        subTitle: 'Restaurants currently closed.',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
  }

  addQuantity() {
    this.quantity += 1;
    var m_price = 0;
    this.myChoices.forEach(element => {
      element.optionNameSelected.forEach(subelement => {
        m_price = m_price + subelement.price;
      });
    });

    this.item_price = ((m_price * this.quantity) + (this.price * this.quantity)).toFixed(2);

  }

  removeQuantity() {
    var m_price = 0;
    if (this.quantity <= 1) {
      this.quantity = 1;
    }
    else {
      this.quantity -= 1;
    }

    this.myChoices.forEach(element => {
      element.optionNameSelected.forEach(subelement => {
        m_price = m_price + subelement.price;
      });
    });

    this.item_price = ((m_price * this.quantity) + (this.price * this.quantity)).toFixed(2);
   

  }


  addOptionQuantity(heading, object) {

    object.quantity += 1;
    var value1 = this.myChoices.indexOf([object]);
    this.myChoices.splice(value1, 1);

    var data = { heading: heading, optionNameSelected: [{ name: object.name, price: Number(object.price), quantity: object.quantity, total: Number(object.price) * object.quantity, isFree: false }] }
    this.myChoices.push(data);


  }
  removeOptionQuantity(heading, object) {
    if (object.quantity <= 1) {
      object.quantity = 1;
    }
    else {
      object.quantity -= 1;
      var value1 = this.myChoices.indexOf([object]);
      this.myChoices.splice(value1, 1);
      var data = { heading: heading, optionNameSelected: [{ name: object.name, price: Number(object.price), quantity: object.quantity, total: Number(object.price) * object.quantity, isFree: false }] }
      this.myChoices.push(data);
    }


  }

  Cart() {

    if (this.globals.BusinessID == '-1' || this.globals.BusinessID == this.Business_id) {
      this.globals.BusinessID = this.Business_id;
      this.AddtoCart();

    }
    else {
      this.showPrompt();

    }

  }


  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Warning!',
      message: "Are you sure you want to switch Restaurant? This will clear your current cart.",

      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OKAY',
          handler: data => {
            this.globals.Product.length = 0;
            this.globals.BusinessID = this.Business_id;
            this.globals.BusinessDiscount = this.CurrentBusinessDiscount;
            this.AddtoCart();

          }
        }
      ]
    });
    prompt.present();
  }


  AddtoCart() {
    if(!this.checkTiming()){
      return;
    }
    let cartAdditionLoader = this.loadingCtrl.create(
      {
        content: "Adding...",
      }
    );
    console.log(this.globals.Product);
    let areAllCategoryCountsFound: boolean = false;
    let totalCategoriesCount: number = 0;
    let categoryCount: number = 0;
    if (this.extras) {
      for (let i = 0; i < this.extras.length; i++) {
        if (this.extras[i].min != '' && Number(this.extras[i].min) > 0) {
          totalCategoriesCount++;
        }
      }
      for (let e = 0; e < this.extras.length; e++) {
        for (let c = 0; c < this.myChoices.length; c++) {
          if (this.extras[e].heading == this.myChoices[c].heading) {
            console.log("if");
            if (this.extras[e].min != '' && Number(this.extras[e].min) > 0 &&
              this.myChoices[c].optionNameSelected.length >= Number(this.extras[e].min)) {
              console.log("inner if");
              categoryCount++;
              break;
            }
          }
        }
      }
    }
    if (categoryCount == totalCategoriesCount) {
      areAllCategoryCountsFound = true;
    }


    if (areAllCategoryCountsFound) {

      let isMenuItemSame: boolean = false;
      this.globals.Product.forEach(menuItem => {
        if (menuItem.uniqueId == this.ItemId) {
          if(this.instructions == '' && menuItem.instructions == ''){
            let menuExtraCategoryLength: any = menuItem.menuExtrasSelected.length;
            if (menuExtraCategoryLength == this.myChoices.length) {
              let isMenuItemExtraCategoriesCount: any = 0;
              for (let i = 0; i < menuExtraCategoryLength; i++) {
                for (let j = 0; j < this.myChoices.length; j++) {
                  if (menuItem.menuExtrasSelected[i].heading == this.myChoices[j].heading) {
                    // isMenuItemExtraCategoriesCount++;
                    let currentExtraCategoryOptionsLength: any = menuItem.menuExtrasSelected[i].optionNameSelected.length;
                    if (currentExtraCategoryOptionsLength == this.myChoices[j].optionNameSelected.length) {
                      let isMenuItemExtraCategoriesItemCount: any = 0;
                      for (let k = 0; k < currentExtraCategoryOptionsLength; k++) {
                        for (let m = 0; m < this.myChoices[j].optionNameSelected.length; m++) {
                          if (menuItem.menuExtrasSelected[i].optionNameSelected[k].name == this.myChoices[j].optionNameSelected[m].name
                            && menuItem.menuExtrasSelected[i].optionNameSelected[k].quantity == this.myChoices[j].optionNameSelected[m].quantity) {
                            isMenuItemExtraCategoriesItemCount++;
                            break;
                          }
                        }
                      }
                      if (isMenuItemExtraCategoriesItemCount == currentExtraCategoryOptionsLength) {
                        isMenuItemExtraCategoriesCount++;
                        break;
                      }
                    }
                    // break;
                  }
                }
              }
              if (isMenuItemExtraCategoriesCount == menuExtraCategoryLength) {
                isMenuItemSame = true;
              }
            }
          }
        }
      });
      if (isMenuItemSame) {
        for (let i = 0; i < this.globals.Product.length; i++) {
          if (this.name == this.globals.Product[i].menuItem) {
            let currentQuantity = this.globals.Product[i].quantity;
            currentQuantity += this.quantity;
            let current_total = this.quantity * this.price;
            this.globals.Product[i].quantity = currentQuantity;
            this.globals.Product[i].totalPrice += current_total;
            break;
          }
        }
        this.navCtrl.pop();

      }
      else {
        this.totalCost = this.quantity * this.price;
        let i = 1;


        for (let sub of this.myChoices) {
          for (let op of sub.optionNameSelected) {

            if (Number(this.No_of_Free_Extras) >= 1) {
              if (op.quantity > 1) {
                let prod_quantity = op.quantity;

                for (let j = prod_quantity; j > 0; j--) {

                  if (this.No_of_Free_Extras >= 1) {
                    prod_quantity = prod_quantity - 1;
                    this.No_of_Free_Extras--;
                    this.extratotal = 0;
                  }
                  else {
                    this.extratotal = this.extratotal + op.price;
                  }
                }
                if (prod_quantity == 0) {
                  op.isFree = true;
                }
                // var remain = Number(this.No_of_Free_Extras) - i;
                // var new_qantity = op.quantity - remain;
                // this.extratotal = new_qantity*op.price;
              
                op.quantity = prod_quantity;

              }
              else {
                this.extratotal = 0;
                op.isFree = true;
                this.No_of_Free_Extras--;
              }
            }
            else {
            
              this.extratotal += op.quantity * op.price;
            }
            i = i++;


          }
        }
        // this.objectPrice = this.totalCost + this.extratotal;
        this.objectPrice = Number(this.item_price);

        this.objectPrice.toFixed(2);
        this.instructions = localStorage.getItem("instructions");
        this.globals.itemInstruction = this.instructions;
        this.globals.Product.push({ menuId: "1", restId: this.globals.bussinessId, uniqueId: this.ItemId, menuItem: this.name, image: this.thumbimage, quantity: this.quantity, itemInstructions: this.instructions, basePrice: this.price, totalPrice: this.objectPrice, menuExtrasSelected: this.myChoices });
        this.navCtrl.pop();
        localStorage.removeItem("instructions");
        console.log("checking remove local storage ", localStorage.getItem("instructions"));
      }
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Please select the required extras.',
        buttons: ['OK']
      });
      alert.present();
    }
  }



  itemDetails() {

    //   this.data =   this.server.getCategories();
    //   console.log("array",this.data)
    let loading = this.loadingCtrl.create({
      content: "loading...",

    });
    loading.present();

    let response = this.server.ProductItemDetail(this.ItemId);

    response.subscribe(data => {
      this.data = data;
      // console.log(this.data.categories);
      loading.dismiss();
     
      this.bannerimage = this.data.item.image;

      this.description = this.data.item.description;
      this.name = this.data.item.name;
      this.globals.title = this.name;
      this.image = this.data.item.image;
      this.price = this.data.item.price;
      this.item_price = this.price;
      this.No_of_Free_Extras = Number(this.data.item.freeExtras);

      if (this.data.item.extras.length > 0) {
        var noExtras = false;
        this.extras = this.data.item.extras;
        this.extras.forEach(element => {
          if (element.heading == '') {
            element.options.forEach(element1 => {
              if (element1.name == '') {
                noExtras = true
              }
              else {
                noExtras = false;
              }
            });
          }
        });
        this.noExtras = noExtras;
      }
      //  this.checkedItems = new Array(this.extras.options.length);
      console.log(this.extras, "extras");


      console.log("option", this.options)

      // console.log(this.data.restaurant.categories);
      // console.log(this.category);
    }
      , error => {
        console.log("Error!");

      });
  }


  Selectedoption(heading, op, a, i, max, event) {

    console.log("3 Params ", heading, op, max);
    // console.log("op", op.IsSelected);
    var checked = false;
    let flag: boolean = false;

    if (op.IsSelected) {
      //console.log(parseInt(op.price));
      // var data = { heading: heading, optionNameSelected: [{ name: op.name, price: Number(op.price), quantity: op.quantity, total: Number(op.price) * op.quantity, isFree: false, selected: op.IsSelected }] }

      let same: boolean = false

      for (let m = 0; m < this.myChoices.length; m++) {

        if (this.myChoices[m].heading == heading) {
          same = true;
          // var outer = this.array_index[0].outer_index;
          //console.log(this.myChoices[m].heading);
          console.log(max);
          if (max == '') {
            max = 1000;
          }

          if (this.myChoices[m].optionNameSelected.length >= Number(max)) {
            this.flag = true;
            console.log("length greater", this.myChoices[m].optionNameSelected.length, max);
            op.IsSelected = false;
            event.checked = false;

            // let alert = this.alertCtrl.create({
            //   title: "Oops",
            //   message: "You have added max number of extras",
            //   buttons: [
            //     {
            //       text: 'Okay',
            //       handler: data => {


            //         this.flag = false;
            //         console.log(flag);
            //       }
            //     }
            //   ]

            // });
            // alert.present();

            let toast = this.toastCtrl.create({
              message: 'Oops !! You have added max number of extras',
              duration: 2000,
              position: 'bottom'
            });
          
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
              this.flag = false;
              console.log(flag);
            });
          
            toast.present();
          }

          else {
            this.myChoices[m].optionNameSelected.push({ name: op.name, price: Number(op.price), quantity: 1, total: Number(op.price) * op.quantity, isFree: false, selected: op.IsSelected })
            this.item_price = (Number(this.item_price) + (Number(op.price) * this.quantity)).toFixed(2);
            console.log("myprice",this.item_price)
            this.flag = false;
            break;
          }
        }

      }
      if (!same) {
        console.log("not same");

        
        var data = { heading: heading, optionNameSelected: [{ name: op.name, price: Number(op.price), quantity: op.quantity, total: Number(op.price) * op.quantity, isFree: false, selected: op.IsSelected }] }
        console.log("myprice",this.item_price,op.price,this.quantity)
        
        this.item_price = (Number(this.item_price) + (Number(op.price) * this.quantity)).toFixed(2);
        
        this.myChoices.push(data);
        this.flag = false;
      }
      console.log(data);
      console.log("mychoice_array", this.myChoices);
    }
    else {
      // if(!this.extraChecked){
      //   console.log("else");
      //   console.log(this.array_index);

      //   var index_data = {outer_index:a,inner_index:i}
      //   var val = this.array_index.indexOf([index_data]);
      //   this.array_index.splice(val,1);
      console.log(op, "ELSE");
      console.log(this.flag, "flag");
      if (this.flag == false) {
        var value = this.myChoices.findIndex(function (item, i) {
          return item.heading === heading
        });
        console.log(value);

        if (this.myChoices[value].optionNameSelected.length > 1) {
          console.log("IF");
          console.log(op);

          this.myChoices[value].optionNameSelected.map(
            (checkitem, i, array) => {
              console.log(checkitem, i, array);

              if (checkitem.name == op.name) {
                array.splice(i, 1);
              }

            }
          );

          // var optionindex = this.myChoices[value].optionNameSelected.findIndex(function(item, i){
          //   return item.name === op.name
          // });
          // console.log(optionindex,"optionindex");

          // this.myChoices = this.myChoices[value].optionNameSelected.splice(optionindex,1)
        }
        else {
          console.log("ELSE", value);
          //  this.myChoices =  this.myChoices.splice(value,1);
          this.myChoices.map(
            (checkitem, i, array) => {
              console.log(checkitem, i, array);

              if (checkitem.heading == heading) {
                array.splice(i, 1);
              }
            }
          );
        }
      }
      console.log(this.myChoices);
      console.log("Item $ ", this.item_price);
      console.log("op $ ", op.price);
      console.log("Quantity $ ", this.quantity);
      
      if(this.flag == true){
        console.log("No calculate ");
      }else{
        this.item_price = (Number(this.item_price) - (Number(op.price) * this.quantity)).toFixed(2);
      }

      // }
      // else{
      // this.extraChecked = false;
      // var value1 = this.myChoices.indexOf([op]);
      // console.log(value1);
      // this.myChoices.splice(0,1);
      // console.log(this.myChoices);
      //}
    }
  }

}



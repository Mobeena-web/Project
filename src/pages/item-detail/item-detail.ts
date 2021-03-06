import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { CategoryPage } from "../category/category";
import { ServerProvider } from "../../providers/server/server";
import { PhotoViewer } from '@ionic-native/photo-viewer';


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

  totalCost: any = 0;
  extratotal: any = 0;
  objectPrice: any = 0;

  myList: any;
  id: any;

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
  instructions: any;
  item_price: any = 0;
  reward_item_flag: boolean = false;
  reward_id: any;
  type: boolean = true;
  stock_quantity: any;
  itemShowFlag: boolean = false;
  optionitemArray: any;
  upSellItem_array = [];
  price_temp : any;
  extraitemPrice : any = 0;
  requiredExtras : any=[];
  requiredtemp : boolean;
  attributeId : any;

  constructor(private photoViewer: PhotoViewer, public server: ServerProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public globals: GlobalVariable, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
    this.reward_item_flag = navParams.get('reward_flag');
    if (!this.reward_item_flag) {
      this.reward_item_flag = false;
    }
    if (this.reward_item_flag) {
      if (!this.globals.OrderType) {
        this.presentModal1();
      }
    }
    this.reward_id = navParams.get('reward_id')
    this.thumbimage = navParams.get('image');

    this.ItemId = navParams.get('item_id');
    this.Business_id = navParams.get('BusinesId');
    this.type = navParams.get('type');

    this.itemDetails();
  }

  presentModal1() {
    let modal = this.modalCtrl.create('ModalPage');
    modal.present();
  }

  openOptionDetail(list, event, i) {
    if (this.optionitemArray) {
      if (list.heading == this.optionitemArray.heading) {
        this.itemShowFlag = false;
        this.optionitemArray = null;
      } else {
        this.itemShowFlag = true;
        this.optionitemArray = list;
      }
    } else {
      this.itemShowFlag = true;
      this.optionitemArray = list;
    }
  }


  presentModal() {
    let modal = this.modalCtrl.create('InstructionModalPage', { instructions: this.instructions });
    modal.present();
    modal.onDidDismiss((data) => {
      this.instructions = data;
      console.log("instructions from modal", this.instructions);
    });
  }

  image_show(image) {
    this.photoViewer.show(image, '', { share: true });
  }

  cartpage() {
    if (this.globals.Product.length == 0) {
      let alert = this.alertCtrl.create({
        title: "Oops",
        message: "Your cart is empty.",
        buttons: ["Okay"]
      });
      alert.present();
    } else {
      this.navCtrl.push('CartPage');
    }
  }

  addQuantity() {
// author: zohra
// purpose : total sum of extras
// used in app
// created : old
// last_modified: 2020-12-23 05:00
// status: active old
    if (this.quantity < this.stock_quantity) {
      this.quantity += 1;
      // var m_price = 0;
      // this.myChoices.forEach(element => {
      //   element.optionNameSelected.forEach(subelement => {
      //     m_price = m_price + subelement.price;
      //   });
      // });

      this.item_price = ((this.extraitemPrice * this.quantity) + (this.price * this.quantity)).toFixed(2);
    } else {
      this.globals.presentToast("You have selected max. limit of item.")
    }
  }

  removeQuantity() {
// author: zohra
// purpose : total sum of extras
// used in app
// created : old
// last_modified: 2020-12-23 05:00
// status: active old
    // var m_price = 0;
    if (this.quantity <= 1) {
      this.quantity = 1;
    } else {
      this.quantity -= 1;
    }

    // this.myChoices.forEach(element => {
    //   element.optionNameSelected.forEach(subelement => {
    //     m_price = m_price + subelement.price;
    //   });
    // });

    this.item_price = ((this.extraitemPrice * this.quantity) + (this.price * this.quantity)).toFixed(2);
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
    } else {
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
    } else {
      this.showPrompt();
    }
  }

  showPrompt() {
    this.globals.Product.length = 0;
    this.globals.BusinessID = this.Business_id;
    this.AddtoCart();
  }

  AddtoCart() {
    let cartAdditionLoader = this.loadingCtrl.create({
      content: "Adding...",
    });

    let areAllCategoryCountsFound: boolean = false;
    let totalCategoriesCount: number = 0;
    let categoryCount: number = 0;
    if (this.extras) {
      for (let i = 0; i < this.extras.length; i++) {
        if (this.extras[i].min != '' && Number(this.extras[i].min) > 0) {
          totalCategoriesCount++;
          if(!this.requiredtemp){
          this.requiredExtras.push(this.extras[i].heading);
          }
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
          if (this.instructions == '' && menuItem.instructions == '') {
            let menuExtraCategoryLength: any = menuItem.menuExtrasSelected.length;
            if (menuExtraCategoryLength == this.myChoices.length) {
              let isMenuItemExtraCategoriesCount: any = 0;
              for (let i = 0; i < menuExtraCategoryLength; i++) {
                for (let j = 0; j < this.myChoices.length; j++) {
                  if (menuItem.menuExtrasSelected[i].heading == this.myChoices[j].heading) {

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

      } else {
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
                  } else {
                    this.extratotal = this.extratotal + op.price;
                  }
                }

                if (prod_quantity == 0) {
                  op.isFree = true;
                }
                op.quantity = prod_quantity;

              } else {
                this.extratotal = 0;
                op.isFree = true;
                this.No_of_Free_Extras--;
              }
            } else {
              this.extratotal += op.quantity * op.price;
            }
            i = i++;
          }
        }
        this.objectPrice = Number(this.item_price);

        this.objectPrice.toFixed(2);
        this.globals.itemInstruction = this.instructions;
        if (this.reward_item_flag == true) {
          var reward_duplicate = false;
          this.globals.Product.forEach(menuItem => {
            if (menuItem.reward_id == this.reward_id) {
              reward_duplicate = true;
            }

          });
          if (!reward_duplicate) {
            this.globals.Product.push({ menuId: "1", restId: this.globals.bussinessId, uniqueId: this.ItemId, menuItem: this.name, image: this.thumbimage, quantity: this.quantity, itemInstructions: this.instructions, basePrice: this.price, totalPrice: this.objectPrice, menuExtrasSelected: this.myChoices, menuUpsellItemsSelected: [], upsell_calculated: false, reward: this.reward_item_flag, reward_id: this.reward_id, tax: this.data.item.tax, tax_enabled: this.data.item.tax_enabled, discount_value: this.data.item.discount_value, discount_type: this.data.item.discount_type, attributeId:this.attributeId });
            this.globals.presentToast("Reward added in your cart")
            this.navCtrl.pop();
          } else {
            this.globals.presentToast("You have already add this reward in cart.")
            this.navCtrl.pop();
          }
        } else {
          this.globals.Product.push({ menuId: "1", restId: this.globals.bussinessId, uniqueId: this.ItemId, menuItem: this.name, image: this.thumbimage, quantity: this.quantity, itemInstructions: this.instructions, basePrice: this.price, totalPrice: this.objectPrice, menuExtrasSelected: this.myChoices, menuUpsellItemsSelected: [], upsell_calculated: false, reward: this.reward_item_flag, reward_id: this.reward_id, tax: this.data.item.tax, tax_enabled: this.data.item.tax_enabled, discount_value: this.data.item.discount_value, discount_type: this.data.item.discount_type, attributeId:this.attributeId });
        }

        this.navCtrl.pop();
        localStorage.removeItem("instructions");
        if (this.upSellItem_array.length > 0) {
          let modal = this.modalCtrl.create('UpSellItemModalPage', { place: this.globals.business_username, itemId: this.ItemId, upSellItems: this.upSellItem_array });
          modal.present();
        } else {

        }
      }
    } else {
      this.requiredtemp = true;
      this.globals.presentToast('Please select the required extras.'+ this.requiredExtras)
    }
  }

  itemDetails() {
    let loading = this.loadingCtrl.create({
      content: "loading...",
    });
    loading.present();

    let response = this.server.ProductItemDetail(this.ItemId);
    response.subscribe(data => {
      this.data = data;

      this.id = this.data.item.id;
      console.log('api response', this.data.item);

      loading.dismiss();

      this.bannerimage = this.data.item.image;
      this.description = this.data.item.description;
      this.name = this.data.item.name;
      this.globals.title = this.name;
      this.image = this.data.item.image;
      this.price = this.data.item.price;
      this.item_price = this.price;
      this.stock_quantity = this.data.item.stock_quantity;
      this.upSellItem_array = this.data.item.upsellItems;
      this.attributeId = this.data.item.attribute_id;

      if (this.reward_item_flag == true) {
        this.item_price = 0;
      }

      this.No_of_Free_Extras = Number(this.data.item.freeExtras);
      if (this.data.item.extras.length > 0) {
        var noExtras = false;
        this.extras = this.data.item.extras;
        if (this.reward_item_flag == true) {
          this.extras.forEach(extra_price => {
            if (Number(extra_price.min) > 0) {
              extra_price.options.forEach(ex => {
                ex.price = 0;
              });
            }
          });
        }

        this.extras.forEach(extra_items => {
          extra_items.options.forEach(item => {
            if (item.in_stock) {
              item.disable_item = false;
            } else {
              item.disable_item = true;
            }
          });
        });

        this.extras.forEach(element => {
          if (element.heading == '') {
            element.options.forEach(element1 => {
              if (element1.name == '') {
                noExtras = true
              } else {
                noExtras = false;
              }
            });
          }
        });
        this.noExtras = noExtras;
      }
    }, error => {
      console.log("Error!");
    });
  }

  total_price(){
// author: zohra
// purpose : total sum of items
// used in app
// created : 2020-12-21 06:00
// last_modified: 2021-01-05 11:40
// status: active 2020-12-21 06:00
    this.extraitemPrice = 0;
    this.item_price = (Number(this.globals.itemDetail.price) * this.quantity).toFixed(2);
    for(let c = 0; c < this.myChoices.length; c++){
      for(let b = this.myChoices[c].freeExtras ; b < this.myChoices[c].optionNameSelected.length ; b++){
        this.extraitemPrice = this.extraitemPrice+this.myChoices[c].optionNameSelected[b].price;
        this.item_price = (Number(this.item_price) + (Number(this.myChoices[c].optionNameSelected[b].price) * this.quantity)).toFixed(2);
      }
    }
  }

  Selectedoption(heading, op,freeExtras, a, i, max, event) {
    var checked = false;
    let flag: boolean = false;
    
    if(!freeExtras || freeExtras == 'null' || freeExtras == 'undefined' || freeExtras == '' ){
      freeExtras = 0;
    }
    if (op.IsSelected) {
      let same: boolean = false

      for (let m = 0; m < this.myChoices.length; m++) {

        if (this.myChoices[m].heading == heading) {
          same = true;
          console.log(max);
          if (max == '') {
            max = 1000;
          }

          if (this.myChoices[m].optionNameSelected.length >= Number(max)) {
            this.flag = true;
            op.IsSelected = false;
            event.checked = false;

            let toast = this.toastCtrl.create({
              message: 'Oops !! You have added max number of extras',
              duration: 2000,
              position: 'bottom'
            });
            this.flag = false;

            toast.present();
          } else {
            this.myChoices[m].optionNameSelected.push({ name: op.name, price: Number(op.price), quantity: 1, total: Number(op.price) * op.quantity, isFree: false, selected: op.IsSelected })
            this.total_price();
            // this.item_price = (Number(this.item_price) + (Number(op.price) * this.quantity)).toFixed(2);
            console.log("myprice", this.item_price)
            this.flag = false;
            break;
          }
        }
      }
      if (!same) {
        if (this.No_of_Free_Extras == 0) {
          var data = { heading: heading,freeExtras:freeExtras, optionNameSelected: [{ name: op.name, price: Number(op.price), quantity: op.quantity, total: Number(op.price) * op.quantity, isFree: false, selected: op.IsSelected }] }

          // this.item_price = (Number(this.item_price) + (Number(op.price) * this.quantity)).toFixed(2);
          

          this.myChoices.push(data);
          this.total_price();
          this.flag = false;
        } else {
          if (this.myChoices.length < this.No_of_Free_Extras) {
            var data = { heading: heading,freeExtras:freeExtras, optionNameSelected: [{ name: op.name, price: 0, quantity: op.quantity, total: 0, isFree: true, selected: op.IsSelected }] }
            this.myChoices.push(data);
            this.flag = false;
          } else {
            var data = { heading: heading,freeExtras:freeExtras, optionNameSelected: [{ name: op.name, price: Number(op.price), quantity: op.quantity, total: Number(op.price) * op.quantity, isFree: false, selected: op.IsSelected }] }

            // this.item_price = (Number(this.item_price) + (Number(op.price) * this.quantity)).toFixed(2);
           

            this.myChoices.push(data);
            this.total_price();
            this.flag = false;
          }
        }
      }
    } else {
      if (this.flag == false) {
        var value = this.myChoices.findIndex(function (item, i) {
          return item.heading === heading
        });

        if (this.myChoices[value].optionNameSelected.length > 1) {
          this.myChoices[value].optionNameSelected.map(
            (checkitem, i, array) => {
              console.log(checkitem, i, array);

              if (checkitem.name == op.name) {
                array.splice(i, 1);
                this.total_price();
                // this.item_price = (Number(this.item_price) - (Number(op.price) * this.quantity)).toFixed(2);
              }

            }
          );
        } else {
          if (this.myChoices.length > 0) {
            for (let i = 0; i < this.myChoices.length; i++) {
              if (this.myChoices[i].optionNameSelected[0].name == op.name) {
                if (this.myChoices[i].optionNameSelected[0].isFree) {

                } else {
                  this.total_price();
                  // this.item_price = (Number(this.item_price) - (Number(op.price) * this.quantity)).toFixed(2);
                }
              }
            }
          } else {

          }
          this.myChoices.map(
            (checkitem, i, array) => {
              console.log(checkitem, i, array);

              if (checkitem.heading == heading) {
                array.splice(i, 1);
                this.total_price();
              }
            }
          );
        }
      }

      if (this.flag == true) {

      } else {

      }
    }
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
      } else if (current_day[0] == 'opened' && current_day[1] == 'opened') {
        return true;
      } else {
        this.globals.presentToast('Sorry, we are not serving ' + this.globals.OrderType + ' at time you schedule!')
        return false;
      }
    } else {
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
      } else if (current_day[0] == 'opened' && current_day[1] == 'opened') {
        return true;
      } else {
        this.globals.presentToast('Sorry, we are not serving ' + this.globals.OrderType + ' at this time!')
        return false;
      }
    }
  }

  add_to_cart_timing_check() {
    if (this.globals.OrderType == 'delivery') {
      if (this.checkTiming(this.globals.delivery_timing)) {
        this.Cart();
      }
    } else {
      if (this.checkTiming(this.globals.pickup_timing)) {
        this.Cart();
      }
    }
  }

}



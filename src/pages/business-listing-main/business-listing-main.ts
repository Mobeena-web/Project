import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { GlobalVariable } from '../../app/global';

/**
 * Generated class for the BusinessListingMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-listing-main',
  templateUrl: 'business-listing-main.html',
})
export class BusinessListingMainPage {
  resList: any;
  places: any;
  searchRest: any;
  search: boolean = false;
  searchItems: any;
  status: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globals: GlobalVariable, public server: ServerProvider, public loadingCtrl: LoadingController) {
    // this.allaRestaurantsList();
    
    this.list();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllRestaurantListPage');
  }

  //   allaRestaurantsList() {
  //     let loading = this.loadingCtrl.create({
  //       content: "Loading...",
  //   });
  //   loading.present();

  //     let response = this.server.getAllRestaurantslist('100000', 'main', "0,0", '0', 'order');
  //         response.subscribe(data => {
  //           console.log(data)
  //           this.resList = data.results;
  //           loading.dismiss();

  //   }, error => {
  //     loading.dismiss();
  //     this.globals.presentToast("Something went wrong check your internet connection.")
  // });
  //   }

  orderNow(business) {
    // console.log(business_id)
    // this.globals.bussinessId = business_id;
    // this.globals.new_id = business_id;
    // this.list();
    // if (this.globals.branch_enabled == 1) {
    //   this.navCtrl.push('ResturantListPage')
    // } else {
    //   this.navCtrl.push('CategoryPage')
    // }
    this.navCtrl.push('CategoryPage', {businessData: business});
  }

  setFilteredRest() {

    this.search = true;

    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loading.present();

    console.log("Search rest", this.searchRest);
    loading.dismiss();
    if (this.searchRest != "") {
      loading.dismiss();
      this.searchItems = this.filterItems(this.searchRest);
      console.log("After Search ", this.searchItems);
    }
    else if (this.searchRest == "") {
      this.status = false;
      this.searchItems = [];
    }

  }

  filterItems(searchTerm) {
    return this.resList.filter((item) => {
      console.log("Item ", item);
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  emptySearch() {
    this.search = false;
    this.status = false;
    this.searchItems = [];
  }

  list() {
    let loading = this.loadingCtrl.create({
      content: "Fetching Data...",
    });
    loading.present();
    let response = this.server.getRestaurantslist('100000', 'main', "0,0", '0', 'order');
    response.subscribe(data => {
      loading.dismiss();
      this.places = data.results;
      this.globals.business_list = data.results;
      this.resList = data.results;
    }, error => {
      loading.dismiss();
      this.globals.presentToast("Something went wrong check your internet connection.")
    });
  }

}

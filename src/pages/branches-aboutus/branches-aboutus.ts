import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { GlobalVariable } from '../../app/global';
import { InAppBrowser } from '@ionic-native/in-app-browser';
@IonicPage()
@Component({
  selector: 'page-branches-aboutus',
  templateUrl: 'branches-aboutus.html',
})
export class BranchesAboutusPage {
  places:any;
  social_links:any;

  constructor(public loadingCtrl: LoadingController,private iab: InAppBrowser,public navCtrl: NavController, public navParams: NavParams,public globals: GlobalVariable,public server: ServerProvider) {
    this.resturant_list();
    this.get_social();

  }

 

  resturant_list(){
    let loading = this.loadingCtrl.create({
      content: "please wait...",
    });
    loading.present();
    let response = this.server.getRestaurantslist('100000', 'branches', '0,0', '100', 'order');

    response.subscribe(data => {
        loading.dismiss();
        this.places = data.results;
      
    }, error => {
    });
  }
  branch_about(name,business_id,hours_operation,latitude,longitude,username){
    this.navCtrl.push('AboutusPage',{name:name,business_id:business_id,hours_operation:hours_operation,latitude:latitude,longitude:longitude,username:username})
  }

  get_social() {
    let response = this.server.get_social();
    response.subscribe(data => {
     this.social_links = data.data;

    }, error => {
        console.log(error);

    });
 
}

launch(url) {
  console.log("url function");
  console.log(url);
  this.iab.create(url, "_self");

}

}

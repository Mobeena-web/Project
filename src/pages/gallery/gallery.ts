import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { GlobalVariable } from '../../app/global';
import { ServerProvider } from '../../providers/server/server';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import {Platform} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  images:any;
  errorMenu:boolean = false;
  constructor(public loadingCtrl: LoadingController,public server: ServerProvider, public global: GlobalVariable,public navCtrl: NavController, public navParams: NavParams,private photoViewer: PhotoViewer, public platform: Platform) {
    this.get_gallery()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

  get_gallery() {
    let loading = this.loadingCtrl.create({
        content: "Loading...",
    });
    loading.present();

    let response = this.server.gallery_list();
    response.subscribe(data => {
        loading.dismiss();

        console.log("gallery",data);
        this.images = data.data.blogs;
        
        if(this.images.length == 0){
          this.errorMenu = true;
        }
        else{
          this.errorMenu = false;
        }
    
    }, error => {
        this.global.alertMessage("Failure","Something went wrong check your internet connection.")

    });
}

  image_show(image){

    if (this.platform.is("ios")) {
      image = decodeURIComponent(image);
    }

    // this.photoViewer.show(url, title, options);
  
    this.photoViewer.show(image, '', {share: true});
  }

}

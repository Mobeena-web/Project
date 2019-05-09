import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the InstructionModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-instruction-modal',
  templateUrl: 'instruction-modal.html',
})
export class InstructionModalPage {
  instructions:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {

  }
  close(){
    this.viewCtrl.dismiss();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstructionModalPage');
  }
  
  saveInstruct(){
    localStorage.setItem("instructions",this.instructions);
    console.log("istruc",localStorage.getItem("instructions")) ;
    this.viewCtrl.dismiss();
    
  }

  cancelInstructions(){
    this.viewCtrl.dismiss();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { GlobalVariable } from '../../app/global';

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
  instr : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, public globals: GlobalVariable) {
//console.log(this.id == this.globals.menu_item_arr[i].ID)

console.log('modal IDs',this.globals.menu_item_arr)
console.log(this.globals.menu_item_arr.length);

// for(var i=0; i < this.globals.menu_item_arr.length ; i++){
//   console.log('loopppp')
//   //console.log(this.globals.menu_item_id == this.globals.menu_item_arr[i].ID)
//   if(this.globals.menu_item_id == this.globals.menu_item_arr[i].ID){
//     console.log('true')
//   }
//   else{
//     console.log('false');
//   }
  }
  close(){
    this.viewCtrl.dismiss();
}

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad InstructionModalPage');
    console.log(this.globals.menu_item_id);
    this.instr = localStorage.getItem("instructions");
    console.log('i',this.instr);

  }
  
  saveInstruct(){
    localStorage.setItem("instructions",this.instructions);
    console.log("instruc",localStorage.getItem("instructions")) ;
  

    this.viewCtrl.dismiss();
    
  }

  cancelInstructions(){
    this.viewCtrl.dismiss();
  }

}

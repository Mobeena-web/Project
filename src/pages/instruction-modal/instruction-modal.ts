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

    console.log('IDs...',this.globals.menu_item_arr);
    console.log(this.globals.menu_item_arr.length);
    console.log(this.globals.menu_id);
   
   
   for(var i=0; i < this.globals.menu_item_arr.length ; i++){
   
    console.log('loopppp')
    console.log(this.globals.menu_item_arr[i].ID);
    console.log(this.globals.menu_id);
    // console.log(this.globals.menu_item_id == this.globals.menu_item_arr[i].ID)
     if(this.globals.menu_id == this.globals.menu_item_arr[i].ID){
       console.log('trueeeeee')
       this.instr = this.globals.menu_item_arr[i].INST;
       console.log('i',this.instr);
    }
     else{
      console.log('falseeeeeeeee');
     }
   }
  }
  close(){
    this.viewCtrl.dismiss();
}

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad InstructionModalPage');
    // console.log(this.globals.menu_id);
    // this.instr = localStorage.getItem("instructions");
    // console.log('i',this.instr);

  }
  
  saveInstruct(){
    
    this.globals.menu_item_arr.push({"ID": this.globals.menu_id, "INST": this.instructions});
     console.log('modal IDs',this.globals.menu_item_arr);

  

    this.viewCtrl.dismiss();
    
  }

  cancelInstructions(){
    this.viewCtrl.dismiss();
  }

}

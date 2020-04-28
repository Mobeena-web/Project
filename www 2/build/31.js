webpackJsonp([31],{

/***/ 737:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstructionModalPageModule", function() { return InstructionModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__instruction_modal__ = __webpack_require__(935);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InstructionModalPageModule = (function () {
    function InstructionModalPageModule() {
    }
    InstructionModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__instruction_modal__["a" /* InstructionModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__instruction_modal__["a" /* InstructionModalPage */]),
            ],
        })
    ], InstructionModalPageModule);
    return InstructionModalPageModule;
}());

//# sourceMappingURL=instruction-modal.module.js.map

/***/ }),

/***/ 935:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstructionModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the InstructionModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InstructionModalPage = (function () {
    function InstructionModalPage(navCtrl, navParams, viewCtrl, globals) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.globals = globals;
        this.instructions = '';
        this.instr = '';
        this.instructions = this.navParams.get('instructions');
        console.log("item instructions from constructor", this.instructions);
        // console.log('IDs...',this.globals.menu_item_arr);
        //   console.log(this.globals.menu_item_arr.length);
        //   console.log(this.globals.menu_id);
        //  for(var i=0; i < this.globals.menu_item_arr.length ; i++){
        //   console.log('loopppp')
        //   console.log('loopppp--->1', this.globals.menu_item_arr[i].ID);
        //   console.log('loopppp--->2', this.globals.menu_id);
        //    if(this.globals.menu_id == this.globals.menu_item_arr[i].ID){
        //      console.log('trueeeeee')
        //      this.instr = this.globals.menu_item_arr[i].INST;
        //      console.log('loopppp--->3', this.instr);
        //   }
        //    else{
        //     console.log('falseeeeeeeee');
        //    }
        //  }
    }
    InstructionModalPage.prototype.close = function () {
        console.log("data before sending to parent", this.instructions);
        this.viewCtrl.dismiss(this.instructions);
        this.instructions = '';
        this.instr = '';
    };
    InstructionModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InstructionModalPage');
        // console.log(this.globals.menu_id);
        // this.instr = localStorage.getItem("instructions");
        // console.log('i',this.instr);
    };
    InstructionModalPage.prototype.saveInstruct = function () {
        this.globals.menu_item_arr.push({ "ID": this.globals.menu_id, "INST": this.instructions });
        console.log('modal IDs', this.globals.menu_item_arr);
        this.close();
    };
    InstructionModalPage.prototype.cancelInstructions = function () {
        this.close();
    };
    InstructionModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-instruction-modal',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/instruction-modal/instruction-modal.html"*/'<!--\n  Generated template for the InstructionModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n      <!-- <ion-buttons start large> -->\n          <ion-icon start ios="ios-close" md="md-close" style="float:left;font-weight: bold;font-size: 30px;color:white;" clear  (click)="close()"></ion-icon>\n      <!-- </ion-buttons> -->\n\n    <ion-title>Add Instructions</ion-title>\n\n    <ion-buttons end>\n        <button ion-button style="float:right;color:white;" small clear  (click)="saveInstruct()" >Save</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    \n    <div>\n      <!-- <h3 style="text-align: center">Add Instructions</h3> -->\n      <ion-row>\n      \n        <ion-col col-12>\n          <p text-center style="color:#777" class="p_text">\n            Your special request might incur an additional charge.\n          </p>\n        </ion-col>\n      </ion-row>\n      <ion-textarea placeholder="Enter Your Instructions"  [(ngModel)]="instructions" maxlength="1000" value="{{instr}}" ></ion-textarea>\n  \n\n    </div>\n\n</ion-content>\n<ion-footer>\n  <button  ion-button block  (click)="saveInstruct()" >Save</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/instruction-modal/instruction-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */]])
    ], InstructionModalPage);
    return InstructionModalPage;
}());

//# sourceMappingURL=instruction-modal.js.map

/***/ })

});
//# sourceMappingURL=31.js.map
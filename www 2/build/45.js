webpackJsonp([45],{

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CongratulationPageModule", function() { return CongratulationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__congratulation__ = __webpack_require__(923);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CongratulationPageModule = (function () {
    function CongratulationPageModule() {
    }
    CongratulationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__congratulation__["a" /* CongratulationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__congratulation__["a" /* CongratulationPage */]),
            ],
        })
    ], CongratulationPageModule);
    return CongratulationPageModule;
}());

//# sourceMappingURL=congratulation.module.js.map

/***/ }),

/***/ 923:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CongratulationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(42);
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
 * Generated class for the CongratulationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CongratulationPage = (function () {
    function CongratulationPage(modalCtrl, nativeStorage, nativeAudio, navCtrl, navParams, viewCtrl) {
        this.modalCtrl = modalCtrl;
        this.nativeStorage = nativeStorage;
        this.nativeAudio = nativeAudio;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.n = 1;
        this.n1 = 1;
        this.n2 = 1;
        this.value = 0;
        this.value1 = 1;
        this.value2 = 0;
        this.status = false;
        this.business_array = new Array();
        console.log('hello');
        this.reward_amount = navParams.get('reward');
        this.reward_status = navParams.get('status');
        this.reward_place = navParams.get('place');
        this.logo = navParams.get('Logo');
        this.lottery = navParams.get('lottery_image');
        this.string = navParams.get('RewardString');
        this.bid = navParams.get('id');
        console.log("lotteryimage", this.lottery);
        console.log(this.reward_amount);
        console.log(this.reward_place);
        this.reward_amount = this.reward_amount.toString();
        console.log("length", this.reward_amount.length);
        this.reward_length = this.reward_amount.length;
        if (this.string == 'null') {
            this.isnumber = true;
        }
        else {
            this.isnumber = false;
        }
        console.log("isnumber", this.isnumber);
        this.nativeAudio.play('spinner');
        var that = this;
        setTimeout(function () {
            that.status = true;
            if (that.reward_status == 'lose' || that.reward_status == 'error') {
                that.nativeAudio.play('failure');
            }
            else {
                that.nativeAudio.play('success');
            }
        }, 9000);
        console.log(that.status);
    }
    CongratulationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CongratulationPage');
        console.log(this.reward_amount);
    };
    CongratulationPage.prototype.dismiss = function () {
        var _this = this;
        this.viewCtrl.dismiss();
        console.log(this.bid);
        this.nativeStorage.getItem('BusinessFirstimeFlag')
            .then(function (data) {
            _this.business_array = data.array;
            console.log(data.array);
            if (data.array.indexOf(_this.bid) == -1) {
                console.log(_this.bid, "bid");
                _this.business_array.push(_this.bid);
                _this.nativeStorage.setItem('BusinessFirstimeFlag', {
                    array: _this.business_array
                }).then(function () {
                    var modal = _this.modalCtrl.create('AddReviewPage', { place: _this.bid });
                    modal.present();
                })
                    .catch(function (err) { console.log("nativesstorage", err); });
            }
        }, function (error) {
            //we don't have the user data 
            console.log("no data");
            _this.business_array.push(_this.bid);
            _this.nativeStorage.setItem('BusinessFirstimeFlag', {
                array: _this.business_array
            }).then(function () {
                // this.navCtrl.push('AddReviewPage', { place: this.bid });
                var modal = _this.modalCtrl.create('AddReviewPage', { place: _this.bid });
                modal.present();
            })
                .catch(function (err) { console.log("nativesstorage", err); });
        }).catch(function (err) { console.log(err); });
    };
    CongratulationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-congratulation',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/congratulation/congratulation.html"*/'<!--\n  Generated template for the Congratulation page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<!--<div class="spin"></div>\n        <button (click)="divClass=\'spin\'">Spin</button>-->\n<ion-content id="content" class="slot-numbers">\n  <div class="title-class">\n    <!-- <ion-label class="title">Raffle</ion-label> -->\n  </div>\n  <button ion-button class="close-btn" [disabled]="!status" color="danger" clear strong (click)="dismiss()">\n    <ion-icon style="font-size:40px; color:rgb(245, 3, 3);" name="close-circle"></ion-icon>\n  </button>\n\n\n\n  <div class="background-image">\n\n    <div *ngIf="!status" class="numbers1">\n      <!--<div  class="left-div"  >\n            <ion-label color = "secondary" style="margin: 5px 0px 11px 0 !important;" *ngIf="!status" >${{ n }}</ion-label>\n            <ion-label color = "secondary" style="margin: 5px 0px 11px 0 !important;"  *ngIf="status" >{{reward_char_array[0]}} </ion-label>\n                   \n            </div>\n           <div class="middle-div"  > \n             <ion-label color = "secondary" style="margin: 5px 0px 11px 0 !important;" *ngIf="!status">{{ n1 }}</ion-label> \n               <ion-label color = "secondary" style="margin: 5px 0px 11px 0 !important;" *ngIf="status" >{{reward_char_array[1]}} </ion-label>\n             </div>\n           <div class="right-div" >\n              <ion-label color = "secondary" style="margin: 5px 0px 11px 0 !important;" *ngIf="!status">{{ n2 }}</ion-label> \n                <ion-label color = "secondary" style="margin: 5px 0px 11px 0 !important;" *ngIf="status" >{{reward_char_array[2]}}</ion-label>\n              </div>\n           <br style="clear: left;" />-->\n    </div>\n    <div *ngIf="status" class="numbers2" style="width: 100%; height: 50%;">\n      <ion-label color="secondary" style="font-size: 7.5rem; position: absolute;z-index:999; text-align:center;width:100%; top: 29%; color: white;"\n        *ngIf="status  && isnumber ">${{reward_amount}} </ion-label>\n\n      <img *ngIf="reward_status == \'success\' && !isnumber" style="    height: 200px;   position: absolute; left: 22.5%;  top: 15%;"\n        src="{{lottery}}">\n      <img *ngIf="reward_status == \'success\' && isnumber" style="   height: 180px;width: 88%;margin-left: 5.5%;position: absolute;top: 19%;"\n        src="assets/imgs/bill.jpg">\n      <img *ngIf="reward_status == \'lose\'" style="    height: 200px;   position: absolute; left: 22.5%;  top: 15%;" src="assets/imgs/stop.png">\n\n      <img *ngIf="reward_status == \'error\'" style="    height: 200px;   position: absolute; left: 22.5%;  top: 15%;" src="assets/imgs/stop.png">\n\n\n      <!-- <ion-label color = "secondary"  class="cash-label"   *ngIf="status" >${{reward_amount}} </ion-label> -->\n    </div>\n\n    <div class="Open-Sans-bold" class="background">\n\n      <div class="heading" *ngIf="status && reward_status == \'success\'">\n        <img style="position: absolute;   left: 18%; bottom: 55%; width:65%" src="assets/imgs/congo2.gif">\n\n        <ion-label class="Open-Sans-bold" *ngIf="isnumber " style="font-size: 22px; color: rgb(138, 30, 30); width: 75%; position: absolute;left: 0;bottom: 40%;">\n          Store Credit:</ion-label>\n        <ion-label *ngIf="isnumber" style="  font-size: 40px; color: rgb(138, 30, 30);width: 75%; position: absolute; left: 37%; bottom: 38%;">\n          ${{reward_amount}} </ion-label>\n        <ion-label class="Open-Sans-bold" *ngIf="!isnumber" style="font-size: 20px; color: rgb(138, 30, 30); width: 100%; position: absolute;left: 0;bottom: 40%;">\n          {{string}}</ion-label>\n        <ion-label class="Open-Sans-bold" style=" color: #333; width: 75%; position: absolute;left: 14%;bottom: 30%;  font-size: 2.5rem;">\n          {{reward_place}} </ion-label>\n        <img style="   border-radius:4px;   height: 80px; position: relative; top: 68%;" src="{{logo}}">\n      </div>\n      <div class="heading-pending" *ngIf="!status">\n        <img style="position: absolute;  left: 18%; bottom: 55%; width:65%" src="assets/imgs/pending.gif">\n\n      </div>\n      <div class="heading" *ngIf="status && reward_status == \'lose\' ">\n        <img style="position: absolute;  left: 20%; bottom: 55%; width:60%" src="assets/imgs/Sorry.gif">\n        <ion-label class="Open-Sans-bold" style="font-size: 15px; color: rgb(138, 30, 30);width: 75%; position: absolute;left: 15.5%; bottom: 40%; ">\n          BETTER LUCK NEXT TIME </ion-label>\n        <ion-label class="Open-Sans-bold" style="font-size: 15px; color: #333; width: 75%; position: absolute;left: 14%;bottom: 30%; font-size: 2.5rem;">\n          {{reward_place}} </ion-label>\n        <img style="  border-radius:4px;    height: 80px; position: relative; top: 68%;" src="{{logo}}">\n      </div>\n      <div class="heading" *ngIf="status && reward_status == \'error\' ">\n        <img style="position: absolute; left: 20%; bottom: 55%; width:60%" src="assets/imgs/Sorry.gif">\n        <ion-label class="Open-Sans-bold" style="font-size: 15px; color: rgb(138, 30, 30); width: 75%; position: absolute; left: 15.5%;  bottom: 40%;">\n          BETTER LUCK NEXT TIME </ion-label>\n        <ion-label class="Open-Sans-bold" style="font-size: 15px; color: #333; width: 75%; position: absolute;left: 14%;bottom: 30%; font-size: 2.5rem;">\n          {{reward_place}} </ion-label>\n        <img style="   border-radius:4px; height: 80px; position: relative; top: 65%;" src="{{logo}}">\n      </div>\n    </div>\n  </div>\n  <!--*ngIf="status == \'true\' && reward_status == \'success\' " -->\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/congratulation/congratulation.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"]])
    ], CongratulationPage);
    return CongratulationPage;
}());

//# sourceMappingURL=congratulation.js.map

/***/ })

});
//# sourceMappingURL=45.js.map
webpackJsonp([25],{

/***/ 767:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyRewardsPageModule", function() { return MyRewardsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_rewards__ = __webpack_require__(970);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MyRewardsPageModule = (function () {
    function MyRewardsPageModule() {
    }
    MyRewardsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__my_rewards__["a" /* MyRewardsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__my_rewards__["a" /* MyRewardsPage */]),
            ],
        })
    ], MyRewardsPageModule);
    return MyRewardsPageModule;
}());

//# sourceMappingURL=my-rewards.module.js.map

/***/ }),

/***/ 970:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyRewardsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(91);
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
 * Generated class for the MyRewardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyRewardsPage = (function () {
    // ngAfterViewInit()
    // {
    //     this.indicator = document.getElementById("indicator");
    //     if (this.platform.is('windows'))
    //     {
    //         this.indicator.style.opacity = '0';
    //     }
    // }
    function MyRewardsPage(modalCtrl, geolocation, diagnostic, modalctrl, server, globals, nativeStorage, alertCtrl, loadingCtrl, navCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.geolocation = geolocation;
        this.diagnostic = diagnostic;
        this.modalctrl = modalctrl;
        this.server = server;
        this.globals = globals;
        this.nativeStorage = nativeStorage;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pointflag = false;
        this.punchflag = false;
        this.gain_flag = false;
        this.searchTerm = '';
        this.flag = false;
        this.gain_segment_flag = false;
        this.point_segment_flag = false;
        this.punchCard_segment_flag = false;
        this.gifts_segment_flag = false;
        this.arrayStatus = false;
        this.selected = 0;
        this.indicator = null;
        this.status = true;
        this.business_reward_flag = false;
        this.redeem_history = false;
        this.point_menu_flag = false;
        this.reward_menu_flag = false;
        this.punch_menu_flag = false;
        this.cart_reward_view = false;
        this.image_broken = this.globals.b_logo;
        this.data = {};
        this.data.response = '';
        this.udid = this.globals.udid;
        //  this.getReward();
        this.img = navParams.get('qrcode');
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]();
    }
    MyRewardsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyRewardsPage');
        this.getLocation();
        if (this.globals.point_check != 'true' && this.globals.punch_check != 'true') {
            this.option = 'gifts';
            this.rewards_items();
        }
        else if (this.globals.point_check != 'true' && this.globals.punch_check == 'true') {
            this.option = 'punch_cards';
            this.punch_items();
        }
        else {
            this.option = 'points';
        }
        this.reward_type_home = this.navParams.get('reward_type_home');
        if (this.reward_type_home && this.reward_type_home == 'punch') {
            this.option = 'punch_cards';
            this.punch_items();
        }
        else if (this.reward_type_home && this.reward_type_home == 'reward') {
            this.option = 'gifts';
            this.rewards_items();
            this.cart_reward_view = true;
        }
        // this.business_reward();
        // this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        //     this.setFilteredItems();
        // });
    };
    MyRewardsPage.prototype.ionViewWillLeave = function () {
        console.log('leave RewardPage');
        this.status = false;
        clearTimeout(this.time);
    };
    MyRewardsPage.prototype.ionViewWillEnter = function () {
        console.log('enter RewardPage');
        this.status = true;
        this.point_items();
        this.getPoints();
        //this.rewards_items();
        //this.getReward();
        // this.business_reward();
    };
    MyRewardsPage.prototype.store_points_fun = function () {
        this.globals.presentToast("You can avail this discount by adding items in cart.");
    };
    MyRewardsPage.prototype.getLocation = function () {
        var _this = this;
        // this.diagnostic.isLocationEnabled()
        //     .then((state) => {
        //         console.log(state);
        // if (state) {
        this.status = false;
        // console.log("if ", state)
        this.arrayStatus = false;
        this.flag = true;
        if (this.globals.delivery == true) {
            this.geolocation.getCurrentPosition().then(function (position) {
                _this.coordinates = position.coords.latitude + "," + position.coords.longitude;
                _this.globals.RewardsPos = _this.coordinates;
            }, function (err) {
                console.log(err);
                _this.status = true;
                var alert = _this.alertCtrl.create({
                    title: 'Location is disabled',
                    subTitle: 'In order to proceed, Please enable your location',
                    buttons: ['OK']
                });
                alert.present();
            });
        }
        // } else {
        // }
        // }).catch(e => console.error(e));
    };
    MyRewardsPage.prototype.getReward = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.get_all_Rewards_new();
        response.subscribe(function (data) {
            _this.lotery = data;
            _this.rewards_length = _this.lotery.length;
            if (_this.lotery.length == 0) {
                _this.gain_flag = true;
            }
            else {
                _this.gain_flag = false;
            }
            _this.lotery.forEach(function (element) {
                if (element.redeemed == 'yes') {
                    _this.redeem_history = true;
                }
            });
            loading.dismiss();
        }, function (error) {
            loading.dismiss();
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    // setFilteredItems() {
    //     if (this.option == 'gain') {
    //         if (this.lotery) {
    //             this.lotery = this.reward.filter((item) => {
    //                 return item.businessname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    //             });
    //         }
    //     }
    //     else if (this.option == 'punch_cards') {
    //         console.log("usmanpunch",this.punch_array)
    //         this.punchdata = this.punch_array.filter((item) => {
    //                 return item.business_username.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    //             });
    //         console.log("filtered items", this.punchdata);
    //     }
    //     else if (this.option == 'points') {
    //         this.points_lotery = this.points_reward.filter((item) => {
    //             return item.businessname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    //         });
    //     }
    // }
    MyRewardsPage.prototype.SegmentChange = function () {
        if (this.option == 'gain' && this.gain_segment_flag == false) {
            // this.getReward();
            this.gain_segment_flag = true;
        }
        else if (this.option == 'punch_cards' && this.punchCard_segment_flag == false) {
            this.punch_items();
            //this.punchCard_segment_flag = true;
        }
        else if (this.option == 'points' && this.point_segment_flag == false) {
            // this.getPoints();
            this.point_segment_flag = true;
        }
        else if (this.option == 'gifts' && this.gifts_segment_flag == false) {
            //this.gifts_segment_flag = true;
            //this.presentModal1();
            //this.getReward();
            this.rewards_items();
        }
    };
    MyRewardsPage.prototype.doRefresh = function (refresher) {
        if (this.option == 'gain') {
            //this.getReward();
        }
        else if (this.option == 'punch_cards') {
            this.punch_items();
        }
        else if (this.option == 'points') {
            this.point_items();
        }
        else if (this.option == 'gifts') {
            this.rewards_items();
        }
        this.content.resize();
        refresher.complete();
    };
    MyRewardsPage.prototype.getPunchReward = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        var response = this.server.GetPunchcards(this.coordinates);
        loading.present();
        response.subscribe(function (data) {
            // this.globals.circle_graph(this.globals.percent,'circles1',150,20,'#fff');
            _this.data.response = data;
            _this.punch_reward = _this.data.response;
            console.log("mypunch", data);
            loading.dismiss();
            console.log(_this.punch_reward.success);
            if (_this.punch_reward.success == "No data") {
                _this.punchflag = true;
            }
            else {
                _this.punchflag = false;
                _this.punchdata = _this.punch_reward.cards;
                _this.punchdata.forEach(function (element) {
                    if (element.punch_reward_4 != '') {
                        element.lowestreward = element.punch_reward_4;
                        return;
                    }
                    else if (element.punch_reward_8 != '') {
                        element.lowestreward = element.punch_reward_8;
                        return;
                    }
                    else if (element.punch_reward_10 != '') {
                        element.lowestreward = element.punch_reward_10;
                        return;
                    }
                    else if (element.punch_reward_12 != '') {
                        element.lowestreward = element.punch_reward_12;
                        return;
                    }
                });
                _this.punch_array = _this.punchdata;
                console.log(_this.punchdata);
            }
        }, function (error) {
            console.log("Oooops!");
            loading.dismiss();
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    MyRewardsPage.prototype.getPoints = function () {
        var _this = this;
        var response = this.server.getUserPoints(this.coordinates);
        response.subscribe(function (data) {
            if (data.status == "error") {
                _this.globals.points_ = 0;
            }
            else {
                _this.globals.points_ = Number(data.rewards[0].points);
                _this.store_points = data.rewards[0].available_rewards;
            }
        }, function (error) {
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    MyRewardsPage.prototype.business_reward = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.get_business_reward();
        response.subscribe(function (data) {
            loading.dismiss();
            if (data.length > 0) {
                _this.business_reward_data = data;
            }
            else {
                _this.business_reward_flag = true;
            }
        }, function (error) {
            loading.dismiss();
            _this.globals.presentToast("Server time out. please try again.");
        });
    };
    MyRewardsPage.prototype.rewardredeem = function (item) {
        this.navCtrl.push('PointRewardsPage', { reward_data: item });
    };
    MyRewardsPage.prototype.OpenPointsModel = function (rewards, banner) {
        if (rewards.length == 0) {
            var alert_1 = this.alertCtrl.create({
                title: 'Oops',
                subTitle: 'No Rewards created by Business.',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            this.navCtrl.push('PointsModelPage', { point_reward: rewards, banner: banner });
        }
    };
    MyRewardsPage.prototype.detailPunch = function (punched_icon_image, business_username, punch_count, punch_limit, punch_qr, udid, punched_image, date, lowestreward) {
        this.navCtrl.push('PunchDetailPage', { punched_icon_image: punched_icon_image, business_username: business_username, punch_count: punch_count, punch_limit: punch_limit, punch_qr: punch_qr, udid: udid, punch_image: punched_image, Date: date, reward: lowestreward });
    };
    MyRewardsPage.prototype.point_items = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.getpoints_menuitems();
        response.subscribe(function (data) {
            loading.dismiss();
            if (data.status == true) {
                _this.point_menu = data.items;
                console.log("Point menu", _this.point_menu);
                _this.point_menu.forEach(function (subelement) {
                    subelement.quantity = 1;
                });
                if (_this.point_menu.length == 0) {
                    _this.point_menu_flag = true;
                }
                else {
                    _this.point_menu_flag = false;
                }
            }
            else {
                _this.point_menu_flag = true;
            }
        }, function (error) {
            loading.dismiss();
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    MyRewardsPage.prototype.Detail = function (id, image, freeextras, reward_id) {
        this.navCtrl.push('ItemDetailPage', { type: true, item_id: id, image: image, BusinesId: this.globals.new_id, free_extras: freeextras, reward_flag: true, reward_id: reward_id });
    };
    MyRewardsPage.prototype.redeem_point_menu_item = function (id, type) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.redeem_point_menu_reward(id, type);
        response.subscribe(function (data) {
            loading.dismiss();
            if (data.status == true) {
                _this.globals.presentToast(data.message);
                _this.getPoints();
                _this.punch_items();
            }
            else {
                _this.globals.presentToast(data.message);
            }
        }, function (error) {
            loading.dismiss();
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    MyRewardsPage.prototype.punch_model = function (rewards) {
        var modal = this.modalCtrl.create('PointPunchModelPage', { title: "Punch Detail", terms: rewards.terms, tagline: rewards.punch_description, udid: rewards.id, name: rewards.name, image: rewards.image, punch_count: rewards.punch_count, punch_limit: rewards.punch_limit });
        modal.present();
    };
    MyRewardsPage.prototype.point_model = function (a) {
        var modal = this.modalCtrl.create('PointPunchModelPage', { title: "Point Detail", terms: a.terms, image: a.image, name: a.name, tagline: a.points_description });
        modal.present();
    };
    MyRewardsPage.prototype.presentModal1 = function () {
        var modal = this.modalCtrl.create('ModalPage');
        modal.present();
    };
    MyRewardsPage.prototype.rewards_items = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.getrewards_menuitems();
        response.subscribe(function (data) {
            loading.dismiss();
            if (data.status == true) {
                _this.reward_menu = data.items;
                _this.reward_menu_length = _this.reward_menu.length;
                _this.reward_menu.forEach(function (subelement) {
                    subelement.quantity = 1;
                });
                if (_this.reward_menu.length == 0) {
                    _this.reward_menu_flag = true;
                }
                else {
                    _this.reward_menu_flag = false;
                }
            }
            else {
                _this.reward_menu_flag = true;
            }
        }, function (error) {
            loading.dismiss();
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    MyRewardsPage.prototype.punch_items = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        loading.present();
        var response = this.server.getpunches_menuitems();
        response.subscribe(function (data) {
            //this.globals.circle_graph(this.globals.percent,'circles1',150,20,'#fff');
            loading.dismiss();
            if (data.status == true) {
                _this.punch_menu = data.items;
                if (_this.punch_menu.length == 0) {
                    _this.punch_menu_flag = true;
                }
                else {
                    _this.punch_menu_flag = false;
                }
                console.log("Punches ", _this.punch_menu);
                var i = 0;
                var percent = 0;
                var that = _this;
                setTimeout(function () {
                    that.punch_menu.forEach(function (element) {
                        percent = (Number(element.punch_count) / Number(element.punch_limit)) * 100;
                        that.globals.circle_graph(percent, 'circles' + i, 55, 8, '#ccc');
                        console.log(percent, 'circles' + i);
                        i++;
                    });
                }, 1200);
            }
        }, function (error) {
            loading.dismiss();
            _this.globals.presentToast("Something went wrong check your internet connection.");
        });
    };
    MyRewardsPage.prototype.cartpage = function () {
        //  let cartmodel = this.modalCtrl.create('CartPage');
        // cartmodel.present();
        if (this.globals.Product.length == 0) {
            var alert_2 = this.alertCtrl.create({
                title: "Oops",
                message: "Your cart is empty.",
                buttons: ["Okay"]
            });
            alert_2.present();
        }
        else {
            this.navCtrl.push('CartPage');
        }
    };
    MyRewardsPage.prototype.points_buy_Confirm = function (id, type) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Purchase Item',
            message: 'Are you sure.You want to purchase item by points?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Buy',
                    handler: function () {
                        console.log('Buy clicked');
                        _this.redeem_point_menu_item(id, type);
                    }
                }
            ]
        });
        alert.present();
    };
    MyRewardsPage.prototype.changeSource = function (event, name) { event.target.src = this.globals.b_logo; };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"])
    ], MyRewardsPage.prototype, "content", void 0);
    MyRewardsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-my-rewards',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/my-rewards/my-rewards.html"*/'<!--\n  Generated template for the MyRewardsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>My Rewards</ion-title>\n    <ion-buttons end>\n        <button ion-button    (click)="cartpage()">\n\n            <ion-badge color="danger" *ngIf="globals.Product.length > 0">{{globals.Product.length}}</ion-badge>\n            <ion-icon name="cart" style="font-size: 2.5rem;"> </ion-icon>\n       \n          </button>\n\n    </ion-buttons>\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-segment color="primary" [(ngModel)]="option" (ionChange)="SegmentChange()" *ngIf="!cart_reward_view">\n    <!-- <ion-segment-button style="font-size:1.1rem" value="gain">\n      <ion-badge color="danger" item-left *ngIf="globals.RewardCount > 0">{{globals.RewardCount}}</ion-badge>\n      GAIN\n    </ion-segment-button> -->\n\n    <ion-segment-button style="font-size:1.1rem" value="points" *ngIf="globals.point_check == \'true\'">\n      <!-- <ion-badge color="danger" item-left *ngIf="globals.PointCount > 0">{{globals.PointCount}}</ion-badge> -->\n      POINTS\n    </ion-segment-button>\n\n    <ion-segment-button style="font-size:1.1rem" value="punch_cards" (click)="punch_items()" *ngIf="globals.punch_check == \'true\'">\n      <ion-badge color="danger" item-left *ngIf="globals.punchCount > 0">{{globals.punchCount}}</ion-badge>\n      PUNCH CARDS\n    </ion-segment-button>\n\n    <ion-segment-button style="font-size:1.1rem" value="gifts">\n      <ion-badge color="danger" item-left *ngIf="reward_menu_length > 0">{{reward_menu_length}}</ion-badge>\n      MY REWARDS\n    </ion-segment-button>\n  </ion-segment>\n\n\n  <div [ngSwitch]="option" style="height: 100%;">\n    <!-- <div *ngSwitchCase="\'gain\'">\n      <ion-searchbar *ngIf="!flag" [(ngModel)]="searchTerm" (input)="setFilteredItems()" [formControl]="searchControl"></ion-searchbar>\n\n      <p style="text-align: center; margin-top: 60%;" *ngIf="gain_flag">Currently you do not have any rewards... </p>\n      <ion-refresher style="top:10% !important;" (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull down to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n        </ion-refresher-content>\n      </ion-refresher>\n      <div *ngIf="!gain_flag">\n        <div *ngFor="let rewards of lotery">\n          <ion-card *ngIf="rewards.is_birthday == \'false\'" style="    margin-right: 4px !important;\n              margin-left: 4px !important; width: calc(100% - 8px)!important;">\n            <ion-grid>\n              <ion-row>\n                <ion-col col-3>\n                  <img style="border-radius: 4px; height:70px;" src="{{rewards?.image}}">\n                </ion-col>\n\n                <ion-col col-6>\n                  <h3 color="primary" style=" font-size: 1.4rem;color:#666;font-weight:bold">{{rewards?.businessname}} </h3>\n                  <ion-label style="color:black" *ngIf="rewards.isnumber == true ">Store Credit:\n                    <p style="color:red; font-size: 3rem;"> ${{rewards?.reward}} </p>\n                  </ion-label>\n                  <p style="color:red; font-size: 2.0rem;" *ngIf="rewards.isnumber == false"> {{rewards?.reward_string}} </p>\n                    <p > Date:   {{rewards?.date}} </p>\n                </ion-col>\n\n                <ion-col style="padding: 0px !important;" col-3>\n                  <img src="{{rewards?.redeem_qr}}">\n                  <p style="text-align:center;"> {{rewards?.qr_text}}</p>\n                </ion-col>\n              </ion-row>\n\n            </ion-grid>\n\n          </ion-card>\n\n        </div>\n      </div>\n\n    </div> -->\n    <div *ngSwitchCase="\'punch_cards\'" class="back">\n\n      <!-- <ion-searchbar *ngIf="!flag" [(ngModel)]="searchTerm" (input)="setFilteredItems()" [formControl]="searchControl"></ion-searchbar> -->\n\n      <!-- <p style="text-align: center;" *ngIf="punchflag">Currently you do not have any punch cards... </p> -->\n      <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull down to refresh" refreshingSpinner="circles"\n          refreshingText="Refreshing...">\n        </ion-refresher-content>\n      </ion-refresher>\n      <div *ngIf="punch_menu_flag == true">\n          <p style="padding-top: calc(50% - 11px); padding-right:20px; padding-left:20px; text-align: center; font-size: 22px; color:#a8a3a3;"><ion-icon name="eye-off"></ion-icon></p>\n          <p no-margin style="padding-right:20px; padding-left:20px; text-align: center; font-size: 14px;">No Punches</p>\n      </div>\n      <div *ngIf="this.globals.punch_check == \'true\'">\n        <ion-row>\n          <ion-col col-6 *ngFor="let rewards of punch_menu ;let i=index" >\n            <ion-card >\n                <img class="cup_img" src="{{rewards.image}}" />\n                <div style="min-height: 119px" class="circle" id="circles{{i}}"> </div>\n                  <h5 text-center>{{rewards.name}}</h5>\n                  <h5 text-center>{{rewards.punch_count}}/{{rewards.punch_limit}} Punches</h5>\n    \n            <!-- <button ion-button round block [disabled]="rewards.punch_count != rewards.punch_limit" class="pll" (click)="redeem_point_menu_item(rewards.id,\'punches\')">Redeem</button> -->\n            <button ion-button round block outline  class="pll" (click)="punch_model(rewards)">View Detail</button>\n\n          </ion-card>\n\n          </ion-col>\n        </ion-row>\n      </div>\n\n    </div>\n    <div *ngSwitchCase="\'points\'">\n      <!-- <ion-searchbar *ngIf="!flag" [(ngModel)]="searchTerm" (input)="setFilteredItems()" [formControl]="searchControl"></ion-searchbar> -->\n      <div *ngIf="this.globals.point_check == \'true\'">\n      <div col-6 class="point_s">\n        <div class="youhave">You Have</div>\n        <div class="points_design" *ngIf="globals.points_">{{globals.points_}} <ion-icon class="point-star" name="star"></ion-icon>\n        </div>\n        <div class="points_design" *ngIf="!globals.points_">0 <ion-icon class="point-star" name="star"></ion-icon>\n        </div>\n\n        <div class="pts">Points</div>\n      </div>\n      <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull down to refresh" refreshingSpinner="circles"\n          refreshingText="Refreshing...">\n        </ion-refresher-content>\n      </ion-refresher>\n      <div *ngIf="globals.business_type == \'ordering\'">\n        <h3 text-center *ngIf="store_points?.length > 0">Cash Discount</h3>\n        <ion-card *ngFor="let item of store_points" text-center class="store" (click)="store_points_fun()">\n           <ion-row>\n             <ion-col col-6>\n               {{item.points}} Points\n             </ion-col>\n             <ion-col col-6>\n               {{item.description}}\n             </ion-col>\n           </ion-row>\n         </ion-card>\n      </div>\n      \n    <h3 text-center *ngIf="point_menu?.length > 0"> Point Store</h3>\n      <div *ngFor="let a of point_menu">\n        <ion-card class="point_list point_card">\n          <ion-row>\n            <ion-col col-3 style="margin: auto;">\n\n              <img class="itm-img" *ngIf="a.image" [src]="a.image ? a.image : globals.b_logo">\n              <img class="itm-img" *ngIf="a.image == \'\' || !a.image" src={{globals.b_logo}}>\n            </ion-col>\n            <ion-col col-9 style="margin:auto">\n\n              <p style="color:#444;font-size:1.5rem">{{a.name}} </p>\n              <p style="font-size:1.3rem;padding-bottom: 10px;">{{a.points_description}} </p>\n\n              <ion-row>\n                <ion-col col-7>\n                  <button [disabled]="a.point_price > globals.points_" ion-button round block class="redem_btn" (click)="points_buy_Confirm(a.id,\'point_store\')">BUY\n                    ({{a.point_price}} points)</button>\n                </ion-col>\n                <ion-col col-5> \n                  <button  ion-button round block class="redem_btn" (click)="point_model(a)"> View Detail</button>\n                </ion-col>\n              </ion-row>\n              \n            </ion-col>\n\n          </ion-row>\n        </ion-card>\n      </div>\n\n    </div>\n    </div>\n    <div *ngSwitchCase="\'gifts\'">\n      <!-- <ion-searchbar *ngIf="!flag" [(ngModel)]="searchTerm" (input)="setFilteredItems()" [formControl]="searchControl"></ion-searchbar> -->\n      <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull down to refresh" refreshingSpinner="circles"\n          refreshingText="Refreshing...">\n        </ion-refresher-content>\n      </ion-refresher>\n      <div *ngIf="reward_menu_flag == true">\n          <p style="padding-top: calc(50% - 11px); padding-right:20px; padding-left:20px; text-align: center; font-size: 22px; color:#a8a3a3;"><ion-icon name="eye-off"></ion-icon></p>\n          <p no-margin style="padding-right:20px; padding-left:20px; text-align: center; font-size: 14px;">No Rewards</p>\n      </div>\n      <div *ngFor="let a of reward_menu">\n        <ion-card class="point_card">\n          <ion-row>\n            <ion-col col-3 style="margin: auto;">\n\n              <img class="itm-img"  *ngIf="a.image" src="{{a.image}}" >\n              <img class="itm-img" *ngIf="a.image == \'\' || !a.image" src={{globals.b_logo}}>\n            </ion-col>\n            <ion-col col-9 style="margin:auto">\n                <ion-badge style="float:right" *ngIf="a.stock_quantity == 0" > Sold Out </ion-badge>\n              <p style="color:#444;font-size:1.5rem">{{a.name}} </p>\n              <p style="font-size:1.3rem;    padding-bottom: 10px;">{{a.tagline}} </p>\n\n              <button *ngIf="reward_type_home == \'reward\' || globals.branch_enabled == 0" ion-button round block [disabled]="a.stock_quantity == 0" class="redem_btn" (click)="Detail(a.id,a.image,a.freeExtras,a.reward_id)">Add\n                to Cart</button>\n            </ion-col>\n\n          </ion-row>\n        </ion-card>\n      </div>\n    </div>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/my-rewards/my-rewards.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_5__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], MyRewardsPage);
    return MyRewardsPage;
}());

//# sourceMappingURL=my-rewards.js.map

/***/ })

});
//# sourceMappingURL=25.js.map
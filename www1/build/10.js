webpackJsonp([10],{

/***/ 768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(971);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SettingsPageModule = (function () {
    function SettingsPageModule() {
    }
    SettingsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */]),
            ],
        })
    ], SettingsPageModule);
    return SettingsPageModule;
}());

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 971:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_pin_dialog__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_server_server__ = __webpack_require__(34);
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
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = (function () {
    function SettingsPage(app, server, pinDialog, globals, modalCtrl, socialSharing, nativeStorage, loadingCtrl, alertCtrl, http, actionSheetCtrl, navCtrl, navParams, platform) {
        this.app = app;
        this.server = server;
        this.pinDialog = pinDialog;
        this.globals = globals;
        this.modalCtrl = modalCtrl;
        this.socialSharing = socialSharing;
        this.nativeStorage = nativeStorage;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.aniversayexist = false;
        this.birthday_exist = false;
        this.user_aniversary = '';
        this.user_birthday = '';
        this.lockWallet = false;
        this.Unedit = true;
        this.data = {};
        this.data.response = '';
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        //   this.navBar.backButtonClick = (e:UIEvent)=>{
        //       // todo something
        //       this.StorWalletLock();
        //       this.navCtrl.pop();   
        //     //   let nav = this.app.getRootNav(); 
        //     //   nav.setRoot(MainTabsPage, {tabIndex: 0});
        //   }   
        console.log('ionViewDidLoad SettingPage');
        if (this.platform.is('ios')) {
            this.url = "https://itunes.apple.com/app/";
        }
        else if (this.platform.is('android')) {
            this.url = "https://play.google.com/store/apps/";
        }
        this.getuserNativeData();
        this.getWalletCheckFlag();
    };
    SettingsPage.prototype.ionViewWillLeave = function () {
        console.log("did leave settings");
        this.StorWalletLock();
    };
    SettingsPage.prototype.getuserNativeData = function () {
        var _this = this;
        this.nativeStorage.getItem('user')
            .then(function (data) {
            _this.user_email = data.email;
            _this.firstname = data.firstName;
            _this.lastname = data.lastName;
            _this.phonenumber = data.phone;
            _this.password = data.password;
            _this.image = data.image;
            _this.user_date = data.date;
            _this.user_id = data.ID;
            _this.user_birthday = data.birthday;
            _this.user_aniversary = data.aniversary;
            _this.phone_verify = data.phone_verify;
            console.log(_this.image, "image", "native", data.image, data.email, data.firstName, data.lastName);
            if (_this.phonenumber.charAt(1) == '9') {
                console.log("9");
                _this.phonecode = _this.phonenumber.slice(0, 3);
            }
            else {
                console.log("1");
                _this.phonecode = _this.phonenumber.slice(0, 2);
            }
            console.log(_this.phonecode, _this.phonenumber);
            _this.phone = _this.phonenumber.replace(_this.phonecode, '');
            _this.phone = Number(_this.phone);
            console.log(_this.phonecode, _this.phone);
            console.log("special", _this.user_birthday, _this.user_aniversary);
            console.log(_this.user_birthday);
            if (_this.user_aniversary == 'N/A') {
                _this.aniversayexist = false;
            }
            else if (_this.user_aniversary.toString().length > 0) {
                _this.aniversayexist = true;
            }
            if (_this.user_birthday == 'N/A') {
                _this.birthday_exist = false;
            }
            else if (_this.user_birthday.toString().length > 0) {
                _this.birthday_exist = true;
            }
        }).catch(function (err) { return console.log; });
    };
    SettingsPage.prototype.StorWalletLock = function () {
        this.nativeStorage.setItem('walletlock', { walletCheck: this.lockWallet })
            .then(function () { return console.log('Stored wallet lock'); }, function (error) { return console.error('Error storing item', error); });
    };
    SettingsPage.prototype.getWalletCheckFlag = function () {
        var _this = this;
        this.nativeStorage.getItem('walletlock').then(function (data) {
            console.log(data);
            _this.lockWallet = data.walletCheck;
            _this.globals.WallletLock = _this.lockWallet;
        }).catch(function (err) { return console.log; });
    };
    //     ionViewWillLeave(){   
    //         console.log("Looks like I'm about to leave :(");
    //         this.nativeStorage.getItem('user')
    //         .then(data => {
    //             this.user_email = data.email;
    //             this.firstname = data.firstName;
    //             this.lastname = data.lastName;
    //             this.phone = data.phone;
    //             this.password = data.password;
    //             this.udid = data.udid;
    //             this.image = data.image;
    //             this.user_date = data.date;  
    //             this.user_id = data.ID;
    //             this.user_birthday = data.birthday;
    //             this.user_aniversary = data.aniversary;
    //             this.phone_verify = data.phone_verify;
    //         }).catch(err => console.log);
    //   }
    //   ionViewWillEnter(){     
    //     console.log("Enter");
    //     this.nativeStorage.getItem('user')
    //     .then(data => {
    //         this.user_email = data.email;
    //         this.firstname = data.firstName;
    //         this.lastname = data.lastName;
    //         this.phonenumber = data.phone;
    //         this.password = data.password;
    //         this.udid = data.udid;
    //         this.image = data.image;
    //         this.user_date = data.date;  
    //         this.user_id = data.ID;
    //         this.user_birthday = data.birthday;
    //         this.user_aniversary = data.aniversary;
    //         this.phone_verify = data.phone_verify;
    //         console.log(this.image,"image");
    //         if(this.phonenumber.charAt(1) == '9')
    //             {   
    //                 console.log("9")
    //                 this.phonecode = this.phonenumber.slice(0,3);
    //             }
    //             else{  
    //                 console.log("1") 
    //                  this.phonecode = this.phonenumber.slice(0,2);
    //             }
    //             console.log(this.phonecode,this.phonenumber);
    //             this.phone = this.phonenumber.replace(this.phonecode,'');
    //             this.phone = Number(this.phone);
    //         console.log(this.phonecode,this.phone);
    //         console.log("special",this.user_birthday,this.user_aniversary)
    //         console.log(this.user_birthday);
    //         if(this.user_aniversary == 'N/A')
    //         {
    //             this.aniversayexist = false;
    //         }
    //         else if (this.user_aniversary.toString().length > 0)
    //         {
    //             this.aniversayexist =true;
    //         }
    //         if(this.user_birthday == 'N/A')
    //         {
    //             this.birthday_exist = false;
    //         }
    //         else if(this.user_birthday.toString().length > 0)
    //         {
    //             this.birthday_exist = true;
    //         }
    //     }).catch(err => console.log);
    // }
    SettingsPage.prototype.logout = function () {
        var _this = this;
        this.nativeStorage.clear()
            .then(function (data) {
            _this.nativeStorage.remove('user')
                .then(function (data) {
                console.log('data removed');
                _this.app.getRootNav().setRoot('LoginPage');
            }).catch(function (err) { return console.log(); });
            console.log(data);
            _this.globals.Product.length = 0;
            _this.lockWallet = false;
            _this.globals.cartflag = false;
        }).catch(function (err) { return console.log(); });
    };
    // public presentActionSheet() {
    //     let actionSheet = this.actionSheetCtrl.create({
    //         title: 'Share Jack Jacks Coffee House',
    //         buttons: [
    //             {
    //                 text: 'Via Facebook',
    //                 icon: 'logo-facebook',
    //                 handler: () => {
    //                     this.ShareViaFacebook('Hey this app is great!', null, this.url);
    //                 }
    //             },
    //             {
    //                 text: 'Via Whatsapp',
    //                 icon: 'logo-whatsapp',
    //                 handler: () => {
    //                     this.whatsappShare('Hey this app is great!', null, this.url);
    //                 }
    //             },
    //             {
    //                 text: 'Via SMS',
    //                 icon: 'mail',
    //                 handler: () => {
    //                     this.SMS();
    //                 }
    //             },
    //             {
    //                 text: 'Cancel',
    //                 icon: 'close',
    //                 role: 'cancel'
    //             }
    //         ]
    //     });
    //     actionSheet.present();
    // }
    SettingsPage.prototype.whatsappShare = function (message, image, url) {
        var _this = this;
        this.platform.ready().then(function () {
            _this.socialSharing.shareViaWhatsApp(message, image, url)
                .then(function () {
                console.log("Success");
            }).catch(function () {
                // Error!
                //   alert("Failed");
            });
        });
    };
    SettingsPage.prototype.ShareViaFacebook = function (message, image, url) {
        var _this = this;
        this.platform.ready().then(function () {
            _this.socialSharing.shareViaFacebook(message, image, url)
                .then(function () {
                console.log("Success");
            }).catch(function () {
                // Error!
                //   alert("Failed");
            });
        });
    };
    // SMS() {
    //     var options = {
    //         replaceLineBreaks: true, // true to replace \n by a new line, false by default
    //         android: {
    //             intent: 'INTENT'  // Opens Default sms app
    //             //intent: '' // Sends sms without opening default sms app
    //         }
    //     }
    //     this.smsVar.send('', this.url, options)
    //         .then(() => {
    //             console.log("success");
    //         }, () => {
    //             //  alert("failed");
    //         });
    // }
    SettingsPage.prototype.submit = function () {
        var _this = this;
        if (this.user_birthday != '') {
            this.birthday_exist = true;
        }
        if (this.user_aniversary != '') {
            this.aniversayexist = true;
        }
        var response = this.server.UpdateUserProfile(this.firstname, this.user_email, this.lastname, this.password, this.phonecode + this.phone, this.user_birthday, this.user_aniversary);
        var loading = this.loadingCtrl.create({
            content: "Please wait...",
        });
        loading.present();
        response.subscribe(function (data) {
            _this.data.response = data;
            console.log(_this.data.response);
            console.log(_this.data.response.success);
            if (_this.data.response.success == true) {
                loading.dismiss();
                console.log(_this.data.response.updated_data.first_name);
                _this.nativeStorage.setItem('user', {
                    firstName: _this.data.response.updated_data.first_name,
                    lastName: _this.data.response.updated_data.last_name,
                    phone: _this.data.response.updated_data.phone,
                    password: _this.data.response.updated_data.password,
                    udid: _this.data.response.updated_data.udid,
                    image: _this.data.response.updated_data.image,
                    ID: _this.user_id,
                    date: _this.data.response.updated_data.date_joined,
                    email: _this.data.response.updated_data.email,
                    birthday: _this.data.response.updated_data.birthday,
                    aniversary: _this.data.response.updated_data.anniversary,
                    phone_verify: _this.phone_verify
                }).then(function () {
                    console.log(_this.image);
                    var alert = _this.alertCtrl.create({
                        title: 'Success',
                        subTitle: 'Settings successfully updated.',
                        buttons: ['Okay']
                    });
                    alert.present();
                })
                    .catch(function (err) { console.log(err); });
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: 'Settings not updated. Please try again.',
                    buttons: ['Okay']
                });
                loading.dismiss();
                alert_1.present();
            }
        }, function (error) {
            console.log("Oooops!");
        });
    };
    SettingsPage.prototype.OpenTermsAndPolicy = function () {
        this.navCtrl.push('TermAndPolicyPage');
    };
    SettingsPage.prototype.OpenContactUs = function () {
        this.navCtrl.push('ContactUsPage');
    };
    SettingsPage.prototype.walletCheck = function () {
        console.log(this.lockWallet);
        if (this.lockWallet == true) {
            this.verifytrueCheck();
        }
        else {
            this.confirmCode();
        }
    };
    SettingsPage.prototype.SaveLockCode = function () {
        this.nativeStorage.setItem('lock', {
            walletCode: btoa(this.globals.code)
        })
            .then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
    };
    SettingsPage.prototype.confirmCode = function () {
        var _this = this;
        this.nativeStorage.getItem('lock').then(function (data) {
            _this.code = atob(data.walletCode);
            _this.pinDialog.prompt('Enter your PIN', 'Verify PIN', ['Cancel', 'Okay'])
                .then(function (result) {
                if (result.buttonIndex == 2) {
                    console.log('User clicked OK, value is: ', result.input1);
                    if (_this.code == result.input1) {
                        _this.lockWallet = false;
                        _this.globals.WallletLock = _this.lockWallet;
                    }
                    else {
                        _this.lockWallet = true;
                        var alert_2 = _this.alertCtrl.create({
                            title: 'Error',
                            subTitle: 'Incorrect password.',
                            buttons: ['Okay']
                        });
                        alert_2.present();
                    }
                }
                else if (result.buttonIndex == 1) {
                    console.log('User cancelled');
                }
            });
        }).catch(function (err) { return console.log; });
    };
    SettingsPage.prototype.verifytrueCheck = function () {
        var _this = this;
        this.pinDialog.prompt('Enter your PIN', 'PIN', ['Submit', 'Cancel'])
            .then(function (result) {
            if (result.buttonIndex == 1) {
                console.log('User clicked submit, value is: ', result.input1);
                _this.code = result.input1;
                _this.pinDialog.prompt('Confirm your PIN', 'Verify PIN', ['Cancel', 'Okay'])
                    .then(function (result) {
                    if (result.buttonIndex == 2) {
                        console.log('User clicked OK, value is: ', result.input1);
                        if (_this.code == result.input1) {
                            _this.globals.code = _this.code;
                            _this.SaveLockCode();
                            _this.lockWallet = true;
                            _this.globals.WallletLock = _this.lockWallet;
                            console.log(_this.globals.WallletLock);
                        }
                        else {
                            _this.PinCheck();
                        }
                    }
                    else if (result.buttonIndex == 1) {
                        console.log('User cancelled');
                        _this.lockWallet = false;
                        _this.globals.WallletLock = _this.lockWallet;
                    }
                });
            }
            else if (result.buttonIndex == 2) {
                console.log('User cancelled');
                _this.lockWallet = false;
                _this.globals.WallletLock = _this.lockWallet;
            }
        });
        // });      
    };
    SettingsPage.prototype.PinCheck = function () {
        var _this = this;
        this.pinDialog.prompt('PIN does not match', 'Verify PIN', ['Cancel', 'Okay'])
            .then(function (result) {
            if (result.buttonIndex == 2) {
                console.log('User clicked OK, value is: ', result.input1);
                if (_this.code == result.input1) {
                    _this.globals.code = _this.code;
                    _this.SaveLockCode();
                    _this.lockWallet = true;
                    _this.globals.WallletLock = _this.lockWallet;
                }
                else {
                    var alert_3 = _this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'Incorrect password.Please try again.',
                        buttons: ['Okay']
                    });
                    alert_3.present();
                }
            }
            else if (result.buttonIndex == 1) {
                console.log('User cancelled');
            }
            _this.lockWallet = false;
            _this.globals.WallletLock = _this.lockWallet;
        });
    };
    // verify(){
    //     this.touchId.verifyFingerprint('Scan your fingerprint to unlock').then((res) => {
    //         this.lockWallet = false;
    //         this.globals.WallletLock = this.lockWallet;
    //     }, (err) => {
    //         console.log(err);
    //         this.lockWallet = true;
    //         this.globals.WallletLock = this.lockWallet;
    //     });
    // }
    SettingsPage.prototype.Edit = function () {
        this.Unedit = false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Navbar"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Navbar"])
    ], SettingsPage.prototype, "navBar", void 0);
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/settings/settings.html"*/'<!--\n  Generated template for the Setting page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="Open-Sans-bold">\n\n  <ion-navbar color="primary">\n    <ion-title>Settings</ion-title>\n    <!-- <ion-buttons end>\n      <button ion-button style="color:white; float:right" (click)="presentActionSheet()" clear small>Share</button>\n    </ion-buttons> -->\n\n    <ion-buttons end>\n      <button ion-button style="color:white; float:right" type="submit" (click)="submit()" clear small>Update</button>\n    </ion-buttons>\n    \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-color:#fff" class="Open-Sans-regular">\n    <div style="font-family: Open Sans;" class="title1">\n        <img src={{globals.b_logo}} style="    position: relative; left: 26%;  width: 50%;  height: auto;  ">\n      </div>\n\n  <!-- <ion-list no-lines style="margin: 0;">\n    <ion-item style=" float:left;  width: 55%;">\n      <ion-label> Lock wallet </ion-label>\n      <ion-toggle [(ngModel)]="lockWallet" (ionChange)="walletCheck()" checked="false"></ion-toggle>\n    </ion-item>\n\n  </ion-list> -->\n\n\n  <ion-list>\n\n\n    <ion-item style="border-top:none;">\n      <ion-label floating>First name </ion-label>\n      <ion-input type="text" name="first_name" [(ngModel)]="firstname"> </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Last name </ion-label>\n      <ion-input type="text" name="last_name"   [(ngModel)]="lastname"> </ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Phone</ion-label>\n      <ion-input class="code-inpt" type="text" disabled *ngIf="phonecode == \'+1\'" name="phonecode" [(ngModel)]="phonecode"> </ion-input>\n      <ion-input class="code-inpt" type="text" value="+1" disabled name="phonecode" *ngIf="phonecode != \'+1\'"> </ion-input>\n\n      <ion-input style="width:73%;" type="number" name="phone" [(ngModel)]="phone"> </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Email</ion-label>\n      <ion-input type="text" disabled="true" [(ngModel)]="globals.Email"> </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input type="password" name="password" [(ngModel)]="password"> </ion-input>\n    </ion-item>\n\n    <!-- <ion-item>\n      <ion-label floating>Birthday</ion-label>\n      <ion-datetime disabled="{{birthday_exist}}" pickerFormat="MMM/DD/YYYY" displayFormat="MMM/DD/YYYY" [(ngModel)]="user_birthday"></ion-datetime>\n\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label floating>Anniversary Date</ion-label>\n      <ion-datetime disabled="{{aniversayexist}}" pickerFormat="MMM/DD/YYYY" displayFormat="MMM/DD/YYYY" [(ngModel)]="user_aniversary"></ion-datetime>\n\n    </ion-item> -->\n  </ion-list>\n\n  <!-- <ion-list no-lines style="margin-bottom: 5px;">\n\n    <ion-item>\n      <p style="color:black;width:50%;position:absolute" (click)="OpenTermsAndPolicy()">Terms and policy</p>\n      <p style="color:black;width:50%;float:right" (click)="OpenContactUs()">Contact us</p>\n    </ion-item>\n\n  </ion-list> -->\n\n\n  \n\n\n\n</ion-content>\n\n\n<ion-footer>\n\n  <div style=" width:100%; ">\n\n    <div class="inner" style="width: 96%;margin-left: 2%;">\n      <button ion-button round  block type="submit" (click)="submit()" block>Update</button>\n      <!-- <button ion-button *ngIf="Unedit" block type="submit" (click)="Edit()" block>Edit</button> -->\n    \n    </div>\n    <!-- <div class="inner" style=" width: 48%">\n      <button ion-button block (click)="logout()">Logout</button>\n    </div> -->\n  </div>\n\n</ion-footer>'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_7__providers_server_server__["a" /* ServerProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_pin_dialog__["a" /* PinDialog */], __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ActionSheetController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ })

});
//# sourceMappingURL=10.js.map
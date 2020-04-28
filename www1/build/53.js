webpackJsonp([53],{

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BranchesAboutusPageModule", function() { return BranchesAboutusPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__branches_aboutus__ = __webpack_require__(917);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BranchesAboutusPageModule = (function () {
    function BranchesAboutusPageModule() {
    }
    BranchesAboutusPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__branches_aboutus__["a" /* BranchesAboutusPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__branches_aboutus__["a" /* BranchesAboutusPage */]),
            ],
        })
    ], BranchesAboutusPageModule);
    return BranchesAboutusPageModule;
}());

//# sourceMappingURL=branches-aboutus.module.js.map

/***/ }),

/***/ 917:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BranchesAboutusPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BranchesAboutusPage = (function () {
    function BranchesAboutusPage(loadingCtrl, iab, navCtrl, navParams, globals, server) {
        this.loadingCtrl = loadingCtrl;
        this.iab = iab;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.globals = globals;
        this.server = server;
        this.daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.resturant_list();
        this.get_social();
        this.get_aboutus();
        this.hours_operation = this.update_time_(this.globals.hours_operation);
    }
    BranchesAboutusPage.prototype.ionViewWillEnter = function () {
        this.loadMap();
    };
    BranchesAboutusPage.prototype.loadMap = function () {
        var myLatLng = new google.maps.LatLng(parseFloat(this.globals.latitude), parseFloat(this.globals.longitude));
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: myLatLng
        });
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: ''
        });
    };
    BranchesAboutusPage.prototype.update_time_ = function (p_hours) {
        var _this = this;
        p_hours.forEach(function (element) {
            if (element[0] != 'opened' && element[0] != 'closed') {
                element[0] = _this.tConvert(element[0]);
            }
            if (element[1] != 'opened' && element[1] != 'closed') {
                element[1] = _this.tConvert(element[1]);
            }
        });
        return p_hours;
    };
    BranchesAboutusPage.prototype.tConvert = function (time_) {
        if (time_ == 0) {
            time_ = 12;
        }
        if (time_ > 12) {
            time_ = time_ + '';
            var ti = time_.split('.');
            ti[0] = parseFloat(ti[0]);
            ti[0] = ti[0] - 12;
            if (ti[1] == "5") {
                ti[1] = ':30';
            }
            else if (ti[1] != "5") {
                ti[1] = ':00';
            }
            time_ = ti[0] + ti[1] + 'PM';
        }
        else {
            time_ = time_ + '';
            var ti = '';
            ti = time_.split('.');
            if (ti[1] == "5") {
                ti[1] = ':30';
                time_ = '';
                time_ = ti[0] + ti[1] + 'AM';
            }
            else if (ti[1] == undefined) {
                time_ = '';
                ti[1] = ':00';
                time_ = ti[0] + ti[1] + 'AM';
            }
        }
        time_ = time_ + '';
        var t = time_.split(':');
        return t[0] + ':' + t[1]; // return adjusted time_ or original string
    };
    BranchesAboutusPage.prototype.resturant_list = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "please wait...",
        });
        loading.present();
        var response = this.server.getRestaurantslist('100000', 'branches', '0,0', '100', 'order');
        response.subscribe(function (data) {
            loading.dismiss();
            _this.places = data.results;
        }, function (error) {
        });
    };
    BranchesAboutusPage.prototype.branch_about = function (name, business_id, hours_operation, latitude, longitude, username) {
        this.navCtrl.push('AboutusPage', { name: name, business_id: business_id, hours_operation: hours_operation, latitude: latitude, longitude: longitude, username: username });
    };
    BranchesAboutusPage.prototype.get_social = function () {
        var _this = this;
        var response = this.server.get_social();
        response.subscribe(function (data) {
            _this.social_links = data.data;
        }, function (error) {
            console.log(error);
        });
    };
    BranchesAboutusPage.prototype.get_aboutus = function () {
        var _this = this;
        var response = this.server.get_about_us(this.globals.new_id);
        response.subscribe(function (data) {
            _this.aboutus = data.data.about[0];
            _this.phone = data.data.phone;
            _this.address = data.data.address;
            _this.email = data.data.email;
        }, function (error) {
            console.log(error);
        });
    };
    BranchesAboutusPage.prototype.launch = function (url) {
        console.log("url function");
        console.log(url);
        this.iab.create(url, "_self");
    };
    BranchesAboutusPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-branches-aboutus',template:/*ion-inline-start:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/branches-aboutus/branches-aboutus.html"*/'\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>About Us</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n  <img src={{aboutus?.image}} class="myimage">\n  <div padding>\n    <h3  [innerHTML]="aboutus?.title">\n    </h3>\n    <h5 [innerHTML]="aboutus?.description"></h5>\n            <ion-row  *ngIf="globals.branch_enabled != 1">\n              <ion-col col-4>\n                <div class="fb">Days</div>\n                <div *ngFor="let day of daysInWeek">{{day}}</div>\n                \n              </ion-col>\n                <ion-col col-4 text-center>\n                <div class="fb">Opening Time</div>\n          \n                  <div *ngFor="let item of hours_operation">\n                     {{item[0]}}\n                  </div>\n                 </ion-col>\n                  <ion-col col-4 text-center>\n                <div class="fb">Closing Time</div>\n                    <div *ngFor="let item of hours_operation">\n                        {{item[1]}}\n                    </div>\n                  </ion-col>\n          \n              \n            </ion-row>\n            <ion-list margin-top>\n              <ion-item style="background:transparent">\n                <ion-icon name="call" item-start></ion-icon>\n                  {{phone}}\n              </ion-item>\n              <ion-item style="background:transparent">\n                <ion-icon name="locate" item-start></ion-icon>\n                  {{address}}\n              </ion-item>\n              <ion-item style="background:transparent">\n                <ion-icon name="mail" item-start></ion-icon>\n                  {{email}}\n              </ion-item>\n            </ion-list>\n\n            <div #map id="map" margin-top></div>\n\n            <ion-card >\n                <h2 *ngIf="globals.branch_enabled == 1"  margin-top text-center class="branches">Branches</h2>\n\n                <div *ngIf="globals.branch_enabled == 1">\n                  <div  *ngFor=\'let item of places\' (click)="branch_about(item.name,item.business_id,item.hours_operation,item.latitude,item.longitude,item.username)">\n                    <ion-row text-center class="bcd">\n                      <ion-col col-6>\n                        {{item.name}}\n                      </ion-col>\n                      <ion-col col-6>\n                        {{item.phone}}\n                      </ion-col>\n                    </ion-row>\n                  </div>\n                </div>\n            </ion-card>\n           \n  </div>\n \n\n</ion-content>\n<ion-footer padding margin-top class="foter">\n    <ion-row>\n        <ion-col  *ngFor="let item of social_links">\n             <ion-icon *ngIf="item.url" name={{item.icon}} class="myicon1" (click)="launch(item.url)"></ion-icon> \n         </ion-col>\n     </ion-row>\n</ion-footer>\n'/*ion-inline-end:"/Users/macbookproratina/projects/mikronexus-customer-demo-app/src/pages/branches-aboutus/branches-aboutus.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* GlobalVariable */], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */]])
    ], BranchesAboutusPage);
    return BranchesAboutusPage;
}());

//# sourceMappingURL=branches-aboutus.js.map

/***/ })

});
//# sourceMappingURL=53.js.map
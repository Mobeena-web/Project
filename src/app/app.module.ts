import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,  } from 'ionic-angular';
import { HttpModule } from '@angular/http'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MainTabsPageModule } from '../pages/main-tabs/main-tabs.module';
import { ServerProvider } from '../providers/server/server';
import { GlobalVariable } from './global';
import { PinDialog } from '@ionic-native/pin-dialog';
import { NativeStorage } from '@ionic-native/native-storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NativeAudio } from '@ionic-native/native-audio';
import { Geolocation } from '@ionic-native/geolocation';
import { Ionic2RatingModule } from 'ionic2-rating';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SocialSharing } from '@ionic-native/social-sharing';
import { GooglePlus } from '@ionic-native/google-plus';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocationAccuracy } from '@ionic-native/location-accuracy';


import { Stripe } from '@ionic-native/stripe';
import { IntroPage1Page } from '../pages/intro-page1/intro-page1';
import { IntroPage2Page } from '../pages/intro-page2/intro-page2';
import { IntroPage3Page } from '../pages/intro-page3/intro-page3';
import { IntroPage4Page } from '../pages/intro-page4/intro-page4';
import { IntroPage5Page } from '../pages/intro-page5/intro-page5';
import { IntroPage6PageModule } from '../pages/intro-page6/intro-page6.module';
import { IntroPage7PageModule } from '../pages/intro-page7/intro-page7.module';
import { IntroPage8PageModule } from '../pages/intro-page8/intro-page8.module';
// import { OneSignal } from '@ionic-native/onesignal';
import { Calendar } from '@ionic-native/calendar';
import { GetlocationProvider } from '../providers/getlocation/getlocation';
import { MobileVerificationPromptPage } from '../pages/mobile-verification-prompt/mobile-verification-prompt';
import {ProceedModelPageModule} from '../pages/proceed-model/proceed-model.module'
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CodePush } from '@ionic-native/code-push';
import { QRCodeModule } from 'angularx-qrcode';
import { OrderModule } from 'ngx-order-pipe';
import { from } from 'rxjs/observable/from';

// import * as Sentry from "sentry-cordova";


// Sentry.init({ dsn: "https://30fe72f6fa8a4c048f84c0391b992985@o473947.ingest.sentry.io/5509538"});
// export class SentryIonicErrorHandler extends IonicErrorHandler {
//   handleError(error) {
//     super.handleError(error);
//     try {
//       Sentry.captureException(error.originalError || error);
//     } catch (e) {
//       console.error(e);
//     }
//   }
// }

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    IntroPage1Page,
    IntroPage2Page,
    IntroPage3Page,
    IntroPage4Page,
    IntroPage5Page,
    MobileVerificationPromptPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { tabsHideOnSubPages: 'false' }),
    HttpModule,
    HttpClientModule,
    Ionic2RatingModule,
    IntroPage6PageModule,
    IntroPage7PageModule,
    IntroPage8PageModule,
    MainTabsPageModule,
    ProceedModelPageModule,
    QRCodeModule,
    OrderModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    IntroPage1Page,
    IntroPage2Page,
    IntroPage3Page,
    IntroPage4Page,
    IntroPage5Page,
    MobileVerificationPromptPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    // {provide: ErrorHandler, useClass: SentryIonicErrorHandler},
    ServerProvider, GlobalVariable, NativeStorage, BarcodeScanner, InAppBrowser, 
    PinDialog, NativeAudio, Geolocation, CallNumber, EmailComposer, Camera, Crop, 
    Diagnostic, SocialSharing, Stripe,
    Calendar,
    GetlocationProvider, PhotoViewer, CodePush,
    GooglePlus,
    // Facebook,
    HttpClient,
    AndroidPermissions,
    LocationAccuracy
  ]
})
export class AppModule { }

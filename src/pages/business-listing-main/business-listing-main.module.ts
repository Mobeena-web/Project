import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessListingMainPage } from './business-listing-main';

@NgModule({
  declarations: [
    BusinessListingMainPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessListingMainPage),
  ],
})
export class BusinessListingMainPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessLocationPage } from './business-location';

@NgModule({
  declarations: [
    BusinessLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessLocationPage),
  ],
})
export class BusinessLocationPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpsellProductModalPage } from './upsell-product-modal';

@NgModule({
  declarations: [
    UpsellProductModalPage,
  ],
  imports: [
    IonicPageModule.forChild(UpsellProductModalPage),
  ],
})
export class UpsellProductModalPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutProcessPage } from './checkout-process';

@NgModule({
  declarations: [
    CheckoutProcessPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutProcessPage),
  ],
  exports: [
    CheckoutProcessPage
  ]
})
export class CheckoutProcessPageModule {}

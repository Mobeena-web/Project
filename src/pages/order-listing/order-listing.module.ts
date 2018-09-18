import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderListingPage } from './order-listing';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    OrderListingPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderListingPage),
    Ionic2RatingModule
  ],
})
export class OrderListingPageModule {}

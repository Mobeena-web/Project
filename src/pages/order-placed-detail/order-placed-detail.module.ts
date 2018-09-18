import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPlacedDetailPage } from './order-placed-detail';

@NgModule({
  declarations: [
    OrderPlacedDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderPlacedDetailPage),
  ],
})
export class OrderPlacedDetailPageModule {}

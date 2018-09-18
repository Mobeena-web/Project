import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationPage } from './reservation';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationPage),
    Ionic2RatingModule
  ],
})
export class ReservationPageModule {}

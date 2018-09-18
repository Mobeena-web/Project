import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationCheckingPage } from './reservation-checking';

@NgModule({
  declarations: [
    ReservationCheckingPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationCheckingPage),
  ],
})
export class ReservationCheckingPageModule {}

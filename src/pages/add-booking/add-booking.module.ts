import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBookingPage } from './add-booking';

@NgModule({
  declarations: [
    AddBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBookingPage),
  ],
})
export class AddBookingPageModule {}

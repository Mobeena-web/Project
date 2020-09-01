import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBookingPage } from './add-booking';

import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    AddBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBookingPage),
    CalendarModule
  ],
})
export class AddBookingPageModule {}

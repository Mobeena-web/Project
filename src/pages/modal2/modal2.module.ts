import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Modal2Page } from './modal2';
import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    Modal2Page,
  ],
  imports: [
    IonicPageModule.forChild(Modal2Page),
    CalendarModule
  ],
})
export class Modal2PageModule {}

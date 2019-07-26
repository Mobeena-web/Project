import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DayClosePage } from './day-close';

@NgModule({
  declarations: [
    DayClosePage,
  ],
  imports: [
    IonicPageModule.forChild(DayClosePage),
  ],
})
export class DayClosePageModule {}

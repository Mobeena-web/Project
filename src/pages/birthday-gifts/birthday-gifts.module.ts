import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BirthdayGiftsPage } from './birthday-gifts';

@NgModule({
  declarations: [
    BirthdayGiftsPage,
  ],
  imports: [
    IonicPageModule.forChild(BirthdayGiftsPage),
  ],
})
export class BirthdayGiftsPageModule {}

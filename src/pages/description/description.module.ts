import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescriptionPage } from './description';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    DescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(DescriptionPage),
    Ionic2RatingModule
  ],
})
export class DescriptionPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealsPage } from './deals';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    DealsPage,
  ],
  imports: [
    IonicPageModule.forChild(DealsPage),
    Ionic2RatingModule
  ],
})
export class DealsPageModule {}

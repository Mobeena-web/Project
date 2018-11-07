import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutusPage } from './aboutus';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    AboutusPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutusPage),
    Ionic2RatingModule
  ],
})
export class AboutusPageModule {}

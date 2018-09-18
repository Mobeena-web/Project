import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointsModelPage } from './points-model';

@NgModule({
  declarations: [
    PointsModelPage,
  ],
  imports: [
    IonicPageModule.forChild(PointsModelPage),
  ],
})
export class PointsModelPageModule {}

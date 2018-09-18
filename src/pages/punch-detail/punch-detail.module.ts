import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PunchDetailPage } from './punch-detail';

@NgModule({
  declarations: [
    PunchDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PunchDetailPage),
  ],
})
export class PunchDetailPageModule {}

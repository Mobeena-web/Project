import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRewardsPage } from './my-rewards';

@NgModule({
  declarations: [
    MyRewardsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyRewardsPage),
  ],
})
export class MyRewardsPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobileEmailVarificationPage } from './mobile-email-varification';

@NgModule({
  declarations: [
    MobileEmailVarificationPage,
  ],
  imports: [
    IonicPageModule.forChild(MobileEmailVarificationPage),
  ],
})
export class MobileEmailVarificationPageModule {}

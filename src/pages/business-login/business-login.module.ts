import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessLoginPage } from './business-login';

@NgModule({
  declarations: [
    BusinessLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessLoginPage),
  ],
})
export class BusinessLoginPageModule {}

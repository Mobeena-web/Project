import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeforeLoginPage } from './before-login';

@NgModule({
  declarations: [
    BeforeLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(BeforeLoginPage),
  ],
})
export class BeforeLoginPageModule {}

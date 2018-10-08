import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobileUpdatePage } from './mobile-update';

@NgModule({
  declarations: [
    MobileUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(MobileUpdatePage),
  ],
})
export class MobileUpdatePageModule {}

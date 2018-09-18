import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomQrPage } from './custom-qr';

@NgModule({
  declarations: [
    CustomQrPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomQrPage),
  ],
})
export class CustomQrPageModule {}

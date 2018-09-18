import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntroPage6Page } from './intro-page6';

@NgModule({
  declarations: [
    IntroPage6Page,
  ],
  imports: [
    IonicPageModule.forChild(IntroPage6Page),
  ],
  exports: [
    IntroPage6Page
  ]
})
export class IntroPage6PageModule {}

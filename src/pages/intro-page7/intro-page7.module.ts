import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntroPage7Page } from './intro-page7';

@NgModule({
  declarations: [
    IntroPage7Page,
  ],
  imports: [
    IonicPageModule.forChild(IntroPage7Page),
  ],
  exports: [
    IntroPage7Page
  ]
})
export class IntroPage7PageModule {}

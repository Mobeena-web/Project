import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiftcardBannerPage } from './giftcard-banner';

@NgModule({
  declarations: [
    GiftcardBannerPage,
  ],
  imports: [
    IonicPageModule.forChild(GiftcardBannerPage),
  ],
})
export class GiftcardBannerPageModule {}

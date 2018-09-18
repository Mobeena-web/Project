import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletModelPage } from './wallet-model';

@NgModule({
  declarations: [
    WalletModelPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletModelPage),
  ],
})
export class WalletModelPageModule {}

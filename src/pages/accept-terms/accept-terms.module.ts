import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptTermsPage } from './accept-terms';

@NgModule({
  declarations: [
    AcceptTermsPage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptTermsPage),
  ],
})
export class AcceptTermsPageModule {}

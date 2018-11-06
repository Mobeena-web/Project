import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealsListPage } from './deals-list';

@NgModule({
  declarations: [
    DealsListPage,
  ],
  imports: [
    IonicPageModule.forChild(DealsListPage),
  ],
})
export class DealsListPageModule {}

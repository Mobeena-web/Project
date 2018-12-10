import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessListPage } from './business-list';

@NgModule({
  declarations: [
    BusinessListPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessListPage),
  ],
})
export class BusinessListPageModule {}

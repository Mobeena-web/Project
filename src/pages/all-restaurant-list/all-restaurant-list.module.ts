import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllRestaurantListPage } from './all-restaurant-list';

@NgModule({
  declarations: [
    AllRestaurantListPage,
  ],
  imports: [
    IonicPageModule.forChild(AllRestaurantListPage),
  ],
})
export class AllRestaurantListPageModule {}

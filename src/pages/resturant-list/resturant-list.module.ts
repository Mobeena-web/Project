import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResturantListPage } from './resturant-list';

@NgModule({
  declarations: [
    ResturantListPage,
  ],
  imports: [
    IonicPageModule.forChild(ResturantListPage),
  ],
})
export class ResturantListPageModule {}

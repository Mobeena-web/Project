import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewsPage } from './reviews';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ReviewsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewsPage),
    Ionic2RatingModule
  ],
})
export class ReviewsPageModule {}

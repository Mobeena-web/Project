import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResponseApiPage } from './response-api';

@NgModule({
  declarations: [
    ResponseApiPage,
  ],
  imports: [
    IonicPageModule.forChild(ResponseApiPage),
  ],
})
export class ResponseApiPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookedDetailPage } from './booked-detail';

@NgModule({
  declarations: [
    BookedDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BookedDetailPage),
  ],
})
export class BookedDetailPageModule {}

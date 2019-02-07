import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BooklistPage } from './booklist';

@NgModule({
  declarations: [
    BooklistPage,
  ],
  imports: [
    IonicPageModule.forChild(BooklistPage),
  ],
})
export class BooklistPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketByTypePage } from './ticket-by-type';

@NgModule({
  declarations: [
    TicketByTypePage,
  ],
  imports: [
    IonicPageModule.forChild(TicketByTypePage),
  ],
})
export class TicketByTypePageModule {}

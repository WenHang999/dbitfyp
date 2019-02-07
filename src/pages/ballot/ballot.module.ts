import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BallotPage } from './ballot';

@NgModule({
  declarations: [
    BallotPage,
  ],
  imports: [
    IonicPageModule.forChild(BallotPage),
  ],
})
export class BallotPageModule {}

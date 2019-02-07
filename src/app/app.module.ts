import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { SupportcontactPage } from '../pages/settings-supportcontact/supportcontact';
import { SettingsChangepasswordPage } from '../pages/settings-changepassword/settings-changepassword';
import { FaQsPage } from '../pages/settings-fa-qs/fa-qs';
import { ManageUserPage} from '../pages/manage-user/manage-user';
import { AddEventPage } from '../pages/add-event/add-event'
import { BookedDetailPage } from '../pages/booked-detail/booked-detail';
import { BallotPage} from'../pages/ballot/ballot';
import { TicketlistPage} from'../pages/ticketlist/ticketlist';
import { TicketDetailPage} from'../pages/ticket-detail/ticket-detail';
import { UserFormPage} from '../pages/user-form/user-form'
import { BooklistPage} from '../pages/booklist/booklist'

import { HttpClientModule } from '@angular/common/http'; 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShareService } from'../pages/server/server';
import { HttpModule } from '@angular/http';
import { NgCalendarModule } from 'ionic2-calendar';
import { HttpClient } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { IonicStorageModule } from '@ionic/storage';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { StarRatingModule } from 'ionic3-star-rating';
import { CallNumber } from '@ionic-native/call-number/ngx';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SettingsPage,
    AddEventPage,
    SupportcontactPage,
    FaQsPage,
    SettingsChangepasswordPage,
    ManageUserPage,
    BookedDetailPage,
    BallotPage,
    TicketlistPage,
    TicketDetailPage,
    UserFormPage,
    BooklistPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NgCalendarModule,
    StarRatingModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AddEventPage,
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SettingsPage,
    SupportcontactPage,
    FaQsPage,
    SettingsChangepasswordPage,
    ManageUserPage,
    BookedDetailPage,
    BallotPage,
    TicketlistPage,
    TicketDetailPage,
    UserFormPage,
    BooklistPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    ShareService,
    HttpClient,
    File,
    FileTransfer,
    FileTransferObject,
    FilePath,
    Transfer,
    TransferObject, 
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class AppModule {}

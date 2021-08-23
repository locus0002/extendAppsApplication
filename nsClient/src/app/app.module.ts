import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { BookListPage } from '../pages/book-list/book-list';
import { BookDetailPage } from '../pages/book-detail/book-detail';
import { BookCreatePage } from '../pages/book-create/book-create';

import { MyApp } from './app.component';
import { BookProvider } from '../providers/book/book';
import { Utils } from '../shared/utils';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    BookListPage,
    BookDetailPage,
    BookCreatePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BookListPage,
    BookDetailPage,
    BookCreatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BookProvider,
    Utils
  ]
})
export class AppModule {}

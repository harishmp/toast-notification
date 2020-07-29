import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  ToastrModule,
  ToastContainerModule,
} from '../lib/public_api';

import { AppComponent } from './app.component';

import { NotificationComponent } from './notification/notification.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ToastContainerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

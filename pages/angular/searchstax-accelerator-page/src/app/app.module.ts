import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchstudioUxAngularModule } from '@searchstax-inc/searchstudio-ux-angular';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchstudioUxAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarCompComponent } from './nav-bar-comp/nav-bar-comp.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarCompComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

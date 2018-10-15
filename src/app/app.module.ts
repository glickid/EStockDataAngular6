import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarCompComponent } from './Components/nav-bar-comp/nav-bar-comp.component';
import { UserComponent } from './Components/user/user.component';
import { UserService } from './Services/User/user.service';


@NgModule({
  declarations: [
    AppComponent,
    NavBarCompComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarCompComponent } from './Components/nav-bar-comp/nav-bar-comp.component';
import { UserComponent } from './Components/user/user.component';
import { UserService } from './Services/User/user.service';
import { HomeComponent } from './home/home.component';
import { DataService } from './Services/Data/data.service';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './Components/signup/signup/signup.component';
// import { portfolio } from './Services/Portfolio/Portfolio';
// import { Alert } from './Services/Alerts/Alert';


@NgModule({
  declarations: [
    AppComponent,
    NavBarCompComponent,
    UserComponent,
    HomeComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
    // portfolio,
    // Alert
  ],
  providers: [UserService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarCompComponent } from './Components/nav-bar-comp/nav-bar-comp.component';
import { UserComponent } from './Components/user/user.component';
// import { UserService } from './Services/User/user.service';
import { HomeComponent } from './home/home.component';
// import { DataService } from './Services/Data/data.service';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './Components/signup/signup/signup.component';
import { PortfolioComponent } from './Components/portfolio/portfolio.component';
import { StockChartsComponent } from './Components/stock-charts/stock-charts.component';
import { CryptoCurrenciesComponent } from './Components/crypto-currencies/crypto-currencies.component';
import { SigninComponent } from './Components/signin/signin.component';
// import { portfolio } from './Services/Portfolio/Portfolio';
// import { Alert } from './Services/Alerts/Alert';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    NavBarCompComponent,
    UserComponent,
    HomeComponent,
    SignupComponent,
    PortfolioComponent,
    StockChartsComponent,
    CryptoCurrenciesComponent,
    SigninComponent
  ],
  imports: [
    SharedModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // portfolio,
    // Alert
  ],
  // providers: [UserService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

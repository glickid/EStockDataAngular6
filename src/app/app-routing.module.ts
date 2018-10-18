import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router'
import { SignupComponent } from './Components/signup/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './Components/portfolio/portfolio.component'
import { StockChartsComponent } from './Components/stock-charts/stock-charts.component'
import { CryptoCurrenciesComponent } from './Components/crypto-currencies/crypto-currencies.component'import { zip } from 'rxjs';

const appRoutes : Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'home' , component: HomeComponent},
  { path: 'portfolio', component: PortfolioComponent},
  { path: 'charts', component: StockChartsComponent},
  { path: 'crypto', component: CryptoCurrenciesComponent},
  { path: '', redirectTo: "/home", pathMatch:'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

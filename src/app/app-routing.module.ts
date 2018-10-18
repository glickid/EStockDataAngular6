import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router'
import { SignupComponent } from './Components/signup/signup/signup.component';
import { HomeComponent } from './home/home.component';

const appRoutes : Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'home' , component: HomeComponent},
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

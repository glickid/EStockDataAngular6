import { NgModule, ModuleWithProviders } from '@angular/core';
import { UserService } from '../Services/User/user.service';
import { DataService } from '../Services/Data/data.service'

@NgModule({})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UserService, DataService]
    };
  }
}
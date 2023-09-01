import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:"",component:SignUpPageComponent
  },
  {
    path:"signup",component:SignUpPageComponent
  },
  {
    path:"login",component:LoginPageComponent
  },
  {
    path:"dashboard",component:DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

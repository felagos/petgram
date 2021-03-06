import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { RegisterPage } from '../modals/register/register.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage
  },
  {
    path: "register",
    component: RegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageRoutingModule } from './auth-routing.module';
import { AuthPage } from './auth.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPage } from '../modals/register/register.page';

@NgModule({
  imports: [
    CommonModule,
    AuthPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [AuthPage, RegisterPage],
  entryComponents: [RegisterPage]
})
export class AuthPageModule {}

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { SafeUrlPipe } from './pipes/safe-url.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports: [
    HeaderComponent,
    IonicModule,
    SafeUrlPipe
  ]
})
export class SharedModule { }

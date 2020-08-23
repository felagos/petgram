import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { SlideCategoryComponent } from './components/slide-category/slide-category.component';
import { ScrollPetsComponent } from './components/scroll-pets/scroll-pets.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    SlideCategoryComponent,
    ScrollPetsComponent,
    SafeUrlPipe,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    IonicModule,
    SafeUrlPipe,
    SlideCategoryComponent,
    ScrollPetsComponent,
    CapitalizePipe
  ]
})
export class SharedModule { }

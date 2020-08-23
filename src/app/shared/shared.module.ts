import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { SafeUrlPipe, CapitalizePipe, PhotoProfilePipe } from './pipes';
import { SlideCategoryComponent } from './components/slide-category/slide-category.component';
import { ScrollPetsComponent } from './components/scroll-pets/scroll-pets.component';
import { EmptyResultComponent } from './components/empty-result/empty-result.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SlideCategoryComponent,
    ScrollPetsComponent,
    SafeUrlPipe,
    CapitalizePipe,
    EmptyResultComponent,
    PhotoProfilePipe
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
    CapitalizePipe,
    EmptyResultComponent,
    PhotoProfilePipe
  ]
})
export class SharedModule { }

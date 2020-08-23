import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { SlideCategoryComponent } from './components/slide-category/slide-category.component';
import { ScrollPetsComponent } from './components/scroll-pets/scroll-pets.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { EmptyResultComponent } from './components/empty-result/empty-result.component';
import { PhotoProfilePipe } from './pipes/photo-profile.pipe';

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

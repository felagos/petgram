import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesPageRoutingModule } from './favorites-routing.module';
import { FavoritesPage } from './favorites.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FavoritesPageRoutingModule,
    SharedModule
  ],
  declarations: [FavoritesPage]
})
export class FavoritesPageModule {}

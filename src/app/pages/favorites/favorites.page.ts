import { Component } from '@angular/core';
import { ApiService } from 'src/app/services';
import { PetModel } from 'src/app/models';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {

  public pets: PetModel[] = [];

  constructor(private apiService: ApiService) { }

  ionViewDidEnter() {
    this.apiService.getAllFavorities().subscribe(pets => this.pets = pets.data);
  }

}

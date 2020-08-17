import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services';
import { PetModel } from 'src/app/models';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  public pets: PetModel[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.apiService.getAllFavorities().subscribe(pets => this.pets = pets.data);
  }

}

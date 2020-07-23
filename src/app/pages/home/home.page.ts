import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Category } from 'src/app/models/category.model';
import { LoaderService } from 'src/app/services/loader.service';
import { PetModel } from 'src/app/models/pet.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  public slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true,
    slidesPerView: 3
  };
  public categories: Category[] = [];
  public pets: PetModel[] = [];

  constructor(private apiService: ApiService,
    private loaderService: LoaderService) { }

  ionViewDidEnter() {
    this.apiService.getAllCategories().subscribe(response => this.categories = response.data);
    this.apiService.getAllPets().subscribe(pets => this.pets = pets.data);
  }

  async showCategory(id: string) {
    this.loaderService.present("Buscando mascotas ...");
    this.apiService.getPetsByCateogryId(id).subscribe(pets => {
      this.pets = pets.data;
      this.loaderService.dismiss();
    });
  }

}

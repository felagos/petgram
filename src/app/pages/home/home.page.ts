import { Component } from '@angular/core';
import { Category, PetModel, Pagination } from 'src/app/models';
import { ApiService, LoaderService } from 'src/app/services';

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
  public pets: Pagination<PetModel>;

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

  loadMoreData(event) {
    const { hasNextPage, nextPage } = this.pets;
    if (hasNextPage) {
      this.apiService.getAllPets(nextPage).subscribe(pets => {
        this.pets = {
          ...pets,
          docs: [...this.pets.docs, ...pets.data.docs]
        };
        event.target.complete();
      });
    }
    else event.target.disabled = true;
  }

}

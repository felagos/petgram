import { Component } from '@angular/core';
import { Category, PetModel, Pagination } from 'src/app/models';
import { ApiService, LoaderService, ToastService } from 'src/app/services';

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
    private loaderService: LoaderService,
    private toastService: ToastService) { }

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

  private addToFavorite(pet: PetModel) {
    this.apiService.addToFavorite(pet._id).subscribe(response => {
      const index = this.pets.docs.findIndex(doc => doc._id === pet._id);
      this.pets.docs[index] = {
        ...this.pets.docs[index],
        favorite: true
      };
      this.toastService.presentToast("Agregado a mis favoritos");
    });
  }

  private deleteFavorite(pet: PetModel) {
    this.apiService.deleteFavorite(pet._id).subscribe(response => {
      const index = this.pets.docs.findIndex(doc => doc._id === pet._id);
      this.pets.docs[index] = {
        ...this.pets.docs[index],
        favorite: false
      };
      this.toastService.presentToast("Eliminado de mis favoritos");
    });
  }

  handleFavorite(pet: PetModel) {
    if(!pet.favorite)
      this.addToFavorite(pet);
    else
      this.deleteFavorite(pet);
  }

}

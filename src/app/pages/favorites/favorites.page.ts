import { Component } from '@angular/core';
import { ApiService, ToastService, LoaderService } from 'src/app/services';
import { PetModel } from 'src/app/models';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {

  public pets: PetModel[] = [];

  constructor(private apiService: ApiService,
    private toastService: ToastService,
    private alertController: AlertController,
    private laoder: LoaderService) { }

  async ionViewDidEnter() {
    await this.laoder.present("Cargando favoritos ...");
    this.apiService.getAllFavorities().subscribe(pets => {
      this.laoder.dismiss();
      this.pets = pets.data;
    });
  }

  private deleteFromArray(id: string) {
    this.pets = this.pets.filter(pet => pet._id !== id);
  }

  async deleteFavorite(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿ Desea quitarlo desde sus favoritos ?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.apiService.deleteFavorite(id).subscribe(() => {
              this.deleteFromArray(id);
              this.toastService.presentToast("Se ha quitado de los favoritos");
            });
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        },
      ]
    });

    await alert.present();

  }

}

import { Component } from '@angular/core';
import { ApiService, ToastService } from 'src/app/services';
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
    private alertController: AlertController) { }

  ionViewDidEnter() {
    this.apiService.getAllFavorities().subscribe(pets => this.pets = pets.data);
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

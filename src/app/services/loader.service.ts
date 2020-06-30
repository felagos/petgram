import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading = false;

  constructor(private loadingController: LoadingController) { }

  public async present(message = "Por favor espere ...") {
    this.isLoading = true;

    const loader = await this.loadingController.create({
      message
    });

    await loader.present();

    if(!this.isLoading)
      await loader.dismiss();

  }

  public async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }
}

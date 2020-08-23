import { Component } from '@angular/core';
import { UserModel } from 'src/app/models';
import { StorageService, LoaderService, CameraService } from 'src/app/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  public user: UserModel = null;

  constructor(private storage: StorageService,
    private loader: LoaderService,
    private cameraService: CameraService) { }

  async ionViewDidEnter() {
    await this.loader.present("Cargando perfil ...");

    this.user = await this.storage.getUser();

    await this.loader.dismiss();
  }

  async takePhoto() {
    const image = await this.cameraService.getPhoto();
    this.user.foto = image.base64String;
  }

}

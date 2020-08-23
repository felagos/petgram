import { Component } from '@angular/core';
import { Category, PetModel } from 'src/app/models';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, ToastService, LoaderService, CameraService } from 'src/app/services';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.page.html',
  styleUrls: ['./add-pet.page.scss'],
})
export class AddPetPage {

  public categories: Category[] = [];
  public form: FormGroup;
  public photo: string = "";
  public format: string = "";

  constructor(private fb: FormBuilder,
    private modalController: ModalController,
    private apiService: ApiService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private cameraService: CameraService) {
    this.init();
  }

  private init() {
    this.form = this.fb.group({
      category: ["", Validators.required],
      name: ["", Validators.required]
    });
  }

  public async dissmiss() {
    await this.modalController.dismiss();
  }

  public async takeFoto() {
    const image = await this.cameraService.getPhoto();

    this.photo = image.base64String;
    this.format = image.format;
  }

  public deletePreview() {
    this.photo = "";
    this.format = "";
  }

  public async savePet() {
    await this.loaderService.present();

    const { category, name } = this.form.value;
    const pet: PetModel = {
      categoriaId: category,
      nombre: name,
      foto: this.photo,
      likes: 0,
      favorite: false,
    }

    this.apiService.savePet(pet).subscribe(async () => {
      await this.loaderService.dismiss();
      await this.toastService.presentToast("Mascota agregada");
      this.dissmiss();
    });

  }

}

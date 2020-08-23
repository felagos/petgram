import { Component } from '@angular/core';
import { Category, PetModel } from 'src/app/models';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plugins, CameraResultType } from '@capacitor/core';
import { ApiService, ToastService, LoaderService } from 'src/app/services';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.page.html',
  styleUrls: ['./add-pet.page.scss'],
})
export class AddPetPage {

  public categories: Category[] = [];
  public form: FormGroup;
  private photo: string = "";

  constructor(private fb: FormBuilder,
    private modalController: ModalController,
    private apiService: ApiService,
    private toastService: ToastService,
    private loaderService: LoaderService) {
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
    try {
      const { Camera } = Plugins;

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    this.photo = image.base64String;
    } catch(e) {
      console.log(e);
      alert(e.message);
    }
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

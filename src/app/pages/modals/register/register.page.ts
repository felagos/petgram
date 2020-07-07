import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FormValidatorService } from 'src/app/services/form.validator.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageEnum } from 'src/app/enums/storage.enum';
import { HttpStatus } from 'src/app/enums/http.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private modalController: ModalController,
    private validatorService: FormValidatorService,
    private loaderService: LoaderService,
    private storage: StorageService,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router) {
    this.initFormRegister();
  }

  ngOnInit() {
  }

  private initFormRegister() {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email], this.validatorService.validateExistsEmail()],
      password: ["", Validators.required],
      repeatPassword: ["", Validators.required],
      name: ["", Validators.required],
    },
      {
        validators: [this.validatorService.validateRepeatPassword()]
      }
    );
  }

  public closeModal() {
    this.modalController.dismiss();
  }

  public get controls() {
    return this.registerForm.controls;
  }

  public async doRegister() {
    const { email, password, name } = this.registerForm.value;

    await this.loaderService.present();

    this.authService.doRegister(email, password, name).subscribe(async response => {
      this.storage.setItem(StorageEnum.TOKEN, response.data.token);
      this.storage.setItem(StorageEnum.REFRESH_TOKEN, response.data.refreshToken);
      await this.loaderService.dismiss();
      this.closeModal();

      this.router.navigateByUrl("/sections/home");
    }, async e => {
      await this.loaderService.dismiss();
      this.toast.presentToast("Se ha producido un error");
    });
  }

}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoggedDataService } from 'src/app/services/logged.data.service';
import { LoaderService, StorageService, ToastService, AuthService } from 'src/app/services';
import { RegisterPage } from '../modals/register/register.page';
import { StorageEnum, HttpStatus } from 'src/app/enums';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private modalController: ModalController,
    private loaderService: LoaderService,
    private storage: StorageService,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
    private dataService: LoggedDataService) {
    this.initFormLogin();
  }

  ngOnInit() { }

  private initFormLogin() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  public async openModalRegister() {
    const modal = await this.modalController.create({
      component: RegisterPage
    });

    modal.present();
  }

  public get controls() {
    return this.loginForm.controls;
  }

  public async doLogin() {
    const { email, password } = this.loginForm.value;

    await this.loaderService.present();

    this.authService.doLogin(email, password).subscribe(async response => {
      const pToken = this.storage.setItem(StorageEnum.TOKEN, response.data.token);
      const pRefresh = this.storage.setItem(StorageEnum.REFRESH_TOKEN, response.data.refreshToken);
      const pLoader = this.loaderService.dismiss();

      await Promise.all([pToken, pRefresh, pLoader]);

      this.dataService.addData(true);

      this.router.navigateByUrl("/sections/home");
    }, async e => {
      await this.loaderService.dismiss();
      const message = e.status === HttpStatus.NOT_FOUND ? "Email y/o contraseña incorrectas" : "Se ha producido un error";
      this.toast.presentToast(message);
    });

  }

}

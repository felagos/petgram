import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from '@ionic/angular';
import { RegisterPage } from '../modals/register/register.page';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private modalController: ModalController) {
    this.initFormLogin();
  }

  ngOnInit() {}

  private initFormLogin() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", [Validators.required, Validators.email]],
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

  public doLogin() {}

}

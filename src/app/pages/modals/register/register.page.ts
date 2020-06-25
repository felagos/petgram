import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private modalController: ModalController) {
    this.initFormRegister();
   }

  ngOnInit() {
  }

  private initFormRegister() {
    this.registerForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", [Validators.required, Validators.email]],
      repeatPassword: ["", [Validators.required, Validators.email]],
      name: ["", Validators.required],
    });
  }

  public closeModal() {
    this.modalController.dismiss();
  }

  public doRegister() {}

}

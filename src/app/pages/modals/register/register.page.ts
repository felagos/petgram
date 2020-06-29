import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FormValidatorService } from 'src/app/services/form.validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private modalController: ModalController,
    private validatorService: FormValidatorService) {
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

  public doRegister() { }

}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initFormLogin();
    this.initFormRegister();
  }

  ngOnInit() {}

  private initFormLogin() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", [Validators.required, Validators.email]],
    });
  }

  private initFormRegister() {
    this.registerForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", [Validators.required, Validators.email]],
      repeatPassword: ["", [Validators.required, Validators.email]],
      name: ["", Validators.required],
    });
  }

  public doLogin() {}

  public doRegister() {}
}

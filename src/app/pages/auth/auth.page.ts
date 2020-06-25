import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initFormLogin();
  }

  ngOnInit() {}

  private initFormLogin() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", [Validators.required, Validators.email]],
    });
  }

  public doLogin() {}

}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthService, LoaderService, LoggedDataService, StorageService, ToastService } from 'src/app/services';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthPage } from './auth.page';

fdescribe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers:[
        FormBuilder,
        ModalController,
        LoaderService,
        StorageService,
        AuthService,
        ToastService,
        LoggedDataService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('invalid form', () => {
    const email = component.loginForm.controls["email"];
    const password = component.loginForm.controls["password"];

    email.setValue("");
    password.setValue("");

    expect(email.valid).toBeFalse();
    expect(password.valid).toBeFalse();
    expect(component.loginForm.valid).toBeFalse();
  });

});

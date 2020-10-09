import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthService, LoaderService, LoggedDataService, StorageService, ToastService } from 'src/app/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthPage } from './auth.page';
import { LoaderServiceMock } from 'src/app/mocks/LoaderServiceMock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthServiceMock } from 'src/app/mocks/AuthServiceMock';
import { Observable, throwError } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("../../pages/sections/sections.module").then(m => m.SectionsPageModule)
  }
];

fdescribe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;
  let dataService: LoggedDataService;
  let router: Router;
  let authService: AuthService;
  let toastService: ToastService;
  let modalController: ModalController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthPage],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      providers: [
        FormBuilder,
        ModalController,
        StorageService,
        ToastService,
        LoggedDataService,
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: LoaderService, useClass: LoaderServiceMock }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPage);
    dataService = TestBed.inject(LoggedDataService);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    toastService = TestBed.inject(ToastService);
    modalController = TestBed.inject(ModalController);

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

  it('valid form', () => {
    const email = component.loginForm.controls["email"];
    const password = component.loginForm.controls["password"];

    email.setValue("test@test.com");
    password.setValue("1234567");

    expect(email.valid).toBeTruthy();
    expect(password.valid).toBeTruthy();
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('doLogin - success', fakeAsync(
    () => {
      const email = component.loginForm.controls["email"];
      const password = component.loginForm.controls["password"];

      email.setValue("test@test.com");
      password.setValue("1234567");

      const spyAddData = spyOn(dataService, "addData");
      const spyRouter = spyOn(router, "navigateByUrl");

      fixture.ngZone.run(() => {
        component.doLogin();
        tick();
      });

      expect(spyAddData).toHaveBeenCalled();
      expect(spyRouter).toHaveBeenCalled();

    }
  ));

  it('doLogin - error credentials', fakeAsync(
    () => {
      const email = component.loginForm.controls["email"];
      const password = component.loginForm.controls["password"];

      email.setValue("test@test.com");
      password.setValue("1234567");

      spyOn(authService, "doLogin").and.callFake(() => throwError({
        status: 404
      }));

      const spyRouter = spyOn(router, "navigateByUrl");
      const spyToast = spyOn(toastService, "presentToast");

      component.doLogin();
      tick();

      expect(spyRouter).not.toHaveBeenCalled();
      expect(spyToast).toHaveBeenCalledWith("Email y/o contraseña incorrectas");
    }
  ));

  it('doLogin - error generic', fakeAsync(
    () => {
      const email = component.loginForm.controls["email"];
      const password = component.loginForm.controls["password"];

      email.setValue("test@test.com");
      password.setValue("1234567");

      spyOn(authService, "doLogin").and.callFake(() => throwError({
        status: ""
      }));

      const spyRouter = spyOn(router, "navigateByUrl");
      const spyToast = spyOn(toastService, "presentToast");

      component.doLogin();
      tick();

      expect(spyRouter).not.toHaveBeenCalled();
      expect(spyToast).toHaveBeenCalledWith("Se ha producido un error");
    }
  ));

  it('openModalRegister', () => {
    const spy = spyOn(modalController, "create");
    component.openModalRegister();

    expect(spy).toHaveBeenCalled();
  });

});

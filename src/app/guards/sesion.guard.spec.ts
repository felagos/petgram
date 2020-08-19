import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { SesionGuard } from './sesion.guard';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { StorageServiceMock } from '../mocks/StorageService.mock';
import { StorageEnum } from '../enums/storage.enum';
import { AppRoutingModule } from '../app-routing.module';
import { DummyComponent } from '../mocks/DummyComponent';

describe('SesionGuard', () => {
  let guard: SesionGuard;
  let router: Router;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: StorageService, useClass: StorageServiceMock }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: "sections/home", component: DummyComponent }
        ])
      ]
    });

    guard = TestBed.inject(SesionGuard);
    router = TestBed.inject(Router);
    storageService = TestBed.inject(StorageService);
  });

  beforeEach(() => {
    storageService.setItem(StorageEnum.TOKEN, null);
  });


  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it("canActivate - go home", async () => {
    spyOn(router, "navigateByUrl");
    
    const response = await guard.canActivate();

    expect(router.navigateByUrl).toHaveBeenCalledWith("sections/home");
    expect(response).toBeFalse();
  });

  it("canActivate - logged", async () => {
    storageService.setItem(StorageEnum.TOKEN, "TOKEN");
    spyOn(router, "navigateByUrl").and.callThrough();

    const response = await guard.canActivate();

    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(response).toBeTrue();
  });


});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoritesPage } from './favorites.page';
import { ApiService } from 'src/app/services';
import { ApiServiceMock } from 'src/app/mocks/ApiService.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { DataResponse, PetModel } from 'src/app/models';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';

describe('FavoritesPage', () => {
  let component: FavoritesPage;
  let fixture: ComponentFixture<FavoritesPage>;
  let service: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesPage],
      imports: [
        IonicModule.forRoot(),
        SharedModule
      ],
      providers: [
        { provide: ApiService, useClass: ApiServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesPage);
    component = fixture.componentInstance;
    service = TestBed.get(ApiService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("load empty favorites", (done) => {
    const responseMock: DataResponse<PetModel[]> = {
      data: []
    }
    spyOn(service, "getAllFavorities").and.returnValue(of(responseMock));

    component.ionViewDidEnter();

    service.getAllFavorities().subscribe(response => {
      fixture.detectChanges();

      const span = fixture.debugElement.query(By.css('.not-found-text')).nativeElement;

      expect(component.pets.length).toEqual(response.data.length);
      expect(span).not.toBeNull();

      done();
    });

  });

  it("load favorites", (done) => {
    const responseMock: DataResponse<PetModel[]> = {
      data: [
        {
          _id: Date.now().toString(),
          foto: "",
          categoriaId: Date.now().toString(),
          favorite: false,
          likes: 0
        },
        {
          _id: Date.now().toString(),
          foto: "",
          categoriaId: Date.now().toString(),
          favorite: false,
          likes: 0
        }
      ]
    }
    spyOn(service, "getAllFavorities").and.returnValue(of(responseMock));

    component.ionViewDidEnter();

    service.getAllFavorities().subscribe(response => {
      fixture.detectChanges();

      const span = fixture.debugElement.query(By.css('.not-found-text'));

      expect(component.pets.length).toEqual(response.data.length);
      expect(span).toBeNull();

      done();
    });

  });

});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ActionSheetController } from '@ionic/angular';

import { HeaderComponent } from './header.component';
import { StorageService } from 'src/app/services';
import { StorageServiceMock } from 'src/app/mocks/StorageService.mock';
import { By } from '@angular/platform-browser';
import { ActionSheetControllerMock } from 'src/app/mocks/ActionSheetControllerMock';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let actionController: ActionSheetController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ActionSheetController, useValue: new ActionSheetControllerMock() },
        { provide: StorageService, useClass: StorageServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    actionController = TestBed.inject(ActionSheetController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit("presen action", () => {
    const spyAction = spyOn(actionController, "create");

    const iconSettings = fixture.debugElement.query(By.css("ion-icon")).nativeElement;
    iconSettings.click();

    expect(spyAction).toHaveBeenCalled();
  });

});

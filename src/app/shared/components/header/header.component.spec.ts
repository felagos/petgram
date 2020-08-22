import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ActionSheetController } from '@ionic/angular';

import { HeaderComponent } from './header.component';
import { StorageService } from 'src/app/services';
import { StorageServiceMock } from 'src/app/mocks/StorageService.mock';
import { By } from '@angular/platform-browser';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let actionController: ActionSheetController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        ActionSheetController,
        { provide: StorageService, useClass: StorageServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    actionController = TestBed.get(ActionSheetController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("presen action", () => {
    const spyAction = spyOn(actionController, "create");

    const iconSettings = fixture.debugElement.query(By.css("ion-icon")).nativeElement;
    iconSettings.click();

    expect(spyAction).toHaveBeenCalled();
  });

});

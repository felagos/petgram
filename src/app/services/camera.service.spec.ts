import { TestBed } from '@angular/core/testing';
import { CameraService } from './camera.service';
import { Plugins } from '@capacitor/core';

fdescribe('CameraService', () => {
  let service: CameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("take photo", async () => {
    const { Camera } = Plugins;
    const photoOption = {
      format: "",
      base64String: ""
    };
    spyOn(Camera, "getPhoto").and.resolveTo(photoOption);

    const photo = await service.getPhoto();
    
    expect(photo).toEqual(photoOption);
  });

});

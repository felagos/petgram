import { TestBed } from '@angular/core/testing';
import { CameraService } from './camera.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

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
    const photoResult = {
      format: "",
      base64String: ""
    };
    const cameraOption = {
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    }

    spyOn(Camera, "getPhoto").and.resolveTo(photoResult);

    const photo = await service.getPhoto();

    expect(photo).toEqual(photoResult);
    expect(Camera.getPhoto).toHaveBeenCalledWith(cameraOption);
  });

});

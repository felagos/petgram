import { SafeUrlPipe } from './safe-url.pipe';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

fdescribe('SafeUrlPipe', () => {
  let pipe: SafeUrlPipe;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [ {provide: DomSanitizer, useValue: { bypassSecurityTrustResourceUrl: () => 'safeUrl' } } ]
    });
    const sanitized = TestBed.get(DomSanitizer);
    pipe = new SafeUrlPipe(sanitized);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it("transform", () => {
    const value = String(Date.now());
    const response = pipe.transform(value);

    expect(response).toEqual("safeUrl");
  });

});

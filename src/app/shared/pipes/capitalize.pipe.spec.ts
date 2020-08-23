import { CapitalizePipe } from './capitalize.pipe';

fdescribe('CapitalizePipe', () => {
  const pipe = new CapitalizePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('capitalize', () => {
    const value = "value";
    const response = pipe.transform(value);
    expect(value).toBeTruthy("Value");
  });

});

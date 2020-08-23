import { PhotoProfilePipe } from './photo-profile.pipe';
import { UserModel } from 'src/app/models';

fdescribe('PhotoProfilePipe', () => {
  const pipe = new PhotoProfilePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('return empty photo', () => {
    const foto = "";
    const response = pipe.transform(foto);
    expect(response).toEqual("assets/imgs/no_user.png");
  });

  it('return photo', () => {
    const foto = "la foto";

    const base64Img = `data:image/jpeg;base64, ${foto}`;

    const response = pipe.transform(foto);
    expect(response).toEqual(base64Img);
  });

});

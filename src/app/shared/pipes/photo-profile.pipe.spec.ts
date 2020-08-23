import { PhotoProfilePipe } from './photo-profile.pipe';
import { UserModel } from 'src/app/models';

fdescribe('PhotoProfilePipe', () => {
  const pipe = new PhotoProfilePipe();
  
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('return empty photo', () => {
    const user: UserModel = {
      email: "",
      nombre: "",
      foto: ""
    };
    const response = pipe.transform(user);
    expect(response).toEqual("assets/no_user.png");
  });

  it('return photo', () => {
    const user: UserModel = {
      email: "",
      nombre: "",
      foto: "la foto"
    };
    const response = pipe.transform(user);
    expect(response).toEqual(user.foto);
  });

});

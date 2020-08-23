import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from 'src/app/models';

@Pipe({
  name: 'photoProfile'
})
export class PhotoProfilePipe implements PipeTransform {

  transform(user: UserModel): string {
    if(!user.foto) return "assets/no_user.png";
    return user.foto;
  }

}

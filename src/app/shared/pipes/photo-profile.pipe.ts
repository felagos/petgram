import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from 'src/app/models';

@Pipe({
  name: 'photoProfile'
})
export class PhotoProfilePipe implements PipeTransform {

  transform(user: UserModel): string {
    if(!user || !user.foto) return "assets/imgs/no_user.png";
    return `data:image/png;base64, ${user.foto}`;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'photoProfile'
})
export class PhotoProfilePipe implements PipeTransform {

  transform(foto :string): string {
    if(!foto) return "assets/imgs/no_user.png";
    return `data:image/jpeg;base64, ${foto}`;
  }

}

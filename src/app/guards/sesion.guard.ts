import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { StorageEnum } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class SesionGuard implements CanActivate {

  constructor(private storage: StorageService,
    private router: Router) {}

  async canActivate() {
    const tokens = await this.storage.getItem(StorageEnum.TOKEN);
    if(tokens === null)  {
      this.router.navigateByUrl("sections/home");
      return false;
    }
    return true;
  }
  
}

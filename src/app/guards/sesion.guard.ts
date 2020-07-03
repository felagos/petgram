import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { StorageEnum } from '../enums/storage.enum';

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

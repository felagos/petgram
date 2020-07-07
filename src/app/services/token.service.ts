import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { StorageEnum } from '../enums/storage.enum';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private storage: StorageService) { }

  public async isExpired(): Promise<boolean> {
    const token = await this.storage.getItem<string>(StorageEnum.TOKEN);
    const payloadEncoded = token.split(".")[1];
    const payload = JSON.parse(atob(payloadEncoded));
    const exp = payload.exp;

    return Date.now() < exp;
  }

}

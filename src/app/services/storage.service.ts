import { Injectable } from '@angular/core';
import { Plugins, StoragePlugin } from '@capacitor/core';
import { StorageEnum } from '../enums/storage.enum';
import { TokenResponse } from '../models/token.response';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: StoragePlugin;

  constructor() {
    const { Storage } = Plugins;
    this.storage = Storage;
  }

  public setItem<T>(key: string, value: T) {
    return this.storage.set({
      key,
      value: JSON.stringify(value)
    });
  }

  public async getItem<T>(key: string): Promise<T> {
    const item = await this.storage.get({ key });
    return JSON.parse(item.value);
  }

  public async getUser(): Promise<UserModel> {
    const tokens = await this.getItem<TokenResponse>(StorageEnum.TOKEN);
    const token = tokens.token;
    const sectionsToken = token.split(".");
    const payload: any = atob(sectionsToken[1]);
    const data = JSON.parse(payload);

    return data.user as UserModel;
  }

}

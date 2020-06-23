import { Injectable } from '@angular/core';
import { Plugins, StoragePlugin } from '@capacitor/core';

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

}

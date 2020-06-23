import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public async setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public async getItem<T>(key: string): Promise<T> {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }

}
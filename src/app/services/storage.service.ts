import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }

}

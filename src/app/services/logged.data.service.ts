import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { StorageService } from './storage.service';
import { StorageEnum } from '../enums/storage.enum';

@Injectable({
  providedIn: 'root'
})
export class LoggedDataService {

  private subject = new BehaviorSubject<boolean>(false);
  private data$ = this.subject.asObservable();

  constructor(private storage: StorageService) {
    this.storage.getItem<string>(StorageEnum.TOKEN).then(token => {
      this.subject.next(token !== null);
    });
  }

  public addData(isLogged: boolean) {
    this.subject.next(isLogged);
  }

  public get data(): Observable<boolean> {
    return this.data$;
  }

}

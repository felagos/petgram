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
    this.storage.getItem<UserModel>(StorageEnum.USER).then(user => {
      this.subject.next(user !== null);
    });
  }

  public addData(isLogged: boolean) {
    this.subject.next(isLogged);
  }

  public get data(): Observable<boolean> {
    return this.data$;
  }

}

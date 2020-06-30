import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AsyncValidatorFn, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { map, retry } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor(private authService: AuthService) { }

  public validateExistsEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: boolean } | null> => {
      const value = control.value as string;

      if (value.trim() === "")
        return of(null);

      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value))
        return of(null);

      return this.authService.existsEmail(control.value).pipe(
        map(response => {
          return response.data ? { "existsEmail": true } : null;
        })
      );
    }
  }

  public validateRepeatPassword(): ValidatorFn {
    return (form: FormGroup): { [key: string]: boolean } | null => {
      const password = form.get("password");
      const repeatPassword = form.get("repeatPassword");

      if (!password || !repeatPassword)
        return null;

      if (password.value.trim() === "" || repeatPassword.value.trim() === "")
        return null;

      if (password.value !== repeatPassword.value) {
        return { "mustMatch": true };
      }


      return null;

    }

  }

}

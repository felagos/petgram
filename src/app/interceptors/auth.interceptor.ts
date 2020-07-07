import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { StorageEnum } from '../enums/storage.enum';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
        private storage: StorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.storage.getItem<string>(StorageEnum.TOKEN)).pipe(
            switchMap(token => {
                if (token)
                    req = req.clone({ headers: req.headers.set("Authorization", token) });

                return next.handle(req);
            })
        );

    }

}
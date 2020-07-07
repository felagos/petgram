import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
} from "@angular/common/http";
import { Observable, from, throwError, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { StorageService } from "../services/storage.service";
import { StorageEnum } from "../enums/storage.enum";
import { switchMap, catchError, filter, take } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class AuthInterceptor implements HttpInterceptor {

	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	private newToken = "";

	constructor(private authService: AuthService,
		private storage: StorageService) { }

	private addToken(req: HttpRequest<any>, token: string) {
		return req.clone({ headers: req.headers.set("Authorization", token) });
	}

	private handle401(token: string, req: HttpRequest<any>, next: HttpHandler) {
		if (!this.isRefreshing) {
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);

			return this.authService.refreshToken(token).pipe(
				switchMap((response) => {
					this.isRefreshing = false;
					this.newToken=response.data;
					this.refreshTokenSubject.next(response.data);
					return from(this.storage.setItem(StorageEnum.TOKEN, response.data)).pipe(
						switchMap(() => next.handle(this.addToken(req, response.data)))
					);
				})
			);
		} else {
			return next.handle(this.addToken(req, this.newToken));
		}
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return from(this.storage.getItem<string>(StorageEnum.TOKEN)).pipe(
			switchMap((token) => {
				if (token) req = this.addToken(req, token);

				return next.handle(req).pipe(
					catchError((error) => {
						if (error.status === 401 || error.status === 403) {
							return from(this.storage.getItem<string>(StorageEnum.REFRESH_TOKEN)).pipe(
								switchMap(refreshToken => this.handle401(refreshToken, req, next))
							)
						}
						return throwError(error);
					})
				);
			})
		);
	}
}

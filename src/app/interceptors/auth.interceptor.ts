import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
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
	private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

	constructor(private authService: AuthService,
		private storage: StorageService) { }

	private addToken(req: HttpRequest<any>, token: string) {
		return req.clone({ headers: req.headers.set("Authorization", token) });
	}

	private handle401(refreshToken: string, req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!this.isRefreshing) {
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);

			return this.authService.refreshToken(refreshToken).pipe(
				switchMap((response) => {
					this.isRefreshing = false;
					this.refreshTokenSubject.next(response.data);
					this.storage.setItem(StorageEnum.TOKEN, response.data);
					return next.handle(this.addToken(req, response.data));
				})
			);
		}

		return this.refreshTokenSubject.pipe(
			filter(data => data !== null),
			take(1),
			switchMap(token => next.handle(this.addToken(req, token)))
		);
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return from(this.storage.getItem<string>(StorageEnum.TOKEN)).pipe(
			switchMap((token) => {
				if (token) req = this.addToken(req, token);

				return next.handle(req).pipe(
					catchError((error) => {
						if (error.status === 401) {
							return from(this.storage.getItem<string>(StorageEnum.REFRESH_TOKEN)).pipe(
								switchMap(refreshToken => {
									return this.handle401(refreshToken, req, next);
								})
							)
						}
						return throwError(error);
					})
				);
			})
		);
	}
}

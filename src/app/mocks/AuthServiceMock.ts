import { Observable, of } from "rxjs";

export class AuthServiceMock {

    doLogin(email: string, password: string) {
        return new Observable(suscriber => {
            suscriber.next({
                data: {
                    token: "token",
                    refreshToken: "refreshToken"
                }
            });

            suscriber.complete();

        });
    }

}
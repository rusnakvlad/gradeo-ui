import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { throwError } from "rxjs/internal/observable/throwError";
import { UserAuthService } from "../shared/services/user-auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: UserAuthService, private router: Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        if (this.authService.isAuth()) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authService.getToken()}`,
                },
            });
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }
}

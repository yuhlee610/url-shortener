import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

const NO_RETRY_HEADER = "x-no-retry";

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(this.shouldRetry(error));
        if (this.shouldRetry(error)) {
          return this.authService.refreshToken().pipe(
            switchMap((newToken) => {
              const cloneReq = req.clone({
                headers: req.headers.set("Authorization", `Bearer ${newToken}`),
              });
              return next.handle(cloneReq);
            }),
            catchError((refreshError) => {
              console.error("Refresh token failed:", refreshError);
              this.authService.logout();
              return throwError(() => refreshError);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }

  private shouldRetry(error: HttpErrorResponse): boolean {
    return (
      error.status === 401 &&
      !error.url?.includes("/auth/login") &&
      !error.url?.includes("/auth/refresh") &&
      !error.headers.get(NO_RETRY_HEADER)
    );
  }
}

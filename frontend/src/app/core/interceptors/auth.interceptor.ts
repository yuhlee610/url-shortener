import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.accessToken;
    const cloneReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    });

    if (token) {
      return next.handle(cloneReq);
    }
    return next.handle(req);
  }
}

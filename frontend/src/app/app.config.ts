import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { routes } from "./app.routes";
import { FormsModule } from "@angular/forms";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { CommonInterceptor } from "./core/interceptors/common.interceptor";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { RefreshTokenInterceptor } from "./core/interceptors/refresh-token.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(FormsModule),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    NG_EVENT_PLUGINS,
    { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    },
  ],
};

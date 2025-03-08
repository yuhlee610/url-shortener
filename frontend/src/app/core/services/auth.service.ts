import { inject, Injectable, signal } from "@angular/core";
import { LoginType, SignupType } from "../../models/auth.model";
import { AuthApi } from "../../apis/auth.api";
import { map, tap } from "rxjs";
import { User } from "../../models/user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly authApi = inject(AuthApi);
  private _isLoggedIn = signal<boolean>(false);
  private _accessToken = signal<string | null>(null);
  private _currentUser = signal<User | null>(null);

  get isLoggedIn() {
    return this._isLoggedIn();
  }

  get accessToken() {
    return this._accessToken();
  }

  get currentUser() {
    return this._currentUser();
  }

  login(value: LoginType) {
    return this.authApi.login(value).pipe(
      tap((response) => {
        this._accessToken.set(response.data.access_token);
        this._currentUser.set(response.data.user);
        this._isLoggedIn.set(true);
      })
    );
  }

  signup(value: SignupType) {
    return this.authApi.signup(value);
  }

  refreshToken() {
    return this.authApi.refreshToken().pipe(
      tap((response) => {
        this._accessToken.set(response.data.access_token);
        this._currentUser.set(response.data.user);
        this._isLoggedIn.set(true);
      }),
      map((response) => response.data.access_token)
    );
  }

  logout() {
    return this.authApi.logout().pipe(
      tap(() => {
        this._accessToken.set(null);
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
      })
    );
  }
}

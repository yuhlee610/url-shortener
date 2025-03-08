import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  LoginResponse,
  LoginType,
  RefreshTokenResponse,
  SignupType,
} from "../models/auth.model";

@Injectable({
  providedIn: "root",
})
export class AuthApi {
  private readonly httpClient = inject(HttpClient);

  login(body: LoginType) {
    return this.httpClient.post<LoginResponse>("/auth/login", body);
  }

  signup(body: SignupType) {
    return this.httpClient.post("/auth/register", body);
  }

  refreshToken() {
    return this.httpClient.post<RefreshTokenResponse>("/auth/refresh", {});
  }

  logout() {
    return this.httpClient.post("/auth/logout", {});
  }
}

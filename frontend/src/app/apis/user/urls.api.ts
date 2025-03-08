import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  GetListUrlResponse,
  GuestCreateUrlResponse,
  GuestCreateUrlType,
  UserCreateUrlResponse,
  UserCreateUrlType,
} from "../../models/url.model";

@Injectable({
  providedIn: "root",
})
export class UrlsApi {
  private readonly httpClient = inject(HttpClient);

  createGuestUrl(body: GuestCreateUrlType) {
    return this.httpClient.post<GuestCreateUrlResponse>("/guest/urls", body);
  }

  createUrl(body: UserCreateUrlType) {
    return this.httpClient.post<UserCreateUrlResponse>("/urls", body);
  }

  getMyUrls(page: number = 1, limit: number = 10) {
    return this.httpClient.get<GetListUrlResponse>(
      `/me/urls?page=${page}&limit=${limit}`
    );
  }

  deleteUrl(id: number) {
    return this.httpClient.delete(`/urls/${id}`);
  }
}

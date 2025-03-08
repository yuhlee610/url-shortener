import { inject, Injectable } from "@angular/core";
import { UrlsApi } from "../../apis/user/urls.api";
import { GuestCreateUrlType, UserCreateUrlType } from "../../models/url.model";

@Injectable({ providedIn: "root" })
export class UrlsService {
  private readonly urlsApi = inject(UrlsApi);

  createGuestUrl(values: GuestCreateUrlType) {
    return this.urlsApi.createGuestUrl(values);
  }

  createUrl(values: UserCreateUrlType) {
    return this.urlsApi.createUrl(values);
  }

  getMyUrls(page: number, limit: number) {
    return this.urlsApi.getMyUrls(page, limit);
  }

  deleteUrl(id: number) {
    return this.urlsApi.deleteUrl(id);
  }
}

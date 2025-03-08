import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { TrackingResponse } from "../../models/tracking.model";

@Injectable({ providedIn: "root" })
export class TrackingApi {
  private readonly httpClient = inject(HttpClient);

  getTracking(id: number, from: Date, to: Date, type: "date" | "month") {
    return this.httpClient.get<TrackingResponse>(
      `/statistics/${id}?from=${from.toISOString()}&to=${to.toISOString()}&type=${type}`
    );
  }
}

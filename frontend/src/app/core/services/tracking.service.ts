import { inject, Injectable } from "@angular/core";
import { TrackingApi } from "../../apis/user/tracking.api";

@Injectable({ providedIn: "root" })
export class TrackingService {
  private readonly trackingApis = inject(TrackingApi);

  getTrackingByUrlId(id: number, from: Date, to: Date, type: "date" | "month") {
    return this.trackingApis.getTracking(id, from, to, type);
  }
}

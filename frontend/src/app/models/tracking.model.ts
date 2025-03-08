import { Response } from "./response.model";

export type Tracking = {
  date: string;
  visitCount: string;
};

export type TrackingResponse = Response<{ statistics: Tracking[] }>;

import { AuditBy, Response, ResponseWithMetadata, Timestamps } from "./response.model";

export type GuestCreateUrlType = {
  sourceUrl: string;
};

export type UserCreateUrlType = GuestCreateUrlType & {
  destinationUrl: string;
};

export type Url = {
  id: number;
  sourceUrl: string;
  destinationUrl: string;
} & Timestamps;

export type GuestCreateUrlResponse = Response<Url>;
export type UserCreateUrlResponse = Response<Url> & AuditBy;
export type GetListUrlResponse = ResponseWithMetadata<{ urls: Url[] }>;

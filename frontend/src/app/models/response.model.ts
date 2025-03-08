import { Author } from "./user.model";

export type Response<T> = {
  statusCode: number;
  data: T;
};

export type Metadata = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

export type ResponseWithMetadata<T> = Response<T> & {
  metadata: Metadata;
};

export type AuditBy = {
  createdBy: Author;
  updatedBy?: Author;
  deletedBy?: Author;
};

export type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

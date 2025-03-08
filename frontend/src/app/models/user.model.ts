import { Timestamps } from "./response.model";

export type Author = {
  id: number;
  email: string;
  name: string;
  role: string;
}

export type User = Author & Timestamps;
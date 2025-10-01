import { status } from "elysia";

export type Filter = {
  category?: string;
  genre?: string[];
  status?: string;
};

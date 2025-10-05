import { Genero, Status, Category } from "../enums/filter.js";

export interface SearchAnimeArgs {
  query: string;
  genres: Genero[];
  status?: Status;
  category?: Category;
  page: number;
}
export interface CatalogAnimeArgs {
  genres: Genero[];
  status?: Status;
  category?: Category;
  page: number;
}
export interface AnimeDetailsArgs {
  url: string;
}

export interface AnimeStreamingArgs {
  url: string;
}

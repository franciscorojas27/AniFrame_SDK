import { BrowserContext, Page } from "playwright";
import { anime, animeCatalog } from "./anime.js";
import { Filter } from "./filter.js";

export type responseAnimeResult = {
  results: animeCatalog[];
  numberPages: String;
};
export interface AnimeScraperAgreement {
  page: Page;
  context: BrowserContext;
  getHomePageListAnime(): Promise<anime[]>;
  getSearchAnimeResults(
    query?: string,
    numberPage?: string,
    filter?: Filter
  ): Promise<responseAnimeResult>;
  getCatalogListAnime(
    filter?: Filter,
    numberPage?: string
  ): Promise<responseAnimeResult>;
  getAnimeDetails(animeUrl: string): Promise<responseAnimeDetails>;
  close(): Promise<void>;
}

export type responseAnimeDetails = {
  name: string;
  urlImg: string | null;
  description: string | null;
  status: string;
  date: string;
  genres: string[];
  caps: string;
};

export type manifestAgreement = {
  name: String;
  version: String;
  urlPage: String;
  date_created: String;
  filterSupportedList: {
    status: String[];
    genres: String[];
    type: String[];
  };
};

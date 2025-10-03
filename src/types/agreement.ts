import { BrowserContext, Page } from "playwright";
import { anime, animeCatalog, AnimeScheduleItem, WeekDay } from "./anime.ts";
import { Filter } from "./filter.ts";

export type responseAnimeSchedule = Record<WeekDay, AnimeScheduleItem[]>;

export type responseAnimeResult = {
  results: animeCatalog[];
  numberPages: String;
};
export interface AnimeScraperAgreement {
  page: Page;
  context: BrowserContext;
  close(): Promise<void>;
}
export interface AnimeDetailsScraperAgreement {
  getAnimeDetails(animeUrl: string): Promise<responseAnimeDetails>;
  getEpisodeList(url: string): Promise<responseEpisode[] | undefined>;
}
export interface AnimeListScraperAgreement {
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
}
export interface AnimeStreamingScraperAgreement {
  getM3U8(url: string): Promise<responseM3U8>;
}
export interface AnimeScheduleScraperAgreement {
  getAnimeSchedule(url: string): Promise<responseAnimeSchedule>;
}

export type responseM3U8 = {
  foundUrl?: string;
  cap: string;
};

export type responseAnimeDetails = {
  idAnime: string | undefined;
  name: string;
  urlImg: string | null;
  description: string | null;
  status: string;
  date: string;
  genres: string[];
  caps: number;
};

export type responseEpisode = {
  capLink: string | null;
  capThumbnail: string | null;
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

import { BrowserContext, Page } from "playwright";
import { Filter } from "./filter.js";
import { responseAnimeDetails, responseAnimeResult, responseAnimeSchedule, responseEpisode, responseM3U8 } from "./responseAgreement.js";
import { anime } from "./anime.js";


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
    numberPage?: number,
    filter?: Filter
  ): Promise<responseAnimeResult>;
  getCatalogListAnime(
    filter?: Filter,
    numberPage?: number
  ): Promise<responseAnimeResult>;
}
export interface AnimeStreamingScraperAgreement {
  getM3U8(url: string): Promise<responseM3U8>;
}
export interface AnimeScheduleScraperAgreement {
  getAnimeSchedule(url: string): Promise<responseAnimeSchedule>;
}



export type manifestAgreement = {
  name: string;
  version: string;
  urlPage: string;
  date_created: string;
  filterSupportedList: {
    status: string[];
    genres: string[];
    type: string[];
  };
};

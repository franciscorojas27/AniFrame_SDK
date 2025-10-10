import { WeekDay, AnimeScheduleItem, animeCatalog } from "./anime.js";

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

export type responseAnimeSchedule = Record<WeekDay, AnimeScheduleItem[]>;

export type responseAnimeResult = {
  results: animeCatalog[];
  numberPages: string;
};

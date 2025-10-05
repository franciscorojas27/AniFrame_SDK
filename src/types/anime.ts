export type anime = {
  name: string;
  cap: string;
  url: string;
  urlImg: string | null;
};

export type animeCatalog = {
  animeId: string;
  name: string;
  url: string;
  urlImg: string | null;
};

export interface AnimeScheduleItem {
  animeId: string | undefined;
  name: string;
  url: string;
  imgUrl: string | null;
  updateTimeAnime: string | null;
}

export type WeekDay =
  | "lunes"
  | "martes"
  | "miercoles"
  | "jueves"
  | "viernes"
  | "sabado"
  | "domingo";

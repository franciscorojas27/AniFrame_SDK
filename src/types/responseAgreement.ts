import { WeekDay, AnimeScheduleItem, animeCatalog, anime } from './anime.js'

export type responseAnimeHome = {
  id: number
  name: string
  cap: number
  slug: string
  imgUrl: string | null
}

export type responseM3U8 = {
  foundUrl?: string
  cap: string
}

export type responseAnimeDetails = {
  id: number
  name: string
  imgUrl: string | null
  description: string | null
  status: string
  date: number
  genres: string[]
  caps: number
}

export type responseEpisode = {
  capLink: string | null
  capThumbnail: string | null
}

export type responseAnimeSchedule = Record<WeekDay, AnimeScheduleItem[]>

export type responseAnimeResult = {
  results: animeCatalog[]
  numberPages: number
}

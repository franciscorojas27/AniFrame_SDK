export type anime = {
  id: number
  name: string
  cap: number
  slug: string
  urlImg: string | null
}

export type animeCatalog = {
  id: number
  name: string
  slug: string
  urlImg: string | null
}

export interface AnimeScheduleItem {
  id: number | undefined
  name: string
  url: string
  imgUrl: string | null
  updateTimeAnime: string | null
}

export type WeekDay =
  | 'lunes'
  | 'martes'
  | 'miercoles'
  | 'jueves'
  | 'viernes'
  | 'sabado'
  | 'domingo'

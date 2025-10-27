export type anime = {
  id: number
  name: string
  cap: number
  slug: string
  imgUrl: string | null
}

export type animeCatalog = Omit<anime, 'cap'>

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

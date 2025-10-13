enum Category {
  Serie = "tv-anime",
  Pelicula = "pelicula",
  Ova = "ova",
  Especial = "especial",
}

enum Status {
  Emision = "emision",
  Finalizado = "finalizado",
}
enum Genero {
  Accion = "accion",
  Aventura = "aventura",
  CienciaFiccion = "ciencia-ficcion",
  Comedia = "comedia",
  Deportes = "deportes",
  Drama = "drama",
  Fantasia = "fantasia",
  Misterio = "misterio",
  RecuentosDeLaVida = "recuentos-de-la-vida",
  Romance = "romance",
  Seinen = "seinen",
  Shoujo = "shoujo",
  Shounen = "shounen",
  Sobrenatural = "sobrenatural",
  Suspenso = "suspenso",
  Terror = "terror",
  Antropomorfico = "antropomorfico",
  ArtesMarciales = "artes-marciales",
  Carreras = "carreras",
  Detectives = "detectives",
  Ecchi = "ecchi",
  ElencoAdulto = "elenco-adulto",
  Escolares = "escolares",
  Espacial = "espacial",
  Gore = "gore",
  Gourmet = "gourmet",
  Harem = "harem",
  Historico = "historico",
  IdolsHombre = "idols-hombre",
  IdolsMujer = "idols-mujer",
  Infantil = "infantil",
  Isekai = "isekai",
  Josei = "josei",
  JuegosEstrategia = "juegos-estrategia",
  MahouShoujo = "mahou-shoujo",
  Mecha = "mecha",
  Militar = "militar",
  Mitologia = "mitologia",
  Musica = "musica",
  Parodia = "parodia",
  Psicologico = "psicologico",
  Samurai = "samurai",
  ShoujoAi = "shoujo-ai",
  ShounenAi = "shounen-ai",
  Superpoderes = "superpoderes",
  Vampiros = "vampiros",
}

enum FilterSupport {
  category = "category",
  genre = "genre",
  status = "status",
}

enum ParamsSupport {
  page = "page",
  search = "search",
}

export { Category, Status, Genero, FilterSupport, ParamsSupport };

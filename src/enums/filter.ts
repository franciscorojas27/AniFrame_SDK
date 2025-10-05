enum Category {
  Serie = "tv-anime",
  Pelicula = "pelicula",
}

enum Status {
  Emision = "emision",
  Finalizado = "finalizado",
}
enum Genero {
  Accion = "accion",
  Aventura = "aventura",
  Comedia = "comedia",
  Drama = "drama",
  Escolar = "escolar",
  Fantasia = "fantasia",
  Magia = "magia",
  Mecha = "mecha",
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

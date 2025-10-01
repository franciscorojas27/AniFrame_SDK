export enum AnimeSelectors {
  HomeGrid = "div.grid.grid-cols-2.gap-4.md\\:grid-cols-3",
  HomeArticle = "article",
  HomeName = "header > div",
  HomeLink = "a",
  HomeImg = "div > figure > img",

  SearchGrid = "div.grid.grid-cols-2.gap-4",
  SearchArticle = "article",
  SearchName = "header h3",
  SearchLink = "a",
  SearchImg = "figure img",

  CatalogGrid = "div.grid.grid-cols-2",
  CatalogArticle = "article",
  CatalogName = "header h3",
  CatalogLink = "a",
  CatalogImg = "figure img",

  DetailsHero = ".grid.items-start.gap-4",
  DetailsCapsArticles = ".grid.grid-cols-2 > article",
  DetailsName = "header > div > h1",
  DetailsSpans = "header > .flex.flex-wrap.items-center > span",
  DetailsGenres = "header > .flex.flex-wrap > a",
  DetailsDescription = "div > p",
  DetailsImg = ".aspect-poster",

  animeCount = ".flex.flex-col.gap-x-2.text-sm.sm\\:flex-row > .font-bold"
}

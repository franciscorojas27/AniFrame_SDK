export enum AnimeSelectors {
  HomeArticles = ".grid.grid-cols-2.gap-4.md\\:grid-cols-3 > article",
  HomeName = "header > div",
  HomeLink = "a",
  HomeImg = "div > figure > img",
  HomeCap = ".bg-line.text-subs.rounded > span",

  SearchArticle = ".grid.grid-cols-2.gap-4 article",
  SearchName = "header h3",
  SearchLink = "a",
  SearchImg = "figure img",

  CatalogArticle = ".grid.grid-cols-2 article",
  CatalogName = "header h3",
  CatalogLink = "a",
  CatalogImg = "figure img",

  DetailsHero = ".grid.items-start.gap-4",
  DetailsCapsArticles = ".grid.grid-cols-2  article",
  DetailsName = "header > div > h1",
  DetailsSpans = "header > .flex.flex-wrap.items-center > span",
  DetailsGenres = "header > .flex.flex-wrap > a",
  DetailsDescription = "div > p",
  DetailsImg = ".aspect-poster",

  animeCount = ".flex.flex-col.gap-x-2.text-sm.sm\\:flex-row > .font-bold",

  animeScheduleButtons = ".flex.gap-2.overflow-auto  button",
  animeScheduleGrid = ".grid.grid-cols-2.gap-4 > div",
  animeScheduleArticles = ".grid.grid-cols-2.gap-4 > div > article",
  animeScheduleUpdateTime = ".grid.grid-cols-2.gap-4 > div > div",
  ScheduleImg = "div > figure > img",
  ScheduleName = "header > h3",
  ScheduleLink = "a",
}

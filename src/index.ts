import AnimeListScraper from "./core/AnimeListScraper.ts";
import AnimeScraper from "./core/AnimeScraper.ts";

async function main() {
  const animeScraperMain = await AnimeScraper.create();

  const listHome = new AnimeListScraper(animeScraperMain);
  const homeData = await listHome.getHomePageListAnime();
  console.log(homeData);
}

await main();
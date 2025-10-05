import { animeCountSolution, extractIdfromUrl } from "../adapters/libs.js";
import { UrlBuilder } from "../adapters/urlBuilders.js";
import config from "../config/config.js";
import { AnimeSelectors } from "../enums/selectors.js";
import { AnimeListScraperAgreement } from "../types/agreement.js";
import { logScraperError } from "../errors/errorsHelpers.js";
import { responseAnimeResult } from "../types/responseAgreement.js";
import { anime, animeCatalog } from "../types/anime.js";
import { Filter } from "../types/filter.js";
import AnimeScraper from "./AnimeScraper.js";
export default class AnimeListScraper implements AnimeListScraperAgreement {
  constructor(private scraper: AnimeScraper) {}

  async getHomePageListAnime(): Promise<anime[]> {
    try {
      await this.scraper.page.goto(config.urlPage, {
        waitUntil: "domcontentloaded",
      });

      const articles = this.scraper.page.locator(AnimeSelectors.HomeArticles);

      const count = await articles.count();
      const result: anime[] = [];

      for (let i = 0; i < count; i++) {
        let [name, url, urlImg, cap] = await Promise.all([
          articles.nth(i).locator(AnimeSelectors.HomeName).innerText(),
          articles.nth(i).locator(AnimeSelectors.HomeLink).getAttribute("href"),
          articles.nth(i).locator(AnimeSelectors.HomeImg).getAttribute("src"),
          articles.nth(i).locator(AnimeSelectors.HomeCap).innerText(),
        ]);
        url = url ? new UrlBuilder(url).build().toString() : "";
        urlImg = urlImg ? urlImg : "";

        result.push({ name, url, urlImg, cap });
      }
      return result;
    } catch (error) {
      logScraperError(error);
      return [];
    }
  }

  async getSearchAnimeResults(
    query?: string,
    numberPage?: string,
    filter?: Filter
  ): Promise<responseAnimeResult> {
    try {
      const url = new UrlBuilder("/catalogo")
        .withQuery(query)
        .withPage(numberPage)
        .withFilters(filter)
        .build();
      await this.scraper.page.goto(url.toString(), {
        waitUntil: "domcontentloaded",
      });
      const articles = this.scraper.page.locator(AnimeSelectors.SearchArticle);
      const numberPages = await animeCountSolution(this.scraper.page);
      const count = await articles.count();
      const result: animeCatalog[] = [];

      for (let i = 0; i < count; i++) {
        let [name, url, urlImg] = await Promise.all([
          articles.nth(i).locator(AnimeSelectors.SearchName).innerText(),
          articles
            .nth(i)
            .locator(AnimeSelectors.SearchLink)
            .getAttribute("href"),
          articles.nth(i).locator(AnimeSelectors.SearchImg).getAttribute("src"),
        ]);

        url = url ? new UrlBuilder(url).build().toString() : "";
        let animeId = extractIdfromUrl(url);
        result.push({ animeId, name, url, urlImg });
      }
      return { results: result as animeCatalog[], numberPages };
    } catch (error) {
      logScraperError(error);
      return { results: [], numberPages: "0" };
    }
  }

  async getCatalogListAnime(
    filter?: Filter,
    numberPage?: string
  ): Promise<responseAnimeResult> {
    try {
      const url = new UrlBuilder("/catalogo")
        .withPage(numberPage)
        .withFilters(filter)
        .build();
      await this.scraper.page.goto(url.toString(), {
        waitUntil: "domcontentloaded",
      });
      const numberPages = await animeCountSolution(this.scraper.page);
      const articles = this.scraper.page.locator(AnimeSelectors.CatalogArticle);
      const count = await articles.count();
      const result: animeCatalog[] = [];
      for (let i = 0; i < count; i++) {
        let [name, url, urlImg] = await Promise.all([
          articles.nth(i).locator(AnimeSelectors.CatalogName).innerText(),
          articles
            .nth(i)
            .locator(AnimeSelectors.CatalogLink)
            .getAttribute("href"),
          articles
            .nth(i)
            .locator(AnimeSelectors.CatalogImg)
            .getAttribute("src"),
        ]);
        url = url ? new UrlBuilder(url).build().toString() : "";
        let animeId = extractIdfromUrl(urlImg);
        result.push({ animeId, name, url, urlImg });
      }
      return { results: result as animeCatalog[], numberPages };
    } catch (error) {
      logScraperError(error);
      return { results: [], numberPages: "0" };
    }
  }
}

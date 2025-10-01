import { BrowserContext, Page } from "playwright";
import config from "../config/config.js";
import { anime, animeCatalog } from "../types/anime.js";
import { parseArticles, animeCountSolution } from "../adapters/libs.js";
import { Filter } from "../types/filter.js";
import {
  AnimeScraperAgreement,
  responseAnimeDetails,
  responseAnimeResult,
} from "../types/agreement.js";
import createContext from "./chromium.js";
import { AnimeSelectors } from "../enum/selectors.js";
import { UrlBuilder } from "../adapters/urlBuilders.js";

export class AnimeScraper implements AnimeScraperAgreement {
  readonly page: Page;
  readonly context: BrowserContext;
  private constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }
  static async create(): Promise<AnimeScraper> {
    const context = await createContext();
    const page = await context.newPage();
    return new AnimeScraper(page, context);
  }

  async close(): Promise<void> {
    await this.context.close();
  }
  async getHomePageListAnime(): Promise<anime[]> {
    await this.page.goto(config.urlPage, { waitUntil: "domcontentloaded" });

    const grid = this.page.locator(AnimeSelectors.HomeGrid);
    const articles = grid.locator(AnimeSelectors.HomeArticle);

    return parseArticles(articles, {
      name: AnimeSelectors.HomeName,
      link: AnimeSelectors.HomeLink,
      img: AnimeSelectors.HomeImg,
    }) as Promise<anime[]>;
  }

  async getSearchAnimeResults(
    query?: string,
    numberPage?: string,
    filter?: Filter
  ): Promise<responseAnimeResult> {
    const url = new UrlBuilder("/catalogo")
      .withQuery(query)
      .withPage(numberPage)
      .withFilters(filter)
      .build();
    await this.page.goto(url.toString(), { waitUntil: "domcontentloaded" });
    const grid = this.page.locator(AnimeSelectors.SearchGrid);
    const articles = grid.locator(AnimeSelectors.SearchArticle);
    const numberPages = await animeCountSolution(this.page);
    const count = await articles.count();
    const result = [];

    for (let i = 0; i < count; i++) {
      const article = articles.nth(i);
      const name = await article.locator(AnimeSelectors.SearchName).innerText();
      const url = await article
        .locator(AnimeSelectors.SearchLink)
        .getAttribute("href");
      const urlImg = await article
        .locator(AnimeSelectors.SearchImg)
        .getAttribute("src");
      const urlReady = url ? `${config.urlPage}${url}` : null;

      result.push({ name, urlReady, urlImg });
    }
    return { results: result as animeCatalog[], numberPages };
  }

  async getCatalogListAnime(
    filter?: Filter,
    numberPage?: string
  ): Promise<responseAnimeResult> {
    const url = new UrlBuilder("/catalogo")
      .withPage(numberPage)
      .withFilters(filter)
      .build();
    await this.page.goto(url.toString(), {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    const grid = this.page.locator(AnimeSelectors.CatalogGrid);
    const numberPages = await animeCountSolution(this.page);
    const articles = grid.locator(AnimeSelectors.CatalogArticle);
    const count = await articles.count();
    const result = [];
    for (let i = 0; i < count; i++) {
      const article = articles.nth(i);
      const name = await article
        .locator(AnimeSelectors.CatalogName)
        .innerText();
      const url = await article
        .locator(AnimeSelectors.CatalogLink)
        .getAttribute("href");
      const urlImg = await article
        .locator(AnimeSelectors.CatalogImg)
        .getAttribute("src");
      const urlReady = url ? `${config.urlPage}${url}` : null;

      result.push({ name, urlReady, urlImg });
    }
    return { results: result as animeCatalog[], numberPages };
  }

  async getAnimeDetails(animeUrl: string): Promise<responseAnimeDetails> {
    await this.page.goto(animeUrl, { waitUntil: "domcontentloaded" });
    const heroInfo = this.page.locator(AnimeSelectors.DetailsHero);
    const caps = (
      await this.page.locator(AnimeSelectors.DetailsCapsArticles).count()
    ).toString();
    const name = await heroInfo.locator(AnimeSelectors.DetailsName).innerText();
    const spans = await heroInfo
      .locator(AnimeSelectors.DetailsSpans)
      .allInnerTexts();
    const date = spans[2];
    const status = spans[6];
    const genres = (
      await heroInfo.locator(AnimeSelectors.DetailsGenres).allInnerTexts()
    ).map((str) => str.trim());

    const description = (
      await heroInfo.locator(AnimeSelectors.DetailsDescription).innerText()
    )
      .replace("[Escrito por MAL Rewrite]", "")
      .trim();
    const urlImg = await this.page
      .locator(AnimeSelectors.DetailsImg)
      .getAttribute("src");
    return {
      name,
      description,
      genres,
      date,
      status,
      caps,
      urlImg,
    };
  }
}

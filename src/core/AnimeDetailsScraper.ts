import config from "../config/config.ts";
import { extractIdfromUrl } from "../adapters/libs.ts";
import { ErrorMessages } from "../enum/errorsEnum.ts";
import { AnimeSelectors } from "../enum/selectors.ts";
import { ScraperError } from "../Error/errorClass.ts";
import { throwIfNoData, throwIfParsingError } from "../Error/errorsHelpers.ts";
import {
  AnimeDetailsScraperAgreement,
  responseAnimeDetails,
  responseEpisode,
} from "../types/agreement.ts";
import AnimeScraper from "./AnimeScraper.ts";

export default class AnimeDetailsScraper
  implements AnimeDetailsScraperAgreement
{
  constructor(private scraper: AnimeScraper) {}
  async getAnimeDetails(animeUrl: string): Promise<responseAnimeDetails> {
    await this.scraper.page.goto(animeUrl, { waitUntil: "domcontentloaded" });
    const heroInfo = this.scraper.page.locator(AnimeSelectors.DetailsHero);

    let [name, spans, genres, description, urlImg, caps] = await Promise.all([
      heroInfo.locator(AnimeSelectors.DetailsName).innerText(),
      heroInfo.locator(AnimeSelectors.DetailsSpans).allInnerTexts(),
      heroInfo.locator(AnimeSelectors.DetailsGenres).allInnerTexts(),
      heroInfo.locator(AnimeSelectors.DetailsDescription).innerText(),
      this.scraper.page.locator(AnimeSelectors.DetailsImg).getAttribute("src"),
      this.scraper.page.locator(AnimeSelectors.DetailsCapsArticles).count(),
    ]);

    const date = spans[2];
    const status = spans[6]
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    genres = genres.map((str) => str.trim());
    const idAnime = extractIdfromUrl(urlImg);
    return {
      idAnime,
      name,
      description,
      genres,
      date,
      status,
      caps,
      urlImg,
    };
  }
  async getEpisodeList(url: string): Promise<responseEpisode[] | undefined> {
    try {
      await this.scraper.page.goto(url, { waitUntil: "networkidle" });
      const articles = this.scraper.page.locator(
        AnimeSelectors.DetailsCapsArticles
      );
      const count = await articles.count();
      throwIfNoData(count);
      const episodes = await Promise.all(
        Array.from({ length: count }, async (_, i) => {
          const item = articles.nth(i);
          const href = await item.locator("a").getAttribute("href");
          const src = await item
            .locator("div > figure > img")
            .getAttribute("src");

          throwIfParsingError(href, src);
          return { capLink: config.urlPage + href, capThumbnail: src };
        })
      );
      return episodes;
    } catch (err) {
      if (err instanceof ScraperError) console.log(err.code);
      else console.log(ErrorMessages.NETWORK_ERROR);
      return undefined;
    }
  }
}

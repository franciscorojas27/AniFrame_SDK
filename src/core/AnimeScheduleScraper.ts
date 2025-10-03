import { extractIdfromUrl } from "../adapters/libs.ts";
import { UrlBuilder } from "../adapters/urlBuilders.ts";
import { weekDays } from "../enum/days.ts";
import { AnimeSelectors } from "../enum/selectors.ts";
import {
  AnimeScheduleScraperAgreement,
  responseAnimeSchedule,
} from "../types/agreement.ts";
import AnimeScraper from "./AnimeScraper.ts";

export default class AnimeScheduleScraper implements AnimeScheduleScraperAgreement {
  constructor(private scraper: AnimeScraper) {}
  async getAnimeSchedule(url: string): Promise<responseAnimeSchedule> {
    await this.scraper.page.goto(url, { waitUntil: "domcontentloaded" });
    const buttons = this.scraper.page.locator(
      AnimeSelectors.animeScheduleButtons
    );
    const count = await buttons.count();
    const listSchedule: responseAnimeSchedule = {
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: [],
      sabado: [],
      domingo: [],
    };

    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
      const articles = this.scraper.page.locator(
        AnimeSelectors.animeScheduleArticles
      );
      const updateTime = this.scraper.page.locator(
        AnimeSelectors.animeScheduleUpdateTime
      );
      const articleCount = await articles.count();
      const dayKey = Object.values(weekDays)[i];

      for (let j = 0; j < articleCount; j++) {
        const [imgUrl, name, href, updateTimeAnime] = await Promise.all([
          articles
            .nth(j)
            .locator(AnimeSelectors.ScheduleImg)
            .getAttribute("src"),
          articles.nth(j).locator(AnimeSelectors.ScheduleName).innerText(),
          articles
            .nth(j)
            .locator(AnimeSelectors.ScheduleLink)
            .getAttribute("href"),
          updateTime.nth(j).innerText(),
        ]);

        listSchedule[dayKey].push({
          animeId: extractIdfromUrl(imgUrl),
          name,
          url: href ? new UrlBuilder(href).build().toString() : "",
          imgUrl,
          updateTimeAnime,
        });
      }
    }
    return listSchedule;
  }
}

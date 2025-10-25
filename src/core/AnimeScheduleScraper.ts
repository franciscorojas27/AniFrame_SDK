import { extractIdfromUrl } from '../adapters/libs.js'
import { UrlBuilder } from '../adapters/urlBuilders.js'
import { weekDays } from '../enums/days.js'
import { AnimeSelectors } from '../enums/selectors.js'
import { AnimeScheduleScraperAgreement } from '../types/agreement.js'
import { responseAnimeSchedule } from '../types/responseAgreement.js'
import { logScraperError } from '../errors/errorsHelpers.js'
import AnimeScraper from './AnimeScraper.js'

export default class AnimeScheduleScraper
  implements AnimeScheduleScraperAgreement
{
  constructor(private scraper: AnimeScraper) {}
  async getAnimeSchedule(): Promise<responseAnimeSchedule> {
    try {
      const url = new UrlBuilder('/horario').build().toString()
      await this.scraper.page.goto(url, { waitUntil: 'domcontentloaded' })
      const buttons = this.scraper.page.locator(
        AnimeSelectors.animeScheduleButtons,
      )
      const count = await buttons.count()
      const listSchedule: responseAnimeSchedule = {
        lunes: [],
        martes: [],
        miercoles: [],
        jueves: [],
        viernes: [],
        sabado: [],
        domingo: [],
      }

      for (let i = 0; i < count; i++) {
        await buttons.nth(i).click()
        const articles = this.scraper.page.locator(
          AnimeSelectors.animeScheduleArticles,
        )
        const updateTime = this.scraper.page.locator(
          AnimeSelectors.animeScheduleUpdateTime,
        )
        const articleCount = await articles.count()
        const dayKey = Object.values(weekDays)[i]

        for (let j = 0; j < articleCount; j++) {
          const [imgUrl, name, href, updateTimeAnime] = await Promise.all([
            articles
              .nth(j)
              .locator(AnimeSelectors.ScheduleImg)
              .getAttribute('src'),
            articles.nth(j).locator(AnimeSelectors.ScheduleName).innerText(),
            articles
              .nth(j)
              .locator(AnimeSelectors.ScheduleLink)
              .getAttribute('href'),
            updateTime.nth(j).innerText(),
          ])
          const url = href?.split('/').pop() || ''
          listSchedule[dayKey].push({
            id: extractIdfromUrl(imgUrl || ''),
            name,
            url,
            imgUrl,
            updateTimeAnime,
          })
        }
      }
      return listSchedule
    } catch (err) {
      logScraperError(err)
      return {
        lunes: [],
        martes: [],
        miercoles: [],
        jueves: [],
        viernes: [],
        sabado: [],
        domingo: [],
      }
    }
  }
}

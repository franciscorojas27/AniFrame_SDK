import config from '../config/config.js'
import { extractIdfromUrl } from '../adapters/libs.js'
import { AnimeSelectors } from '../enums/selectors.js'
import {
  throwIfNoData,
  throwIfParsingError,
  logScraperError,
} from '../errors/errorsHelpers.js'
import { AnimeDetailsScraperAgreement } from '../types/agreement.js'
import {
  responseAnimeDetails,
  responseEpisode,
} from '../types/responseAgreement.js'
import AnimeScraper from './AnimeScraper.js'

export default class AnimeDetailsScraper
  implements AnimeDetailsScraperAgreement
{
  constructor(private scraper: AnimeScraper) {}
  async getAnimeDetails(slug: string): Promise<responseAnimeDetails> {
    try {
      const url = `${config.urlPage}/media/${slug}`
      await this.scraper.page.goto(url, { waitUntil: 'domcontentloaded' })
      const heroInfo = this.scraper.page.locator(AnimeSelectors.DetailsHero)

      let [name, spans, genres, description, urlImg, caps] = await Promise.all([
        heroInfo.locator(AnimeSelectors.DetailsName).innerText(),
        heroInfo.locator(AnimeSelectors.DetailsSpans).allInnerTexts(),
        heroInfo.locator(AnimeSelectors.DetailsGenres).allInnerTexts(),
        heroInfo.locator(AnimeSelectors.DetailsDescription).innerText(),
        this.scraper.page
          .locator(AnimeSelectors.DetailsImg)
          .getAttribute('src'),
        this.scraper.page.locator(AnimeSelectors.DetailsCapsArticles).count(),
      ])

      const date = parseInt(spans[2])
      const status = spans[6]
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
      genres = genres.map((str) => str.trim())
      const id = extractIdfromUrl(urlImg || '')
      return {
        id,
        name,
        description,
        genres,
        date,
        status,
        caps,
        urlImg,
      }
    } catch (err) {
      logScraperError(err)
      throw err
    }
  }
  async getEpisodeList(slug: string): Promise<responseEpisode[]> {
    try {
      const url = `${config.urlPage}/media/${slug}`
      await this.scraper.page.goto(url, { waitUntil: 'networkidle' })
      const articles = this.scraper.page.locator(
        AnimeSelectors.DetailsCapsArticles,
      )
      const count = await articles.count()
      throwIfNoData(count)
      const episodes = await Promise.all(
        Array.from({ length: count }, async (_, i) => {
          const item = articles.nth(i)
          const href = await item.locator('a').getAttribute('href')
          const src = await item
            .locator('div > figure > img')
            .getAttribute('src')

          throwIfParsingError(href, src)
          return { capLink: config.urlPage + href, capThumbnail: src }
        }),
      )
      console.log(episodes)

      return episodes
    } catch (err) {
      logScraperError(err)
      throw err
    }
  }
}

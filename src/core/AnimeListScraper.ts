import { animeCountSolution, extractIdfromUrl } from '../adapters/libs.js'
import { UrlBuilder } from '../adapters/urlBuilders.js'
import config from '../config/config.js'
import { AnimeSelectors } from '../enums/selectors.js'
import { AnimeListScraperAgreement } from '../types/agreement.js'
import { logScraperError } from '../errors/errorsHelpers.js'
import {
  responseAnimeHome,
  responseAnimeResult,
} from '../types/responseAgreement.js'
import { anime, animeCatalog } from '../types/anime.js'
import { Filter } from '../types/filter.js'
import AnimeScraper from './AnimeScraper.js'
export default class AnimeListScraper implements AnimeListScraperAgreement {
  constructor(private scraper: AnimeScraper) {}

  async getHomePageListAnime(): Promise<responseAnimeHome[]> {
    try {
      await this.scraper.page.goto(config.urlPage, {
        waitUntil: 'domcontentloaded',
      })

      const articles = this.scraper.page.locator(AnimeSelectors.HomeArticles)

      const count = await articles.count()
      const result: anime[] = []

      for (let i = 0; i < count; i++) {
        let [name, slug, imgUrl, cap] = await Promise.all([
          articles.nth(i).locator(AnimeSelectors.HomeName).innerText(),
          articles.nth(i).locator(AnimeSelectors.HomeLink).getAttribute('href'),
          articles.nth(i).locator(AnimeSelectors.HomeImg).getAttribute('src'),
          articles.nth(i).locator(AnimeSelectors.HomeCap).innerText(),
        ])
        slug = slug ? slug.split('/').at(2) || '' : ' '
        imgUrl = imgUrl ? imgUrl : ''
        let id = extractIdfromUrl(imgUrl)
        result.push({ id, name, slug, imgUrl, cap: parseInt(cap) })
      }
      return result
    } catch (error) {
      logScraperError(error)
      return []
    }
  }

  async getSearchAnimeResults(
    query?: string,
    numberPage?: number,
    filter?: Filter,
  ): Promise<responseAnimeResult> {
    try {
      const url = new UrlBuilder('/catalogo')
        .withQuery(query)
        .withPage(numberPage)
        .withFilters(filter)
        .build()
      await this.scraper.page.goto(url.toString(), {
        waitUntil: 'domcontentloaded',
      })
      const articles = this.scraper.page.locator(AnimeSelectors.SearchArticle)
      let numberPages = await animeCountSolution(this.scraper.page)
      const count = await articles.count()
      const result: animeCatalog[] = []

      for (let i = 0; i < count; i++) {
        let [name, slug, imgUrl] = await Promise.all([
          articles.nth(i).locator(AnimeSelectors.SearchName).innerText(),
          articles
            .nth(i)
            .locator(AnimeSelectors.SearchLink)
            .getAttribute('href'),
          articles.nth(i).locator(AnimeSelectors.SearchImg).getAttribute('src'),
        ])
        slug = slug ? slug.split('/').at(2) || '' : ' '
        let id = extractIdfromUrl(imgUrl || '')
        result.push({ id, name, slug, imgUrl })
      }
      return { results: result as animeCatalog[], numberPages }
    } catch (error) {
      logScraperError(error)
      return { results: [], numberPages: 0 }
    }
  }

  async getCatalogListAnime(
    filter?: Filter,
    numberPage?: number,
  ): Promise<responseAnimeResult> {
    try {
      const url = new UrlBuilder('/catalogo')
        .withPage(numberPage)
        .withFilters(filter)
        .build()
      await this.scraper.page.goto(url.toString(), {
        waitUntil: 'domcontentloaded',
      })
      const numberPages = await animeCountSolution(this.scraper.page)
      const articles = this.scraper.page.locator(AnimeSelectors.CatalogArticle)
      const count = await articles.count()
      const result: animeCatalog[] = []
      for (let i = 0; i < count; i++) {
        let [name, slug, imgUrl] = await Promise.all([
          articles.nth(i).locator(AnimeSelectors.CatalogName).innerText(),
          articles
            .nth(i)
            .locator(AnimeSelectors.CatalogLink)
            .getAttribute('href'),
          articles
            .nth(i)
            .locator(AnimeSelectors.CatalogImg)
            .getAttribute('src'),
        ])
        slug = slug ? (slug.split('/').pop() ?? '') : ''

        let id = extractIdfromUrl(imgUrl || '')
        result.push({ id, name, slug, imgUrl })
      }
      return { results: result as animeCatalog[], numberPages }
    } catch (error) {
      logScraperError(error)
      return { results: [], numberPages: 0 }
    }
  }
}

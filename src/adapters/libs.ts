import { Page } from 'playwright'
import config from '../config/config.js'
import { AnimeSelectors } from '../enums/selectors.js'

export const extractIdfromUrl = (url: string): number => {
  if (!url) return 0
  const lastSegment = url.split('/').pop() ?? ''
  const cleaned = lastSegment.replace(/\?.*$/, '').replace(/#.*$/, '').replace(/\.(jpg|jpeg|png|webp)$/i, '')
  const id = parseInt(cleaned, 10)
  return Number.isNaN(id) ? 0 : id
}

export const animeCountSolution = async (page: Page): Promise<number> => {
  const animeCountText = await page
    .locator(AnimeSelectors.animeCount)
    .innerText()
    .catch(() => '1')
  const animeCount = parseInt(animeCountText.replace(/\D/g, ''), 10) || 1
  const totalPages = Math.max(
    1,
    Math.ceil(animeCount / config.numberAnimesPerPage),
  )
  return totalPages
}

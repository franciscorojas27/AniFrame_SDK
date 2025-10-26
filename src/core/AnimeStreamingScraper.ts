import { Response } from 'playwright'
import { responseM3U8 } from '../types/responseAgreement.js'
import AnimeScraper from './AnimeScraper.js'

export default class AnimeStreamingScraper {
  constructor(private scraper: AnimeScraper) {}

  async getM3U8List(urls: string[], delayMs: number): Promise<responseM3U8[]> {
    const results: responseM3U8[] = []
    await Promise.all(
      urls.map(async (url) => {
        const page = await this.scraper.newPage()
        const responseHandler = (response: Response) => {
          const contentType = response.headers()['content-type'] || ''
          if (
            contentType.includes('application/x-mpegURL') ||
            contentType.includes('video/mp4')
          ) {
            results.push({ foundUrl: response.url(), cap: url })
          }
        }

        page.on('response', responseHandler)

        try {
          await page.goto(url, { waitUntil: 'networkidle' })
          await page.waitForTimeout(delayMs)
        } catch (err) {
          throw new Error(err as string)
        } finally {
          page.off('response', responseHandler)
          await page.close()
        }
      }),
    )
    return results
  }
}

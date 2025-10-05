import { Response } from "playwright";
import { responseM3U8 } from "../types/responseAgreement.js";
import { logScraperError } from "../errors/errorsHelpers.js";
import AnimeScraper from "./AnimeScraper.js";

export default class AnimeStreamingScraper {
  constructor(private scraper: AnimeScraper) {}

  async getM3U8(url: string): Promise<responseM3U8> {
    let foundUrl: string | undefined;

    this.scraper.page.on("response", async (response: Response) => {
      const contentType = response.headers()["content-type"] || "";

      if (
        contentType.includes("application/vnd.apple.mpegurl") ||
        contentType.includes("application/x-mpegURL") ||
        contentType.includes("video/mp4")
      ) {
        foundUrl = response.url();
      }
    });

    try {
      await this.scraper.page.goto(url, { waitUntil: "networkidle" });
      await this.scraper.page.waitForTimeout(3000);
    } catch (err) {
      logScraperError(err);
    } finally {
      try {
        await this.scraper.page.close();
      } catch {}
    }
    const parts = url.split("/");
    const cap = parts[parts.length - 1];
    return { foundUrl, cap };
  }
}

import { BrowserContext, Page } from "playwright";
import createContext from "./Chromium.js";
import { AnimeScraperAgreement } from "../types/agreement.js";
export default class AnimeScraper implements AnimeScraperAgreement {
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
}

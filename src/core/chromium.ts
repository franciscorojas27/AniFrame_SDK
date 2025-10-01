import { BrowserContext, chromium } from "playwright";
import config from "../config/config.js";

async function createContext(): Promise<BrowserContext> {
  const browser = await chromium.launch({
    headless: Boolean(config.browserHeadless),
  });
  const context = await browser.newContext({
    viewport: null,
    userAgent: config.userAgent,
    locale: "es-ES",
    permissions: [],
    javaScriptEnabled: true,
  });
  return context;
}

export default createContext;

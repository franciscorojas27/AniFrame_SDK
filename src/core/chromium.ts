import { BrowserContext, chromium } from "playwright";
import config from "../config/config.js";

async function createContext(): Promise<BrowserContext> {
  const browser = await chromium.launch({
    args: [
      "--disable-gpu",
      "--no-sandbox",
      "--disable-extensions",
      "--disable-background-networking",
      "--disable-sync",
      "--metrics-recording-only",
      "--mute-audio",
      "--disable-background-timer-throttling",
      "--disable-breakpad",
      "--disable-client-side-phishing-detection",
      "--disable-default-apps",
      "--disable-hang-monitor",
      "--disable-popup-blocking",
      "--disable-prompt-on-repost",
      "--disable-renderer-backgrounding",
      "--disable-translate",
      "--disable-features=IsolateOrigins,site-per-process",
      "--disable-site-isolation-trials",
      "--disable-dev-shm-usage",
      "--disable-infobars",
      "--disable-notifications",
      "--disable-component-update",
      "--disable-backgrounding-occluded-windows",
      "--disable-ipc-flooding-protection",
      "--disable-software-rasterizer",
      "--disable-threaded-animation",
      "--disable-threaded-scrolling",
      "--disable-in-process-stack-traces",
      "--disable-logging",
      "--disable-permissions-api",
      "--disable-blink-features=AutomationControlled",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-web-security",
    ],
    ignoreDefaultArgs: ["--enable-automation"],
    timeout: 0,
  });

  const context = await browser.newContext({
    viewport: null,
    acceptDownloads: false,
    permissions: [],
    userAgent: config.userAgent,
    locale: "es-ES",
    bypassCSP: true,
    javaScriptEnabled: true,
  });

  return context;
}

export default createContext;

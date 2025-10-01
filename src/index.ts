import { RunCLI } from "./core/runCLI.ts";

// new RunCLI().run();

import { chromium } from "playwright";

const browser = await chromium.launch();
function getM3U8(url: string): Promise<string | undefined> {
  return new Promise(async (resolve) => {
    const page = await browser.newPage();
    let foundUrl: string | undefined;

    const listener = async (response: any) => {
      const resUrl = response.url();
      const contentType = response.headers()["content-type"] || "";

      if (
        contentType.includes("application/vnd.apple.mpegurl") ||
        contentType.includes("application/x-mpegURL") ||
        contentType.includes("video/mp4")
      ) {
        foundUrl = resUrl;
      }
    };

    page.on("response", listener);

    try {
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForTimeout(3000);
    } catch (e) {
      // Simple error handling
    }

    await page.close();
    resolve(foundUrl);
  });
}

const urls = [
  "https://animeav1.com/media/kijin-gentoushou/24",
  "https://animeav1.com/media/kijin-gentoushou/23",
  "https://animeav1.com/media/kijin-gentoushou/22",
];

const results = await Promise.all(
  urls.map(async (url) => {
    const link = await getM3U8(url);
    console.log("✅", url, "->", link);
    return { url, link };
  })
);
console.log(JSON.stringify({ ...results }, null, 2));
await browser.close();

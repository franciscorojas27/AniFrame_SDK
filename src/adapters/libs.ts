import { Page } from "playwright";
import config from "../config/config.ts";
import { AnimeSelectors } from "enum/selectors.ts";

export const parseArticles = async (
  articlesLocator: ReturnType<Page["locator"]>,
  selectors: { name: string; link: string; img: string }
) => {
  const count = await articlesLocator.count();
  const result = [];

  for (let i = 0; i < count; i++) {
    const article = articlesLocator.nth(i);
    const name = await article.locator(selectors.name).innerText();
    const url = await article.locator(selectors.link).getAttribute("href");
    const urlImg = await article.locator(selectors.img).getAttribute("src");
    const urlReady = url ? `${config.urlPage}${url}` : null;

    result.push({ name, urlReady, urlImg });
  }

  return result;
};

  export const animeCountSolution = async (page: Page): Promise<String> => {
    const animeCountText = await page
      .locator(AnimeSelectors.animeCount)
      .innerText()
      .catch(() => "1");
    const animeCount = parseInt(animeCountText.replace(/\D/g, ""), 10) || 1;
    const totalPages = Math.max(
      1,
      Math.ceil(animeCount / config.numberAnimesPerPage)
    );
    return totalPages.toString();
  };

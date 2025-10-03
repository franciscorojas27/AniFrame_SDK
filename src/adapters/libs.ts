import { Page } from "playwright";
import config from "../config/config.ts";
import { AnimeSelectors } from "../enum/selectors.ts";

export const extractIdfromUrl = (url: string | null): string => {
  if (!url) return "";
  return (
    url
      .split("/")
      .pop()
      ?.replace(/\.jpg$/, "") || ""
  );
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

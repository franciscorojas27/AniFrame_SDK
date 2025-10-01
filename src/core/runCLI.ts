import { Genero } from "../enum/filter.js";
import { AnimeScraper } from "./animeScraperClass.js";

export class RunCLI {
  async run() {
    const scraper = await AnimeScraper.create();

    function filterArrayByEnum<T extends Record<string, string>>(
      arr: string[],
      enumObj: T
    ): T[keyof T][] {
      return arr.filter((val): val is T[keyof T] =>
        Object.values(enumObj).includes(val as T[keyof T])
      );
    }
    const result = filterArrayByEnum(
      ["accion", "aventura", "comedia", "drama"],
      Genero
    );
    console.log(
      await scraper.getCatalogListAnime({
        genre: result,
      })
    );
  }
}

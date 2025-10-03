import { Genero } from "../enum/filter.ts";
import { AnimeScraper } from "./animeScraper.ts";
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

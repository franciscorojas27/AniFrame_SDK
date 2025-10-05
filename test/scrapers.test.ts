import { describe, it, expect, vi } from "vitest";
import AnimeListScraper from "../src/core/AnimeListScraper.js";

function mockPage() {
  const loc = () => ({
    locator: vi.fn().mockImplementation(() => loc()),
    innerText: vi.fn().mockResolvedValue("name"),
    getAttribute: vi.fn().mockResolvedValue("/anime/1"),
    count: vi.fn().mockResolvedValue(1),
    nth: vi.fn().mockImplementation(() => loc()),
  });
  return {
    goto: vi.fn().mockResolvedValue(undefined),
    locator: vi.fn().mockImplementation(() => loc()),
  } as any;
}

describe("Scrapers", () => {
  it("AnimeListScraper.getHomePageListAnime retorna lista", async () => {
    const page = mockPage();
    const scraper = { page } as any;
    const list = new AnimeListScraper(scraper);
    const res = await list.getHomePageListAnime();
    expect(res.length).toBe(1);
  });

  it("AnimeListScraper.getSearchAnimeResults maneja error y retorna fallback", async () => {
    const page = { goto: vi.fn().mockRejectedValue(new Error("fail")), locator: vi.fn() } as any;
    const scraper = { page } as any;
    const list = new AnimeListScraper(scraper);
    const res = await list.getSearchAnimeResults("q");
    expect(res).toEqual({ results: [], numberPages: "0" });
  });
});

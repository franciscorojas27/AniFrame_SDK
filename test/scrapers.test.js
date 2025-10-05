"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const AnimeListScraper_js_1 = __importDefault(require("../src/core/AnimeListScraper.js"));
function mockPage() {
    const loc = () => ({
        locator: vitest_1.vi.fn().mockImplementation(() => loc()),
        innerText: vitest_1.vi.fn().mockResolvedValue("name"),
        getAttribute: vitest_1.vi.fn().mockResolvedValue("/anime/1"),
        count: vitest_1.vi.fn().mockResolvedValue(1),
        nth: vitest_1.vi.fn().mockImplementation(() => loc()),
    });
    return {
        goto: vitest_1.vi.fn().mockResolvedValue(undefined),
        locator: vitest_1.vi.fn().mockImplementation(() => loc()),
    };
}
(0, vitest_1.describe)("Scrapers", () => {
    (0, vitest_1.it)("AnimeListScraper.getHomePageListAnime retorna lista", async () => {
        const page = mockPage();
        const scraper = { page };
        const list = new AnimeListScraper_js_1.default(scraper);
        const res = await list.getHomePageListAnime();
        (0, vitest_1.expect)(res.length).toBe(1);
    });
    (0, vitest_1.it)("AnimeListScraper.getSearchAnimeResults maneja error y retorna fallback", async () => {
        const page = { goto: vitest_1.vi.fn().mockRejectedValue(new Error("fail")), locator: vitest_1.vi.fn() };
        const scraper = { page };
        const list = new AnimeListScraper_js_1.default(scraper);
        const res = await list.getSearchAnimeResults("q");
        (0, vitest_1.expect)(res).toEqual({ results: [], numberPages: "0" });
    });
});

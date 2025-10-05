"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const urlBuilders_js_1 = require("../src/adapters/urlBuilders.js");
const config_js_1 = __importDefault(require("../src/config/config.js"));
const vitest_1 = require("vitest");
const filter_js_1 = require("../src/enums/filter.js");
(0, vitest_1.describe)("UrlBuilder", () => {
    const basePath = "/anime";
    (0, vitest_1.it)("debe construir la URL básica sin parámetros", () => {
        const url = new urlBuilders_js_1.UrlBuilder(basePath).build();
        (0, vitest_1.expect)(url.toString()).toBe(new URL(basePath, config_js_1.default.urlPage).toString());
    });
    (0, vitest_1.it)("debe agregar query correctamente", () => {
        const query = "naruto";
        const url = new urlBuilders_js_1.UrlBuilder(basePath).withQuery(query).build();
        (0, vitest_1.expect)(url.searchParams.get(filter_js_1.ParamsSupport.search)).toBe(query);
    });
    (0, vitest_1.it)("debe agregar page correctamente", () => {
        const page = "2";
        const url = new urlBuilders_js_1.UrlBuilder(basePath).withPage(page).build();
        (0, vitest_1.expect)(url.searchParams.get(filter_js_1.ParamsSupport.page)).toBe(page);
    });
    (0, vitest_1.it)("debe agregar filtros correctamente", () => {
        const filter = {
            category: "TV Anime",
            genre: ["Action", "Adventure"],
            status: "Finalizado",
        };
        const url = new urlBuilders_js_1.UrlBuilder(basePath).withFilters(filter).build();
        (0, vitest_1.expect)(url.searchParams.getAll(filter_js_1.FilterSupport.category)).toContain(filter.category);
        (0, vitest_1.expect)(url.searchParams.getAll(filter_js_1.FilterSupport.genre)).toEqual(filter.genre);
        (0, vitest_1.expect)(url.searchParams.getAll(filter_js_1.FilterSupport.status)).toContain(filter.status);
    });
    (0, vitest_1.it)("debe encadenar métodos correctamente", () => {
        const filter = {
            category: "OVA",
            genre: ["Comedy"],
            status: "En emisión",
        };
        const query = "one piece";
        const page = "5";
        const url = new urlBuilders_js_1.UrlBuilder(basePath)
            .withQuery(query)
            .withPage(page)
            .withFilters(filter)
            .build();
        (0, vitest_1.expect)(url.searchParams.get(filter_js_1.ParamsSupport.search)).toBe(query);
        (0, vitest_1.expect)(url.searchParams.get(filter_js_1.ParamsSupport.page)).toBe(page);
        (0, vitest_1.expect)(url.searchParams.getAll(filter_js_1.FilterSupport.genre)).toEqual(filter.genre);
        (0, vitest_1.expect)(url.searchParams.getAll(filter_js_1.FilterSupport.category)).toContain(filter.category);
        (0, vitest_1.expect)(url.searchParams.getAll(filter_js_1.FilterSupport.status)).toContain(filter.status);
    });
});

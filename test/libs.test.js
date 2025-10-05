"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const config_js_1 = __importDefault(require("../src/config/config.js"));
const libs_js_1 = require("../src/adapters/libs.js");
(0, vitest_1.describe)("animeCountSolution", () => {
    (0, vitest_1.it)("calcula correctamente las páginas", async () => {
        const mockPage = {
            locator: vitest_1.vi.fn().mockReturnValue({
                innerText: vitest_1.vi.fn().mockResolvedValue("42"),
            }),
        };
        const totalPages = await (0, libs_js_1.animeCountSolution)(mockPage);
        const expectedPages = Math.ceil(42 / config_js_1.default.numberAnimesPerPage).toString();
        (0, vitest_1.expect)(totalPages).toBe(expectedPages);
    });
    (0, vitest_1.it)("maneja errores y devuelve 1 página", async () => {
        const mockPage = {
            locator: vitest_1.vi.fn().mockReturnValue({
                innerText: vitest_1.vi.fn().mockRejectedValue(new Error("fail")),
            }),
        };
        const totalPages = await (0, libs_js_1.animeCountSolution)(mockPage);
        (0, vitest_1.expect)(totalPages).toBe("1");
    });
});

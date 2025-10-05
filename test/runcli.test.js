"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const CoreIndex = __importStar(require("../src/core/Index.js"));
(0, vitest_1.describe)("RunCLI", () => {
    let logSpy;
    (0, vitest_1.beforeEach)(() => {
        logSpy = vitest_1.vi.spyOn(console, "log").mockImplementation(() => { });
    });
    (0, vitest_1.afterEach)(() => {
        logSpy.mockRestore();
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.it)("debe responder UNKNOWN_COMMAND cuando el comando no existe", async () => {
        const run = new CoreIndex.RunCLI();
        await run.run(["comandoInvalido"]);
        const calls = logSpy.mock.calls.map(c => c[0]);
        const last = calls[calls.length - 1];
        (0, vitest_1.expect)(last).toContain("UNKNOWN_COMMAND");
    });
    (0, vitest_1.it)("debe imprimir error cuando falta --url", async () => {
        const run = new CoreIndex.RunCLI();
        await run.run(["getAnimeDetails"]);
        const calls = logSpy.mock.calls.map(c => c[0]);
        const last = calls[calls.length - 1];
        (0, vitest_1.expect)(last).toContain("\"error\":\"Missing --url\"");
    });
    (0, vitest_1.it)("debe llamar getHomePageListAnime y loguear JSON", async () => {
        const fakeScraper = {
            close: vitest_1.vi.fn().mockResolvedValue(undefined),
        };
        vitest_1.vi.spyOn(CoreIndex.AnimeScraper, "create").mockResolvedValue(fakeScraper);
        const listMock = { getHomePageListAnime: vitest_1.vi.fn().mockResolvedValue([{ name: "a", url: "", urlImg: null, cap: "1" }]) };
        vitest_1.vi.stubGlobal("AnimeListScraper", function () { return listMock; });
        const run = new CoreIndex.RunCLI();
        await run.run(["getHomePageListAnime"]);
        const calls = logSpy.mock.calls.map(c => c[0]);
        const last = calls[calls.length - 1];
        (0, vitest_1.expect)(last).toContain("[{\"name\":\"a\"");
        (0, vitest_1.expect)(fakeScraper.close).toHaveBeenCalled();
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const errorsHelpers_js_1 = require("../src/errors/errorsHelpers.js");
const errorClass_js_1 = require("../src/errors/errorClass.js");
(0, vitest_1.describe)("errorsHelpers", () => {
    let logSpy;
    (0, vitest_1.beforeEach)(() => {
        logSpy = vitest_1.vi.spyOn(console, "log").mockImplementation(() => { });
    });
    (0, vitest_1.afterEach)(() => {
        logSpy.mockRestore();
    });
    (0, vitest_1.it)("throwIfNoData lanza NO_DATA_FOUND cuando count es 0", () => {
        (0, vitest_1.expect)(() => (0, errorsHelpers_js_1.throwIfNoData)(0)).toThrow(errorClass_js_1.ScraperError);
        try {
            (0, errorsHelpers_js_1.throwIfNoData)(0);
        }
        catch (e) {
            (0, vitest_1.expect)(e).toBeInstanceOf(errorClass_js_1.ScraperError);
            (0, vitest_1.expect)(e.code).toBe("NO_DATA_FOUND");
        }
    });
    (0, vitest_1.it)("throwIfParsingError lanza PARSING_ERROR cuando faltan href o src", () => {
        (0, vitest_1.expect)(() => (0, errorsHelpers_js_1.throwIfParsingError)(null, "x")).toThrow(errorClass_js_1.ScraperError);
        (0, vitest_1.expect)(() => (0, errorsHelpers_js_1.throwIfParsingError)("x", null)).toThrow(errorClass_js_1.ScraperError);
    });
    (0, vitest_1.it)("logScraperError loguea el code cuando es ScraperError", () => {
        (0, errorsHelpers_js_1.logScraperError)(new errorClass_js_1.ScraperError("PARSING_ERROR"));
        (0, vitest_1.expect)(logSpy).toHaveBeenCalledWith("PARSING_ERROR");
    });
    (0, vitest_1.it)("logScraperError loguea NETWORK_ERROR cuando es error genérico", () => {
        (0, errorsHelpers_js_1.logScraperError)(new Error("fail"));
        (0, vitest_1.expect)(logSpy).toHaveBeenCalledWith("NETWORK_ERROR");
    });
});

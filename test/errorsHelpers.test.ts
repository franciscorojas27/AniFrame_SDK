import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { throwIfNoData, throwIfParsingError, logScraperError } from "../src/errors/errorsHelpers.js";
import { ScraperError } from "../src/errors/errorClass.js";

describe("errorsHelpers", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    logSpy.mockRestore();
  });

  it("throwIfNoData lanza NO_DATA_FOUND cuando count es 0", () => {
    expect(() => throwIfNoData(0)).toThrow(ScraperError);
    try { throwIfNoData(0); } catch (e) {
      expect(e).toBeInstanceOf(ScraperError);
      expect((e as ScraperError).code).toBe("NO_DATA_FOUND");
    }
  });

  it("throwIfParsingError lanza PARSING_ERROR cuando faltan href o src", () => {
    expect(() => throwIfParsingError(null, "x")).toThrow(ScraperError);
    expect(() => throwIfParsingError("x", null)).toThrow(ScraperError);
  });

  it("logScraperError loguea el code cuando es ScraperError", () => {
  logScraperError(new ScraperError("PARSING_ERROR" as any));
  expect(logSpy).toHaveBeenCalledWith("PARSING_ERROR");
  });

  it("logScraperError loguea NETWORK_ERROR cuando es error genérico", () => {
  logScraperError(new Error("fail"));
  expect(logSpy).toHaveBeenCalledWith("NETWORK_ERROR");
  });
});

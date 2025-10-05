import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as CoreIndex from "../src/core/Index.js";

describe("RunCLI", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    logSpy.mockRestore();
    vi.restoreAllMocks();
  });

  it("debe responder UNKNOWN_COMMAND cuando el comando no existe", async () => {
    const run = new (CoreIndex as any).RunCLI();
    await run.run(["comandoInvalido"]);
    const calls = logSpy.mock.calls.map(c => c[0] as string);
    const last = calls[calls.length - 1];
    expect(last).toContain("UNKNOWN_COMMAND");
  });

  it("debe imprimir error cuando falta --url", async () => {
    const run = new (CoreIndex as any).RunCLI();
    await run.run(["getAnimeDetails"]);
    const calls = logSpy.mock.calls.map(c => c[0] as string);
    const last = calls[calls.length - 1];
    expect(last).toContain("\"error\":\"Missing --url\"");
  });

  it("debe llamar getHomePageListAnime y loguear JSON", async () => {
    const fakeScraper = {
      close: vi.fn().mockResolvedValue(undefined),
    };
    vi.spyOn((CoreIndex as any).AnimeScraper, "create").mockResolvedValue(fakeScraper);
    const listMock = { getHomePageListAnime: vi.fn().mockResolvedValue([{ name: "a", url: "", urlImg: null, cap: "1" }]) };

    vi.stubGlobal("AnimeListScraper", function () { return listMock; });
    const run = new (CoreIndex as any).RunCLI();
    await run.run(["getHomePageListAnime"]);
    const calls = logSpy.mock.calls.map(c => c[0] as string);
    const last = calls[calls.length - 1];
    expect(last).toContain("[{\"name\":\"a\"");
    expect(fakeScraper.close).toHaveBeenCalled();
  });
});

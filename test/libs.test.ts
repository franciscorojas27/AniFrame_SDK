import { describe, it, expect, vi } from "vitest";
import config from "../src/config/config.js";
import { animeCountSolution } from "../src/adapters/libs.js";
describe("animeCountSolution", () => {
  it("calcula correctamente las páginas", async () => {
    const mockPage = {
      locator: vi.fn().mockReturnValue({
        innerText: vi.fn().mockResolvedValue("42"),
      }),
    };

    const totalPages = await animeCountSolution(mockPage as any);

    const expectedPages = Math.ceil(42 / config.numberAnimesPerPage).toString();
    expect(totalPages).toBe(expectedPages);
  });

  it("maneja errores y devuelve 1 página", async () => {
    const mockPage = {
      locator: vi.fn().mockReturnValue({
        innerText: vi.fn().mockRejectedValue(new Error("fail")),
      }),
    };

    const totalPages = await animeCountSolution(mockPage as any);
    expect(totalPages).toBe("1");
  });
});

import { UrlBuilder } from "../src/adapters/urlBuilders.js";
import config from "../src/config/config.js";
import { expect, describe, it } from "vitest";
import { FilterSupport, ParamsSupport } from "../src/enums/filter.js";

describe("UrlBuilder", () => {
  const basePath = "/anime";

  it("debe construir la URL básica sin parámetros", () => {
    const url = new UrlBuilder(basePath).build();
    expect(url.toString()).toBe(new URL(basePath, config.urlPage).toString());
  });

  it("debe agregar query correctamente", () => {
    const query = "naruto";
    const url = new UrlBuilder(basePath).withQuery(query).build();
    expect(url.searchParams.get(ParamsSupport.search)).toBe(query);
  });

  it("debe agregar page correctamente", () => {
    const page = "2";
    const url = new UrlBuilder(basePath).withPage(page).build();
    expect(url.searchParams.get(ParamsSupport.page)).toBe(page);
  });

  it("debe agregar filtros correctamente", () => {
    const filter = {
      category: "TV Anime",
      genre: ["Action", "Adventure"],
      status: "Finalizado",
    };
    const url = new UrlBuilder(basePath).withFilters(filter).build();

    expect(url.searchParams.getAll(FilterSupport.category)).toContain(
      filter.category
    );
    expect(url.searchParams.getAll(FilterSupport.genre)).toEqual(filter.genre);
    expect(url.searchParams.getAll(FilterSupport.status)).toContain(
      filter.status
    );
  });

  it("debe encadenar métodos correctamente", () => {
    const filter = {
      category: "OVA",
      genre: ["Comedy"],
      status: "En emisión",
    };
    const query = "one piece";
    const page = "5";

    const url = new UrlBuilder(basePath)
      .withQuery(query)
      .withPage(page)
      .withFilters(filter)
      .build();

    expect(url.searchParams.get(ParamsSupport.search)).toBe(query);
    expect(url.searchParams.get(ParamsSupport.page)).toBe(page);
    expect(url.searchParams.getAll(FilterSupport.genre)).toEqual(filter.genre);
    expect(url.searchParams.getAll(FilterSupport.category)).toContain(
      filter.category
    );
    expect(url.searchParams.getAll(FilterSupport.status)).toContain(
      filter.status
    );
  });
});

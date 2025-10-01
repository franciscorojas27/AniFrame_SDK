import { Filter } from "../types/filter.ts";
import config from "../config/config.ts";
import { FilterSupport, ParamsSupport } from "../enum/filter.ts";
interface UrlBuilderClass {
  withQuery(query?: string): this;
  withPage(page?: string): this;
  withFilters(filter?: Filter): this;
  build(): URL;
}

export class UrlBuilder implements UrlBuilderClass {
  private url: URL;

  constructor(basePath: string) {
    this.url = new URL(basePath, config.urlPage);
  }

  withQuery(query?: string): this {
    if (query) this.url.searchParams.set(ParamsSupport.search, query);
    return this;
  }

  withPage(page?: string): this {
    if (page) this.url.searchParams.set(ParamsSupport.page, page);
    return this;
  }

  withFilters(filter?: Filter): this {
    if (filter) {
      if (filter.category)
        this.url.searchParams.append(FilterSupport.category, filter.category);
      if (filter.genre) {
        filter.genre.forEach((g) => {
          this.url.searchParams.append(FilterSupport.genre, g);
        });
      }
      if (filter.status)
        this.url.searchParams.append(FilterSupport.status, filter.status);
    }
    return this;
  }

  build(): URL {
    return this.url;
  }
}

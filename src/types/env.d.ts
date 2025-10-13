declare namespace Bun {
  interface ProcessEnv {
    URL_PAGE_TO_SCRAPP?: string;
    PLUGIN_NAME?: string;
    NUMBER_ANIMES_PER_PAGE?: string | number;
    USER_AGENT?: string;
    BROWSER_HEADLESS?: Boolean;
  }
}

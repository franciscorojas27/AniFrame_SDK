export default {
  urlPage: process.env.URL_PAGE_TO_SCRAPP ?? "https://animeav1.com/",
  numberAnimesPerPage: Number(process.env.NUMBER_ANIMES_PER_PAGE) || 20,
  userAgent:
    process.env.USER_AGENT ??
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  browserHeadless: process.env.BROWSER_HEADLESS ?? "true",
};

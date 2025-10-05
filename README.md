# Scraper SDK CLI

Build TypeScript to JavaScript and run the CLI without tsx.

## Build

```pwsh
pnpm install
pnpm build
```

## Run as CLI (JavaScript)

```pwsh
# Example commands
node dist/index.js getHomePageListAnime
node dist/index.js getSearchAnimeResults --query naruto --page 2 --category serie --genre accion --status emision
node dist/index.js getAnimeDetails --url https://example.com/anime/foo
```

The CLI prints JSON to stdout. Errors are reported as `{ "error": "..." }`.

## As a global binary (optional)

If you publish or link locally, `scraper-cli` points to `dist/index.js`.

```pwsh
pnpm link --global
scraper-cli getCatalogListAnime --page 3 --genre aventura
```

## Notes

- Folder naming is standardized to lowercase, e.g., `errors/` instead of `Error/`.
- When moving to JS-only environments, use the build output in `dist/`.

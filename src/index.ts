import manifest from "./manifest.js";
import {
  AnimeDetailsScraper,
  AnimeListScraper,
  AnimeScheduleScraper,
  AnimeScraper,
  AnimeStreamingScraper,
} from "./core/Index";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { createServer } from "node:http";
let animeScraper = await AnimeScraper.create();
let animeListScraper = new AnimeListScraper(animeScraper);
let animeDetailsScraper = new AnimeDetailsScraper(animeScraper);
let animeScheduleScraper = new AnimeScheduleScraper(animeScraper);
let animeStreamingScraper = new AnimeStreamingScraper(animeScraper);
import { Server } from "socket.io";
const pathTemp = path.join(os.tmpdir(), "animeav1");
const configPath = path.join(pathTemp, "config.json").toString();
if (!fs.existsSync(pathTemp)) {
  fs.mkdirSync(pathTemp);
}
const config = { port: 8080, pid: process.pid };

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("getHomePageListAnime", async (data, callback) => {
    const result = await animeListScraper.getHomePageListAnime();
    callback(result);
  });
  socket.on("getSearchAnime", async (data, callback) => {
    const result = await animeListScraper.getSearchAnimeResults(
      data.args.query as string,
      data.args.page as string,
      {
        genre: data.args.genres as string[],
        status: data.args.status as string,
        category: data.args.category as string,
      }
    );
    callback(result);
  });

  socket.on("getCatalogListAnime", async (data, callback) => {
    const result = await animeListScraper.getCatalogListAnime(
      {
        genre: data.genres as string[],
        status: data.status as string,
        category: data.category as string,
      },
      data.page as string
    );
    callback(result);
  });
  socket.on("getEpisodeList", async (data, callback) => {
    callback(await animeDetailsScraper.getEpisodeList(data.url as string));
  });
  socket.on("getAnimeDetails", async (data, callback) => {
    callback(await animeDetailsScraper.getAnimeDetails(data.url as string));
  });
  socket.on("getAnimeSchedule", async (data, callback) => {
    callback(await animeScheduleScraper.getAnimeSchedule());
  });
  socket.on("getAnimeStreamingLinks", async (data, callback) => {
    try {
      const result = await animeStreamingScraper.getM3U8List(
        data.url as string[],
        Number(data.delay) || 10
      );
      callback(result);
    } catch (err) {
      console.error(err);
    }
  });
  socket.on("getManifest", async (data, callback) => {
    callback(manifest);
  });
});

httpServer.listen(config.port, () => {
  console.log(`listening on ${config.port}`);
});

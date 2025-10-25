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
    try {
      const result = await animeListScraper.getHomePageListAnime();
      callback({ success: true, content: result });
    } catch (err) {
      callback({ success: false, error: err });
    }
  });

  socket.on("getSearchAnime", async (data, callback) => {
    try {
      const result = await animeListScraper.getSearchAnimeResults(
        data.args.query as string,
        data.args.page as number,
        {
          genre: data.args.genres as string[],
          status: data.args.status as string,
          category: data.args.category as string,
        }
      );
      callback({ success: true, content: result });
    } catch (err) {
      callback({ success: false, error: err });
    }
  });

  socket.on("getCatalogListAnime", async (data, callback) => {
    try {
      const result = await animeListScraper.getCatalogListAnime(
        {
          genre: data.genres as string[],
          status: data.status as string,
          category: data.category as string,
        },
        data.page as number
      );
      callback({ success: true, content: result });
    } catch (err) {
      callback({ success: false, error: err });
    }
  });

  socket.on("getEpisodeList", async (data, callback) => {
    try {
      const result = await animeDetailsScraper.getEpisodeList(data.slug as string);
      callback({ success: true, content: result });
    } catch (err) {
      callback({ success: false, error: err });
    }
  });

  socket.on("getAnimeDetails", async (data, callback) => {
    try {
      const result = await animeDetailsScraper.getAnimeDetails(data.slug as string);
      callback({ success: true, content: result });
    } catch (err) {
      callback({ success: false, error: err });
    }
  });

  socket.on("getAnimeSchedule", async (data, callback) => {
    try {
      const result = await animeScheduleScraper.getAnimeSchedule();
      callback({ success: true, content: result });
    } catch (err) {
      callback({ success: false, error: err });
    }
  });

  socket.on("getAnimeStreamingLinks", async (data, callback) => {
    try {
      const result = await animeStreamingScraper.getM3U8List(
        data.url as string[],
        Number(data.delay) || 10
      );
      callback({ success: true, content: result });
    } catch (err) {
      callback({ success: false, error: err });
    }
  });

  socket.on("getManifest", async (data, callback) => {
    try {
      callback({ success: true, content: manifest });
    } catch (err) {
      callback({ success: false, error: err });
    }
  });

  socket.onAny((eventName, ...args) => {
    try {
      if (eventName === 'error') return;
      const EVENTOS_VALIDOS = new Set([
        "getHomePageListAnime",
        "getSearchAnime",
        "getCatalogListAnime",
        "getEpisodeList",
        "getAnimeDetails",
        "getAnimeSchedule",
        "getAnimeStreamingLinks",
        "getManifest"
      ]);
      if (!EVENTOS_VALIDOS.has(eventName)) {
        const errorMessage = `Unknown event: ${eventName}`;
        console.warn(`⚠️ Evento no reconocido en socket ${socket.id}: ${eventName}`);

        const callback = args.find(arg => typeof arg === 'function');

        if (callback) {
          callback({ success: false, error: errorMessage });
        } else {
          socket.emit("error", { message: errorMessage });
        }
      }
    } catch (err) {
      console.error('Error handling event:', err);
    }
  });
});

httpServer.listen(config.port, () => {
  console.log(`listening on ${config.port}`);
});

import AnimeScraper from "./AnimeScraper.js";
import AnimeListScraper from "./AnimeListScraper.js";
import AnimeDetailsScraper from "./AnimeDetailsScraper.js";
import AnimeScheduleScraper from "./AnimeScheduleScraper.js";
import AnimeStreamingScraper from "./AnimeStreamingScraper.js";
import { Category, Status, Genero } from "../enums/filter.js";
import yargs, { Argv } from "yargs";
import { hideBin } from "yargs/helpers";
import { ErrorMessages } from "../enums/errorsEnum.js";
import { ArgumentsFilter } from "../adapters/argumentsFilter.js";
import {
  SearchAnimeArgs,
  CatalogAnimeArgs,
  AnimeDetailsArgs,
  AnimeStreamingArgs,
} from "../types/argsAgreement.js";

export class RunCLI {
  private animeScraper!: AnimeScraper;
  private animeListScraper!: AnimeListScraper;
  private animeDetailsScraper!: AnimeDetailsScraper;
  private animeScheduleScraper!: AnimeScheduleScraper;
  private animeStreamingScraper!: AnimeStreamingScraper;
  constructor(private args = yargs(hideBin(process.argv))) {}

  async init() {
    this.animeScraper = await AnimeScraper.create();
    this.animeListScraper = new AnimeListScraper(this.animeScraper);
    this.animeDetailsScraper = new AnimeDetailsScraper(this.animeScraper);
    this.animeScheduleScraper = new AnimeScheduleScraper(this.animeScraper);
    this.animeStreamingScraper = new AnimeStreamingScraper(this.animeScraper);
  }

  static async run() {
    const cli = new RunCLI();
    await cli.init();
    return cli;
  }
  parseArgs() {
    return this.args
      .exitProcess(false)
      .command(
        "getSearchAnimeResults",
        "Get anime search results",
        (yargs: Argv<Partial<SearchAnimeArgs>>) => {
          return yargs
            .option("query", {
              describe: "Search query",
              type: "string",
              alias: "q",
              demandOption: true,
              requiresArg: true,
              string: true,
            })
            .option("genres", {
              describe: "List of genres to filter by",
              type: "array",
              alias: "g",
              default: [],
              choices: Object.values(Genero),
            })
            .option("status", {
              describe: "Status to filter by",
              type: "string",
              alias: "s",
              choices: Object.values(Status),
            })
            .option("category", {
              describe: "Category to filter by",
              type: "string",
              alias: "c",
              choices: Object.values(Category),
            })
            .option("page", {
              describe: "Page number",
              type: "string",
              alias: "p",
              default: "1",
              coerce: (arg) => {
                if (!/^\d+$/.test(arg) || parseInt(arg, 10) < 1) {
                  throw new Error(ErrorMessages.INVALID_ARGUMENTS);
                }
                return arg;
              },
            });
        },
        async (argv) => {
          console.log(
            await this.animeListScraper.getSearchAnimeResults(
              argv.query,
              argv.page,
              {
                genre: ArgumentsFilter.validateGenres(argv.genres),
                status: argv.status,
                category: argv.category,
              }
            )
          );
          process.exit(1);
        }
      )
      .command(
        "getCatalogListAnime",
        "Get anime catalog list",
        (yargs: Argv<Partial<CatalogAnimeArgs>>) => {
          return yargs
            .option("genres", {
              describe: "List of genres to filter by",
              type: "array",
              alias: "g",
              default: [],
              choices: Object.values(Genero),
            })
            .option("status", {
              describe: "Status to filter by",
              type: "string",
              alias: "s",
              choices: Object.values(Status),
            })
            .option("category", {
              describe: "Category to filter by",
              type: "string",
              alias: "c",
              choices: Object.values(Category),
            })
            .option("page", {
              describe: "Page number",
              type: "string",
              alias: "p",
              default: "1",
              coerce: (arg) => {
                if (!/^\d+$/.test(arg) || parseInt(arg, 10) < 1) {
                  throw new Error(ErrorMessages.INVALID_ARGUMENTS);
                }
                return arg;
              },
            });
        },
        async (argv) => {
          console.log(
            JSON.stringify(
              await this.animeListScraper.getCatalogListAnime(
                {
                  genre: ArgumentsFilter.validateGenres(argv.genres),
                  status: argv.status as Status,
                  category: argv.category as Category,
                },
                argv.page
              ),
              null,
              2
            )
          );
          process.exit(1);
        }
      )
      .command(
        "getHomePageListAnime",
        "Get anime home page list",
        () => {},
        async () => {
          console.log(
            JSON.stringify(
              await this.animeListScraper.getHomePageListAnime(),
              null,
              2
            )
          );
          process.exit(1);
        }
      )
      .command(
        "getEpisodeList",
        "Get episode list",
        (yargs: Argv<Partial<AnimeDetailsArgs>>) => {
          return yargs.option("url", {
            describe: "Anime URL",
            type: "string",
            alias: "u",
            demandOption: true,
            requiresArg: true,
            string: true,
          });
        },
        async (argv) => {
          console.log(
            JSON.stringify(
              (await this.animeDetailsScraper.getEpisodeList(argv.url)) || {
                error: 404,
              },
              null,
              2
            )
          );
          process.exit(1);
        }
      )
      .command(
        "getAnimeDetails",
        "Get anime details",
        (yargs: Argv<Partial<AnimeDetailsArgs>>) => {
          return yargs.option("url", {
            describe: "Anime URL",
            type: "string",
            alias: "u",
            demandOption: true,
            requiresArg: true,
            string: true,
          });
        },
        async (argv) => {
          console.log(
            JSON.stringify(
              await this.animeDetailsScraper.getAnimeDetails(
                argv.url as string
              ),
              null,
              2
            )
          );
          process.exit(1);
        }
      )
      .command(
        "getAnimeSchedule",
        "Get anime schedule",
        () => {},
        async () => {
          console.log(
            JSON.stringify(
              await this.animeScheduleScraper.getAnimeSchedule(),
              null,
              2
            )
          );
          process.exit(1);
        }
      )
      .command(
        "getAnimeStreaming",
        "Get anime streaming links",
        (yargs: Argv<Partial<AnimeStreamingArgs>>) => {
          return yargs.option("url", {
            describe: "Anime episode URL",
            type: "string",
            alias: "u",
            demandOption: true,
            requiresArg: true,
            string: true,
          });
        },
        async (argv) => {
          console.log(
            JSON.stringify(
              await this.animeStreamingScraper.getM3U8(argv.url as string),
              null,
              2
            )
          );
          process.exit(1);
        }
      )
      .strictCommands()
      .fail((msg, err) => {
        if (msg) {
          console.error(ErrorMessages.INVALID_ARGUMENTS);
          process.exit(1);
        }
        console.error(ErrorMessages.INVALID_COMMAND);
        process.exit(1);
      })
      .parse();
  }
}

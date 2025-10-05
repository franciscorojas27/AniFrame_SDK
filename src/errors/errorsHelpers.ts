import { ScraperError } from "./errorClass.js";
import { ErrorMessages } from "../enums/errorsEnum.js";

export function throwIfNoData(count: number): void {
  if (count === 0) {
    throw new ScraperError(ErrorMessages.NO_DATA_FOUND);
  }
}

export function throwIfParsingError(
  href?: string | null,
  src?: string | null
): void {
  if (!href || !src) {
    throw new ScraperError(ErrorMessages.PARSING_ERROR);
  }
}

export function logScraperError(err: unknown): void {
  if (err instanceof ScraperError) console.log(err.code);
  else console.log(ErrorMessages.NETWORK_ERROR);
}

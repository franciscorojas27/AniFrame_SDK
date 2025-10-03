import { ScraperError } from "./errorClass.ts";
import { ErrorMessages } from "enum/errorsEnum.ts";

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

import { ErrorMessages } from "../enum/errorsEnum.ts";
export class ScraperError extends Error {
    constructor(public code: ErrorMessages,) {

        super(code);
        this.name = "ScraperError";
    }
}

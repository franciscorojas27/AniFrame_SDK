import { ErrorMessages } from "../enums/errorsEnum.js";
export class ScraperError extends Error {
    constructor(public code: ErrorMessages,) {

        super(code);
        this.name = "ScraperError";
    }
}

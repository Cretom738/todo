import { CustomError } from "./custom.error";

export class NotFoundError extends CustomError {

    statusCode: number = 404;

    constructor() {
        super("Not found");
    }

    serializeErrors(): { message: string; fields?: string[]; } {
        return {
            message: this.message
        }
    }
}
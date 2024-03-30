import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom.error";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            message: err.message
        });
    }
    console.error(err);
    res.status(500).json({
        message: "Internal server error"
    });
    next();
}
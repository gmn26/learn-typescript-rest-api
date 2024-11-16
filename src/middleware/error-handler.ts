import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
        response.status(400).json({
            errors: `Validation error: ${JSON.stringify(error)}`,
        })
    } else if (error instanceof ResponseError) {
        response.status(error.status).json({
            errors: error.message,
        })
    } else {
        response.status(500).json({
            errors: error.message
        })
    }
}
import express from "express";
import { publicRouter } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-handler";

export const web = express();

web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);

import express, { Request, Response, NextFunction } from "express";

import "express-async-errors";

import swaggerUi from "swagger-ui-express";

import "reflect-metadata";

import { AppError } from "@shared/errors/appErrors";

import swaggerFile from "../../../swaggerFile.json";
import { router } from "./routes";

import "@shared/infra/typeorm";

import "@shared/container";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            message: error.message,
        });
    }

    return response.status(500).json({
        status: "error",

        message: `internal server error: ${error.message}`,
    });
});

app.listen(3333, () => {
    console.log("App running on http://localhost:3333");
});

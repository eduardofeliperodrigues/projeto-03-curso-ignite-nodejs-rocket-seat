import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "@modules/cars/UseCases/importCategory/ImportCategoryUseCase";

class ImportCategoryController {
    handler(request: Request, response: Response): Response {
        const { file } = request;

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

        importCategoryUseCase.execute(file);

        return response.status(201).send();
    }
}

export { ImportCategoryController };

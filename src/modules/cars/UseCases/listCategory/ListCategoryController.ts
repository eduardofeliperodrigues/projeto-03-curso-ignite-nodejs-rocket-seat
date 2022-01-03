import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoryUseCase } from "@modules/cars/UseCases/listCategory/ListCategoryUseCase";

class ListCategoryController {
    async handler(request: Request, response: Response): Promise<Response> {
        const listCategoryUseCase = container.resolve(ListCategoryUseCase);

        const allCategories = await listCategoryUseCase.execute();

        return response.status(200).json(allCategories);
    }
}

export { ListCategoryController };

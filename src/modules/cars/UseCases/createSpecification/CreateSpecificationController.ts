import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "@modules/cars/UseCases/createSpecification/CreateSpecificationUseCase";

class CreateSpecificationController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        const createCategoryUseCase = container.resolve(CreateSpecificationUseCase);

        await createCategoryUseCase.execute({
            name,
            description,
        });

        return response.status(201).send();
    }
}

export { CreateSpecificationController };

import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/appErrors";
import { ICategoryRespository } from "../../repositories/ICategoryRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    private categoryRepository: ICategoryRespository;

    constructor(@inject("CategoryRepository") categoryRepository: ICategoryRespository) {
        this.categoryRepository = categoryRepository;
    }

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryExists = await this.categoryRepository.findByName(name);

        if (categoryExists) {
            throw new AppError("Category already exists", 409);
        }

        await this.categoryRepository.create({
            name,
            description,
        });
    }
}

export { CreateCategoryUseCase };

import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/entities/Category";
import { ICategoryRespository } from "@modules/cars/repositories/ICategoryRepository";

@injectable()
class ListCategoryUseCase {
    private categoryRespository: ICategoryRespository;

    constructor(@inject("CategoryRepository") categoryRespository: ICategoryRespository) {
        this.categoryRespository = categoryRespository;
    }

    async execute(): Promise<Category[]> {
        const allCategories = await this.categoryRespository.list();

        return allCategories;
    }
}

export { ListCategoryUseCase };

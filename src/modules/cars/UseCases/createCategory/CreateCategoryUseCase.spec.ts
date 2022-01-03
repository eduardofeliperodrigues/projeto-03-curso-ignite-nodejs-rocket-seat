import { ICategoryRespository } from "@modules/cars/repositories/ICategoryRepository";
import { CategoryRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoryRepositoryInMemory";
import { AppError } from "@shared/errors/appErrors";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRespositoryInMemory: ICategoryRespository;

describe("Create Category", () => {
    beforeEach(() => {
        categoryRespositoryInMemory = new CategoryRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoryRespositoryInMemory);
    });

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Teste",
            description: "Category description teste",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoryRespositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new category if the name already exists", async () => {
        expect(async () => {
            const category = {
                name: "Category Teste",
                description: "Category description teste",
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});

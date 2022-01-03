import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/entities/Category";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

@injectable()
class ListSpecificationUseCase {
    private specificationRepository: ISpecificationRepository;

    constructor(@inject("SpecificationRepository") specificationRepository: ISpecificationRepository) {
        this.specificationRepository = specificationRepository;
    }

    async execute(): Promise<Category[]> {
        const allSpecifications = await this.specificationRepository.list();

        return allSpecifications;
    }
}

export { ListSpecificationUseCase };

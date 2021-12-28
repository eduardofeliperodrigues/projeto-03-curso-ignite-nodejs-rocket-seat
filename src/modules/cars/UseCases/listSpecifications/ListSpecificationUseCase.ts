import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

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

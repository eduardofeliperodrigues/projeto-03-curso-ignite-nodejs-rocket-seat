import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/appErrors";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    private specificationRepository: ISpecificationRepository;

    constructor(@inject("SpecificationRepository") specificationRepository: ISpecificationRepository) {
        this.specificationRepository = specificationRepository;
    }

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationExists = await this.specificationRepository.findByName(name);

        if (specificationExists) {
            throw new AppError("Specification already exists", 409);
        }

        await this.specificationRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };

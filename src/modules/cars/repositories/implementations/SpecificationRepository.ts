import { Repository, getRepository } from "typeorm";

import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
    private respository: Repository<Specification>;

    constructor() {
        this.respository = getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.respository.create({
            name,
            description,
        });

        await this.respository.save(specification);
    }

    async list(): Promise<Specification[]> {
        const allSpecifications = await this.respository.find();
        return allSpecifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.respository.findOne({ name });
        return specification;
    }
}

export { SpecificationRepository };

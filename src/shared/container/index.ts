import { container } from "tsyringe";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoryRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICategoryRespository } from "@modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

// CategoryRepository

container.registerSingleton<ICategoryRespository>("CategoryRepository", CategoryRepository);

// SpecificationRepository

container.registerSingleton<ISpecificationRepository>("SpecificationRepository", SpecificationRepository);

// UserRepository

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

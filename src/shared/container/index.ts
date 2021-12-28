import { container } from "tsyringe";

import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository";
import { IUserRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoryRespository } from "../../modules/cars/repositories/ICategoryRepository";
import { CategoryRepository } from "../../modules/cars/repositories/implementations/CategoryRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";

// CategoryRepository
container.registerSingleton<ICategoryRespository>("CategoryRepository", CategoryRepository);

// SpecificationRepository
container.registerSingleton<ISpecificationRepository>("SpecificationRepository", SpecificationRepository);

// UserRepository
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

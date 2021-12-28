import { Router } from "express";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { CreateSpecificationController } from "../modules/cars/UseCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "../modules/cars/UseCases/listSpecifications/ListSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.post("/specifications", ensureAuthentication, createSpecificationController.handler);
specificationsRoutes.get("/specifications", listSpecificationController.handler);

export { specificationsRoutes };

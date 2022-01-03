import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/UseCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/UseCases/importCategory/ImportCategoryController";
import { ListCategoryController } from "@modules/cars/UseCases/listCategory/ListCategoryController";

const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" });

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

categoriesRoutes.post("/categories", createCategoryController.handler);
categoriesRoutes.get("/categories", listCategoryController.handler);
categoriesRoutes.post("/categories/import", upload.single("file"), importCategoryController.handler);

export { categoriesRoutes };

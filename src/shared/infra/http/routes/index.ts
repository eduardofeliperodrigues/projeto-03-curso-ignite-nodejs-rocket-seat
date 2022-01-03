import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use(usersRoutes);
router.use(categoriesRoutes);
router.use(specificationsRoutes);
router.use(authenticateRoutes);

export { router };

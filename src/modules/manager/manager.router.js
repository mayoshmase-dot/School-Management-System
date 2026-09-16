import { Router } from "express";
import * as controller from "./manager.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { managerSchema } from "./manager.validation.js";

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validate(managerSchema), controller.createManager);
router.put('/:id', validate(managerSchema), controller.updateManager);
router.delete('/:id', controller.deleteManager);

export default router;
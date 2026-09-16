import { Router } from "express";
import * as controller from "./courseOffering.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { courseOfferingSchema } from "./courseOffering.validation.js";

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validate(courseOfferingSchema), controller.createOffering);
router.put('/:id', validate(courseOfferingSchema), controller.updateOffering);
router.delete('/:id', controller.deleteOffering);

export default router;
import { Router } from "express";
import * as controller from "./courseOffering.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { courseOfferingSchema } from "./courseOffering.validation.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', auth("manager"), validate(courseOfferingSchema), controller.createOffering);
router.put('/:id', auth("manager"), validate(courseOfferingSchema), controller.updateOffering);
router.delete('/:id', auth("manager"), controller.deleteOffering);

export default router;
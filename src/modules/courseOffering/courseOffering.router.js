import { Router } from "express";
import * as controller from "./courseOffering.controller.js";

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.createOffering);
router.put('/:id', controller.updateOffering);
router.delete('/:id', controller.deleteOffering);

export default router;
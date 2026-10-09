import { Router } from "express";
import * as controller from "./manager.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { managerSchema , managerLoginSchema} from "./manager.validation.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.createManager);
router.post('/login', controller.loginManger);

router.put('/:id', auth("manager"), validate(managerSchema), controller.updateManager);
router.delete('/:id', auth("manager"), controller.deleteManager);
export default router;
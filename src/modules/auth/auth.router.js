import { Router } from "express";
import * as controller from "./auth.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { registerSchema, loginSchema, sendCodeSchema, resetPasswordSchema } from "./auth.validation.js";

const router = Router();

router.post('/register', validate(registerSchema), controller.register);
router.get('/confirmEmail/:token', controller.confirmEmail);
router.post('/login', validate(loginSchema), controller.login);
router.post('/sendCode', validate(sendCodeSchema), controller.sendCode);
router.post('/resetPassword', validate(resetPasswordSchema), controller.resetPassword);

export default router;
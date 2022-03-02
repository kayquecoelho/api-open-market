import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validateLoginSchema } from "../middlewares/validateLoginSchema.js";
import { validateUserSchema } from "../middlewares/validateUserSchema.js";

const authRouter = Router();

authRouter.post("/auth/register", validateUserSchema, register);
authRouter.post("/auth/login", validateLoginSchema, login);

export default authRouter;

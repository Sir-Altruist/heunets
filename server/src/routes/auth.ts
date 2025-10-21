import { Router } from "express";
import { AuthControllers } from "../controllers";
import { ValidationsMiddleware, AuthenticationMiddleware } from "../middlewares";

const router = Router();

const { onboarding, login } = AuthControllers;
const { inspectOnboarding, inspectLogin } = ValidationsMiddleware
const { permissions, authenticate } = AuthenticationMiddleware

// router.post("/onboarding", inspectOnboarding, onboarding)
router.post("/onboarding", authenticate, permissions(["users:create"]), inspectOnboarding, onboarding)
router.post("/login", inspectLogin, login)


export default router;

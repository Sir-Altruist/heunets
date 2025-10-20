import { Router } from "express";
import { UsersControllers } from "../controllers";
import { AuthenticationMiddleware } from "../middlewares"

const router = Router();

const { profile, findAllUsers, updateProfile } = UsersControllers;
const { permissions } = AuthenticationMiddleware

router.get("/profile", profile)
router.get("/", permissions(["users:read"]), findAllUsers)
router.patch("/profile", updateProfile)


export default router;

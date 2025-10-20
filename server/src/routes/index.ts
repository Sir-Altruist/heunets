import { Router } from "express";
import AuthRoutes from "./auth";
import UsersRoutes from "./users";
import TicketsRoutes from "./tickets";
import { AuthenticationMiddleware } from "../middlewares";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/users", AuthenticationMiddleware.authenticate, UsersRoutes);
router.use("/tickets", AuthenticationMiddleware.authenticate, TicketsRoutes);
// router.use("/shipment", AuthenticationMiddleware, ShipmentRoutes);
// router.use("/notifications", AuthenticationMiddleware, Notifications);
// router.use("/wallets", AuthenticationMiddleware, WalletRoutes);
// router.use("/files", FileRoutes);
// router.use("/locations", LocationRoutes);
// router.use("/healthcheck", HealthCheck);

export default router;

import { Router } from "express";
import { TicketsControllers } from "../controllers";
import { ValidationsMiddleware, AuthenticationMiddleware } from "../middlewares";

const router = Router();

const { createTicket, findTicket, findAllTickets, updateTicket, deleteTicket } = TicketsControllers;
const { inspectTicket, inspectTicketQuery } = ValidationsMiddleware
const { permissions } = AuthenticationMiddleware

router.post("/", permissions(["tickets:create"]), inspectTicket, createTicket)
router.get("/", inspectTicketQuery, findAllTickets)
router.get("/:id", findTicket)
router.patch("/:id", permissions(["tickets:update"]), updateTicket)
router.delete("/:id", permissions(["tickets:delete"]), deleteTicket)


export default router;

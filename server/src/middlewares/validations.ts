import { Request, Response, NextFunction } from "express"
import { Tools } from "../utils"
import { AuthSchema, TicketSchema } from "../validations"
import { ResponseType, StatusCodes, TicketPayload, UserPayload } from "../interfaces"

const { apiResponse } = Tools

class ValidationMiddleware {
    async inspectOnboarding(req: Request, res: Response, next: NextFunction){
        const authValidations = new AuthSchema()
        try {
            await authValidations.onboarding(req.body as UserPayload);
            next()
        } catch (error) {
            return apiResponse(
            res,
            ResponseType.FAILURE,
            StatusCodes.BAD_REQUEST,
            error as string
            );
        }
    }
    
    async inspectLogin(req: Request, res: Response, next: NextFunction){
        const authValidations = new AuthSchema()
        try {
            await authValidations.login(req.body as UserPayload);
            next()
        } catch (error) {
            return apiResponse(
            res,
            ResponseType.FAILURE,
            StatusCodes.BAD_REQUEST,
            error as string
            );
        }
    }

    async inspectTicket(req: Request, res: Response, next: NextFunction){
        const ticketValidations = new TicketSchema()
        try {
            await ticketValidations.ticket(req.body as TicketPayload);
            next()
        } catch (error) {
            return apiResponse(
            res,
            ResponseType.FAILURE,
            StatusCodes.BAD_REQUEST,
            error as string
            );
        }
    }

    async inspectTicketQuery(req: Request, res: Response, next: NextFunction){
        const ticketValidations = new TicketSchema()
        try {
            await ticketValidations.ticketQuery(req.query as any);
            next()
        } catch (error) {
            return apiResponse(
            res,
            ResponseType.FAILURE,
            StatusCodes.BAD_REQUEST,
            error as string
            );
        }
    }
}

export default new ValidationMiddleware()
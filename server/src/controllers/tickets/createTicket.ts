import { Request, Response } from "express";
import { TicketServices } from "../../services";
import { Logger } from "../../libs";
import { Tools } from "../../utils";
import { ResponseType, StatusCodes } from "../../interfaces";

const { apiResponse } = Tools
const createTicket = async (req: Request, res: Response): Promise<Response> => {
    const ticketServices = new TicketServices()
    try {
        return await ticketServices.create(req.body, res) as any;
    } catch (error: any) {
        Logger.error(`Error creating ticket: ${error?.message}`)
        return apiResponse(res, ResponseType.FAILURE, StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong. Please try again")
    }
};

export default createTicket;

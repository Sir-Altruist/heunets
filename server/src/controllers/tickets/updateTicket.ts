import { Request, Response } from "express";
import { TicketServices } from "../../services";
import { Logger } from "../../libs";
import { Tools } from "../../utils";
import { ResponseType, StatusCodes } from "../../interfaces";

const { apiResponse } = Tools
const updateTicket = async (req: Request, res: Response): Promise<Response> => {
    const ticketServices = new TicketServices()
    try {
        const { id } = req.params
        return await ticketServices.updateTicket(id, req.body, res) as any;
    } catch (error: any) {
        Logger.error(`Error updating ticket: ${error?.message}`)
        return apiResponse(res, ResponseType.FAILURE, StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong. Please try again")
    }
};

export default updateTicket;

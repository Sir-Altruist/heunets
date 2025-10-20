import { Request, Response } from "express";
import { TicketServices } from "../../services";
import { Logger } from "../../libs";
import { Tools } from "../../utils";
import { ResponseType, StatusCodes } from "../../interfaces";
import { Op } from "sequelize";

const { apiResponse } = Tools
const fetchAllTickets = async (req: Request, res: Response): Promise<Response> => {
    const ticketServices = new TicketServices()
    try {
        const { status, assignedTo, addedBy, startDate, endDate } = req.query
        const attributes = {
            exclude: ["updatedAt", "password"]
        };
        const start = new Date(`${startDate} 00:00:00`);
        const end = new Date(`${endDate} 23:59:59`);
        const query = {
            attributes,
            where: status && assignedTo ? {
                status,
                assignedTo,
                createdAt: {
                    [Op.between]: [start, end]
                }
            } : status && addedBy ? {
                status,
                addedBy,
                createdAt: {
                    [Op.between]: [start, end]
                }
            } : status ? {
                status,
                createdAt: {
                    [Op.between]: [start, end]
                }
            } : assignedTo ? {
                assignedTo,
                createdAt: {
                    [Op.between]: [start, end]
                }
            } : addedBy ? {
                addedBy,
                createdAt: {
                    [Op.between]: [start, end]
                }
            } : {
                createdAt: {
                    [Op.between]: [start, end]
                }
            }
        }
        return await ticketServices.findAllTickets(query, res) as any;
    } catch (error: any) {
        Logger.error(`Error fetching tickets: ${error?.message}`)
        return apiResponse(res, ResponseType.FAILURE, StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong. Please try again")
    }
};

export default fetchAllTickets;

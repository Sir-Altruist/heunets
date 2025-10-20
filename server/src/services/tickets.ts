import { ResponseType, StatusCodes, TicketPayload } from "../interfaces";
import { TicketsRepo } from "../repositories";
import { Response } from "express";
import { Tools } from "../utils";

const { apiResponse } = Tools
class TicketServices {
    private ticketsRepo: TicketsRepo

    constructor(){
        this.ticketsRepo = new TicketsRepo()
    }

    async create(payload: TicketPayload, res: Response){
        const ticket = await this.ticketsRepo.create({...payload, addedBy: res.locals.user.username })
        return apiResponse(res, ResponseType.SUCCESS, StatusCodes.OK, "Ticket created successfully", ticket)
    }

    async findTicket(id: string, res: Response){
        const ticket = await this.ticketsRepo.findOne(id)
        if(!ticket) return apiResponse(res, ResponseType.FAILURE, StatusCodes.NOT_FOUND, "Ticket not found")
        return apiResponse(res, ResponseType.SUCCESS, StatusCodes.OK, "Successfully fetched ticket info", ticket)
    }

    async findAllTickets(query: object, res: Response){
        const tickets: any = await this.ticketsRepo.findAll(query)
        return apiResponse(res, ResponseType.SUCCESS, StatusCodes.OK, "Successfully fetched all tickets", tickets)
    }

    async updateTicket(id: string, payload: Partial<TicketPayload>, res: Response){
        const { status, assignedTo } = payload;

        const ticket: any = await this.ticketsRepo.findOne(id)
        if(!ticket) return apiResponse(res, ResponseType.FAILURE, StatusCodes.NOT_FOUND, "Ticket not found")
        if(ticket.status === "unassigned" && ["resolved", "closed"].includes(status as string)) return apiResponse(res, ResponseType.FAILURE, StatusCodes.BAD_REQUEST, "Ticket is yet to be assigned")
        
        if(status === "in-progress"){
            await this.ticketsRepo.update(id, {...payload, dateAssigned: new Date().toISOString() })
            return apiResponse(res, ResponseType.SUCCESS, StatusCodes.OK, `Succesfully assigned ticket (${ticket.id}) to ${assignedTo}`)
        }

        if(status === "resolved"){
            await this.ticketsRepo.update(id, {...payload, dateResolved: new Date().toISOString() })
            return apiResponse(res, ResponseType.SUCCESS, StatusCodes.OK, `Succesfully marked ticket (${ticket.id}) as resolved`)
        }

        if(status === "closed"){
            await this.ticketsRepo.update(id, {...payload, dateClosed: new Date().toISOString() })
            return apiResponse(res, ResponseType.SUCCESS, StatusCodes.OK, `Succesfully closed ticket (${ticket.id})`)
        }

        /** General update */
        await this.ticketsRepo.update(id,payload)
        return apiResponse(res, ResponseType.SUCCESS, StatusCodes.OK, "Successfully updated ticket info") 
    }

    async deleteTicket(id: string, res: Response){
        const ticket: any = await this.ticketsRepo.findOne(id)
        if(!ticket) return apiResponse(res, ResponseType.FAILURE, StatusCodes.NOT_FOUND, "Ticket not found")
        await this.ticketsRepo.remove(id)
        return apiResponse(res, ResponseType.SUCCESS, StatusCodes.OK, `Successfully deleted ticket (${id})`)
    }
}

export default TicketServices;
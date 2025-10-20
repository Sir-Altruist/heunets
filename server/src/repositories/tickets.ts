import { TicketPayload, UserPayload } from "../interfaces";
import { Tickets } from "../models";

class TicketsRepo {
    async create(payload: TicketPayload): Promise<object> {
        return await Tickets.create(payload)
    }

    async findAll(query: any): Promise<{ rows: object[]; count: number }> {
        return await Tickets.findAndCountAll(query)
    }

    async findOne(id: string): Promise<object | null> {
        return await Tickets.findByPk(id);
    }

    async update(id: string, payload: Partial<TicketPayload>): Promise<object> {
        return await Tickets.update(payload, {
            where: { id }
        })
    }

    async remove(id: string): Promise<number> {
        return await Tickets.destroy({
            where: { id }
        })
    }
}

export default TicketsRepo;
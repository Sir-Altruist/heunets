import Joi from "joi";
import { TicketPayload, TicketQuery } from "../interfaces";
import joiDate from '@joi/date'
const joi = Joi.extend(joiDate);

class Schema {

    ticket(payload: TicketPayload) {
        const schema = Joi.object({
            title: Joi.string().label("invalid or missing title").required(),
            description: Joi.string().label("invalid or missing description").required(),
        })
        
        const { error } = schema.validate(payload) as any;
        if (error) throw error.details[0].context.label;
    }

    ticketQuery(payload: TicketQuery) {
        const schema = Joi.object({
            startDate: joi.date().format('YYYY-MM-DD').required().label('invalid or missing start date. Format should be YYYY-MM-DD'),
            endDate: joi.date().format('YYYY-MM-DD').required().label('invalid or missing end date. Format should be YYYY-MM-DD'),
            status: Joi.string().valid("unassigned", "in-progress", "resolved", "closed").label("invalid status. Only accepts 'unassigned', 'in-progress', 'resolved', 'closed'").optional().allow(""),
            assignedTo: Joi.string().label("invalid assignedTo").optional(),
            addedBy: Joi.string().label("invalid addedBy").optional(),
        })
        
        const { error } = schema.validate(payload) as any;
        if (error) throw error.details[0].context.label;
    }
}

export default Schema;

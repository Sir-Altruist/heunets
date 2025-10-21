import Joi from "joi";
import { UserPayload } from "../interfaces";

class Schema {
    static passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,16}$/;

    onboarding(payload: UserPayload) {
        const schema = Joi.object({
            firstName: Joi.string().label("invalid or missing first name").required(),
            lastName: Joi.string().label("invalid or missing last name").required(),
            email: Joi.string().email().label("invalid or missing email").required(),
            permissions: Joi.array().items(Joi.string().valid("users:read", "users:create", "tickets:create", "tickets:update").required().label("invalid permission")).label("invalid or missing permissions array").required(),
            password: Joi.string().min(8).max(16).pattern(Schema.passwordRegex).label("A valid password is required with minimum length of 8 characters, at least one uppercase, one lowercase, an integer and a special character").required()
        })
        
        const { error } = schema.validate(payload) as any;
        if (error) throw error.details[0].context.label;
    }

    login(payload: Partial<UserPayload>) {
        const schema: Joi.ObjectSchema = Joi.object({
            email: Joi.string().email().label("Invalid or missing email").required(),
            password: Joi.string().min(8).max(16).label("Invalid or missing password").pattern(Schema.passwordRegex).required()
        });

        const { error } = schema.validate(payload) as any;
        if (error) throw error.details[0].context.label;
    }
}

export default Schema;

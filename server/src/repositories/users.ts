import { Op } from "sequelize";
import { UserPayload } from "../interfaces";
import { Users } from "../models";

class UsersRepo {
    async create(payload: UserPayload): Promise<object> {
        return await Users.create(payload)
    }

    async findAll(query: any): Promise<object[]> {
        return await Users.findAll(query)
    }

    async findOne(id: string): Promise<object | null>{
        return await Users.findByPk(id)
    }

    async findByParameter(email: string): Promise<object | null> {
        return await Users.scope("withPassword").findOne({
            where: { email }
        })
    }

    async update(id: string, payload: Partial<UserPayload>): Promise<object> {
        return await Users.update(payload, {
            where: { id }
        })
    }
}

export default UsersRepo;
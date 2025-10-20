import { ResponseType, StatusCodes, UserPayload, allowedPermissions } from "../interfaces";
import { UsersRepo } from "../repositories";
import { Response } from "express";
import { Tools } from "../utils";

const { apiResponse, comparePassword } = Tools
class UserServices {
    private usersRepo: UsersRepo

    constructor(){
        this.usersRepo = new UsersRepo()
    }

    async profile(res: Response){
        const user = await this.usersRepo.findOne(res.locals.user.id)
        if(!user) return apiResponse(res, ResponseType.FAILURE, StatusCodes.NOT_FOUND, "User not found")
        return apiResponse(res, ResponseType.SUCCESS, StatusCodes.OK, "Successfully fetched profile", user)
    }

    async fetchAllUsers(query: object, res: Response){
        const users: any = await this.usersRepo.findAll(query)
        return apiResponse(res, ResponseType.SUCCESS, StatusCodes.OK, "Successfully fetched all users", users)
    }

    async updateUser(payload: Partial<UserPayload>, res: Response){
        const { permissions } = payload;
        if(permissions){
            for(const permission of permissions){
                if(!allowedPermissions.includes(permission)) return apiResponse(res, ResponseType.FAILURE, StatusCodes.BAD_REQUEST, `Invalid permission: ${permission}`) 
            }
        }
        const user: any = await this.usersRepo.findOne(res.locals.user.id)
        if(!user) return apiResponse(res, ResponseType.FAILURE, StatusCodes.NOT_FOUND, "User not found") 
        
        /** update user record */
        await this.usersRepo.update(res.locals.user.id, payload)

        return apiResponse(res, ResponseType.SUCCESS, StatusCodes.OK, "Successfully updated user info")
    }
}

export default UserServices;
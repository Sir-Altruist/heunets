import { Logger } from "../libs";
import { Response, Request, NextFunction } from "express";
import { Tools } from "../utils";
import { ResponseType, StatusCodes } from "../interfaces";
import { TokenExpiredError } from "jsonwebtoken";
import { UsersRepo } from "../repositories";

const { apiResponse } = Tools;
export async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = Tools.checkToken(req);
        if (!token) return apiResponse(res, ResponseType.FAILURE, StatusCodes.UNAUTHORIZED, "No token in header. Authorization denied", { badToken: true })
        res.locals.user = Tools.verifyToken(token);
        next();
    } catch (error: any) {
        Logger.error(`Token verification error: ${error.message}`);
        if(error instanceof TokenExpiredError) return apiResponse(res, ResponseType.FAILURE, StatusCodes.UNAUTHORIZED, "Invalid or expired token", { badToken: true })
        return apiResponse(res, ResponseType.FAILURE, StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong. Please try again")
    }
}

export function permissions(permissions: string[]){
    const userRepo = new UsersRepo()
    return async (_: Request, res: Response, next: NextFunction) => {
        try {
            const user: any = await userRepo.findOne(res.locals.user.id)
            if(!user) return apiResponse(res, ResponseType.FAILURE, StatusCodes.NOT_FOUND, "User not found")
            for(const permission of permissions){
                if(!user.permissions.includes(permission)) return apiResponse(res, ResponseType.FAILURE, StatusCodes.FORBIDDEN, "You do not have the right permission for this action")
            }
            next()
        } catch (error: any) {
            Logger.error(`Permission error: ${error.message}`);
            return apiResponse(res, ResponseType.FAILURE, StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong. Please try again")
        }
    }
}


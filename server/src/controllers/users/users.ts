import { Request, Response } from "express";
import { UserServices } from "../../services";
import { Logger } from "../../libs";
import { Tools } from "../../utils";
import { ResponseType, StatusCodes } from "../../interfaces";


const { apiResponse } = Tools;
const findAllUsers = async (req: Request, res: Response): Promise<Response> => {
    const userServices = new UserServices()
    try {
        const attributes = {
            exclude: ["updatedAt", "password"]
        };
        const query = {
            attributes,
            order: [["createdAt", "DESC"]],
        };

        const user: any = await userServices.fetchAllUsers(query, res);
        return user;
    } catch (error: any) {
        Logger.error(`Error retrieving all users: ${error.message}`)
        return apiResponse(res, ResponseType.FAILURE, StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong. Please try again")
    }
};

export default findAllUsers;

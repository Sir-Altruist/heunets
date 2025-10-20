import { Request, Response } from "express";
import { UserServices } from "../../services";
import { Logger } from "../../libs";
import { Tools } from "../../utils";
import { ResponseType, StatusCodes } from "../../interfaces";

const { apiResponse } = Tools
const updateInfo = async (req: Request, res: Response): Promise<Response> => {
    const userServices = new UserServices()
    try {
        return await userServices.updateUser(req.body, res) as any;
    } catch (error: any) {
        Logger.error(`Error updating user info: ${error?.message}`)
        return apiResponse(res, ResponseType.FAILURE, StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong. Please try again")
    }
};

export default updateInfo;

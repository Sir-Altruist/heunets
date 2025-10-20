import { Request, Response } from "express";
import { AuthServices } from "../../services";
import { Logger } from "../../libs";
import { Tools } from "../../utils";
import { ResponseType, StatusCodes } from "../../interfaces";

const { apiResponse } = Tools
const login = async (req: Request, res: Response): Promise<Response> => {
    const authServices = new AuthServices()
    try {
        return await authServices.login(req.body, res) as any;
    } catch (error: any) {
        Logger.error(`Login error: ${error?.message}`)
        return apiResponse(res, ResponseType.FAILURE, StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong. Please try again")
    }
};

export default login;

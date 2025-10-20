import { ResponseType, StatusCodes, UserPayload } from "../interfaces";
import { UsersRepo } from "../repositories";
import { Response } from "express";
import { Tools } from "../utils";

const { apiResponse, comparePassword, generateToken, generateUsername } = Tools
class AuthServices {
    private usersRepo: UsersRepo

    constructor(){
        this.usersRepo = new UsersRepo()
    }

    async onboard(payload: UserPayload, res: Response){
        const { email, firstName, lastName, permissions, password } = payload;

        /** Check if user already exist */
        const user = await this.usersRepo.findByParameter(email)
        if(user) return apiResponse(res, ResponseType.FAILURE, StatusCodes.CONFLICT, "User already exist")
        
        /** Onboard user */
        const username = await generateUsername(firstName, lastName)
        const newUser: any = await this.usersRepo.create({
            firstName,
            lastName,
            email,
            username,
            permissions,
            password
        })

        /** Remove password from response */
        const stringifiedUser = newUser.toJSON();
        delete stringifiedUser.password;

        return apiResponse(res, ResponseType.SUCCESS, StatusCodes.CREATED, "Successfully onboarded user", stringifiedUser)
    }

    async login(payload: UserPayload, res: Response){
        const { email, password } = payload
        const user: any = await this.usersRepo.findByParameter(email as string)
        if(!user) return apiResponse(res, ResponseType.FAILURE, StatusCodes.BAD_REQUEST, "Invalid credentials")
        
        /** compare password */
        const passwordMatch = await comparePassword(password as string, user.password)
        if(!passwordMatch) return apiResponse(res, ResponseType.FAILURE, StatusCodes.BAD_REQUEST, "Invalid credentials")

        const token = generateToken({ id: user?.id, username: user?.username }, "1hr");

        /** Remove password from response */
        const stringifiedUser = user.toJSON();
        delete stringifiedUser.password;

        return apiResponse(res, ResponseType.SUCCESS, StatusCodes.OK, "Login successful", { token, user: stringifiedUser })
    }
}

export default AuthServices;
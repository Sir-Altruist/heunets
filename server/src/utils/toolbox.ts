import { Response } from "express";
import bcrypt from "bcryptjs"
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { UsersRepo } from "../repositories";
import { Op } from "sequelize";

const { SECRET_KEY } = process.env;
export function apiResponse(
    res: Response, 
    responseType: "success" | "failure", 
    statusCode: number,
    responseMessage: string,
    data: string | object = {}
){
    return res.status(statusCode).json({ 
        status: responseType,
        message: responseMessage,
        details: data 
    })
}

export async function comparePassword(
    plainPassword: string,
    hashedPassword: string
) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

export function generateToken(payload: any, time: any) {
    return jwt.sign(payload, SECRET_KEY as string, { expiresIn: time });
}

export function checkToken(req: JwtPayload) {
    if (
        req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
}

export function verifyToken(token: string) {
    return jwt.verify(token, SECRET_KEY as string);
}

export async function generateUsername(firstName: string, lastName: string): Promise<string>{
    let username = `${firstName.charAt(0)}.${lastName}`.toLowerCase();
    const query = {
        order: [["createdAt", "DESC"]],
        where: { username: { [Op.like]: `%${username}%` }}
    }
    const usersRepo = new UsersRepo()
    const users: any = await usersRepo.findAll(query)
    if(users.length){
        const mostRecentlyAddedUser = users[0]
        const usernameArray = mostRecentlyAddedUser?.username?.split('.')
        if(usernameArray.length > 2){
            username = `${username}.${(parseInt(usernameArray[2], 10) + 1).toString().padStart(2, "0")}`
        } else {
            username = `${username}.01`
        }
        return username;
    } else {
        return username
    }
}
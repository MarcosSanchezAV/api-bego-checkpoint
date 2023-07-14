import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/users.service";
import httpHandler from "../utils/error.handler";

const register = async ({ body }: Request, res: Response) => {
    try {
        const responseService = await registerUser(body)
        res.send(responseService)
    } catch(e) {
        httpHandler(res, e)
    }
}

const login = async (req: Request, res: Response) => {}

export { register, login }
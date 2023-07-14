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

const login = async ({ body }: Request, res: Response) => {
    const { email, password } = body
    const responseService = await loginUser({ email, password })
    if (responseService === "INCORRECT_PASSWORD") {
        res.status(403)
        res.send(responseService)
    } else {
        res.send(responseService)
    }
}

export { register, login }
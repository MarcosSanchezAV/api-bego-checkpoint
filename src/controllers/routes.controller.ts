import { Request, Response } from "express";
import { createRoute } from "../services/routes.services";

const addRoute = async ({ body }: Request, res: Response) => {
    try {
        const responseService = await createRoute(body)
        res.send(responseService)
    } catch(e) {
        res.send(e)
    }
}

export { addRoute }
import { Request, Response } from "express";
import { createRoute, findRoute, findRoutes } from "../services/routes.services";
import httpHandler from "../utils/error.handler";

const addRoute = async ({ body }: Request, res: Response) => {
    try {
        const responseService = await createRoute(body)
        res.send(responseService)
    } catch(e) {
        httpHandler(res, e)
    }
}

const getRoutes = async (req: Request, res: Response) => {
    try {
        const response = await findRoutes()
        res.send(response)
    } catch(e) {
        httpHandler(res, e)
    }
}

const getRoute = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params
        const response = await findRoute(id)
        res.send(response)
    } catch(e) {
        httpHandler(res, e)
    }
}

export { addRoute, getRoute, getRoutes }
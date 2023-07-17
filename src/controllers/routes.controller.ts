import { Request, Response } from "express";
import { addRoute, deleteRoute, findRoute, findRoutes, updateRoute } from "../services/routes.services";
import httpHandler from "../utils/error.handler";

const createRoute = async ({ body }: Request, res: Response) => {
    try {
        const responseService = await addRoute(body)
        res.send(responseService)
    } catch (e) {
        httpHandler(res, e)
    }
}

const getRoutes = async (req: Request, res: Response) => {
    try {
        const response = await findRoutes()
        res.send(response)
    } catch (e) {
        httpHandler(res, e)
    }
}

const getRoute = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params
        const response = await findRoute(id)
        res.send(response)
    } catch (e) {
        httpHandler(res, e)
    }
}

const changeRoute = async ({ params, body }: Request, res: Response) => {
    try {
        const { id } = params
        const response = await updateRoute(id, body)
        res.send(response)
    } catch (e) {
        httpHandler(res, e)
    }
}

const removeRoute = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params
        const response = await deleteRoute(id)
        res.send(response)
    } catch (e) {
        httpHandler(res, e)
    }
}

export { createRoute, getRoute, getRoutes, changeRoute, removeRoute }
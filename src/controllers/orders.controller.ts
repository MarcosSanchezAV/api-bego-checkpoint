import { Request, Response } from "express";
import httpHandler from "../utils/error.handler";
import { createOrder, findOrder, findOrders } from "../services/orders.service";

const addOrder = async ({ body }: Request, res: Response) => {
    try {
        const responseService = await createOrder(body)
        res.send(responseService)
    } catch (e) {
        httpHandler(res, e)
    }
}

const getOrders = async (req: Request, res: Response) => {
    try {
        const responseService = await findOrders()
        res.send(responseService)
    } catch (e) {
        httpHandler(res, e)
    }
}

const getOrder = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params
        const responseService = await findOrder(id)
        res.send(responseService)
    } catch (e) {
        httpHandler(res, e)
    }
}

export { addOrder, getOrders, getOrder }
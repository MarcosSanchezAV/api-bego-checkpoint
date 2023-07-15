import { Request, Response } from "express";
import httpHandler from "../utils/error.handler";
import { createOrder, findOrder, findOrders, updateOrderStatus } from "../services/orders.service";
import { Order } from "../interfaces/order.interface";

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

const changeOrderStatus = async ({ params }: Request, res: Response) => {
    try {
        const { id, status } = params
        const responseService = await updateOrderStatus(id, status)
        res.send(responseService)
    } catch (e) {
        httpHandler(res, e)
    }
}

export { addOrder, getOrders, getOrder, changeOrderStatus }
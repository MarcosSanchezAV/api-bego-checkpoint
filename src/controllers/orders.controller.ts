import { Request, Response } from "express";
import httpHandler from "../utils/error.handler";
import { createOrder } from "../services/orders.service";

const addOrder = async ({ body }: Request, res: Response) => {
    try {
        const responseService = await createOrder(body)
        res.send(responseService)
    } catch(e) {
        httpHandler(res, e)
    }
}

export { addOrder }
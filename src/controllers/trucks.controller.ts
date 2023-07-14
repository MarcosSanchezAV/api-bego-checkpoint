import { Request, Response } from "express";
import httpHandler from "../utils/error.handler";
import { findTruck, findTrucks } from "../services/trucks.service";

const getTrucks = async (req: Request, res: Response) => {
    try {
        const response = await findTrucks()
        res.send(response)
    } catch(e) {
        httpHandler(res, e)
    }
}

const getTruck = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params
        const response = await findTruck(id)
        res.send(response)
    } catch(e) {
        httpHandler(res, e)
    }
}

export { getTrucks, getTruck }
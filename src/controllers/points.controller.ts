import { Request, Response } from "express";
import { findPoint, findPoints } from "../services/points.service";
import httpHandler from "../utils/error.handler";

const getPoints = async (req: Request, res: Response) => {
    try {
        const response = await findPoints()
        res.send(response)
    } catch(e) {
        httpHandler(res, e)
    }
}

const getPoint = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params
        const response = await findPoint(id)
        res.send(response)
    } catch(e) {
        httpHandler(res, e)
    }
}

export { getPoints, getPoint }
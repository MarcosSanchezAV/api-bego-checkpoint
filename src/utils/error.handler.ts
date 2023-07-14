import { Response } from "express"

const httpHandler = (res: Response, error: any) => {
    res.status(500)
    res.send({error})
}

export default httpHandler
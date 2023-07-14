import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handler";

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || ''
        const jwt = jwtByUser.split(' ').pop()
        const user = verifyToken(`${jwt}`)
        if (!user) {
            res.status(401)
            res.send("INVALID_TOKEN")
        } else {
            next()
        }
    } catch(e) {
        res.status(400)
        res.send(e)
    }
}

export { checkJwt }
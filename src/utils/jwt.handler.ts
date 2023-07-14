import "dotenv/config"
import { sign, verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || 'secreto1234'

const generateToken = (email: string) => {
    const jwt = sign({ email }, JWT_SECRET, {
        expiresIn: '5min'
    })
    return jwt
}

const verifyToken = (jwt: string) => {
    return verify(jwt, JWT_SECRET)
}

export { generateToken, verifyToken }
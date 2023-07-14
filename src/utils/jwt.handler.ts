import "dotenv/config"
import { sign, verify } from "jsonwebtoken"

const generateToken = (email: string) => {
    const JWT_SECRET = process.env.JWT_SECRET || 'secreto1234'
    const jwt = sign({ email }, JWT_SECRET, {
        expiresIn: '5min'
    })
    return jwt
}

export { generateToken }
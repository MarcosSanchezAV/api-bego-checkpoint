import { hash, compare } from "bcryptjs";

const encryptPassword = async (password: string) => {
    const passwordHash = await hash(password, 8)
    return passwordHash
}

const verifyPassword = async (password: string, passwordHash: string) => {
    const isCorrect = await compare(password, passwordHash)
    return isCorrect
} 

export { encryptPassword, verifyPassword }
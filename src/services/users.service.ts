import { Auth } from "../interfaces/auth.interface"
import { User } from "../interfaces/user.interface"
import UserModel from "../models/user.model"
import { encryptPassword, verifyPassword } from "../utils/bcrypt.handler"
import { generateToken } from "../utils/jwt.handler"

const registerUser = async ({ email, password, name }: User) => {
    const user = await findUser(email)
    if (user) return "USER_ALREADY_EXISTS"

    const passwordHash = await encryptPassword(password)
    const registerUser = await UserModel.create( {email, password: passwordHash, name })
    return registerUser
}
    
const loginUser = async ({ email, password }: Auth) => {
    const user = await findUser(email)
    if (!user) return "USER_NOT_FOUND"

    const passwordHash = user.password
    const isCorrect = await verifyPassword(password, passwordHash)
    if (!isCorrect) return "INCORRECT_PASSWORD"
    const token = generateToken(user.email)
    const data = {
        token,
        user
    }
    return data
}

const findUser = async(email: string) => {
    const user = await UserModel.findOne({ email })
    return user
}

export { registerUser, loginUser  }
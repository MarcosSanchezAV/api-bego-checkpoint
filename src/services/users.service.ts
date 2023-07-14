import { User } from "../interfaces/user.interface"
import UserModel from "../models/user.model"
import { encryptPassword } from "../utils/bcrypt.handle"

const registerUser = async ({ email, password, name }: User) => {
    const user = await findUser(email)
    if (user) return "USER_ALREADY_EXISTS"

    const passwordHash = await encryptPassword(password)
    const registerUser = await UserModel.create( {email, password: passwordHash, name })
    return registerUser
}
    
const loginUser = async () => {}

const findUser = async(email: string) => {
    const user = await UserModel.findOne({ email })
    return user
}

export { registerUser, loginUser  }
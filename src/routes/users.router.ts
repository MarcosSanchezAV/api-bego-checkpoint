import { Router } from "express";
import { login, register } from "../controllers/users.controller";

const router = Router()

router.post('/register', register)
router.post('/login', login)

export default router
import { Router } from "express";
import { addOrder } from "../controllers/orders.controller";

const router = Router()

router.post('', addOrder) // Agregar una orden

export default router
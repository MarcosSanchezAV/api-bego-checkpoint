import { Router } from "express";
import { addOrder, getOrder, getOrders } from "../controllers/orders.controller";

const router = Router()

router.post('', addOrder) // Agregar una orden
router.get('', getOrders) // Obtener todas las ordenes
router.get('/:id', getOrder) //Obtener una orden

export default router
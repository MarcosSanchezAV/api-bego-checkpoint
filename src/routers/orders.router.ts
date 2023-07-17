import { Router } from "express";
import { addOrder, changeOrder, changeOrderStatus, getOrder, getOrders } from "../controllers/orders.controller";
import { checkJwt } from "../middlewares/session.middleware";

const router = Router()

router.post('', checkJwt, addOrder) // Agregar una orden
router.get('', checkJwt, getOrders) // Obtener todas las ordenes
router.get('/:id', checkJwt, getOrder) //Obtener una orden
router.post('/:id/:status', checkJwt, changeOrderStatus) // Cambiar el estado de una orden 
router.post('/:id', checkJwt, changeOrder) // Cambiar la orden 

export default router
import { Router } from "express";
import { addOrder, changeOrder, changeOrderStatus, getOrder, getOrders } from "../controllers/orders.controller";

const router = Router()

router.post('', addOrder) // Agregar una orden
router.get('', getOrders) // Obtener todas las ordenes
router.get('/:id', getOrder) //Obtener una orden
router.post('/:id/:status', changeOrderStatus) // Cambiar el estado de una orden 
router.post('/:id', changeOrder) // Cambiar la orden 

export default router
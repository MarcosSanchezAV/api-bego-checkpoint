import { Router } from "express";
import { addRoute, changeRoute, getRoute, getRoutes, removeRoute } from "../controllers/routes.controller";

const router = Router()

router.post('', addRoute) // Agregar ruta
router.get('', getRoutes) //Listar todas las rutas
router.get('/:id', getRoute) //Listar una ruta
router.post('/:id', changeRoute) // Modificar una ruta
router.delete('/:id', removeRoute) // Eliminar una ruta

export default router
import { Router } from "express";
import { addRoute, getRoute, getRoutes } from "../controllers/routes.controller";

const router = Router()

router.post('', addRoute) // Agregar ruta
router.get('', getRoutes) //Listar todas las rutas
router.get('/:id', getRoute) //Listar una ruta

export default router
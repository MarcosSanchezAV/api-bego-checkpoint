import { Router } from "express";
import { createRoute, changeRoute, getRoute, getRoutes, removeRoute } from "../controllers/routes.controller";
import { checkJwt } from "../middlewares/session.middleware";

const router = Router()

router.post('', checkJwt, createRoute) // Agregar ruta
router.get('', checkJwt, getRoutes) //Listar todas las rutas
router.get('/:id', checkJwt, getRoute) //Listar una ruta
router.post('/:id', checkJwt, changeRoute) // Modificar una ruta
router.delete('/:id', checkJwt, removeRoute) // Eliminar una ruta

export default router
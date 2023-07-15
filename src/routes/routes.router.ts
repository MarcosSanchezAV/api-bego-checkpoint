import { Router } from "express";
import { addRoute } from "../controllers/routes.controller";

const router = Router()

router.post('', addRoute) // Agregar ruta

export default router
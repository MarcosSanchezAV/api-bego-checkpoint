import { Router } from "express";
import { getTruck, getTrucks } from "../controllers/trucks.controller";
import { checkJwt } from "../middlewares/session.middleware";

const router = Router()

router.get('', checkJwt, getTrucks)
router.get('/:id', checkJwt, getTruck)

export default router
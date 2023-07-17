import { Router } from "express";
import { getPoint, getPoints } from "../controllers/points.controller";
import { checkJwt } from "../middlewares/session.middleware";

const router = Router()

router.get('', checkJwt, getPoints)
router.get('/:id', checkJwt, getPoint)

export default router
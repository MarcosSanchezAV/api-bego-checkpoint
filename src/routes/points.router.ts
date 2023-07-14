import { Router } from "express";
import { getPoint, getPoints } from "../controllers/points.controller";

const router = Router()

router.get('', getPoints)
router.get('/:id', getPoint)

export default router
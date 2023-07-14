import { Router } from "express";
import { getPoint, getPoints } from "../controllers/points.controller";

const router = Router()

router.get('/points', getPoints)
router.get('/point/:id', getPoint)

export { router }
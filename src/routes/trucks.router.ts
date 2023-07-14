import { Router } from "express";
import { getTruck, getTrucks } from "../controllers/trucks.controller";

const router = Router()

router.get('', getTrucks)
router.get('/:id', getTruck)

export default router
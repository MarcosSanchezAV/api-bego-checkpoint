import { Router } from "express";
import { testGetCoordinates, testGetDistance } from "../controllers/googletest";

const router = Router()

router.get('/coordinates', testGetCoordinates)
router.get('/distance', testGetDistance)

export default router
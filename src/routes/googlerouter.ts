import { Router } from "express";
import { testGetCoordinates } from "../controllers/googletest";

const router = Router()

router.get('/google', testGetCoordinates)

export default router
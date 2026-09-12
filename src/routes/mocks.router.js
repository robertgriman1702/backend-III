import { Router } from "express";
import { getMockUsers, getMockStores, getMockOrders, generateMockData } from "../controllers/mocks.controller.js";

const router = Router();

router.get("/users", getMockUsers);
router.get("/stores", getMockStores);
router.get("/orders", getMockOrders);
router.post("/generate", generateMockData);

export default router;
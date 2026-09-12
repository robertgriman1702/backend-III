import { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  uploadOrderProof
} from "../controllers/orders.controller.js";
import { handleUpload, uploadOrderProof as uploadOrderProofMiddleware } from "../middlewares/multer.js";

const router = Router();

router.get("/", getOrders);

router.get("/:oid", getOrderById);

router.post("/", createOrder);

router.put("/:oid/status", updateOrderStatus);

router.delete("/:oid", deleteOrder);

router.post("/:oid/proof", handleUpload(uploadOrderProofMiddleware), uploadOrderProof);

export default router;
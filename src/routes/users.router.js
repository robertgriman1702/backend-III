import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  uploadUserDocument
} from "../controllers/users.controller.js";
import { handleUpload, uploadUserDocument as uploadUserDocumentMiddleware } from "../middlewares/multer.js";

const router = Router();

router.get("/", getUsers);

router.get("/:uid", getUserById);

router.post("/", createUser);

router.put("/:uid", updateUser);

router.delete("/:uid", deleteUser);

router.post("/:uid/documents", handleUpload(uploadUserDocumentMiddleware), uploadUserDocument);

export default router;
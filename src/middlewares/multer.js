import multer from "multer";
import path from "path";
import { FileRequiredError, InvalidFileTypeError } from "../utils/errors.js";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const storage = (destinationFolder) =>
  multer.diskStorage({
    destination: (req, file, cb) => cb(null, `uploads/${destinationFolder}`),
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  });

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new InvalidFileTypeError(`Tipo de archivo no permitido: ${file.mimetype}`));
  }
  cb(null, true);
};

const buildUploader = (destinationFolder) =>
  multer({
    storage: storage(destinationFolder),
    fileFilter,
    limits: { fileSize: MAX_FILE_SIZE }
  });

export const uploadUserDocument = buildUploader("documents").single("document");
export const uploadOrderProof = buildUploader("proofs").single("proof");

// wrapper para convertir errores de multer (y el "falta archivo") en nuestro formato consistente
export const handleUpload = (uploaderMiddleware, { required = true } = {}) => {
  return (req, res, next) => {
    uploaderMiddleware(req, res, (error) => {
      if (error) return next(error);
      if (required && !req.file) return next(new FileRequiredError());
      next();
    });
  };
};
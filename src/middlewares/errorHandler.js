import { AppError } from "../utils/errors.js";
import logger from "../config/logger.js";

export const errorHandler = (error, req, res, next) => {
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const message = statusCode === 500 ? "Error interno del servidor" : error.message;

  logger.error(`${req.method} ${req.originalUrl} - ${error.message}`, { stack: error.stack });

  res.status(statusCode).json({ status: "error", message });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({ status: "error", message: "Ruta no encontrada" });
};
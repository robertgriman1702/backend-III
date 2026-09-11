export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado") {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Datos inválidos") {
    super(message, 400);
  }
}

export class InvalidStatusError extends AppError {
  constructor(message = "Estado inválido") {
    super(message, 400);
  }
}

export class FileRequiredError extends AppError {
  constructor(message = "Se requiere un archivo") {
    super(message, 400);
  }
}

export class InvalidFileTypeError extends AppError {
  constructor(message = "Tipo de archivo inválido") {
    super(message, 400);
  }
}

export class InvalidMockCountError extends AppError {
  constructor(message = "Cantidad de mocks inválida") {
    super(message, 400);
  }
}
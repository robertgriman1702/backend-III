import { usersRepository } from "../repositories/users.repository.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";

export const usersService = {
  getUsers: async () => {
    return usersRepository.findAll();
  },

  getUserById: async (id) => {
    const user = await usersRepository.findById(id);
    if (!user) throw new NotFoundError("Usuario no encontrado");
    return user;
  },

  createUser: async (userData) => {
    const { firstName, lastName, email, password } = userData;
    if (!firstName || !lastName || !email || !password) {
      throw new BadRequestError("Faltan datos obligatorios");
    }

    //falta validar si role contiene un valor valido

    return usersRepository.create(userData);
  },

  updateUser: async (id, updates) => {
    const user = await usersRepository.update(id, updates);
    if (!user) throw new NotFoundError("Usuario no encontrado");
    return user;
  },

  deleteUser: async (id) => {
    const user = await usersRepository.delete(id);
    if (!user) throw new NotFoundError("Usuario no encontrado");
    return user;
  },

  addDocument: async (id, file) => {
    const document = {
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      uploadedAt: new Date()
    };

    const user = await usersRepository.addDocument(id, document);
    if (!user) throw new NotFoundError("Usuario no encontrado");
    return user;
  }
};
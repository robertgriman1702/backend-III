import UserModel from "../models/user.model.js";

export const usersRepository = {
  findAll: async () => {
    return UserModel.find();
  },

  findById: async (id) => {
    return UserModel.findById(id);
  },

  create: async (userData) => {
    return UserModel.create(userData);
  },

  update: async (id, updates) => {
    return UserModel.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
  },

  delete: async (id) => {
    return UserModel.findByIdAndDelete(id);
  },

  addDocument: async (id, document) => {
    return UserModel.findByIdAndUpdate(
      id,
      { $push: { documents: document } },
      { new: true, runValidators: true }
    );
  }
};
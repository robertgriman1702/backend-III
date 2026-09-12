import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import StoreModel from "../models/store.model.js";
import OrderModel from "../models/order.model.js";
import { generateMockUser, generateMockStore, generateMockOrder } from "../utils/mocks.generator.js";
import { InvalidMockCountError } from "../utils/errors.js";

const validateCount = (count) => {
  const parsed = Number(count);
  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 1000) {
    throw new InvalidMockCountError("La cantidad de mocks debe ser un entero entre 1 y 1000");
  }
  return parsed;
};

export const mocksService = {
  generateUsers: (count) => {
    const n = validateCount(count);
    return Array.from({ length: n }, generateMockUser);
  },

  generateStores: async (count) => {
    const n = validateCount(count);
    // usamos un owner ficticio consistente (no se persiste) solo para dar forma al mock
    return Array.from({ length: n }, () => generateMockStore(new mongoose.Types.ObjectId()));
  },

  generateOrders: async (count) => {
    const n = validateCount(count);
    return Array.from({ length: n }, () =>
      generateMockOrder(new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId())
    );
  },

  // inserta usuarios + tiendas + pedidos relacionados de verdad en la DB
  generateAndInsert: async (count) => {
    const n = validateCount(count);

    const users = await UserModel.insertMany(
      Array.from({ length: n }, generateMockUser)
    );

    const stores = await StoreModel.insertMany(
      users.map((user) => generateMockStore(user._id))
    );

    const orders = await OrderModel.insertMany(
      users.map((user, i) => generateMockOrder(user._id, stores[i]._id))
    );

    return { users, stores, orders };
  }
};
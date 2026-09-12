import { ordersRepository } from "../repositories/orders.repository.js";
import { NotFoundError, BadRequestError, InvalidStatusError } from "../utils/errors.js";

const VALID_ORDER_STATUSES = ["created", "assigned", "picked_up", "in_transit", "delivered", "cancelled"];

export const ordersService = {
  getOrders: async () => {
    return ordersRepository.findAll();
  },

  getOrderById: async (id) => {
    const order = await ordersRepository.findById(id);
    if (!order) throw new NotFoundError("Pedido no encontrado");
    return order;
  },

  createOrder: async (orderData) => {
    const { customer, store, items, deliveryAddress } = orderData;

    if (!customer || !store || !items || !deliveryAddress) {
      throw new BadRequestError("Faltan datos obligatorios");
    }

    const userFound = await ordersRepository.findCustomerById(customer);
    if (!userFound) throw new NotFoundError("Usuario no encontrado");

    const storeFound = await ordersRepository.findStoreById(store);
    if (!storeFound) throw new NotFoundError("Tienda no encontrada");

    const total = items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

    const newOrder = {
      ...orderData,
      total,
      status: "created",
      priority: orderData.priority ?? "normal"
    };

    return ordersRepository.create(newOrder);
  },

  updateOrderStatus: async (id, status) => {
    if (!VALID_ORDER_STATUSES.includes(status)) {
      throw new InvalidStatusError(`Estado inválido. Valores permitidos: ${VALID_ORDER_STATUSES.join(", ")}`);
    }

    const order = await ordersRepository.updateStatus(id, status);
    if (!order) throw new NotFoundError("Pedido no encontrado");
    return order;
  },

  deleteOrder: async (id) => {
    const order = await ordersRepository.delete(id);
    if (!order) throw new NotFoundError("Pedido no encontrado");
    return order;
  },

  addProof: async (id, file) => {
    const proof = {
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      uploadedAt: new Date()
    };

    const order = await ordersRepository.updateProof(id, proof);
    if (!order) throw new NotFoundError("Pedido no encontrado");
    return order;
  }
};
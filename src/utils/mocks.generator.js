import { faker } from "@faker-js/faker";

const USER_ROLES = ["admin", "customer", "store"];
const ORDER_STATUSES = ["created", "assigned", "picked_up", "in_transit", "delivered", "cancelled"];
const ORDER_PRIORITIES = ["low", "normal", "high"];

export const generateMockUser = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password({ length: 10 }),
  role: faker.helpers.arrayElement(USER_ROLES),
  documents: []
});

export const generateMockStore = (ownerId) => ({
  name: faker.company.name(),
  address: faker.location.streetAddress(),
  owner: ownerId,
  isActive: faker.datatype.boolean()
});

const generateMockOrderItem = () => ({
  name: faker.commerce.productName(),
  quantity: faker.number.int({ min: 1, max: 5 }),
  price: Number(faker.commerce.price({ min: 100, max: 5000 }))
});

export const generateMockOrder = (customerId, storeId) => {
  const items = Array.from(
    { length: faker.number.int({ min: 1, max: 4 }) },
    generateMockOrderItem
  );
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return {
    customer: customerId,
    store: storeId,
    items,
    deliveryAddress: faker.location.streetAddress(),
    total,
    status: faker.helpers.arrayElement(ORDER_STATUSES),
    priority: faker.helpers.arrayElement(ORDER_PRIORITIES),
    proof: null
  };
};
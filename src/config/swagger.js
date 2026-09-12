import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ShipNow API",
      version: "1.0.0",
      description: "API backend de logística/envíos — usuarios, comercios y pedidos"
    },
    servers: [
      { url: "/api", description: "Servidor actual" }
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string" },
            role: { type: "string", enum: ["admin", "customer", "store"] },
            documents: {
              type: "array",
              items: { type: "object" }
            }
          }
        },
        Store: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            address: { type: "string" },
            owner: { type: "string" },
            isActive: { type: "boolean" }
          }
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string" },
            customer: { type: "string" },
            store: { type: "string" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  quantity: { type: "number" },
                  price: { type: "number" }
                }
              }
            },
            deliveryAddress: { type: "string" },
            total: { type: "number" },
            status: {
              type: "string",
              enum: ["created", "assigned", "picked_up", "in_transit", "delivered", "cancelled"]
            },
            priority: { type: "string", enum: ["low", "normal", "high"] }
          }
        },
        SuccessResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "success" },
            payload: { type: "object" }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "error" },
            message: { type: "string", example: "Recurso no encontrado" }
          }
        }
      },
      responses: {
        NotFound: {
          description: "Recurso no encontrado",
          content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
        },
        BadRequest: {
          description: "Datos inválidos",
          content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
        }
      }
    }
  },
  apis: ["./src/routes/*.router.js"]
};

export const swaggerSpec = swaggerJSDoc(options);
import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.router.js";
import storesRouter from "./routes/stores.router.js";
import ordersRouter from "./routes/orders.router.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import mocksRouter from "./routes/mocks.router.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "success", message: "ShipNow API" });
});

app.get("/health", (req, res) => {
  res.json({ status: "success", message: "API funcionando" });
});

app.use("/api/users", usersRouter);
app.use("/api/stores", storesRouter);
app.use("/api/orders", ordersRouter);

app.use(notFoundHandler);
app.use(errorHandler); 
app.use(express.json());
app.use(requestLogger);
app.use("/api/mocks", mocksRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
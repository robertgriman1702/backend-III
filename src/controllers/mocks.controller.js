import { mocksService } from "../services/mocks.service.js";

export const getMockUsers = async (req, res, next) => {
  try {
    const payload = mocksService.generateUsers(req.query.count ?? 10);
    res.json({ status: "success", payload });
  } catch (error) {
    next(error);
  }
};

export const getMockStores = async (req, res, next) => {
  try {
    const payload = await mocksService.generateStores(req.query.count ?? 10);
    res.json({ status: "success", payload });
  } catch (error) {
    next(error);
  }
};

export const getMockOrders = async (req, res, next) => {
  try {
    const payload = await mocksService.generateOrders(req.query.count ?? 10);
    res.json({ status: "success", payload });
  } catch (error) {
    next(error);
  }
};

export const generateMockData = async (req, res, next) => {
  try {
    const payload = await mocksService.generateAndInsert(req.body.count ?? 10);
    res.status(201).json({ status: "success", payload });
  } catch (error) {
    next(error);
  }
};
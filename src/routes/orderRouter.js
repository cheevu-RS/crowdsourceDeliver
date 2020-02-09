const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");

orderRouter.post("/createOrder", orderController.createOrder);

orderRouter.post("/updateStatus", orderController.updateStatus);

orderRouter.post("/broadcastOrder", orderController.broadCastOrder);

orderRouter.post("/getAllOrders", orderController.getAllOrders)

orderRouter.post("/getLastOrder", orderController.getLastOrder)
module.exports = {
    orderRouter : orderRouter
}
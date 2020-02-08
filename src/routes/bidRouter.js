const express = require("express");
const bidRouter = express.Router();
const bidController = require("../controllers/bidController");

bidRouter.post("/createBid", bidController.createBid);

bidRouter.post("/deleteBids", bidController.deleteBids);

bidRouter.post("/deleteBid", bidController.deleteBid);

bidRouter.post("/getBids", bidController.getSortedBids);

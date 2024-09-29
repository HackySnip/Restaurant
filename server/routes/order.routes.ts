import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  createCheckoutSession,
  getOrders,
} from "../controller/order.controller";

const router = express.Router();

router.route("/").get(isAuthenticated, getOrders);
router
  .route("checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);
// router.route("/webhook")

export default router;

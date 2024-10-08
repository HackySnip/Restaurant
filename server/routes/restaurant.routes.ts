import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  createRestaurant,
  getRestaurant,
  getRestaurantOrders,
  getSingleRestaurant,
  searchRestaurant,
  updateOrderStatus,
  updateRestaurant,
} from "../controller/restaurant.controller";
import upload from "../middlewares/multer";

const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, upload.single("image"), createRestaurant);

router.route("/").get(isAuthenticated, getRestaurant);
router
  .route("/")
  .put(isAuthenticated, upload.single("image"), updateRestaurant);
router
  .route("/order/:orderId/status")
  .put(isAuthenticated, upload.single("image"), updateOrderStatus);
router.route("/order").get(isAuthenticated, getRestaurantOrders);
router.route("/search/:searchText").get(isAuthenticated, searchRestaurant);
router.route("/:id").get(isAuthenticated, getSingleRestaurant);

export default router;

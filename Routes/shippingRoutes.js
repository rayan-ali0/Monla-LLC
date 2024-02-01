import express from "express";
import { shippingController } from "../Controllers/ShippingController.js";
import { verifyToken } from "../Middlewares/authentication.js";
import { checkRole } from "../Middlewares/authentication.js";

const shippingRoutes = express.Router();

shippingRoutes.post("/create", verifyToken, checkRole(["admin"]), shippingController.createShipping);
shippingRoutes.get("/all", shippingController.getAllShippings);
shippingRoutes.get("/:id", shippingController.getShippingById);
shippingRoutes.put("/:id",  shippingController.updateShipping);
shippingRoutes.delete("/:id", verifyToken, checkRole(["admin"]), shippingController.deleteShipping);

export default shippingRoutes;

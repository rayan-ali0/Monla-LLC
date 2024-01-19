import express from "express";
import { shippingController } from "../Controllers/ShippingController.js";

const shippingRoutes = express.Router();

shippingRoutes.post("/create", shippingController.createShipping);
shippingRoutes.get("/all", shippingController.getAllShippings);
shippingRoutes.get("/:id", shippingController.getShippingById);
shippingRoutes.put("/:id", shippingController.updateShipping);
shippingRoutes.delete("/:id", shippingController.deleteShipping);

export default shippingRoutes;

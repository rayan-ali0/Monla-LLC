import  express  from "express";
import { brandController } from "../Controllers/BrandController.js";

const brandRouter=express.Router()

brandRouter.post("/addBrand", brandController.createBrand)
brandRouter.get("/readBrand", brandController.getBrand)
brandRouter.get("/readBrandById:id", brandController.getBrandById)
brandRouter.put("/updateBrand:id", brandController.updateBrand)
brandRouter.delete("/delete:id", brandController.deleteBrand)

export default brandRouter
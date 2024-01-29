import  express  from "express";
import uploadImage from "../Middlewares/multer.js";
import { brandController } from "../Controllers/BrandController.js";

const brandRouter=express.Router()

brandRouter.post("/addBrand",uploadImage.single("image"), brandController.createBrand)
brandRouter.get("/readBrand", brandController.getBrand)
brandRouter.get("/readBrandById/:id", brandController.getBrandById)
brandRouter.put("/:id",uploadImage.single("image"), brandController.updateBrand)
brandRouter.delete("/delete/:id", brandController.deleteBrand)

export default brandRouter
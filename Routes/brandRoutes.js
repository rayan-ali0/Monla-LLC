import  express  from "express";
import uploadImage from "../Middlewares/multer.js";
import { brandController } from "../Controllers/BrandController.js";
import {verifyToken,checkRole} from '../Middlewares/authentication.js'

const brandRouter=express.Router()

brandRouter.post("/addBrand",verifyToken, checkRole(["admin"]),uploadImage.single("image"), brandController.createBrand)
brandRouter.get("/readBrand", brandController.getBrand)
brandRouter.get("/readBrandById/:id", brandController.getBrandById)
brandRouter.put("/:id",verifyToken, checkRole(["admin"]),uploadImage.single("image"), brandController.updateBrand)
brandRouter.delete("/delete/:id",verifyToken, checkRole(["admin"]), brandController.deleteBrand)
export default brandRouter
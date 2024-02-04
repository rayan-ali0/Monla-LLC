import  express  from "express";
import { categoryController } from "../Controllers/CategoryController.js";
import uploadImage from "../Middlewares/multer.js";
import {verifyToken,checkRole} from '../Middlewares/authentication.js'

const categoryRouter=express.Router()

categoryRouter.post("/addCategory", verifyToken, checkRole(["admin"]),uploadImage.single("image"),categoryController.createCategory)
categoryRouter.get("/readCategory", categoryController.getCategory)
categoryRouter.get("/readCategoryById/:id", categoryController.getCategoryById)
categoryRouter.put("/updateCategory/:id",verifyToken, checkRole(["admin"]),uploadImage.single("image"), categoryController.updateCategory)
categoryRouter.delete("/deleteCategory/:id",verifyToken, checkRole(["admin"]), categoryController.deleteCategory)

export default categoryRouter
import  express  from "express";
import { categoryController } from "../Controllers/CategoryController.js";
import uploadImage from "../Middlewares/multer.js";
import { verifyToken } from "../Middlewares/authentication.js";

const categoryRouter=express.Router()

categoryRouter.post("/addCategory", uploadImage.single("image"),categoryController.createCategory)
categoryRouter.get("/readCategory", categoryController.getCategory)
categoryRouter.get("/readCategoryById/:id", categoryController.getCategoryById)
categoryRouter.put("/updateCategory/:id", categoryController.updateCategory)
categoryRouter.delete("/deleteCategory/:id", categoryController.deleteCategory)

export default categoryRouter
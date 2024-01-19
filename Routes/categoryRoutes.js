import  express  from "express";
import { categoryController } from "../Controllers/CategoryController.js";

const categoryRouter=express.Router()

categoryRouter.post("addCategory", categoryController.createCategory)
categoryRouter.get("/readCategory", categoryController.getCategory)
categoryRouter.get("readCategoryById:id", categoryController.getCategoryById)
categoryRouter.put("updateCategory", categoryController.updateCategory)
categoryRouter.delete("deleteCategory", categoryController.deleteCategory)

export default categoryRouter
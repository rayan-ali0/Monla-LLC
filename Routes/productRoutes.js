import express from "express"
import { productController} from "../Controllers/ProductController.js"
import uploadImage from "../Middlewares/multer.js";

export const productRoutes= express.Router()

productRoutes.post('/create', uploadImage.single("image"),productController.createProduct)
productRoutes.get('/:id',productController.getProductById)
productRoutes.get('/read/all',productController.getProducts)
productRoutes.delete('/:id',productController.deleteProduct)
productRoutes.put('/update',productController.editProduct)
productRoutes.get('/category/:id',productController.getByCategory)
productRoutes.get('/five',productController.getFive)

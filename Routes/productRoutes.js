import express from "express"
import { productController} from "../Controllers/ProductController.js"

export const productRoutes= express.Router()

productRoutes.post('/create',productController.createProduct)
productRoutes.get('/:id',productController.getProductById)
productRoutes.get('/all',productController.getProducts)
productRoutes.delete('/:id',productController.deleteProduct)
productRoutes.put('/update',productController.editProduct)
productRoutes.get('/category/:id',productController.getByCategory)
productRoutes.get('/five',productController.getFive)

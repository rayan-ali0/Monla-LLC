import express from "express"
import { productController} from "../Controllers/ProductController.js"
import uploadImage from "../Middlewares/multer.js";
import {verifyToken,checkRole} from '../Middlewares/authentication.js'
export const productRoutes= express.Router()

productRoutes.post('/create', uploadImage.single("image"),productController.createProduct)
productRoutes.get('/:id',productController.getProductById)
productRoutes.get('/read/all',productController.getProducts)
productRoutes.delete('/:id',productController.deleteProduct)
productRoutes.put('/update',uploadImage.single("image"),productController.editProduct)
productRoutes.get('/category/:id',productController.getByCategory)
productRoutes.get('/related/five',productController.getRelated)
productRoutes.get('/filter/By',productController.getByFilter)
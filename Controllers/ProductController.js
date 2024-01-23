import Product from "../Models/Product.js";
import Model from "../Models/Model.js";
import Year from "../Models/Year.js";
import Brand from "../Models/Brand.js";
import Category from "../Models/Category.js";
import fs from "fs"
import slugify from "slugify";
export const productController = {
    createProduct: async (req, res) => {
        try {
            // Extract product details from the request body
            const {
                title,
                description,
                price,
                SKU,
                stock,
                origin,
                category,
                brand,
                model,
                year,
                volume
            } = req.body;

            const image = req.file.path;


            // Check if the category, brand, model, and year exist
            const [categoryExists, brandExists, modelExists, yearExists] = await Promise.all([
                Category.findById(category),
                Brand.findById(brand),
                Model.findById(model),
                Year.findById(year),
            ]);


            // If any of the referenced models doesn't exist, return an error
            if (!categoryExists || !brandExists || !modelExists || !yearExists) {
                return res.status(400).json({ error: "Invalid reference for category, brand, model, or year." });
            }
            const titleExist = await Product.find({ title: title })
            if (titleExist) {
                return res.status(400).json({ message: "Title already exist" })

            }
            const skuExist = await Product.findOne({ SKU: SKU })
            if (skuExist) {
                return res.status(400).json({ message: "This SKU already exist and it should be unique" })
            }

            const slug = slugify(`${title}`, {
                lower: true,
            })
            // Create a new product instance
            const newProduct = new Product({
                title,
                description,
                image,
                price,
                SKU,
                stock,
                origin,
                slug,
                category,
                brand,
                model,
                year,
                volume
            });

            const savedProduct = await newProduct.save();

            res.status(201).json(savedProduct);
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }


    ,
    getProductById: async (req, res) => {
        const { id } = req.params
        try {
            const product = await Product.findById(id).populate(['category', 'brand', 'model', 'year']);
            if (!product) {
                res.status(400).json({ message: "Product Not Found" })
            }
            res.status(200).json(product)
        }
        catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    ,
    getProducts: async (req, res) => {
        try {
            const offset= req.offset || 0;
            const limit = req.limit || 10
            const products = await Product.find().limit(limit).skip(offset).populate(['category', 'brand', 'model', 'year']).exec();

            if (products.length === 0) {
                // Change status to 404 and provide an appropriate message
                return res.status(404).json("Products Not Found");
            }

            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    ,

    deleteProduct: async (req, res) => {
        const { id } = req.params
        try {
            const deletedProduct = await Product.findByIdAndDelete(id);
            if (!deletedProduct) {
                res.status(404).json({ error: 'Product not found' })
            }
            fs.unlinkSync(deletedProduct.image)
            res.status(200).json({ message: "Product Deleted" })
        }
        catch (error) {
            res.status(404).json(error.message)
        }
    }
    ,
    editProduct: async (req, res) => {
        const { id, title, description, price, SKU, stock, origin, volume, category, brand, model, year } = req.body

        const updatedFields = { title, description, price, SKU, stock, volume, origin, category, brand, model, year }
        const editedProduct = await Product.findById(id)
        if (req.file) {
            updatedFields.image = req.file.path
        }
        if (SKU) {
            const skuExist = await Product.findOne({ SKU: SKU })
            console.log(skuExist._id.toString() === id)
            console.log(SKU)
            if (skuExist && (skuExist._id).toString() !== id) {
                res.status(500).json({ message: "SKU Already Exist" })
            }
        }
        const titleExist = await Product.find({ title: title })
        if (titleExist) {
            return res.status(400).json({ message: "Title already exist" })

        }
        if(title){
            const slug = slugify(`${title}`, {lower: true})
            updatedFields.slug=slug

        }
        if (editedProduct) {
            const oldImage = editedProduct.image
            try {
                const updated = await Product.findByIdAndUpdate(id, updatedFields, { new: true })
                if (updated && req.file) {
                    fs.unlinkSync(oldImage)
                }
                res.status(200).json(updated)
            }
            catch (error) {
                res.status(500).json({ message: error.message })
            }
        }
        else {
            res.status(500).json({ message: "Product Not Found" })

        }
    }
    ,
    getByCategory: async (req, res) => {
        let category = req.params;
        try {
            const products = await Product.find({ category: category })
            res.status(200).json(products)
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    }
    ,

    getRelated: async (req, res) => {
        const { category, brand } = req.body
        const query = {}
        if (category) {
            query.category = category
        }
        if (brand) {
            query.brand = brand
        }
        try {
            const products = await Product.find(query).limit(5)
            res.status(200).json(products)
        }
        catch (error) {
            res.status(404).json({ status: 400, error: error.message })
        }
    }
    ,
    getByFilter: async (req, res) => {
        const { category, volume, brand, model, year } = req.body
        const searchBy = {}
        if (category) {
            searchBy.category = category
        }
        if (volume) {
            searchBy.volume = volume
        }
        if (brand) {
            searchBy.brand = brand
        }
        if (model) {
            searchBy.model = model
        }
        if (year) {
            searchBy.year = year
        }
        try {
            const products = await Product.find(searchBy)
            res.status(200).json(products)
        }
        catch (error) {
            res.status(404).json({ message: error.message })

        }
    }



}

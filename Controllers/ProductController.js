import Product from "../Models/Product.js";
import Model from "../Models/Model.js";
import Year from "../Models/Year.js";
import Brand from "../Models/Brand.js";
import Category from "../Models/Category.js";

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
            slug,
            category,
            brand,
            model,
            year,
          } = req.body;

          const image=req.file.path;

      
          // Check if the category, brand, model, and year exist
          const [categoryExists, brandExists, modelExists, yearExists] = await Promise.all([
            Category.findById(category),
            Brand.findById(brand),
            Model.findById(model),
            Year.findById(year),
          ]);
      
          // Log the results for debugging
          console.log('categoryExists:', categoryExists);
          console.log('brandExists:', brandExists);
          console.log('modelExists:', modelExists);
          console.log('yearExists:', yearExists);
      
          // If any of the referenced models doesn't exist, return an error
          if (!categoryExists || !brandExists || !modelExists || !yearExists) {
            return res.status(400).json({ error: "Invalid reference for category, brand, model, or year." });
          }
      
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
          });
      
          // Save the new product to the database
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
            const product = await Product.findById(id).populate([ ' category', 'brand','model','year']);
            if (!product) {
                res.status(400).json("Product Not Found")
            }
            res.status(200).json(product)
        }
        catch (error) {
            res.status(404).json(error.message)
        }
    }
    ,
    getProducts: async (req, res) => {
        try {
            const products = await Product.find().populate(['category', 'brand', 'model', 'year']);
            
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
            const deletedProduct = await Product.findByIdAndRemove(id);
            if (!deletedProduct) {
                res.status(404).json({ error: 'Product not found' })
            }
            // for (let i = 0; i < deletedProduct.images.length; i++) {
            //     fs.unlink(deletedProduct.images[i], (err) => {
            //         if (err) console.log(err);
            //         return;
            //     })
            // }
            res.status(200).json({ status: "Product Deleted" })
        }
        catch (error) {
            res.status(404).json(error.message)
        }
    }
    ,
    editProduct: async (req, res) => {

        const updatedFields = { id, title, description, price, SKU, stock, origin, category, subCategory }
        const editedProduct = await Product.findById(id)
        if (req.files) {
            // updatedFields.images=req.files.map(image => image.path) 
        }
        if (editedProduct) {
            // const oldImages=editedProduct.images.map(image=>image.split('/')[1])
            try {
                await editedProduct.updateOne(updatedFields, { new: true })

                //    for(let i=0; i<oldImages.length; i++){
                //     fs.unlink(oldImages[i],(err)=>{
                //         if(err) console.log(err.message);
                //         return;
                //     })
                // }

                res.status(200).json(editedProduct)
            }
            catch (error) {
                res.status(500).json(error.message)
            }
        }
        else {
            res.status(500).json("Product Not Found")

        }
    }
    ,
    getByCategory: async (req, res) => {
        let category = req.params.id;
        try {
            const products = await Product.find({ category: category })
            res.status(200).json(products)
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    }
    ,
    getFive: async (req, res) => {
        try {
            const { category } = req.params
            const products = await Product.find({ category: category }).limit(5)
            res.status(200).json(products)

        }
        catch (error) {
            res.status(404).json({ status: 400, error: error.message })

        }
    }
    ,



}


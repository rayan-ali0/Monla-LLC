import Product from "../Models/Product.js";

export const productController = {

    createProduct: async (req, res) => {
        const { title, description, price, SKU, stock, origin, categoryId, subCategoryId } = req.body
        const image = req.files.path;
        try {
            const product = await Product.create({ title, description, price, SKU, stock, origin, categoryId, subCategoryId })
            res.status(200).json(product)
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    }
    ,
    getProductById: async (req, res) => {
        const { id } = req.params
        try {
            const product = await Product.findById(id).populate(['category', 'subCategory']);
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
            const products = await Product.find().populate(['category', 'subCategory']);
            if (!products) {
                res.status(400).json("Product Not Found")
            }
            res.status(200).json(products)
        }
        catch (error) {
            res.status(404).json(error.message)
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


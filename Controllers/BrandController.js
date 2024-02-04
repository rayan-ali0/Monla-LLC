import Brand from "../Models/Brand.js";
import path from "path";


export const brandController = {
    
    createBrand: async (req, res) => {
        const { name } = req.body
        const image = req.file.path
        try {
            const brand = await Brand.create({ brand: name, image })
            return res.status(200).json(brand)
        } catch (error) {
            return res.status(404).json(error.message)

        }
    }
    ,
    getBrand: async (req, res) => {
        try {
            const brand = await Brand.find()
            if (brand) {
                return res.status(200).json(brand)
            }
            return res.status(400).json("not found")
        } catch (error) {
            return res.status(404).json(error.message)
        }
    },

    getBrandById: async (req, res) => {
        const { id } = req.params
        try {
            const brand = await Brand.findById(id)
            if (brand) {
                return res.status(200).json(brand)
            }
            return res.status(400).json("not found")
        } catch (error) {
            return res.status(404).json(error.message)
        }
    }
    ,


    updateBrand: async (req, res) => {
        const { brand } = req.body;
        const image = req.file ? req.file.path : null;
        const { id } = req.params;

        try {
            const existingBrand = await Brand.findById(id);

            if (!existingBrand) {
                return res.status(404).json({ error: 'Brand not found' });
            }

            // Update the brand properties
            existingBrand.brand = brand;
            if (image) {
                existingBrand.image = image;
            }

            // Save the updated brand
            const updatedBrand = await existingBrand.save();

            return res.status(200).json(updatedBrand);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    ,
    deleteBrand: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(500).json({
                message: "Error! can't find id, not valid"
            })
        }

        try {
            const deletedBrand = await Brand.findByIdAndDelete(id)

            if (!deletedBrand) {

                return res.status(404).json("Not found")
            }
            return res.status(200).json({ message: "Brand deleted successfully", deletedBrand })

        } catch (error) {

            return res.status(404).json({
                message: "Error! this is in catch. error found.",
                error: error.message
            })
            console.log(error.message)
        }
    }
}
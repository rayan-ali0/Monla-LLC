import Service from "../Models/Service.js";
import fs from 'fs'
export const serviceController = {

    createService: async (req, res) => {
        const { title, description } = req.body
        const image = req.file.path;
        try {
            const service = await Service.create({ title, description, image })
            if (!service) {
                return res.status(500).json({ message: "Error creating Service" })

            }
            return res.status(200).json(service)
        }
        catch (error) {
            return res.status(404).json({ message: error.message })
        }
    }
    ,
    getServiceById: async (req, res) => {
        const { id } = req.params
        try {
            const service = await Service.findById(id);
            if (!service) {
                return res.status(400).json({ message: "service Not Found" })
            }
            return res.status(200).json(service)
        }
        catch (error) {
            return res.status(404).json({ message: error.message })
        }
    }
    ,
    getServices: async (req, res) => {
        try {
            const services = await Service.find();
            if (!services) {
                return res.status(400).json({ message: "Services Not Found" })
            }
            return res.status(200).json(services)
        }
        catch (error) {
            return res.status(404).json({ message: error.message })
        }
    }
    ,
    deleteService: async (req, res) => {
        const { id } = req.params
        try {
            const deletedService = await Service.findByIdAndDelete(id);
            if (!deletedService) {
                return res.status(404).json({ error: 'Product not found' })
            }
            fs.unlinkSync(deletedService.image)
            return res.status(200).json({ status: "Service Deleted" })
        }
        catch (error) {
            return res.status(404).json(error.message)
        }
    }
    ,
    editService: async (req, res) => {
        const { id, title, description } = req.body
        const updatedFields = { title, description }
        const editedService = await Service.findById(id)
        if (req.file) {
            updatedFields.image = req.file.path
        }
        if (editedService) {
            const oldImage = editedService.image
            try {
                const updated = await Service.findByIdAndUpdate(id, updatedFields, { new: true })
                if (updatedFields.image) {
                    fs.unlinkSync(oldImage)
                }
                return res.status(200).json(updated)
            }
            catch (error) {
                return res.status(500).json({ message: error.message })
            }
        }
        else {
            return res.status(500).json("Service Not Found")

        }
    }


}


import Service from "../Models/Service.js";
import fs from 'fs'
export const serviceController = {

    createService: async (req, res) => {
        const { title, description } = req.body
        const image = req.file.path;
        try {
            const service = await Service.create({ title, description, image })
            if (!service) {
                res.status(500).json({ message: "Error creating Service" })

            }
            res.status(200).json(service)
        }
        catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    ,
    getServiceById: async (req, res) => {
        const { id } = req.params
        try {
            const service = await Service.findById(id);
            if (!service) {
                res.status(400).json({ message: "service Not Found" })
            }
            res.status(200).json(service)
        }
        catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    ,
    getServices: async (req, res) => {
        try {
            const services = await Service.find();
            if (!services) {
                res.status(400).json({ message: "Services Not Found" })
            }
            res.status(200).json(services)
        }
        catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    ,
    deleteService: async (req, res) => {
        const { id } = req.params
        try {
            const deletedService = await Service.findByIdAndDelete(id);
            if (!deletedService) {
                res.status(404).json({ error: 'Product not found' })
            }
            fs.unlinkSync(deletedService.image)
            res.status(200).json({ status: "Service Deleted" })
        }
        catch (error) {
            res.status(404).json(error.message)
        }
    }
    ,
    editService: async (req, res) => {
        const { id, title, description } = req.body
        const updatedFields = { title, description }
        console.log(updatedFields)
        const editedService = await Service.findById(id)
        if (req.file) {
            console.log(req.file)
            updatedFields.image = req.file.path
        }
        if (editedService) {
            const oldImage = editedService.image
            try {
                const updated = await Service.findByIdAndUpdate(id, updatedFields, { new: true })
                if (updatedFields.image) { fs.unlinkSync(oldImage) }
                res.status(200).json(updated)
            }
            catch (error) {
                res.status(500).json({ message: error.message })
            }
        }
        else {
            res.status(500).json("Service Not Found")

        }
    }


}


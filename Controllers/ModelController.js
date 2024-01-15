import Model from "../Models/Model.js";

export const modelController = {

    createModel: async (req, res) => {
        const {name, brand_Id} = req.body
        try {
            const model = await Model.create({ name, brandId})
            res.status(200).json(model)
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    }
    ,
    getModelById: async (req, res) => {
        const { id } = req.params
        try {
            const model = await Model.findById(id).populate(['brandId']);
            if (!model) {
                res.status(400).json("Model Not Found")
            }
            res.status(200).json(model)
        }
        catch (error) {
            res.status(404).json(error.message)
        }
    }
    ,
    getModels: async (req, res) => {
        try {
            const Models = await Model.find().populate(['brandId']);
            if (!Models) {
                res.status(400).json("model Not Found")
            }
            res.status(200).json(Models)
        }
        catch (error) {
            res.status(404).json(error.message)
        }
    }
    ,
    deleteModel: async (req, res) => {
        const { id } = req.params
        try {
            const deletedModel = await Model.findByIdAndRemove(id);
            if (!deletedModel) {
                res.status(404).json({ error: 'model not found' })
            }
        
            res.status(200).json({ status: "model Deleted" })
        }
        catch (error) {
            res.status(404).json(error.message)
        }
    }
    ,
    editModel: async (req, res) => {

        const updatedFields = { name, brandId}
        const editedModel = await Model.findById(id)
      
        if (editedModel) {
            // const oldImages=editedProduct.images.map(image=>image.split('/')[1])
            try {
                await editedModel.updateOne(updatedFields, { new: true })

             

                res.status(200).json(editedModel)
            }
            catch (error) {
                res.status(500).json(error.message)
            }
        }
        else {
            res.status(500).json("module Not Found")

        }
    }
    ,
    getByBrand: async (req, res) => {
        let brand = req.params.id;
        try {
            const models = await Model.find({ brand: brand})
            res.status(200).json(models)
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    }
    
    ,



}

import Model from "../Models/Model.js";
import Brand from '../Models/Brand.js'
export const modelController = {

    createModel: async (req, res) => {
        const {name, brandId} = req.body
        try {
            const model = await Model.create({ name, brandId})
            res.status(200).json(model)
        }
        catch (error) {
            console.error(error)
            console.log(error)
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
        const { id } = req.params; 

        try {
            const deletedModel = await Model.findByIdAndDelete(id);
    
            if (deletedModel) {
                res.status(200).json({ message: 'Model deleted successfully' });
            } else {
                res.status(404).json({ error: 'Model not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    ,
    editModel: async (req, res) => {

        const { id } = req.params; // Assuming you are passing the id through the request parameters
    const { name, brandId } = req.body; // Assuming you are passing the updated fields in the request body

    try {
        const editedModel = await Model.findByIdAndUpdate(
            id,
            { name, brandId },
            { new: true, runValidators: true }
        );

        if (editedModel) {
            res.status(200).json(editedModel);
        } else {
            res.status(404).json({ error: "Model not found" });
        }
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: errors });
        }

        // Handle other errors
        res.status(500).json({ error: error.message });
    }
}
    ,
    getByBrand:  async (req, res) => {
        try {
          const brandId = req.params.brandId; 
          const models = await Model.find({ brandId }).exec();
      
          if (!models || models.length === 0) {
            return res.status(404).json({ message: 'No models found for the specified brand ID.' });
          }
      
          res.status(200).json(models);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    
    ,



}

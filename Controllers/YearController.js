import Year from "../Models/Year.js";
import mongoose from "mongoose";
export const yearController = {

    createYear: async (req, res) => {
        const {value, modelId} = req.body
        try {
            const year = await Year.create({ value, modelId})
            res.status(200).json(year)
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    }
    ,
    getYearById: async (req, res) => {
        const { id } = req.params
        try {
            const year = await Year.findById(id).populate(['modelId']);
            if (!year) {
                res.status(400).json("year Not Found")
            }
            res.status(200).json(year)
        }
        catch (error) {
            res.status(404).json(error.message)
        }
    }
    ,
    getYears: async (req, res) => {
        try {
            const years = await Year.find().populate(['modelId']);
            if (!years) {
                res.status(400).json("years Not Found")
            }
            res.status(200).json(years)
        }
        catch (error) {
            res.status(404).json(error.message)
        }
    }
    ,
    deleteYear: async (req, res) => {
        const { id } = req.params;

        try {
          // Find and remove the Year document by ID
          const deletedYear = await Year.findByIdAndDelete(id);
      
          if (!deletedYear) {
            // If the document with the given ID doesn't exist
            return res.status(404).json({ error: 'Year not found' });
          }
      
          // Successfully deleted
          res.status(200).json({ status: 'Year deleted' });
        } catch (error) {
          // Handle other errors, e.g., database errors
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    ,
    editYear: async (req, res) => {

        const { id } = req.params;

        try {
          // Assuming req.body contains the updated data
          const { value, modelId } = req.body;
      
          // Validate that value is an array with two elements
          if (!Array.isArray(value) || value.length !== 2) {
            return res.status(400).json({ error: 'Invalid year range format' });
          }
      
          // Assuming modelId is a valid ObjectId
          if (!mongoose.Types.ObjectId.isValid(modelId)) {
            return res.status(400).json({ error: 'Invalid Model ID' });
          }
      
          // Check if the document with the given id exists
          const existingYear = await Year.findById(id);
          if (!existingYear) {
            return res.status(404).json({ error: 'Year not found' });
          }
      
          // Update the Year document
          existingYear.value = value;
          existingYear.modelId = modelId;
      
          // Save the updated document
          await existingYear.save();
      
          // Respond with the updated Year document
          res.json(existingYear);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    ,
    getByModel: async (req, res) => {
        let model = req.params.id;
        try {
            const years = await Year.find({ model: model})
            res.status(200).json(years)
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    }
    
    ,



}

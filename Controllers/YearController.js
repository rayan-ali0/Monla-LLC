import Year from "../Models/Year.js";
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
        const { id } = req.params
        try {
            const deletedYear = await Year.findByIdAndRemove(id);
            if (!deletedYear) {
                res.status(404).json({ error: 'year not found' })
            }
        
            res.status(200).json({ status: "year Deleted" })
        }
        catch (error) {
            res.status(404).json(error.message)
        }
    }
    ,
    editYear: async (req, res) => {

        const updatedFields = { value, modelId}
        const editedYear = await Year.findById(id)
      
        if (editedYear) {
            try {
                await editedYear.updateOne(updatedFields, { new: true })

             

                res.status(200).json(editedYear)
            }
            catch (error) {
                res.status(500).json(error.message)
            }
        }
        else {
            res.status(500).json("year Not Found")

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

import Service from "../Models/Service";
export const serviceController = {

    createService: async (req, res) => {
        const { title, description} = req.body
        const image = req.files.path;
        try {
            const service = await Service.create({ title, description })
            if(!service){
                res.status(500).json({message:"Error creating Service"})

            }
            res.status(200).json(service)
        }
        catch (error) {
            res.status(404).json({message: error.message })
        }
    }
    ,
    getServiceById: async (req, res) => {
        const { id } = req.params
        try {
            const service = await Service.findById(id);
            if (!service) {
                res.status(400).json({message:"service Not Found"})
            }
            res.status(200).json(service)
        }
        catch (error) {
            res.status(404).json({message:error.message})
        }
    }
    ,
    getServices: async (req, res) => {
        try {
            const services = await Service.find();
            if (!services) {
                res.status(400).json({message:"Services Not Found"})
            }
            res.status(200).json(services)
        }
        catch (error) {
            res.status(404).json({message:error.message})
        }
    }
    ,
    deleteService: async (req, res) => {
        const { id } = req.params
        try {
            const deletedService = await Service.findByIdAndRemove(id);
            if (!deletedService) {
                res.status(404).json({ error: 'Product not found' })
            }
            // for (let i = 0; i < deletedService.images.length; i++) {
            //     fs.unlink(deletedService.images[i], (err) => {
            //         if (err) console.log(err);
            //         return;
            //     })
            // }
            res.status(200).json({ status: "Service Deleted" })
        }
        catch (error) {
            res.status(404).json(error.message)
        }
    }
    ,
    editService: async (req, res) => {

        const updatedFields = { id, title, description}
        const editedService = await Service.findById(id)
        if (req.files) {
            // updatedFields.images=req.files.map(image => image.path) 
        }
        if (editedService) {
            // const oldImages=editedService.images.map(image=>image.split('/')[1])
            try {
                await editedService.updateOne(updatedFields, { new: true })
                //    for(let i=0; i<oldImages.length; i++){
                //     fs.unlink(oldImages[i],(err)=>{
                //         if(err) console.log(err.message);
                //         return;
                //     })
                // }
                res.status(200).json(editedService)
            }
            catch (error) {
                res.status(500).json({message:error.message})
            }
        }
        else {
            res.status(500).json("Service Not Found")

        }
    }


}


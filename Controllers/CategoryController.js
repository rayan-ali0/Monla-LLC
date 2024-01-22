import Category from "../Models/Category.js";

export const categoryController={
    createCategory:async(req,res)=>{
        const {title}=req.body
        const image=req.file.path
        try {
            const category= await Category.create({title, image})
            res.status(200).json(category)
        } catch (error) {
            res.status(404).json(error.message)
            console.log(error.message)
        }
    }
    ,
    getCategory:async(req,res)=>{
        try {
            const category=await Category.find()
            if (!category){
                res.status(401).json("not found")
            }
            res.status(200).json(category)
        } catch (error) {
            res.status(404).json(error.message)
        }
    },
    getCategoryById:async(req,res)=>{
        const {id}=req.params
        try {
            const  category= await Category.findById(id)
            if(category){
                res.status(200).json(category)
            }
            res.status(400).json("not found")
        } catch (error) {
            res.status(404).json(error.message)
        }
    },
    updateCategory: async (req, res) => {
        const { categoryId } = req.body;
        const image=req.file.path
        const { id } = req.params;
    
        try {
            const category = await Category.findById(id);
    
            if (!category) {
                return res.status(404).json("Category not found");
            }
                category.categoryId = categoryId;
            
    
            const updatedCategory = await category.save();
    
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    ,
    deleteCategory:async(req,res)=>{
        const {id}=req.params
        try {
            const deletedCategory= await Category.findByIdAndDelete(id)
            if(!deletedCategory){
                 res.status(404).json("Not found")
            }
            res.status(200).json({message:"Brand deleted successfully", deletedCategory    })
        } catch (error) {
            res.status(404).json(error.message)
        }
    }
    
}
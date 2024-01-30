import Brand from "../Models/Brand.js";
import  path  from "path";


export const brandController={
    createBrand:async(req,res)=>{
        const {name, categoryId}=req.body
        const image=req.file.path
        try {
            const brand= await Brand.create({brand:name, categoryId, image})
            res.status(200).json(brand)
        } catch (error) {
            res.status(404).json(error.message)
           
        }
    }
,
    getBrand:async(req,res)=>{
        try {
            const  brand= await Brand.find().populate(['categoryId'])
            if(brand){
               return res.status(200).json(brand)
            }
         return   res.status(400).json("not found")
        } catch (error) {
          return  res.status(404).json(error.message)
        }
    },
    getBrandById:async(req,res)=>{
        const {id}=req.params
        try {
            const  brand= await Brand.findById(id).populate(['categoryId'])
            if(brand){
                res.status(200).json(brand)
            }
            res.status(400).json("not found")
        } catch (error) {
            res.status(404).json(error.message)
        }
    }
,
getBrandByCategory:async(req,res)=>{
    const {categoryId}=req.params
    try {
        const  brand= await Brand.find({categoryId:categoryId})
        if(brand){
           return res.status(200).json(brand)
        }
        return res.status(400).json("not found")
    } catch (error) {
        return res.status(404).json(error.message)
    }
}
,
    updateBrand:async(req,res)=>{
        const {name, categoryId}=req.body
        const image=req.file.path
        const {id}=req.params
        try {
            const brand= await Brand.findById(id)
            if(!brand){
                return res.status(404).json("Brand not found");
            }
            if(name) brand.name =name;
            if(categoryId) brand.categoryId= categoryId;
            if(image) brand.image=image;

            const updatedBrand= await brand.save()

            res.status(200).json(updatedBrand);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
,
    deleteBrand:async(req,res)=>{
        const {id}=req.params;
        console.log("id:", id);

        if(!id){
            return res.status(500).json({
                message: "Error! can't find id, not valid"
            })
        }
        console.log("entering try with: ", id);

        try {
            const deletedBrand= await Brand.findByIdAndDelete(id)
           
            if(!deletedBrand){
                
                return res.status(404).json("Not found")
            }
           return res.status(200).json({message:"Brand deleted successfully", deletedBrand    })
        
        } catch (error) {
        
            return res.status(404).json({
            message: "Error! this is in catch. error found.",
            error: error.message
        })
            console.log(error.message)
        }
    }
}
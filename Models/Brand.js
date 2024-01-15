import mongoose from "mongoose";

const Schema= mongoose.Schema;

const Brand= new Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    brand:{
        type:String,
    },
    image:{
        type:String,
        required:true
    }

})

export default mongoose.model("Brand",Brand)
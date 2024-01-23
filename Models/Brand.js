import mongoose from "mongoose";

const Schema= mongoose.Schema;

const Brand= new Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    brand:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }

}
,
{
    timestamps:true
})

export default mongoose.model("Brand",Brand)
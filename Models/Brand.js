import mongoose from "mongoose";

const Schema= mongoose.Schema;

const Brand= new Schema({
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
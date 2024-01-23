import mongoose from "mongoose";

const Schema= mongoose.Schema;

const Category= new Schema({
    title:{
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
}
)

export default mongoose.model("Category", Category)
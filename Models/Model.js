import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Model = new Schema({
    name: {
        type: String,
        required: true,
    },
  
    brandId: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'   
     },
    
}
,
{
    timestamps:true
}
);

export default mongoose.model("Model", Model);

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Year = new Schema({
   value: {
        type: Number,
        required: true,
    },
  
    modelId: {
        type: Schema.Types.ObjectId,
        ref: 'Model'   
     },
    
});

export default mongoose.model("Year", Year);

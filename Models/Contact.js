import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Contact = new Schema({
    Name:{
        type:String,
        required:true
    }
    ,
    Email:{
        type:String,
        required:true
    }
    ,
    Phone:{
        type:Number,
        required:true
    }
    ,
    message:{
        type:String,
        required:true
    }

}
)

export default mongoose.model('Contact', Contact)
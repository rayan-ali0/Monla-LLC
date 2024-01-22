import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Product = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    image: {
        type: String,
        required: true
    }
    ,
    price: {
        type: Number,
        min: 1,
        required: true
    },
    SKU: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
    },
    stock: {
        type: Number,
        min: 0,
        required: true
    },
    origin: {
        type: String,
        required: true
    }
    ,
    volume:{
        type:Number,
        required:false,
        default:0
    }
    ,
    slug: {
        type: String,
        required: true,
        unique:true
    }
    ,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required:false
    }
    ,

    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Model',
        required:false
    },

     year: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Year',
        required:false
    }

}
)

export default mongoose.model('Product', Product)
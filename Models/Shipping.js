import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Shipping = new Schema({
  location: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  }
});

export default mongoose.model("Shipping", Shipping);

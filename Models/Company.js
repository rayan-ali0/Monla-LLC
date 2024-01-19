import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Company = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  whatsapp: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  tiktok: {
    type: String,
  },
});

export default mongoose.model("Company", Company);

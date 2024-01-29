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
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
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
}
,
{
    timestamps:true
}
);

export default mongoose.model("Company", Company);

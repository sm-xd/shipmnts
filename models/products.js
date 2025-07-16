import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({ 
  product_code: {
    type: String,
    required: true
  },
  qty: {type: Number},
  volume: {type: Number},
  location_code:  {type: mongoose.Schema.Types.ObjectId, ref: 'Storage'}
});

export const Product = mongoose.model('procuct', ProductSchema)
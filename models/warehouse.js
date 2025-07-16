import mongoose from "mongoose";

const WarehouseSchema = new mongoose.Schema({ 
  location_code: {
    type: String,
    required: true
  },
  childs: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Storage'
  }
});

export const Warehouse = mongoose.model('warehouse', WarehouseSchema)
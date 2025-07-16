import mongoose from "mongoose";

const WarehouseSchema = new mongoose.Schema({ 
  location_code: {
    type: String,
    required: true
  },
});

export const Warehouse = mongoose.model('warehouse', WarehouseSchema)
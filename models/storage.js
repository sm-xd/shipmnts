import mongoose from "mongoose";

const StorageSchema = new mongoose.Schema({ 
  location_code: {
    type: String,
    required: true
  },
  parent_location_code: {
    type: String,
    required: true
  },
  childs: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Storage'
  }
});
export const Storage = mongoose.model('Storage', StorageSchema)
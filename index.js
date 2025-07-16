import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import { Warehouse } from "./models/warehouse.js";
import { Storage } from "./models/storage.js";
import { Product } from "./models/products.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Home");
});

app.post("/api/create_location", async (req, res) => {
  try {
    if (req.body.parent_location_code == null) {
      const warehouse = new Warehouse({
        location_code: req.body.location_code,
      });
      await warehouse.save();
      res.status(201).json(warehouse);
    } else {
      console.log(req.body);
      const storage = new Storage(req.body);
      await storage.save();
      res.status(201).json(storage);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

function findAllChilds(plc) {
  console.log("here");
  const data = Storage.find({ parent_location_code: { $regex: plc } });
  return data;
}

app.get("/api/warehouse/tree", async (req, res) => {
  const queryTerm = req.query.warehouse_code.trim();
  try {
    const warehouse = await Warehouse.find({ location_code: queryTerm });
    if (!warehouse) {
      return res.status(404).json({ error: "Warehouse not found" });
    }

    const childs = await Storage.find({
      parent_location_code: { $regex: queryTerm },
    });

    const data = {
      location_code: queryTerm,
      type: "warehouse",
      childs: childs,
    };

    res.json(data); // Send the result as JSON
  } catch (err) {
    console.error("Error fetching tree:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/transaction/receipt", async (req, res) => {
  try {
    const warehouse = await Warehouse.find({
      location_code: req.body.warehouse_code,
    });
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: "Location Doesn’t belong to a specific warehouse",
      });
    }
    const products = req.body.products;
    for (const product of products) {
      const p = new Product(product);
      p.save();
    }
    return res.status(200).json({
      success: true,
      message: "Products added successfully",
    });
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

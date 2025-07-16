import express from 'express';
import cors from 'cors';
import connectDB from "./db.js"
import { Warehouse } from "./models/warehouse.js"
import { Storage } from "./models/storage.js"

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;



app.get('/', (req, res) => {
    res.send("Home");
});

app.post('/api/create_location', async (req, res) => {
    try {
        if(req.body.parent_location_code == null){
          const warehouse = new Warehouse({location_code : req.body.location_code });
          await warehouse.save();
          res.status(201).json(warehouse);
        }
        else{
          console.log(req.body)
          const storage = new Storage(req.body)
          await storage.save();
          res.status(201).json(storage);
        }
    } catch (error) {
        res.status(400)
            .json({ error: error.message });
    }
});

function findAllChilds(plc){
  console.log("here")
  const data = Storage.findAll({parent_location_code:plc});
  return data;
}

app.get('/api/warehouse/tree', (req, res) => {
  const queryTerm = req.query.warehouse_code;
  if(Warehouse.find(queryTerm)){
    const data = {
      location_code :  queryTerm,
      type : "warehouse",
      childs :  findAllChilds(queryTerm)
    }
    console.log(data.childs)
  }
    res.send("ok");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
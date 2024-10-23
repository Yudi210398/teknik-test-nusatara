import express from "express";
import {
  createProduk,
  deleteProduk,
  findAllData,
  findGetId,
  postEdit,
} from "../controller/admin.js";
const routerAdmin = express.Router();

routerAdmin.post("/data", createProduk);
routerAdmin.get("/data", findAllData);
routerAdmin.get("/data/:id", findGetId);
routerAdmin.patch("/data/:id", postEdit);
routerAdmin.delete("/data/:id", deleteProduk);

export default routerAdmin;

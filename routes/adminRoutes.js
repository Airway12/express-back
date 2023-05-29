import { Router } from "express";
const router = Router();

import {
  createProduct,
  track,
  editProduct,
  deleteProduct,
  allProducts,
} from "../controllers/adminController.js";

router.get("/products/:id", track);
router.get("/products", allProducts);
router.post("/products", createProduct);
router.put("/products/:id", editProduct);
router.delete("/products/:id", deleteProduct);

export default router;

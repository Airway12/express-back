import pkg from "validator";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import Product from "../db/Usermodel.js";

const { ObjectId } = mongoose.Types;

export const track = async (req, res) => {
  const { id: productId } = req.params;
  console.log("rrrrr", { productId });
  // console.log({ q: req.query });

  if (!ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (productId) {
    try {
      let product = await Product.findOne({ _id: productId });
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.send(product);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
};

export const createProduct = async (req, res) => {
  const { name, productId, address, clientName, dhlNum, order, payMethod } =
    req.body;
  try {
    const product = await Product.create({
      name,
      productId,
      address,
      clientName,
      dhlNum,
      payMethod,
      order,
      amount: 0,
    });
    res.status(201).json({
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const allProducts = async (req, res) => {
  const products = await Product.find({});

  const filtered = products.filter((product) => product.role !== "admin");

  res.json({ products: filtered, count: filtered.length });
};

export const editProduct = async (req, res) => {
  const { id: productId } = req.params;

  try {
    const product = await Product.findOneAndUpdate(
      { id: productId },
      // { name, address, clientName },
      req.body,
      { new: true } // Return the updated product after the update
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// export const editProduct = async (req, res) => {
//   const { name, address, clientName,  id: productId} = req.body;
//   console.log({ name, address, clientName });

//   if (productId) {
//     try {
//       let product = await Product.findOne({ _id: productId });

//       if (!product) {
//         res.json({ error: "Product Not Found" });
//       }

//       product = await Product.findOneAndUpdate(
//         { _id: productId },
//         { name, address, clientName },
//         {
//           new: true,
//         }
//       );

//       res.json({ product, msg: "Product Edit Successful" });
//     } catch (err) {
//       res.json({ err: "try again later?" });
//     }
//   } else {
//     res.json({ err: "invalid ID" });
//   }
// };

export const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  console.log("deleteProduct", { productId });

  try {
    const product = await Product.findOneAndRemove({ _id: productId });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

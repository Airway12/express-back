import pkg from "validator";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import Product from "../db/Usermodel.js";

const { ObjectId } = mongoose.Types;

export const track = async (req, res) => {
  const { id: productId } = req.params;
  console.log("rrrrr", { productId });
  // console.log({ q: req.query });

  if (isNaN(productId)) {
    return res.status(400).send("Invalid ID" );
  }

  if (productId) {
    try {
      let product = await Product.findOne({ productId: productId });
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
  const { name, productId, address, clientName, dhlNum, order, payMethod, recName, recAddress, recPhone, email, recEmail, phone, distance, weight, description, StatusAddress } =
    req.body;
    console.log("fff", name);
  try {
    const product = await Product.create({
      name,
      productId,
      address,
      phone,
      email,
      clientName,
      dhlNum,
      payMethod,
      order,
      recName,
      recEmail,
      recPhone,
      recAddress,
      distance,
      weight,
      description,
      StatusAddress,
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

export const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  console.log("deleteProduct", { productId });

  try {
    const product = await Product.findOneAndRemove({ productId: productId });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

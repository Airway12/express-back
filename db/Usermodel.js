import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  recName: {
    type: String,
    required: true,
  },
  productId: {
    type: Number,
    required: [true, "Please enter your tracking number"],
    unique: true,
  },
  address: {
    type: String,
    default: "",
  },
  recAddress: {
    type: String,
    default: "",
  },
  clientName: {
    type: String,
    required: [true, "Please enter your client name"],
  },
  dhlNum: {
    type: Number,
  },
  payMethod: {
    type: String,
  },
  order: {
    type: Number,
  },
  amount: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phone: {
    type: String,
    default: "",
  },
  recPhone: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
  },
  recEmail: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
  },
  distance: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  }
  // password: {
  //   type: String,
  //   required: [true, "Please enter a password"],
  //   minlength: [6, "Minimum password length is 6 characters"],
  // },
  // deposit: {
  //   type: Number,
  //   default: 0,
  // },
  // withdrawal: {
  //   type: Number,
  //   default: 0,
  // },
  // balance: {
  //   type: Number,
  //   default: 0,
  // },
  // profits: {
  //   type: Number,
  //   default: 0,
  // },
  // role: {
  //   type: String,
  //   enum: ["Product", "admin"],
  //   default: "Product",
  // },
  // active: {
  //   type: Boolean,
  //   default: false,
  // },
});

export default mongoose.model("Pdt", ProductSchema);

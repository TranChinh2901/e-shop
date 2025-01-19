const mongoose = require("mongoose");

const orderSchema =  new mongoose.Schema({
  products: [
   {
    type: mongoose.ObjectId,
    ref: "Products",
   }
  ],
  payment: {},
  buyer: {
    type: mongoose.ObjectId,
    ref: "users",
  },
  status:{
    type: String,
    default: "Not process",
    enum: ["Not process", "Processing", "Shipped", "delivered", "cancel"],
  },

},{timestamps: true},);

module.exports = mongoose.model('Order', orderSchema)

import { Schema } from "mongoose";
const mongoos = require("mongoose");

const OrderSchema = new mongoos.Schema({
  orderDetails: Array,
  tableNo: String,
  serverName: String,
  orderNumber: { type: Number, default: 0 }
},
  {
    timestamps: true
  }
);

module.exports = mongoos.model("Order", OrderSchema);

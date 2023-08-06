import { Schema } from "mongoose";
const mongoos = require("mongoose");

const OrderSchema = new mongoos.Schema({
  orderDetails: Array,
  tableNo: Number,
  serverName: String,
},
{
  timestamps: true // Enables automatic generation of 'createdAt' and 'updatedAt' fields
}
);

module.exports = mongoos.model("Order", OrderSchema);

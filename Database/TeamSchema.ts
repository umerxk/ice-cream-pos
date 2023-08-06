import { Schema } from "mongoose";

const mongoos = require("mongoose");

const TeamSchema = new mongoos.Schema({
  name: String,
  members: Array,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoos.model("Team", TeamSchema);

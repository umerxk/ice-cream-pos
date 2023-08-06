const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: {
    type: String,
    unique: true // Unique index. If you specify `unique: true`
  },
  password: String,
  isAdmin: Boolean
});

module.exports = mongoose.model("User", UserSchema);

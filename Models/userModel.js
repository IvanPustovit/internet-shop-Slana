const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  orders: [{ type: Types.ObjectId, ref: "Order" }],
  date: { type: String, required: true },
});

module.exports = model("User", userSchema);

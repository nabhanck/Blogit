const mongoose = require("mongoose");

const dpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: String,
});

const DpModel = mongoose.model("Dp", dpSchema);
module.exports = DpModel;

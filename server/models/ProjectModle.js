const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  projectName: String,
  phone: Number,
});

module.exports = mongoose.model("ProjectModle", projectSchema);

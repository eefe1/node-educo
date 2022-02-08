const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursePathSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1
  }
  
});

const coursePath = mongoose.model("coursePath", coursePathSchema);
module.exports = coursePath;




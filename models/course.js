const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    short: {
      type: String,
      require: true,
    },
    long: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      enum: ['JavaScript','Express','React','Node','MongoDB'],
      require: true,
    },
    image: {
      type: String,
      
    }
  },
  { timestamps: true }
);

const Course = mongoose.model('Course',courseSchema)
module.exports = Course



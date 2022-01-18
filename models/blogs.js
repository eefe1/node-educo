const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
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
      require: true,
    }
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog',blogSchema)
module.exports = Blog
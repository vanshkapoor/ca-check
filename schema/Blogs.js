const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    // required: true,
  },
  content: {
    type: String,
  },
  subContent: {
    type: String,
  },
  writer: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: [{ type: String }],
  readBy: {
    type: Number,
  },
  draft: {
    type: Boolean,
  },
  readTime: {
    type: Number,
  },
});

module.exports = mongoose.model("Blogs", BlogSchema);

var mongoose = require("mongoose");

var ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  summary: String,
  link: String,
  saved: {
    type: Boolean,
    default: false
  },
  comments: Array
});

module.exports = mongoose.model("Article", ArticleSchema);

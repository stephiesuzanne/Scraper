var express = require("express");
var exphbs = require("express-handlebars");
var nodemon = require("nodemon");
var bodyParser = require("body-parser");

var scrapedRoute = require("./routes/scraped");

const mongoose = require("mongoose");
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err) {
    console.log(err);
  }
);

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var PORT = process.env.PORT || 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use(scrapedRoute);

app.listen(PORT);

//jshint esversion:6

var express = require("express");
var exphbs = require("express-handlebars");
var nodemon = require("nodemon");
var bodyParser = require("body-parser");

var scrapedRoute = require("./routes/scraped");


const mongoose = require('mongoose');
//mongodb+srv://steph:dbpw@cluster0-nr7pf.mongodb.net/Scraper?retryWrites=true&w=majority
mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true,  useUnifiedTopology: true });




var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var PORT = process.env.PORT || 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use(scrapedRoute);

app.listen(PORT);

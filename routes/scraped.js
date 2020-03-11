// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var router = express.Router();
var article = require("./../models/article");

// renders the homepage with the articles that exist in the database
router.get("/", function(req, res) {
  article.find({}, function(error, found) {
    res.render("home", {
      article: found
    });
  });
});

router.get("/saved", function(req, res) {
  article.find({}, function(error, found) {
    res.render("articles", {
      article: found
    });
  });
});

router.delete("/articles/:id/comment/:index", function(req, res) {
  var id = req.params.id;
  let unsetValue = {};
  unsetValue["comments." + req.params.index] = 1;
  article.update({ _id: id }, { $unset: unsetValue }, function(result) {
    article.update({ _id: id }, { $pull: { comments: null } }, function(
      response
    ) {
      res.status(200).json({ message: "comment deleted" });
    });
  });
});

router.post("/comment", function(request, response) {
  var id = request.body.id;
  article.update(
    { _id: id },
    { $push: { comments: request.body.comment } },
    function(result) {
      response.redirect("/saved");
    }
  );
});

router.put("/articles/:id", function(request, response) {
  var id = request.params.id;
  article.update({ _id: id }, { $set: { saved: request.body.saved } }, function(
    result
  ) {
    response.status(200).json({ message: "changed saved status" });
  });
});

router.get("/scrape", function(req, res) {
  request("http://www.theverge.com", function(error, response, html) {
    var $ = cheerio.load(html);

    $(".c-entry-box--compact__title").each(function(i, element) {
      var title = $(element)
        .children("a")
        .text();
      var summary = $(element)
        .children("p")
        .text();
      var link = $(element)
        .children("a")
        .attr("href");

      console.log({ title, summary, link });

      if (title && summary && link) {
        // check if the article has already been added, if not, then add the new article
        article.find({ title }, function(err, data) {
          if (err) {
            res.status(404).send(err.toString());
          }
          if (data.length === 0) {
            article.create({
              title,
              summary,
              link
            });
          }
        });
      }
    });
    res.redirect("/");
  });
});

module.exports = router;

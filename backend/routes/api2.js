const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const request = require('request');

var url = "https://dobset.io/";

request(url, function(error, response, body) {
  if (error) throw error;

  var $ = cheerio.load(body);

  var postElements = $("section.posts article.post");
  postElements.each(function() {
    var postTitle = $(this).find("h1").text();
    var postUrl = $(this).find("h1 a").attr("href");
  });
});

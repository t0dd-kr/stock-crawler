const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const request = require('request');
// /* GET users listing. */

router.get('/info/:id', (req, res, next) => {
  var url = 'http://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd=' + req.params.id
  request(url, (err, response, html) => {
    if(err) {
      res.send({});
      throw err;
    }
    var $ = cheerio.load(html);
    res.send({
      name: $('span.name').html(),
      code: $('b.num').html()
    })
  })
});

module.exports = router;

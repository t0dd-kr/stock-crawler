const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const request = require('request');
const phantom = require('phantom');

router.get('/info/:id', (req, res, next) => {
  var url = 'http://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd=' + req.params.id
  request(url, (err, response, html) => {
    if(err) {
      res.send({});
      throw err;
    }
		(async function() {
		  const instance = await phantom.create();
		  const page = await instance.createPage();
		  await page.on('onResourceRequested', function(requestData) {
		    console.info('Requesting', requestData.url);
		  });

		  const status = await page.open(url);
		  const content = await page.property('content');
    	var $ = cheerio.load(content);

			var profits = [];
			var assets = [];
			var headers = [];
			for(var i=8;i<16;i++){
				profits.push($('table.gHead01 tbody tr td.num span.cBk')[i].children[0].data);
				assets.push($('table.gHead01 tbody tr td.num span.cBk')[i + 48].children[0].data);
			}
			for(var i=3;i<11;i++){
				headers.push($('table.gHead01 thead tr th.bg')[i].children[0].data.trim());
			}
			console.log()
			res.send({
				name: $('span.name')[0].children[0].data,
				code: $('b.num')[0].children[0].data,
				per: $('dt.line-left b.num')[1].children[0].data,
				per_job: $('dt.line-left b.num')['2'].children[0].data,
				wics: $('table.cmp-table tbody tr.cmp-table-row td.cmp-table-cell dl').children('dt.line-left')['2'].children[0].data.split(' : ')[1],
				volume: $('td.num')['3'].children[0].data.split('/')[0].trim(),
				foreigner_percentage: $('td.num')['7'].children[0].data,
				profits: profits,
				headers: headers,
				assets: assets,
				consensus: $('table.gHead.all-width#cTB15 tbody tr td.noline-bottom.line-right.center.cUp b')[0].children[0].data
			})
		  await instance.exit();
		})();
  })
});

module.exports = router;

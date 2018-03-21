const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const request = require('request');

var hexNum = { 0:1, 1:1, 2:1, 3:1, 4:1, 5:1, 6:1, 7:1, 8:1, 9:1,
				A:1, B:1, C:1, D:1, E:1, F:1,
				a:1, b:1, c:1, d:1, e:1, f:1 };

function dhex(str) {
 return (str+0).toString(16).toUpperCase();
}

function getCPfromChar ( argstr ) {
	var codepoint = "";
	var haut = 0;
	var n = 0;
	for (var i = 0; i < argstr.length; i++) {
		var b = argstr.charCodeAt(i);
		if (b < 0 || b > 0xFFFF) {
			codepoint += 'Error: Initial byte out of range in getCPfromChar: '+dhex(b);
		}
		if (haut != 0) {
			if (0xDC00 <= b && b <= 0xDFFF) {
				codepoint += dhex(0x10000 + ((haut - 0xD800) << 10) + (b - 0xDC00)) + ' ';
				haut = 0;
				continue;
			}
			else {
				codepoint += 'Error: Second byte out of range in getCPfromChar: '+dhex(haut);
				haut = 0;
			}
		}
		if (0xD800 <= b && b <= 0xDBFF) {
			haut = b;
		}
		else {
			codepoint += b.toString(16).toUpperCase()+' ';
		}
	}
	return codepoint;
}

function convertCP2Char ( argstr ) {
  var outputString = '';
  argstr = argstr.replace(/^\s+/, '');
  if (argstr.length == 0) { return ""; }
  	argstr = argstr.replace(/\s+/g, ' ');
  var listArray = argstr.split(' ');
  for ( var i = 0; i < listArray.length; i++ ) {
    var n = parseInt(listArray[i], 16);
    if (n <= 0xFFFF) {
      outputString += String.fromCharCode(n);
    } else if (n <= 0x10FFFF) {
      n -= 0x10000
      outputString += String.fromCharCode(0xD800 | (n >> 10)) + String.fromCharCode(0xDC00 | (n & 0x3FF));
    } else {
      outputString += 'convertCP2Char error: Code point out of range: '+dhex(n);
    }
  }
  return( outputString );
}

function convertHexNCR2CP ( argstr ) {
	CPstring = '';
	argstr += ' ';
	var tempString = '';
	var charStr = '';

	for (var i=0; i<argstr.length-1; i++) {
		if (i<argstr.length-4 && argstr.charAt(i) == '&'
			&& argstr.charAt(i+1) == '#' && argstr.charAt(i+2) == 'x'
			&& argstr.charAt(i+3) in hexNum) { // &#x
			tempString = '';
			i += 3;
			while (i<argstr.length-1 && argstr.charAt(i) in hexNum) {
				tempString += argstr.charAt(i);
				i++;
				}
			if (argstr.charAt(i) == ';') {
				charStr += convertCP2Char(tempString);
				}
			else { charStr += '&#x'+tempString; i--; }
			}
		else {
			charStr += argstr.charAt(i);
			}
		}

	CPstring = getCPfromChar( charStr );
	CPstring = CPstring.substring(0, CPstring.length-1);

	return convertCP2Char( CPstring );
}

router.get('/info/:id', (req, res, next) => {
  var url = 'http://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd=' + req.params.id
  var options = {
    url: url,
    encoding: null
  }
  request(options, (err, response, html) => {
    if(err) {
      res.send({});
      throw err;
    }
    var $ = cheerio.load(html);
    res.send({
      name: convertHexNCR2CP($('span.name').html()),
      code: $('b.num').html()
    })
  })
});

router.get('/test', (req, res, next) => {
  var url = "https://dobset.io/";
  request(url, function(error, response, body) {
    if (error) throw error;

    var $ = cheerio.load(body);

    var postElements = $("section.posts article.post");
    postElements.each(function() {
      var postTitle = $(this).find("h1").text();
      var postUrl = $(this).find("h1 a").attr("href");
    });
    res.send({});
  });
});


module.exports = router;

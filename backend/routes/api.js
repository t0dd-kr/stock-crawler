const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
// /* GET users listing. */

router.get('/users', (req, res, next) => {
  User.find((err, users) => {
    if(err) {
      console.log('load users err');
      res.send([]);
    }
    else {
      res.send(users);
    }
  });
});

module.exports = router;

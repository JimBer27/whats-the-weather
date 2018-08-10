var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const ApiKey = require('../config');

/* GET weather listing. */
router.get('/', function(req, res, next) {

  //console.log(ApiKey);
  
  const requestBody = req.body;
  const lat = 42.482286;
  const long = -70.938776;

  fetch(`https://api.darksky.net/forecast/${ApiKey}/${lat},${long}?exclude=hourly,daily,minutely,flags`)
  .then(res => res.json())
  .then(data => {
    res.send({data})
  })
  .catch(err => {
    res.redirect('/error');
  })
});

module.exports = router;
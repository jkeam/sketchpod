const express = require('express');
const router = express.Router();

const clientId = process.env.CUID || 'unknown client id';
const username = process.env.USERNAME || 'unclaimed';
const submission = process.env.SUBMISSION || 'no doodle';

router.get('/', function(req, res, next) {
  res.render('index', {
    submission,
    username,
    clientId
  });
  // res.send('respond with a resource');
});

module.exports = router;

const express = require('express');
const router = express.Router();

const serverName = process.env.OPENSHIFT_SERVER || 'http://localhost:8080';
const clientId = process.env.CUID || 'unknown client id';
const username = process.env.USERNAME || 'unclaimed';
const submission = process.env.SUBMISSION || 'no doodle';

router.get('/', function(req, res, next) {
  res.render('index', {
    serverName,
    submission,
    username,
    clientId
  });
  // res.send('respond with a resource');
});

module.exports = router;

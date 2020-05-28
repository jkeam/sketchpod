const request = require('request');
const fs = require('fs');
const serverName = process.env.OPENSHIFT_SERVER || 'http://localhost:8080';
const username = process.env.USERNAME || 'jefferson';
const cuid = process.env.CUID || '007';
const submission = process.env.SUBMISSION || 'awesome';

const readStream = fs.createReadStream('static/img/cherries.png');
const url = `${serverName}/api/sketch/0?name=${username}&cuid=${cuid}&submission_id=${submission}`;

readStream.pipe(request.post(url, function (err, res, body) {
  if (err) {
    throw new Error(err);
  }
  console.log('res', res.body);
}));

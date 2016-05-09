import { introspectionQuery } from 'graphql/utilities';
import request from 'request';
import { apiURL } from '../../../config.js';
request({
  method: 'post',
  url: apiURL,
  body: {
    query: introspectionQuery,
    variables: {}
  },
  json: true
}, function (err, res, body) {
  if (err) return console.error(err);
  if (body && body.errors) {
    process.stderr.write(JSON.stringify(body.errors, null, 2));
    process.exit(1);
  } else if (body) {
    process.stdout.write(JSON.stringify(body, null, 2));
  }
});

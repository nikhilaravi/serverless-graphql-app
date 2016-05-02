'use strict';

import fetch from 'isomorphic-fetch';
import config from '../../../config.js';
/**
* graphql-js accepts request with the parameters
* @{query} - A valid GraphQL query or mutation
* @{variables} - runtime values to use for any GraphQL query variables as a JSON object
* Need to specify the content-type as 'application/json' in the request header.
**/

exports.query = function (query, variables) {
  return fetch(config.apiURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'query': query, 'variables': JSON.stringify(variables) })
  })
  .then(res => res.json());
};

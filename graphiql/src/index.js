import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import config from '../../config.js';
const apiURL = config.apiURL;
require('../../node_modules/graphiql/graphiql.css');

class GraphiQLIDE extends Component {
  graphQLFetcher (graphQLParams) {
    return fetch(apiURL, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphQLParams)
    }).then(response => response.json());
  }

  render () {
    return (
      <GraphiQL fetcher={this.graphQLFetcher.bind(this)}/>
    );
  }
}

ReactDOM.render(<GraphiQLIDE />, document.body);
